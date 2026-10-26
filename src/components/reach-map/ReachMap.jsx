'use client';
// ReachMap.jsx — the About page's "Our Reach" map: an interactive world map
// that leads with our people and offices. Three kinds of pin, each its own
// button with its own icon:
//   office  — an office or registered address and the partners there
//   people  — partners based in a place with no office
//   work    — the engagements we delivered there
// Pins never merge: where they crowd, they spread apart and a thin line
// joins each one to its true spot.
//
// Self-contained: the country shapes are pre-projected SVG paths
// (reach-map-geo.js), so there is no map library, tile server or API key.
// The engagement list is generated from the website handoff
// (scripts/build-reach-map-data.mjs); places, offices and people live in
// reach-map-places.js. Buttons are the library's own HLLOutlineButton.
//
// Sizing: the component fills its container's width and sets its own
// height from the width. Layout decisions follow the component's own width
// (ResizeObserver and container queries), not the viewport. Light mode only.
import { memo, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { HLLOutlineButton } from '../hll-outline-button';
import { VARIANT_GRADIENTS } from '../hll-button/hll-button-variants.js';
import { COUNTRIES, GEO_FRAME } from './reach-map-geo.js';
import { ACCENT_VARIANT, SERVICE_VARIANT } from './reach-map-places.js';
import { buildMarkers, clampView, spread, worldView } from './reach-map-model.js';
import './reach-map.css';

const WIDE = 820; // the card docks inside the map at and above this width
const PANEL_W = 400;
const FOCUS_WIDTH = { city: 120, state: 150, country: 200, region: 320 };
const PRECISION_LABEL = { city: 'City', state: 'State', country: 'Country', region: 'Region' };
const TWEEN_MS = 700;
const NARROW_PIN_Y = 0.25; // narrow: the pin sits a quarter down, above the bottom sheet

const gradientCss = (variant) => {
  const stops = VARIANT_GRADIENTS[variant]?.colors || VARIANT_GRADIENTS.about.colors;
  return `linear-gradient(90deg, ${stops.join(', ')})`;
};

const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;

function markerSummary(m) {
  if (m.kind === 'work') return plural(m.engagements.length, 'engagement', 'engagements');
  const people = m.people.length ? plural(m.people.length, 'partner', 'partners') : null;
  return m.kind === 'office' ? [m.office.type, people].filter(Boolean).join(' · ') : people;
}

// An imported image is a URL string in Vite and webpack, and an object with
// a `src` in Next.js. Either way, return the URL.
const photoSrc = (photo) => (typeof photo === 'string' ? photo : photo?.src || null);

// A portrait that removes itself if the file fails to load, so a visitor
// never sees a broken image: the person then shows by name, as when no
// photo is on file.
function Photo({ photo, className, onMissing }) {
  const [failed, setFailed] = useState(false);
  const src = photoSrc(photo);
  if (!src || failed) return null;
  return (
    <img
      className={className}
      src={src}
      alt=""
      loading="lazy"
      decoding="async"
      onError={() => {
        setFailed(true);
        onMissing?.();
      }}
    />
  );
}

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
}

