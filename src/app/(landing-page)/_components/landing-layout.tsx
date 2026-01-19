import Faq from "./faq";
import Footer from "./footer";
import Hero from "./hero";
import NavBar from "./nav-bar";
import Platforms from "./platforms";
import Services from "./services";

export default function LandingLayout() {
    return (
        <section className="no-scrollbar">
            <NavBar />
            <Hero />
            <Services />
            <Platforms />
            <Faq />
            <Footer />
        </section>
    )
}
