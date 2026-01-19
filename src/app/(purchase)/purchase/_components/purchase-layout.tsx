"use client";

import Wrapper from "@/src/components/wrapper";
import Header from "./header";
import {
    GlassdoorSmIcon,
    GlassDoorXs,
    GoogleSmIcon,
    GoogleXs,
    HomeAdvisorSmIcon,
    HomeAdvisorXs,
    OpenTable,
    PlayStoreXs,
    TripAdvisorSmIcon,
    TripAdvisorXs,
    TrustPilotSmIcon,
    TrustPilotXs,
    YelpSmIcon,
    YelpXs,
} from "@/src/icons";
import React, { useState } from "react";
import { Input } from "@/src/components/input";
import CustomOptionFieldset from "./custom-option-fieldset";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import {
    SERVICE_OPTIONS,
    ServiceOptionKey,
    FormSchemaType,
} from "../_types";
import { Button } from "@/src/components/button";
import { cn, formatNumber } from "@/src/utils";
import { ChevronDown } from "lucide-react";
import { Textarea } from "@/src/components/text-area";
import Spinner from "@/src/components/spinner";
import toast from "react-hot-toast";


type Service = {
    id: number;
    slug: string;
    title: string;
    icon: React.ComponentType;
    smIcon: React.ComponentType;
};


const services: Service[] = [
    {
        id: 1,
        slug: "google-business-profile",
        icon: GoogleSmIcon,
        smIcon: GoogleXs,
        title: "Google Business Profile",
    },
    {
        id: 2,
        slug: "trustpilot",
        icon: TrustPilotSmIcon,
        smIcon: TrustPilotXs,
        title: "Trustpilot",
    },
    {
        id: 3,
        slug: "glassdoor",
        icon: GlassdoorSmIcon,
        smIcon: GlassDoorXs,
        title: "GlassDoor",
    },
    {
        id: 4,
        slug: "open-table",
        icon: OpenTable,
        smIcon: PlayStoreXs,
        title: "Open Table",
    },
    {
        id: 5,
        slug: "yelp",
        icon: YelpSmIcon,
        smIcon: YelpXs,
        title: "Yelp",
    },
    {
        id: 6,
        slug: "tripadvisor",
        icon: TripAdvisorSmIcon,
        smIcon: TripAdvisorXs,
        title: "TripAdvisor",
    },
    {
        id: 7,
        slug: "homeadvisor",
        icon: HomeAdvisorSmIcon,
        smIcon: HomeAdvisorXs,
        title: "HomeAdvisor",
    },
];

type CalculatePriceArgs = {
    price: number;
    quantity?: number;
};

export const calculatePrice = ({ price, quantity }: CalculatePriceArgs) => {
    const qty = Number(quantity) || 0;
    return formatNumber(price * qty);
};


