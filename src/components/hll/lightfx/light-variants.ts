// light-variants.ts — the CVA variant systems for the three LightFX-driven
// components (button, outline button, tag), merged from HLL-UI-Demo's
// hll-button-variants.js, hll-outline-button-variants.js and tag-variants.js.
//
// CVA composes the static structural class names only; it never computes
// anything at runtime and never sees a color. The fill/glow is a WebGL shader
// (see lightfx-runtime.js), not a CSS background, so the color stops are
// resolved separately below. The button and outline button share the design
// system's VARIANT_GRADIENTS in ../variants.ts. The tag's warm/cool pair has
// no counterpart there, so it keeps its own map.
import { cva } from "class-variance-authority";

import { getVariantColors, type HLLVariant } from "../variants";

const VARIANT_CLASSES = (prefix: string) => ({
  services: `${prefix}--services`,
  industries: `${prefix}--industries`,
  engagement: `${prefix}--engagement`,
  about: `${prefix}--about`,
  contact: `${prefix}--contact`,
  "hll-ai": `${prefix}--hll-ai`,
  "hll-trust": `${prefix}--hll-trust`,
  "hll-foundation": `${prefix}--hll-foundation`,
  "hll-ontology": `${prefix}--hll-ontology`,
  "hll-people": `${prefix}--hll-people`,
  "hll-application": `${prefix}--hll-application`,
});

export const hllButtonVariants = cva("hll-button", {
  variants: {
    variant: VARIANT_CLASSES("hll-button"),
    size: {
      sm: "hll-button--sm",
      md: "hll-button--md",
      lg: "hll-button--lg",
    },
    disabled: { true: "hll-button--disabled" },
    loading: { true: "hll-button--loading" },
  },
  defaultVariants: { variant: "services", size: "md" },
});

export const hllOutlineButtonVariants = cva("hll-outline-button", {
  variants: {
    variant: VARIANT_CLASSES("hll-outline-button"),
    size: {
      sm: "hll-outline-button--sm",
      md: "hll-outline-button--md",
      lg: "hll-outline-button--lg",
    },
    disabled: { true: "hll-outline-button--disabled" },
    loading: { true: "hll-outline-button--loading" },
  },
  defaultVariants: { variant: "hll-ai", size: "md" },
});

export const tagVariants = cva("tag", {
  variants: {
    variant: {
      warm: "tag--warm",
      cool: "tag--cool",
    },
    size: {
      sm: "tag--sm",
      md: "tag--md",
      lg: "tag--lg",
    },
    disabled: { true: "tag--disabled" },
  },
  defaultVariants: { variant: "warm", size: "md" },
});

export const SIZE_SCALE: Record<string, number> = { sm: 0.8, md: 1, lg: 1.25 };
export const TAG_SIZE_SCALE: Record<string, number> = { sm: 0.85, md: 1, lg: 1.2 };

export type LightSize = "sm" | "md" | "lg";

/** glowColor follows Studio's preset convention: the gradient's first stop. */
export function resolveButtonColors(variant: HLLVariant, override?: string[]) {
  const colors = override && override.length >= 2 ? override : getVariantColors(variant);
  return { colors, glowColor: colors[0] };
}

export type TagVariant = "warm" | "cool";

/**
 * Studio's WARM / COOL gradient-sheet constants, the design system's only two
 * tag looks. Not in ../variants.ts because nothing else uses them.
 */
export const TAG_GRADIENTS: Record<TagVariant, { colors: string[]; label: string }> = {
  warm: { colors: ["#fa4288", "#fb8e97", "#ff836b", "#fee253"], label: "Warm" },
  cool: { colors: ["#ff80ca", "#8786e6", "#007fd2", "#59a3e9"], label: "Cool" },
};

/**
 * tagBlurred() biases the glow toward the gradient's later stops — index
 * min(2, length - 1) — so it reads as the warmer/cooler tail, not the lead.
 */
export function resolveTagColors(variant: TagVariant, override?: string[]) {
  const colors =
    override && override.length >= 2 ? override : TAG_GRADIENTS[variant].colors;
  return { colors, glowColor: colors[Math.min(2, colors.length - 1)] };
}
