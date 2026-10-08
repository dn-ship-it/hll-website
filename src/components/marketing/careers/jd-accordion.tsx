"use client";

import { useState } from "react";

import type { CareerSection } from "@/data/careers-page";

/**
 * Figma JD: "Simple accordion design where plus sign opens the section and
 * minus closes it. one always stays open on load." Headers in the Button style
 * at 14px, a hairline under each, the open body from 30% across.
 */
export function JdAccordion({ sections }: { sections: readonly CareerSection[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div>
      {sections.map((section, i) => {
        const isOpen = open === i;
        const id = `jd-section-${i}`;
        return (
          <div key={section.title} className={i > 0 ? "pt-[27px] lg:pt-[57px]" : undefined}>
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={id}
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between text-left lg:items-start lg:px-[23px]"
            >
              <span className="text-[10px] uppercase leading-[1.16] tracking-[0.25em] text-[var(--hll-dark-grey)] lg:pt-[3px] lg:text-[14px]">
                {section.title}
              </span>
              <span aria-hidden className="text-[18px] leading-[12px] text-[var(--hll-dark-grey)] lg:text-[20px] lg:leading-[1.16] lg:tracking-[0.25em]">
                {isOpen ? "−" : "+"}
              </span>
            </button>
            {/* Hairlines only between sections: a closed header has its own,
                27px under it; an open one's comes after its body, so none sits
                between the title and its text. Mobile: out to 8px from the
                edges. */}
            {isOpen ? null : (
              <div data-line className="-mx-3 mt-[27px] h-px bg-[var(--hll-mid-grey)] lg:mx-0 lg:mt-[51px]" />
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
