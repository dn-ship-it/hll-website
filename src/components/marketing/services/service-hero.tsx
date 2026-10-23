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
  capabilities = [],
}: {
  data: ServicePageData["hero"];
  demo: ServiceDemoConfig;
  variant?: ServiceVariant;
  /**
   * The page's capabilities. When given, the tags under the headline are
   * these and take you to each one's section (Hannan's review, 22 Oct:
   * "buttons that help people swap to the different sub-capabilities on the
   * page"; Figma "On tags"); the demo window keeps its first view.
   */
  capabilities?: { id: string; label: string }[];
}) {
  const [activeTab, setActiveTab] = useState<string>(data.tabs[0]?.id ?? "");
  const tags = capabilities.length
    ? capabilities
    : data.tabs.map((tab) => ({ id: tab.id, label: tab.label }));
  const [activeTag, setActiveTag] = useState<string>(tags[0]?.id ?? "");
  const onTag = (id: string) => {
    setActiveTag(id);
    if (!capabilities.length) {
      setActiveTab(id);
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const rippleVariant = SERVICE_TO_RIPPLE[variant] ?? "hll-foundation";
  const theme = getServiceTheme(variant);

  return (
    <section
      // QA C-10: less space above the title (240px at 1512), so the top
      // third of the demo window shows on load on a 13" laptop.
      className={`relative overflow-hidden pb-0 pt-[154px] lg:pt-[clamp(7.5rem,calc(15.87*var(--vw)),15rem)] ${SERVICE_GUTTER}`}
    >
      <div className="relative">
        <GradientRevealTextSlow
          as="h1"
          text={data.headline}
          variant={variant}
          className="block max-w-[355px] font-light text-[var(--hll-dark-grey)] [text-wrap:pretty] lg:max-w-none"
          fontSize="clamp(30px, calc(4.23*var(--vw)), 4rem)"
          letterSpacing="0"
          lineHeight="1.16"
        />

        {/* Buttons, not anchors. These used to be href="#<id>" links, and
            because each id also matches a capability section further down the
            page, clicking one jumped the demo out of view — so switching tabs
            looked like it did nothing at all. */}
        <div
          role={capabilities.length ? "navigation" : "tablist"}
          aria-label={capabilities.length ? "Capabilities on this page" : "Capability demos"}
          // Figma "Button Mobile" outline tabs: 36px, 3px corners, a 10px
          // label, 6px apart; the desktop tabs are 38px with a 12px label.
          className="mt-3 flex flex-wrap gap-[6px] [--tab-h:36px] [--tab-r:3px] [--tab-size:10px] [--tab-track:2.5px] lg:mt-[clamp(1.1875rem,calc(2.25*var(--vw)),2.125rem)] lg:gap-2 lg:[--tab-h:38px] lg:[--tab-r:4px] lg:[--tab-size:12px] lg:[--tab-track:0.25em]"
        >
          {tags.map((tab) => (
            <HLLOutlineButton
              key={tab.id}
              as="button"
              type="button"
              role={capabilities.length ? undefined : "tab"}
              aria-selected={capabilities.length ? undefined : activeTag === tab.id}
              aria-current={capabilities.length && activeTag === tab.id ? "true" : undefined}
              data-active={activeTag === tab.id ? "" : undefined}
              onClick={() => onTag(tab.id)}
              variant={variant}
              gradient={theme.tabGradient}
              size="md"
              radius={0.21}
              shapeSize={1}
              strokeWidth={0.028}
              style={{
                width: "max-content",
                height: "var(--tab-h)",
                padding: "0 21px",
                borderRadius: "var(--tab-r)",
                // Read by .service-tab: Figma marks the active tab with a
                // solid hairline in the service colour, drawn above the
                // canvas's resting grey hairline.
                ["--service-tab-accent" as string]: theme.accent,
              }}
              labelStyle={{
                fontSize: "var(--tab-size)",
                letterSpacing: "var(--tab-track)",
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
