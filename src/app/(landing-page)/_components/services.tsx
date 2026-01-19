"use client"
import { Button } from "@/src/components/button";
import Wrapper from "@/src/components/wrapper";
import { AdressError, GrowIcon, RespondIcon, Sersvice2, Service1, Service3 } from "@/src/icons";
import { ROUTES } from "@/src/utils/routes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { title } from "process";
import Glow from "./glow";
import GlowBig from "./glow-big";

const services = [
    {
        icon: <GrowIcon />,
        title: "Grow Online Visibility Organically",
        description: "We keep your business visible in search through consistent updates, strong profiles, and trusted organic signals."
    },
    {
        icon: <AdressError />,
        title: "Address Negative/Invalid Reviews",
        description: "We protect your reputation by identifying, reviewing, and challenging feedback that violates platform guidelines."
    },
    {
        icon: <RespondIcon />,
        title: "Respond to Customer Feedback",
        description: "We deliver timely, professional replies to every review to strengthen trust and credibility."
    }
]

const howItWorks = [
    {
        icon: Service1,
        title: "Select a Service and Make Payment",
        description: "Choose the reputation management service that aligns with your brand goals. Select your desired coverage area, service level, and investment amount. Our flexible packages are designed to fit businesses of all sizes"
    },
    {
        icon: Sersvice2,
        title: "Book a Call with Our Reputation Specialist",
        description: "After your payment is confirmed, schedule a personalized consultation with one of our reputation experts. We'll dive deep into understanding your business, identifying current challenges, and crafting a customized strategy to address your reputation goals."
    },
    {
        icon: Service3,
        title: 'Watch Your Reputation Grow',
        description: "Sit back and let our proven system work for you. Track your progress in real-time as your online reputation improves, customer reviews increase, and your brand visibility strengthens across all major platforms."
    }
];

export default function Services() {
    const router = useRouter()
    return (
        <section className="bg-secondary">
            <Wrapper className="relative flex flex-col justify-center items-center py-[6.3rem] gap-y-[4rem]">
                <header className="flex flex-col items-center">
                    <h1 className="font-bold text-[5rem] font-playfair text-black">Our Services</h1>
                    <p className="text-grey-600 text-center md:text-start">Be visible, credible and trusted across today’s leading review platforms</p>
                </header>
                <main className="flex flex-col items-center gap-y-[5.9rem]">
                    <div className="flex flex-col items-start justify-center gap-x-[2rem] md:flex-row">
                        {services.map((service, _index) => (
                            <div key={_index} className="flex flex-col  items-center justify-center gap-x-[3.6rem] md:max-w-[40rem]">
                                <div className="md:h-[17rem]">{service.icon}</div>
                                <div className="text-center">
                                    <h2 className="text-xl text-black font-semibold">{service.title}</h2>
                                    <p className="text-base text-grey-400 leading-snug">{service.description}</p>
                                </div>
                            </div>))}
                    </div>
                    <Button onClick={() => router.push(ROUTES.calendly)} className="w-full py-[1.2rem] max-w-[56rem]">Book A Call</Button>

                </main>

                <div className="relative z-[2] flex flex-col items-center gap-[4.2rem] mt-[18rem] md:flex-row">
                    <header className="flex flex-col items-center md:items-start max-w-[42.2rem]">
                        <h1 className="font-bold text-[3.2rem] md:text-[5rem] font-playfair text-black">How It Works</h1>
                        <p className="text-grey-600 text-center md:text-start">We&apos;ve streamlined the process of building your online reputation into three simple, effective steps.</p>
                    </header>
                    <div className="max-w-[65rem] space-y-[5.8rem]">
                        {
                            howItWorks.map((item, _index) => (
                                <div key={_index} className="flex flex-col items-center md:flex-row md:items-start gap-x-[3.2rem]">
                                    <div className="bg-white size-[10.9rem] p-[2rem] flex items-center justify-center rounded-full border-[3px] border-white shadow-[inset_0_4px_10px_rgba(0,0,0,0.1)]">
                                        <item.icon />
                                    </div>

                                    <div className="text-center md:text-start">
                                        <h2 className="text-black text-[2rem] font-bold">{item.title}</h2>
                                        <p className="text-black text-base">{item.description}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                </div>
                <div className="absolute bottom-0 left-0 z-[1] hidden md:block">
                    <GlowBig />
                </div>
            </Wrapper>
        </section>
    )
}
