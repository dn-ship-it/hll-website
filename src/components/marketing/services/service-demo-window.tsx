"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import type { ServiceDemoConfig } from "@/types/service-demo";

type ServiceDemoWindowProps = {
  config: ServiceDemoConfig;
  activeTabKey: string;
};

function pickDemo(config: ServiceDemoConfig, activeTabKey: string) {
  const items = config.items ?? [];

  const match = items.find((item) => item.tabKey === activeTabKey);
  if (match) return match;

  if (items[0]) return items[0];

  return {
    tabKey: activeTabKey,
    html: config.fallbackHtml,
    htmlUrl: config.fallbackUrl,
  };
}

export function ServiceDemoWindow({ config, activeTabKey }: ServiceDemoWindowProps) {
  const safeConfig = useMemo(
    () => ({
      ...config,
      items: Array.isArray(config.items) ? config.items : [],
      selectorLabel: config.selectorLabel || "HLL Foundation",
    }),
    [config],
  );
  const demo = useMemo(
    () => pickDemo(safeConfig, activeTabKey),
    [safeConfig, activeTabKey],
  );
  const [loaded, setLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  // Keyed on the resolved source rather than on activeTabKey. Switching tabs
  // usually resolves to the same demo (pickDemo falls back to items[0] for any
  // tab without its own entry), so the iframe never reloads and never fires
  // another load event — resetting on the tab would strand the overlay on
  // every tab click.
  const srcKey = demo.html ?? demo.htmlUrl ?? "";

  useEffect(() => {
    const el = iframeRef.current;

    // A server-rendered iframe starts fetching while the HTML is still being
    // parsed, so it can finish loading before React has attached onLoad. That
    // event is then gone for good, leaving the overlay up forever, so check
    // the document directly instead of trusting the event alone.
    const alreadyLoaded = () => {
      if (!el) return false;
      try {
        return el.contentDocument?.readyState === "complete";
      } catch {
        // Cross-origin, so there is nothing to inspect and no reason to keep
        // covering it.
        return true;
      }
    };

    if (alreadyLoaded()) {
      setLoaded(true);
      return undefined;
    }

    setLoaded(false);
    // Last resort: a load that fails or is blocked must not leave the demo
    // permanently covered by a placeholder.
    const timer = setTimeout(() => setLoaded(true), 4000);
    return () => clearTimeout(timer);
  }, [srcKey]);

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
              {safeConfig.selectorLabel}
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

          <div className="relative mt-10 min-h-[clamp(19rem,34vw,24rem)] overflow-hidden rounded-sm bg-white">
            {!hasContent ? (
              <div className="flex min-h-[clamp(19rem,34vw,24rem)] items-center justify-center bg-[#fafafa]">
                <p className="text-[10px] uppercase tracking-[0.28em] text-black/30">
                  Demo window
                </p>
              </div>
            ) : demo.html ? (
              <iframe
                ref={iframeRef}
                title={`${safeConfig.selectorLabel} demo`}
                srcDoc={demo.html}
                sandbox="allow-scripts allow-same-origin allow-forms allow-modals"
                className="block h-[clamp(19rem,34vw,24rem)] w-full border-0 bg-white"
                onLoad={() => setLoaded(true)}
              />
            ) : (
              <iframe
                ref={iframeRef}
                title={`${safeConfig.selectorLabel} demo`}
                src={demo.htmlUrl ?? undefined}
                sandbox="allow-scripts allow-same-origin allow-forms allow-modals"
                className="block h-[clamp(19rem,34vw,24rem)] w-full border-0 bg-white"
                onLoad={() => setLoaded(true)}
              />
            )}

            {/* pointer-events-none so this can never swallow interaction with
                the demo underneath, even if it somehow stays mounted. */}
            {hasContent && !loaded ? (
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white/80">
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
