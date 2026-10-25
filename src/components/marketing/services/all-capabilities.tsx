"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowUpRight } from "lucide-react";

import { GradientRevealTextSlow } from "@/components/hll";

export type CapabilityService = {
  id: string;
  /** Tile colours and glyph (e.g. "hll-ai"); defaults to the id. */
  tile?: string;
  name: string;
  /** No page yet (Cloud): shown, not linked. */
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

// The desktop wheel in the Figma frame, relative to its top (y 124): the
// focused tile (134px) centred at y 353 with its right edge at x 772,
// neighbours (80px) 122px from it and 95px from each other. Names sit 26px
// into their tile (30px for the focused one).
const STAGE = { w: 1512, h: 705 };
const CENTER_Y = 353;
const TILE_RIGHT = 772;
const TILE_MIN = 80;
const TILE_MAX = 134;
// The focused name's top (316) and its height in the frame; with one row of
// tags under it the block sits about centred on the tile.
const FOCUS_TOP = 316;
const NAME_H = CENTER_Y - FOCUS_TOP;
/** How far (stage units) to raise the focused name, tags and open button so
    a block `h` tall sits centred on the tile, whatever the rows of tags. */
const liftFor = (h: number) => h / 2 - NAME_H;

// The phone wheel, in px: 64px tiles, the focused one 84px, from the 20px
// gutter with names 14px right of the widest tile. The focused row's
// sub-services and open button wrap under it, so the row below sits as far
// off as they need (see `below`).
const PHONE = {
  gutter: 20,
  tileMin: 64,
  tileMax: 84,
  nameLeft: 20 + 84 + 14,
  /** The focus's centre, down the wheel area. */
  center: "42%",
};

type Wheel = "desktop" | "phone";
const SPACING: Record<Wheel, { above: number; below: number; pitch: number }> = {
  desktop: { above: 122, below: 122, pitch: 95 },
  phone: { above: 88, below: 88, pitch: 76 },
};
/** Phone: the row below the focus clears its sub-services block (12px under
    the tile, 14px over the next) when there is one. */
const phoneBelow = (block: number) =>
  block ? PHONE.tileMax / 2 + 12 + block + 14 + PHONE.tileMin / 2 : SPACING.phone.above;

/** Rows shown each side of the focused one; the next one out fades in. */
const REACH = 3;
const hidden = (d: number) => Math.abs(d) >= REACH + 1;
/** Copies of the list on the wheel, so a service leaving one end is never
    the same element arriving at the other. */
const COPIES = 2;
const pct = (v: number, of: number) => `${(v / of) * 100}%`;
const wrap = (v: number, m: number) => ((v % m) + m) % m;
const signedWrap = (v: number, m: number) => wrap(v + m / 2, m) - m / 2;
/** Offset of a row `d` places from the focus: stage units on desktop, px on
    phones. */
const offsetFor = (wheel: Wheel, d: number, below = SPACING[wheel].below) => {
  const { above, pitch } = SPACING[wheel];
  const a = Math.abs(d);
  return (
    Math.sign(d) *
    (Math.min(a, 1) * (d < 0 ? above : below) + Math.max(a - 1, 0) * pitch)
  );
};
/** The CSS variables that place a row `d` places from the focus. */
const rowVars = (wheel: Wheel, d: number, below?: number) => {
  const a = Math.max(0, 1 - Math.abs(d));
  return {
    "--y": offsetFor(wheel, d, below).toFixed(2),
    "--a": a.toFixed(4),
    "--o": Math.min(1, Math.max(0, REACH + 1 - Math.abs(d))).toFixed(3),
  };
};
const rowStyle = (wheel: Wheel, d: number, below?: number) =>
  ({
    ...rowVars(wheel, d, below),
    visibility: hidden(d) ? "hidden" : undefined,
  }) as React.CSSProperties;

function OpenIcon({ className = "text-[var(--hll-dark-grey)]" }: { className?: string }) {
  return (
    <ArrowUpRight
      className={`size-3.5 transition-colors duration-300 ${className}`}
      strokeWidth={1.4}
      aria-hidden
    />
  );
}

/**
 * Figma "All Capabilities": the services as an endless wheel beside the
 * Capabilities title — the mouse wheel, a drag or swipe, or the arrow keys
 * turn it, and the service in focus grows with its sub-services beside it.
 * Phones get the same wheel, sized down, under the title.
 */
export function AllCapabilities({
  services,
  startIndex = 0,
}: {
  /** Wheel order, top to bottom. */
  services: CapabilityService[];
  startIndex?: number;
}) {
  const count = services.length;
  const slots = count * COPIES;
  const [active, setActive] = useState(startIndex);
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const spinRef = useRef<HTMLDivElement>(null);
  // Continuous wheel position (in rows) and where it is easing to.
  const pos = useRef(startIndex);
  const target = useRef(startIndex);
  const frame = useRef(0);
  // Phone: the gap under the focus, easing to fit its sub-services block.
  const pillsRef = useRef<HTMLDivElement>(null);
  const below = useRef(phoneBelow(0));
  const belowTarget = useRef(phoneBelow(0));
  // Desktop: the lift that centres the focused block on its tile, easing
  // between services as their tags take one row or two.
  const tagsRef = useRef<HTMLDivElement>(null);
  const lift = useRef(0);
  const liftTarget = useRef(0);

  const render = useCallback(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ease = reduce ? 1 : 0.14;
    pos.current += (target.current - pos.current) * ease;
    if (Math.abs(target.current - pos.current) < 0.0005) pos.current = target.current;
    below.current += (belowTarget.current - below.current) * ease;
    if (Math.abs(belowTarget.current - below.current) < 0.05) below.current = belowTarget.current;
    lift.current += (liftTarget.current - lift.current) * ease;
    if (Math.abs(liftTarget.current - lift.current) < 0.05) lift.current = liftTarget.current;
    rootRef.current
      ?.querySelectorAll<HTMLElement>("[data-slot]")
      .forEach((row) => {
        const slot = Number(row.dataset.slot);
        const d = signedWrap(slot - pos.current, slots);
        for (const [name, value] of Object.entries(
          rowVars(row.dataset.wheel as Wheel, d, row.dataset.wheel === "phone" ? below.current : undefined),
        )) {
          row.style.setProperty(name, value);
        }
        row.style.visibility = hidden(d) ? "hidden" : "";
        row.setAttribute("aria-hidden", String(slot >= count || Math.abs(d) > REACH));
      });
    // The focused service's details (tags, open button) travel with its
    // name: gone by the halfway point where the focus changes (QA C-06,
    // C-07) and fully in by 0.3 of a row from it. QA C-08: they used to wait
    // for the wheel's long ease-out to finish (~0.5s), so they showed late.
    const offset = Math.round(pos.current) - pos.current;
    const root = rootRef.current;
    if (root) {
      root.style.setProperty("--settle", Math.min(1, Math.max(0, (0.5 - Math.abs(offset)) / 0.2)).toFixed(3));
      root.style.setProperty("--fy-desktop", offsetFor("desktop", offset).toFixed(2));
      root.style.setProperty("--fy-phone", offsetFor("phone", offset, below.current).toFixed(2));
      root.style.setProperty("--lift", lift.current.toFixed(2));
    }
    const next = wrap(Math.round(pos.current), count);
    setActive((current) => (current === next ? current : next));
    frame.current =
      pos.current === target.current &&
      below.current === belowTarget.current &&
      lift.current === liftTarget.current
        ? 0
        : requestAnimationFrame(render);
  }, [count, slots]);

  const spin = useCallback(
    (to: number) => {
      target.current = to;
      if (!frame.current) frame.current = requestAnimationFrame(render);
    },
    [render],
  );

  // Bring a slot to the focus the short way round.
  // QA C-09: a click on the capability already in focus (tile, name or
  // tags) opens its page; on any other row it turns the wheel to it.
  const router = useRouter();
  const goTo = (slot: number) => {
    const step = signedWrap(slot - target.current, slots);
    const href = services[slot % count].href;
    if (Math.abs(step) < 0.5 && href) {
      router.push(href);
      return;
    }
    spin(target.current + step);
  };

  // Clear the handle too, or a remount (Strict Mode) never turns again.
  useEffect(
    () => () => {
      cancelAnimationFrame(frame.current);
      frame.current = 0;
    },
    [],
  );

  // Fit the phone gap under the focus to its sub-services block.
  // The first fit lands before paint, so the wheel doesn't shift on load.
  // Desktop: centre the focused name and tags on the tile (in stage units, so
  // it holds as the stage scales; re-fitted when the tags rewrap).
  const focusId = services[active].id;
  const hasTags = services[active].subServices.length > 0;
  const fitted = useRef(false);
  useLayoutEffect(() => {
    const fit = () => {
      belowTarget.current = phoneBelow(pillsRef.current?.offsetHeight ?? 0);
      const stage = stageRef.current?.offsetHeight ?? 0;
      const tags = tagsRef.current?.offsetHeight ?? 0;
      // No tags: the name alone. Phones: the desktop stage is hidden.
      liftTarget.current = !stage ? 0 : liftFor(hasTags ? (tags * STAGE.h) / stage : NAME_H);
      if (!fitted.current) {
        fitted.current = true;
        below.current = belowTarget.current;
        lift.current = liftTarget.current;
        render();
      } else if (!frame.current) {
        frame.current = requestAnimationFrame(render);
      }
    };
    fit();
    const observer = new ResizeObserver(fit);
    if (stageRef.current) observer.observe(stageRef.current);
    if (tagsRef.current) observer.observe(tagsRef.current);
    return () => observer.disconnect();
  }, [focusId, hasTags, render]);

  // The mouse wheel over the wheel column turns it; elsewhere it scrolls the
  // page, so the footer stays in reach. Turns snap once the wheel goes quiet.
  useEffect(() => {
    const stage = stageRef.current;
    const area = spinRef.current;
    if (!stage || !area) return;
    let snap = 0;
    const onWheel = (event: WheelEvent) => {
      if (event.clientX < area.getBoundingClientRect().left) return;
      event.preventDefault();
      const dy = event.deltaMode === 1 ? event.deltaY * 33 : event.deltaY;
      spin(target.current + Math.max(-1, Math.min(1, dy / 100)));
      window.clearTimeout(snap);
      snap = window.setTimeout(() => spin(Math.round(target.current)), 130);
    };
    stage.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      stage.removeEventListener("wheel", onWheel);
      window.clearTimeout(snap);
    };
  }, [spin]);

  // Drag (or swipe) the wheel up or down, with a little momentum on release.
  const drag = useRef<{
    y: number;
    from: number;
    pitch: number;
    last: number;
    time: number;
    velocity: number;
    moved: boolean;
  } | null>(null);
  const suppressClick = useRef(false);
  const startDrag = (event: React.PointerEvent, wheel: Wheel) => {
    suppressClick.current = false;
    if (event.button !== 0) return;
    // Desktop: only the wheel column, so the title side scrolls the page.
    const area = spinRef.current;
    if (wheel === "desktop" && (!area || event.clientX < area.getBoundingClientRect().left))
      return;
    drag.current = {
      y: event.clientY,
      from: target.current,
      pitch: SPACING[wheel].pitch,
      last: event.clientY,
      time: performance.now(),
      velocity: 0,
      moved: false,
    };
  };
  const onPointerMove = (event: React.PointerEvent) => {
    const state = drag.current;
    if (!state) return;
    // A mouse released outside before the drag began: drop it.
    if (event.pointerType === "mouse" && !(event.buttons & 1)) {
      drag.current = null;
      return;
    }
    const dy = event.clientY - state.y;
    if (!state.moved && Math.abs(dy) > 6) {
      state.moved = true;
      event.currentTarget.setPointerCapture(event.pointerId);
    }
    if (!state.moved) return;
    const now = performance.now();
    state.velocity = (event.clientY - state.last) / Math.max(1, now - state.time);
    state.last = event.clientY;
    state.time = now;
    spin(state.from - dy / state.pitch);
  };
  const onPointerUp = () => {
    const state = drag.current;
    drag.current = null;
    if (!state?.moved) return;
    suppressClick.current = true;
    spin(Math.round(target.current - state.velocity * 4));
  };
  // A drag ends with a click on whatever is under the pointer; swallow it.
  const onClickCapture = (event: React.MouseEvent) => {
    if (!suppressClick.current) return;
    suppressClick.current = false;
    event.preventDefault();
    event.stopPropagation();
  };
  const dragHandlers = (wheel: Wheel) => ({
    onPointerDown: (event: React.PointerEvent) => startDrag(event, wheel),
    onPointerMove,
    onPointerUp,
    onPointerCancel: onPointerUp,
    onClickCapture,
  });

  const onKeyDown = (event: React.KeyboardEvent) => {
    const step =
      event.key === "ArrowDown" || event.key === "PageDown"
        ? 1
        : event.key === "ArrowUp" || event.key === "PageUp"
          ? -1
          : 0;
    if (!step) return;
    event.preventDefault();
    spin(Math.round(target.current) + step);
  };

  const focus = services[active];
  const rows = Array.from({ length: slots }, (_, slot) => ({
    slot,
    service: services[slot % count],
    d: signedWrap(slot - pos.current, slots),
    primary: slot < count,
  }));
  const rowProps = (wheel: Wheel, slot: number, d: number, primary: boolean) => {
    const service = services[slot % count];
    return {
      "data-slot": slot,
      "data-wheel": wheel,
      id: primary ? `capability-${wheel}-${service.id}` : undefined,
      role: primary ? "option" : undefined,
      "aria-selected": primary ? service.id === focus.id : undefined,
      "aria-label": primary ? service.name : undefined,
      "aria-hidden": !primary || Math.abs(d) > REACH,
      style: rowStyle(wheel, d, wheel === "phone" ? below.current : undefined),
    };
  };
  // QA C-22: hovering the card in focus (tile, name, tags or arrow) lifts the
  // tile slightly, turns the arrow button black and darkens the tag outlines.
  // One state for all four, with a short grace on leave so moving between
  // them doesn't flicker. Desktop wheel only.
  const [hovered, setHovered] = useState(false);
  const leaveTimer = useRef(0);
  const hoverProps = {
    onPointerEnter: (event: React.PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      window.clearTimeout(leaveTimer.current);
      setHovered(true);
    },
    onPointerLeave: () => {
      window.clearTimeout(leaveTimer.current);
      leaveTimer.current = window.setTimeout(() => setHovered(false), 80);
    },
  };
  useEffect(() => {
    setHovered(false);
  }, [focus.id]);
  useEffect(() => () => window.clearTimeout(leaveTimer.current), []);

  const pills = (className: string) =>
    focus.subServices.slice(0, 4).map((sub) => (
      <span
        key={sub}
        className={`hll-label whitespace-nowrap uppercase leading-[1.2] text-[var(--hll-dark-grey)] transition-colors duration-300 ${hovered ? "border-[var(--hll-dark-grey)]" : "border-[var(--hll-mid-grey)]"} ${className}`}
        style={{ fontFamily: "var(--hll-font-functional)" }}
      >
        {sub}
      </span>
    ));

  return (
    <div ref={rootRef}>
      {/* Phones: the title, the wheel under it — a swipe there turns it —
          and a strip below that scrolls the page on to the footer. */}
      <section
        aria-label="Capabilities"
        className="flex h-[calc(calc(100*var(--svh))-var(--nav-h))] flex-col lg:hidden"
      >
        <div className="px-5 pt-8">
          <GradientRevealTextSlow
            as="h1"
            text="Capabilities"
            variant="services"
            className="block font-light text-[var(--hll-dark-grey)]"
            fontSize="30px"
            letterSpacing="0"
            lineHeight="1.16"
          />
        </div>
        <div
          role="listbox"
          tabIndex={0}
          aria-label="Capabilities, swipe or use the arrow keys to turn"
          aria-activedescendant={`capability-phone-${focus.id}`}
          onKeyDown={onKeyDown}
          {...dragHandlers("phone")}
          className="relative mt-4 min-h-0 flex-1 touch-none select-none overflow-hidden outline-none focus-visible:ring-1 focus-visible:ring-[var(--hll-mid-grey)] [mask-image:linear-gradient(transparent,#000_32px,#000_calc(100%-32px),transparent)]"
          style={{ "--center": PHONE.center } as React.CSSProperties}
        >
          {rows.map(({ slot, service, d, primary }) => (
            <div
              key={slot}
              {...rowProps("phone", slot, d, primary)}
              className="pointer-events-none absolute inset-0 [&_button]:pointer-events-auto"
            >
              <button
                type="button"
                tabIndex={-1}
                onClick={() => goTo(slot)}
                className="absolute"
                style={{
                  left: PHONE.gutter,
                  top: `calc(var(--center) + var(--y) * 1px - (${PHONE.tileMin}px + ${PHONE.tileMax - PHONE.tileMin}px * var(--a)) / 2)`,
                  width: `calc(${PHONE.tileMin}px + ${PHONE.tileMax - PHONE.tileMin}px * var(--a))`,
                  opacity: "var(--o)",
                }}
              >
                <Tile id={service.tile ?? service.id} className="aspect-square w-full" />
              </button>
              {/* QA C-24: the focused service's open button sits 10px after
                  its name, or under it when the name leaves no room. */}
              <div
                className="absolute flex flex-wrap items-center gap-x-[10px] gap-y-1"
                style={{
                  left: PHONE.nameLeft,
                  right: PHONE.gutter,
                  top: "calc(var(--center) + var(--y) * 1px - 11px - 22px * var(--a))",
                  opacity: "var(--o)",
                }}
              >
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => goTo(slot)}
                  className="whitespace-nowrap text-left font-medium leading-[1.16]"
                  style={{
                    fontSize: "calc(18px + 4px * var(--a))",
                    color:
                      "color-mix(in srgb, var(--hll-dark-grey) calc(var(--a) * 100%), var(--hll-mid-grey))",
                  }}
                >
                  {service.name}
                </button>
                {service.id === focus.id && focus.href ? (
                  <Link
                    href={focus.href}
                    aria-label={`Open ${focus.name}`}
                    className="pointer-events-auto grid size-[22px] shrink-0 place-items-center rounded-[3px] border-[0.8px] border-[var(--hll-dark-grey)] bg-[var(--hll-light-grey)]"
                    style={{ opacity: "var(--settle, 1)" }}
                  >
                    <OpenIcon />
                  </Link>
                ) : null}
              </div>
            </div>
          ))}

          {/* The focused service: its sub-services, wrapped under its row
              (its open button sits beside the name, QA C-24). */}
          <div
            key={focus.id}
            ref={pillsRef}
            onClick={(event) => {
              if (focus.href && !(event.target as Element).closest("a")) router.push(focus.href);
            }}
            className={`absolute flex flex-wrap items-center gap-[8px] ${focus.href ? "cursor-pointer" : ""}`}
            style={{
              left: PHONE.gutter,
              right: PHONE.gutter,
              top: `calc(var(--center) + ${PHONE.tileMax / 2 + 12}px + var(--fy-phone, 0) * 1px)`,
              opacity: "var(--settle, 1)",
            }}
          >
            {pills("rounded-[3px] border-[0.6px] px-[8px] py-[5px] text-[9px]")}
          </div>
        </div>
        <div aria-hidden className="h-16 shrink-0" />
      </section>

      <section aria-label="Capabilities" className="hidden lg:block">
        <div className="h-[calc(calc(100*var(--svh))-var(--nav-h))] overflow-hidden pt-[58px]">
          <div
            ref={stageRef}
            role="listbox"
            tabIndex={0}
            aria-label="Capabilities, use the arrow keys to turn"
            aria-activedescendant={`capability-desktop-${focus.id}`}
            onKeyDown={onKeyDown}
            {...dragHandlers("desktop")}
            className="relative mx-auto select-none rounded-lg outline-none focus-visible:ring-1 focus-visible:ring-[var(--hll-mid-grey)]"
            // Scales with the width like the other stages, but never taller
            // than the screen below the Nav Bar, so the whole wheel shows.
            style={{
              aspectRatio: `${STAGE.w} / ${STAGE.h}`,
              // The tags size with the stage (QA C-08).
              containerType: "inline-size",
              width: `min(100%, calc((calc(100*var(--svh)) - var(--nav-h) - 58px - 40px) * ${STAGE.w / STAGE.h}))`,
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

            {/* The wheel column: the mouse wheel and drags turn it here. */}
            <div
              ref={spinRef}
              aria-hidden
              className="absolute inset-y-0 right-0 cursor-grab active:cursor-grabbing"
              style={{ left: pct(600, STAGE.w) }}
            />

            {rows.map(({ slot, service, d, primary }) => (
              // Full-stage wrapper: the page-intro fade transforms each
              // child of this stage, which would otherwise make a zero-size
              // wrapper the items' containing block.
              <div
                key={slot}
                {...rowProps("desktop", slot, d, primary)}
                className="pointer-events-none absolute inset-0 [&_button]:pointer-events-auto"
              >
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => goTo(slot)}
                  {...(service.id === focus.id ? hoverProps : {})}
                  className="absolute"
                  style={{
                    left: `calc((${TILE_RIGHT} - ${TILE_MIN} - ${TILE_MAX - TILE_MIN} * var(--a)) / ${STAGE.w} * 100%)`,
                    top: `calc((${CENTER_Y} + var(--y) - (${TILE_MIN} + ${TILE_MAX - TILE_MIN} * var(--a)) / 2) / ${STAGE.h} * 100%)`,
                    width: `calc((${TILE_MIN} + ${TILE_MAX - TILE_MIN} * var(--a)) / ${STAGE.w} * 100%)`,
                    opacity: "var(--o)",
                  }}
                >
                  <span
                    className="block rounded-[inherit] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={
                      hovered && service.id === focus.id
                        ? { transform: "translateY(-0.4cqw)", boxShadow: "0 1cqw 2cqw rgba(0,0,0,0.12)" }
                        : undefined
                    }
                  >
                    <Tile id={service.tile ?? service.id} className="aspect-square w-full" />
                  </span>
                </button>
                <div
                  className="absolute"
                  style={{
                    left: pct(815, STAGE.w),
                    top: `calc((${CENTER_Y} + var(--y) - 14 - (23 + var(--lift, 0)) * var(--a)) / ${STAGE.h} * 100%)`,
                    opacity: "var(--o)",
                  }}
                >
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => goTo(slot)}
                    {...(service.id === focus.id ? hoverProps : {})}
                    className="cursor-pointer whitespace-nowrap text-left font-medium leading-[1.16] hover:!text-[var(--hll-dark-grey)]"
                    style={{
                      fontSize:
                        "calc(clamp(1.25rem, calc(1.72*var(--vw)), 1.625rem) * (1 - var(--a)) + clamp(1.5rem, calc(2.15*var(--vw)), 2.03rem) * var(--a))",
                      color:
                        "color-mix(in srgb, var(--hll-dark-grey) calc(var(--a) * 100%), var(--hll-mid-grey))",
                    }}
                  >
                    {service.name}
                  </button>
                </div>
              </div>
            ))}

            {/* The focused service: its sub-services as outlined pills and the
                open tile to its page. A full-stage wrapper like the rows':
                the stage's intro fade would otherwise hold their opacity. */}
            <div className="pointer-events-none absolute inset-0 [&_a]:pointer-events-auto">
              <div
                key={focus.id}
                ref={tagsRef}
                onClick={() => focus.href && router.push(focus.href)}
                {...hoverProps}
                // QA C-08: the tags wrap within their design width and scale
                // with the stage (10.7px at 1512, never under 9px), rather
                // than running past the open button and off narrow screens.
                // Hannan's review: the whole focused service opens its page –
                // the block starts at the name (316) and runs to the open
                // button's right edge, the tags 49 units under its top.
                className={`absolute flex flex-wrap content-start items-center gap-[max(8px,0.66cqw)] ${focus.href ? "pointer-events-auto cursor-pointer" : ""}`}
                style={{
                  left: pct(815, STAGE.w),
                  top: `calc((${FOCUS_TOP} + var(--fy-desktop, 0) - var(--lift, 0)) / ${STAGE.h} * 100%)`,
                  width: pct(447, STAGE.w),
                  paddingTop: `${(49 / STAGE.w) * 100}cqw`,
                  opacity: "var(--settle, 1)",
                }}
              >
                {pills("rounded-[max(3px,0.25cqw)] border-[0.64px] px-[max(8px,0.6cqw)] py-[max(5px,0.4cqw)] text-[max(9px,0.71cqw)]")}
              </div>
              {focus.href ? (
                <Link
                  href={focus.href}
                  aria-label={`Open ${focus.name}`}
                  {...hoverProps}
                  className={`absolute grid size-[33px] place-items-center rounded-[3.6px] border-[0.9px] border-[var(--hll-dark-grey)] transition-colors duration-300 ${hovered ? "bg-[var(--hll-dark-grey)]" : "bg-[var(--hll-light-grey)]"}`}
                  style={{
                    left: pct(1229, STAGE.w),
                    top: `calc((${FOCUS_TOP} + var(--fy-desktop, 0) - var(--lift, 0)) / ${STAGE.h} * 100%)`,
                    opacity: "var(--settle, 1)",
                  }}
                >
                  <OpenIcon className={hovered ? "text-white" : "text-[var(--hll-dark-grey)]"} />
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
