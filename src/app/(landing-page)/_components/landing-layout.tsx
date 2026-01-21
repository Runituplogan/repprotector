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

export default function LandingLayout() {
  return (
    <section className="no-scrollbar">
      <NavBar />
      <Hero />
      <Platforms />
      <HowItWorks />
      <Services />
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
