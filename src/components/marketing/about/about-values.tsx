"use client";

import { useEffect, useRef, useState } from "react";

import { GradientRevealTextNormal } from "@/components/hll";
import { HomeHeading } from "@/components/marketing/home/primitives";
import { SERVICE_GUTTER } from "@/components/marketing/services/service-chrome";
import type { AboutPageData } from "@/data/about";

/**
 * "Storyboarding for Our Values" (Figma 1391:4410):
 *   1. slits    — the value media appear as thin slits in the middle
 *   2. panels   — the slits zoom up to full-height panels
 *   3. settled  — the value in focus expands to the 722 × 700 frame and the
 *                 rest contract into the 62px thumbnail row below it
 * then each value in turn takes the focus, the next thumbnail saturating from
 * monochrome into colour as it grows. Coordinates are the Desktop About
 * frame's, in a 1451 × 774 stage.
 *
 * Desktop plays it with the scroll (QA A-01, A-02): the stage pins under the
 * Nav Bar and the scroll position drives every step, smoothed so it follows
 * the scroll speed without jumps. Phones keep the timed storyboard.
 */
const STAGE = { w: 1451, h: 774 };
const FOCUS = { x: 0, y: 0, w: 722, h: 700 };
const THUMB = { size: 62, gap: 13.5, y: 712 };
const SLIT = { w: 17, h: 225, gap: 13 };
const HOLD_MS = 7000;

/** Desktop timeline, in screen heights of scroll. */
const LEAD = 0.35; // the intro starts this far before the stage pins
const INTRO = 0.9; // slits → panels → first value
const STEP = 0.75; // one value to the next
const END_HOLD = 0.35; // the last value rests before the page moves on

type Phase = "hidden" | "slits" | "panels" | "settled";
type Box = { x: number; y: number; w: number; h: number };

const pct = (v: number, of: number) => `${(v / of) * 100}%`;
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
/** Gentle in-and-out: no overshoot, so nothing bounces. */
const smooth = (v: number) => {
  const x = clamp01(v);
  return x * x * (3 - 2 * x);
};
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const lerpBox = (a: Box, b: Box, t: number): Box => ({
  x: lerp(a.x, b.x, t),
  y: lerp(a.y, b.y, t),
  w: lerp(a.w, b.w, t),
  h: lerp(a.h, b.h, t),
});

const slitBox = (index: number, count: number): Box => {
  const total = count * SLIT.w + (count - 1) * SLIT.gap;
  return {
    x: (STAGE.w - total) / 2 + index * (SLIT.w + SLIT.gap),
    y: (FOCUS.h - SLIT.h) / 2,
    w: SLIT.w,
    h: SLIT.h,
  };
};
const panelBox = (index: number, count: number): Box => {
  const w = (STAGE.w - (count - 1) * SLIT.gap) / count;
  return { x: index * (w + SLIT.gap), y: 0, w, h: FOCUS.h };
};
// Thumbnails keep their order (the focused value's slot is drawn separately).
const thumbBox = (index: number): Box => ({
  x: index * (THUMB.size + THUMB.gap),
  y: THUMB.y,
  w: THUMB.size,
  h: THUMB.size,
});

/** Where the desktop storyboard is at timeline position `t` (screens). */
function timelineAt(t: number, count: number) {
  const intro = clamp01(t / INTRO);
  const toPanels = smooth(intro / 0.45);
  const toSettled = smooth((intro - 0.45) / 0.55);
  const f = Math.min(count - 1, Math.max(0, (t - INTRO) / STEP));
  const from = Math.floor(f);
  const to = Math.min(count - 1, from + 1);
  // Each step holds a moment, then moves: the swap runs over its last 65%.
  const k = from === to ? 0 : smooth((f - from - 0.35) / 0.65);
  return { toPanels, toSettled, from, to, k };
}

