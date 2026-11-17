"use client";

import { useState } from "react";

import {
  GradientRevealTextSlow,
  HLLOutlineButton,
  SERVICE_TO_RIPPLE,
  type ServiceVariant,
} from "@/components/hll";
import { SERVICE_SLUGS } from "@/components/hll/variants";
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
   * The page's capabilities. When given, the tags under the headline are these and take you to
   * each one's section; the demo window keeps its first view.
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
  // The design team's capability demos, built into public/capability-demos.
  const storyDemo: ServiceDemoConfig = {
    ...demo,
    items: [{ tabKey: activeTab, htmlUrl: `/capability-demos/embed.html#/embed/${SERVICE_SLUGS[variant]}` }],
  };
  const theme = getServiceTheme(variant);

  return (
    <section
      data-no-text-scroll
      data-no-image-reveal
      // Less space above the title so the top third of the demo window shows on a 13" laptop.
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

        {/* Buttons, not anchors: an href="#<id>" link matched a capability section further down and
            jumped the demo out of view. */}
        <div
          role={capabilities.length ? "navigation" : "tablist"}
          aria-label={capabilities.length ? "Capabilities on this page" : "Capability demos"}
          // Outline tabs: 36px, 3px corners, 10px label, 6px apart; desktop tabs are 38px with a 12px label.
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
                // A chip wider than the screen wraps onto two lines instead of running off the edge.
                maxWidth: "100%",
                whiteSpace: "normal",
                height: "auto",
                minHeight: "var(--tab-h)",
                padding: "6px 21px",
                borderRadius: "var(--tab-r)",
                // Read by .service-tab: the active tab gets a solid hairline in the service colour, above the
                // resting grey one.
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
          config={storyDemo}
          tall
          activeTabKey={activeTab}
          background={theme.demoBackground}
          ripple={rippleVariant}
        />
      </div>
    </section>
  );
}
