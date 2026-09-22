"use client";

// hll-outline-button.tsx — the HLL Outline Button, ported from HLL-UI-Demo's
// HLLOutlineButton.jsx (LightFX Studio's "Outline Rectangle — Lens Blur").
//
// Same engine and prop shape as HLLButton. The outline look comes entirely
// from hll-outline-button-definition.ts's shape.strokeWidth — a hollow stroke
// instead of a filled shape — not from any engine difference. Base stays the
// preset's plain gray hairline and only the hover gradient follows the
// variant, matching the preset's own resting/hover split.
import Link from "next/link";
import { useRef, type CSSProperties, type ElementType, type ReactNode } from "react";

import type { HLLVariant } from "../variants";

import { BASE_DEFINITION } from "./hll-outline-button-definition";
import {
  hllOutlineButtonVariants,
  resolveButtonColors,
  SIZE_SCALE,
  type LightSize,
} from "./light-variants";
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

function buildDefinition(variant: HLLVariant, overrides: Overrides) {
  const definition = cloneDefinition(BASE_DEFINITION);
  const { colors, glowColor } = resolveButtonColors(variant, overrides.gradient);

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

export type HLLOutlineButtonProps = {
  variant?: HLLVariant;
  gradient?: string[];
  direction?: number;
  radius?: number;
  glow?: number;
  animated?: boolean;
  size?: LightSize;
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

export function HLLOutlineButton({
  variant = "hll-ai",
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
}: HLLOutlineButtonProps) {
  const ref = useRef<HTMLElement>(null);

  useLightComponent(
    ref,
    () => buildDefinition(variant, { gradient, direction, radius, glow, animated, size }),
    [variant, gradient?.join(","), direction, radius, glow, animated, size],
  );

  const isInert = disabled || isLoading;
  const { text, box } = BASE_DEFINITION;
  const scale = SIZE_SCALE[size] ?? 1;
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
        className="hll-outline-button__label"
        style={{
          fontFamily: text.fontFamily || "inherit",
          fontSize: text.fontSize,
          fontWeight: 400,
          letterSpacing: text.letterSpacing,
        }}
      >
        {children}
      </span>
      {isLoading ? <span className="hll-outline-button__spinner" aria-hidden="true" /> : null}
    </>
  );

  const classes = hllOutlineButtonVariants({
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
