"use client";

import { useState } from "react";

import type { CareerSection } from "@/data/careers-page";

/** Simple accordion: plus opens a section, minus closes it, one always open on load. Headers in the Button style at 14px. */
export function JdAccordion({ sections }: { sections: readonly CareerSection[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div>
      {sections.map((section, i) => {
        const isOpen = open === i;
        const id = `jd-section-${i}`;
        return (
          <div key={section.title}>
            {/* The whole row is the button, including the space above the title and down to its hairline. */}
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={id}
              onClick={() => setOpen(isOpen ? null : i)}
              className={`flex w-full cursor-pointer items-center justify-between text-left lg:items-start lg:px-[23px] ${
                i > 0 ? "pt-[27px] lg:pt-[57px]" : ""
              } ${isOpen ? "" : "pb-[27px] lg:pb-[51px]"} ${
                // The first section, open on load, has no padding, so its header was a 12px tap target on phones: reach 12px past it either way.
                i === 0 && isOpen ? "relative before:absolute before:inset-x-0 before:-inset-y-3 before:content-['']" : ""
              }`}
            >
              <span className="text-[10px] uppercase leading-[1.16] tracking-[0.25em] text-[var(--hll-dark-grey)] lg:pt-[3px] lg:text-[14px]">
                {section.title}
              </span>
              <span aria-hidden className="text-[18px] leading-[12px] text-[var(--hll-dark-grey)] lg:text-[20px] lg:leading-[1.16] lg:tracking-[0.25em]">
                {isOpen ? "−" : "+"}
              </span>
            </button>
            {/* Hairlines only between sections: a closed header has its own; an open one's comes after its body. */}
            {isOpen ? null : (
              <div data-line className="-mx-3 h-px bg-[var(--hll-mid-grey)] lg:mx-0" />
            )}
            <div id={id} hidden={!isOpen}>
              <div className="space-y-[18px] pb-[54px] pt-[27px] lg:space-y-[30px] lg:pl-[30%] lg:pt-[51px]">
                {section.paragraphs.map((text, p) => (
                  <p key={p} className="text-[14px] leading-[1.25] text-[var(--hll-dark-grey)] lg:text-[clamp(1.125rem,calc(1.59*var(--vw)),1.5rem)]">
                    {text}
                  </p>
                ))}
              </div>
              <div data-line className="-mx-3 h-px bg-[var(--hll-mid-grey)] lg:mx-0" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
