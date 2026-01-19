import React, { useState } from "react";

import { FieldError } from "react-hook-form";
import { cn } from "../utils";
// import { EyeIcon } from "../icons";
// import SearchIcon from "../icons/search";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  errors?: FieldError | undefined;
  id?: string;
  variation?: "primary" | "secondary" | "tertiary";
  label?: string;
  description?: string;
  required?: boolean;
  styles?: { root?: string; error?: string };
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      errors,
      label,
      id,
      required = false,
      variation = "primary",
      type,
      description,
      styles,
      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [inputType, setInputType] = useState(type);

    const togglePasswordVisibility = () => {
      if (type === "password") {
        setShowPassword((show) => !show);
        setInputType(inputType === "text" ? "password" : "text");
      }
    };

    return (
      <fieldset
        className={cn(
          "relative flex w-full flex-col gap-[1rem]",
          {
            "gap-[.8rem]": variation === "tertiary",
          },
          styles?.root,
        )}
      >
        {label && !(variation === "secondary") && (
          <label
            htmlFor={id}
            className="text-sm font-normal leading-[2.4rem] tracking-[-0.011px] text-white"
          >
            {label} {required && <span className="text-white">*</span>}
          </label>
        )}
        {!!description && (
          <p className="text-xs italic leading-[2.16rem] text-grey-100">
            {description}
          </p>
        )}
        <div
          className={cn(
            "relative rounded-[1.2rem] border-[0.18rem] border-[#E8E8E8] px-[1.5rem] py-[1.3rem] text-base font-medium leading-[2.4rem] tracking-[-0.011px] text-white outline-[#E8E8E8] drop-shadow-md placeholder:text-grey-100",
            {
              "flex items-center p-0 bg-[#F0F0F0] px-[1.5rem] py-[1.3rem]": variation === "secondary",
              "flex items-center gap-[0.88rem] px-[1.2rem]": type === "search",
              "border-grey-800 bg-grey-800 text-sm font-normal":
                variation === "tertiary",
            },
            className,
          )}
        >
          {label && variation === "secondary" && (
            <label
              className="shrink-0 rounded-l-[0.7rem] border-r-[0.18rem] border-r-[#E8E8E8] bg-white px-[1.4rem] py-[1.3rem]"
              htmlFor={id}
            >
              {label}
            </label>
          )}

          <input
            id={id}
            type={inputType}
            ref={ref}
            autoCorrect="off"
            spellCheck="false"
            {...props}
            className={cn(
              "w-full bg-transparent text-black outline-none placeholder:text-grey-400/40",
            )}
            {...(type === "number"
              ? {
                min: 0,
                onKeyDown: (e) => {
                  if (e.key === "-" || e.key === "e") {
                    e.preventDefault();
                  }
                  if (typeof props.onKeyDown === "function") {
                    props.onKeyDown(e);
                  }
                },
              }
              : {})}
          />

        </div>
        {/* {!!errors && (
          <span className={cn("w-full text-sm text-red-100", styles?.error)}>
            {errors.message}
          </span>
        )} */}
      </fieldset>
    );
  },
);

Input.displayName = "Input";

export { Input };
