import { ArrowLeft } from "@/src/icons";
import { ROUTES } from "@/src/utils/routes";
import { useRouter } from "next/navigation";

const steps = [
  {
    step: 1,
    title: "Review Monitoring",
    description:
      "We continuously monitor new and dropped reviews across your profiles to ensure no feedback goes unnoticed.",
  },
  {
    step: 2,
    title: "Sentiment Analysis",
    description:
      "Each review is carefully assessed to understand the customer's concern, tone, and intent, allowing us to respond appropriately and professionally.",
  },
  {
    step: 3,
    title: "Response Strategy",
    description:
      "We craft thoughtful, brand aligned responses that address concerns, clarify misunderstandings, and demonstrate accountability without escalating the situation.",
  },
  {
    step: 4,
    title: "Publishing and Follow Up",
    description:
      "Responses are posted promptly, and we track engagement or updates from the reviewer. Where needed, we guide conversations offline to resolve issues privately.",
  },
];

export default function Header({
  showBackButton = true,
}: {
  showBackButton: boolean;
}) {
  const router = useRouter();
  return (
    <header className="flex w-full flex-col items-start gap-y-[1.2rem] lg:flex-row lg:items-center lg:gap-y-[0]">
      {showBackButton && (
        <button
          onClick={() => router.push(ROUTES.root)}
          className="rounded-[.8rem] bg-primary-light p-[.9rem] text-black lg:p-[1.5rem]"
        >
          <ArrowLeft />
        </button>
      )}

      <div className="mx-auto flex flex-col items-center">
        <h1 className="text-center font-playfair text-[3rem] font-bold text-black md:text-[5rem]">
          Purchase Services
        </h1>
        <p className="text-center text-grey-600">
          Quick and secure payment to get your services started right away
        </p>
      </div>
    </header>
  );
}
