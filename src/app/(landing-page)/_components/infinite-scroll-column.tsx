import React from 'react'
import { Reviews } from '../_types';
import ReviewCard from './review-card';

export default function InfiniteScrollColumn({
    reviews,
    direction,
}: {
    reviews: Reviews[];
    direction: "up" | "down";
}) {
    const animationClass =
        direction === "up" ? "animate-scroll-up" : "animate-scroll-down";


    return (
        <div className="relative h-full text-black overflow-hidden">
            <div className={`flex flex-col ${animationClass}`}>
                {[...reviews, ...reviews, ...reviews].map((review, idx) => (
                    <ReviewCard key={idx} review={review} />
                ))}
            </div>
        </div>
    )
}
