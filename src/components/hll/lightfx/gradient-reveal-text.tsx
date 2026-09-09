"use client";

// gradient-reveal-text.tsx — the two heading reveal animations, ported from
// HLL-UI-Demo's GradientRevealTextSlow.jsx and GradientRevealTextNormal.jsx.
//
// Both are pure CSS, no WebGL: the text fades in from a blur while a gradient
// sweeps across it via background-clip, with a soft edge glow. They differ in
// timing and in what sweeps:
//
//   slow   (1200ms) — the variant's own stops resampled into even bands
//   normal  (600ms) — white -> the variant's lead color -> ink
//
// Each instance scopes its keyframes behind a useId-derived class, so several
// headings can animate independently on the same page.
import { useEffect, useId, useState, type CSSProperties } from "react";

import { cn } from "@/lib/utils";

import { getVariantColors, type HLLVariant } from "../variants";

function hexToRgba(hex: string, alpha: number) {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// Resamples a variant's stops into evenly-spaced bands across the sweep,
// generalizing the original hand-tuned four-color "leak" gradient to any
// variant's stop count.
function buildBandGradient(colors: string[]) {
  const start = 20;
  const end = 98;
  const step = (end - start) / colors.length;
  const stops = ["transparent 0%"];
  colors.forEach((color, i) => {
    const from = start + i * step;
    const to = start + (i + 1) * step;
    stops.push(`${color} ${from}%`, `${color} ${to}%`);
  });
  stops.push("transparent 100%");
  return stops.join(", ");
}

function buildGlowShadow(colors: string[], alphas: number[]) {
  return colors
    .map((color, i) => `0 0 ${[2, 10, 22][i] ?? 22}px ${hexToRgba(color, alphas[i] ?? 0.18)}`)
    .join(", ");
}

const EASE = "cubic-bezier(0.445, 0.05, 0.55, 0.95)";

export type GradientRevealTextProps = {
  text: string;
  variant?: HLLVariant;
  colors?: string[];
  /** "slow" is the 1200ms band sweep; "normal" the 600ms light-to-dark sweep. */
  speed?: "slow" | "normal";
  autoPlay?: boolean;
  /** Change this to replay the animation with the same text. */
  replayKey?: unknown;
  fontSize?: string;
  letterSpacing?: string;
  ink?: string;
  duration?: number;
  glow?: boolean;
  /** "normal" only: the sweep's leading color before it reaches the variant's. */
  lead?: string;
  sweepBlur?: number;
  as?: "span" | "h1" | "h2" | "h3";
  className?: string;
  style?: CSSProperties;
};

export function GradientRevealText({
  text,
  variant = "hll-ai",
  colors,
  speed = "slow",
  autoPlay = true,
  replayKey,
  fontSize = "clamp(2rem, 5vw, 3.5rem)",
  letterSpacing = "0.010em",
  ink = "#1a1a1a",
  duration,
  glow = true,
  lead = "#ffffff",
  sweepBlur,
  as: Tag = "span",
  className,
  style,
}: GradientRevealTextProps) {
  const rawId = useId().replace(/[^a-zA-Z0-9]/g, "");
  const [running, setRunning] = useState(false);
  const palette = colors && colors.length >= 2 ? colors : getVariantColors(variant);

  const isSlow = speed === "slow";
  const ms = duration ?? (isSlow ? 1200 : 600);
  const blur = sweepBlur ?? (isSlow ? 6.4 : 6);

  useEffect(() => {
    if (!autoPlay) return undefined;
    setRunning(false);
    // Two frames: the first commits the reset, the second starts the run, so
    // restarting on a replayKey change actually re-triggers the animation.
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => setRunning(true));
    });
    return () => cancelAnimationFrame(raf);
  }, [text, replayKey, autoPlay]);

  const mid = palette[0];
  const sweepGradient = isSlow
    ? `linear-gradient(115deg, ${buildBandGradient(palette)})`
    : `linear-gradient(115deg, transparent 0%, ${lead} 20%, ${mid} 50%, ${ink} 80%, transparent 100%)`;

  const glowPeak = isSlow
    ? buildGlowShadow(palette, [0.45, 0.35, 0.18])
    : `0 0 2px ${hexToRgba(lead, 0.45)}, 0 0 10px ${hexToRgba(mid, 0.35)}, 0 0 22px ${hexToRgba(ink, 0.15)}`;
  const glowNone = isSlow
    ? palette.map(() => "0 0 0 rgba(0,0,0,0)").join(", ")
    : "0 0 0 rgba(0,0,0,0), 0 0 0 rgba(0,0,0,0), 0 0 0 rgba(0,0,0,0)";

  // The normal speed animates the sweep's own blur as a second keyframe track;
  // the slow one holds it constant.
  const sweepAnimation = isSlow
    ? `gtrSweep-${rawId} ${ms}ms ${EASE} forwards`
    : `gtrSweep-${rawId} ${ms}ms ${EASE} forwards, gtrSweepBlur-${rawId} ${ms}ms ${EASE} forwards`;

  return (
    <>
      <style>{`
        .gtr-${rawId} {
          position: relative;
          display: inline-block;
          font-weight: 300;
          font-size: ${fontSize};
          letter-spacing: ${letterSpacing};
          line-height: 1.2;
          color: transparent;
          opacity: 0;
        }
        .gtr-${rawId}.is-running { opacity: 1; }
        ${glow ? `.gtr-${rawId}.is-running { animation: gtrGlow-${rawId} ${ms}ms ${EASE} forwards; }` : ""}
        .gtr-${rawId} .gtr-inner {
          display: inline-block;
          color: ${ink};
          opacity: 0;
          filter: blur(2px);
        }
        .gtr-${rawId}.is-running .gtr-inner {
          animation: gtrLetter-${rawId} ${ms}ms ${EASE} forwards,
                     gtrTextBlur-${rawId} ${ms}ms ${EASE} forwards;
        }
        .gtr-${rawId}::before {
          content: attr(data-text);
          position: absolute;
          inset: 0;
          pointer-events: none;
          color: transparent;
          background-image: ${sweepGradient};
          background-size: 420% 100%;
          background-position: 200% 50%;
          -webkit-background-clip: text;
          background-clip: text;
          opacity: 0;
          filter: blur(${isSlow ? blur : 0.4}px);
        }
        .gtr-${rawId}.is-running::before { animation: ${sweepAnimation}; }
        @keyframes gtrLetter-${rawId} {
          0% { opacity: 0; color: ${ink}; }
          50% { opacity: 0; color: ${ink}; }
          100% { opacity: 1; color: ${ink}; }
        }
        @keyframes gtrTextBlur-${rawId} {
          0% { filter: blur(2px); }
          40% { filter: blur(1.6px); }
          65% { filter: blur(0.9px); }
          85% { filter: blur(0.3px); }
          100% { filter: blur(0); }
        }
        @keyframes gtrSweep-${rawId} {
          0% { opacity: 0; background-position: 200% 50%; }
          10% { opacity: 0.7; background-position: 165% 50%; }
          30% { opacity: 0.85; background-position: 100% 50%; }
          50% { opacity: 0.75; background-position: 40% 50%; }
          75% { opacity: 0.35; background-position: -30% 50%; }
          100% { opacity: 0; background-position: -90% 50%; }
        }
        @keyframes gtrSweepBlur-${rawId} {
          0% { filter: blur(0.4px); }
          15% { filter: blur(2px); }
          40% { filter: blur(${blur}px); }
          55% { filter: blur(${blur}px); }
          75% { filter: blur(3px); }
          100% { filter: blur(0.4px); }
        }
        @keyframes gtrGlow-${rawId} {
          0% { text-shadow: ${glowNone}; }
          30% { text-shadow: ${glowPeak}; }
          60% { text-shadow: ${glowPeak}; }
          100% { text-shadow: ${glowNone}; }
        }
        @media (prefers-reduced-motion: reduce) {
          .gtr-${rawId}, .gtr-${rawId} .gtr-inner, .gtr-${rawId}::before { animation: none !important; }
          .gtr-${rawId} { opacity: 1; }
          .gtr-${rawId} .gtr-inner { opacity: 1; filter: none; color: ${ink}; }
        }
      `}</style>
      <Tag className={cn("gradient-reveal-text", className)} style={style}>
        <span className={`gtr-${rawId}${running ? " is-running" : ""}`} data-text={text}>
          <span className="gtr-inner">{text}</span>
        </span>
      </Tag>
    </>
  );
}

export function GradientRevealTextSlow(props: Omit<GradientRevealTextProps, "speed">) {
  return <GradientRevealText {...props} speed="slow" />;
}

export function GradientRevealTextNormal(props: Omit<GradientRevealTextProps, "speed">) {
  return <GradientRevealText {...props} speed="normal" />;
}
