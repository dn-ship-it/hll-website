"use client";

import { useState } from "react";

import type { IndustryPageData } from "@/types/industry";
import { MediaPlaceholder } from "@/components/marketing/home/primitives";

export function IndustryHero({
  data,
  accentColor,
}: {
  data: IndustryPageData["hero"];
  accentColor: string;
}) {
  const [activeFilter, setActiveFilter] = useState(data.filters[0]?.id ?? "");

  return (
    <section className="px-[clamp(1.25rem,4vw,3rem)] pb-[clamp(2rem,5vw,3rem)]">
      <div className="mx-auto max-w-[90rem]">
        <p
          className="text-[10px] font-medium uppercase tracking-[0.24em]"
          style={{ color: accentColor }}
        >
          {data.title}
        </p>

        <h2
          className="mt-4 max-w-[min(100%,42rem)] font-light leading-[1.15] tracking-tight text-black"
          style={{ fontSize: "clamp(2rem, 4vw + 0.5rem, 3.25rem)" }}
        >
          {data.headline}
        </h2>

        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-b border-black/8 pb-4">
          {data.filters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              onClick={() => setActiveFilter(filter.id)}
              className={`text-[10px] uppercase tracking-[0.18em] transition ${
                activeFilter === filter.id
                  ? "text-black"
                  : "text-black/40 hover:text-black/70"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="relative mt-8 overflow-hidden rounded-sm">
          <MediaPlaceholder
            className="aspect-[16/7] min-h-[clamp(12rem,32vw,20rem)] w-full"
            label="Industry hero"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-pink-200/30 via-orange-200/20 to-cyan-200/30 mix-blend-multiply" />

          <div className="absolute right-[clamp(1rem,4vw,2rem)] top-1/2 -translate-y-1/2">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/90 px-4 py-1.5 text-[10px] uppercase tracking-[0.18em] text-black/70 shadow-sm backdrop-blur-sm">
              {data.overlayLabel}
              <svg
                aria-hidden
                className="size-3 text-black/45"
                viewBox="0 0 12 12"
                fill="none"
              >
                <path
                  d="M3 4.5 6 7.5 9 4.5"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
