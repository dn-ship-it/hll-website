import type { CSSProperties } from "react";

type GridOptions = {
  min?: string;
  max?: string;
  gap?: string;
};

/** Fluid auto-fit grid — column count grows/shrinks with viewport width. */
export function fluidGridStyle({
  min = "16rem",
  max = "1fr",
  gap = "clamp(0.75rem, 2vw, 1.25rem)",
}: GridOptions = {}): CSSProperties {
  return {
    display: "grid",
    gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, ${min}), ${max}))`,
    gap,
  };
}

/** Dense card grid for service tiles — slightly wider minimum on large screens. */
export function serviceGridStyle(): CSSProperties {
  return fluidGridStyle({
    min: "clamp(16rem, 28vw, 22rem)",
    gap: "clamp(0.75rem, 1.5vw, 1.25rem)",
  });
}

/** Stat / proof strip — 1 col mobile, auto-fit from ~12rem. */
export function statGridStyle(): CSSProperties {
  return fluidGridStyle({
    min: "clamp(12rem, 30vw, 16rem)",
    gap: "clamp(1rem, 2.5vw, 1.5rem)",
  });
}

/** Two-column editorial layout that stacks on narrow viewports. */
export function splitGridStyle(): CSSProperties {
  return {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 22rem), 1fr))",
    gap: "clamp(1.5rem, 4vw, 3rem)",
    alignItems: "end",
  };
}

export function sectionPaddingStyle(): CSSProperties {
  return {
    paddingInline: "clamp(1.25rem, 4vw, 2.5rem)",
    paddingBlock: "clamp(3rem, 8vw, 5rem)",
  };
}
