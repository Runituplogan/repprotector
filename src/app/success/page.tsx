"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import Confetti from "react-confetti";
import {
  CheckCircle,
  Download,
  Mail,
  Clock,
  FileText,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/src/components/button";

export default function SuccessPage() {
  const params = useSearchParams();
  const router = useRouter();
  const [windowDimensions, setWindowDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [showConfetti, setShowConfetti] = useState(true);

  const sessionId = params.get("session_id");
  const sent = params.get("sent");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!sessionId) {
      toast.error("No payment data found");
      router.replace("/");
      return;
    }

    if (sent) return;

    const sendConfirmation = async () => {
      setLoading(true);
      try {
        await fetch("/api/send-confirmation-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        });

        const url = new URL(window.location.href);
        url.searchParams.set("sent", "true");
        window.history.replaceState({}, "", url.toString());
      } catch (err) {
        console.error(err);
        toast.error("Failed to send confirmation email");
      } finally {
        setLoading(false);
      }
    };

    sendConfirmation();
  }, [sessionId, sent, router]);

  const handleReturnHome = () => {
    router.push("/calendly");
  };

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#F9F4FF]">
      {/* Confetti Effect */}
      {showConfetti && (
        <Confetti
          width={windowDimensions.width}
          height={windowDimensions.height}
          recycle={false}
          numberOfPieces={400}
          colors={["#9046E5", "#ECDBFF", "#F2E8FF", "#C988A8", "#379DFF"]}
          gravity={0.1}
        />
      )}

      <div className="relative z-10 w-full max-w-[80rem] px-4">
        <div className="space-y-8 rounded-2xl bg-white p-8 shadow-lg md:p-12">
          <div className="space-y-4 text-center">
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-[#ECDBFF]">
              <CheckCircle className="h-12 w-12 text-primary" />
            </div>

            <h1 className="font-playfair text-4xl font-bold text-grey-600">
              Payment Successful! 🎉
            </h1>

            <p className="text-lg text-grey-400">
              Thank you for your purchase! We&apos;re processing your order.
            </p>
          </div>

          <div className="space-y-4 rounded-xl bg-[#F9F4FF] p-6">
            <h2 className="flex items-center gap-2 text-xl font-semibold text-grey-600">
              Order Summary
            </h2>

            <div className="grid grid-cols-2 gap-4">
              {/* <div>
                                <p className="text-sm text-grey-400">Order ID</p>
                                <p className="font-medium text-grey-600">{sessionId}</p>
                            </div> */}

              <div>
                <p className="text-sm text-grey-400">Date</p>
                <p className="font-medium text-grey-600">
                  {new Date().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>

              <div>
                <p className="text-sm text-grey-400">Confirmation Sent</p>
                <p className="flex items-center gap-1 font-medium text-primary">
                  <Mail className="h6 mr-[.7rem] w-6" />
                  Email Sent
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-grey-600">
              What happens next?
            </h3>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary">
                  <span className="text-sm text-white">1</span>
                </div>
                <div>
                  <p className="font-medium text-grey-600">
                    Email Confirmation
                  </p>
                  <p className="text-sm text-grey-400">
                    We&apos;ve sent a receipt and order details to your email
                    address.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary">
                  <span className="text-sm text-white">2</span>
                </div>
                <div>
                  <p className="font-medium text-grey-600">Order Processing</p>
                  <p className="text-sm text-grey-400">
                    Our team will begin working on your order within 24 hours.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary">
                  <span className="text-sm text-white">3</span>
                </div>
                <div>
                  <p className="font-medium text-grey-600">Updates</p>
                  <p className="text-sm text-grey-400">
                    You&apos;ll receive progress updates via email as we work on
                    your project.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="bg-[#F2E8FF] rounded-xl p-4">
                        <div className="flex items-center gap-3">
                            <Clock className="w-5 h-5 text-primary" />
                            <div>
                                <p className="font-medium text-grey-600">Estimated Completion</p>
                                <p className="text-sm text-grey-400">
                                    Your order will be completed within 3-5 business days
                                </p>
                            </div>
                        </div>
                    </div> */}

          {/* Action Buttons */}
          <div className="flex flex-col gap-4 pt-4 sm:flex-row">
            <Button onClick={handleReturnHome} className="flex-1">
              Return Home
            </Button>
          </div>

          {/* Support Information */}
          {/* <div className="pt-6 border-t border-grey-100">
                        <p className="text-center text-sm text-grey-400">
                            Need help?{" "}
                            <a
                                href="mailto:supportreviewx@.com"
                                className="text-primary font-medium hover:underline"
                            >
                                Contact our support team
                            </a>{" "}
                            or call us at (555) 123-4567
                        </p>
                    </div> */}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute left-0 top-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ECDBFF] opacity-30 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-64 w-64 translate-x-1/2 translate-y-1/2 rounded-full bg-[#F2E8FF] opacity-30 blur-3xl" />
    </section>
  );
}
