"use client";

import { useEffect, useRef, useState } from "react";

import { HLLButton } from "@/components/hll";

import { homePageContent, type HomePageContent, type HomeStep } from "@/data/home";

import { HOME_GUTTER, HomeHeading } from "./primitives";

// Desktop: the active stage is a 530px image in the centre, the others 250px either side;
// offsets are inside the stage below the heading.
const STAGE = { w: 1452, h: 728 };
const SLOTS = [
  { x: 110, y: 205, size: 250 },
  { x: 461, y: 64, size: 530 },
  { x: 1092, y: 206, size: 250 },
];

// Mobile: a 333px card in the middle, the others peeking in at the sides; offsets are from
// the screen's centre line.
const MOBILE_SLOTS = [
  { x: -467, y: 26, size: 287 },
  { x: -169, y: 0, size: 333 },
  { x: 174, y: 23, size: 295 },
];

// The middle stage narrows to the screen (12px clear of each edge) on phones under 402px wide,
// so it never runs off the left; the side stages keep their gaps to it (11px left, 10px right).
const MOBILE_ACTIVE_W = `min(${MOBILE_SLOTS[1].size}px, calc(100 * var(--vw) - 24px))`;
// The middle stage sits 2.5px left of centre (x -169 for 333px).
const mobileLeft = (slot: number) =>
  slot === 1
    ? `calc(50% - ${MOBILE_ACTIVE_W} / 2 - 2.5px)`
    : slot === 0
      ? `calc(50% - ${MOBILE_ACTIVE_W} / 2 - 2.5px - 11px - ${MOBILE_SLOTS[0].size}px)`
      : `calc(50% + ${MOBILE_ACTIVE_W} / 2 - 2.5px + 10px)`;

const pct = (v: number, of: number) => `${(v / of) * 100}%`;

/** How long a stage without a motion piece holds before the carousel turns; one with a
 *  piece holds for its video's length. */
const STAGE_MS = 6000;

/** A 103 × 2 timer track that fills while the stage holds, then turns the carousel; keyed per stage. */
function StageTimer({
  ms,
  paused,
  onDone,
  className = "",
}: {
  ms: number;
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
          animation: `voice-timer ${ms}ms linear both`,
          animationPlayState: paused ? "paused" : "running",
        }}
        onAnimationEnd={onDone}
      />
    </span>
  );
}

