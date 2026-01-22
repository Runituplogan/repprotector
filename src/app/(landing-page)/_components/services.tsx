"use client";
import { Button } from "@/src/components/button";
import Wrapper from "@/src/components/wrapper";
import {
  AdressError,
  GrowIcon,
  RespondIcon,
  Sersvice2,
  Service1,
  Service3,
} from "@/src/icons";
import { ROUTES } from "@/src/utils/routes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { title } from "process";
import Glow from "./glow";
import GlowBig from "./glow-big";

const services = [
  {
    icon: <GrowIcon />,
    title: "Get More Reviews",
    description:
      "We focus on steady growth, and building your online reputation over time in a way that looks organic and authentic.",
  },
  {
    icon: <AdressError />,
    title: "Dispute Negative/Invalid Reviews",
    description:
      "We dispute negative and Invalid reviews using legitimate platform processes in order to improve your average rating.",
  },
  {
    icon: <RespondIcon />,
    title: "Respond to Customer Feedback",
    description:
      "We deliver timely replies to every review to strengthen trust and credibility.",
  },
];

export default function Services() {
  const router = useRouter();
  return (
    <section className="bg-light-background">
      <Wrapper className="relative flex flex-col items-center justify-center gap-y-[4rem] py-[6.3rem]">
        <header className="flex flex-col items-center">
          <h1 className="font-playfair text-[5rem] font-bold text-black">
            Our Services
          </h1>
          <p className="text-center text-grey-600 md:text-start">
            Show up with credibility wherever customers are sharing their
            experiences.
          </p>
        </header>
        <main className="flex flex-col items-center gap-y-[5.9rem]">
          <div className="flex flex-col items-start justify-center gap-x-[2rem] md:flex-row">
            {services.map((service, _index) => (
              <div
                key={_index}
                className="flex flex-col items-center justify-center gap-x-[3.6rem] md:max-w-[40rem]"
              >
                <div className="md:h-[17rem]">{service.icon}</div>
                <div className="text-center">
                  <h2 className="text-xl font-semibold text-black">
                    {service.title}
                  </h2>
                  <p className="text-base leading-snug text-grey-400">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {/* <Button
            onClick={() => router.push(ROUTES.calendly)}
            className="w-full max-w-[56rem] py-[1.2rem]"
          >
            Book A Call
          </Button> */}
        </main>

        {/* <div className="absolute bottom-0 left-0 z-[1] hidden md:block">
                    <GlowBig />
                </div> */}
      </Wrapper>
    </section>
  );
}
