"use client";

import { useState } from "react";

import {
  GradientRevealTextSlow,
  HLLOutlineButton,
  SERVICE_TO_RIPPLE,
  type ServiceVariant,
} from "@/components/hll";
import type { ServicePageData } from "@/data/services/types";
import type { ServiceDemoConfig } from "@/types/service-demo";

import { SERVICE_GUTTER } from "./service-chrome";
import { ServiceDemoWindow } from "./service-demo-window";
import { getServiceTheme } from "./service-theme";

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
  const theme = getServiceTheme(variant);

  return (
    <section className={`relative overflow-hidden pb-0 pt-[clamp(8rem,19.64vw,18.5625rem)] ${SERVICE_GUTTER}`}>
      <div className="relative">
        <GradientRevealTextSlow
          as="h1"
          text={data.headline}
          variant={variant}
          className="block max-w-none font-light text-[var(--hll-dark-grey)]"
          fontSize="clamp(2rem, 4.23vw, 4rem)"
          letterSpacing="0"
          lineHeight="1.16"
        />

        {/* Buttons, not anchors. These used to be href="#<id>" links, and
            because each id also matches a capability section further down the
            page, clicking one jumped the demo out of view — so switching tabs
            looked like it did nothing at all. */}
        <div
          role="tablist"
          aria-label="Service demos"
          className="mt-[clamp(1.1875rem,2.25vw,2.125rem)] flex flex-wrap gap-2"
        >
          {data.tabs.map((tab) => (
            <HLLOutlineButton
              key={tab.id}
              as="button"
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              variant={variant}
              gradient={theme.tabGradient}
              size="md"
              radius={0.21}
              shapeSize={1}
              strokeWidth={0.028}
              style={{
                width: "max-content",
                height: 38,
                padding: "0 21px",
                borderRadius: 4,
                // Read by .service-tab: Figma marks the active tab with a
                // solid hairline in the service colour, drawn above the
                // canvas's resting grey hairline.
                ["--service-tab-accent" as string]: theme.accent,
              }}
              labelStyle={{
                fontSize: 12,
                letterSpacing: "0.25em",
                fontFamily: "var(--hll-font-aeonik)",
                color: "var(--hll-dark-grey)",
              }}
              className="service-tab shrink-0"
            >
              {tab.label}
            </HLLOutlineButton>
          ))}
        </div>

        <ServiceDemoWindow
          config={demo}
          activeTabKey={activeTab}
          background={theme.demoBackground}
          ripple={rippleVariant}
        />
      </div>
    </section>
  );
}
