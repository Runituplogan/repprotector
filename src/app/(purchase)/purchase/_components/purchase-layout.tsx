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
import { SERVICE_OPTIONS, ServiceOptionKey, FormSchemaType } from "../_types";
import { Button } from "@/src/components/button";
import { cn, formatNumber } from "@/src/utils";
import { ChevronDown } from "lucide-react";
import { Textarea } from "@/src/components/text-area";
import Spinner from "@/src/components/spinner";
import toast from "react-hot-toast";
import Select from "@/src/components/select";

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
    title: "Google My Business",
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
    slug: "better-business-bureau",
    icon: OpenTable,
    smIcon: PlayStoreXs,
    title: "Better Business Bureau",
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

export const DURATION_PRICING = [
  {
    label: "1 Month",
    value: "1",
    price: 500,
  },
  {
    label: "2 Months",
    value: "2",
    price: 900,
  },
  {
    label: "3 Months",
    value: "3",
    price: 1250,
  },
  {
    label: "6 Months",
    value: "6",
    price: 2300,
  },
  {
    label: "1 Year",
    value: "12",
    price: 4000,
  },
] as const;

export const calculatePrice = ({ price, quantity }: CalculatePriceArgs) => {
  const qty = Number(quantity) || 0;
  return formatNumber(price * qty);
};

