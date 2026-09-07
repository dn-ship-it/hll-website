"use client";

import { useState } from "react";

import type { HLLFoundationData } from "@/data/services/hll-foundation";
import { MediaPlaceholder } from "@/components/marketing/home/primitives";

export function ServiceHero({ data }: { data: HLLFoundationData["hero"] }) {
  const [activeTab, setActiveTab] = useState(data.tabs[0]?.id);

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

        <div
          className="relative mt-8 overflow-hidden rounded-sm p-[clamp(1rem,3vw,2rem)]"
          style={{
            background: "linear-gradient(135deg, #FF5A1E 0%, #FF9126 45%, #EB3B3E 100%)",
          }}
        >
          <div className="mx-auto max-w-3xl rounded-md border border-white/30 bg-white p-3 shadow-lg">
            <MediaPlaceholder
              className="aspect-[16/10] min-h-[clamp(10rem,28vw,16rem)] w-full"
              label="HLL Foundation · Demo window"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
