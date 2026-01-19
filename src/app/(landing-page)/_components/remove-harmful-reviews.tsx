import Wrapper from "@/src/components/wrapper";
import { MessageIcon, StarIcon } from "@/src/icons";
import { Star } from "lucide-react";
import GlowSmall from "./glow-small";

const reviews = [
    {
        step: 1,
        title: "Review Assessment",
        description:
            "We carefully examine negative reviews to identify those that break platform rules and qualify for removal."
    },
    {
        step: 2,
        title: "Evidence Preparation",
        description:
            "Our team gathers supporting details, documents policy breaches, and prepares a strong case for each review we challenge."
    },
    {
        step: 3,
        title: "Appeal Submission",
        description:
            "We submit well structured appeals to the review platforms, clearly outlining violations and supporting evidence."
    },
    {
        step: 4,
        title: "Tracking and Updates",
        description:
            "We monitor each appeal, escalate when needed, and keep you informed as progress is made and reviews are resolved."
    }
];

export default function RemoveHarmfulReviews() {
    return (
        <section>
            <Wrapper className="py-[9.5rem] space-y-[8rem]">
                {/* Top section */}
                <div className="flex flex-col md:flex-row items-center justify-between mx-auto gap-x-[4rem] gap-y-[4rem]">
                    <header className="text-black space-y-[1.2rem] md:max-w-[50.8rem] text-center md:text-start">
                        <h1 className="font-bold text-[3rem] md:text-[5rem] font-playfair leading-[3rem] md:leading-[5.5rem]">
                            Remove Harmful Reviews
                        </h1>
                        <p>
                            Address unfair and invalid reviews with a professional removal
                            process designed to protect your brand. We work within platform
                            guidelines to help ensure your online reputation accurately
                            reflects genuine customer experiences.
                        </p>
                    </header>

                    <div className="w-full md:w-[61rem] bg-[#9046E599] rounded-[1.2rem] p-[4.8rem] flex flex-col gap-y-[1rem] md:gap-y-0 md:flex-row gap-x-[2.4rem]">
                        {/* Before */}
                        <div className="flex-1 relative">
                            <div className="absolute">
                                <GlowSmall />
                            </div>
                            <p className="text-center font-bold text-[2rem] mb-4">Before</p>
                            <div className=" bg-[#25262D] rounded-[1.6rem] p-[2.4rem] text-white space-y-[1.6rem]">


                                <div className="space-y-[0.8rem]">
                                    <p className="text-[1.4rem] opacity-80 flex items-center gap-3"><MessageIcon />Negative Reviews</p>
                                    <p className="text-[3rem] font-bold">6</p>
                                </div>

                                <div className="flex items-center gap-x-[0.4rem]">
                                    {[...Array(3)].map((_, i) => (
                                        <StarIcon
                                            key={i}
                                            filled
                                        />
                                    ))}
                                </div>

                                <p className="text-[2rem] font-semibold">2.0</p>
                            </div>
                        </div>

                        {/* After */}

                        <div className="flex-1 relative">
                            <div className="absolute">
                                <GlowSmall />
                            </div>

                            <p className="text-center font-bold text-[2rem] mb-4">After</p>

                            <div className=" bg-[#25262D] rounded-[1.6rem] p-[2.4rem] text-white space-y-[1.6rem]">

                                <div className="space-y-[0.8rem]">
                                    <p className="text-[1.4rem] opacity-80 flex items-center gap-3"><MessageIcon />Negative Reviews</p>
                                    <p className="text-[3rem] font-bold">0</p>
                                </div>

                                <div className="flex items-center gap-x-[0.4rem]">
                                    {[...Array(5)].map((_, i) => (
                                        <StarIcon
                                            key={i}
                                            filled
                                        />
                                    ))}
                                </div>

                                <p className="text-[2rem] font-semibold">5.0</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col-reverse lg:flex-row items-center justify-between mx-auto gap-x-[4rem] gap-y-[4rem]">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-[2.4rem] text-black">
                        {reviews.map((item) => (
                            <div
                                key={item.step}
                                className="bg-white rounded-[2rem] space-y-[1.4rem] md:max-w-[29.7rem] border border-[#D7B4FF] p-[2.4rem] relative shadow-[0_0_12px_rgba(0,0,0,0.15)]"
                            >
                                <div className="bg-primary p-0 text-sm size-[2.5rem] rounded-full flex items-center justify-center text-white border-[.2rem] border-white font-bold shadow-[0_0_12px_rgba(0,0,0,0.35)]">
                                    {item.step}
                                </div>

                                <h3 className="font-semibold text-[2rem] mb-[0.8rem]">
                                    {item.title}
                                </h3>
                                <p className="text-gray-600 text-[1.5rem] leading-[2.4rem]">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    <header className="text-black space-y-[1.2rem] md:max-w-[54.8rem] text-center md:text-start">
                        <h1 className="font-bold text-[3rem] md:text-[5rem] font-playfair leading-[3rem] md:leading-[5.5rem]">
                            How Our Review Removal Process Works
                        </h1>
                        <p>
                            We use a simple, proven process to help businesses challenge unfair
                            reviews and protect their online reputation
                        </p>
                    </header>
                </div>
            </Wrapper>
        </section>
    );
}
