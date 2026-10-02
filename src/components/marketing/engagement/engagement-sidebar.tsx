"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowUpRight, Clock, Factory, MapPin, MonitorCog } from "lucide-react";

import { GradientRevealTextNormal } from "@/components/hll";
import { CountUp } from "@/components/marketing/count-up";
import {
  SERVICE_LABELS,
  type Engagement,
  type EngagementStat,
} from "@/data/engagements";

import { FUNCTIONAL_STYLE, withAlpha } from "./engagement-card";

const META =
  "hll-label text-[10px] uppercase leading-[1.2] text-[var(--hll-dark-grey)] lg:text-[12px]";
const AXIS = "#8B8A8A";

function MetaRow({
  icon: Icon,
  children,
}: {
  icon: typeof Clock;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-[7px]">
      <Icon
        className="mt-px size-[14px] shrink-0 text-[var(--hll-dark-grey)]"
        strokeWidth={1.2}
        aria-hidden
      />
      <span className={META} style={FUNCTIONAL_STYLE}>
        {children}
      </span>
    </li>
  );
}

/**
 * Figma stat card (344 × 382): label and value, then a four-bar chart on a
 * 30K–90K scale with each bar's value above it, then a short note. The value
 * counts up and the bars rise once the card shows.
 */
function StatCard({ stat, shown }: { stat: EngagementStat; shown: boolean }) {
  const bars = stat.chart.slice(0, 6);
  const max = Math.max(90, ...bars.map((b) => b.value));
  // Chart box in card px (Figma): gridlines 150–236, bars from x 29, 67px apart.
  const scaleY = (v: number) => 236 - ((v - 30) / (max - 30)) * 86;
  const pitch = bars.length > 1 ? 204 / (bars.length - 1) : 0;
  const ticks = [90, 70, 50, 30].map((t) =>
    Math.round(30 + ((t - 30) / 60) * (max - 30)),
  );

  return (
    <div
      className="relative rounded-lg p-5 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
      style={{
        background:
          "radial-gradient(ellipse 72% 44% at 50% 100%, rgba(139,138,138,0.2), rgba(230,230,230,0.2)), #F5F5F5",
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : "translateY(16px)",
      }}
      aria-hidden={!shown}
    >
      <div className="flex items-start justify-between gap-3">
        <p
          className="text-[16px] uppercase leading-[1.2] text-[var(--hll-dark-grey)]"
          style={FUNCTIONAL_STYLE}
        >
          {stat.label}
        </p>
        {/* Figma's two-window mark in a 29 × 31 white tile. */}
        <span
          aria-hidden
          className="grid h-[31px] w-[29px] shrink-0 place-items-center rounded-[4px] bg-white"
        >
          <svg
            viewBox="0 0 11 12"
            className="h-3 w-[11px]"
            fill="#fff"
            stroke="#000"
            strokeWidth="1"
          >
            <rect x="0.5" y="4.5" width="6.6" height="7" rx="1.5" />
            <rect x="2.8" y="0.5" width="7.7" height="8.2" rx="1" />
          </svg>
        </span>
      </div>

      <p className="mt-[21px] flex items-baseline gap-[5px] font-light leading-[1.16] text-[var(--hll-dark-grey)]">
        <CountUp value={stat.value} start={shown} className="text-[48px]" />
        {stat.unit ? <span className="text-[18px]">{stat.unit}</span> : null}
      </p>

      <svg
        viewBox="0 136 344 116"
        className="mt-[10px] block w-full overflow-visible"
        aria-hidden
      >
        <defs>
          <linearGradient
            id="stat-bar"
            x1="29"
            x2="297"
            y1="0"
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#FA4288" />
            <stop offset="0.42" stopColor="#FB8E97" />
            <stop offset="0.63" stopColor="#FF836B" />
            <stop offset="0.86" stopColor="#FEE253" />
          </linearGradient>
          <linearGradient id="stat-bar-fade" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#fff" stopOpacity="1" />
            <stop offset="1" stopColor="#fff" stopOpacity="0.45" />
          </linearGradient>
          <mask id="stat-bar-mask">
            <rect
              x="0"
              y="136"
              width="344"
              height="116"
              fill="url(#stat-bar-fade)"
            />
          </mask>
          <filter id="stat-glow" x="-20%" y="-300%" width="140%" height="700%">
            <feGaussianBlur stdDeviation="2" />
          </filter>
        </defs>
        {[150, 178, 207, 236].map((y) => (
          <line
            key={y}
            x1="24"
            x2="295"
            y1={y}
            y2={y}
            stroke="#B1B1B1"
            strokeWidth="0.5"
          />
        ))}
        {ticks.map((t, i) => (
          <text
            key={t}
            x="303"
            y={[150, 178, 207, 236][i] + 3}
            fontSize="8"
            fill={AXIS}
            style={FUNCTIONAL_STYLE}
          >
            {t}K
          </text>
        ))}
        <g mask="url(#stat-bar-mask)">
          {bars.map((bar, i) => {
            const x = 29 + i * pitch;
            const top = scaleY(bar.value);
            return (
              <rect
                key={bar.label}
                x={x}
                y={shown ? top : 236}
                width="59"
                height={shown ? 236 - top : 0}
                fill="url(#stat-bar)"
                style={{
                  transition: `y 900ms ${120 * i}ms, height 900ms ${120 * i}ms`,
                  transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)",
                }}
              />
            );
          })}
        </g>
        {bars.map((bar, i) => {
          const x = 29 + i * pitch;
          const top = scaleY(bar.value);
          return (
            <g
              key={bar.label}
              style={{
                opacity: shown ? 1 : 0,
                transition: `opacity 500ms ${500 + 120 * i}ms`,
              }}
            >
              <line
                x1={x - 5}
                x2={x + 63}
                y1={top}
                y2={top}
                stroke="#FEE253"
                strokeWidth="3"
                filter="url(#stat-glow)"
                opacity="0.9"
              />
              <line
                x1={x - 5}
                x2={x + 63}
                y1={top}
                y2={top}
                stroke="#fff"
                strokeWidth="3"
              />
              <text
                x={x - 2}
                y={top - 8}
                fontSize="12"
                fontWeight="500"
                fill={AXIS}
                style={FUNCTIONAL_STYLE}
              >
                {bar.value}K
              </text>
              <text
                x={x}
                y={250}
                fontSize="8"
                fill={AXIS}
                style={FUNCTIONAL_STYLE}
              >
                {bar.label.toUpperCase()}
              </text>
            </g>
          );
        })}
      </svg>

      {stat.body ? (
        <p className="mt-[8px] px-[7px] text-[12px] leading-[1.25] text-[var(--hll-dark-grey)]">
          {stat.body}
        </p>
      ) : null}
    </div>
  );
}