export default function PurchaseLayout({
  showBackButton = true,
  className = "",
}: {
  showBackButton?: boolean;
  className?: string;
}) {
  const params = useSearchParams();
  const slug = params.get("service");

  const defaultService: Service =
    services.find((service) => service.slug === slug) ?? services[0];

  const [activeService, setActiveService] = useState<Service>(defaultService);

  const [activeOption, setActiveOption] = useState<ServiceOptionKey | null>(
    null,
  );

  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { watch, register, setValue, control } = useForm<FormSchemaType>({
    mode: "onChange",
    defaultValues: {
      service: slug ?? services[0].slug,
      option: undefined,
      data: {
        auto_review_outreach: {
          fullName: "",
          email: "",
          quantity: 0,
          duration: "",
          pricing: 0,
        },
        address_reviews: {
          fullName: "",
          email: "",
          platformUrl: "",
          quantity: 0,
          duration: "",
          additionalInfo: "",
          pricing: 0,
        },
        respond_feedback: {
          fullName: "",
          email: "",
          quantity: 0,
          duration: "",
          pricing: 0,
        },
      },
    },
  });

  const getDurationForOption = (optionKey: ServiceOptionKey) =>
    watch(`data.${optionKey}.duration`) || "";

  const getUnitPriceForOption = (optionKey: ServiceOptionKey) => {
    const durationValue = getDurationForOption(optionKey);
    if (!durationValue) return 0;
    const found = DURATION_PRICING.find((d) => d.value === durationValue);
    return found?.price || 0;
  };

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

  const updatePricingForOption = (optionKey: ServiceOptionKey, newQuantity?: number) => {
    if (optionKey === "respond_feedback") {
      const durationValue = watch(`data.${optionKey}.duration`);
      if (!durationValue) {
        setValue(`data.${optionKey}.pricing`, 0);
      } else {
        const durationPrice = DURATION_PRICING.find(d => d.value === durationValue)?.price || 0;
        setValue(`data.${optionKey}.pricing`, durationPrice);
      }
    } else {
      const quantity = newQuantity !== undefined ? newQuantity : getQuantityForOption(optionKey);
      const selectedOption = SERVICE_OPTIONS.find((option) => option.key === optionKey);

      if (quantity === 0) {
        setValue(`data.${optionKey}.pricing`, 0);
      } else {
        const unitPrice = selectedOption?.price || 0;
        setValue(`data.${optionKey}.pricing`, unitPrice * quantity);
      }
    }
  };

  const handleQuantityChange =
    (optionKey: ServiceOptionKey) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        let newQuantity: number;

        if (value === "") {
          newQuantity = 0;
          setValue(`data.${optionKey}.quantity`, 0);
        } else {
          const numValue = parseInt(value, 10);
          if (!isNaN(numValue) && numValue >= 0) {
            newQuantity = numValue;
            setValue(`data.${optionKey}.quantity`, numValue);
          } else {
            newQuantity = 0;
          }
        }

       
        updatePricingForOption(optionKey, newQuantity);
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
        selectedData.phoneNumber &&
        String(selectedData.phoneNumber).length >= 8 &&
        selectedData.quantity &&
        selectedData.quantity >= 1 &&
        selectedData.pricing &&
        selectedData.pricing > 0
      );
    }

    if (activeOption === "address_reviews") {
      const data = selectedData as FormSchemaType["data"]["address_reviews"];
      return !!(
        data.fullName &&
        data.fullName.length >= 2 &&
        data.email &&
        data.email.includes("@") &&
        data.phoneNumber &&
        String(data.phoneNumber).length >= 8 &&
        data.platformUrl &&
        data.platformUrl.length > 0 &&
        data.quantity &&
        data.quantity >= 1 &&
        data.pricing &&
        data.pricing > 0
      );
    }

    if (activeOption === "respond_feedback") {
      const data = selectedData as FormSchemaType["data"]["respond_feedback"];

      return !!(
        data.fullName &&
        data.fullName.length >= 2 &&
        data.email &&
        data.email.includes("@") &&
        data.phoneNumber &&
        String(data.phoneNumber).length >= 8 &&
        data.duration &&
        data.duration.length > 0 &&
        data.platformUrl &&
        data.platformUrl.startsWith("http") &&
        data.pricing &&
        data.pricing > 0
      );
    }

    return false;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = watch();
      const optionConfig = SERVICE_OPTIONS.find(
        (o) => o.key === activeOption,
      );

      if (!optionConfig || !activeOption) {
        return;
      }

      const selectedOptionData = formData.data[activeOption];
      const quantity = selectedOptionData.quantity ?? 0;

      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service: activeService.title,
          serviceSlug: activeService.slug,

          optionKey: activeOption,
          optionTitle: optionConfig.title,

          unitPrice: activeOption === "respond_feedback" ? selectedOptionData.pricing : optionConfig.price,
          quantity: activeOption === "respond_feedback" ? 1 : quantity,
          totalPrice: selectedOptionData.pricing,

          customerEmail: selectedOptionData.email,
          phoneNumber: selectedOptionData.phoneNumber,
          duration: selectedOptionData.duration,

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
    <section
      className={cn(
        "no-scrollbar h-screen overflow-auto bg-[#F9F4FF] py-[2.5rem] lg:py-[5rem]",
        className,
      )}
    >
      <Wrapper className="space-y-[3.2rem] max-w-[135rem] lg:space-y-[4.4rem]">
        <Header showBackButton={showBackButton} />
        <ul className="relative mx-auto mt-[2.2rem] flex w-full max-w-[65rem] items-center justify-between px-[1.2rem] sm:px-[2rem]">

          <span className="absolute left-[6%] right-[6%] top-[30%] z-10 block h-[1px] bg-[#DFC9FA] sm:left-[4%] sm:right-[4%] lg:left-[10%] lg:right-[10%]"></span>


          <li className="z-20 flex flex-col items-center gap-[.6rem] sm:gap-[.8rem]">
            <div className="flex size-[3.2rem] sm:size-[3.6rem] lg:size-[4rem] items-center justify-center rounded-full border-[.2rem] border-white bg-primary text-xs sm:text-sm font-bold text-white shadow-[0_0_12px_rgba(0,0,0,0.35)]">
              1
            </div>
            <p className="text-xs sm:text-sm font-medium text-grey-600">
              Purchase
            </p>
          </li>


          <li className="z-20 flex flex-col items-center gap-[.6rem] sm:gap-[.8rem]">
            <div className="flex size-[3.2rem] sm:size-[3.6rem] lg:size-[4rem] items-center justify-center rounded-full border-[.2rem] border-white bg-primary text-xs sm:text-sm font-bold text-white shadow-[0_0_12px_rgba(0,0,0,0.35)]">
              2
            </div>
            <p className="max-w-[9rem] sm:max-w-none text-center text-xs sm:text-sm font-medium text-grey-600">
              Book a call with an expert
            </p>
          </li>

          <li className="z-20 flex flex-col items-center gap-[.6rem] sm:gap-[.8rem]">
            <div className="flex size-[3.2rem] sm:size-[3.6rem] lg:size-[4rem] items-center justify-center rounded-full border-[.2rem] border-white bg-primary text-xs sm:text-sm font-bold text-white shadow-[0_0_12px_rgba(0,0,0,0.35)]">
              3
            </div>
            <p className="text-xs sm:text-sm font-medium text-grey-600">
              Scale
            </p>
          </li>
        </ul>

        <main className="flex flex-col items-start justify-between lg:flex-row">
          {/* Services */}
          <div className="hidden max-w-[58rem] grid-cols-2 gap-[1rem] lg:grid">
            {services.map((service) => (
              <div
                key={service.id}
                onClick={() => setActiveService(service)}
                className={cn(
                  `border-gery-100 flex cursor-pointer items-center gap-x-[1.2rem] rounded-[1.2rem] border-[.1rem] bg-white px-[2rem] py-[1.5rem]`,
                  {
                    "border-primary": activeService.id === service.id,
                  },
                )}
              >
                <service.icon />
                <p className="font-semibold text-black">{service.title}</p>
              </div>
            ))}
          </div>

          {/* Mobile: Service Dropdown */}
          <div className="relative mb-6 w-full text-black lg:hidden">
            <button
              type="button"
              onClick={() => setIsServiceDropdownOpen(!isServiceDropdownOpen)}
              className="flex w-full items-center justify-between rounded-[1.2rem] border-[.1rem] border-grey-100 bg-white px-4 py-[1.2rem]"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-[2.4rem] w-[2.4rem] items-center justify-center">
                  {React.createElement(activeService.smIcon)}
                </div>
                <span className="text-gray-900 font-semibold">
                  {activeService.title}
                </span>
              </div>
              <ChevronDown
                className={`text-gray-600 h-10 w-10 transition-transform ${isServiceDropdownOpen ? "rotate-180" : ""
                  }`}
              />
            </button>

            {isServiceDropdownOpen && (
              <div className="no-scrollbar over border-gray-200 absolute z-10 mt-2 max-h-[30rem] w-full overflow-auto rounded-xl border-2 bg-white text-white">
                {services.map((service) => (
                  <button
                    type="button"
                    key={service.id}
                    onClick={() => {
                      setActiveService(service);
                      setIsServiceDropdownOpen(false);
                    }}
                    className={`flex w-full items-center gap-3 border-b border-grey-100 px-4 py-3 last:border-b-0 ${activeService.id === service.id
                      ? "bg-purple-50"
                      : "hover:bg-gray-50"
                      }`}
                  >
                    <service.smIcon />
                    <span className="font-semibold text-grey-400">
                      {service.title}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Form */}
          <form
            onSubmit={handleFormSubmit}
            className="w-full space-y-[2.4rem] rounded-[1.2rem] border-[.1rem] border-[#E8E8E8] bg-white px-[2.5rem] py-[3.5rem] lg:max-w-[62rem]"
          >
            <h1 className="font-playfair text-[2.5rem] font-bold text-black">
              {activeService.title}
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

                    case "phoneNumber":
                      return (
                        <Input
                          key={field}
                          placeholder="Phone number"
                          type="number"
                          {...register(`data.${option.key}.phoneNumber`)}
                        />
                      );

                    case "platformUrl":
                      return (
                        <Input
                          key={field}
                          placeholder="Company URL"
                          type="url"
                          {...register(`data.${option.key}.platformUrl`)}
                        />
                      );

                    case "additionalInfo":
                      return (
                        <Textarea
                          key={field}
                          rows={7}
                          placeholder="Additional information"
                          {...register(`data.${option.key}.additionalInfo`)}
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

                    case "pricing": {
                      const pricingValue = watch(`data.${option.key}.pricing`) || 0;
                      const total = formatNumber(pricingValue);
                      const unitPrice = option.price;

                      return (
                        <div key={field} className="space-y-[1.2rem]">
                          {option.key !== "respond_feedback" && (
                            <p className="text-black text-base">
                              Price per review: ${unitPrice}
                            </p>
                          )}


                          <Input
                            disabled
                            placeholder="Total"
                            value={pricingValue > 0 ? `Total: $${total}` : "Total: $0"}
                            variation="secondary"
                            className="text-[#B8B8B8]"
                          />
                        </div>
                      );
                    }

                    case "duration": {
                      return (
                        <div key={field} className="relative">
                          <Select
                            name={`data.${option.key}.duration`}
                            control={control}
                            options={DURATION_PRICING.map((d) => ({ label: d.label, value: d.value }))}
                            placeholder="Duration"
                            onChange={(selectedValue) => {
                              setValue(`data.respond_feedback.duration`, selectedValue);
                              updatePricingForOption(option.key);
                            }}
                          />
                        </div>
                      );
                    }

                    default:
                      return null;
                  }
                })}

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