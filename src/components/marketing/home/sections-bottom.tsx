"use client";

import { useEffect, useRef, useState } from "react";

import { HLLButton } from "@/components/hll";

import { homePageContent, type HomePageContent } from "@/data/home";

import { HOME_GUTTER, HomeHeading } from "./primitives";

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

/** How long each stage holds before the carousel turns on its own. */
const STAGE_MS = 6000;

/**
 * Figma "carousel with timer delay": a 103 × 2 track that fills while the
 * stage holds, then turns the carousel. Keyed per stage, so a manual turn
 * starts it over; `paused` holds it where it is.
 */
function StageTimer({
  paused,
  onDone,
  className = "",
}: {
  paused: boolean;
  onDone: () => void;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={`block h-[2px] w-[103px] overflow-hidden rounded bg-black/15 ${className}`}
    >
      <span
        className="block h-full bg-[var(--hll-dark-grey)]"
        style={{
          animation: `voice-timer ${STAGE_MS}ms linear both`,
          animationPlayState: paused ? "paused" : "running",
        }}
        onAnimationEnd={onDone}
      />
    </span>
  );
}

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

export function HowWeWork({
  data = homePageContent.howWeWork,
  dividerClassName = "mb-8",
}: {
  /** The Home page's copy; About shows the same section. */
  data?: HomePageContent["howWeWork"];
  /** Space under the mobile hairline (Home 32px, About 84px). */
  dividerClassName?: string;
} = {}) {
  // Figma's carousel has three stages: the middle one large, one either side.
  const steps = data.steps.slice(0, 3);
  const [active, setActive] = useState(Math.min(1, steps.length - 1));
  const count = steps.length;
  const slotOf = (index: number, at = active) => (index - at + 1 + count) % count;
  // With three stages in three slots, a turn sends one card from one end to
  // the other. Rather than slide it across the middle card, it's remounted at
  // its new slot (a new key) and fades in there.
  const [wraps, setWraps] = useState<number[]>(() => steps.map(() => 0));
  const select = (next: number) => {
    if (next === active) return;
    setWraps((current) =>
      current.map((n, index) =>
        Math.abs(slotOf(index, next) - slotOf(index)) === 2 ? n + 1 : n,
      ),
    );
    setActive(next);
  };
  const go = (delta: number) => select((active + delta + count) % count);

  // Drag (desktop) or swipe (mobile) left / right to bring the next stage to
  // the middle; the click that ends a drag doesn't also pick a card.
  const swipeX = useRef<number | null>(null);
  const swiped = useRef(false);
  const swipeHandlers = {
    onPointerDown: (e: React.PointerEvent) => {
      swipeX.current = e.clientX;
      swiped.current = false;
      setHeld(true);
      // A drag released outside the carousel never reaches onPointerUp here.
      const release = () => {
        swipeX.current = null;
        setHeld(false);
        window.removeEventListener("pointerup", release);
        window.removeEventListener("pointercancel", release);
      };
      window.addEventListener("pointerup", release);
      window.addEventListener("pointercancel", release);
    },
    onPointerUp: (e: React.PointerEvent) => {
      setHeld(false);
      if (swipeX.current === null) return;
      const dx = e.clientX - swipeX.current;
      swipeX.current = null;
      if (Math.abs(dx) <= 40) return;
      swiped.current = true;
      go(dx < 0 ? 1 : -1);
    },
    onPointerCancel: () => {
      swipeX.current = null;
      setHeld(false);
    },
    // Keyboard focus in the carousel holds the timer; a click's focus doesn't.
    onFocus: (e: React.FocusEvent) => setFocused(e.target.matches(":focus-visible")),
    onBlur: (e: React.FocusEvent) => {
      if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false);
    },
    onClickCapture: (e: React.MouseEvent) => {
      if (!swiped.current) return;
      swiped.current = false;
      e.preventDefault();
      e.stopPropagation();
    },
  };
  // The carousel turns itself every STAGE_MS while it's on screen, unless
  // held by a drag or keyboard focus — and never under reduced motion.
  const mobileRef = useRef<HTMLDivElement>(null);
  const desktopRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [held, setHeld] = useState(false);
  const [focused, setFocused] = useState(false);
  const [autoplay, setAutoplay] = useState(false);
  useEffect(() => {
    setAutoplay(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    // Only the carousel shown at this width has a size, so only it reports.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.boundingClientRect.height) setInView(entry.isIntersecting);
        }
      },
      { threshold: 0.4 },
    );
    for (const el of [mobileRef.current, desktopRef.current]) {
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);
  const timer = (className?: string) =>
    autoplay ? (
      <StageTimer
        key={active}
        paused={!inView || held || focused}
        onDone={() => go(1)}
        className={className}
      />
    ) : null;

  const wrapIn = (index: number) =>
    wraps[index] ? "hww-wrap-in 500ms 250ms cubic-bezier(0.22,1,0.36,1) both" : undefined;

  return (
    <section className={`hll-home-section pb-[154px] ${HOME_GUTTER}`}>
      {/* Figma Home mobile: a hairline 8px in from each edge, 32px above. */}
      <div data-line className={`-mx-3 h-px bg-[var(--hll-mid-grey)] lg:hidden ${dividerClassName}`} />
      <HomeHeading eyebrow={data.eyebrow} title={data.title} />

      <div
        ref={mobileRef}
        className="relative mt-[54px] h-[452px] touch-pan-y lg:hidden"
        {...swipeHandlers}
      >
        {steps.map((step, index) => {
          const slot = MOBILE_SLOTS[slotOf(index)];
          const isActive = index === active;
          return (
            <button
              key={`${step.id}-${wraps[index]}`}
              type="button"
              onClick={() => select(index)}
              aria-current={isActive ? "step" : undefined}
              className="absolute text-left transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{
                left: `calc(50% + ${slot.x}px)`,
                top: slot.y,
                width: slot.size,
                animation: wrapIn(index),
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
                  {timer("mt-4")}
                </>
              ) : null}
            </button>
          );
        })}
      </div>

      <div
        ref={desktopRef}
        className="relative mx-auto hidden cursor-grab select-none active:cursor-grabbing lg:block"
        style={{
          aspectRatio: `${STAGE.w} / ${STAGE.h}`,
          // QA A-06: heading and stage together fit one screen under the Nav
          // Bar (the heading is its 14.4px eyebrow, 12px gap and a 1.16-line
          // title), so on a short screen the stage narrows, centred, rather
          // than running off the bottom.
          width: `min(100%, calc((100 * var(--svh) - var(--nav-h) - 26.4px - 1.16 * clamp(30px, calc(4.23 * var(--vw)), 4rem) - 32px) * ${STAGE.w} / ${STAGE.h}))`,
        }}
        {...swipeHandlers}
      >
        <div className="absolute" style={{ left: pct(36, STAGE.w), top: pct(317, STAGE.h) }}>
          <Arrow direction="prev" onClick={() => go(-1)} />
        </div>
        <div className="absolute" style={{ left: pct(1399, STAGE.w), top: pct(317, STAGE.h) }}>
          <Arrow direction="next" onClick={() => go(1)} />
        </div>

        {steps.map((step, index) => {
          const slot = SLOTS[slotOf(index)];
          const isActive = index === active;
          return (
            <button
              key={`${step.id}-${wraps[index]}`}
              type="button"
              onClick={() => select(index)}
              aria-current={isActive ? "step" : undefined}
              className="absolute text-left transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{
                left: pct(slot.x, STAGE.w),
                top: pct(slot.y, STAGE.h),
                width: pct(slot.size, STAGE.w),
                animation: wrapIn(index),
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={step.image} alt="" draggable={false} className="aspect-square w-full rounded-lg object-cover" />
              <span className="mt-[6px] block text-[clamp(1.5rem,calc(2.38*var(--vw)),2.25rem)] font-normal leading-[1.16] text-black">
                {step.title}
              </span>
              {isActive ? (
                <>
                  <span className="mt-[10px] block max-w-[460px] text-[clamp(1rem,calc(1.32*var(--vw)),1.25rem)] leading-[1.25] text-[var(--hll-dark-grey)]">
                    {step.body}
                  </span>
                  {timer("mt-5")}
                </>
              ) : null}
            </button>
          );
        })}
      </div>

    </section>
  );
}

