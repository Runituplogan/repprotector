"use client";
import { Button } from "@/src/components/button";
import Wrapper from "@/src/components/wrapper";
import { ROUTES } from "@/src/utils/routes";
import { useRouter } from "next/navigation";
import ReviewLgIcon from "@/src/icons/review-icon";
import ReviewSmIcon from "@/src/icons/review-sm";
import ReviewSmIcon2 from "@/src/icons/review-sm2";

const reviews = [
  {
    step: 1,
    title: "Review Assessment",
    description:
      "We carefully examine negative reviews to identify which ones qualify for removal.",
  },
  {
    step: 2,
    title: "Evidence Preparation",
    description:
      "Our team gathers supporting evidence and prepares a strong case for every review we dispute.",
  },
  {
    step: 3,
    title: "Appeal Submission",
    description:
      "We submit well structured appeals supported by clear evidence explaining why the review should be removed.",
  },
  {
    step: 4,
    title: "Tracking and Updates",
    description:
      "We monitor each appeal from start to finish and keep you informed as progress is made and reviews are resolved.",
  },
];

export default function ReviewProcess() {
  const router = useRouter();
  return (
    <section className="bg-light-background">
      <Wrapper className="relative flex flex-col items-center justify-center gap-y-[4rem] pb-[4rem] pt-[2rem] lg:py-[6.3rem]">
        <header className="flex flex-col items-center gap-[1.8rem]">
          <h1 className="text-center font-playfair text-5xl font-bold leading-[4.3rem] text-black lg:text-[5rem] lg:leading-[5.7rem]">
            How Our Review Disputing Process Works
          </h1>
          <p className="text-center text-grey-600">
            We use a simple and proven process to help businesses dispute unfair
            or <br /> illegitimate reviews and protect their online reputation.
          </p>
          <Button
            onClick={() => router.push(ROUTES.purchase)}
            className="w-full max-w-[15.6rem] shrink-0 px-0 py-[1.2rem]"
          >
            Shop Now
          </Button>
        </header>

        <section className="hidden grid-cols-[30rem_1fr_30rem] items-center gap-[1.6rem] lg:grid xl:grid-cols-[34.3rem_1fr_34.3rem] xl:gap-[4rem]">
          <div className="grid grid-cols-1 gap-[2.4rem] text-black">
            {reviews.slice(0, 2).map((item) => (
              <div
                key={item.step}
                className="relative space-y-[1.4rem] rounded-[2rem] border border-[#D7B4FF] bg-white p-[2.4rem]"
              >
                <div className="flex items-center text-xl font-bold tracking-[-2%]">
                  0{item.step}
                </div>

                <h3 className="mb-[0.8rem] text-[2rem] font-bold">
                  {item.title}
                </h3>
                <p className="text-gray-600 pr-[2rem] text-[1.5rem] leading-[2.4rem]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
          <i className="hidden h-full w-[48.4rem] items-center justify-center xl:flex">
            <ReviewLgIcon />
          </i>
          <i className="flex size-full items-center justify-center xl:hidden">
            <ReviewSmIcon2 />
          </i>

          <div className="grid grid-cols-1 gap-[2.4rem] text-black">
            {reviews.slice(2).map((item) => (
              <div
                key={item.step}
                className="relative space-y-[1.4rem] rounded-[2rem] border border-[#D7B4FF] bg-white p-[2.4rem]"
              >
                {/* <div className="flex size-[2.5rem] items-center justify-center rounded-full border-[.2rem] border-white bg-primary p-0 text-sm font-bold text-white shadow-[0_0_12px_rgba(0,0,0,0.35)]">
                  {item.step}
                </div> */}
                <div className="flex items-center text-xl font-bold tracking-[-2%]">
                  0{item.step}
                </div>

                <h3 className="mb-[0.8rem] text-[2rem] font-bold">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-[1.5rem] leading-[2.4rem]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>
        <section className="grid items-center gap-[1.6rem] lg:hidden xl:grid-cols-[34.3rem_1fr_34.3rem] xl:gap-[4rem]">
          <i className="flex size-full items-center justify-center xl:hidden">
            <ReviewSmIcon />
          </i>
          <div className="grid grid-cols-1 gap-[2.4rem] text-black sm:grid-cols-2">
            {reviews.map((item) => (
              <div
                key={item.step}
                className="relative w-[31.4rem] space-y-[1.4rem] rounded-[2rem] border border-[#D7B4FF] bg-white p-[2.4rem]"
              >
                <div className="flex items-center text-xl font-bold tracking-[-2%]">
                  0{item.step}
                </div>

                <h3 className="mb-[0.8rem] text-[2rem] font-bold">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-[1.5rem] leading-[2.4rem]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* <div className="absolute bottom-0 left-0 z-[1] hidden md:block">
                    <GlowBig />
                </div> */}
      </Wrapper>
    </section>
  );
}
