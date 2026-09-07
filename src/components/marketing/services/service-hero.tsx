"use client";

import { useState } from "react";

import type { HLLFoundationData } from "@/data/services/hll-foundation";
import type { ServiceDemoConfig } from "@/types/service-demo";

import { ServiceDemoWindow } from "./service-demo-window";

export function ServiceHero({
  data,
  demo,
}: {
  data: HLLFoundationData["hero"];
  demo: ServiceDemoConfig;
}) {
  const [activeTab, setActiveTab] = useState<string>(data.tabs[0]?.id ?? "");

  return (
    <section className="px-[clamp(1.25rem,4vw,3rem)] pb-[clamp(2rem,5vw,3rem)] pt-6">
      <div className="mx-auto max-w-[90rem]">
        <h1
          className="max-w-[min(100%,48rem)] font-light leading-[1.12] tracking-tight text-black"
          style={{ fontSize: "clamp(2rem, 4vw + 0.5rem, 3.25rem)" }}
        >
          {data.headline}
        </h1>

        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-b border-black/8 pb-4">
          {data.tabs.map((tab) => (
            <a
              key={tab.id}
              href={`#${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`text-[10px] uppercase tracking-[0.18em] transition ${
                activeTab === tab.id ? "text-black" : "text-black/40 hover:text-black/70"
              }`}
            >
              {tab.label}
            </a>
          ))}
        </div>

        <ServiceDemoWindow config={demo} activeTabKey={activeTab} />
      </div>
    </section>
  );
}