export function WhoWeAre({ data }: { data: HomePageContent["whoWeAre"] }) {
  const team = data.people.slice(0, 4);

  return (
    <section className="hll-home-section pb-[84px] lg:pb-[154px]">
      <div className={HOME_GUTTER}>
        <HomeHeading eyebrow={data.eyebrow} title={data.title} />
      </div>

      {/* Figma Home mobile: rows of a 93px photo, name and role 12px right. */}
      <ul className="mt-8 space-y-[10px] px-[18px] lg:hidden">
        {team.map((person) => (
          <li key={person.id} className="flex gap-3">
            <div className="size-[93px] shrink-0 rounded-lg bg-[#D9D9D9]" style={photo(person.photo)} />
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
            <div className="aspect-square w-full rounded-lg bg-[#D9D9D9]" style={photo(person.photo)} />
            <p className="mt-2 text-[clamp(1.5rem,calc(2.38*var(--vw)),2.25rem)] font-normal leading-[1.16] text-[var(--hll-dark-grey)]">
              {person.name}
            </p>
            <p className="hll-label mt-[2px] text-[12px] uppercase leading-[1.2] text-[var(--hll-dark-grey)]">
              {person.role}
            </p>
          </article>
        ))}
      </div>

      {/* Phones set it on the team list's left edge. */}
      <div className="mt-[54px] flex justify-start px-[18px] lg:mt-[138px] lg:justify-center lg:px-0">
        <HLLButton href={data.ctaHref} variant="about" size="md">
          {data.ctaLabel}
        </HLLButton>
      </div>
    </section>
  );
}

const photo = (url?: string | null) =>
  url ? { background: `#D9D9D9 url(${url}) center / cover` } : undefined;

export function InsideTheLab({ data }: { data: HomePageContent["lab"] }) {
  return (
    <section
      className={`hll-home-section relative overflow-hidden pb-12 pt-9 lg:min-h-[982px] lg:pb-[79px] lg:pt-[85px] ${HOME_GUTTER}`}
      style={{ background: `#F26A2E url(${data.background}) center / cover` }}
    >
      <HomeHeading eyebrow={data.eyebrow} title={data.title} tone="dark" />
      {/* Edge to edge within the gutter, in line with the heading. */}
      <div
        aria-label="Demo window"
        role={data.demoVideo ? undefined : "img"}
        className="relative mt-9 grid aspect-[312/238] w-full place-items-center overflow-hidden rounded-[6px] bg-[var(--hll-bg)] lg:mt-[60px] lg:aspect-[1171/658] lg:rounded-lg"
      >
        {data.demoVideo ? (
          <video
            src={data.demoVideo}
            poster={data.demoImage ?? undefined}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 size-full object-cover"
          />
        ) : data.demoImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={data.demoImage} alt="" className="absolute inset-0 size-full object-cover" />
        ) : (
          <span className="text-[12px] uppercase leading-none tracking-[0.25em] text-black">Demo window</span>
        )}
      </div>
    </section>
  );
}
