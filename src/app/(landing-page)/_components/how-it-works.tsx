import Wrapper from "@/src/components/wrapper";
import { Sersvice2, Service1, Service3 } from "@/src/icons";

const howItWorks = [
    {
        icon: Service1,
        title: "Select a Service and Make Payment",
        description: "Choose the reputation management service that aligns with your brand goals, and proceed to place an order based on your requirements."
    },
    {
        icon: Sersvice2,
        title: "Book a Call with a Specialist",
        description: "After your payment is confirmed, schedule a personalized consultation with one of our reputation experts. We'll dive deep into understanding your business, identifying current challenges, and crafting a customized strategy to address your reputation goals."
    },
    {
        icon: Service3,
        title: 'Watch Your Reputation Grow',
        description: "Sit back and let our proven system work for you. Track your progress in real-time as your online reputation improves, customer reviews increase, and your brand visibility strengthens across all major platforms."
    }
];


export default function HowItWorks() {

    return (
        <Wrapper>
            <div className="relative z-[2] flex flex-col items-center gap-[4.2rem] py-[5rem]">
                <header className="flex flex-col items-center ">
                    <h1 className="font-bold text-[3.2rem] md:text-[5rem] font-playfair text-black">How It Works</h1>
                    <p className="text-grey-600 text-center">We&apos;ve streamlined the process of building your online reputation into three effective steps.</p>
                </header>
                <div className="max-w-[100rem] space-y-[5.8rem]">
                    {
                        howItWorks.map((item, _index) => (
                            <div key={_index} className="flex flex-col items-center bg-[#FBF8FF] rounded-[1.4rem] p-[3.6rem] shadow-[0_0_12px_rgba(0,0,0,0.25)] md:flex-row  gap-x-[3.2rem]">
                                <div className="relative">
                                    <item.icon />
                                    <p className="bg-white rounded-full size-[4.7rem] text-black absolute flex items-center justify-center font-bold top-0 shadow-[0_0_12px_rgba(0,0,0,0.15)]">{_index + 1}</p>
                                </div>

                                <div className="text-center max-w-[53rem]">
                                    <h2 className="text-black text-[2rem] font-bold">{item.title}</h2>
                                    <p className="text-black text-base">{item.description}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>

            </div>
        </Wrapper>
    )
}
