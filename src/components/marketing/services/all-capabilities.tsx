"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";

import { GradientRevealTextSlow } from "@/components/hll";

export type CapabilityService = {
  id: string;
  name: string;
  /** No page yet (HLL Cloud): shown, not linked. */
  href: string | null;
  description: string;
  subServices: string[];
};

// Figma All Capabilities (2562:5155) tile gradients, top to bottom.
const GRADIENT: Record<string, string> = {
  "hll-application": "linear-gradient(180deg, #FF1F1F 0%, #72AAFF 100%)",
  "hll-trust": "linear-gradient(180deg, #0F935F 0%, #4DC49C 100%)",
  "hll-ai": "linear-gradient(180deg, #3773FF 0%, #BCA6D6 100%)",
  "hll-ontology": "linear-gradient(0deg, #FFB26A 0%, #8367FF 96%)",
  "hll-people": "linear-gradient(180deg, #FF9042 0%, #FED780 100%)",
  "hll-foundation": "linear-gradient(180deg, #FF5A1E 0%, #CC8B93 100%)",
  "hll-cloud": "linear-gradient(180deg, #57B9E1 0%, #AAEBE3 100%)",
};

/** A gradient tile with the service's white glyph, as in the Figma tiles. */
function Tile({
  id,
  className = "",
  glyph = "72%",
  radius = 5,
}: {
  id: string;
  className?: string;
  glyph?: string;
  radius?: number;
}) {
  return (
    <span
      aria-hidden
      className={`relative grid place-items-center overflow-hidden ${className}`}
      style={{ background: GRADIENT[id], borderRadius: radius }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/assets/services/${id}-glyph-white.svg`}
        alt=""
        style={{ width: glyph, height: glyph }}
      />
    </span>
  );
}

// Wheel slots in the Figma frame, relative to its top (y 124): three
// services above the active one, three below. Tiles are 80px, the active
// one 134px; names sit 26px into their tile (30px for the active one).
const STAGE = { w: 1512, h: 705 };
const SLOT_TILE_TOP = [0, 95, 190, 286, 435, 530, 625];
const SLOT_NAME_TOP = [26, 120, 214, 316, 460, 555, 650];
const pct = (v: number, of: number) => `${(v / of) * 100}%`;

function OpenIcon() {
  return (
    <svg
      viewBox="0 0 11 11"
      className="size-3"
      fill="#fff"
      stroke="#1A1A1A"
      strokeWidth="1"
      aria-hidden
    >
      <rect x="0.5" y="3.9" width="6.6" height="6.6" rx="2.2" />
      <rect x="2.6" y="0.5" width="7.9" height="7.9" rx="1.1" />
    </svg>
  );
}

/**
 * Figma "All Capabilities": the services as a wheel beside the Capabilities
 * title — scrolling turns it, the service in focus grows with its
 * sub-services beside it — then every service as a card.
 */
export function AllCapabilities({
  services,
  cards,
  startIndex = 0,
}: {
  /** Wheel order, top to bottom. */
  services: CapabilityService[];
  /** Card grid order. */
  cards: CapabilityService[];
  startIndex?: number;
}) {
  const count = services.length;
  const [active, setActive] = useState(startIndex);
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  const update = useCallback(() => {
    const section = sectionRef.current;
    const sticky = stickyRef.current;
    if (!section || !sticky) return;
    const range = section.getBoundingClientRect().height - sticky.getBoundingClientRect().height;
    if (range <= 0) return;
    const progress = Math.min(
      1,
      Math.max(0, -section.getBoundingClientRect().top / range),
    );
    const next =
      (startIndex + Math.min(count - 1, Math.round(progress * (count - 1)))) %
      count;
    setActive((current) => (current === next ? current : next));
  }, [count, startIndex]);

  useEffect(() => {
    let frame = 0;
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [update]);

  const scrollTo = (index: number) => {
    const section = sectionRef.current;
    const sticky = stickyRef.current;
    if (!section || !sticky) return;
    const range = section.getBoundingClientRect().height - sticky.getBoundingClientRect().height;
    const step = (index - startIndex + count) % count;
    const top =
      window.scrollY +
      section.getBoundingClientRect().top +
      range * (step / (count - 1));
    window.scrollTo({
      top,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  };

  const focus = services[active];

  return (
    <>
      <section
        ref={sectionRef}
        aria-label="Capabilities"
        className="hidden lg:block"
        style={{ height: `calc(${count * 60} * var(--svh))` }}
      >
        <div
          ref={stickyRef}
          className="sticky top-[66px] h-[calc(calc(100*var(--svh))-66px)] overflow-hidden pt-[58px]"
        >
          <div
            className="relative mx-auto"
            // Scales with the width like the other stages, but never taller
            // than the screen below the Nav Bar, so the whole wheel shows.
            style={{
              aspectRatio: `${STAGE.w} / ${STAGE.h}`,
              width: `min(100%, calc((calc(100*var(--svh)) - 66px - 58px - 40px) * ${STAGE.w / STAGE.h}))`,
            }}
          >
            <div
              className="absolute"
              style={{ left: pct(30, STAGE.w), top: pct(310, STAGE.h) }}
            >
              <GradientRevealTextSlow
                as="h1"
                text="Capabilities"
                variant="services"
                className="block font-light text-[var(--hll-dark-grey)]"
                fontSize="clamp(2.5rem, calc(4.23*var(--vw)), 4rem)"
                letterSpacing="0"
                lineHeight="1.16"
              />
            </div>

            {services.map((service, index) => {
              const slot = ((index - active + 3 + count * 2) % count) - 3;
              const isFocus = slot === 0;
              const visible = Math.abs(slot) <= 3;
              const row = Math.min(6, Math.max(0, slot + 3));
              const size = isFocus ? 134 : 80;
              return (
                // Full-stage wrapper: the page-intro fade transforms each
                // child of this stage, which would otherwise make a zero-size
                // wrapper the items' containing block.
                <div
                  key={service.id}
                  aria-hidden={!visible}
                  className="pointer-events-none absolute inset-0 [&_button]:pointer-events-auto"
                >
                  <button
                    type="button"
                    onClick={() =>
                      isFocus && service.href ? undefined : scrollTo(index)
                    }
                    tabIndex={visible ? 0 : -1}
                    aria-label={service.name}
                    className="absolute transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{
                      left: pct(isFocus ? 638 : 692, STAGE.w),
                      top: pct(SLOT_TILE_TOP[row], STAGE.h),
                      width: pct(size, STAGE.w),
                      opacity: visible ? 1 : 0,
                    }}
                  >
                    <Tile id={service.id} className="aspect-square w-full" />
                  </button>
                  <div
                    className="absolute transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{
                      left: pct(815, STAGE.w),
                      top: pct(SLOT_NAME_TOP[row], STAGE.h),
                      opacity: visible ? 1 : 0,
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => scrollTo(index)}
                      tabIndex={visible && !isFocus ? 0 : -1}
                      className={`whitespace-nowrap text-left font-medium leading-[1.16] transition-[color,font-size] duration-500 ${
                        isFocus
                          ? "text-[clamp(1.5rem,calc(2.15*var(--vw)),2.03rem)] text-[var(--hll-dark-grey)]"
                          : "text-[clamp(1.25rem,calc(1.72*var(--vw)),1.625rem)] text-[var(--hll-mid-grey)] hover:text-[var(--hll-dark-grey)]"
                      }`}
                    >
                      {service.name}
                    </button>
                  </div>
                </div>
              );
            })}

            {/* The focused service: its sub-services as outlined pills and the
                open tile to its page. */}
            <div
              key={focus.id}
              className="absolute flex items-center gap-2 [animation:page-intro-in_500ms_150ms_cubic-bezier(0.22,1,0.36,1)_both]"
              style={{
                left: pct(815, STAGE.w),
                top: pct(365, STAGE.h),
                width: pct(447, STAGE.w),
              }}
            >
              {focus.subServices.slice(0, 4).map((sub) => (
                <span
                  key={sub}
                  className="hll-label whitespace-nowrap rounded-[3.8px] border-[0.64px] border-[var(--hll-mid-grey)] px-[7px] py-[5px] text-[10.7px] uppercase leading-[1.2] text-[var(--hll-dark-grey)]"
                  style={{ fontFamily: "var(--hll-font-functional)" }}
                >
                  {sub}
                </span>
              ))}
            </div>
            {focus.href ? (
              <Link
                href={focus.href}
                aria-label={`Open ${focus.name}`}
                className="absolute grid size-[33px] place-items-center rounded-[3.6px] border-[0.9px] border-[var(--hll-dark-grey)] bg-[var(--hll-light-grey)] transition-colors hover:bg-white"
                style={{ left: pct(1229, STAGE.w), top: pct(316, STAGE.h) }}
              >
                <OpenIcon />
              </Link>
            ) : null}
          </div>
        </div>
      </section>

      {/* Every service as a card: 300 × 198 tile, name, body and the
          sub-service list, split by hairlines. */}
      <section className="px-[clamp(1.25rem,calc(1.98*var(--vw)),1.875rem)] pb-[154px] pt-[154px] lg:pl-[29px] lg:pr-[37px] lg:pt-[192px]">
        <h2 className="sr-only lg:hidden">All capabilities</h2>
        <div className="grid gap-y-[53px] sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-[83px]">
          {cards.map((service, i) => {
            const card = (
              <>
                <span className="relative block">
                  <Tile
                    id={service.id}
                    className="aspect-[300/198] w-full"
                    glyph="62%"
                    radius={4.6}
                  />
                  {service.href ? (
                    <span className="absolute right-[6px] top-[7px] flex h-[29px] items-center gap-[9px] rounded-[5.4px] bg-[var(--hll-light-grey)] px-[17px] text-[9.9px] uppercase leading-none tracking-[2.46px] text-[var(--hll-dark-grey)] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      Learn more
                      <OpenIcon />
                    </span>
                  ) : null}
                </span>
                <span className="mt-[9px] block text-[clamp(1.375rem,calc(1.83*var(--vw)),1.725rem)] font-medium leading-[1.16] text-[var(--hll-dark-grey)]">
                  {service.name}
                </span>
                <span className="mt-[19px] block max-w-[289px] pl-[3px] text-[15.35px] leading-[1.25] text-[var(--hll-dark-grey)]">
                  {service.description}
                </span>
                <span className="mt-5 block pl-[3px]">
                  {service.subServices.map((sub) => (
                    <span
                      key={sub}
                      className="hll-label block text-[9.2px] uppercase leading-[2] text-[var(--hll-mid-grey)]"
                      style={{ fontFamily: "var(--hll-font-functional)" }}
                    >
                      {sub}
                    </span>
                  ))}
                </span>
              </>
            );
            return (
              <div
                key={service.id}
                data-fade-up
                className="relative min-h-[467px]"
              >
                {/* Hairline between columns, 42px into the gap. */}
                {i % 4 !== 0 ? (
                  <span
                    aria-hidden
                    className="absolute -left-[42px] top-0 hidden h-[467px] w-[0.73px] bg-[var(--hll-mid-grey)] lg:block"
                  />
                ) : null}
                {service.href ? (
                  <Link href={service.href} className="group block">
                    {card}
                  </Link>
                ) : (
                  <div>{card}</div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
