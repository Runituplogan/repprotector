import { ArrowLeft } from "@/src/icons";
import { ROUTES } from "@/src/utils/routes";
import { useRouter } from "next/navigation";

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

export default function Header() {
    const router = useRouter()
    return (
        <header className="w-full flex flex-col items-start gap-y-[1.2rem] lg:gap-y-[0] lg:items-center lg:flex-row">
            <button onClick={() => router.push(ROUTES.root)} className="bg-primary-light text-black p-[.9rem] lg:p-[1.5rem] rounded-[.8rem]">
                <ArrowLeft />
            </button>

            <div className="flex flex-col items-center mx-auto">
                <h1 className="font-bold text-[3rem] md:text-[5rem] font-playfair text-black text-center">
                    Purchase Services
                </h1>
                <p className="text-grey-600 text-center ">
                    Quick and secure payment to get your services started right away
                </p>
            </div>


           
        </header>

    )
}
