"use client";

import { useState } from "react";

import {
  CornerRipple,
  GradientRevealTextSlow,
  SERVICE_TO_RIPPLE,
  type ServiceVariant,
} from "@/components/hll";
import type { ServicePageData } from "@/data/services/types";
import type { ServiceDemoConfig } from "@/types/service-demo";

import { ServiceDemoWindow } from "./service-demo-window";

export function ServiceHero({
  data,
  demo,
  variant = "hll-foundation",
}: {
  data: ServicePageData["hero"];
  demo: ServiceDemoConfig;
  variant?: ServiceVariant;
}) {
  const [activeTab, setActiveTab] = useState<string>(data.tabs[0]?.id ?? "");
  const rippleVariant = SERVICE_TO_RIPPLE[variant] ?? "hll-foundation";

  return (
    <section className="relative overflow-hidden px-[clamp(1.25rem,4vw,3rem)] pb-[clamp(2rem,5vw,3rem)] pt-6">
      {/* The ripple mesh is this service's own backdrop — the usage its
          palettes were authored for. Most variants are tuned near-grayscale,
          so the scrim above it is only there to hold the text contrast
          steady on the more saturated ones. */}
      <CornerRipple variant={rippleVariant} contained />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/85 via-white/70 to-white"
      />

      <div className="relative mx-auto max-w-[90rem]">
        <GradientRevealTextSlow
          as="h1"
          text={data.headline}
          variant={variant}
          className="block max-w-[min(100%,48rem)] tracking-tight text-black"
          fontSize="clamp(2rem, 4vw + 0.5rem, 3.25rem)"
          letterSpacing="-0.01em"
        />

        {data.support ? (
          <p className="mt-6 max-w-[min(100%,42rem)] text-sm leading-7 text-black/55">
            {data.support}
          </p>
        ) : null}

        {/* Buttons, not anchors. These used to be href="#<id>" links, and
            because each id also matches a capability section further down the
            page, clicking one jumped the demo out of view — so switching tabs
            looked like it did nothing at all. */}
        <div
          role="tablist"
          aria-label="Service demos"
          className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-b border-black/8 pb-4"
        >
          {data.tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`cursor-pointer text-[10px] uppercase tracking-[0.18em] transition ${
                activeTab === tab.id ? "text-black" : "text-black/40 hover:text-black/70"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <ServiceDemoWindow config={demo} activeTabKey={activeTab} />
      </div>
    </section>
  );
}
