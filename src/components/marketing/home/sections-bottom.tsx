"use client";

import { useRef, useState } from "react";

import { HLLButton } from "@/components/hll";

import { HOME_GUTTER, HomeHeading } from "./primitives";

const STEPS = [
  {
    id: "shape",
    title: "Shape",
    image: "/assets/home/shape.webp",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sodales laoreet vehicula.",
  },
  {
    id: "build",
    title: "Build",
    image: "/assets/home/build.webp",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sodales laoreet vehicula.",
  },
  {
    id: "evolve",
    title: "Evolve",
    image: "/assets/home/evolve.webp",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sodales laoreet vehicula.",
  },
] as const;

// Figma "How we work": the active stage is a 530px image in the centre with
// the other two at 250px either side. Offsets are inside the 1452 × 728 stage
// below the heading.
const STAGE = { w: 1452, h: 728 };
const SLOTS = [
  { x: 110, y: 205, size: 250 },
  { x: 461, y: 64, size: 530 },
  { x: 1092, y: 206, size: 250 },
];

// Figma Home mobile: a 333px card in the middle (x 32 of 402) with the others
// peeking in at 287px (left, x -265) and 295px (right, x 375). Offsets are
// from the screen's centre line.
const MOBILE_SLOTS = [
  { x: -467, y: 26, size: 287 },
  { x: -169, y: 0, size: 333 },
  { x: 174, y: 23, size: 295 },
];

const pct = (v: number, of: number) => `${(v / of) * 100}%`;

function Arrow({ direction, onClick }: { direction: "prev" | "next"; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label={direction === "prev" ? "Previous stage" : "Next stage"}
      onClick={onClick}
      className="grid size-[17px] place-items-center text-[var(--hll-dark-grey)] hover:opacity-60"
    >
      <svg viewBox="0 0 17 17" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden className="size-[17px]">
        {direction === "prev" ? <path d="M16 8.5H1M8 1.5l-7 7 7 7" /> : <path d="M1 8.5h15M9 1.5l7 7-7 7" />}
      </svg>
    </button>
  );
}

