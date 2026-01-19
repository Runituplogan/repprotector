"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import Confetti from "react-confetti";
import { CheckCircle, Download, Mail, Clock, FileText, ArrowRight } from "lucide-react";
import { Button } from "@/src/components/button";

export default function SuccessPage() {
    const params = useSearchParams();
    const router = useRouter();
    const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 });
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
        router.push("/");
    };


    return (
        <section className="min-h-screen flex flex-col items-center justify-center bg-[#F9F4FF] relative overflow-hidden">
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
                <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 space-y-8">

                    <div className="text-center space-y-4">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-[#ECDBFF] rounded-full">
                            <CheckCircle className="w-12 h-12 text-primary" />
                        </div>

                        <h1 className="text-4xl font-bold font-playfair text-grey-600">
                            Payment Successful! 🎉
                        </h1>

                        <p className="text-lg text-grey-400">
                            Thank you for your purchase! We&apos;re processing your order.
                        </p>
                    </div>


                    <div className="bg-[#F9F4FF] rounded-xl p-6 space-y-4">
                        <h2 className="font-semibold text-xl text-grey-600 flex items-center gap-2">
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
                                <p className="font-medium text-primary flex items-center gap-1">
                                    <Mail className="w-6 h6 mr-[.7rem]" />
                                    Email Sent
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-semibold text-xl text-grey-600">What happens next?</h3>

                        <div className="space-y-3">
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                                    <span className="text-white text-sm">1</span>
                                </div>
                                <div>
                                    <p className="font-medium text-grey-600">Email Confirmation</p>
                                    <p className="text-grey-400 text-sm">
                                        We&apos;ve sent a receipt and order details to your email address.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                                    <span className="text-white text-sm">2</span>
                                </div>
                                <div>
                                    <p className="font-medium text-grey-600">Order Processing</p>
                                    <p className="text-grey-400 text-sm">
                                        Our team will begin working on your order within 24 hours.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                                    <span className="text-white text-sm">3</span>
                                </div>
                                <div>
                                    <p className="font-medium text-grey-600">Updates</p>
                                    <p className="text-grey-400 text-sm">
                                        You&apos;ll receive progress updates via email as we work on your project.
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
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">


                        <Button
                            onClick={handleReturnHome}
                            className="flex-1"
                        >
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
            <div className="absolute top-0 left-0 w-64 h-64 bg-[#ECDBFF] rounded-full -translate-x-1/2 -translate-y-1/2 opacity-30 blur-3xl" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#F2E8FF] rounded-full translate-x-1/2 translate-y-1/2 opacity-30 blur-3xl" />
        </section>
    );
}