/**
 * Whether WebGL (and WebGL2) works here, checked once per page load and shared: each check creates a real context.
 * The probe context is given straight back so it doesn't count against the browser's per-page limit.
 */
let cached: { webgl: boolean; webgl2: boolean } | null = null;

function probe() {
  if (cached) return cached;
  let webgl = false;
  let webgl2 = false;
  try {
    const canvas = document.createElement("canvas");
    const gl2 = canvas.getContext("webgl2");
    if (gl2) {
      webgl = webgl2 = true;
      gl2.getExtension("WEBGL_lose_context")?.loseContext();
    } else {
      const gl = document.createElement("canvas").getContext("webgl");
      webgl = Boolean(gl);
      gl?.getExtension("WEBGL_lose_context")?.loseContext();
    }
  } catch {
    // Treated as unsupported.
  }
  cached = { webgl, webgl2 };
  return cached;
}

export const supportsWebGL = () => probe().webgl;
export const supportsWebGL2 = () => probe().webgl2;
