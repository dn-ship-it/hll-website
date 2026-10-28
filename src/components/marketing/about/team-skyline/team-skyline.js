// team-skyline.js — HLL Careers "pill skyline" team block.
// Vanilla ES module, no dependencies. One shared WebGL context renders the
// HLL-UI-Demo ripple shader for every pill, so 12 pills cost one GL context.
// Usage: const s = mountTeamSkyline(el, { team: TEAM, imageBase: '/images/team/' }); s.destroy();
import { RIPPLE_FRAG, RIPPLE_VERT, RIPPLE_VARIANTS } from './ripple-shader.js';

const DEFAULTS = {
  team: [],
  imageBase: 'images/',
  // pill height as a share of the row height, repeated across the row
  heights: [0.78, 0.96, 0.70, 0.88, 1.0, 0.74, 0.92, 0.66, 0.84, 0.98, 0.72, 0.90],
  figure: 0.80,      // person height (top of head to mid-thigh) as a share of the row height
  fps: 30,
  renderScale: 0.8,  // ripple render resolution vs CSS pixels
  hoverSpeed: 3,     // ripple speed multiplier on hover / focus
  // Ripple visibility in narrow pills. These scale the repo's per-variant values at draw time;
  // ripple-shader.js stays untouched. rippleBands 1, rippleContrast 0, rippleFlow 1, rippleShear 1,
  // rippleSpacing null and ringY 0.5 reproduce the repo's own (much subtler) look.
  rippleBands: 1.4,    // multiplies each variant's band count (more rings)
  rippleContrast: 0.35, // added to each variant's contrast
  rippleFlow: 3,       // multiplies flow (how far the rings bend the gradient)
  rippleShear: 2,      // multiplies shear
  rippleSpacing: 0.45, // caps the ring-spacing exponent; lower = rings stay visible further out
  ringY: 0.5,         // ring centre: 0.5 = behind the face; lower values move it toward the pill top
};

// Container-width breakpoints (the block responds to its own width, not the viewport).
//  >= 1000px: one row of 12, 2.2:1 overall
//  600-999px: two rows of 6
//  < 600px:   one swipeable row, about 2.8 pills visible
function layoutFor(w) {
  if (w >= 1000) return { mode: 'row', cols: 12, ratio: 5.6 };
  if (w >= 600) return { mode: 'rows', cols: 6, ratio: 3.4 };
  return { mode: 'scroll', cols: 0, ratio: 3.3, visible: 2.8 };
}

