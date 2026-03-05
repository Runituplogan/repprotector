import Stripe from "stripe";
import crypto from "crypto";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2025-12-15.clover" });

function hash(value: string) {
  return crypto.createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}

export async function POST(req: Request) {
  const payload = await req.text();
  const sig = req.headers.get("stripe-signature")!;
  const event = stripe.webhooks.constructEvent(payload, sig, process.env.STRIPE_WEBHOOK_SECRET!);

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID!;
    const accessToken = process.env.META_CONVERSION_API_TOKEN!;
    const eventId = `purchase-${Date.now()}`;

    const metaEvent = {
      data: [
        {
          event_name: "Purchase",
          event_time: Math.floor(Date.now() / 1000),
          action_source: "website",
          event_id: eventId,
          user_data: {
            em: session.customer_email ? [hash(session.customer_email)] : undefined,
          },
          custom_data: {
            content_name: session.metadata?.service,
            content_category: session.metadata?.optionKey,
            value: Number(session.metadata?.totalPrice || 0),
            currency: "USD",
          },
        },
      ],
    };

    await fetch(`https://graph.facebook.com/v17.0/${pixelId}/events?access_token=${accessToken}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(metaEvent),
    });
  }

  return new Response("ok");
}