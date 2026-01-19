import React from "react";
import { cn } from "../utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variation?: "primary" | "secondary" | "destructive";
  size?: "small" | "medium";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      type = "button",
      size = "medium",
      variation = "primary",
      className,
      ...props
    },
    ref,
  ) => {
    const variations = {
      primary:
        "bg-primary text-white rounded-[4.8rem] hover:bg-opacity-75 disabled:bg-grey-100",
      // secondary: "bg-grey-700  text-white",
      // destructive: "bg-red-100  text-white disabled:bg-grey-100",
    };

    const sizes = {
      small:
        "py-[0.6rem] font-semibold  text-sm  rounded-[0.7rem] px-[1.94rem] ",
      medium: "py-[1.6rem] font-bold text-base  rounded-[0.7rem] px-[4rem] ",
    };

    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          "flex items-center justify-center gap-[1rem] border-t-[.2rem] border-[#D7B4FF] disabled:border-none text-center leading-[2.32rem]",
          sizes[size as keyof typeof sizes],
          variations[variation as keyof typeof variations],
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export { Button };
