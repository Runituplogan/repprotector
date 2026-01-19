import { StarIcon } from "@/src/icons";
import { Reviews } from "../_types";
import Image from "next/image";

export default function ReviewCard({ review }: { review: Reviews }) {
    return (
        <div className="bg-white rounded-2xl p-6 border border-[#E8E8E8] mb-4 min-w-[300px] md:min-w-[38rem]">
            <div className="flex items-center justify-between gap-3 mb-3">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-grey-600/15 flex items-center justify-center text-gray-600 font-semibold flex-shrink-0">
                    <Image src={review.avatar} alt={review.name} width={300} height={300} className="object-cover" />
                </div>
                <div className="flex-1">
                    <h4 className="font-semibold text-grey-600">{review.name}</h4>

                </div>
                <div className="flex gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} filled={i < review.rating} />
                    ))}
                </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{review.text}</p>
        </div>
    )
}
