import React from 'react'
import { Reviews } from '../_types'
import ReviewCard from './review-card'

export default function InfiniteScrollRow({ reviews }: { reviews: Reviews[] }) {
    return (
        <div className="flex animate-scroll-left-mobile gap-4 text-black">
            {[...reviews, ...reviews].map((review, idx) => (
                <div key={idx} className="flex-shrink-0 w-[38rem]">
                    <ReviewCard review={review} />
                </div>
            ))}
        </div>
    );
}