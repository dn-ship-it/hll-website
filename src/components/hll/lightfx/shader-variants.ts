// shader-variants.ts — the shader's CVA variant system.
//
// CVA composes the static structural class names below; it never computes
// anything at runtime and never sees a color. The jewel's gradient ring is a
// WebGL texture (see shader-runtime.ts), not a CSS background, so the color
// stops come from the design system's shared VARIANT_GRADIENTS map in
// ../variants.ts — the same five menu-item gradients and six per-service
// gradients HLLButton and BottomShader already draw from, so the jewel can
// never drift from the button it sits behind.
import { cva } from "class-variance-authority";

import { getVariantColors, type HLLVariant } from "../variants";

export const shaderVariants = cva("shader", {
  variants: {
    variant: {
      services: "shader--services",
      industries: "shader--industries",
      engagement: "shader--engagement",
      about: "shader--about",
      contact: "shader--contact",
      "hll-ai": "shader--hll-ai",
      "hll-trust": "shader--hll-trust",
      "hll-foundation": "shader--hll-foundation",
      "hll-ontology": "shader--hll-ontology",
      "hll-people": "shader--hll-people",
      "hll-application": "shader--hll-application",
    },
    disabled: {
      true: "shader--disabled",
    },
    passthrough: {
      true: "shader--passthrough",
    },
    contained: {
      true: "shader--contained",
    },
  },
  defaultVariants: {
    variant: "services",
  },
});

/**
 * The runtime needs at least two stops to build the angular gradient ring, so
 * a one-color override falls back to the variant's own palette.
 */
export function resolveVariantColors(variant: HLLVariant, override?: string[]): string[] {
  if (override && override.length >= 2) return override;
  return getVariantColors(variant);
}