function createRenderer() {
  const canvas = document.createElement('canvas');
  canvas.width = 64; canvas.height = 64;
  const gl = canvas.getContext('webgl', { preserveDrawingBuffer: true, antialias: false, premultipliedAlpha: false });
  if (!gl) return null;
  const compile = (type, src) => {
    const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
    return s;
  };
  let prog;
  try {
    prog = gl.createProgram();
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, RIPPLE_VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, RIPPLE_FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog));
  } catch (e) { console.warn('[team-skyline] ripple shader unavailable, using static gradients', e); return null; }
  gl.useProgram(prog);
  const attr = (name, data, size) => {
    const loc = gl.getAttribLocation(prog, name); if (loc < 0) return;
    const b = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, b);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, size, gl.FLOAT, false, 0, 0);
  };
  attr('aPosition', new Float32Array([0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0]), 3);
  attr('aTexCoord', new Float32Array([0, 0, 1, 0, 0, 1, 1, 1]), 2);
  const locs = {};
  const u = (n) => (n in locs ? locs[n] : (locs[n] = gl.getUniformLocation(prog, n)));
  gl.uniform1i(u('uTapRippleMode'), 0);
  gl.uniform1i(u('uRippleCount'), 0);
  gl.uniform1i(u('uUseCustomPalette'), 1);
  const palettes = {};
  for (const [k, v] of Object.entries(RIPPLE_VARIANTS)) {
    palettes[k] = new Float32Array(v.colors.flatMap((h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255)));
  }
  let lost = false;
  canvas.addEventListener('webglcontextlost', (e) => { e.preventDefault(); lost = true; });

  return {
    get lost() { return lost; },
    // renders one frame of a variant at w x h into the shared canvas, then copies it into `target`
    draw(target, variant, w, h, t, ox, oy, tune = {}) {
      if (lost) return false;
      const V = RIPPLE_VARIANTS[variant] || RIPPLE_VARIANTS['hll-application'];
      const P = { ...V.params, bands: V.params.bands * (tune.bands || 1), contrast: V.params.contrast + (tune.contrast || 0),
        flow: V.params.flow * (tune.flow || 1), shear: V.params.shear * (tune.shear || 1),
        rippleSpacing: tune.spacing ? Math.min(V.params.rippleSpacing, tune.spacing) : V.params.rippleSpacing };
      if (canvas.width < w || canvas.height < h) {
        canvas.width = Math.max(canvas.width, w); canvas.height = Math.max(canvas.height, h);
      }
      gl.viewport(0, 0, w, h);
      gl.uniform1f(u('uTime'), t); gl.uniform2f(u('uResolution'), w, h);
      gl.uniform1f(u('uBands'), P.bands); gl.uniform1f(u('uSpeed'), P.speed);
      gl.uniform1f(u('uFlowStrength'), P.flow); gl.uniform1f(u('uShearStrength'), P.shear);
      gl.uniform1f(u('uRippleShape'), P.shape); gl.uniform1f(u('uRippleNoise'), P.rippleNoise);
      gl.uniform1f(u('uRippleGap'), P.rippleSpacing); gl.uniform2f(u('uOrigin'), ox, oy);
      gl.uniform1f(u('uGradientMotion'), P.motion); gl.uniform1f(u('uGradientSoftness'), P.soft);
      gl.uniform1f(u('uGradientScale'), P.scale); gl.uniform1f(u('uGradientRotation'), P.rot);
      gl.uniform1f(u('uGradientWobble'), P.wobble); gl.uniform1f(u('uSaturation'), P.saturation);
      gl.uniform1f(u('uVibrancy'), P.vibrancy); gl.uniform1f(u('uContrast'), P.contrast);
      gl.uniform3fv(u('uPalette'), palettes[variant] || palettes['hll-application']);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      const ctx = target.getContext('2d');
      ctx.drawImage(canvas, 0, canvas.height - h, w, h, 0, 0, target.width, target.height);
      return true;
    },
    destroy() { const ext = gl.getExtension('WEBGL_lose_context'); if (ext) ext.loseContext(); },
  };
}

