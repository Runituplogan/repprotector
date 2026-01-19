import Stripe from "stripe";
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-12-15.clover",
});

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export async function POST(req: Request) {
    try {
        const { sessionId } = await req.json();
        if (!sessionId) return NextResponse.json({ error: "Missing session ID" }, { status: 400 });

        const session = await stripe.checkout.sessions.retrieve(sessionId);
        if (!session || session.payment_status !== "paid") {
            return NextResponse.json({ error: "Payment not verified" }, { status: 400 });
        }

        const metadata = session.metadata!;
        const formData = JSON.parse(metadata.formData);

        const emailHtml = `
      <div style="font-family: Inter, sans-serif; padding: 0px; background: #F9F4FF;">
  <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 12px; border: 1px solid #E8E8E8; overflow: hidden;">
    
    <!-- Header -->
    <div style="padding: 12px; text-align: center; border-bottom: 1px solid #E8E8E8;">
      <h1 style="font-family: 'Playfair Display', serif; font-weight: bold; font-size: 24px; color: #9046E5; margin: 0 0 16px;">
        ReviewX
      </h1>
      <div style="background: #ECDBFF; width: 48px; height: 48px; border-radius: 50%; margin: 0 auto 16px; display: flex; align-items: center; justify-content: center; text-align: center;">
        <span style="font-size: 24px;">🎉</span>
      </div>
      <h2 style="font-size: 24px; font-weight: bold; color: #000000; margin: 0;">
        Payment Confirmed
      </h2>
    </div>

    <!-- Content -->
    <div style="padding: 32px;">
      
      <!-- Order Details -->
      <div style="background: #F9F4FF; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
        <div style="display: grid; grid-template-columns: 1fr; gap: 12px;">
          <div style="display: flex; justify-content: space-between;">
            <span style="color: #666666;">Service: </span>
            <span style="font-weight: 600; color: #000000;">${metadata.service}</span>
          </div>
          
          <div style="display: flex; justify-content: space-between;">
            <span style="color: #666666;">Package: </span>
            <span style="font-weight: 600; color: #000000;">${metadata.optionTitle}</span>
          </div>
          
          <div style="display: flex; justify-content: space-between;">
            <span style="color: #666666;">Amount Paid: </span>
            <span style="font-weight: 600; color: #000000;">$${(session.amount_total! / 100).toFixed(2)}</span>
          </div>
        </div>
      </div>

      <!-- Customer Info -->
      <div style="margin-bottom: 24px;">
        <div style="display: grid; grid-template-columns: 1fr; gap: 12px;">
          ${(() => {
                const info = [];
                if (formData.fullName) {
                    info.push(`
                <div>
                  <div style="font-size: 14px; color: #666666; margin-bottom: 4px;">Name</div>
                  <div style="color: #000000; font-weight: 500;">${formData.fullName}</div>
                </div>
              `);
                }
                if (formData.email) {
                    info.push(`
                <div>
                  <div style="font-size: 14px; color: #666666; margin-bottom: 4px;">Email</div>
                  <div style="color: #000000; font-weight: 500;">${formData.email}</div>
                </div>
              `);
                }
                if (formData.platformUrl) {
                    info.push(`
                <div>
                  <div style="font-size: 14px; color: #666666; margin-bottom: 4px;">Platform</div>
                  <div style="color: #000000; font-weight: 500;">${formData.platformUrl}</div>
                </div>
              `);
                }
                if (formData.quantity) {
                    info.push(`
                <div>
                  <div style="font-size: 14px; color: #666666; margin-bottom: 4px;">Quantity</div>
                  <div style="color: #000000; font-weight: 500;">${formData.quantity}</div>
                </div>
              `);
                }
                return info.join('');
            })()}
        </div>
      </div>


    </div>
  </div>
</div>
    `;

        Promise.all([
            transporter.sendMail({
                from: `"ReviewX" <${process.env.EMAIL_USER}>`,
                to: session.customer_email!,
                subject: "Payment Confirmation",
                html: emailHtml,
            }).catch(console.error),

            transporter.sendMail({
                from: `"ReviewX" <${process.env.EMAIL_USER}>`,
                to: process.env.ADMIN_EMAIL!,
                subject: "New Paid Order",
                html: emailHtml,
            }).catch(console.error),
        ]);

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Email failed" }, { status: 500 });
    }
}
