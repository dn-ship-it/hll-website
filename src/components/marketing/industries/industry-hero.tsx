"use client";

import { useRef } from "react";

import { GradientRevealTextSlow, HLLOutlineButton } from "@/components/hll";
import { SERVICE_GUTTER } from "@/components/marketing/services/service-chrome";
import { useScaleToViewport } from "@/components/marketing/use-scale-to-viewport";
import type { IndustryPageData } from "@/types/industry";

export function IndustryHero({
  data,
  category,
  accentColor,
}: {
  data: IndustryPageData["hero"];
  category: string;
  accentColor: string;
}) {
  const windowRef = useRef<HTMLDivElement>(null);
  useScaleToViewport(windowRef, { desktopOnly: true });

  return (
    <>
      <div className={`pt-2 lg:pt-[18px] ${SERVICE_GUTTER}`}>
        <p className="text-[24px] font-normal leading-[1.16] text-[var(--hll-dark-grey)] lg:text-[clamp(1.5rem,calc(2.38*var(--vw)),2.25rem)]">
          {category}
        </p>
      </div>

      <section
        // QA I-11: less space above the title (240px at 1512).
        className={`relative z-10 pt-[154px] lg:pt-[clamp(7.5rem,calc(15.87*var(--vw)),15rem)] ${SERVICE_GUTTER}`}
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
            // QA I-06: each tag jumps to its capability panel below.
            <HLLOutlineButton
              key={filter.id}
              href={`#${filter.id}`}
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
          // QA I-10: never taller than the screen under the Nav Bar, so the
          // hero takes one scroll; the image crops to fit.
          className="relative z-10 mt-8 aspect-[362/244] w-full origin-center overflow-hidden rounded-[6px] will-change-transform lg:aspect-[1452/982] lg:max-h-[calc(100*var(--svh)-var(--nav-h)-2rem)] lg:rounded-lg"
          style={{
            background: `#D9D9D9 ${data.image ? `url(${data.image}) center / cover` : ""}`,
          }}
        >
        </div>

        {/* QA I-03: the industry switcher over the image (and under it on
            phones) is gone – it got lost over the picture, and on the 12 Oct
            call nobody knew what it was for. The menu switches industries. */}
      </section>
    </>
  );
}
