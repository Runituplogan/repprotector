"use client"
import { handleHashScroll } from "@/src/utils";
import PurchaseLayout from "../../(purchase)/purchase/_components/purchase-layout";
import Faq from "./faq";
import Footer from "./footer";
import Hero from "./hero";
import HowItWorks from "./how-it-works";
import HowWeRespond from "./how-we-respond";
import MoreReviews from "./more-reviews";
import NavBar from "./nav-bar";
import Platforms from "./platforms";
import ReviewProcess from "./review-process";
import Services from "./services";
import { useEffect } from "react";

export default function LandingLayout() {

  useEffect(() => {
    const cleanup = handleHashScroll({
      behavior: 'smooth',
      delay: 150,
      cleanup: true
    });

    return cleanup;
  }, []);
  return (
    <section className="no-scrollbar">
      <NavBar />
      <Hero />
      <Services />
      <HowItWorks />
      <Platforms />
      <MoreReviews />
      <ReviewProcess />
      <HowWeRespond />
      <PurchaseLayout
        showBackButton={false}
        className="h-auto xl:px-[6rem] 2xl:px-[10rem]"
      />
      <Faq />
      <Footer />
    </section>
  );
}