// Pin icons: one line weight, drawn on a 14px grid, coloured by the pin.
function Icon({ kind }) {
  const common = { width: 14, height: 14, viewBox: '0 0 14 14', fill: 'none', stroke: 'currentColor', strokeWidth: 1.2, 'aria-hidden': true };
  if (kind === 'office') {
    return (
      <svg {...common}>
        <path d="M2.5 12.5h9M3.5 12.5V2.5h5v10M8.5 6h2.5v6.5" strokeLinejoin="round" />
        <path d="M5.25 4.75h1.5M5.25 7h1.5M5.25 9.25h1.5" strokeLinecap="round" />
      </svg>
    );
  }
  if (kind === 'people') {
    return (
      <svg {...common}>
        <circle cx="7" cy="4.6" r="2.3" />
        <path d="M2.6 12.4c0-2.5 1.95-4.1 4.4-4.1s4.4 1.6 4.4 4.1" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <rect x="2" y="4.5" width="10" height="7.5" rx="1" />
      <path d="M5 4.5V3h4v1.5M2 8h10" strokeLinejoin="round" />
    </svg>
  );
}

// The country paths never change; only the parent <svg>'s viewBox does,
// so this stays out of every pan/zoom re-render.
const Countries = memo(function Countries({ lit, active }) {
  return (
    <g className="reach-map__countries">
      {COUNTRIES.map((c, i) => (
        <path
          key={i} // ids repeat (Australia and its outlying islands share 036); the list never reorders
          d={c.d}
          className={active === c.name ? 'is-active' : lit.has(c.name) ? 'is-lit' : undefined}
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </g>
  );
});

export default function ReachMap({
  engagementHref = (e) => e.href,
  className = '',
}) {
  const [selected, setSelected] = useState(null); // marker id or null
  const [stage, setStage] = useState({ w: 0, h: 0 });
  const [view, setView] = useState(null);
  const [touchHint, setTouchHint] = useState(false); // "use two fingers" note on phones

  const stageRef = useRef(null);
  const viewRef = useRef(null);
  const tweenRef = useRef(0);
  const dragRef = useRef({ pointers: new Map(), moved: false });
  const atWorldRef = useRef(true); // true while the view is the world view

  const markers = useMemo(() => buildMarkers(), []);
  const wide = stage.w >= WIDE;
  const aspect = stage.w && stage.h ? stage.w / stage.h : 2.4;
  const world = useMemo(() => worldView(aspect), [aspect]);
  const aspectRef = useRef(aspect);
  aspectRef.current = aspect;

  const commit = useCallback((v) => {
    viewRef.current = v;
    setView(v);
  }, []);

  const flyTo = useCallback(
    (target, isWorld = false) => {
      atWorldRef.current = isWorld;
      cancelAnimationFrame(tweenRef.current);
      const from = viewRef.current;
      const to = clampView(target);
      if (!from || prefersReducedMotion()) return commit(to);
      const t0 = performance.now();
      const step = (now) => {
        const t = Math.min(1, (now - t0) / TWEEN_MS);
        const e = 1 - Math.pow(1 - t, 3);
        const w = from.w + (to.w - from.w) * e;
        commit({ x: from.x + (to.x - from.x) * e, y: from.y + (to.y - from.y) * e, w, h: w / aspectRef.current });
        if (t < 1) tweenRef.current = requestAnimationFrame(step);
      };
      tweenRef.current = requestAnimationFrame(step);
    },
    [commit]
  );

  // Track the stage size; keep the view's centre and zoom across resizes.
  useLayoutEffect(() => {
    const el = stageRef.current;
    if (!el) return undefined;
    const measure = (width, height) => {
      if (!width || !height) return;
      setStage({ w: width, h: height });
      const a = width / height;
      const v = viewRef.current;
      if (!v || atWorldRef.current) return commit(worldView(a));
      const cx = v.x + v.w / 2;
      const cy = v.y + v.h / 2;
      commit(clampView({ x: cx - v.w / 2, y: cy - v.w / a / 2, w: v.w, h: v.w / a }));
    };
    // Measure once now so the first paint has the map, then follow resizes.
    const r = el.getBoundingClientRect();
    measure(r.width, r.height);
    const ro = new ResizeObserver(([entry]) => measure(entry.contentRect.width, entry.contentRect.height));
    ro.observe(el);
    return () => ro.disconnect();
  }, [commit]);

  useEffect(() => () => cancelAnimationFrame(tweenRef.current), []);

  const focusMarker = useCallback(
    (m) => {
      const a = aspectRef.current;
      const w = Math.min(FOCUS_WIDTH[m.place.precision] || 200, GEO_FRAME.width);
      // Centre the pin in the part of the map the card leaves visible:
      // left of the docked card when wide, above the bottom sheet when narrow.
      const stageW = stageRef.current?.clientWidth || 1;
      const h = w / a;
      if (stageW >= WIDE) {
        const visible = (stageW - PANEL_W - 32) / stageW;
        flyTo({ x: m.x - w * (visible / 2), y: m.y - h / 2, w, h });
      } else {
        flyTo({ x: m.x - w / 2, y: m.y - h * NARROW_PIN_Y, w, h });
      }
    },
    [flyTo]
  );

  const select = useCallback(
    (m) => {
      setSelected(m.id);
      focusMarker(m);
    },
    [focusMarker]
  );

  const showWorld = useCallback(() => flyTo(worldView(aspectRef.current), true), [flyTo]);

  const close = useCallback(() => {
    setSelected(null);
    showWorld();
  }, [showWorld]);

  const index = markers.findIndex((m) => m.id === selected);
  const step = (dir) => {
    const from = index < 0 ? (dir > 0 ? -1 : 0) : index;
    select(markers[(from + dir + markers.length) % markers.length]);
  };

  // Escape closes the card; arrow keys travel west and east while it is open.
  const onKeyDown = (e) => {
    if (e.target.closest?.('input, textarea, select')) return;
    if (e.key === 'Escape' && selected) close();
    if (selected && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')) {
      e.preventDefault();
      step(e.key === 'ArrowRight' ? 1 : -1);
    }
  };

  // ---- pan and pinch --------------------------------------------------
  // Zoom by `factor` around a point (sx, sy) in stage pixels. Reads sizes
  // from refs so the touch listeners below can call it without re-binding.
  const zoomAround = useCallback(
    (factor, sx, sy) => {
      const v = viewRef.current;
      const el = stageRef.current;
      if (!v || !el) return;
      const sw = el.clientWidth;
      const sh = el.clientHeight;
      const a = aspectRef.current;
      const s = v.w / sw;
      const px = v.x + sx * s;
      const py = v.y + sy * s;
      const w = Math.min(Math.max(v.w * factor, 60), worldView(a).w);
      const h = w / a;
      atWorldRef.current = false;
      commit(clampView({ x: px - (sx / sw) * w, y: py - (sy / sh) * h, w, h }));
    },
    [commit]
  );

  const panBy = useCallback(
    (dx, dy) => {
      const v = viewRef.current;
      const el = stageRef.current;
      if (!v || !el) return;
      const s = v.w / el.clientWidth;
      atWorldRef.current = false;
      commit(clampView({ ...v, x: v.x - dx * s, y: v.y - dy * s }));
    },
    [commit]
  );

  // Controls and the card sit inside the map; gestures on them never pan it.
  const onUi = (e) => Boolean(e.target.closest?.('.reach-map__overlay, .reach-map__panel'));

  // Mouse and pen drag the map. Touch is handled separately below: one
  // finger belongs to the page, two fingers move and zoom the map.
  const onPointerDown = (e) => {
    if (e.pointerType === 'touch' || e.button !== 0 || onUi(e)) return;
    cancelAnimationFrame(tweenRef.current);
    const d = dragRef.current;
    d.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    d.moved = false;
    d.start = { x: e.clientX, y: e.clientY };
  };

  const onPointerMove = (e) => {
    const d = dragRef.current;
    const prev = d.pointers.get(e.pointerId);
    if (!prev || !viewRef.current) return;
    if (!d.moved && Math.hypot(e.clientX - d.start.x, e.clientY - d.start.y) < 5) return;
    if (!d.moved) stageRef.current.setPointerCapture?.(e.pointerId);
    d.moved = true;
    panBy(e.clientX - prev.x, e.clientY - prev.y);
    d.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
  };

  const onPointerUp = (e) => {
    const d = dragRef.current;
    d.pointers.delete(e.pointerId);
    // Keep `moved` set until the click that follows a drag has been ignored.
    if (d.moved) setTimeout(() => (d.moved = false), 0);
  };

  // Touch: one finger scrolls the page as usual (the stage allows browser
  // panning, see reach-map.css), and a one-finger drag over the map shows a
  // short "use two fingers" note. Two fingers move and pinch-zoom the map;
  // their touchmove is cancelled so the page stays still meanwhile. Taps on
  // pins still arrive as clicks.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return undefined;
    const t = { last: null, start: null, multi: false, hintTimer: 0 };
    const mid = (ts) => {
      const r = el.getBoundingClientRect();
      return {
        x: (ts[0].clientX + ts[1].clientX) / 2 - r.left,
        y: (ts[0].clientY + ts[1].clientY) / 2 - r.top,
        d: Math.hypot(ts[0].clientX - ts[1].clientX, ts[0].clientY - ts[1].clientY),
      };
    };
    const onStart = (e) => {
      if (onUi(e)) return;
      if (e.touches.length >= 2) {
        e.preventDefault();
        cancelAnimationFrame(tweenRef.current);
        t.last = mid(e.touches);
        t.multi = true;
        setTouchHint(false);
      } else {
        t.start = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        t.last = null;
      }
    };
    const onMove = (e) => {
      if (onUi(e)) return;
      if (e.touches.length >= 2) {
        if (e.cancelable) e.preventDefault();
        const m = mid(e.touches);
        if (t.last) {
          panBy(m.x - t.last.x, m.y - t.last.y);
          if (t.last.d && m.d) zoomAround(t.last.d / m.d, m.x, m.y);
        }
        t.last = m;
        dragRef.current.moved = true;
      } else if (t.start && !t.multi) {
        const dx = Math.abs(e.touches[0].clientX - t.start.x);
        const dy = Math.abs(e.touches[0].clientY - t.start.y);
        if (dy > 14) t.start = null; // an up-or-down swipe is someone scrolling the page
        else if (dx > 14) {
          // A sideways one-finger drag looks like trying to move the map.
          t.start = null;
          setTouchHint(true);
          clearTimeout(t.hintTimer);
          t.hintTimer = setTimeout(() => setTouchHint(false), 1600);
        }
      }
    };
    const onEnd = (e) => {
      if (e.touches.length < 2) t.last = null;
      if (e.touches.length === 0 && t.multi) {
        t.multi = false;
        // Ignore the click a two-finger gesture can leave behind.
        setTimeout(() => (dragRef.current.moved = false), 0);
      }
    };
    el.addEventListener('touchstart', onStart, { passive: false });
    el.addEventListener('touchmove', onMove, { passive: false });
    el.addEventListener('touchend', onEnd);
    el.addEventListener('touchcancel', onEnd);
    return () => {
      clearTimeout(t.hintTimer);
      el.removeEventListener('touchstart', onStart);
      el.removeEventListener('touchmove', onMove);
      el.removeEventListener('touchend', onEnd);
      el.removeEventListener('touchcancel', onEnd);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [panBy, zoomAround]);

  // A trackpad pinch arrives as wheel + ctrlKey. Plain wheel scrolls the page.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return undefined;
    const onWheel = (e) => {
      if (!e.ctrlKey || !viewRef.current || onUi(e)) return;
      e.preventDefault();
      const r = el.getBoundingClientRect();
      zoomAround(Math.exp(e.deltaY * 0.01), e.clientX - r.left, e.clientY - r.top);
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  });

  const onDoubleClick = (e) => {
    if (e.target.closest('.reach-map__pin') || onUi(e)) return;
    const r = stageRef.current.getBoundingClientRect();
    zoomAround(0.5, e.clientX - r.left, e.clientY - r.top);
  };

  const clickPin = (fn) => () => {
    if (dragRef.current.moved) return;
    fn();
  };

  // ---- derived view data ----------------------------------------------
  const points = view && stage.w ? spread(markers, view, stage.w, stage.h, wide ? 36 : 35, wide ? 0.04 : 0.006) : [];
  const current = markers.find((m) => m.id === selected) || null;
  const lit = useMemo(() => new Set(markers.map((m) => m.place.country).filter(Boolean)), [markers]);
  const zoomed = view && view.w < world.w * 0.92;
  const sibling = current && markers.find((m) => m.place.id === current.place.id && m.id !== current.id);

  return (
    <section
      className={`reach-map ${wide ? 'reach-map--wide' : 'reach-map--narrow'} ${className}`}
      style={{ '--reach-accent': gradientCss(ACCENT_VARIANT) }}
      onKeyDown={onKeyDown}
      aria-label="Our reach: our offices, our partners and the work we have delivered around the world"
    >
      <div className="reach-map__frame">
        <div
          ref={stageRef}
          className={`reach-map__stage ${zoomed ? 'is-zoomed' : ''}`}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onDoubleClick={onDoubleClick}
        >
          {view && (
            <svg
              className="reach-map__svg"
              viewBox={`${view.x} ${view.y} ${view.w} ${view.h}`}
              preserveAspectRatio="xMidYMid meet"
              aria-hidden="true"
            >
              <rect className="reach-map__ocean" x={-GEO_FRAME.width} y={-GEO_FRAME.height} width={GEO_FRAME.width * 3} height={GEO_FRAME.height * 3} />
              <Countries lit={lit} active={current?.place.country || null} />
            </svg>
          )}

          {/* Leader lines from each true spot to a pin that had to move. */}
          <svg className="reach-map__leaders" width={stage.w} height={stage.h} aria-hidden="true">
            {points.map((p) => {
              const moved = Math.hypot(p.x - p.ax, p.y - p.ay) > 6;
              return (
                <g key={p.m.id}>
                  {moved && <line x1={p.ax} y1={p.ay} x2={p.x} y2={p.y} />}
                  <circle cx={p.ax} cy={p.ay} r={moved ? 2.5 : 0} />
                </g>
              );
            })}
          </svg>

          <ul className="reach-map__pins" aria-label="Offices, partners and work on the map">
            {points.map(({ m, x, y }) => {
              const isOn = m.id === selected;
              const flip = x > stage.w - 220 ? 'is-flip' : '';
              const photos = m.kind !== 'work' ? m.people.filter((p) => photoSrc(p.photo)).slice(0, 3) : [];
              return (
                <li key={m.id} className="reach-map__pin-slot" style={{ transform: `translate(${x}px, ${y}px)` }}>
                  <button
                    type="button"
                    className={`reach-map__pin reach-map__pin--${m.kind} ${isOn ? 'is-on' : ''} ${flip}`}
                    aria-label={`${m.place.label}: ${markerSummary(m)}`}
                    aria-expanded={isOn}
                    onClick={clickPin(() => (isOn ? close() : select(m)))}
                  >
                    <Icon kind={m.kind} />
                    {m.kind === 'work' && m.engagements.length > 1 && (
                      <span className="reach-map__count" aria-hidden="true">{m.engagements.length}</span>
                    )}
                    <span className="reach-map__tip" aria-hidden="true">
                      <span className="reach-map__tip-title">{m.place.label}</span>
                      <span className="reach-map__tip-meta">{markerSummary(m)}</span>
                      {photos.length > 0 && (
                        <span className="reach-map__tip-faces">
                          {photos.map((p) => (
                            <Photo key={p.id} photo={p.photo} />
                          ))}
                        </span>
                      )}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <p className={`reach-map__touch-hint ${touchHint ? 'is-shown' : ''}`} aria-hidden="true">
          Use two fingers to move the map
        </p>

        {zoomed && (
          <div className={`reach-map__overlay reach-map__overlay--bottom ${current ? 'is-covered' : ''}`}>
            <HLLOutlineButton variant={ACCENT_VARIANT} size="sm" onClick={showWorld}>
              Whole world
            </HLLOutlineButton>
          </div>
        )}

        <div className={`reach-map__legend ${current ? 'is-covered' : ''}`} aria-hidden="true">
          <span className="reach-map__key reach-map__key--office"><Icon kind="office" />Office</span>
          <span className="reach-map__key reach-map__key--people"><Icon kind="people" />Partners</span>
          <span className="reach-map__key reach-map__key--work"><Icon kind="work" />Our work</span>
        </div>

        {current && (
          <Panel
            key={current.id}
            marker={current}
            sibling={sibling}
            position={`${index + 1} of ${markers.length}`}
            onPrev={() => step(-1)}
            onNext={() => step(1)}
            onSibling={() => sibling && select(sibling)}
            onClose={close}
            engagementHref={engagementHref}
          />
        )}
      </div>
    </section>
  );
}

// The card for one pin. Office and people cards lead with the partners and
// their photographs; a work card lists the engagements in a compact form.
// When the same place has the other kind of pin, a button jumps to it.
function Panel({ marker: m, sibling, position, onPrev, onNext, onSibling, onClose, engagementHref }) {
  const ref = useRef(null);
  useEffect(() => {
    ref.current?.scrollTo?.(0, 0);
  }, [m.id]);

  const kindLabel = m.kind === 'office' ? m.office.type : m.kind === 'people' ? 'Partners on the ground' : 'Our work';
  const meta = [kindLabel, PRECISION_LABEL[m.place.precision]].join(' · ');
  const siblingLabel = sibling
    ? sibling.kind === 'work'
      ? `Our work here ${sibling.engagements.length}`
      : sibling.kind === 'office'
        ? 'Our office here'
        : 'Our partners here'
    : null;

  return (
    <aside ref={ref} className={`reach-map__panel reach-map__panel--${m.kind}`} aria-label={`${m.place.label}: ${kindLabel}`}>
      <header className="reach-map__panel-head">
        <div>
          <p className="reach-map__mono reach-map__mono--soft">{meta}</p>
          <h3 className="reach-map__title">{m.place.label}</h3>
          {m.place.sub && <p className="reach-map__sub">{m.place.sub}</p>}
        </div>
        <HLLOutlineButton variant={ACCENT_VARIANT} size="sm" onClick={onClose}>
          Close
        </HLLOutlineButton>
      </header>

      {m.kind !== 'work' && (
        <section className="reach-map__section">
          {m.people.length > 0 ? (
            <ul className={`reach-map__people ${m.people.some((p) => photoSrc(p.photo)) ? 'has-photos' : ''}`} aria-label="Partners you can reach here">
              {m.people.map((p) => (
                <li key={p.id} className={`reach-map__person ${photoSrc(p.photo) ? '' : 'is-no-photo'}`}>
                  <Photo className="reach-map__portrait" photo={p.photo} />
                  <span className="reach-map__person-body">
                    <span className="reach-map__person-name">{p.name}</span>
                    {p.role && <span className="reach-map__role">{p.role}</span>}
                    {p.email && (
                      <a className="reach-map__email" href={`mailto:${p.email}`}>
                        {p.email}
                      </a>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="reach-map__sub">Our {m.office.type.toLowerCase()} in {m.place.label}.</p>
          )}
        </section>
      )}

      {m.kind === 'work' && (
        <section className="reach-map__section">
          <ul className="reach-map__items">
            {m.engagements.map((e) => (
              <EngagementItem key={e.id} e={e} href={engagementHref(e)} />
            ))}
          </ul>
        </section>
      )}

      <footer className="reach-map__panel-foot">
        {sibling && (
          <HLLOutlineButton variant={ACCENT_VARIANT} size="sm" onClick={onSibling}>
            {siblingLabel}
          </HLLOutlineButton>
        )}
        <span className="reach-map__steps">
          <HLLOutlineButton variant={ACCENT_VARIANT} size="sm" onClick={onPrev} aria-label="Previous pin">
            Previous
          </HLLOutlineButton>
          <span className="reach-map__mono reach-map__mono--soft">{position}</span>
          <HLLOutlineButton variant={ACCENT_VARIANT} size="sm" onClick={onNext} aria-label="Next pin">
            Next
          </HLLOutlineButton>
        </span>
      </footer>
    </aside>
  );
}

function EngagementItem({ e, href }) {
  const service = SERVICE_VARIANT[e.serviceId] || ACCENT_VARIANT;
  return (
    <li className="reach-map__item">
      <a className="reach-map__item-link" href={href}>
        <span className="reach-map__item-body">
          <span className="reach-map__service" style={{ '--reach-service': gradientCss(service) }}>
            {e.service}
          </span>
          <span className="reach-map__name">{e.name}</span>
          <span className="reach-map__mono reach-map__mono--soft">
            {[e.title, e.outcome?.figure].filter(Boolean).join(' · ')}
          </span>
        </span>
        <span className="reach-map__arrow" aria-hidden="true">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round">
            <path d="M3 9L9 3M4.25 3H9v4.75" />
          </svg>
        </span>
      </a>
    </li>
  );
}
