import Wrapper from "@/src/components/wrapper";
import Accordion from "./accordion";
import Glow from "./glow";

const faqsContent = [
    {
        id: 1,
        question: "What does Rep Protector actually do?",
        answer: `
      <p>
       Rep Protector helps businesses manage their online reputation by addressing invalid reviews, responding to customer feedback and improving visibility through consistent profile management across major platforms.
      </p>
    `,
    },
    {
        id: 2,
        question: "Can Rep Protector remove negative reviews from my profile?",
        answer: `
      <p>
      We do not remove reviews arbitrarily. We only challenge reviews that violate platform guidelines. If a review is valid, we focus on professional responses and reputation recovery instead.
      </p>
    `,
    },
    {
        id: 3,
        question: "Do you respond to negative reviews as well?",
        answer: `
      <p>
        Yes. We respond to both positive and negative reviews in a calm and professional tone that protects your brand and shows accountability.
      </p>
    `,
    },
    {
        id: 4,
        question: "Is this a one-time service or ongoing management?",
        answer: `
      <p>
      We offer both. Some services are one-time, while others work best with ongoing management for long-term results.
      </p>
    `,
    },
    {
        id: 5,
        question: "How do I get started?",
        answer: `
      <p>
       You can request a demo, book a call, or select a service directly from the platform dropdowns to begin.
      </p>
    `,
    },
    {
        id: 6,
        question: "Do I need to give you full access to my accounts?",
        answer: `
      <p>
       We only request the minimum level of access required to perform the selected service, and all access is handled securely.
      </p>
    `,
    },
];


export default function Faq() {
    return (
        <section className="py-[10rem] pb-[8rem] relative ">
            <Wrapper className="grid grid-cols-1 md:grid-cols-2 gap-y-[4rem] md:gap-y-[0]">
                <header className="text-black space-y-[1.2rem] text-center md:text-start">
                    <h1 className="font-bold text-[3rem] md:text-[5rem] font-playfair leading-[3rem] md:leading-[5.5rem]">Everything <br /> Businesses Ask</h1>
                    <p>Common questions about using our service for your business.</p>
                </header>
                <Accordion accordionData={faqsContent} />
            </Wrapper>
            <div className="absolute top-0 z-[-1]">
                <Glow />
            </div>
        </section>
    )
}
