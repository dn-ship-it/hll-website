"use client";

import { useEffect, useRef } from "react";

import { TEAM } from "./team-skyline/team.js";

/**
 * The Careers team photos (Figma, HLL Website Feedback, 18 Nov): twelve headshots at different depths.
 * Bigger photos sit nearer, in front, and shift more as the cursor moves (phones: as the page scrolls).
 */

/** Desktop, as the Figma About › Careers frame: who, then x, y and size on a 1452 × 640 stage whose top is the section heading's top. */
const DESKTOP = [
  ["rima-sarkar", 610, 48, 137], ["advaith", 460, 157, 100], ["dhanashree", 822, 162, 110],
  ["deepak-motwani", 1057, 90, 98], ["arjun-pathni", 252, 207, 147], ["nilesh-nalnikar", 565, 312, 138],
  ["chinmay", 919, 315, 190], ["santosh-maruwada", 1152, 232, 130], ["hannan-hakim", 305, 410, 130],
  ["anjali-dharba", 755, 452, 127], ["spoorthi", 502, 507, 97], ["tej", 1249, 468, 107],
] as const;
const STAGE = { w: 1452, h: 640 };

/** Phones: x, y and size on a 343 × 410 stage under the heading; each takes the person of the same size rank on desktop. */
const MOBILE = [
  [8, 20, 73], [120, 0, 50], [195, 40, 67], [280, 8, 53],
  [292, 110, 48], [210, 150, 58], [95, 95, 70], [120, 215, 95],
  [10, 150, 64], [240, 250, 63], [30, 285, 49], [250, 345, 55],
] as const;
const MOBILE_STAGE = { w: 343, h: 410 };

const bySize = (slots: readonly (readonly number[])[]) =>
  slots.map((slot, i) => [slot[slot.length - 1], i] as const).sort((a, b) => b[0] - a[0]).map(([, i]) => i);
const desktopRank = bySize(DESKTOP.map(([, ...rest]) => rest));
const mobileRank = bySize(MOBILE);
/** The person shown in each phone slot. */
const MOBILE_PEOPLE = MOBILE.map((_, i) => DESKTOP[desktopRank[mobileRank.indexOf(i)]][0]);

const MIN = 96;
const MAX = 190;
/** How far, in px, the farthest and nearest photos shift at the cursor's edge. */
const SHIFT = { far: 10, near: 56 };

const depthOf = (size: number) => Math.min(1, Math.max(0, (size - MIN) / (MAX - MIN)));
const pct = (v: number, of: number) => `${(v / of) * 100}%`;

function Photo({ who }: { who: string }) {
  const person = TEAM.find((p) => p.image === `${who}.webp`) ?? TEAM[0];
  // Head and shoulders, the cutout cut off square at the chest as in Figma.
  const zoom = 115;
  return (
    <span data-no-image-reveal className="relative block size-full overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/assets/about/team/${person.image}`}
        alt={person.name}
        loading="lazy"
        draggable={false}
        className="absolute max-w-none select-none"
        style={{
          width: `${zoom}%`,
          left: `${50 - person.headX * zoom}%`,
          top: `${45 - (person.faceY * zoom) / person.aspect}%`,
        }}
      />
    </span>
  );
}

export function CareersTeamCloud({ className = "" }: { className?: string }) {
  const desktopRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const touch = window.matchMedia("(hover: none)").matches;
    const target = { x: 0, y: 0 };
    const now = { x: 0, y: 0 };
    let frame = 0;
    let visible = false;

    const stages = [desktopRef.current, mobileRef.current].filter((el): el is HTMLDivElement => el !== null);
    const layers = () =>
      stages.flatMap((stage) => [...stage.querySelectorAll<HTMLElement>("[data-depth]")]);

    const onPointer = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const fromScroll = () => {
      const stage = stages.find((s) => s.offsetHeight);
      if (!stage) return;
      const r = stage.getBoundingClientRect();
      target.y = Math.max(-1, Math.min(1, (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight));
    };

    const tick = () => {
      if (touch) fromScroll();
      now.x += (target.x - now.x) * 0.08;
      now.y += (target.y - now.y) * 0.08;
      for (const el of layers()) {
        const d = Number(el.dataset.depth);
        const shift = SHIFT.far + (SHIFT.near - SHIFT.far) * d;
        el.style.transform = `translate3d(${(-now.x * shift).toFixed(2)}px, ${(-now.y * shift).toFixed(2)}px, 0)`;
      }
      frame = visible ? requestAnimationFrame(tick) : 0;
    };

    const io = new IntersectionObserver((entries) => {
      visible = entries.some((e) => e.isIntersecting && e.boundingClientRect.height > 0);
      if (visible && !frame) frame = requestAnimationFrame(tick);
    });
    stages.forEach((s) => io.observe(s));
    if (!touch) window.addEventListener("pointermove", onPointer, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("pointermove", onPointer);
      cancelAnimationFrame(frame);
    };
  }, []);

  const layer = (
    slots: readonly (readonly [number, number, number])[],
    people: readonly string[],
    stage: { w: number; h: number },
    scale: number,
  ) =>
    slots.map(([x, y, size], i) => {
      const depth = depthOf(size / scale);
      return (
        <div
          key={people[i]}
          data-depth={depth.toFixed(3)}
          className="absolute will-change-transform"
          style={{
            left: pct(x, stage.w),
            top: pct(y, stage.h),
            width: pct(size, stage.w),
            aspectRatio: "1",
            zIndex: Math.round(depth * 10) + 1,
          }}
        >
          <Photo who={people[i]} />
        </div>
      );
    });

  return (
    <div className={className}>
      <div
        ref={desktopRef}
        className="relative hidden w-full lg:block"
        style={{ aspectRatio: `${STAGE.w} / ${STAGE.h}` }}
      >
        {layer(DESKTOP.map(([, ...rest]) => rest), DESKTOP.map(([who]) => who), STAGE, 1)}
      </div>
      <div
        ref={mobileRef}
        className="relative mx-auto w-full max-w-[343px] lg:hidden"
        style={{ aspectRatio: `${MOBILE_STAGE.w} / ${MOBILE_STAGE.h}` }}
      >
        {layer(MOBILE, MOBILE_PEOPLE, MOBILE_STAGE, 0.5)}
      </div>
    </div>
  );
}
