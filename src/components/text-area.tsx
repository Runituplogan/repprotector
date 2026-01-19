import * as React from "react";
import { FieldError, FieldValues, UseFormRegister } from "react-hook-form";
import { cn } from "../utils";

export interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    id?: string;
    label?: string;
    register?: UseFormRegister<FieldValues>;
    errors?: FieldError | undefined;
    prefixIcon?: React.ReactNode;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, id, errors, label, prefixIcon, ...props }, ref) => {
        return (
            <fieldset className="flex w-full flex-col gap-[0.8rem]">
                {!!label && (
                    <label
                        htmlFor={id}
                        className="font-work_sans text-base font-normal leading-[2.56rem]"
                    >
                        {label}
                    </label>
                )}
                <div className="relative w-full">
                    <textarea
                        className={cn(
                            "overflow-y-auto rounded-[1.6rem] text-black border border-grey-100 p-[1.2rem] text-base font-normal leading-[2.56rem] tracking-[-0.012em] outline-grey-400 placeholder:text-grey-400/40 w-full focus:outline-none",
                            prefixIcon && !props.value && "pl-[4rem]",
                            className,
                        )}
                        ref={ref}
                        {...props}
                    />
                    {!!prefixIcon && !props.value && (
                        <div className="absolute left-[1.2rem] top-[1.8rem] text-grey-100 pointer-events-none">
                            {prefixIcon}
                        </div>
                    )}
                </div>
                {!!errors && (
                    <span className="text-sm text-red-100">{errors.message}</span>
                )}
            </fieldset>
        );
    },
);

Textarea.displayName = "Textarea";

export { Textarea };