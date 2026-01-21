"use client";
import { Button } from "@/src/components/button";
import Wrapper from "@/src/components/wrapper";
import { WeRespond } from "@/src/icons";
import WeRespondSmIcon from "@/src/icons/we-respond-small";
import { ROUTES } from "@/src/utils/routes";
import { useRouter } from "next/navigation";

const steps = [
  {
    step: 1,
    title: "Review Monitoring",
    description:
      "We continuously monitor new and dropped reviews across your profiles to ensure no feedback goes unnoticed.",
  },
  {
    step: 2,
    title: "Sentiment Analysis",
    description:
      "Each review is carefully assessed to understand the customer's concern, tone, and intent, allowing us to respond appropriately and professionally.",
  },
  {
    step: 3,
    title: "Response Strategy",
    description:
      "We craft thoughtful, brand aligned responses that address concerns, clarify misunderstandings, and demonstrate accountability without escalating the situation.",
  },
  {
    step: 4,
    title: "Publishing and Follow Up",
    description:
      "Responses are posted promptly, and we track engagement or updates from the reviewer. Where needed, we guide conversations offline to resolve issues privately.",
  },
];

export default function HowWeRespond() {
  const router = useRouter();
  return (
    <section className="bg-white pt-[4rem] lg:py-[9rem]">
      <Wrapper className="space-y-[3.2rem]">
        <div className="flex flex-col-reverse items-center justify-center gap-x-[6.5rem] lg:gap-y-[4rem]">
          <div className="relative my-0 -ml-[18rem] hidden w-full scale-[.6] sm:block lg:-ml-[10rem] lg:scale-[0.8] xl:ml-0 xl:w-[80%] xl:scale-100">
            <WeRespond />
            <div className="absolute left-[65rem] top-[4rem] w-full max-w-[38.1rem] rounded-[2rem] text-black">
              <h3 className="text-gray-900 text-[2rem] font-bold">
                Review Monitoring
              </h3>

              <p className="text-gray-600 text-base leading-snug text-[#333333]">
                We continuously monitor new reviews across your profiles to
                ensure no feedback goes unnoticed.
              </p>
            </div>
            <div className="absolute left-[72rem] top-[16rem] w-full max-w-[38.1rem] rounded-[2rem] text-black">
              <h3 className="text-gray-900 text-[2rem] font-bold">
                Sentiment Analysis
              </h3>

              <p className="text-gray-600 text-base leading-snug text-[#333333]">
                Each review is carefully assessed to understand the customer’s
                tone and intent, allowing us to respond appropriately and
                professionally.
              </p>
            </div>
            <div className="absolute left-[72rem] top-[32rem] w-full max-w-[38.1rem] rounded-[2rem] text-black">
              <h3 className="text-gray-900 text-[2rem] font-bold">
                Response Strategy
              </h3>

              <p className="text-gray-600 text-base leading-snug text-[#333333]">
                We craft thoughtful responses that reflect your brand voice,
                clarify context, and foster positive engagement.
              </p>
            </div>
            <div className="absolute left-[62rem] top-[47rem] w-full max-w-[38.1rem] rounded-[2rem] text-black">
              <h3 className="text-gray-900 text-[2rem] font-bold">
                Review Monitoring
              </h3>

              <p className="text-gray-600 text-base leading-snug text-[#333333]">
                We continuously monitor new reviews across your profiles to
                ensure no feedback goes unnoticed.
              </p>
            </div>
          </div>
          <header className="flex flex-col items-center justify-center space-y-[1.2rem] text-center text-black">
            <h1 className="text-center font-playfair text-[3rem] font-bold leading-[3rem] md:text-[5rem] md:leading-[5.5rem]">
              Respond to Customer Feedback
            </h1>
            <p className="text-center leading-snug">
              Build trust and protect your reputation with professional, timely
              responses to customer reviews. We{" "}
              <br className="hidden lg:block" /> help you engage customers the
              right way, reduce negative impact, and show future customers that
              your business listens and cares. 
            </p>
            <Button
              onClick={() => router.push(ROUTES.purchase)}
              className="w-full max-w-[15.6rem] shrink-0 px-0 py-[1.2rem]"
            >
              Shop Now
            </Button>
          </header>
        </div>

        <div className="space-y-[3.3rem] sm:hidden">
          {/* <h1 className="mx-auto max-w-[55rem] text-center font-playfair text-[3rem] font-bold leading-[3rem] text-black md:text-[5rem] md:leading-[5.5rem]">
            How We Respond to Customer Feedback
          </h1> */}
          <WeRespondSmIcon />
          <div className="relative mb-12">
            <div
              className="absolute left-0 right-0 top-6 hidden h-0.5 bg-[#DFC9FA] md:block"
              style={{
                left: "calc(12.5% + 1.5rem)",
                right: "calc(12.5% + 1.5rem)",
              }}
            ></div>

            <div className="relative hidden grid-cols-2 gap-4 md:grid md:grid-cols-4 md:gap-0">
              {steps.map((item) => (
                <div key={item.step} className="flex justify-center">
                  <div className="flex size-[3.5rem] items-center justify-center rounded-full border-[.2rem] border-white bg-primary p-0 text-sm font-bold text-white shadow-[0_0_12px_rgba(0,0,0,0.35)]">
                    {item.step}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((item, index) => (
              <div
                key={item.step}
                className="relative space-y-[1.4rem] rounded-[2rem] border border-[#D7B4FF] bg-white p-[2.4rem] text-black shadow-[0_0_12px_rgba(0,0,0,0.15)] md:max-w-[29.7rem]"
              >
                <h3 className="text-gray-900 mb-3 text-[2rem] font-bold">
                  <span className="inline md:hidden">{index + 1}. </span>
                  {item.title}
                </h3>

                <p className="text-gray-600 text-base leading-snug text-[#333333]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Wrapper>
    </section>
  );
}
