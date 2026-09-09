// ripple-definition.ts — the ripple sketch's per-service tuning and palettes,
// ported from HLL-UI-Demo's ripple-definition.js / ripple-variants.js and
// cornerripple-definition.js / cornerripple-variants.js.
//
// The two demo folders are identical except for the ripple origin: the plain
// ripple centres it at (0.5, 0.5), the corner variant pins it to (1, 0).
// Everything else — every param, both shader files, the whole sketch — is
// byte-identical, so they collapse into one module with an `origin` option.
//
// These palettes are the ripple's own six-stop ramps, deliberately not the
// design system's two-to-three-stop VARIANT_GRADIENTS: the shader's uPalette
// is a fixed six-color uniform, and these were authored at that width so
// buildPalette passes them through unchanged instead of resampling.

export const MAX_RIPPLES = 32;

/** Baked from export time; the sketch still honours taps if it was on. */
export const TAP_RIPPLE_MODE = false;

export type RippleVariant =
  | "hll-ai"
  | "hll-application"
  | "hll-foundation"
  | "hll-ontology"
  | "hll-people-and-policy"
  | "hll-trust-and-governance";

export type RippleOrigin = "center" | "corner";

export type RippleParams = {
  bands: number;
  speed: number;
  flow: number;
  shear: number;
  shape: number;
  rippleNoise: number;
  rippleSpacing: number;
  motion: number;
  soft: number;
  scale: number;
  rot: number;
  wobble: number;
  saturation: number;
  vibrancy: number;
  contrast: number;
};

const SHARED: Omit<RippleParams, "rot" | "saturation" | "vibrancy" | "contrast"> = {
  bands: 5.7,
  speed: 0.9,
  flow: 0.2,
  shear: 0.3,
  shape: 0,
  rippleNoise: 0,
  rippleSpacing: 1.16,
  motion: 0.94,
  soft: 4,
  scale: 5.5,
  wobble: 0.039,
};

export const VARIANT_PARAMS: Record<RippleVariant, RippleParams> = {
  // The only variant that departs from the shared set, on every axis.
  "hll-application": {
    bands: 12.8,
    speed: 0.31,
    flow: 0.2,
    shear: 0.3,
    shape: 0,
    rippleNoise: 0,
    rippleSpacing: 0.3,
    motion: 1,
    soft: 4,
    scale: 5.5,
    rot: 0,
    wobble: 0.3,
    saturation: 0.37,
    vibrancy: 0.54,
    contrast: 1.65,
  },
  "hll-foundation": { ...SHARED, rot: 1.81, saturation: 0.08, vibrancy: 0.13, contrast: 1.31 },
  "hll-trust-and-governance": { ...SHARED, rot: 4.58, saturation: 0, vibrancy: 0.09, contrast: 2 },
  "hll-people-and-policy": { ...SHARED, rot: 4.16, saturation: 0, vibrancy: 0.68, contrast: 1.26 },
  "hll-ontology": { ...SHARED, rot: 0, saturation: 0, vibrancy: 0.67, contrast: 0.97 },
  "hll-ai": { ...SHARED, rot: 0, saturation: 0, vibrancy: 0.31, contrast: 1.27 },
};

export const RIPPLE_GRADIENTS: Record<RippleVariant, string[]> = {
  "hll-application": ["#387dd6", "#7887e6", "#a182bf", "#bf7dc7", "#f28a85", "#f7262b"],
  "hll-foundation": ["#8f6999", "#ba70ba", "#e3807d", "#ff5c21", "#ff874d", "#ffb359"],
  "hll-trust-and-governance": ["#78b3e3", "#45b0a8", "#47ccab", "#3dba85", "#14ad75", "#007345"],
  "hll-people-and-policy": ["#ffd680", "#ffdea8", "#ffcc94", "#ffb378", "#ffba99", "#ff9445"],
  "hll-ontology": ["#cf9eb0", "#bf70a6", "#bf7db5", "#bf8cc4", "#c78aff", "#8266ff"],
  "hll-ai": ["#bf9cad", "#a399cc", "#6e70e0", "#8799ed", "#7a99fc", "#4075fc"],
};

/** The design system's service variants use shorter names than the ripple's. */
export const SERVICE_TO_RIPPLE: Record<string, RippleVariant> = {
  "hll-ai": "hll-ai",
  "hll-application": "hll-application",
  "hll-foundation": "hll-foundation",
  "hll-ontology": "hll-ontology",
  "hll-people": "hll-people-and-policy",
  "hll-trust": "hll-trust-and-governance",
};

export const RIPPLE_ORIGINS: Record<RippleOrigin, [number, number]> = {
  center: [0.5, 0.5],
  corner: [1, 0],
};

function hexToRgbFloat(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [
    parseInt(h.substring(0, 2), 16) / 255,
    parseInt(h.substring(2, 4), 16) / 255,
    parseInt(h.substring(4, 6), 16) / 255,
  ];
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function lerpColor(
  c1: [number, number, number],
  c2: [number, number, number],
  t: number,
): [number, number, number] {
  return [lerp(c1[0], c2[0], t), lerp(c1[1], c2[1], t), lerp(c1[2], c2[2], t)];
}

/**
 * uPalette is a fixed six-color uniform, so a shorter gradient is resampled
 * into an evenly-spaced six-color ramp. The variants above are already six
 * stops wide and pass through unchanged.
 */
export function buildPalette(hexColors: string[], stops = 6): [number, number, number][] {
  const rgb = hexColors.map(hexToRgbFloat);
  if (rgb.length === 1) return Array(stops).fill(rgb[0]);

  const segments = rgb.length - 1;
  const result: [number, number, number][] = [];
  for (let i = 0; i < stops; i++) {
    const t = (i / (stops - 1)) * segments;
    const seg = Math.min(Math.floor(t), segments - 1);
    result.push(lerpColor(rgb[seg], rgb[seg + 1], t - seg));
  }
  return result;
}

export function resolveVariantParams(variant: RippleVariant): RippleParams {
  return VARIANT_PARAMS[variant] ?? VARIANT_PARAMS["hll-application"];
}

export function resolveVariantPalette(variant: RippleVariant, stops = 6) {
  return buildPalette(RIPPLE_GRADIENTS[variant] ?? RIPPLE_GRADIENTS["hll-application"], stops);
}
