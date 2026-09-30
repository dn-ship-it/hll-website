"use client";

import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

import { GradientRevealTextSlow, HLLOutlineButton } from "@/components/hll";
import { SERVICE_GUTTER } from "@/components/marketing/services/service-chrome";
import { useScaleToViewport } from "@/components/marketing/use-scale-to-viewport";
import type { IndustryPageData } from "@/types/industry";

// Figma footer's industry groups; the switcher lists the same set.
const INDUSTRY_LINKS = [
  { label: "Healthcare", href: "/industries/healthcare" },
  { label: "Payments", href: "/industries/payments" },
  { label: "Insurance", href: "/industries/insurance" },
  { label: "Pharmaceuticals", href: "/industries/pharmaceuticals" },
];

export function IndustryHero({
  data,
  category,
  accentColor,
}: {
  data: IndustryPageData["hero"];
  category: string;
  accentColor: string;
}) {
  const [activeFilter, setActiveFilter] = useState(data.filters[0]?.id ?? "");
  const [switcherOpen, setSwitcherOpen] = useState(false);
  const windowRef = useRef<HTMLDivElement>(null);
  useScaleToViewport(windowRef);

  return (
    <>
      <div className={`pt-[18px] ${SERVICE_GUTTER}`}>
        <p className="text-[clamp(1.5rem,2.38vw,2.25rem)] font-normal leading-[1.16] text-[var(--hll-dark-grey)]">
          {category}
        </p>
      </div>

      <section
        className={`pt-[clamp(8rem,19.25vw,18.1875rem)] ${SERVICE_GUTTER}`}
      >
        {/* Figma: the industry name in its own colour at Regular weight
            ("colour of Industry name will be a colour set to the industry"),
            the claim below it in the Light H1. */}
        <h1 className="text-[clamp(2rem,4.23vw,4rem)] leading-[1.16]">
          <span className="block font-normal" style={{ color: accentColor }}>
            {data.title}
          </span>
          <GradientRevealTextSlow
            text={data.headline}
            variant="industries"
            className="block max-w-none font-light text-[var(--hll-dark-grey)]"
            fontSize="clamp(2rem, 4.23vw, 4rem)"
            letterSpacing="0"
            lineHeight="1.16"
          />
        </h1>

        <div
          role="tablist"
          aria-label="Sub-industries"
          className="mt-8 flex flex-wrap gap-2"
        >
          {data.filters.map((filter) => (
            <HLLOutlineButton
              key={filter.id}
              as="button"
              type="button"
              role="tab"
              aria-selected={activeFilter === filter.id}
              onClick={() => setActiveFilter(filter.id)}
              variant="industries"
              size="md"
              radius={0.21}
              shapeSize={1}
              strokeWidth={0.028}
              className="service-tab shrink-0"
              style={{
                width: "max-content",
                height: 38,
                padding: "0 21px",
                borderRadius: 4,
                ["--service-tab-accent" as string]: accentColor,
              }}
              labelStyle={{
                fontSize: 12,
                letterSpacing: "0.25em",
                fontFamily: "var(--hll-font-aeonik)",
                color: "var(--hll-dark-grey)",
              }}
            >
              {filter.label}
            </HLLOutlineButton>
          ))}
        </div>

        <div
          ref={windowRef}
          className="relative z-10 mt-8 aspect-[1452/982] w-full origin-center overflow-hidden rounded-lg will-change-transform"
          style={{
            background: `#D9D9D9 ${data.image ? `url(${data.image}) center / cover` : ""}`,
          }}
        >
          {/* Figma: "Clicking on the sticky button opens an expanded view of
              the industries page to switch between them". */}
          <div className="absolute left-1/2 top-[44.8%] -translate-x-1/2">
            <button
              type="button"
              aria-expanded={switcherOpen}
              onClick={() => setSwitcherOpen((open) => !open)}
              className="inline-flex h-9 items-center gap-2 rounded-[4px] bg-[var(--hll-light-grey)] px-[21px] text-[12px] uppercase leading-none tracking-[0.25em] text-[var(--hll-dark-grey)]"
            >
              {data.overlayLabel}
              <ChevronDown className="size-3.5" strokeWidth={1.4} aria-hidden />
            </button>
            {switcherOpen ? (
              <ul className="absolute left-0 right-0 top-11 overflow-hidden rounded-[4px] bg-[var(--hll-bg)] py-1 shadow-[0_12px_40px_rgba(0,0,0,0.12)]">
                {INDUSTRY_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="block px-[21px] py-2 text-[12px] uppercase tracking-[0.25em] text-[var(--hll-dark-grey)] hover:bg-[var(--hll-light-grey)]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
}
