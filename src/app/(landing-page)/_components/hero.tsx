"use client";

import React from "react";
import { reviews, reviewsColumnOne, reviewsColumnTwo } from "../_constants";
import { Button } from "@/src/components/button";
import Wrapper from "@/src/components/wrapper";
import { useRouter } from "next/navigation";
import InfiniteScrollColumn from "./infinite-scroll-column";
import InfiniteScrollRow from "./infinite-scroll-row";
import { ROUTES } from "@/src/utils/routes";

export default function Hero() {
  const router = useRouter()
  const columnOne = reviews.slice(0, 3);
  const columnTwo = reviews.slice(3, 6);

  return (
    <>
      <style jsx global>{`
        @keyframes scroll-up {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-33.333%);
          }
        }

        @keyframes scroll-down {
          0% {
            transform: translateY(-33.333%);
          }
          100% {
            transform: translateY(0);
          }
        }

    


        .animate-scroll-up {
          animation: scroll-up 20s linear infinite;
        }

        .animate-scroll-down {
          animation: scroll-down 20s linear infinite;
        }
 @keyframes scroll-left-mobile {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-2400px);
    }
  }

  .animate-scroll-left-mobile {
    animation: scroll-left-mobile 90s linear infinite;
  }
  }
      `}</style>

      <Wrapper className="h-screen flex flex-col items-center justify-center gap-y-[1.4rem] lg:justify-between lg:flex-row">
        <div className="max-w-[67rem] flex flex-col items-center lg:items-start gap-y-[1.2rem]">
          <p className="bg-primary-light p-[1rem] text-base rounded-full text-primary">
            Join over 400+ business today
          </p>

          <h1 className="text-[2.8rem] text-center lg:text-start lg:text-[4.9rem] font-playfair font-bold text-black leading-snug">
            Your Business Deserves to
            Be Found by the Right People
          </h1>

          <p className="text-black text-base text-center lg:text-start">
            RepProtector helps you earn trust and grow your online reputation
          </p>

          <Button
            onClick={() => router.push(ROUTES.calendly)}
            className="mt-[2.2rem] w-full lg:w-auto"
          >
            Book A Call
          </Button>
        </div>
        <div className="relative lg:h-[600px] lg:w-[100vw] lg:max-w-none lg:overflow-hidden lg:-mr-[15vw] lg:ml-auto">

          {/* TOP / BOTTOM fades — desktop */}
          <div className="pointer-events-none absolute top-0 left-0 right-0 h-[30rem] bg-gradient-to-b from-white to-transparent z-10 hidden lg:block" />
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[30rem] bg-gradient-to-t from-white to-transparent z-10 hidden lg:block" />



          {/* Desktop */}
          <div className="hidden lg:flex gap-4 h-[600px] justify-center">
            <div className="w-[420px]">
              <InfiniteScrollColumn reviews={reviewsColumnOne} direction="up" />
            </div>
            <div className="w-[420px]">
              <InfiniteScrollColumn reviews={reviewsColumnTwo} direction="down" />
            </div>
          </div>

          {/* Mobile */}
          <div className="lg:hidden relative mt-[4.5rem] w-full mx-auto overflow-hidden max-w-[100vw]">
            <InfiniteScrollRow reviews={reviews} />

            <div
              className="pointer-events-none absolute left-0 top-0 bottom-0 w-[8rem] z-10"
              style={{ background: 'linear-gradient(to right, white 0%, transparent 100%)' }}
            />
            <div
              className="pointer-events-none absolute right-0 top-0 bottom-0 w-[8rem] z-10"
              style={{ background: 'linear-gradient(to left, white 0%, transparent 100%)' }}
            />
          </div>

        </div>

      </Wrapper>
    </>
  );
}
