"use client"
import { Button } from "@/src/components/button";
import Wrapper from "@/src/components/wrapper";
import { AdressError, GrowIcon, RespondIcon } from "@/src/icons";
import { ROUTES } from "@/src/utils/routes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { title } from "process";

const services = [
    {
        icon: <GrowIcon />,
        title: "Grow Online Visibility Organically",
        description: "We keep your business visible in search through consistent updates, strong profiles, and trusted organic signals."
    },
    {
        icon: <AdressError />,
        title: "Address Negative and Invalid Reviews",
        description: "We protect your reputation by identifying, reviewing, and challenging feedback that violates platform guidelines."
    },
    {
        icon: <RespondIcon />,
        title: "Respond to Customer Feedback",
        description: "We deliver timely, professional replies to every review to strengthen trust and credibility."
    }
]

export default function Services() {
    const router = useRouter()
    return (
        <section className="bg-secondary">
            <Wrapper className="flex flex-col justify-center items-center py-[6.3rem] gap-y-[4rem]">
                <header className="flex flex-col items-center">
                    <h1 className="font-bold text-[5rem] font-playfair text-black">Our Services</h1>
                    <p className="text-grey-600 text-center md:text-start">Be visible, credible and trusted across today’s leading review platforms</p>
                </header>
                <main className="flex flex-col items-center gap-y-[5.9rem]">
                    <div className="flex flex-col items-start justify-center gap-x-[2rem] md:flex-row">
                        {services.map((service, _index) => (
                            <div key={_index} className="flex flex-col  items-center justify-center gap-x-[3.6rem] md:max-w-[40rem]">
                                <div className="">{service.icon}</div>
                                <div className="text-center">
                                    <h2 className="text-xl text-black font-semibold">{service.title}</h2>
                                    <p className="text-base text-grey-400 leading-snug">{service.description}</p>
                                </div>
                            </div>))}
                    </div>
                    <Button onClick={() => router.push(ROUTES.calendly)} className="w-full py-[1.2rem] max-w-[56rem]">Book A Call</Button>

                </main>
            </Wrapper>
        </section>
    )
}
