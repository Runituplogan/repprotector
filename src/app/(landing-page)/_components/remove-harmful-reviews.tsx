import Wrapper from "@/src/components/wrapper";
import { MessageIcon, StarIcon } from "@/src/icons";
import { Star } from "lucide-react";
import GlowSmall from "./glow-small";

const reviews = [
  {
    step: 1,
    title: "Review Assessment",
    description:
      "We carefully examine negative reviews to identify those that break platform rules and qualify for removal.",
  },
  {
    step: 2,
    title: "Evidence Preparation",
    description:
      "Our team gathers supporting details, documents policy breaches, and prepares a strong case for each review we challenge.",
  },
  {
    step: 3,
    title: "Appeal Submission",
    description:
      "We submit well structured appeals to the review platforms, clearly outlining violations and supporting evidence.",
  },
  {
    step: 4,
    title: "Tracking and Updates",
    description:
      "We monitor each appeal, escalate when needed, and keep you informed as progress is made and reviews are resolved.",
  },
];

export default function RemoveHarmfulReviews() {
  return (
    <section>
      <Wrapper className="space-y-[8rem] py-[9.5rem]">
        {/* Top section */}
        <div className="mx-auto flex flex-col items-center justify-between gap-x-[4rem] gap-y-[4rem] md:flex-row">
          <header className="space-y-[1.2rem] text-center text-black md:max-w-[50.8rem] md:text-start">
            <h1 className="font-playfair text-[3rem] font-bold leading-[3rem] md:text-[5rem] md:leading-[5.5rem]">
              Remove Harmful Reviews
            </h1>
            <p>
              Address unfair and invalid reviews with a professional removal
              process designed to protect your brand. We work within platform
              guidelines to help ensure your online reputation accurately
              reflects genuine customer experiences.
            </p>
          </header>

          <div className="flex w-full flex-col gap-x-[2.4rem] gap-y-[1rem] rounded-[1.2rem] bg-[#9046E599] p-[4.8rem] md:w-[61rem] md:flex-row md:gap-y-0">
            {/* Before */}
            <div className="relative flex-1">
              <div className="absolute">
                <GlowSmall />
              </div>
              <p className="mb-4 text-center text-[2rem] font-bold">Before</p>
              <div className="space-y-[1.6rem] rounded-[1.6rem] bg-[#25262D] p-[2.4rem] text-white">
                <div className="space-y-[0.8rem]">
                  <p className="flex items-center gap-3 text-[1.4rem] opacity-80">
                    <MessageIcon />
                    Negative Reviews
                  </p>
                  <p className="text-[3rem] font-bold">6</p>
                </div>

                <div className="flex items-center gap-x-[0.4rem]">
                  {[...Array(3)].map((_, i) => (
                    <StarIcon key={i} filled />
                  ))}
                </div>

                <p className="text-[2rem] font-semibold">2.0</p>
              </div>
            </div>

            {/* After */}

            <div className="relative flex-1">
              <div className="absolute">
                <GlowSmall />
              </div>

              <p className="mb-4 text-center text-[2rem] font-bold">After</p>

              <div className="space-y-[1.6rem] rounded-[1.6rem] bg-[#25262D] p-[2.4rem] text-white">
                <div className="space-y-[0.8rem]">
                  <p className="flex items-center gap-3 text-[1.4rem] opacity-80">
                    <MessageIcon />
                    Negative Reviews
                  </p>
                  <p className="text-[3rem] font-bold">0</p>
                </div>

                <div className="flex items-center gap-x-[0.4rem]">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} filled />
                  ))}
                </div>

                <p className="text-[2rem] font-semibold">5.0</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto flex flex-col-reverse items-center justify-between gap-x-[4rem] gap-y-[4rem] lg:flex-row">
          <div className="grid grid-cols-1 gap-[2.4rem] text-black sm:grid-cols-2">
            {reviews.map((item) => (
              <div
                key={item.step}
                className="relative space-y-[1.4rem] rounded-[2rem] border border-[#D7B4FF] bg-white p-[2.4rem] shadow-[0_0_12px_rgba(0,0,0,0.15)] md:max-w-[29.7rem]"
              >
                <div className="flex size-[2.5rem] items-center justify-center rounded-full border-[.2rem] border-white bg-primary p-0 text-sm font-bold text-white shadow-[0_0_12px_rgba(0,0,0,0.35)]">
                  {item.step}
                </div>

                <h3 className="mb-[0.8rem] text-[2rem] font-semibold">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-[1.5rem] leading-[2.4rem]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <header className="space-y-[1.2rem] text-center text-black md:max-w-[54.8rem] md:text-start">
            <h1 className="font-playfair text-[3rem] font-bold leading-[3rem] md:text-[5rem] md:leading-[5.5rem]">
              How Our Review Removal Process Works
            </h1>
            <p>
              We use a simple, proven process to help businesses challenge
              unfair reviews and protect their online reputation
            </p>
          </header>
        </div>
      </Wrapper>
    </section>
  );
}