export function AboutValuesSection({
  data,
}: {
  data: AboutPageData["values"];
}) {
  const [phase, setPhase] = useState<Phase>("hidden");
  const [active, setActive] = useState(0);
  const [cycle, setCycle] = useState(0);
  const mobileRef = useRef<HTMLDivElement>(null);
  const count = data.items.length;
  const next = (active + 1) % count;
  const item = data.items[active];

  // Phones: run the storyboard the first time it is on screen. (Desktop's
  // stage is hidden there, and plays with the scroll instead.)
  useEffect(() => {
    const stages = [mobileRef.current].filter(
      (el): el is HTMLDivElement => el !== null,
    );
    if (!stages.length) return undefined;
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
    stages.forEach((stage) => observer.observe(stage));
    return () => {
      observer.disconnect();
      timers.forEach(window.clearTimeout);
    };
  }, []);

  // Phones: auto-advance once settled; the loader on the next thumbnail runs
  // for the same duration. `cycle` restarts it after a manual pick.
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
    <section className={`pt-[154px] lg:pt-[214px] ${SERVICE_GUTTER}`}>
      <HomeHeading eyebrow={data.eyebrow} title={data.title} />

      <ValuesScrollStage data={data} />

      {/* Figma About mobile: the value in focus at 376px, the 42px "up next"
          thumbnails 5px under it, then its title and body. */}
      <div
        ref={mobileRef}
        className={`-mx-[5px] mt-3 transition-opacity duration-700 lg:hidden ${phase === "hidden" ? "opacity-0" : "opacity-100"}`}
      >
        <div className="relative aspect-square w-full max-w-[376px] overflow-hidden rounded-lg bg-[#D9D9D9]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img key={item.id} src={item.image} alt="" className="size-full object-cover [animation:page-intro-in_700ms_cubic-bezier(0.22,1,0.36,1)_both]" />
          {item.video ? (
            <video
              key={`${item.id}-video`}
              src={item.video}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 size-full object-cover"
            />
          ) : null}
        </div>
        <div className="mt-[5px] flex gap-[9px]">
          {data.items.map((value, index) => {
            const isFocus = index === active;
            const isNext = settled && index === next && count > 1;
            return (
              <button
                key={value.id}
                type="button"
                aria-label={value.title}
                aria-pressed={isFocus}
                onClick={() => pick(index)}
                className={`relative size-[42px] shrink-0 overflow-hidden rounded-[4px] bg-[#D9D9D9] ${isFocus ? "outline outline-1 outline-offset-2 outline-[var(--hll-dark-grey)]" : ""}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={value.image} alt="" className={`size-full object-cover ${isFocus ? "" : "grayscale"}`} />
                {isNext ? (
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
        </div>
        <div key={item.id} className="mt-[69px] max-w-[321px]" aria-live="polite">
          <h3 className="text-[24px] leading-[1.16] text-black">{item.title}</h3>
          <p className="mt-[9px] text-[14px] leading-[1.25] text-[var(--hll-dark-grey)] [animation:page-intro-in_700ms_200ms_cubic-bezier(0.22,1,0.36,1)_both]">
            {item.description}
          </p>
        </div>
      </div>
    </section>
  );
}

/** Desktop: the storyboard played by the scroll, on a stage pinned under the
 *  Nav Bar. */
function ValuesScrollStage({ data }: { data: AboutPageData["values"] }) {
  const count = data.items.length;
  const trackRef = useRef<HTMLDivElement>(null);
  // Timeline position in screens: where the scroll says (target) and where
  // the stage is (shown), easing after it so wheel steps don't jerk.
  const target = useRef(0);
  const shownRef = useRef(0);
  const frame = useRef(0);
  const [shown, setShown] = useState(0);
  const total = INTRO + (count - 1) * STEP;
  const distance = total - LEAD + END_HOLD;

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;
    const navH = () =>
      parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--nav-h")) || 0;
    const tick = () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const diff = target.current - shownRef.current;
      shownRef.current =
        reduce || Math.abs(diff) < 0.0005 ? target.current : shownRef.current + diff * 0.12;
      setShown(shownRef.current);
      frame.current = shownRef.current === target.current ? 0 : requestAnimationFrame(tick);
    };
    const measure = () => {
      const top = track.getBoundingClientRect().top;
      const raw = (navH() + LEAD * window.innerHeight - top) / window.innerHeight;
      target.current = Math.min(total, Math.max(0, raw));
      if (!frame.current) frame.current = requestAnimationFrame(tick);
    };
    measure();
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(frame.current);
      // Clear it, or a remount (Strict Mode) would think a frame is pending.
      frame.current = 0;
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [total]);

  // A thumbnail scrolls the page to the point where its value has the focus.
  const pick = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const navH =
      parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--nav-h")) || 0;
    const at = INTRO + index * STEP;
    const trackTop = track.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: trackTop - navH + (at - LEAD) * window.innerHeight,
      behavior: "smooth",
    });
  };

  const { toPanels, toSettled, from, to, k } = timelineAt(shown, count);
  const settled = toSettled >= 1;
  const current = k < 0.5 ? from : to;
  const item = data.items[current];
  // The copy fades out as the swap starts and back in as it lands.
  const copyOpacity = toSettled * Math.abs(k - 0.5) * 2;

  return (
    <div
      ref={trackRef}
      className="relative mt-[64px] hidden lg:block"
      style={{ height: `calc(100svh - var(--nav-h) + ${distance} * 100svh)` }}
    >
      <div className="sticky top-[var(--nav-h)] flex h-[calc(100svh-var(--nav-h))] items-center">
        <div
          className="relative w-full"
          style={{
            aspectRatio: `${STAGE.w} / ${STAGE.h}`,
            maxWidth: `calc((100svh - var(--nav-h) - 48px) * ${STAGE.w / STAGE.h})`,
          }}
        >
          {data.items.map((value, index) => {
            // How much this value is the focus: the outgoing one shrinks
            // while the incoming one grows.
            const weight = index === from ? 1 - k : index === to ? k : 0;
            const settledBox = lerpBox(thumbBox(index), FOCUS, weight);
            const box = lerpBox(
              lerpBox(slitBox(index, count), panelBox(index, count), toPanels),
              settledBox,
              toSettled,
            );
            const isFocus = settled && index === current;
            return (
              <button
                key={value.id}
                type="button"
                aria-label={value.title}
                aria-pressed={isFocus}
                disabled={!settled || isFocus}
                onClick={() => pick(index)}
                className="absolute overflow-hidden bg-[#D9D9D9] disabled:cursor-default"
                style={{
                  left: pct(box.x, STAGE.w),
                  top: pct(box.y, STAGE.h),
                  width: pct(box.w, STAGE.w),
                  height: pct(box.h, STAGE.h),
                  borderRadius: lerp(4, 10, weight * toSettled),
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={value.image}
                  alt=""
                  className="size-full object-cover"
                  // Thumbnails are monochrome; the incoming value saturates
                  // into colour as it grows (the "loader").
                  style={{ filter: `grayscale(${toSettled * (1 - weight)})` }}
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
              </button>
            );
          })}

          {/* The focused value keeps its place in the thumbnail row, in
              colour, its outline sliding along as the focus moves. */}
          <span
            aria-hidden
            className="absolute overflow-hidden rounded-[4px] outline outline-1 outline-offset-2 outline-[var(--hll-dark-grey)]"
            style={{
              left: pct(lerp(from, to, k) * (THUMB.size + THUMB.gap), STAGE.w),
              top: pct(THUMB.y, STAGE.h),
              width: pct(THUMB.size, STAGE.w),
              height: pct(THUMB.size, STAGE.h),
              opacity: toSettled,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.image} alt="" className="size-full object-cover" />
          </span>

          <div
            className="absolute"
            style={{
              left: pct(819, STAGE.w),
              top: 0,
              width: pct(632, STAGE.w),
              opacity: copyOpacity,
            }}
            aria-live="polite"
          >
            {toSettled > 0 ? (
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
                <p className="mt-8 max-w-[592px] text-[clamp(1.125rem,calc(1.59*var(--vw)),1.5rem)] leading-[1.25] text-[var(--hll-dark-grey)]">
                  {item.description}
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
