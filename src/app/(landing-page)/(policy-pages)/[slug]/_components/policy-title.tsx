"use client"
import { ROUTES } from "@/src/utils/routes";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";


export default function PolicyTitle({ title }: { title: string }) {
    const router = useRouter()
    return (
        <header className="flex w-full items-center gap-x-[2.4rem]">

            <button
                onClick={() => router.push(`${ROUTES.root}#footer`)}
                className="rounded-[.8rem] bg-primary-light p-[.8rem] text-black "
            >
                <ArrowLeft />
            </button>


            <h1 className="text-center text-[2.4rem] font-bold text-black">
                {title}
            </h1>


        </header>
    )
}
