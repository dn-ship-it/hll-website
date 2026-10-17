/*! hll-ripple.js: HLL ripple as a fast, animated background. No dependencies (replaces p5).
 * Shader, service settings and buildPalette are the branding team's (ripple-shaders.ts / ripple-definition.ts), unchanged.
 * Usage: <hll-ripple variant="hll-application" palette="#597faa,#1d3857,#22226d"></hll-ripple>
 * Attributes (all optional): variant, palette (2-6 hex), origin ("corner" | "center" | "x,y" from the top left), bands, speed, flow, shear,
 *   wobble, spacing, rot, scale (gradient), contrast, vibrancy, saturation, seed, fps (default 30), resolution (default 0.5),
 *   quality ("high" | "low" | "auto"), poster (image URL shown until the first frame and when motion is reduced), paused.
 * Performance: one shared WebGL context for every ripple on the page; renders at half resolution (soft shapes upscale cleanly);
 * 30 fps cap; only visible ripples render; pauses in background tabs; honours prefers-reduced-motion (one still frame).
 */
const VERT = `precision highp float;
attribute vec3 aPosition;
attribute vec2 aTexCoord;
varying vec2 vTexCoord;
void main() {
 vTexCoord = aTexCoord;
 vec4 positionVec4 = vec4(aPosition, 1.0);
 positionVec4.xy = positionVec4.xy * 2.0 - 1.0;
 gl_Position = positionVec4;
}`;
const FRAG = `precision highp float;
uniform float uTime;
uniform vec2 uResolution;
uniform float uBands;
uniform float uSpeed;
uniform float uFlowStrength;
uniform float uShearStrength;
uniform float uRippleShape;
uniform float uRippleNoise;
uniform float uRippleGap;
uniform vec2 uOrigin;
#define MAX_RIPPLES 32
uniform bool uTapRippleMode;
uniform int uRippleCount;
uniform vec2 uRipplePoints[MAX_RIPPLES];
uniform vec3 uPalette[6];
uniform bool uUseCustomPalette;
uniform float uGradientMotion;
uniform float uGradientSoftness;
uniform float uGradientScale;
uniform float uGradientRotation;
uniform float uGradientWobble;
uniform float uSaturation;
uniform float uVibrancy;
uniform float uContrast;
varying vec2 vTexCoord;
uniform sampler2D uPaintTexture;
uniform int uInteractionMode;
uniform float uPaintStrength;
vec2 toAspectSpace(vec2 uv, float aspect) {
 return vec2(uv.x * aspect, uv.y);
}
vec2 fromAspectSpace(vec2 p, float aspect) {
 return vec2(p.x / aspect, p.y);
}
mat2 rot(float a) {
 float s = sin(a);
 float c = cos(a);
 return mat2(c, -s, s, c);
}
float luminance(vec3 c) {
 return dot(c, vec3(0.299, 0.587, 0.114));
}
vec2 stabilizeUV(vec2 uv) {
 return mix(
 uv,
 clamp(uv, 0.001, 0.999),
 0.85
 );
}
vec3 applyColorControls(vec3 col) {
 float luma = luminance(col);
 col = mix(
 vec3(luma),
 col,
 max(uSaturation, 1.0)
 );
 float avg = (col.r + col.g + col.b) / 3.0;
 float mx = max(col.r, max(col.g, col.b));
 float amt = (mx - avg) * (-uVibrancy * 3.0);
 col = mix(col, vec3(mx), amt);
 col = (col - 0.5) * uContrast + 0.5;
 return clamp(col, 0.0, 1.0);
}
vec3 meshGradient(vec2 uv) {
 vec2 p = (uv - 0.5) * uGradientScale;
 p = rot(uGradientRotation) * p;
 float t = uTime * uGradientMotion;
 float wob = uGradientWobble;
 vec2 wobA = vec2(
 sin(t * 1.9),
 cos(t * 1.9)
 ) * wob;
 vec2 wobB = vec2(
 cos(t * 1.9),
 sin(t * 1.9)
 ) * wob;
 vec2 c1 = vec2(-0.45, -0.35) + wobA;
 vec2 c2 = vec2( 0.45, -0.35) + wobB;
 vec2 c3 = vec2(-0.35, 0.15) + wobA;
 vec2 c4 = vec2( 0.35, 0.15) + wobB;
 vec2 c5 = vec2(-0.20, 0.50) + wobA;
 vec2 c6 = vec2( 0.20, 0.50) + wobB;
 float s = max(0.01, uGradientSoftness);
 float d1 = max(length(p - c1), 0.12);
 float d2 = max(length(p - c2), 0.12);
 float d3 = max(length(p - c3), 0.12);
 float d4 = max(length(p - c4), 0.12);
 float d5 = max(length(p - c5), 0.12);
 float d6 = max(length(p - c6), 0.12);
 float w1 = 1.0 / (pow(d1, s) + 0.2);
 float w2 = 1.0 / (pow(d2, s) + 0.2);
 float w3 = 1.0 / (pow(d3, s) + 0.2);
 float w4 = 1.0 / (pow(d4, s) + 0.2);
 float w5 = 1.0 / (pow(d5, s) + 0.2);
 float w6 = 1.0 / (pow(d6, s) + 0.2);
 float total = w1 + w2 + w3 + w4 + w5 + w6;
 vec3 col =
 uPalette[0] * w1
 + uPalette[1] * w2
 + uPalette[2] * w3
 + uPalette[3] * w4
 + uPalette[4] * w5
 + uPalette[5] * w6;
 col /= total;
 float luma = luminance(col);
 float boost = uUseCustomPalette ? 1.0 : 1.35;
 col = mix(
 vec3(luma),
 col,
 boost
 );
 return clamp(col, 0.0, 1.0);
}
void main() {
 vec2 uv = vTexCoord;
 float paint =
 texture2D(
 uPaintTexture,
 uv
 ).r;
 float t = uTime * 0.9;
 float aspect = uResolution.x / uResolution.y;
 vec2 originA = toAspectSpace(uOrigin, aspect);
 float xScale = 1.8;
 float yScale = 0.65;
 vec2 shapeScale = vec2(
 mix(1.0, xScale, uRippleShape),
 mix(1.0, yScale, uRippleShape)
 );
 vec2 uvA = toAspectSpace(uv, aspect);
vec2 rippleP;
float r;
if (!uTapRippleMode) {
 vec2 p = uvA - originA;
 rippleP = p * shapeScale;
 r = length(rippleP);
} else {
 r = 99999.0;
 rippleP = vec2(0.0);
 for (int i = 0; i < MAX_RIPPLES; i++) {
 if (i >= uRippleCount) break;
 vec2 sourceA =
 toAspectSpace(
 uRipplePoints[i],
 aspect
 );
 vec2 localP =
 (uvA - sourceA) *
 shapeScale;
 float localR =
 length(localP);
 if (localR < r) {
 r = localR;
 rippleP = localP;
 }
 }
 if (uRippleCount == 0) {
 r = 1000.0;
 }
}
 float angularWarp =
 sin(rippleP.x * 2.7 + rippleP.y * 1.3) *
 cos(rippleP.y * 2.1 - rippleP.x * 1.7);
 r += angularWarp * 0.006;
 float circularNoise =
 sin(r * 12.0 - t * 2.0) * 0.04;
 float ovalNoise =
 sin(rippleP.x * 5.0 + t) * 0.085 +
 cos(rippleP.y * 5.0 - t) * 0.015;
 r += mix(
 circularNoise,
 ovalNoise,
 uRippleShape
 );
 float rippleNoise =
 sin(rippleP.x * 18.0 + t * 1.2) *
 cos(rippleP.y * 18.0 - t * 0.9);
 rippleNoise +=
 sin((rippleP.x + rippleP.y) * 25.0 - t);
 r += rippleNoise * 0.03 * uRippleNoise;
 float gappedR =
 pow(max(r, 0.0001), uRippleGap);
 float ripplePhase =
 gappedR * uBands -
 t * uSpeed;
 float ripple = fract(ripplePhase);
 float seam =
 abs(ripple - 0.99) * 2.0;
 float seamFade =
 smoothstep(0.0, 0.98, seam);
 ripple = mix(
 0.5,
 ripple,
 seamFade
 );
 float rippleSoft =
 smoothstep(0.1, 0.9, ripple);
 float flow =
 sin(uv.x * 5.0 + t) +
 cos(uv.y * 5.0 - t);
 float flow2 =
 sin(uv.y * 5.0 - t);
 vec2 rawFlow = vec2(flow, flow2);
 float flowLen =
 max(length(rawFlow), 0.25);
 vec2 flowDir =
 rawFlow /
 max(length(rawFlow), 0.5);
 vec2 displacedUV =
 clamp(
 uv +
 flowDir *
 uFlowStrength *
 rippleSoft,
 0.001,
 0.999
 );
 vec2 displacedA =
 toAspectSpace(
 displacedUV,
 aspect
 );
 vec2 fieldOrigin = originA;
if (uTapRippleMode && uRippleCount > 0) {
 float bestDist = 99999.0;
 for (int i = 0; i < MAX_RIPPLES; i++) {
 if (i >= uRippleCount) break;
 vec2 sourceA =
 toAspectSpace(
 uRipplePoints[i],
 aspect
 );
 float d =
 length(
 displacedA -
 sourceA
 );
 if (d < bestDist) {
 bestDist = d;
 fieldOrigin = sourceA;
 }
 }
}
vec2 shapedSP =
 (displacedA - fieldOrigin) *
 shapeScale;
 float radius =
 length(shapedSP);
 radius +=
 0.00001 *
 sin(
 shapedSP.x * 137.0 +
 shapedSP.y * 91.0
 );
 float shear =
 sin(
 uv.y * 10.0 +
 t * 8.0
 ) * 0.2;
 float directionalShear =
 dot(
 flowDir,
 normalize(vec2(1.0, -1.0))
 );
 directionalShear /=
 (1.0 + abs(directionalShear));
 shear +=
 directionalShear *
 uShearStrength;
 vec3 col = vec3(0.0);
 float total = 0.0;
 for (int i = -20; i <= 20; i++) {
 float f = float(i) / 20.0;
 float safeRadius =
 max(radius, 0.08);
 vec2 radialDir =
 shapedSP / safeRadius;
 float lenSP =
 length(shapedSP);
 vec2 tangentDir =
 (lenSP > 1e-5)
 ? vec2(-shapedSP.y, shapedSP.x) / lenSP
 : vec2(0.0);
 float angularFade =
 smoothstep(
 0.03,
 0.22,
 radius
 );
 tangentDir *= angularFade;
 radialDir *= angularFade;
 float swirl =
 f * 0.085 * rippleSoft +
 shear * f * 0.038 +
 0.01 * sin(radius * 20.0 + t);
 float radialOffset =
 f * 0.05 * shear;
 vec2 warped =
 shapedSP +
 tangentDir * swirl * 0.8 +
 radialDir * radialOffset * 0.6;
 warped *= 0.9;
 warped /= shapeScale;
 vec2 sampleUV =
 fromAspectSpace(
 originA + warped,
 aspect
 );
 sampleUV =
 stabilizeUV(sampleUV);
 float w =
 pow(
 1.0 - abs(f),
 2.0
 );
 col +=
 meshGradient(sampleUV) * w;
 total += w;
 }
 col /= total;
 col =
 applyColorControls(col);
 gl_FragColor =
 vec4(col, 1.0);
}`;
const SHARED = { bands: 5.7, speed: 0.9, flow: 0.2, shear: 0.3, shape: 0, rippleNoise: 0, rippleSpacing: 1.16, motion: 0.94, soft: 4, scale: 5.5, wobble: 0.039 };
const VARIANTS = {
  "hll-application": { bands: 12.8, speed: 0.31, flow: 0.2, shear: 0.3, shape: 0, rippleNoise: 0, rippleSpacing: 0.3, motion: 1, soft: 4, scale: 5.5, rot: 0, wobble: 0.3, saturation: 0.37, vibrancy: 0.54, contrast: 1.65 },
  "hll-foundation": { ...SHARED, rot: 1.81, saturation: 0.08, vibrancy: 0.13, contrast: 1.31 },
  "hll-trust-and-governance": { ...SHARED, rot: 4.58, saturation: 0, vibrancy: 0.09, contrast: 2 },
  "hll-people-and-policy": { ...SHARED, rot: 4.16, saturation: 0, vibrancy: 0.68, contrast: 1.26 },
  "hll-ontology": { ...SHARED, rot: 0, saturation: 0, vibrancy: 0.67, contrast: 0.97 },
  "hll-ai": { ...SHARED, rot: 0, saturation: 0, vibrancy: 0.31, contrast: 1.27 },
};
const GRADIENTS = {
  "hll-application": ["#387dd6", "#7887e6", "#a182bf", "#bf7dc7", "#f28a85", "#f7262b"],
  "hll-foundation": ["#8f6999", "#ba70ba", "#e3807d", "#ff5c21", "#ff874d", "#ffb359"],
  "hll-trust-and-governance": ["#78b3e3", "#45b0a8", "#47ccab", "#3dba85", "#14ad75", "#007345"],
  "hll-people-and-policy": ["#ffd680", "#ffdea8", "#ffcc94", "#ffb378", "#ffba99", "#ff9445"],
  "hll-ontology": ["#cf9eb0", "#bf70a6", "#bf7db5", "#bf8cc4", "#c78aff", "#8266ff"],
  "hll-ai": ["#bf9cad", "#a399cc", "#6e70e0", "#8799ed", "#7a99fc", "#4075fc"],
};
const ATTR = { bands: "bands", speed: "speed", flow: "flow", shear: "shear", wobble: "wobble", spacing: "rippleSpacing", rot: "rot", scale: "scale", contrast: "contrast", vibrancy: "vibrancy", saturation: "saturation", motion: "motion", soft: "soft" };
const UNI = ["uTime","uResolution","uBands","uSpeed","uFlowStrength","uShearStrength","uRippleShape","uRippleNoise","uRippleGap","uOrigin","uTapRippleMode","uRippleCount","uRipplePoints","uPalette","uUseCustomPalette","uGradientMotion","uGradientSoftness","uGradientScale","uGradientRotation","uGradientWobble","uSaturation","uVibrancy","uContrast","uPaintTexture"];