/**
 * The left column of both templates: "this section remains sticky throughout
 * the entire page, the artifact only shows up when the supporting section
 * comes up". The strip behind it takes the client's colour.
 */
export function EngagementSidebar({
  engagement,
  accent,
  mobileHero,
}: {
  engagement: Engagement;
  accent: string | null;
  /** Figma mobile: the hero media sits between the name and the details. */
  mobileHero?: React.ReactNode;
}) {
  const [artifactShown, setArtifactShown] = useState(false);

  useEffect(() => {
    const triggers = document.querySelectorAll("[data-artifact-trigger]");
    if (!triggers.length) {
      setArtifactShown(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setArtifactShown(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -25% 0px" },
    );
    triggers.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  const strip = accent ?? "#444444";

  return (
    <aside className="relative [--eng-name-size:24px] lg:sticky lg:top-[var(--nav-h)] lg:h-[calc(calc(100*var(--vh))-var(--nav-h))] lg:[--eng-name-size:clamp(1.75rem,calc(2.38*var(--vw)),2.25rem)]">
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 hidden w-full lg:block lg:w-[97.4%]"
        style={{
          background: `linear-gradient(180deg, ${withAlpha(strip, 0.2)}, ${withAlpha(strip, 0.05)})`,
        }}
      />
      {/* Figma Case Study mobile: name 8px under the nav, the hero 32px
          below, then the details 32px below that. */}
      <div className="relative px-[clamp(1.25rem,calc(2.1*var(--vw)),2rem)] pt-2 lg:h-full lg:pt-[52px]">
        <GradientRevealTextNormal
          as="h1"
          text={engagement.client}
          variant="engagement"
          className="block max-w-[8ch] text-[var(--hll-dark-grey)]"
          fontWeight={500}
          fontSize="var(--eng-name-size)"
          letterSpacing="0"
          lineHeight="1.16"
        />
        {mobileHero ? <div className="-mx-3 mt-8 lg:hidden">{mobileHero}</div> : null}
        <ul data-fade-up className="mt-8 space-y-3 pl-[2px] lg:mt-9 lg:pl-0">
          {engagement.period ? (
            <MetaRow icon={Clock}>{engagement.period}</MetaRow>
          ) : null}
          {engagement.industry ? (
            <MetaRow icon={Factory}>{engagement.industry}</MetaRow>
          ) : null}
          {engagement.location ? (
            <MetaRow icon={MapPin}>{engagement.location}</MetaRow>
          ) : null}
          {engagement.services.length ? (
            <MetaRow icon={MonitorCog}>
              {engagement.services.map((s) => (
                <span key={s} className="block leading-[16px]">
                  {SERVICE_LABELS[s]}
                </span>
              ))}
            </MetaRow>
          ) : null}
        </ul>

        {engagement.stat ? (
          <div className="hidden lg:absolute lg:bottom-[10px] lg:left-4 lg:right-[6.5%] lg:block">
            <StatCard stat={engagement.stat} shown={artifactShown} />
          </div>
        ) : null}
      </div>
      {engagement.stat ? (
        <MobileArtifact stat={engagement.stat} available={artifactShown} />
      ) : null}
    </aside>
  );
}

/**
 * Figma Case Study mobile + Artifact Expanded View: the stat card folds into a
 * sticky "Operational Efficiency ↗" pill at the bottom left. "An artifact
 * shows up when the sticky button is pressed"; "clicking anywhere on screen
 * closes it or when it reaches a related section".
 */
function MobileArtifact({
  stat,
  available,
}: {
  stat: EngagementStat;
  available: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [atRelated, setAtRelated] = useState(false);
  // Rendered into <body>: the page intro transforms the sidebar, which would
  // otherwise trap this fixed pill under the content that follows it.
  const [host, setHost] = useState<HTMLElement | null>(null);
  useEffect(() => setHost(document.body), []);

  // Hidden from the related band on, through the footer below it. Read from
  // the scroll position so a jump (anchor, back to top) can't leave it stale.
  useEffect(() => {
    const band = document.querySelector("[data-related-band]");
    if (!band) return undefined;
    let frame = 0;
    const check = () => {
      frame = 0;
      const reached = band.getBoundingClientRect().top < window.innerHeight;
      setAtRelated(reached);
      if (reached) setOpen(false);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const close = () => setOpen(false);
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && close();
    // Next tick, so the tap that opened it doesn't close it again.
    const id = window.setTimeout(() => {
      window.addEventListener("pointerdown", close);
      window.addEventListener("keydown", onKey);
    });
    return () => {
      window.clearTimeout(id);
      window.removeEventListener("pointerdown", close);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const visible = available && !atRelated;

  if (!host) return null;
  return createPortal(
    <div
      className={`fixed bottom-[27px] left-5 z-40 transition-opacity duration-500 lg:hidden ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      // Taps on the pill or the card don't count as "anywhere on screen".
      onPointerDown={(event) => event.stopPropagation()}
    >
      <div
        className={`absolute bottom-[calc(100%+8px)] -left-[5px] w-[344px] max-w-[calc(100vw-30px)] ${open ? "" : "pointer-events-none"}`}
      >
        <StatCard stat={stat} shown={open} />
      </div>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="inline-flex h-7 items-center gap-2 rounded-[4px] bg-[var(--hll-light-grey)] pl-[7px] pr-2 text-[11px] uppercase leading-none text-[var(--hll-dark-grey)]"
        style={FUNCTIONAL_STYLE}
      >
        {stat.label}
        <ArrowUpRight className="size-[10px]" strokeWidth={1.5} aria-hidden />
      </button>
    </div>,
    host,
  );
}