export function HowWeWork() {
  const [active, setActive] = useState(1);
  const count = STEPS.length;
  const slotOf = (index: number) => (index - active + 1 + count) % count;
  const go = (delta: number) => setActive((a) => (a + delta + count) % count);

  // Mobile: swipe left / right to bring the next stage to the middle.
  const swipeX = useRef<number | null>(null);

  return (
    <section className={`hll-home-section pb-[154px] ${HOME_GUTTER}`}>
      {/* Figma Home mobile: a hairline 8px in from each edge, 32px above. */}
      <div data-line className="-mx-3 mb-8 h-px bg-[var(--hll-mid-grey)] lg:hidden" />
      <HomeHeading eyebrow="About" title="How we work" />

      <div
        className="relative mt-[54px] h-[432px] touch-pan-y lg:hidden"
        onPointerDown={(e) => {
          swipeX.current = e.clientX;
        }}
        onPointerUp={(e) => {
          if (swipeX.current === null) return;
          const dx = e.clientX - swipeX.current;
          swipeX.current = null;
          if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
        }}
        onPointerCancel={() => {
          swipeX.current = null;
        }}
      >
        {STEPS.map((step, index) => {
          const slot = MOBILE_SLOTS[slotOf(index)];
          const isActive = index === active;
          return (
            <button
              key={step.id}
              type="button"
              onClick={() => setActive(index)}
              aria-current={isActive ? "step" : undefined}
              className="absolute text-left transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{
                left: `calc(50% + ${slot.x}px)`,
                top: slot.y,
                width: slot.size,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={step.image} alt="" draggable={false} className="aspect-square w-full rounded-lg object-cover" />
              {isActive ? (
                <>
                  <span className="mt-2 block text-[24px] leading-[27.8px] text-black">
                    {step.title}
                  </span>
                  <span className="mt-3 block max-w-[312px] text-[14px] leading-[17.5px] text-[var(--hll-dark-grey)]">
                    {step.body}
                  </span>
                </>
              ) : null}
            </button>
          );
        })}
      </div>

      <div className="relative hidden lg:block" style={{ aspectRatio: `${STAGE.w} / ${STAGE.h}` }}>
        <div className="absolute" style={{ left: pct(36, STAGE.w), top: pct(317, STAGE.h) }}>
          <Arrow direction="prev" onClick={() => go(-1)} />
        </div>
        <div className="absolute" style={{ left: pct(1399, STAGE.w), top: pct(317, STAGE.h) }}>
          <Arrow direction="next" onClick={() => go(1)} />
        </div>

        {STEPS.map((step, index) => {
          const slot = SLOTS[slotOf(index)];
          const isActive = index === active;
          return (
            <button
              key={step.id}
              type="button"
              onClick={() => setActive(index)}
              aria-current={isActive ? "step" : undefined}
              className="absolute text-left transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ left: pct(slot.x, STAGE.w), top: pct(slot.y, STAGE.h), width: pct(slot.size, STAGE.w) }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={step.image} alt="" className="aspect-square w-full rounded-lg object-cover" />
              <span className="mt-[6px] block text-[clamp(1.5rem,calc(2.38*var(--vw)),2.25rem)] font-normal leading-[1.16] text-black">
                {step.title}
              </span>
              {isActive ? (
                <span className="mt-[10px] block max-w-[460px] text-[clamp(1rem,calc(1.32*var(--vw)),1.25rem)] leading-[1.25] text-[var(--hll-dark-grey)]">
                  {step.body}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

    </section>
  );
}

export function WhoWeAre() {
  const team = Array.from({ length: 4 }, (_, i) => ({
    name: "Hannan Hakim",
    role: "Chief Operating Officer",
    id: i,
  }));

  return (
    <section className="hll-home-section pb-[84px] lg:pb-[154px]">
      <div className={HOME_GUTTER}>
        <HomeHeading eyebrow="Team" title="Who are we" />
      </div>

      {/* Figma Home mobile: rows of a 93px photo, name and role 12px right. */}
      <ul className="mt-8 space-y-[10px] px-[18px] lg:hidden">
        {team.map((person) => (
          <li key={person.id} className="flex gap-3">
            <div className="size-[93px] shrink-0 rounded-lg bg-[#D9D9D9]" />
            <div>
              <p className="text-[24px] leading-[27.8px] text-black">{person.name}</p>
              <p
                className="text-[10px] uppercase leading-[12px] text-[var(--hll-dark-grey)]"
                style={{ fontFamily: "var(--hll-font-functional)" }}
              >
                {person.role}
              </p>
            </div>
          </li>
        ))}
      </ul>

      {/* Figma: four 366px cards, 10px apart and 10px from the frame edges. */}
      <div className="mt-[84px] hidden grid-cols-4 gap-[10px] px-[10px] lg:grid">
        {team.map((person) => (
          <article key={person.id}>
            <div className="aspect-square w-full rounded-lg bg-[#D9D9D9]" />
            <p className="mt-2 text-[clamp(1.5rem,calc(2.38*var(--vw)),2.25rem)] font-normal leading-[1.16] text-[var(--hll-dark-grey)]">
              {person.name}
            </p>
            <p className="hll-label mt-[2px] text-[12px] uppercase leading-[1.2] text-[var(--hll-dark-grey)]">
              {person.role}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-[54px] flex justify-center lg:mt-[138px]">
        <HLLButton href="/team" variant="about" size="md">
          View all team
        </HLLButton>
      </div>
    </section>
  );
}

export function InsideTheLab() {
  return (
    <section
      className={`hll-home-section relative overflow-hidden pb-12 pt-9 lg:min-h-[982px] lg:pb-[79px] lg:pt-[85px] ${HOME_GUTTER}`}
      style={{ background: "#F26A2E url(/assets/home/lab-bg.webp) center / cover" }}
    >
      <HomeHeading eyebrow="Demo tool" title="Inside the Lab" tone="dark" />
      <div
        aria-label="Demo window"
        role="img"
        className="mx-auto mt-9 grid aspect-[312/238] w-full max-w-[312px] place-items-center rounded-[6px] bg-[var(--hll-bg)] lg:mt-[60px] lg:aspect-[1171/658] lg:max-w-[1171px] lg:rounded-lg"
      >
        <span className="text-[12px] uppercase leading-none tracking-[0.25em] text-black">Demo window</span>
      </div>
    </section>
  );
}
