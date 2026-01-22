"use client";

import { useState, useRef } from "react";
import {
    FieldValues,
    UseControllerProps,
    useController,
} from "react-hook-form";
import { useClickOutside } from "../hooks";
import { cn } from "../utils";
import { ChevronDownIcon } from "lucide-react";

interface Option {
    label: string;
    value: string;
    disabled?: boolean;
}

interface SelectProps<T extends FieldValues> extends UseControllerProps<T> {
    options: Option[];
    id?: string;
    placeholder?: string;
    description?: string;
    className?: {
        root?: string;
        dropdown?: string;
    };
    disabled?: boolean;
    label?: string;
    multiple?: boolean;
    maxSelections?: number;
    variation?: "primary" | "secondary" | "tertiary";
    direction?: "up" | "down";
    onChange?: (value: string | string[]) => void; // Add this line
}

const Select = <T extends FieldValues>({
    options,
    placeholder = "Select an option",
    className,
    id,
    disabled = false,
    name,
    control,
    defaultValue,
    label,
    description,
    multiple = false,
    maxSelections,
    variation = "primary",
    direction = "down",
    onChange: externalOnChange, // Add this line
}: SelectProps<T>) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);

    const {
        field: { onChange, value, onBlur },
        fieldState: { error },
    } = useController<T>({
        name,
        control,
        defaultValue: (multiple
            ? (defaultValue ?? [])
            : defaultValue) as T[typeof name],
    });

    const selectedValues: string[] = multiple
        ? Array.isArray(value)
            ? value
            : []
        : value
            ? [value]
            : [];

    const selectedOptions = options.filter((option) =>
        selectedValues.includes(option.value),
    );

    const toggleDropdown = () => {
        if (!disabled) setIsOpen((prev) => !prev);
    };

    const handleOptionClick = (option: Option) => {
        if (option.disabled) return;

        let newValue: string | string[];

        if (multiple) {
            const currentValues = Array.isArray(value) ? [...value] : [];
            const index = currentValues.indexOf(option.value);

            newValue =
                index >= 0
                    ? currentValues.filter((v) => v !== option.value)
                    : maxSelections && currentValues.length >= maxSelections
                        ? currentValues
                        : [...currentValues, option.value];
        } else {
            newValue = option.value;
            setIsOpen(false);
        }

        // Call both the form's onChange and external onChange
        onChange(newValue);
        onBlur();

        // Call external onChange if provided
        if (externalOnChange) {
            externalOnChange(newValue);
        }
    };

    const selectionText = () => {
        if (!multiple) return selectedOptions[0]?.label || placeholder;
        if (selectedOptions.length === 0) return placeholder;
        return selectedOptions.map((opt) => opt.label).join(", ");
    };

    useClickOutside({
        refs: [selectRef as React.RefObject<HTMLElement>],
        callbackHandler: () => setIsOpen(false),
    });

    return (
        <fieldset
            className={cn(
                "relative flex w-full flex-col gap-[1rem]",
                { "gap-[.8rem]": variation === "tertiary" },
                className?.root,
            )}
        >
            {label && variation !== "secondary" && (
                <label
                    htmlFor={id}
                    className="text-sm font-normal leading-[2.4rem] tracking-[-0.011px] text-white"
                >
                    {label}
                </label>
            )}

            {!!description && (
                <p className="text-xs italic leading-[2.16rem] text-grey-100">
                    {description}
                </p>
            )}

            <div className="relative" ref={selectRef}>
                <button
                    type="button"
                    id={id}
                    onClick={toggleDropdown}
                    disabled={disabled}
                    className={cn(
                        "relative flex w-full items-center justify-between rounded-[1.2rem] border-[0.18rem] border-[#E8E8E8] px-[1.5rem] py-[1.3rem] text-left text-base font-medium leading-[2.4rem] tracking-[-0.011px] text-white outline-[#E8E8E8] drop-shadow-md placeholder:text-grey-100",
                        {
                            "text-grey-400/40":
                                selectedValues.length === 0 && !!placeholder,

                            "border-grey-800 bg-grey-800 text-sm font-normal":
                                variation === "tertiary",

                            "bg-[#F0F0F0] text-black":
                                variation === "secondary",

                            "cursor-not-allowed opacity-60": disabled,
                        },
                    )}
                >
                    <span
                        className={cn(
                            "line-clamp-1 w-full truncate text-black",
                            {
                                "text-grey-400/40":
                                    selectedValues.length === 0 && !!placeholder,
                            },
                        )}
                    >
                        {selectionText()}
                    </span>

                    <ChevronDownIcon
                        className={cn(
                            "ml-[0.8rem] shrink-0 text-grey-400 transition-all duration-300",
                            {
                                "rotate-180": isOpen,
                                "text-[#B8B8B8]": selectedOptions.length > 0,
                            },
                        )}
                    />
                </button>

                {isOpen && (
                    <div
                        className={cn(
                            "absolute z-30 mt-1 w-full rounded-[1.2rem] bg-white text-black shadow-lg",
                            {
                                "bottom-full top-auto mb-1": direction === "up",
                            },
                        )}
                    >
                        <ul
                            className={cn(
                                "custom-scroll max-h-[25rem] w-full overflow-y-auto rounded-[1.2rem] p-2 text-sm text-grey-800 outline-none",
                                className?.dropdown,
                            )}
                        >
                            {options.map((option, index) => {
                                const isSelected = selectedValues.includes(option.value);

                                return (
                                    <li
                                        key={index}
                                        onClick={() => handleOptionClick(option)}
                                        className={cn(
                                            "flex cursor-pointer items-center rounded-[0.8rem] px-[1.6rem] py-[1.2rem] transition-colors",
                                            {
                                                "bg-grey-100": isSelected,
                                                "hover:bg-grey-100": !option.disabled,
                                                "cursor-not-allowed opacity-50":
                                                    option.disabled,
                                            },
                                        )}
                                    >
                                        {option.label}
                                    </li>
                                );
                            })}

                            {options.length === 0 && (
                                <li className="p-4 text-grey-100">
                                    No options available
                                </li>
                            )}
                        </ul>
                    </div>
                )}
            </div>
        </fieldset>
    );
};

Select.displayName = "Select";

export default Select;