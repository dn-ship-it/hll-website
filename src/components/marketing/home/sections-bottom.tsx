"use client";

import { useState } from "react";

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

  return (
    <section className={`hll-home-section pb-[154px] ${HOME_GUTTER}`}>
      <HomeHeading eyebrow="About" title="How we work" />

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
              <span className="mt-[6px] block text-[clamp(1.5rem,2.38vw,2.25rem)] font-normal leading-[1.16] text-black">
                {step.title}
              </span>
              {isActive ? (
                <span className="mt-[10px] block max-w-[460px] text-[clamp(1rem,1.32vw,1.25rem)] leading-[1.25] text-[var(--hll-dark-grey)]">
                  {step.body}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      <div className="mt-12 grid gap-10 sm:grid-cols-3 lg:hidden">
        {STEPS.map((step) => (
          <div key={step.id}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={step.image} alt="" className="aspect-square w-full rounded-lg object-cover" />
            <p className="mt-2 text-2xl text-black">{step.title}</p>
            <p className="mt-2 text-base leading-[1.25] text-[var(--hll-dark-grey)]">{step.body}</p>
          </div>
        ))}
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
    <section className="hll-home-section pb-[154px]">
      <div className={HOME_GUTTER}>
        <HomeHeading eyebrow="Team" title="Who are we" />
      </div>

      {/* Figma: four 366px cards, 10px apart and 10px from the frame edges. */}
      <div className="mt-[84px] grid gap-[10px] px-[10px] sm:grid-cols-2 lg:grid-cols-4">
        {team.map((person) => (
          <article key={person.id}>
            <div className="aspect-square w-full rounded-lg bg-[#D9D9D9]" />
            <p className="mt-2 text-[clamp(1.5rem,2.38vw,2.25rem)] font-normal leading-[1.16] text-[var(--hll-dark-grey)]">
              {person.name}
            </p>
            <p className="hll-label mt-[2px] text-[12px] uppercase leading-[1.2] text-[var(--hll-dark-grey)]">
              {person.role}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-[138px] flex justify-center">
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
      className={`hll-home-section relative min-h-[982px] overflow-hidden pb-[79px] pt-[85px] ${HOME_GUTTER}`}
      style={{ background: "#F26A2E url(/assets/home/lab-bg.webp) center / cover" }}
    >
      <HomeHeading eyebrow="Demo tool" title="Inside the Lab" tone="dark" />
      <div
        aria-label="Demo window"
        role="img"
        className="mx-auto mt-[60px] grid aspect-[1171/658] w-full max-w-[1171px] place-items-center rounded-lg bg-[var(--hll-bg)]"
      >
        <span className="text-[12px] uppercase leading-none tracking-[0.25em] text-black">Demo window</span>
      </div>
    </section>
  );
}
