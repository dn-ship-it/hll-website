// shader-definition.ts — the structural definition behind the Shader
// component: everything about the "BlockGL — jewel refraction" WebGL2
// multi-pass effect (vignette shape, sine warp, voronoi shatter, bokeh,
// output compositing) EXCEPT its gradient colors, which live in
// shader-variants.ts instead. Copied verbatim from HLL-UI-Demo's
// shader-definition.js — re-copy this file from there if the base look
// changes.

export type ShaderSettings = {
  background: {
    color: string;
    /** Composite the canvas over whatever is behind it instead of painting an opaque plate. */
    transparent?: boolean;
  };
  vignette: {
    radius: number;
    falloff: number;
    displace: number;
    mix: number;
    angle: number;
    skew: number;
  };
  sine: {
    frequency: number;
    amplitude: number;
    falloff: number;
    rotation: number;
    phase: number;
    speed: number;
    mixRadius: number;
    trackMouse: number;
  };
  shatter: {
    scale: number;
    amount: number;
    angle: number;
    skew: number;
    mixRadius: number;
    trackMouse: number;
  };
  bokeh: {
    mixRadius: number;
    trackMouse: number;
    radius: number;
    tilt: number;
  };
  output: {
    color: string;
    aberration: number;
    blendStrength: number;
    /** Eases the transparent branch toward a fully opaque output-color plate. */
    capAmount?: number;
  };
};

/** Render resolution scale relative to the canvas's device-pixel size. */
export const MULTIPLIER = 0.6;

export const BLUE_NOISE_SIZE = 256;

export const BASE_SETTINGS: ShaderSettings = {
  background: { color: "#ffffff" },
  vignette: {
    radius: 0.6,
    falloff: 1,
    displace: 0,
    mix: 1,
    angle: 0,
    skew: 0.54,
  },
  sine: {
    frequency: 0.35,
    amplitude: 3.18,
    falloff: 0.5,
    rotation: 0,
    phase: 0,
    speed: 0.1,
    mixRadius: 1,
    trackMouse: 0,
  },
  shatter: {
    scale: 0.5,
    amount: 0.4,
    angle: 44,
    skew: 0.9,
    mixRadius: 1,
    trackMouse: 1,
  },
  bokeh: {
    mixRadius: 1,
    trackMouse: 0,
    radius: 0.754,
    tilt: 0.5,
  },
  output: { color: "#ffffff", aberration: 0.006, blendStrength: 0.85 },
};

/**
 * BASE_SETTINGS with an alpha-composited background, for usages that layer
 * the jewel over other page content. Cloned rather than mutating the shared
 * default, which every other Shader instance imports.
 */
export const TRANSPARENT_SETTINGS: ShaderSettings = {
  ...BASE_SETTINGS,
  background: { ...BASE_SETTINGS.background, transparent: true },
};
