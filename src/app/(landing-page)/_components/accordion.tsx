"use client";

import { AccordionIcon } from "@/src/icons";
import { cn } from "@/src/utils";
import { useState, useEffect } from "react";
import { useRef } from "react";

export interface FAQ {
  id: number;
  question: string;
  answer: string;
}

interface AccordionProps {
  accordionData: FAQ[];
}

export default function Accordion({ accordionData }: AccordionProps) {
  const [openItems, setOpenItems] = useState<boolean[]>(
    accordionData.map((_, index) => index === -1),
  );
  const accordionContainerRef = useRef<(HTMLElement | null | undefined)[]>([]);

  const handleToggle = (targetIndex: number) => {
    setOpenItems((prevOpenItems) =>
      prevOpenItems.map((item, index) =>
        index === targetIndex ? !item : false,
      ),
    );
  };

  useEffect(() => {
    accordionContainerRef.current?.forEach((accordionItem, index) => {
      const accordionItemHeight = openItems[index]
        ? `${accordionItem?.scrollHeight}px`
        : "0px";
      accordionItem?.style.setProperty("height", accordionItemHeight);
    });
  }, [openItems]);

  return (
    <ul className="flex flex-col gap-[1.6rem]">
      {accordionData.map((accordionItem, index) => (
        <li
          key={index}
          className={cn(
            "overflow-hidden rounded-[1rem] border-[1px] bg-white text-[#666666]  border-[#E8E8E8] text-base [&>*]:px-[1rem] lg:[&>*]:px-[1.6rem]",
          )}
        >
          <button
            className={cn(
              "flex w-full items-center justify-between gap-[1.2rem] rounded-[1rem] py-[1.6rem] text-left text-sm font-bold tracking-[-0.11px] lg:py-[1rem] lg:text-base",
            )}
            onClick={() => handleToggle(index)}
          >
            {accordionItem.question}
            <i className="flex size-[2.2rem] shrink-0 items-center justify-center rounded-full bg-white p-1 lg:size-[3.5rem]">
              <AccordionIcon
                className={cn("transition-all duration-300", {
                  "rotate-180": openItems[index],
                })}
                variant={openItems[index] ? "open" : "close"}
              />
            </i>
          </button>

          <section
            ref={(accordionItem) => {
              accordionContainerRef.current[index] = accordionItem;
            }}
            className="overflow-hidden transition-[height] duration-200 ease-linear "
          >
            <p
              dangerouslySetInnerHTML={{ __html: accordionItem.answer }}
              className="select-none pb-[1.4rem] text-xs font-normal leading-[2.1rem] text-[#666666] lg:pb-[3rem] lg:text-base lg:leading-[3rem]"
            />
          </section>
        </li>
      ))}
    </ul>
  );
}
