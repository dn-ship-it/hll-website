"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { CornerRipple, type RippleVariant } from "@/components/hll";
import type { ServiceDemoConfig } from "@/types/service-demo";

import { RIPPLE_FILL, RIPPLE_OPACITY } from "./service-theme";

type ServiceDemoWindowProps = {
  config: ServiceDemoConfig;
  activeTabKey: string;
  /** CSS background for the frame around the demo — the service's colours. */
  background: string;
  /**
   * Figma: "Live corner ripple animation in the back according to the colours
   * of the service" — drawn over `background`, which stays as the fallback.
   */
  ripple?: RippleVariant;
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

export function ServiceDemoWindow({
  config,
  activeTabKey,
  background,
  ripple,
}: ServiceDemoWindowProps) {
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
  // Figma Services mobile: a 362 × 244 frame around a 337 × 215 window.
  const iframeHeight =
    "h-[215px] min-h-[215px] lg:h-[clamp(20rem,calc(42.2*var(--vw)),39.9rem)] lg:min-h-[clamp(20rem,calc(42.2*var(--vw)),39.9rem)]";

  return (
    <>
    <div
      className="service-demo-window relative mt-8 overflow-hidden rounded-[6px] lg:mt-[clamp(1.125rem,calc(2.18*var(--vw)),2.0625rem)] lg:rounded-lg"
      data-service-media
    >
      <div
        className="relative px-3 pb-[15px] pt-[14px] lg:px-[clamp(1.25rem,calc(6.35*var(--vw)),6rem)] lg:py-[clamp(2rem,calc(8.99*var(--vw)),8.5rem)]"
        style={{ background }}
      >
        {ripple ? (
          <CornerRipple
            variant={ripple}
            contained
            className={RIPPLE_FILL}
            style={{ opacity: RIPPLE_OPACITY }}
          />
        ) : null}
        <div className="relative mx-auto w-full overflow-hidden rounded-[3px] bg-[var(--hll-bg)] shadow-none lg:overflow-visible lg:rounded-lg lg:p-[clamp(0.75rem,calc(2*var(--vw)),1rem)]">
          <div className="pointer-events-none absolute left-1/2 top-3 z-10 hidden -translate-x-1/2 lg:block">
            <SelectorPill label={safeConfig.selectorLabel} />
          </div>

          <div
            className={`relative overflow-hidden bg-white lg:mt-10 lg:rounded-sm ${iframeHeight}`}
          >
            {!hasContent ? (
              <div
                className={`flex items-center justify-center bg-[#fafafa] ${iframeHeight}`}
              >
                <p className="text-[12px] uppercase tracking-[3px] text-black lg:text-[10px] lg:tracking-[0.28em] lg:text-black/30">
                  Demo window
                </p>
              </div>
            ) : demo.html ? (
              <iframe
                ref={iframeRef}
                title={`${safeConfig.selectorLabel} demo`}
                srcDoc={demo.html}
                sandbox="allow-scripts allow-same-origin allow-forms allow-modals"
                className={`block w-full border-0 bg-white ${iframeHeight}`}
                onLoad={() => setLoaded(true)}
              />
            ) : (
              <iframe
                ref={iframeRef}
                title={`${safeConfig.selectorLabel} demo`}
                src={demo.htmlUrl ?? undefined}
                sandbox="allow-scripts allow-same-origin allow-forms allow-modals"
                className={`block w-full border-0 bg-white ${iframeHeight}`}
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
    {/* Figma Services mobile: the demo selector sits 54px under the window. */}
    <div className="pointer-events-none mt-[54px] flex justify-center lg:hidden">
      <SelectorPill label={safeConfig.selectorLabel} />
    </div>
    </>
  );
}

/** The demo's service selector: "HLL FOUNDATION ⌄" on a Light Grey pill. */
function SelectorPill({ label }: { label: string }) {
  return (
    <span className="inline-flex h-[34px] items-center gap-2 rounded-[3px] bg-[var(--hll-light-grey)] px-[21px] text-[10px] uppercase leading-none tracking-[0.25em] text-[var(--hll-dark-grey)] lg:h-9 lg:rounded-[4px] lg:text-[12px]">
      {label}
      <svg aria-hidden className="size-3 text-black/45" viewBox="0 0 12 12" fill="none">
        <path
          d="M3 4.5 6 7.5 9 4.5"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
