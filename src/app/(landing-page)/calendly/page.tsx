"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { InlineWidget } from "react-calendly";
import { configs } from "@/src/utils/config";
import { ROUTES } from "@/src/utils/routes";
import Wrapper from "@/src/components/wrapper";
import toast from "react-hot-toast";
import { ArrowLeft } from "@/src/icons";

export default function BookACallLayout() {
    const params = useSearchParams();
    const router = useRouter();
    const searchParams = useSearchParams();

    const sessionId = params.get("session_id");
    const sent = params.get("sent");

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!sessionId) {
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

    return (
        <section className="grid gap-[2.4rem] bg-light-background h-screen overflow-y-auto no-scrollbar py-[5.6rem]">
            <Wrapper className="h-full">
                <header className="w-full flex flex-col items-start gap-y-[1.2rem] lg:gap-y-[0] lg:items-center lg:flex-row">
                    <button
                        onClick={() => router.push(ROUTES.root)}
                        className="rounded-[.8rem] bg-primary-light p-[.9rem] text-black lg:p-[1.5rem]"
                    >
                        <ArrowLeft />
                    </button>

                    <div className="flex flex-col items-center mx-auto">
                        <h1 className="font-bold text-[3rem] md:text-[5rem] font-playfair text-black text-center">
                            Book A Call
                        </h1>
                        <p className="text-grey-600 text-center">
                            Speak to one of our reputation management specialists.
                        </p>
                    </div>
                </header>

                <main className="mt-[3.5rem]">
                    <div className="no-scrollbar h-[80rem] w-full scale-[90%] justify-center rounded-[.5rem] sm:h-[40rem] lg:h-[50rem]">
                        <InlineWidget
                            url={configs().calendlyURL!}
                            styles={{
                                height: "700px",
                                scrollbarWidth: "none", // Firefox
                                msOverflowStyle: "none", // IE and Edge
                                margin: "-8rem 0 0 0 ",
                                padding: "0px",
                            }}
                            pageSettings={{
                                backgroundColor: "#ffffff",
                                primaryColor: "#5368DF",
                                textColor: "#212121",
                            }}
                        />
                    </div>
                </main>
            </Wrapper>
        </section>
    );
}
