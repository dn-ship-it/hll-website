"use client";

import { useEffect, useRef, useState } from "react";

import { GradientRevealTextNormal } from "@/components/hll";
import { HomeHeading } from "@/components/marketing/home/primitives";
import { SERVICE_GUTTER } from "@/components/marketing/services/service-chrome";
import type { AboutPageData } from "@/data/about";

/**
 * "Storyboarding for Our Values" (Figma 1391:4410), played once when the
 * section scrolls in:
 *   1. slits    — the value media appear as thin slits in the middle
 *   2. panels   — the slits zoom up to full-height panels, fast and smooth
 *   3. settled  — the value in focus expands to the 722 × 700 frame and the
 *                 rest contract into the 62px thumbnail row below it
 * Then the title (text sweep) and body (fade up) come in, and the next
 * thumbnail saturates from monochrome into colour as a loader before it takes
 * the focus. Coordinates are the Desktop About frame's, in a 1451 × 774 stage.
 */
const STAGE = { w: 1451, h: 774 };
const FOCUS = { x: 0, y: 0, w: 722, h: 700 };
const THUMB = { size: 62, gap: 13.5, y: 712 };
const SLIT = { w: 17, h: 225, gap: 13 };
const HOLD_MS = 7000;

type Phase = "hidden" | "slits" | "panels" | "settled";
type Box = { x: number; y: number; w: number; h: number };

const pct = (v: number, of: number) => `${(v / of) * 100}%`;

function boxFor(
  phase: Phase,
  index: number,
  count: number,
  active: number,
): Box {
  if (phase === "hidden" || phase === "slits") {
    const total = count * SLIT.w + (count - 1) * SLIT.gap;
    return {
      x: (STAGE.w - total) / 2 + index * (SLIT.w + SLIT.gap),
      y: (FOCUS.h - SLIT.h) / 2,
      w: SLIT.w,
      h: SLIT.h,
    };
  }
  if (phase === "panels") {
    const w = (STAGE.w - (count - 1) * SLIT.gap) / count;
    return { x: index * (w + SLIT.gap), y: 0, w, h: FOCUS.h };
  }
  if (index === active) return FOCUS;
  // Thumbnails keep their order (the focused value's slot is drawn separately).
  return {
    x: index * (THUMB.size + THUMB.gap),
    y: THUMB.y,
    w: THUMB.size,
    h: THUMB.size,
  };
}

export function AboutValuesSection({
  data,
}: {
  data: AboutPageData["values"];
}) {
  const [phase, setPhase] = useState<Phase>("hidden");
  const [active, setActive] = useState(0);
  const [cycle, setCycle] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const count = data.items.length;
  const next = (active + 1) % count;
  const item = data.items[active];

  // Run the storyboard the first time the stage is on screen.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase("settled");
      return undefined;
    }
    const timers: number[] = [];
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        setPhase("slits");
        timers.push(window.setTimeout(() => setPhase("panels"), 450));
        timers.push(window.setTimeout(() => setPhase("settled"), 1350));
      },
      { threshold: 0.35 },
    );
    observer.observe(stage);
    return () => {
      observer.disconnect();
      timers.forEach(window.clearTimeout);
    };
  }, []);

  // Auto-advance once settled; the loader on the next thumbnail runs for the
  // same duration. `cycle` restarts it after a manual pick.
  useEffect(() => {
    if (phase !== "settled" || count < 2) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return undefined;
    const timer = window.setTimeout(
      () => setActive((a) => (a + 1) % count),
      HOLD_MS,
    );
    return () => window.clearTimeout(timer);
  }, [phase, active, cycle, count]);

  const settled = phase === "settled";
  const pick = (index: number) => {
    setActive(index);
    setCycle((c) => c + 1);
  };

  return (
    <section className={`pt-[214px] ${SERVICE_GUTTER}`}>
      <HomeHeading eyebrow={data.eyebrow} title={data.title} />

      <div
        ref={stageRef}
        className="relative mt-[64px] hidden lg:block"
        style={{ aspectRatio: `${STAGE.w} / ${STAGE.h}` }}
      >
        {data.items.map((value, index) => {
          const box = boxFor(phase, index, count, active);
          const isFocus = settled && index === active;
          const isNext = settled && index === next && count > 1;
          return (
            <button
              key={value.id}
              type="button"
              aria-label={value.title}
              aria-pressed={isFocus}
              disabled={!settled || isFocus}
              onClick={() => pick(index)}
              className="absolute overflow-hidden rounded-[4px] bg-[#D9D9D9] transition-[left,top,width,height,opacity,border-radius] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] disabled:cursor-default"
              style={{
                left: pct(box.x, STAGE.w),
                top: pct(box.y, STAGE.h),
                width: pct(box.w, STAGE.w),
                height: pct(box.h, STAGE.h),
                opacity: phase === "hidden" ? 0 : 1,
                borderRadius: isFocus ? 10 : 4,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={value.image}
                alt=""
                className={`size-full object-cover transition-[filter] duration-500 ${
                  settled && !isFocus ? "grayscale" : ""
                }`}
              />
              {isFocus && value.video ? (
                <video
                  src={value.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 size-full object-cover"
                />
              ) : null}
              {isNext ? (
                // "the next video thumbnail saturates into colour from
                // monochrome" — the loader for the next value.
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={`${active}-${cycle}`}
                  src={value.image}
                  alt=""
                  className="absolute inset-0 size-full object-cover [animation:values-saturate_linear_forwards]"
                  style={{ animationDuration: `${HOLD_MS}ms` }}
                />
              ) : null}
            </button>
          );
        })}

        {settled ? (
          // The focused value keeps its place in the thumbnail row, in colour.
          <span
            aria-hidden
            className="absolute overflow-hidden rounded-[4px] outline outline-1 outline-offset-2 outline-[var(--hll-dark-grey)]"
            style={{
              left: pct(active * (THUMB.size + THUMB.gap), STAGE.w),
              top: pct(THUMB.y, STAGE.h),
              width: pct(THUMB.size, STAGE.w),
              height: pct(THUMB.size, STAGE.h),
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.image} alt="" className="size-full object-cover" />
          </span>
        ) : null}

        <div
          className="absolute transition-opacity duration-500"
          style={{
            left: pct(819, STAGE.w),
            top: 0,
            width: pct(632, STAGE.w),
            opacity: settled ? 1 : 0,
          }}
          aria-live="polite"
        >
          {settled ? (
            <div key={item.id}>
              <GradientRevealTextNormal
                as="h3"
                text={item.title}
                variant="about"
                className="block text-black"
                fontWeight={400}
                fontSize="clamp(2rem, calc(3.04*var(--vw)), 2.875rem)"
                letterSpacing="0"
                lineHeight="1.16"
              />
              <p className="mt-8 max-w-[592px] text-[clamp(1.125rem,calc(1.59*var(--vw)),1.5rem)] leading-[1.25] text-[var(--hll-dark-grey)] [animation:page-intro-in_700ms_200ms_cubic-bezier(0.22,1,0.36,1)_both]">
                {item.description}
              </p>
            </div>
          ) : null}
        </div>
      </div>

      {/* Below desktop the storyboard reads as a simple list. */}
      <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:hidden">
        {data.items.map((value) => (
          <div key={value.id}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={value.image}
              alt=""
              className="aspect-square w-full rounded-[10px] object-cover"
            />
            <h3 className="mt-4 text-3xl text-black">{value.title}</h3>
            <p className="mt-3 text-lg leading-[1.25] text-[var(--hll-dark-grey)]">
              {value.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
