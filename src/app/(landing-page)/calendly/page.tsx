"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { InlineWidget } from "react-calendly";
import { configs } from "@/src/utils/config";
import { ArrowLeft } from "lucide-react";
import { ROUTES } from "@/src/utils/routes";
import Wrapper from "@/src/components/wrapper";

export default function BookACallLayout() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // const sessionId = searchParams.get("session_id");

    // useEffect(() => {
    //     if (!sessionId) {
    //         router.replace(ROUTES.purchase);
    //     }
    // }, [sessionId, router]);

    // if (!sessionId) {
    //     return null;
    // }

    return (
        <section className="grid gap-[2.4rem] bg-light-background h-screen overflow-y-auto no-scrollbar py-[5.6rem]">
            <Wrapper className="h-full">
                <header className="w-full flex flex-col items-start gap-y-[1.2rem] lg:gap-y-[0] lg:items-center lg:flex-row">
                    <button
                        onClick={() => router.push(ROUTES.root)}
                        className="bg-primary p-[.9rem] lg:p-[1.5rem] rounded-[.8rem]"
                    >
                        <ArrowLeft />
                    </button>

                    <div className="flex flex-col items-center mx-auto">
                        <h1 className="font-bold text-[3rem] md:text-[5rem] font-playfair text-black text-center">
                            Book A Call
                        </h1>
                        <p className="text-grey-600 text-center">
                            Have a quick conversation about strengthening your reputation.
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
