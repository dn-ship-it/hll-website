"use client";

import { useEffect, useState } from "react";

import type { AboutPageData } from "@/data/about";
import { gradientCss } from "@/components/hll/variants";

export function AboutPromiseSection({ data }: { data: AboutPageData["promise"] }) {
  return (
    <section className="relative overflow-hidden py-[clamp(4rem,12vw,7rem)]" aria-label="Our promise">
      <div
        className="promise-shader absolute inset-0"
        style={{
          background: gradientCss(["#9AB4D3", "#A28DD7", "#AD7ECF"], 135),
        }}
      />
      <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]" />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-black/70">
          {data.eyebrow}
        </p>
        <p className="mt-4 text-[clamp(1.125rem,2.5vw,1.5rem)] font-light leading-snug text-black/90">
          {data.line1}
        </p>
        <p className="mt-1 text-[clamp(1.125rem,2.5vw,1.5rem)] font-light leading-snug text-black/90">
          {data.line2}
        </p>
      </div>
    </section>
  );
}

export function AboutLabSection({ data }: { data: AboutPageData["lab"] }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
  }, [data.demoUrl]);

  return (
    <section className="relative overflow-hidden px-[clamp(1.25rem,4vw,3rem)] py-[clamp(4rem,10vw,6rem)]">
      <div
        className="absolute inset-0"
        style={{
          background: gradientCss(["#9AB4D3", "#A28DD7", "#AD7ECF"], 135),
        }}
      />
      <div className="relative mx-auto max-w-[90rem] text-center">
        <p className="text-[10px] uppercase tracking-[0.28em] text-white/80">{data.eyebrow}</p>
        <h2
          className="mt-2 font-light text-white"
          style={{ fontSize: "clamp(1.35rem, 2.5vw, 1.75rem)" }}
        >
          {data.title}
        </h2>

        <div className="relative mx-auto mt-10 max-w-4xl rounded-sm bg-white p-[clamp(0.75rem,2vw,1rem)] shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
          <div className="pointer-events-none absolute left-1/2 top-3 z-10 -translate-x-1/2">
            <span className="inline-flex items-center gap-2 rounded-full border border-black/8 bg-[#f3f3f3] px-4 py-1.5 text-[10px] uppercase tracking-[0.18em] text-black/70">
              {data.selectorLabel}
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

          <div className="relative mt-10 min-h-[clamp(12rem,32vw,18rem)] overflow-hidden rounded-sm bg-white">
            <iframe
              title={`${data.selectorLabel} lab demo`}
              src={data.demoUrl}
              sandbox="allow-scripts allow-same-origin allow-forms allow-modals"
              className="block h-[clamp(12rem,32vw,18rem)] w-full border-0 bg-white"
              onLoad={() => setLoaded(true)}
            />
            {!loaded ? (
              <div className="absolute inset-0 flex items-center justify-center bg-white/80">
                <p className="text-[10px] uppercase tracking-[0.28em] text-black/35">
                  Demo window
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