/** The site's arrow: a "<" or ">" in the functional font, as on Capabilities and the testimonials, with a bigger tap area. */
function Arrow({ direction, onClick }: { direction: "prev" | "next"; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label={direction === "prev" ? "Previous stage" : "Next stage"}
      onClick={onClick}
      className="-m-3 grid size-[41px] place-items-center text-[12px] leading-none text-[var(--hll-dark-grey)] transition-opacity hover:opacity-60"
      style={{ fontFamily: "var(--hll-font-functional)" }}
    >
      {direction === "prev" ? "<" : ">"}
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
  const steps = data.steps.slice(0, 3);
  const [active, setActive] = useState(Math.min(1, steps.length - 1));
  const count = steps.length;
  const slotOf = (index: number, at = active) => (index - at + 1 + count) % count;
  // With three slots a turn sends one card from end to end; it swings round behind the middle
  // card (smaller and faded at the halfway point), like a rotary.
  const [wraps, setWraps] = useState<number[]>(() => steps.map(() => 0));
  // The step just left: its text fades out while the new one's fades up.
  const [leaving, setLeaving] = useState<number | null>(null);
  useEffect(() => {
    if (leaving === null) return undefined;
    const t = window.setTimeout(() => setLeaving(null), 700);
    return () => window.clearTimeout(t);
  }, [leaving]);
  const select = (next: number) => {
    if (next === active) return;
    setLeaving(active);
    setWraps((current) =>
      current.map((n, index) =>
        Math.abs(slotOf(index, next) - slotOf(index)) === 2 ? n + 1 : n,
      ),
    );
    setActive(next);
  };
  const go = (delta: number) => select((active + delta + count) % count);

  // The click that ends a drag doesn't also pick a card.
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
  // Each motion piece's length, by stage, once its video has loaded.
  const [videoMs, setVideoMs] = useState<Record<number, number>>({});
  const onVideoMs = (index: number) => (ms: number) =>
    setVideoMs((current) => (current[index] === ms ? current : { ...current, [index]: ms }));
  // The centre video pauses with the timer, so each swap lands on its video's end.
  const running = !autoplay || (inView && !held && !focused);
  const timer = (className?: string) =>
    autoplay ? (
      <StageTimer
        key={active}
        ms={videoMs[active] ?? STAGE_MS}
        paused={!running}
        onDone={() => go(1)}
        className={className}
      />
    ) : null;

  // Two copies of the same keyframes, so each wrap restarts the swing.
  const rotary = (index: number) =>
    wraps[index] ? `hww-rotary-${wraps[index] % 2 ? "a" : "b"} 700ms cubic-bezier(0.22,1,0.36,1) both` : undefined;
  const textIn = "hww-text-in 600ms 300ms cubic-bezier(0.22,1,0.36,1) both";
  const textOut = "hww-text-out 300ms ease-in both";
  const swinging = (index: number) => Math.abs(slotOf(index) - slotOf(index, leaving ?? active)) === 2;

  return (
    <section className={`hll-home-section pb-[154px] ${HOME_GUTTER}`}>
      <div data-line className={`-mx-3 h-px bg-[var(--hll-mid-grey)] lg:hidden ${dividerClassName}`} />
      <HomeHeading eyebrow={data.eyebrow} title={data.title} />

      <div
        ref={mobileRef}
        className="relative mt-[54px] h-[452px] touch-pan-y lg:hidden"
        {...swipeHandlers}
      >
        {steps.map((step, index) => {
          const slotIndex = slotOf(index);
          const slot = MOBILE_SLOTS[slotIndex];
          const isActive = index === active;
          return (
            <button
              key={step.id}
              type="button"
              onClick={() => select(index)}
              aria-current={isActive ? "step" : undefined}
              className="absolute text-left transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{
                left: mobileLeft(slotIndex),
                top: slot.y,
                width: slotIndex === 1 ? MOBILE_ACTIVE_W : slot.size,
                animation: rotary(index),
                zIndex: leaving !== null && swinging(index) ? 0 : isActive ? 2 : 1,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <StepMedia step={step} active={isActive} running={running} onVideoMs={onVideoMs(index)} />
              {isActive || index === leaving ? (
                <span key={isActive ? "in" : "out"} className="block" style={{ animation: isActive ? textIn : textOut }}>
                  <span className="mt-2 block text-[24px] leading-[27.8px] text-black">
                    {step.title}
                  </span>
                  <span className="mt-3 block max-w-[312px] text-[14px] leading-[17.5px] text-[var(--hll-dark-grey)]">
                    {step.body}
                  </span>
                  {isActive ? timer("mt-4") : null}
                </span>
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
          // Heading and stage together fit one screen under the Nav Bar, so on a short screen the
          // stage narrows rather than running off the bottom.
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
              key={step.id}
              type="button"
              onClick={() => select(index)}
              aria-current={isActive ? "step" : undefined}
              className="absolute text-left transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{
                left: pct(slot.x, STAGE.w),
                top: pct(slot.y, STAGE.h),
                width: pct(slot.size, STAGE.w),
                animation: rotary(index),
                zIndex: leaving !== null && swinging(index) ? 0 : isActive ? 2 : 1,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <StepMedia step={step} active={isActive} running={running} onVideoMs={onVideoMs(index)} />
              <span className="mt-[6px] block text-[clamp(1.5rem,calc(2.38*var(--vw)),2.25rem)] font-normal leading-[1.16] text-black">
                {step.title}
              </span>
              {isActive || index === leaving ? (
                <span key={isActive ? "in" : "out"} className="block" style={{ animation: isActive ? textIn : textOut }}>
                  <span className="mt-[10px] block max-w-[460px] text-[clamp(1rem,calc(1.32*var(--vw)),1.25rem)] leading-[1.25] text-[var(--hll-dark-grey)]">
                    {step.body}
                  </span>
                  {isActive ? timer("mt-5") : null}
                </span>
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

      {/* Mobile: rows of a photo, name and role. */}
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

      {/* Four cards, 10px apart and from the frame edges. */}
      <div className="mt-[84px] hidden grid-cols-4 gap-[10px] px-[10px] lg:grid">
        {team.map((person) => (
          // Name, role and photo play together as the card comes in.
          <article key={person.id} data-reveal-card data-no-text-scroll>
            <div
              className="reveal-card-photo aspect-square w-full rounded-lg bg-[#D9D9D9]"
              data-no-image-reveal
              style={photo(person.photo)}
            />
            <div>
              <p className="reveal-card-text mt-2 text-[clamp(1.5rem,calc(2.38*var(--vw)),2.25rem)] font-normal leading-[1.16] text-[var(--hll-dark-grey)]">
                {person.name}
              </p>
              <p className="reveal-card-text hll-label mt-[2px] text-[12px] uppercase leading-[1.2] text-[var(--hll-dark-grey)]">
                {person.role}
              </p>
            </div>
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
      {/* The Ports demo, a self-contained file in public/lab, in a 1171 × 658 window never taller
          than the screen leaves. Phones show its opening slide; its Start button goes full screen. */}
      <div className="relative mt-9 aspect-[312/238] w-full overflow-hidden rounded-[6px] bg-[var(--hll-bg)] lg:mx-auto lg:mt-[60px] lg:aspect-[1171/658] lg:w-[min(calc(77.45*var(--vw)),calc((100*var(--vh)-160px)*1171/658))] lg:rounded-lg">
        <iframe
          src="/lab/ports.html"
          title="Ports: interactive demo"
          allow="fullscreen"
          loading="lazy"
          className="absolute inset-0 size-full border-0"
        />
      </div>
    </section>
  );
}

/** A How we work step's square: its motion piece looping over the still, or just the still. Only the centre card plays;
 *  the side cards show their still, greyed out. */
function StepMedia({
  step,
  active,
  running,
  onVideoMs,
}: {
  step: HomeStep;
  active: boolean;
  running: boolean;
  onVideoMs?: (ms: number) => void;
}) {
  return (
    // No scroll reveal: it left the stills cut off at the bottom until the cards were fully on screen.
    <span
      data-no-image-reveal
      className={`relative block aspect-square w-full overflow-hidden rounded-lg transition-[filter,opacity] duration-700 ${active ? "" : "opacity-70 grayscale"}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={step.image} alt="" draggable={false} className="absolute inset-0 size-full object-cover" />
      {step.video ? (
        <span className={`absolute inset-0 transition-opacity duration-500 ${active ? "opacity-100" : "opacity-0"}`}>
          <NearVideo src={step.video} active={active} running={running} onVideoMs={onVideoMs} />
        </span>
      ) : null}
    </span>
  );
}

/**
 * A muted looping video that only downloads near the screen, plays while `active` and `running` and on
 * screen, and otherwise waits on its first frame. No poster: the still shows until it loads.
 */
function NearVideo({
  src,
  active,
  running,
  onVideoMs,
}: {
  src: string;
  /** The centre card: plays while `running`, otherwise waits on its first frame. */
  active: boolean;
  running: boolean;
  onVideoMs?: (ms: number) => void;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [near, setNear] = useState(false);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const video = ref.current;
    if (!video) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setNear(true);
        setVisible(entry.isIntersecting);
      },
      { rootMargin: "300px" },
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    const video = ref.current;
    if (!video || !near) return;
    if (active && running && visible) {
      void video.play().catch(() => {});
      return;
    }
    video.pause();
    // Off centre: back to the first frame, ready to play from the start.
    if (!active) video.currentTime = 0;
  }, [near, active, running, visible]);
  return (
    <video
      ref={ref}
      src={near ? src : undefined}
      muted
      loop
      playsInline
      preload={near ? "auto" : "none"}
      onLoadedMetadata={(e) => {
        const seconds = e.currentTarget.duration;
        if (Number.isFinite(seconds) && seconds > 0) onVideoMs?.(Math.round(seconds * 1000));
      }}
      aria-hidden
      className="absolute inset-0 size-full object-cover motion-reduce:hidden"
    />
  );
}
