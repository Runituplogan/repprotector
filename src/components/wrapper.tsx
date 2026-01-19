import React from "react";
import { cn } from "../utils";

interface WrapperProps {
    children: React.ReactNode;
    className?: string;
    as?: string;
    id?: string;
    fluid?: boolean;
}

const Wrapper = ({
    children,
    className = "",
    id,
    fluid,
    as = "section",
}: WrapperProps) => {
    return React.createElement(
        as,
        {
            className: cn(
                "max-w-default mx-auto w-full",
                {
                    "w-full px-[1.6rem] lg:px-[2.9rem]": !fluid,
                },
                className,
            ),
            id,
        },
        children,
    );
};

export default Wrapper;
