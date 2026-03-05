"use client"
import Wrapper from "@/src/components/wrapper";
import { ArrowRight } from 'lucide-react'
import { GartnerPeerInsight, GoogleIcon, ProductHuntIcon, RedditIcon, TripAdvisorIcon, YelpIcon } from "@/src/icons";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/src/utils/routes";
const platforms = [
    {
        icon: <GoogleIcon />,
        title: "Google My Business",
        description: "Be the first business people find when they search locally.",
        color: "text-blue-100",
        slug: "google-my-business",
    },
    {
        icon: <YelpIcon />,
        title: "Yelp",
        description: "Strengthen your reputation on the platform locals rely on.",
        color: "text-pink-100",
        slug: "yelp",
    },
    {
        icon: <RedditIcon />,
        title: "Reddit",
        slug: "reddit",
        description: "Build trust where real conversations happen.",
        color: "text-red-50",
    },
    {
        icon: <TripAdvisorIcon />,
        title: "TripAdvisor",
        description: "Get discovered by more travelers planning their next trip.",
        color: "text-green-100",
        slug: "tripadvisor",
    },
    {
        icon: <ProductHuntIcon />,
        title: "Product Hunt",
        description: "Launch stronger and stay visible among early adopters.",
        color: "text-orange-100",
        slug: "product-hunt",
    },
    {
        icon: <GartnerPeerInsight />,
        title: "Gartner Peer Insight",
        description: "Build credibility with verified enterprise buyers.",
        color: "text-blue-200",
        slug: "gartner-peer-insight",
    }
];


export default function Platforms() {
    const router = useRouter()
    return (
        <section className="bg-light-background pt-[3rem] md:pt-[7.4rem] pb-[5.3rem]">
            <Wrapper className="space-y-[4rem] md:space-y-[7rem]">
                <header className="flex flex-col items-center justify-center text-center md:text-start md:justify-start ">
                    <h1 className="font-bold text-[3.2rem] md:text-[5rem] font-playfair text-black">Platforms We Manage Your Profiles On</h1>
                    <p className="text-grey-600">Be visible and trusted across today’s leading review platforms.</p>
                </header>
                <section className="flex flex-wrap items-center justify-center gap-x-[1rem] gap-y-[2rem]">
                    {platforms.map((platform, index) => (
                        <div key={index} className="md:max-w-[28.3rem] h-[28rem] overflow-hidden w-full flex flex-col items-center gap-y-[.5rem] bg-white rounded-[.847rem] border-[.07rem] border-[#E8E8E8] px-[1rem] py-[1.8rem]">
                            <h3 className="text-base text-black font-semibold">{platform.title}</h3>
                            <p className="text-sm text-black text-center h-[3.4rem]">{platform.description}</p>
                            <button
                                onClick={() => router.push(`${ROUTES.purchase}?service=${platform.slug}`)}
                                className={`py-[1rem] px-[2.7rem] font-bold border-b-[.16rem] shadow-md border-b-[#E8E8E8] rounded-[3.8rem] text-[1rem] ${platform.color}`}
                            >
                                Get Started
                            </button>
                            <div>
                                {platform.icon}
                            </div>
                        </div>
                    ))}
                </section>
                <div className="flex flex-col items-center justify-center">
                    <p className="text-black">Looking for reviews on a different platform?</p>
                    <p onClick={() => router.push(ROUTES.calendly)} className="text-primary cursor-pointer underline flex items-center font-semibold" >Click here to see if we can help <ArrowRight size={15} /> </p>
                </div>
            </Wrapper>
        </section>
    )
}
