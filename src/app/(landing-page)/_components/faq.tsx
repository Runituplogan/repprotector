import Wrapper from "@/src/components/wrapper";
import Accordion from "./accordion";
import Glow from "./glow";

const faqsContent = [
  {
    id: 1,
    question: "How does RepProtector work?",
    answer: `
      <p>
      RepProtector helps businesses manage their online reputation by generating more reviews, addressing negative or invalid feedback, and responding to customer input. We also improve visibility through consistent profile management across major platforms.
      </p>
    `,
  },
  {
    id: 2,
    question: "How can I get started?",
    answer: `
      <p>
     You can select a service directly on the platform to get started. If you’re looking for a custom option or need more information, you can book a call with a member of our team.
      </p>
    `,
  },
  {
    id: 3,
    question: "Do I need to give you full access to my accounts?",
    answer: `
      <p>
       We only request the minimum level of access required to perform the selected service, and all access is handled securely.
      </p>
    `,
  },
  {
    id: 4,
    question: "Is this a one-time service or ongoing management?",
    answer: `
      <p>
    We offer both one-time services and ongoing management depending on what you select. If you’re looking for something custom, you can book a call and speak with a member of our team.
      </p>
    `,
  },
  {
    id: 5,
    question: "Can RepProtector remove negative reviews from my profile?",
    answer: `
      <p>
     We only dispute reviews that are invalid or unfairly negative, with the final decision left to the platform. If a review is deemed valid, we focus on professional responses and reputation recovery instead.
      </p>
    `,
  },
  {
    id: 6,
    question: "Do you respond to negative reviews?",
    answer: `
      <p>
      Yes. We respond to both positive and negative reviews with a calm and professional tone that matches your brand’s voice.
      </p>
    `,
  },
];

export default function Faq() {
  return (
    <section className="relative py-[10rem] pb-[8rem]">
      <Wrapper className="grid grid-cols-1 gap-y-[4rem] md:grid-cols-2 md:gap-y-[0]">
        <header className="space-y-[1.2rem] text-center text-black md:text-start">
          <h1 className="font-playfair text-[3rem] font-bold leading-[3rem] md:text-[5rem] md:leading-[5.5rem]">
            Everything <br /> Businesses Ask
          </h1>
          <p>Common questions about using our service for your business.</p>
        </header>
        <Accordion accordionData={faqsContent} />
      </Wrapper>
      {/* <div className="absolute top-0 z-[-1]">
        <Glow />
      </div> */}
    </section>
  );
}
