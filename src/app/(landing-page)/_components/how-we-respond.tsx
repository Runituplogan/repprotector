import Wrapper from "@/src/components/wrapper";
import { WeRespond } from "@/src/icons";

const steps = [
    {
        "step": 1,
        "title": "Review Monitoring",
        "description": "We continuously monitor new and dropped reviews across your profiles to ensure no feedback goes unnoticed."
    },
    {
        "step": 2,
        "title": "Sentiment Analysis",
        "description": "Each review is carefully assessed to understand the customer's concern, tone, and intent, allowing us to respond appropriately and professionally."
    },
    {
        "step": 3,
        "title": "Response Strategy",
        "description": "We craft thoughtful, brand aligned responses that address concerns, clarify misunderstandings, and demonstrate accountability without escalating the situation."
    },
    {
        "step": 4,
        "title": "Publishing and Follow Up",
        "description": "Responses are posted promptly, and we track engagement or updates from the reviewer. Where needed, we guide conversations offline to resolve issues privately."
    }
]


export default function HowWeRespond() {
    return (
        <section className="bg-light-background py-[9rem]">
            <Wrapper className="space-y-[8rem]">
                <div className="flex flex-col-reverse gap-y-[4rem] lg:flex-row items-center justify-center gap-x-[6.5rem]">
                    <div className="scale-[0.8] md:scale-100">
                        <WeRespond />
                    </div>
                    <header className="text-black space-y-[1.2rem] max-w-[50rem] text-center flex flex-col justify-center items-center md:items-start md:justify-start md:text-start">
                        <h1 className="font-bold text-[3rem] md:text-[5rem] font-playfair leading-[3rem] md:leading-[5.5rem]">Respond to Customer Feedback</h1>
                        <p className="leading-snug">Build trust and protect your reputation with professional, timely responses to customer reviews. We help you engage customers the right way, reduce negative impact, and show future customers that your business listens and cares. </p>
                    </header>
                </div>

                <div className="space-y-[3.3rem]" >
                    <h1 className="font-bold text-[3rem] text-center text-black max-w-[55rem] mx-auto md:text-[5rem] font-playfair leading-[3rem] md:leading-[5.5rem]">How We Respond to Customer Feedback</h1>
                    <div className="relative mb-12">

                        <div className="absolute top-6 left-0 right-0 h-0.5 bg-[#DFC9FA] hidden md:block"
                            style={{ left: 'calc(12.5% + 1.5rem)', right: 'calc(12.5% + 1.5rem)' }}></div>

                        <div className="grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 relative hidden md:grid">
                            {steps.map((item) => (
                                <div key={item.step} className="flex justify-center">
                                    <div className="bg-primary p-0 text-sm size-[3.5rem] rounded-full flex items-center justify-center text-white border-[.2rem] border-white font-bold shadow-[0_0_12px_rgba(0,0,0,0.35)]">
                                        {item.step}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>


                    <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {steps.map((item, index) => (
                            <div
                                key={item.step}
                                className="bg-white rounded-[2rem] text-black space-y-[1.4rem] md:max-w-[29.7rem] border border-[#D7B4FF] p-[2.4rem] relative shadow-[0_0_12px_rgba(0,0,0,0.15)]"
                            >
                                <h3 className="text-[2rem] font-bold text-gray-900 mb-3">
                                    <span className="inline md:hidden">
                                        {index + 1}.{" "}
                                    </span>
                                    {item.title}
                                </h3>

                                <p className="text-gray-600 text-base leading-snug text-[#333333]">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>


                </div>
            </Wrapper>
        </section >
    )
}
