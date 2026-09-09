// our-promise-definition.ts — the shared, non-React parts of the "Our Promise"
// sketch: palettes, look settings, and the scroll-driven ripple band, speed,
// text and image timing. Ported from HLL-UI-Demo's our-promise-definition.js.

export const MAX_RIPPLES = 32;
export const TAP_RIPPLE_MODE = false;

export type Rgb = [number, number, number];
export type Look = { saturation: number; vibrancy: number; contrast: number };

/** Pre-scroll: colourful palette at full vibrancy. */
export const COLOR_PALETTE: Rgb[] = [
  [0.0, 0.78, 0.82],
  [0.16, 0.62, 0.92],
  [0.98, 0.8, 0.3],
  [0.99, 0.54, 0.62],
  [1.0, 0.36, 0.64],
  [1.0, 0.78, 0.42],
];

/**
 * Blue-green palette for the scroll-end state. Index maps to blob position:
 * [0]/[1] are the mesh's top-left/top-right blobs, [2]/[3] the two center
 * blobs, [4]/[5] the bottom pair. Green at the top and blue at the bottom
 * with teal bridging the middle reads as one continuous flow rather than two
 * separate patches.
 */
export const GRAY_PALETTE: Rgb[] = [
  [0.168, 0.632, 0.323],
  [0.392, 0.808, 0.635],
  [0.202, 0.758, 0.712],
  [0.316, 0.706, 0.784],
  [0.171, 0.275, 0.589],
  [0.225, 0.546, 0.775],
];

// The colour state gets a vibrancy lift so it reads at full brightness
// pre-scroll; the end state keeps the original neutral values.
export const COLOR_LOOK: Look = { saturation: 1.6, vibrancy: 0.8, contrast: 1.15 };
export const GRAY_LOOK: Look = { saturation: 1.05, vibrancy: 0.5, contrast: 1.15 };

export const BASE_PARAMS = {
  speed: 0.9,
  // Radial displacement strength — this is what draws the rings. Direction is
  // locked radial in the shader, so it has no independent motion of its own.
  flow: 0.3,
  shear: 0.0,
  shape: 0.0,
  rippleNoise: 0.0,
  rippleGap: 1.0,
  motion: 1.0,
  softness: 4.0,
  scale: 1.2,
  rotation: 0.0,
  wobble: 0.08,
};

export const LOCKED_ORIGIN: [number, number] = [0.5, 0.5];

// Band count is locked to BANDS_AT_TOP at the top of the scroll range and
// drops to BANDS_AT_BOTTOM within SCROLL_TRIGGER_PX — not tied to the full
// scroll range, so it settles before the real bottom and overscroll bounce
// never feeds back into it. Speed rides the same progress as one signed
// value: positive drives the ripple inward, negative outward, so lerping
// through zero eases it to a stop and reverses it.
export const BANDS_AT_TOP = 8;
export const BANDS_AT_BOTTOM = 2;
export const SPEED_AT_TOP = 0.9;
export const SPEED_AT_BOTTOM = -0.15;

/** Roughly a screen and a half, so the band count is clearly seen reducing. */
export const SCROLL_TRIGGER_PX = 1100;
/** Low alpha: slow, smooth convergence each frame. */
export const BANDS_EASING = 0.2;

// The text finishes fading at 55% and the image starts there, so they overlap
// briefly instead of hard-cutting; by 100% — the same point the bands settle —
// the image is fully scaled in.
export const TEXT_FADE_END = 0.55;
export const TEXT_SCALE_END = 0.25;
export const IMAGE_FADE_START = 0.55;
export const IMAGE_FADE_END = 1.0;
export const IMAGE_SCALE_START = 0.82;

/** Scroll distance beneath the pinned canvas, giving the page something to scroll. */
export const SCROLL_SPACER_VH = 260;
