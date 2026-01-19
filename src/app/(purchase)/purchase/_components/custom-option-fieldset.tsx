"use client";

import React from "react";
import clsx from "clsx";

type CustomOptionFieldsetProps = {
    title: string;
    active: boolean;
    onToggle: () => void;
    children: React.ReactNode;
};

export default function CustomOptionFieldset({
    title,
    active,
    onToggle,
    children,
}: CustomOptionFieldsetProps) {
    return (
        <fieldset
            className={clsx(
                "rounded-[1.2rem] border p-[1.6rem] transition-colors border-grey-100 bg-[#FBFBFB]"
            )}
        >
            <header
                onClick={onToggle}
                className="flex items-center justify-between cursor-pointer"
            >
                <p className="text-black font-medium">{title}</p>

                {/* Check indicator */}
                <div
                    className={clsx(
                        "size-[1.6rem] rounded-full border-[.2rem] transition-all duration-300",
                        active
                            ? "bg-primary border-primary scale-100"
                            : "bg-transparent border-[#D8D8D8] scale-90"
                    )}
                />
            </header>

            <div
                className={clsx(
                    "grid transition-all duration-300 ease-out",
                    active ? "grid-rows-[1fr] mt-[1.2rem]" : "grid-rows-[0fr]"
                )}
            >
                <div
                    className={clsx(
                        "overflow-hidden transition-all duration-300 space-y-[1.6rem]",
                        active ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"
                    )}
                >
                    {children}
                </div>
            </div>
        </fieldset>
    );
}
