"use client";

import { useEffect, useRef, useState } from "react";

import type { ExpertVoice } from "@/data/services/types";
import { MediaPlaceholder } from "@/components/marketing/home/primitives";

/** How long each testimonial shows before the next one (the timer bar). */
const SLIDE_MS = 6000;
/** A horizontal drag this long (px) turns to the next or previous slide. */
const SWIPE_PX = 40;

/**
 * Figma testimonial block (service "Expert Voice", industry "Client Voice",
 * careers "Team Voice"): counter + arrows, 300×400 portrait, 115px logo tile,
 * quote from 60% across. A carousel over `slides` (QA T-01, T-02): the arrows,
 * a swipe or drag (phones and mouse) and, where there's a timer, the timer
 * itself move between them. With one slide the arrows stay inert.
 */
export function VoiceSection({
  slides,
  heading,
  counterColor = "var(--hll-dark-grey)",
  timerColor,
  divider = true,
  wide = false,
  headingInset = false,
}: {
  slides: readonly ExpertVoice[];
  heading: React.ReactNode;
  counterColor?: string;
  /** Hairline above the section (Careers' Team Voice has none). */
  divider?: boolean;
  /** Industry pages show the carousel's timer bar under the portrait. */
  timerColor?: string;
  /** Figma Industry mobile: a 253px square portrait at x 75 (Services: 245 × 253 at x 79). */
  wide?: boolean;
  /** Industry / Careers mobile set the heading in the 20px gutter (Services: 8px). */
  headingInset?: boolean;
}) {
  const count = slides.length;
  const many = count > 1;
  const [index, setIndex] = useState(0);
  // Bumped on every manual move, so the timer bar restarts from empty.
  const [turn, setTurn] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const drag = useRef<{ x: number; y: number; moved: boolean } | null>(null);
  const suppressClick = useRef(false);

  const go = (step: number) => {
    if (!many) return;
    setIndex((i) => (i + step + count) % count);
    setTurn((t) => t + 1);
  };

  // The timer only runs while the section is on screen.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !many) return undefined;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.25,
    });
    observer.observe(section);
    return () => observer.disconnect();
  }, [many]);

  // Drag or swipe sideways to change slide; vertical moves still scroll.
  const onPointerDown = (event: React.PointerEvent) => {
    suppressClick.current = false;
    if (!many || event.button !== 0) return;
    drag.current = { x: event.clientX, y: event.clientY, moved: false };
  };
  const onPointerMove = (event: React.PointerEvent) => {
    const state = drag.current;
    if (!state) return;
    // A mouse released outside before the drag began: drop it.
    if (event.pointerType === "mouse" && !(event.buttons & 1)) {
      drag.current = null;
      setDragging(false);
      return;
    }
    const dx = event.clientX - state.x;
    const dy = event.clientY - state.y;
    if (!state.moved && Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy)) {
      state.moved = true;
      setDragging(true);
      event.currentTarget.setPointerCapture(event.pointerId);
    }
  };
  const onPointerUp = (event: React.PointerEvent) => {
    const state = drag.current;
    drag.current = null;
    setDragging(false);
    if (!state?.moved) return;
    suppressClick.current = true;
    const dx = event.clientX - state.x;
    if (Math.abs(dx) >= SWIPE_PX) go(dx < 0 ? 1 : -1);
  };
  // A drag ends with a click on whatever is under the pointer; swallow it.
  const onClickCapture = (event: React.MouseEvent) => {
    if (!suppressClick.current) return;
    suppressClick.current = false;
    event.preventDefault();
    event.stopPropagation();
  };

  const data = slides[index] ?? slides[0];
  const accent = counterColor;
  const affiliation = [data.role, data.company].filter(Boolean).join(", ");
  const running = many && inView && !dragging;

  const timer = (className: string) =>
    timerColor ? (
      <VoiceTimer
        key={`${index}-${turn}`}
        color={timerColor}
        running={running}
        loop={!many}
        onDone={() => go(1)}
        className={className}
      />
    ) : null;

  return (
    // Figma Services mobile: an 8px gutter, the counter at x 34, a 245 × 253
    // portrait at x 79 and a 57px logo tile on the right edge, the quote
    // indented under the portrait. On narrower phones the portrait gives way
    // so it always clears the logo tile by 8px.
    <section
      ref={sectionRef}
      aria-roledescription="carousel"
      className={`px-2 lg:px-[clamp(1.25rem,calc(1.98*var(--vw)),1.875rem)] lg:pb-[clamp(2.875rem,calc(5.56*var(--vw)),5.25rem)] ${timerColor ? "pb-[84px]" : "pb-[11px]"}`}
    >
      {divider ? (
        <div data-line className="h-px bg-[var(--hll-mid-grey)]" />
      ) : null}

      <div
        className={`${divider ? "pt-[87px] lg:pt-[clamp(2.875rem,calc(5.56*var(--vw)),5.25rem)]" : ""} ${headingInset ? "px-3 lg:px-0" : ""}`}
      >
        {heading}
      </div>

      {/* Figma: counter + arrows | 300×400 portrait | 115px logo tile, with the
          quote starting at 60% of the frame. */}
      <div
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onClickCapture={onClickCapture}
        className={`mt-6 grid gap-4 lg:mt-[clamp(2.875rem,calc(5.56*var(--vw)),5.25rem)] lg:grid-cols-[878fr_574fr] lg:gap-0 ${many ? "touch-pan-y select-none" : ""} ${dragging ? "cursor-grabbing" : ""}`}
      >
        {/* Mobile: counter from x 26, portrait from x 71 (67 wide), logo on
            the right edge; the row is as tall as the portrait, which gives
            way on narrow phones to keep 8px clear of the logo. */}
        <div className="flex items-start lg:gap-[10px]">
          <div className="ml-[26px] mt-1 w-[30px] shrink-0 lg:ml-0 lg:mt-0 lg:w-9" data-service-label>
            <p
              className="text-[10px] leading-[12px] lg:text-[12px] lg:leading-none"
              style={{ color: accent }}
              aria-live="polite"
            >
              {String(index + 1).padStart(2, "0")}/{String(count).padStart(2, "0")}
            </p>
            <p className="flex justify-between text-[10px] leading-[12px] text-[var(--hll-dark-grey)] lg:mt-1 lg:text-[12px] lg:leading-none">
              <ArrowButton label="Previous testimonial" disabled={!many} onClick={() => go(-1)}>
                &lt;
              </ArrowButton>
              <ArrowButton label="Next testimonial" disabled={!many} onClick={() => go(1)}>
                &gt;
              </ArrowButton>
            </p>
          </div>
          <div
            className={`mr-2 min-w-0 flex-1 lg:ml-0 lg:mr-0 lg:w-[clamp(10rem,calc(19.8*var(--vw)),18.75rem)] lg:max-w-none lg:flex-none lg:shrink-0 ${wide ? "ml-[11px] max-w-[253px]" : "ml-[15px] max-w-[245px]"}`}
          >
            <div key={index} className="[animation:page-intro-in_500ms_cubic-bezier(0.22,1,0.36,1)_both]">
              {data.portrait ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={data.portrait}
                  alt={data.name ?? data.role}
                  draggable={false}
                  className={`w-full rounded-[6px] object-cover lg:aspect-[3/4] lg:rounded-[4px] ${wide ? "aspect-square" : "aspect-[245/253]"}`}
                />
              ) : (
                <MediaPlaceholder
                  className={`w-full rounded-[6px] lg:aspect-[3/4] lg:rounded-[4px] ${wide ? "aspect-square" : "aspect-[245/253]"}`}
                  label="Expert portrait"
                />
              )}
            </div>
            {timer("mt-2 hidden lg:block")}
          </div>
          {data.company ? (
            <div className="ml-auto grid aspect-square w-[57px] shrink-0 place-items-center rounded-[6px] bg-[#24477F] p-1 text-center text-[9px] text-white lg:ml-0 lg:w-[clamp(4.5rem,calc(7.6*var(--vw)),7.2rem)] lg:rounded-[4px] lg:p-2 lg:text-[11px]">
              {data.companyLogo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={data.companyLogo}
                  alt={data.company}
                  draggable={false}
                  className="w-[92%] object-contain"
                />
              ) : (
                data.company
              )}
            </div>
          ) : null}
        </div>

        <blockquote
          key={index}
          className="ml-[67px] flex max-w-[311px] flex-col justify-between gap-4 [animation:page-intro-in_500ms_80ms_cubic-bezier(0.22,1,0.36,1)_both] lg:ml-0 lg:max-w-none lg:gap-10 lg:pr-[20px]"
        >
          <p className="text-[24px] font-normal leading-[27.8px] text-[var(--hll-dark-grey)] lg:text-[clamp(1.5rem,calc(2.38*var(--vw)),2.25rem)] lg:leading-[1.17]">
            &ldquo;{data.quote}&rdquo;
          </p>
          <footer className="text-[14px] leading-[1.25] lg:pb-[9px] lg:text-[clamp(1rem,calc(1.32*var(--vw)),1.25rem)]">
            {data.name ? (
              <cite className="block not-italic text-black">{data.name}</cite>
            ) : null}
            <span className="block text-[var(--hll-mid-grey)]">
              {affiliation}
            </span>
          </footer>
        </blockquote>
        {/* Figma Industry mobile: the timer sits 54px under the name. */}
        {timer("ml-[67px] mt-[38px] lg:hidden")}
      </div>
    </section>
  );
}

function ArrowButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      // A bigger hit area than the 6px glyph, without moving it.
      className="-m-2 p-2 leading-[inherit] transition-opacity hover:opacity-60 focus-visible:outline focus-visible:outline-1 focus-visible:outline-[var(--hll-mid-grey)] disabled:cursor-default disabled:hover:opacity-100"
    >
      {children}
    </button>
  );
}

/** Figma: "carousel with timer delay" — a 103 × 2 track filling in the page
 *  colour until the next testimonial. With one slide it just loops. */
function VoiceTimer({
  color,
  running,
  loop,
  onDone,
  className,
}: {
  color: string;
  running: boolean;
  loop: boolean;
  onDone: () => void;
  className: string;
}) {
  return (
    <div className={`h-[2px] w-[103px] overflow-hidden rounded bg-black/20 ${className}`}>
      <div
        className="h-full"
        onAnimationEnd={loop ? undefined : onDone}
        style={{
          background: color,
          animation: `voice-timer ${SLIDE_MS}ms linear ${loop ? "infinite" : "1 both"}`,
          animationPlayState: running || loop ? "running" : "paused",
        }}
      />
    </div>
  );
}
