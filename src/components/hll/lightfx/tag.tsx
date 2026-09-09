"use client";

// tag.tsx — the reusable Tag, ported from HLL-UI-Demo's Tag.jsx.
//
// Same "one implementation, variant picks color" shape as HLLButton, but a
// tag has no hover or active state at all (TAG_STATIC: hover false,
// cursorLight false, clickPulse false) — it is a single, static, fully
// blurred colour blob. Unlike the button's fixed box, the canvas auto-fits to
// whatever size the host renders at via CSS padding, so the pill always hugs
// its content.
import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

import { BASE_DEFINITION } from "./tag-definition";
import {
  resolveTagColors,
  tagVariants,
  TAG_SIZE_SCALE,
  type LightSize,
  type TagVariant,
} from "./light-variants";
import { cloneDefinition, LightComponent } from "./lightfx-runtime";

// plus.svg's own paths at its native stroke width, inlined so the viewBox can
// be cropped tight to the glyph's actual bounding box (it only fills the
// middle ~30% of the source file's 14x14 canvas), and so vector-effect can
// pin the stroke to a constant on-screen width: enlarging the icon to track
// the label's font-size should make the mark bigger, not its lines thicker.
function RemoveIcon() {
  return (
    <svg viewBox="4.32 4.14 5.24 5.24" aria-hidden="true">
      <path
        d="M4.82129 8.88304L9.06393 4.6404"
        stroke="currentColor"
        strokeWidth="0.5"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M9.06348 8.88304L4.82084 4.6404"
        stroke="currentColor"
        strokeWidth="0.5"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

function buildDefinition(variant: TagVariant, override?: string[]) {
  const definition = cloneDefinition(BASE_DEFINITION);
  const { colors, glowColor } = resolveTagColors(variant, override);

  definition.params.base.colors = colors;
  definition.params.base.glowColor = glowColor;
  definition.params.hover.colors = colors;
  definition.params.hover.glowColor = glowColor;

  return definition;
}

export type TagProps = {
  variant?: TagVariant;
  gradient?: string[];
  size?: LightSize;
  removable?: boolean;
  onRemove?: () => void;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

export function Tag({
  variant = "warm",
  gradient,
  size = "md",
  removable = true,
  onRemove,
  disabled = false,
  className,
  style,
  children,
  ...rest
}: TagProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return undefined;
    const fx = new LightComponent(ref.current, buildDefinition(variant, gradient));
    return () => fx.dispose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variant, gradient?.join(",")]);

  const { text } = BASE_DEFINITION;
  const scale = TAG_SIZE_SCALE[size] ?? 1;
  const label = children ?? text.content;
  const fontSize = Math.round(text.fontSize * scale);
  const iconSize = Math.round(fontSize * 1.1);

  return (
    <span
      ref={ref}
      className={tagVariants({ variant, size, disabled: disabled || undefined, className })}
      style={
        {
          padding: `${Math.round(6 * scale)}px ${Math.round(14 * scale)}px`,
          "--tag-label-color": text.color,
          ...style,
        } as CSSProperties
      }
      {...rest}
    >
      {removable ? (
        <button
          type="button"
          className="tag__remove"
          disabled={disabled}
          aria-label={`Remove ${typeof label === "string" ? label : "tag"}`}
          onClick={onRemove}
          style={{ width: iconSize, height: iconSize }}
        >
          <RemoveIcon />
        </button>
      ) : null}
      <span
        className="tag__label"
        style={{
          fontFamily: text.fontFamily || "inherit",
          fontSize,
          fontWeight: text.fontWeight,
          letterSpacing: text.letterSpacing,
        }}
      >
        {label}
      </span>
    </span>
  );
}
