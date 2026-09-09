// bottom-shader-definition.ts — layout tuning for BottomShader's own crop:
// how tall its host is, how much of the full-viewport render the canvas
// shows, and where the soft top-edge fade holds solid vs. goes transparent.
// Ported from HLL-UI-Demo's bottom-shader-definition.js.
//
// The canvas always renders at the true viewport height, matching Shader's
// own canvas size exactly, regardless of how much the host crops it down to.
// That is what makes this "the same animation, showing its bottom slice"
// rather than a differently-shaped one: every effect it shares with Shader
// (vignette, sine warp, shatter, bokeh) is computed from the canvas's own
// resolution and aspect ratio, so a canvas sized to anything else renders a
// visibly different pattern, not a crop of the same one.
export const CANVAS_HEIGHT = "100vh";

// How far into the host's visible window the soft top-edge fade runs before
// the effect is fully solid. The one real tuning knob for the fade's look;
// everything below is derived from it so they cannot drift apart.
const FADE_FRACTION_OF_WINDOW = 0.3;

export type BottomShaderLayout = {
  HOST_HEIGHT: string;
  CANVAS_HEIGHT: string;
  FADE_HOLD_END: number;
  FADE_SOLID_START: number;
  FADE_COLOR: string;
  POINTER_MAX_Y: number;
};

export function makeBottomShaderLayout(
  hostHeightPercent: number,
  { fadeColor = "#ffffff" }: { fadeColor?: string } = {},
): BottomShaderLayout {
  return {
    HOST_HEIGHT: `${hostHeightPercent}vh`,
    CANVAS_HEIGHT,
    // The fade gradient is sized to the HOST's own box, so these two values
    // stay on that host-relative scale: 0% is the top of the visible host,
    // 100% its bottom.
    FADE_HOLD_END: 0,
    FADE_SOLID_START: FADE_FRACTION_OF_WINDOW * 100,
    // Should match whatever sits behind the host so the blend reads as
    // fading into the page rather than as a visible seam.
    FADE_COLOR: fadeColor,
    // The visible window's top edge in the runtime's pointer-tracking space
    // (0 = canvas bottom, 1 = canvas top), passed as pointerMaxY so the
    // cursor-follow light clamps there instead of drifting out of view.
    POINTER_MAX_Y: hostHeightPercent / 100,
  };
}

export const DEFAULT_LAYOUT = makeBottomShaderLayout(25);

export const HALF_HEIGHT_LAYOUT = makeBottomShaderLayout(25, { fadeColor: "transparent" });
