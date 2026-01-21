"use client";

import Wrapper from "@/src/components/wrapper";
import { MessageIcon, StarIcon } from "@/src/icons";
import { Star } from "lucide-react";
import GlowSmall from "./glow-small";
import TrafficRoom from "./traffic-room";
import { Button } from "@/src/components/button";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/src/utils/routes";

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
  const router = useRouter();
  return (
    <section>
      <Wrapper className="space-y-[8rem] py-[4rem] xl:py-[9.5rem]">
        {/* Top section */}
        <div className="mx-auto flex flex-col items-center justify-between gap-x-[4rem] gap-y-[4rem] lg:flex-row xl:px-[11.4rem]">
          <header className="flex flex-col items-center space-y-[1.2rem] text-center text-black md:max-w-[50.8rem] lg:text-start xl:items-start">
            <h1 className="text-center font-playfair text-[3rem] font-bold leading-[3rem] md:text-[5rem] md:leading-[5.5rem]">
              Get More Reviews
            </h1>
            <p className="text-center xl:text-start">
              We use a smart matching system that helps your business get
              reviews from profiles with IPs from your local area.
            </p>
            <p className="text-center xl:text-start">
              By prioritizing geographic relevance and strategic placement, our
              system generates reviews that build trust and improve how your
              business is perceived by future prospects.
            </p>
            <Button
              onClick={() => router.push(ROUTES.purchase)}
              className="w-full max-w-[15.6rem] shrink-0 px-0 py-[1.2rem]"
            >
              Shop Now
            </Button>
          </header>
          <div className="shrink-0">
            <TrafficRoom />
          </div>
        </div>
      </Wrapper>
    </section>
  );
}
