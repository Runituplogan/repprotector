import { ArrowLeft } from "@/src/icons";
import { ROUTES } from "@/src/utils/routes";
import { useRouter } from "next/navigation";

export default function Header() {
    const router = useRouter()
    return (
        <header className="w-full flex flex-col items-start gap-y-[1.2rem] lg:gap-y-[0] lg:items-center lg:flex-row">
            <button onClick={() => router.push(ROUTES.root)} className="bg-primary p-[.9rem] lg:p-[1.5rem] rounded-[.8rem]">
                <ArrowLeft />
            </button>

            <div className="flex flex-col items-center mx-auto">
                <h1 className="font-bold text-[3rem] md:text-[5rem] font-playfair text-black text-center">
                    Purchase Services
                </h1>
                <p className="text-grey-600 text-center ">
                    Quick, safe payment to get your services started right away.
                </p>
            </div>
        </header>

    )
}
