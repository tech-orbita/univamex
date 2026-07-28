"use client";

import { useState } from "react";
import { Compass, Lightbulb, Route } from "lucide-react";

const icons = [Compass, Lightbulb, Route] as const;

type ProgramFitAccordionProps = {
  items: string[];
};

export function ProgramFitAccordion({ items }: ProgramFitAccordionProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div
      className="flex flex-col border-y border-slate-200 lg:min-h-[13.5rem] lg:flex-row"
      data-reveal-group
    >
      {items.map((item, index) => {
        const active = index === activeIndex;
        const Icon = icons[index % icons.length];

        return (
          <button
            aria-expanded={active}
            className={`group relative flex min-h-14 flex-1 items-center gap-3 overflow-hidden border-b border-slate-200 px-3 py-2.5 text-left transition-[flex-grow,background-color,color] duration-500 last:border-b-0 focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#1e40af] sm:min-h-32 sm:flex-col sm:items-stretch sm:justify-between sm:gap-0 sm:px-5 sm:py-5 lg:min-h-0 lg:border-b-0 lg:border-r lg:last:border-r-0 lg:hover:flex-[1.22] ${
              active
                ? "bg-[#04215e] text-white lg:flex-[1.35]"
                : "bg-white text-[#04215e] hover:bg-[#f3f6fb]"
            }`}
            data-reveal-item
            key={item}
            type="button"
            onClick={() => setActiveIndex(index)}
            onFocus={() => setActiveIndex(index)}
            onMouseEnter={() => setActiveIndex(index)}
          >
            <span className="flex shrink-0 items-center justify-between sm:w-full">
              <Icon
                aria-hidden="true"
                className={`h-5 w-5 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110 ${
                  active ? "text-[#f0bd4b]" : "text-[#1e40af]"
                }`}
              />
              <span
                aria-hidden="true"
                className={`hidden h-px transition-all duration-500 sm:block ${
                  active ? "w-16 bg-[#f0bd4b]" : "w-8 bg-slate-300 group-hover:w-12"
                }`}
              />
            </span>
            <span className="max-w-xs text-xs font-bold leading-4 sm:mt-5 sm:text-base sm:leading-6 lg:mt-6">
              {item}
            </span>
          </button>
        );
      })}
    </div>
  );
}
