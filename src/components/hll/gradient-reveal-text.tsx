"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import { getVariantColors, gradientCss, type ServiceVariant } from "./variants";

type GradientRevealTextProps = {
  text: string;
  variant?: ServiceVariant;
  colors?: string[];
  autoPlay?: boolean;
  replayKey?: unknown;
  fontSize?: string;
  letterSpacing?: string;
  ink?: string;
  duration?: number;
  glow?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

export function GradientRevealText({
  text,
  variant = "hll-ai",
  colors,
  autoPlay = true,
  replayKey,
  fontSize = "clamp(2.5rem, 6vw, 4.25rem)",
  letterSpacing = "0.01em",
  ink = "#f5f5f5",
  duration = 1200,
  glow = true,
  className,
  style,
}: GradientRevealTextProps) {
  const [running, setRunning] = useState(false);
  const palette = getVariantColors(variant, colors);

  useEffect(() => {
    if (!autoPlay) return;
    setRunning(false);
    const id = requestAnimationFrame(() => setRunning(true));
    return () => cancelAnimationFrame(id);
  }, [autoPlay, replayKey, text]);

  return (
    <h1
      className={cn("gtr-text relative font-semibold leading-[1.05]", className)}
      data-text={text}
      style={{
        fontSize,
        letterSpacing,
        color: ink,
        textShadow: glow ? "0 0 24px rgba(255,255,255,0.08)" : undefined,
        ...style,
      }}
    >
      <span className={cn("relative z-10", running && "opacity-100")}>{text}</span>
      <span
        aria-hidden
        className={cn(
          "gtr-sweep pointer-events-none absolute inset-0 text-transparent",
          running && "is-running",
        )}
        style={{
          backgroundImage: gradientCss(palette, 90),
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          ["--gtr-duration" as string]: `${duration}ms`,
        }}
      >
        {text}
      </span>
    </h1>
  );
}

export function GradientRevealTextNormal(props: GradientRevealTextProps) {
  return <GradientRevealText {...props} duration={600} />;
}
