"use client";

import { useState } from "react";

import type { AboutPageData } from "@/data/about";
import { MediaPlaceholder, SectionTitle } from "@/components/marketing/home/primitives";

import { AboutPageHeader } from "./about-chrome";

export function AboutProcessSection({
  data,
  accentColor,
}: {
  data: AboutPageData["process"];
  accentColor: string;
}) {
  const [active, setActive] = useState(data.steps[1]?.id ?? data.steps[0]?.id ?? "");

  return (
    <section className="border-t border-black/6 px-[clamp(1.25rem,4vw,3rem)] py-[clamp(3rem,8vw,5rem)]">
      <div className="mx-auto max-w-[90rem]">
        <AboutPageHeader title={data.eyebrow} accentColor={accentColor} />
        <SectionTitle>{data.title}</SectionTitle>

        <div className="mt-10 grid grid-cols-[auto_1fr_auto] items-center gap-4">
          <button
            type="button"
            className="text-black/30 hover:text-black/60"
            aria-label="Previous step"
            onClick={() => {
              const idx = data.steps.findIndex((s) => s.id === active);
              setActive(data.steps[Math.max(0, idx - 1)]?.id ?? active);
            }}
          >
            ←
          </button>

          <div
            className="grid items-end gap-4"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 8rem), 1fr))",
            }}
          >
            {data.steps.map((step) => {
              const isActive = active === step.id;
              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => setActive(step.id)}
                  className={`flex flex-col items-center text-center transition ${
                    isActive ? "scale-100 opacity-100" : "scale-90 opacity-45 grayscale"
                  }`}
                >
                  <MediaPlaceholder
                    className={`rounded-full ${
                      isActive
                        ? "size-[clamp(5rem,12vw,7.5rem)]"
                        : "size-[clamp(3.5rem,8vw,5rem)]"
                    }`}
                    label={step.title}
                  />
                  <p className="mt-4 text-sm font-medium text-black">{step.title}</p>
                  {isActive && step.body ? (
                    <p className="mt-3 max-w-xs text-xs leading-6 text-black/55">{step.body}</p>
                  ) : null}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            className="text-black/30 hover:text-black/60"
            aria-label="Next step"
            onClick={() => {
              const idx = data.steps.findIndex((s) => s.id === active);
              setActive(data.steps[Math.min(data.steps.length - 1, idx + 1)]?.id ?? active);
            }}
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
