import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-12-15.clover",
});

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const {
            service,
            serviceSlug,
            optionKey,
            optionTitle,
            unitPrice,
            quantity,
            totalPrice,
            customerEmail,
            phoneNumber,
            duration,
            formData,
        } = body;


        if (!unitPrice || isNaN(unitPrice)) {
            throw new Error("Invalid unit price");
        }

        if (!quantity || isNaN(quantity) || quantity < 1) {
            throw new Error("Invalid quantity");
        }

        if (!customerEmail) {
            throw new Error("Customer email is required");
        }

        if (!phoneNumber) {
            throw new Error("Phone number is required");
        }

        if (!duration && service === "respond_feedback") {
            throw new Error("Duration is required");
        }

        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            payment_method_types: ["card"],
            customer_email: customerEmail,

            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: `${service} – ${optionTitle}`,
                            description: `Duration: ${duration}`,
                        },
                        unit_amount: Math.round(unitPrice * 100),
                    },
                    quantity: Math.round(quantity),
                },
            ],

            metadata: {
                service,
                serviceSlug,
                optionKey,
                optionTitle,
                duration: String(duration),
                phoneNumber: String(phoneNumber),
                quantity: String(quantity),
                unitPrice: String(unitPrice),
                totalPrice: String(totalPrice ?? unitPrice * quantity),
                customerEmail,
                formData: JSON.stringify(formData),
            },

            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/calendly?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}`,
        });

        return NextResponse.json({ url: session.url });
    } catch (error: unknown) {
        console.error("Stripe error:", error);

        let message = "Unknown error";
        let data: unknown = null;

        if (error instanceof Stripe.errors.StripeError) {
            message = error.message;
            data = {
                type: error.type,
                code: error.code,
                param: error.param,
                statusCode: error.statusCode,
            };
        } else if (error instanceof Error) {
            message = error.message;
            data = {
                name: error.name,
                stack: error.stack,
            };
        }

        return NextResponse.json(
            {
                error: "Stripe error",
                message,
                data,
            },
            { status: 500 },
        );
    }
}
