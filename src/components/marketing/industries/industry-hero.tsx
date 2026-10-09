"use client";

import { useEffect, useRef, useState } from "react";
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
  const [switcherOpen, setSwitcherOpen] = useState(false);
  const windowRef = useRef<HTMLDivElement>(null);
  useScaleToViewport(windowRef, { desktopOnly: true });

  // A tap or click anywhere outside the switcher closes its menu.
  useEffect(() => {
    if (!switcherOpen) return undefined;
    const close = (event: PointerEvent) => {
      if (!(event.target as Element).closest("[data-industry-switcher]"))
        setSwitcherOpen(false);
    };
    window.addEventListener("pointerdown", close);
    return () => window.removeEventListener("pointerdown", close);
  }, [switcherOpen]);

  return (
    <>
      <div className={`pt-2 lg:pt-[18px] ${SERVICE_GUTTER}`}>
        <p className="text-[24px] font-normal leading-[1.16] text-[var(--hll-dark-grey)] lg:text-[clamp(1.5rem,calc(2.38*var(--vw)),2.25rem)]">
          {category}
        </p>
      </div>

      <section
        // z-10: the switcher's menu opens over the section below it.
        className={`relative z-10 pt-[154px] lg:pt-[clamp(8rem,calc(19.25*var(--vw)),18.1875rem)] ${SERVICE_GUTTER}`}
      >
        {/* Figma: the industry name in its own colour at Regular weight
            ("colour of Industry name will be a colour set to the industry"),
            the claim below it in the Light H1. */}
        <h1 className="text-[30px] leading-[1.16] lg:text-[clamp(2rem,calc(4.23*var(--vw)),4rem)]">
          <span className="block font-normal" style={{ color: accentColor }}>
            {data.title}
          </span>
          <GradientRevealTextSlow
            text={data.headline}
            variant="industries"
            className="block max-w-[355px] font-light text-[var(--hll-dark-grey)] lg:max-w-none"
            fontSize="clamp(30px, calc(4.23*var(--vw)), 4rem)"
            letterSpacing="0"
            lineHeight="1.16"
          />
        </h1>

        {/* QA I-01: the sub-industry chips are labels with a hover glow
            only, with no selected or pressed state. Mobile: the 36px
            "Button Mobile" outline chips, 12px under the claim and 6px
            apart (see the service hero). */}
        <div
          role="list"
          aria-label="Sub-industries"
          className="mt-3 flex flex-wrap gap-[6px] [--tab-h:36px] [--tab-r:3px] [--tab-size:10px] [--tab-track:2.5px] lg:mt-8 lg:gap-2 lg:[--tab-h:38px] lg:[--tab-r:4px] lg:[--tab-size:12px] lg:[--tab-track:0.25em]"
        >
          {data.filters.map((filter) => (
            <HLLOutlineButton
              key={filter.id}
              as="span"
              role="listitem"
              variant="industries"
              size="md"
              radius={0.21}
              shapeSize={1}
              strokeWidth={0.028}
              className="shrink-0"
              style={{
                width: "max-content",
                height: "var(--tab-h)",
                padding: "0 21px",
                borderRadius: "var(--tab-r)",
                cursor: "default",
              }}
              labelStyle={{
                fontSize: "var(--tab-size)",
                letterSpacing: "var(--tab-track)",
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
          className="relative z-10 mt-8 aspect-[362/244] w-full origin-center overflow-hidden rounded-[6px] will-change-transform lg:aspect-[1452/982] lg:rounded-lg"
          style={{
            background: `#D9D9D9 ${data.image ? `url(${data.image}) center / cover` : ""}`,
          }}
        >
          {/* Figma: "Clicking on the sticky button opens an expanded view of
              the industries page to switch between them". */}
          <div data-industry-switcher className="absolute left-1/2 top-[44.8%] hidden -translate-x-1/2 lg:block">
            <Switcher
              label={data.overlayLabel}
              open={switcherOpen}
              onToggle={() => setSwitcherOpen((open) => !open)}
            />
          </div>
        </div>

        {/* Figma Industry mobile: the switcher sits 54px under the window. */}
        <div className="relative z-20 mt-[54px] flex justify-center lg:hidden">
          <div data-industry-switcher className="relative">
            <Switcher
              label={data.overlayLabel}
              open={switcherOpen}
              onToggle={() => setSwitcherOpen((open) => !open)}
            />
          </div>
        </div>
      </section>
    </>
  );
}

function Switcher({
  label,
  open,
  onToggle,
}: {
  label: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <>
      <button
        type="button"
        aria-expanded={open}
        onClick={onToggle}
        className="inline-flex h-[34px] items-center gap-2 rounded-[3px] bg-[var(--hll-light-grey)] px-[21px] text-[10px] uppercase leading-none tracking-[0.25em] text-[var(--hll-dark-grey)] lg:h-9 lg:rounded-[4px] lg:text-[12px]"
      >
        {label}
        <ChevronDown className="size-3.5" strokeWidth={1.4} aria-hidden />
      </button>
      {open ? (
        <ul className="absolute left-0 right-0 top-10 z-20 overflow-hidden rounded-[4px] bg-[var(--hll-bg)] py-1 shadow-[0_12px_40px_rgba(0,0,0,0.12)] lg:top-11">
          {INDUSTRY_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="block px-[21px] py-2 text-[10px] uppercase tracking-[0.25em] text-[var(--hll-dark-grey)] hover:bg-[var(--hll-light-grey)] lg:text-[12px]"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
}
