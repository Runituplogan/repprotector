import Faq from "./faq";
import Footer from "./footer";
import Hero from "./hero";
import HowItWorks from "./how-it-works";
import HowWeRespond from "./how-we-respond";
import NavBar from "./nav-bar";
import Platforms from "./platforms";
import RemoveHarmfulReviews from "./remove-harmful-reviews";
import Services from "./services";

export default function LandingLayout() {
    return (
        <section className="no-scrollbar">
            <NavBar />
            <Hero />
            <Platforms />
            <HowItWorks />
            <Services />
            <RemoveHarmfulReviews />
            <HowWeRespond />
            <Faq />
            <Footer />
        </section>
    )
}