export default function PurchaseLayout() {
    const params = useSearchParams();
    const slug = params.get("service");

    const defaultService: Service =
        services.find((service) => service.slug === slug) ?? services[0];

    const [activeService, setActiveService] = useState<Service>(defaultService);

    const [activeOption, setActiveOption] =
        useState<ServiceOptionKey | null>(null);

    const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const { watch, register, setValue } = useForm<FormSchemaType>({
        mode: "onChange",
        defaultValues: {
            service: slug ?? services[0].slug,
            option: undefined,
            data: {
                auto_review_outreach: {
                    fullName: "",
                    email: "",
                    quantity: 0,
                    pricing: SERVICE_OPTIONS.find(o => o.key === "auto_review_outreach")!.price
                },
                address_reviews: {
                    fullName: "",
                    email: "",
                    platformUrl: "",
                    quantity: 0,
                    additionalInfo: "",
                    pricing: SERVICE_OPTIONS.find(o => o.key === "address_reviews")!.price
                },
                respond_feedback: {
                    fullName: "",
                    email: "",
                    quantity: 0,
                    pricing: SERVICE_OPTIONS.find(o => o.key === "respond_feedback")!.price
                }
            }
        }
    });


    const autoReviewQuantity = watch("data.auto_review_outreach.quantity") ?? 0;
    const addressReviewsQuantity = watch("data.address_reviews.quantity") ?? 0;
    const respondFeedbackQuantity = watch("data.respond_feedback.quantity") ?? 0;

    const getQuantityForOption = (optionKey: ServiceOptionKey) => {
        switch (optionKey) {
            case "auto_review_outreach":
                return autoReviewQuantity;
            case "address_reviews":
                return addressReviewsQuantity;
            case "respond_feedback":
                return respondFeedbackQuantity;
            default:
                return 0;
        }
    };

    const handleQuantityChange = (optionKey: ServiceOptionKey) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (value === "") {
            setValue(`data.${optionKey}.quantity`, 0);
        } else {
            const numValue = parseInt(value, 10);
            if (!isNaN(numValue) && numValue >= 0) {
                setValue(`data.${optionKey}.quantity`, numValue);
            }
        }
    };

    const handleOptionToggle = (optionKey: ServiceOptionKey) => {
        const newOption = activeOption === optionKey ? null : optionKey;
        setActiveOption(newOption);
        if (newOption) {
            setValue("option", newOption);
        }
    };

    const isActiveOptionValid = (): boolean => {
        if (!activeOption) return false;

        const selectedData = watch("data")[activeOption];

        if (activeOption === "auto_review_outreach") {
            return !!(
                selectedData.fullName &&
                selectedData.fullName.length >= 2 &&
                selectedData.email &&
                selectedData.email.includes("@") &&
                selectedData.quantity &&
                selectedData.quantity >= 1
            );
        }
        if (activeOption === "address_reviews") {
            const data = selectedData as FormSchemaType["data"]["address_reviews"];

            return !!(
                data.fullName &&
                data.fullName.length >= 2 &&
                data.email &&
                data.email.includes("@") &&
                data.platformUrl &&
                data.platformUrl.startsWith("http") &&
                data.quantity &&
                data.quantity >= 1
            );
        }


        if (activeOption === "respond_feedback") {
            return !!(
                selectedData.fullName &&
                selectedData.fullName.length >= 2 &&
                selectedData.email &&
                selectedData.email.includes("@") &&
                selectedData.quantity &&
                selectedData.quantity >= 1
            );
        }

        return false;
    };

    // Manual submit handler
    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true)

        try {
            const formData = watch();
            const optionConfig = SERVICE_OPTIONS.find(
                (o) => o.key === activeOption
            );

            if (!optionConfig) {
                return;
            }

            const selectedOptionData = formData.data[activeOption!];
            const quantity = selectedOptionData.quantity ?? 0;

            const res = await fetch("/api/stripe/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    service: activeService.title,
                    serviceSlug: activeService.slug,
                    optionKey: activeOption,
                    optionTitle: optionConfig.title,
                    unitPrice: optionConfig.price,
                    quantity,
                    totalPrice: optionConfig.price * quantity,
                    customerEmail: selectedOptionData.email,
                    formData: selectedOptionData,
                }),
            });

            const data = await res.json();

            if (!res.ok || !data?.url) {
                throw new Error(data?.error || "Failed to create Stripe session");
            }

            window.location.href = data.url;
        } catch (err) {
            console.error("❌ Error:", err);
            toast.error("Payment failed. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };



    return (
        <section className="bg-[#F9F4FF] h-screen overflow-auto no-scrollbar py-[2.5rem] lg:py-[5rem]">
            <Wrapper className="space-y-[3.2rem] lg:space-y-[8rem]">
                <Header />

                <main className="flex flex-col items-start justify-between lg:flex-row">
                    {/* Services */}
                    <div className=" grid-cols-2 gap-[1rem] max-w-[58rem] hidden lg:grid">
                        {services.map((service) => (
                            <div
                                key={service.id}
                                onClick={() => setActiveService(service)}
                                className={cn(`flex items-center gap-x-[1.2rem] bg-white px-[2rem] py-[1.5rem] rounded-[1.2rem] cursor-pointer border-[.1rem] border-gery-100`, {
                                    "border-primary": activeService.id === service.id
                                })}
                            >
                                <service.icon />
                                <p className="text-black font-semibold">{service.title}</p>
                            </div>
                        ))}
                    </div>

                    {/* Mobile: Service Dropdown */}
                    <div className="lg:hidden relative mb-6 w-full text-black">
                        <button
                            type="button"
                            onClick={() => setIsServiceDropdownOpen(!isServiceDropdownOpen)}
                            className="w-full flex items-center justify-between bg-white px-4 py-[1.2rem] rounded-[1.2rem] border-[.1rem] border-grey-100"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-[2.4rem] h-[2.4rem] flex items-center justify-center">
                                    {React.createElement(activeService.smIcon)}
                                </div>
                                <span className="font-semibold text-gray-900">{activeService.title}</span>
                            </div>
                            <ChevronDown
                                className={`w-10 h-10 text-gray-600 transition-transform ${isServiceDropdownOpen ? "rotate-180" : ""
                                    }`}
                            />
                        </button>

                        {isServiceDropdownOpen && (
                            <div className="mt-2 absolute max-h-[30rem] no-scrollbar over w-full bg-white text-white rounded-xl border-2 border-gray-200 overflow-auto z-10">
                                {services.map((service) => (
                                    <button
                                        type="button"
                                        key={service.id}
                                        onClick={() => {
                                            setActiveService(service);
                                            setIsServiceDropdownOpen(false);
                                        }}
                                        className={`w-full flex items-center gap-3 px-4 py-3 border-b border-grey-100 last:border-b-0 ${activeService.id === service.id ? "bg-purple-50" : "hover:bg-gray-50"
                                            }`}
                                    >
                                        <service.smIcon />
                                        <span className="font-semibold text-grey-400">{service.title}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Form */}
                    <form onSubmit={handleFormSubmit} className="bg-white lg:max-w-[62rem] space-y-[2.4rem] w-full px-[2.5rem] py-[3.5rem] rounded-[1.2rem] border-[.1rem] border-[#E8E8E8]">
                        <h1 className="font-bold text-[2.5rem] font-playfair text-black">
                            {activeService.title} Services
                        </h1>

                        {SERVICE_OPTIONS.map((option) => (
                            <CustomOptionFieldset
                                key={option.key}
                                title={option.title}
                                active={activeOption === option.key}
                                onToggle={() => handleOptionToggle(option.key)}
                            >
                                {option.fields.map((field) => {
                                    switch (field) {
                                        case "fullName":
                                            return (
                                                <Input
                                                    key={field}
                                                    placeholder="Full name"
                                                    {...register(`data.${option.key}.fullName`)}
                                                />
                                            );
                                        case "email":
                                            return (
                                                <Input
                                                    key={field}
                                                    placeholder="Email address"
                                                    type="email"
                                                    {...register(`data.${option.key}.email`)}
                                                />
                                            );
                                        case "platformUrl":
                                            if (option.key !== "address_reviews") return null;

                                            return (
                                                <Input
                                                    key={field}
                                                    placeholder="Platform URL"
                                                    type="url"
                                                    {...register("data.address_reviews.platformUrl")}
                                                />
                                            );

                                        case "additionalInfo":
                                            if (option.key !== "address_reviews") return null;

                                            return (
                                                <Textarea
                                                    key={field}
                                                    rows={7}
                                                    placeholder="Additional information"
                                                    {...register("data.address_reviews.additionalInfo")}
                                                />
                                            );

                                        case "quantity":
                                            return (
                                                <Input
                                                    key={field}
                                                    placeholder={
                                                        option.key === "respond_feedback"
                                                            ? "Available reviews"
                                                            : option.key === "address_reviews"
                                                                ? "Number of reviews to remove"
                                                                : "Quantity"
                                                    }
                                                    type="number"
                                                    value={getQuantityForOption(option.key) || ""}
                                                    onChange={handleQuantityChange(option.key)}
                                                    min={0}
                                                />
                                            );
                                        case "pricing":
                                            return (
                                                <Input
                                                    key={field}
                                                    disabled
                                                    placeholder="Pricing"
                                                    value={(`$${calculatePrice({
                                                        price: option.price,
                                                        quantity: getQuantityForOption(option.key),
                                                    })}`)}
                                                    variation="secondary"
                                                />
                                            );
                                        default:
                                            return null;
                                    }
                                })}

                                <p className="text-black">Price per review: ${option.price}</p>
                            </CustomOptionFieldset>
                        ))}


                        <Button
                            type="submit"
                            className="w-full"
                            disabled={!isActiveOptionValid() || isSubmitting}
                        >
                            {isSubmitting && <Spinner />} Purchase
                        </Button>

                    </form>
                </main>
            </Wrapper>
        </section>
    );
}