function buildPalette(hex, stops = 6) {
  const rgb = hex.map(h => { h = h.replace("#", ""); return [0, 2, 4].map(i => parseInt(h.substr(i, 2), 16) / 255); });
  if (rgb.length === 1) return new Float32Array(Array(stops).fill(rgb[0]).flat());
  const seg = rgb.length - 1, out = [];
  for (let i = 0; i < stops; i++) { const t = (i / (stops - 1)) * seg, s = Math.min(Math.floor(t), seg - 1), u = t - s;
    out.push(...[0, 1, 2].map(c => rgb[s][c] + (rgb[s + 1][c] - rgb[s][c]) * u)); }
  return new Float32Array(out);
}

const R = { gl: null, canvas: null, progs: {}, items: new Set(), raf: 0, lost: false };
function gl() {
  if (R.gl || R.lost) return R.gl;
  R.canvas = document.createElement("canvas");
  const g = R.canvas.getContext("webgl", { antialias: false, alpha: false, depth: false, stencil: false, powerPreference: "low-power" });
  if (!g) return null;
  R.canvas.addEventListener("webglcontextlost", e => { e.preventDefault(); R.lost = true; R.gl = null; R.progs = {}; });
  const buf = (data) => { const b = g.createBuffer(); g.bindBuffer(g.ARRAY_BUFFER, b); g.bufferData(g.ARRAY_BUFFER, new Float32Array(data), g.STATIC_DRAW); return b; };
  R.quad = buf([0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0]); R.uv = buf([0, 1, 1, 1, 0, 0, 1, 0]);
  const tex = g.createTexture(); g.bindTexture(g.TEXTURE_2D, tex);
  g.texImage2D(g.TEXTURE_2D, 0, g.RGBA, 1, 1, 0, g.RGBA, g.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 255]));
  return (R.gl = g);
}
function program(taps) {
  if (R.progs[taps]) return R.progs[taps];
  const g = R.gl, frag = FRAG.replace("for (int i = -20; i <= 20; i++)", `for (int i = -${taps}; i <= ${taps}; i++)`).replace("float(i) / 20.0", `float(i) / ${taps}.0`);
  const sh = (t, s) => { const o = g.createShader(t); g.shaderSource(o, s); g.compileShader(o); return o; };
  const p = g.createProgram(); g.attachShader(p, sh(g.VERTEX_SHADER, VERT)); g.attachShader(p, sh(g.FRAGMENT_SHADER, frag)); g.linkProgram(p);
  if (!g.getProgramParameter(p, g.LINK_STATUS)) { console.warn("hll-ripple:", g.getProgramInfoLog(p)); return null; }
  const u = {}; UNI.forEach(n => (u[n] = g.getUniformLocation(p, n)));
  return (R.progs[taps] = { p, u, aPos: g.getAttribLocation(p, "aPosition"), aUv: g.getAttribLocation(p, "aTexCoord") });
}
function loop(now) {
  R.raf = 0;
  if (document.hidden) return;
  for (const el of R.items) if (el._visible && !el._still && now - el._last >= 1000 / el._fps) { el._last = now; el._draw(now / 1000); }
  if ([...R.items].some(el => el._visible && !el._still)) R.raf = requestAnimationFrame(loop);
}
function wake() { if (!R.raf) R.raf = requestAnimationFrame(loop); }
document.addEventListener("visibilitychange", () => { if (!document.hidden) wake(); });
const reduceMotion = typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;

