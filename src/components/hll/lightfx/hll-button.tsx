"use client";

// hll-button.tsx — the single, reusable HLL Button, ported from
// HLL-UI-Demo's HLLButton.jsx.
//
// One implementation for every page: a `variant` prop selects a predefined
// 2–3 color gradient (see light-variants.ts); everything else — shape, blur,
// glow, cursor-lens hover behavior, typography — comes from
// hll-button-definition.ts and is shared by every variant unchanged.
// `gradient`/`direction`/`radius`/`glow` exist as explicit one-off overrides,
// not a substitute for adding a real variant.
import Link from "next/link";
import { useRef, type CSSProperties, type ElementType, type ReactNode } from "react";

import type { HLLVariant } from "../variants";

import { BASE_DEFINITION } from "./hll-button-definition";
import { hllButtonVariants, resolveButtonColors, SIZE_SCALE, type LightSize } from "./light-variants";
import { cloneDefinition } from "./clone-definition";
import { useLightComponent } from "./use-light-component";

type Overrides = {
  gradient?: string[];
  direction?: number;
  radius?: number;
  glow?: number;
  animated?: boolean;
  size?: LightSize;
};

// The only per-variant work: swap the gradient's colors (and the glow color
// that follows them) into a clone of the shared base definition, then apply
// any explicit overrides. Every other field passes through untouched, so
// hover and cursor-lens behavior are identical across variants.
function buildDefinition(variant: HLLVariant, overrides: Overrides) {
  const definition = cloneDefinition(BASE_DEFINITION);
  const { colors, glowColor } = resolveButtonColors(variant, overrides.gradient);

  definition.params.base.colors = colors;
  definition.params.base.glowColor = glowColor;
  definition.params.hover.colors = colors;
  definition.params.hover.glowColor = glowColor;

  if (overrides.direction != null) {
    definition.params.base.gradientAngle = overrides.direction;
    definition.params.hover.gradientAngle = overrides.direction;
  }
  if (overrides.radius != null) {
    definition.shape.cornerRadius = overrides.radius;
  }
  if (overrides.glow != null) {
    // This preset's visible glow comes from the hover fill's own blur radius
    // (bloom/glowIntensity are 0 here), not a separate glow term.
    definition.params.hover.blur = overrides.glow;
  }
  if (overrides.animated === false) {
    definition.interaction.hover = false;
  }

  const scale = SIZE_SCALE[overrides.size ?? "md"] ?? 1;
  definition.box = {
    ...definition.box,
    width: Math.round(definition.box.width * scale),
    height: Math.round(definition.box.height * scale),
  };

  return definition;
}

export type HLLButtonProps = {
  variant?: HLLVariant;
  gradient?: string[];
  direction?: number;
  radius?: number;
  glow?: number;
  animated?: boolean;
  size?: LightSize;
  /** Renders a Next.js Link instead of a button. */
  href?: string;
  as?: ElementType;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

export function HLLButton({
  variant = "services",
  gradient,
  direction,
  radius,
  glow,
  animated = true,
  size = "md",
  href,
  as,
  type,
  disabled = false,
  isLoading = false,
  className,
  style,
  children,
  ...rest
}: HLLButtonProps) {
  const ref = useRef<HTMLElement>(null);

  // The shader engine owns hover and active entirely through its own DOM
  // listeners — no React state, so hovering never triggers a re-render.
  useLightComponent(
    ref,
    () => buildDefinition(variant, { gradient, direction, radius, glow, animated, size }),
    [variant, gradient?.join(","), direction, radius, glow, animated, size],
  );

  const isInert = disabled || isLoading;
  const { text, box } = BASE_DEFINITION;
  const scale = SIZE_SCALE[size] ?? 1;
  // Width follows the label rather than a fixed px value: an inline-flex box
  // sized by its content, with equal left/right padding around the label, so
  // the space either side of the text is the same at any label length.
  const hPadding = Math.round(text.padding * scale);

  const hostStyle = {
    height: Math.round(box.height * scale),
    paddingLeft: hPadding,
    paddingRight: hPadding,
    whiteSpace: "nowrap",
    "--hll-label-color": text.color,
    "--hll-label-hover-color": text.hoverColor,
    ...style,
  } as CSSProperties;

  const label = (
    <>
      <span
        className="hll-button__label"
        style={{
          fontFamily: text.fontFamily || "inherit",
          fontSize: text.fontSize,
          fontWeight: 400,
          letterSpacing: text.letterSpacing,
        }}
      >
        {children}
      </span>
      {isLoading ? <span className="hll-button__spinner" aria-hidden="true" /> : null}
    </>
  );

  const classes = hllButtonVariants({
    variant,
    size,
    disabled: isInert || undefined,
    loading: isLoading || undefined,
    className,
  });

  if (href) {
    return (
      <Link
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={classes}
        style={hostStyle}
        aria-disabled={isInert || undefined}
        aria-busy={isLoading || undefined}
        {...rest}
      >
        {label}
      </Link>
    );
  }

  const Tag = (as ?? "button") as ElementType;
  const isButtonTag = Tag === "button";

  return (
    <Tag
      ref={ref}
      type={isButtonTag ? type || "button" : undefined}
      disabled={isButtonTag ? isInert : undefined}
      aria-disabled={!isButtonTag ? isInert || undefined : undefined}
      aria-busy={isLoading || undefined}
      className={classes}
      style={hostStyle}
      {...rest}
    >
      {label}
    </Tag>
  );
}