export function mountTeamSkyline(root, options = {}) {
  const o = { ...DEFAULTS, ...options };
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  root.classList.add('hll-skyline');
  root.innerHTML = '';
  const track = document.createElement('div');
  track.className = 'hll-skyline__track';
  track.setAttribute('role', 'list');
  root.appendChild(track);

  const pills = o.team.map((p, i) => {
    const fig = document.createElement('figure');
    fig.className = 'hll-skyline__pill';
    fig.setAttribute('role', 'listitem');
    fig.tabIndex = 0;
    const V = RIPPLE_VARIANTS[p.variant] || RIPPLE_VARIANTS['hll-application'];
    fig.style.setProperty('--fallback', `linear-gradient(160deg, ${V.colors.join(', ')})`);
    const canvas = document.createElement('canvas');
    canvas.setAttribute('aria-hidden', 'true');
    const img = document.createElement('img');
    img.src = o.imageBase + p.image; img.alt = p.name;
    img.loading = 'lazy'; img.decoding = 'async'; img.draggable = false;
    const cap = document.createElement('figcaption');
    cap.textContent = p.caption || p.name;
    fig.append(canvas, img, cap);
    track.appendChild(fig);
    const s = { p, fig, canvas, img, t: 1.7 + i * 1.37, speed: 1, target: 1, w: 0, h: 0, ox: 0.5, oy: 0.5 };
    const on = () => { s.target = o.hoverSpeed; };
    const off = () => { s.target = 1; };
    fig.addEventListener('pointerenter', on); fig.addEventListener('pointerleave', off);
    fig.addEventListener('focus', on); fig.addEventListener('blur', off);
    return s;
  });

  let gl = createRenderer();
  if (!gl) root.classList.add('is-static');

  function layout() {
    const W = root.clientWidth; if (!W) return;
    const L = layoutFor(W);
    const gap = Math.round(Math.min(14, Math.max(6, W * 0.008)));
    let pw;
    if (L.mode === 'scroll') pw = (W - gap * Math.floor(L.visible)) / L.visible;
    else pw = (W - gap * (L.cols - 1)) / L.cols;
    const rowH = pw * L.ratio;
    root.dataset.mode = L.mode;
    root.style.setProperty('--gap', gap + 'px');
    root.style.setProperty('--cols', L.cols || 1);
    root.style.setProperty('--pill-w', pw + 'px');
    root.style.setProperty('--row-h', rowH + 'px');
    const fig = o.figure * rowH;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    pills.forEach((s, i) => {
      const ph = rowH * o.heights[i % o.heights.length];
      const pillTop = rowH - ph;
      const headTop = Math.max(rowH - fig + rowH * 0.012, pillTop + pw * 0.5) - pillTop;
      const imgW = fig * s.p.aspect;
      s.fig.style.height = ph + 'px';
      Object.assign(s.img.style, { height: fig + 'px', width: imgW + 'px', top: headTop + 'px', left: (pw / 2 - s.p.headX * imgW) + 'px' });
      const faceV = 1 - (headTop + s.p.faceY * fig) / ph; // face height in shader space (v runs bottom-up)
      s.oy = faceV + (1 - faceV) * (0.5 - o.ringY) * 2; // ringY 0.5 = face, 0 = pill top
      s.w = Math.max(24, Math.round(pw * o.renderScale * dpr * 0.75));
      s.h = Math.max(48, Math.round(ph * o.renderScale * dpr * 0.75));
      s.canvas.width = s.w; s.canvas.height = s.h;
    });
    drawAll(0);
  }

  const tune = { bands: o.rippleBands, contrast: o.rippleContrast, flow: o.rippleFlow, shear: o.rippleShear, spacing: o.rippleSpacing };
  function drawAll(dt) {
    if (!gl || gl.lost) { if (gl && gl.lost) root.classList.add('is-static'); return; }
    const still = reduce.matches;
    for (const s of pills) {
      if (!still) { s.speed += (s.target - s.speed) * Math.min(1, dt * 6); s.t += dt * s.speed; }
      gl.draw(s.canvas, s.p.variant, s.w, s.h, s.t, s.ox, s.oy, tune);
    }
  }

  let visible = false, raf = 0, last = 0, acc = 0;
  const step = 1 / o.fps;
  function tick(now) {
    raf = 0;
    if (!visible || document.hidden || reduce.matches) return;
    const dt = last ? Math.min(0.1, (now - last) / 1000) : 0; last = now; acc += dt;
    if (acc >= step) { drawAll(acc); acc = 0; }
    raf = requestAnimationFrame(tick);
  }
  const start = () => { if (!raf && visible && !document.hidden && !reduce.matches && gl) { last = 0; raf = requestAnimationFrame(tick); } };
  const stop = () => { if (raf) cancelAnimationFrame(raf); raf = 0; };

  const ro = new ResizeObserver(() => layout());
  ro.observe(root);
  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; visible ? start() : stop(); }, { rootMargin: '100px' });
  io.observe(root);
  const onVis = () => (document.hidden ? stop() : start());
  document.addEventListener('visibilitychange', onVis);
  const onMotion = () => { stop(); drawAll(0); start(); };
  reduce.addEventListener('change', onMotion);
  layout();

  return {
    relayout: layout,
    destroy() {
      stop(); ro.disconnect(); io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      reduce.removeEventListener('change', onMotion);
      if (gl) gl.destroy(); gl = null;
      root.innerHTML = ''; root.classList.remove('hll-skyline', 'is-static');
    },
  };
}
