"use client";

import { useEffect, useMemo, useState } from "react";

import type { ServiceDemoConfig } from "@/types/service-demo";

type ServiceDemoWindowProps = {
  config: ServiceDemoConfig;
  activeTabKey: string;
};

function pickDemo(config: ServiceDemoConfig, activeTabKey: string) {
  const match = config.items.find((item) => item.tabKey === activeTabKey);
  if (match) return match;

  if (config.items[0]) return config.items[0];

  return {
    tabKey: activeTabKey,
    html: config.fallbackHtml,
    htmlUrl: config.fallbackUrl,
  };
}

export function ServiceDemoWindow({ config, activeTabKey }: ServiceDemoWindowProps) {
  const demo = useMemo(() => pickDemo(config, activeTabKey), [config, activeTabKey]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
  }, [demo.html, demo.htmlUrl, activeTabKey]);

  const hasContent = Boolean(demo.html || demo.htmlUrl);

  return (
    <div className="relative mt-8 overflow-hidden rounded-sm">
      <div
        className="relative p-[clamp(1.25rem,3vw,2.5rem)]"
        style={{
          backgroundImage: "url(/assets/demo-window-gradient.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative mx-auto max-w-[min(100%,52rem)] rounded-sm bg-white p-[clamp(0.75rem,2vw,1rem)] shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
          <div className="pointer-events-none absolute left-1/2 top-3 z-10 -translate-x-1/2">
            <span className="inline-flex items-center gap-2 rounded-full border border-black/8 bg-[#f3f3f3] px-4 py-1.5 text-[10px] uppercase tracking-[0.18em] text-black/70">
              {config.selectorLabel}
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
            {!hasContent ? (
              <div className="flex min-h-[clamp(12rem,32vw,18rem)] items-center justify-center bg-[#fafafa]">
                <p className="text-[10px] uppercase tracking-[0.28em] text-black/30">
                  Demo window
                </p>
              </div>
            ) : demo.html ? (
              <iframe
                title={`${config.selectorLabel} demo`}
                srcDoc={demo.html}
                sandbox="allow-scripts allow-same-origin allow-forms allow-modals"
                className="block h-[clamp(12rem,32vw,18rem)] w-full border-0 bg-white"
                onLoad={() => setLoaded(true)}
              />
            ) : (
              <iframe
                title={`${config.selectorLabel} demo`}
                src={demo.htmlUrl ?? undefined}
                sandbox="allow-scripts allow-same-origin allow-forms allow-modals"
                className="block h-[clamp(12rem,32vw,18rem)] w-full border-0 bg-white"
                onLoad={() => setLoaded(true)}
              />
            )}

            {hasContent && !loaded ? (
              <div className="absolute inset-0 flex items-center justify-center bg-white/80">
                <p className="text-[10px] uppercase tracking-[0.28em] text-black/35">
                  Loading demo…
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