class HLLRipple extends HTMLElement {
  static get observedAttributes() { return ["variant", "palette", "origin", "fps", "resolution", "quality", "paused", "seed", ...Object.keys(ATTR)]; }
  connectedCallback() {
    if (!this._canvas) {
      this.style.display = this.style.display || "block";
      this._canvas = document.createElement("canvas");
      this._canvas.style.cssText = "display:block;width:100%;height:100%";
      this._canvas.setAttribute("aria-hidden", "true");
      this.appendChild(this._canvas);
      this._ctx = this._canvas.getContext("2d", { alpha: false });
    }
    if (this.getAttribute("poster")) Object.assign(this.style, { backgroundImage: `url(${this.getAttribute("poster")})`, backgroundSize: "cover", backgroundPosition: "center" });
    this._last = 0; this._read();
    this._ro = new ResizeObserver(() => this._resize()); this._ro.observe(this);
    this._io = new IntersectionObserver(([e]) => { this._visible = e.isIntersecting; if (this._visible) { if (this._still) this._draw(this._t0); else wake(); } }, { rootMargin: "100px" });
    this._io.observe(this); R.items.add(this);
  }
  disconnectedCallback() { this._ro && this._ro.disconnect(); this._io && this._io.disconnect(); R.items.delete(this); }
  attributeChangedCallback() { if (this._canvas) { this._read(); if (this._still && this._visible) this._draw(this._t0); } }
  _read() {
    const a = n => this.getAttribute(n), v = a("variant") || "hll-application";
    this._params = { ...(VARIANTS[v] || VARIANTS["hll-application"]) };
    for (const [k, p] of Object.entries(ATTR)) if (a(k) !== null && a(k) !== "") this._params[p] = parseFloat(a(k));
    const pal = (a("palette") || "").split(",").map(s => s.trim()).filter(s => /^#?[0-9a-f]{6}$/i.test(s));
    this._palette = buildPalette(pal.length >= 2 ? pal : GRADIENTS[v] || GRADIENTS["hll-application"]);
    const o = (a("origin") || "corner").trim();
    this._origin = o === "center" ? [0.5, 0.5] : o === "corner" ? [1, 0] : o.split(",").map(Number);
    this._fps = Math.max(1, Math.min(60, parseFloat(a("fps")) || 30));
    this._res = Math.max(0.2, Math.min(1, parseFloat(a("resolution")) || 0.5));
    const q = a("quality") || "auto";
    this._taps = q === "high" ? 20 : q === "low" ? 10 : (innerWidth < 700 || (navigator.hardwareConcurrency || 8) <= 4 ? 12 : 20);
    this._t0 = parseFloat(a("seed")) || 7;
    this._still = reduceMotion || this.hasAttribute("paused");
  }
  _resize() {
    const r = this.getBoundingClientRect(), k = Math.min(devicePixelRatio || 1, 2) * this._res;
    let w = Math.max(1, Math.round(r.width * k)), h = Math.max(1, Math.round(r.height * k));
    if (w > 1280) { h = Math.round(h * 1280 / w); w = 1280; }
    if (w !== this._canvas.width || h !== this._canvas.height) { this._canvas.width = w; this._canvas.height = h; if (this._visible) this._draw(this._still ? this._t0 : performance.now() / 1000); }
  }
  _draw(t) {
    const g = gl(); if (!g) return;
    const pr = program(this._taps); if (!pr) return;
    const w = this._canvas.width, h = this._canvas.height, P = this._params;
    if (R.canvas.width < w || R.canvas.height < h) { R.canvas.width = Math.max(R.canvas.width, w); R.canvas.height = Math.max(R.canvas.height, h); }
    g.useProgram(pr.p); g.viewport(0, 0, w, h);
    g.bindBuffer(g.ARRAY_BUFFER, R.quad); g.enableVertexAttribArray(pr.aPos); g.vertexAttribPointer(pr.aPos, 3, g.FLOAT, false, 0, 0);
    if (pr.aUv >= 0) { g.bindBuffer(g.ARRAY_BUFFER, R.uv); g.enableVertexAttribArray(pr.aUv); g.vertexAttribPointer(pr.aUv, 2, g.FLOAT, false, 0, 0); }
    const u = pr.u, f1 = (n, x) => u[n] && g.uniform1f(u[n], x);
    f1("uTime", this._still ? this._t0 : t + this._t0); g.uniform2f(u.uResolution, w, h);
    f1("uBands", P.bands); f1("uSpeed", P.speed); f1("uFlowStrength", P.flow); f1("uShearStrength", P.shear); f1("uRippleShape", P.shape);
    f1("uRippleNoise", P.rippleNoise); f1("uRippleGap", P.rippleSpacing); g.uniform2f(u.uOrigin, this._origin[0], this._origin[1]);
    u.uTapRippleMode && g.uniform1i(u.uTapRippleMode, 0); u.uRippleCount && g.uniform1i(u.uRippleCount, 0);
    f1("uGradientMotion", P.motion); f1("uGradientSoftness", P.soft); f1("uGradientScale", P.scale); f1("uGradientRotation", P.rot); f1("uGradientWobble", P.wobble);
    f1("uSaturation", P.saturation); f1("uVibrancy", P.vibrancy); f1("uContrast", P.contrast);
    g.uniform3fv(u.uPalette, this._palette); u.uUseCustomPalette && g.uniform1i(u.uUseCustomPalette, 1); u.uPaintTexture && g.uniform1i(u.uPaintTexture, 0);
    g.drawArrays(g.TRIANGLE_STRIP, 0, 4);
    this._ctx.drawImage(R.canvas, 0, R.canvas.height - h, w, h, 0, 0, w, h);
    if (this.style.backgroundImage) this.style.backgroundImage = "";
  }
}
if (!customElements.get("hll-ripple")) customElements.define("hll-ripple", HLLRipple);
export { HLLRipple };
