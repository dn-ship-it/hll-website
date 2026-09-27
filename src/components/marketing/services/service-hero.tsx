"use client";

import { useState } from "react";

import {
  CornerRipple,
  GradientRevealTextSlow,
  HLLOutlineButton,
  SERVICE_TO_RIPPLE,
  type ServiceVariant,
} from "@/components/hll";
import type { ServicePageData } from "@/data/services/types";
import type { ServiceDemoConfig } from "@/types/service-demo";

import { ServiceDemoWindow } from "./service-demo-window";

const FOUNDATION_TAB_GRADIENT = ["#FB8330", "#FE5844", "#FF836B", "#FFE23F"];
const FOUNDATION_TAB_BORDER =
  "linear-gradient(90deg, #FB8330 0%, #FE5844 41.35%, #FF836B 64.42%, #FFE23F 100%)";

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
    <section
      className={`relative ${
        variant === "hll-foundation"
          ? "bg-white px-5 pb-0 pt-[160px]"
          : "overflow-hidden px-[clamp(1.25rem,4vw,3rem)] pb-[clamp(2rem,5vw,3rem)] pt-6"
      }`}
    >
      {/* The ripple mesh is this service's own backdrop — the usage its
          palettes were authored for. Most variants are tuned near-grayscale,
          so the scrim above it is only there to hold the text contrast
          steady on the more saturated ones. */}
      {variant === "hll-foundation" ? null : <CornerRipple variant={rippleVariant} contained />}
      {variant === "hll-foundation" ? null : (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/85 via-white/70 to-white"
        />
      )}

      <div className="relative mx-auto max-w-[90rem]">
        <GradientRevealTextSlow
          as="h1"
          text={data.headline}
          variant={variant}
          className={`block tracking-tight text-black ${
            variant === "hll-foundation" ? "max-w-none" : "max-w-[min(100%,48rem)]"
          }`}
          fontSize="clamp(2rem, 4.23vw, 4rem)"
          letterSpacing="0"
        />

        {data.support && variant !== "hll-foundation" ? (
          <p className="mt-6 max-w-[min(100%,42rem)] text-[clamp(0.875rem,1.32vw,1.25rem)] leading-[1.25] text-black/55">
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
          className={`flex flex-wrap gap-y-2 ${
            variant === "hll-foundation"
              ? "mt-6 gap-x-[34px]"
              : "mt-8 gap-x-6 border-b border-black/8 pb-4"
          }`}
        >
          {data.tabs.map((tab) => (
            variant === "hll-foundation" ? (
              <HLLOutlineButton
                key={tab.id}
                as="button"
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
                variant={variant}
                gradient={FOUNDATION_TAB_GRADIENT}
                baseOpacity={0}
                size="md"
                radius={0.21}
                shapeSize={1}
                strokeWidth={0.028}
                style={{
                  width: "max-content",
                  height: 38,
                  padding: "11px 21px",
                  borderRadius: 4,
                  border: "1px solid transparent",
                  boxSizing: "border-box",
                  background: `linear-gradient(#fff, #fff) padding-box, ${FOUNDATION_TAB_BORDER} border-box`,
                }}
                labelStyle={{ fontSize: 10, letterSpacing: "2.5px" }}
                className="shrink-0"
              >
                {tab.label}
              </HLLOutlineButton>
            ) : (
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
            )
          ))}
        </div>

        <ServiceDemoWindow
          config={demo}
          activeTabKey={activeTab}
          foundation={variant === "hll-foundation"}
        />
      </div>
    </section>
  );
}
