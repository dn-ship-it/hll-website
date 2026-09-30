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
          <div key={section.title} className={i > 0 ? "pt-[57px]" : undefined}>
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={id}
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-start justify-between px-[23px] text-left"
            >
              <span className="pt-[3px] text-[14px] uppercase leading-[1.16] tracking-[0.25em] text-[var(--hll-dark-grey)]">
                {section.title}
              </span>
              <span aria-hidden className="text-[20px] leading-[1.16] tracking-[0.25em] text-[var(--hll-dark-grey)]">
                {isOpen ? "−" : "+"}
              </span>
            </button>
            <div data-line className={`h-px bg-[var(--hll-mid-grey)] ${isOpen ? "mt-[26px]" : "mt-[51px]"}`} />
            <div id={id} hidden={!isOpen}>
              <div className="space-y-[30px] py-[54px] lg:pl-[30%]">
                {section.paragraphs.map((text, p) => (
                  <p key={p} className="text-[clamp(1.125rem,1.59vw,1.5rem)] leading-[1.25] text-[var(--hll-dark-grey)]">
                    {text}
                  </p>
                ))}
              </div>
              <div data-line className="h-px bg-[var(--hll-mid-grey)]" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
