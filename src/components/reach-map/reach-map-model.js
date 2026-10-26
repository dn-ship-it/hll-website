// reach-map-model.js — pure functions behind the Reach map: projection,
// the markers on the map, spreading them apart, and view fitting.
// No React here, so the same logic can feed a server-rendered list later.
import { GEO_FRAME } from './reach-map-geo.js';
import { ENGAGEMENTS } from './reach-map-engagements.js';
import {
  PLACES,
  LOCATION_TO_PLACE,
  ENGAGEMENT_PLACE_OVERRIDES,
  OFFICES,
  PEOPLE,
} from './reach-map-places.js';

const K = GEO_FRAME.width / (2 * Math.PI);
const ym = (lat) => Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360));
const Y_TOP = K * ym(GEO_FRAME.latTop);

// Same Web Mercator frame as the generated country paths.
export function project(lat, lon) {
  return { x: GEO_FRAME.width / 2 + (lon * Math.PI * K) / 180, y: Y_TOP - K * ym(lat) };
}

export const WORLDWIDE = 'worldwide';

export function engagementPlace(e) {
  return ENGAGEMENT_PLACE_OVERRIDES[e.id] || LOCATION_TO_PLACE[e.location] || WORLDWIDE;
}

// Markers, ordered west to east so "next" travels around the world. Each
// place gets up to two separate markers:
//   office  — an office or registered address, with the people there
//   people  — partners based at a place with no office
//   work    — the engagements delivered there
// Engagements with no place (Global, Cross-industry) stay off the map.
export function buildMarkers() {
  const officeAt = new Map(OFFICES.map((o) => [o.placeId, o]));
  const workAt = new Map();
  for (const e of ENGAGEMENTS) {
    const placeId = engagementPlace(e);
    if (placeId === WORLDWIDE) continue;
    if (!workAt.has(placeId)) workAt.set(placeId, []);
    workAt.get(placeId).push(e);
  }
  const markers = [];
  for (const p of PLACES) {
    const office = officeAt.get(p.id) || null;
    const ids = new Set(office ? office.team : []);
    for (const [id, person] of Object.entries(PEOPLE)) if (person.home.includes(p.id)) ids.add(id);
    const people = [...ids].map((id) => ({ id, ...PEOPLE[id] })).filter((t) => t.name);
    const base = { place: p, ...project(p.lat, p.lon) };
    if (office || people.length) {
      markers.push({ ...base, id: `${office ? 'office' : 'people'}:${p.id}`, kind: office ? 'office' : 'people', office, people });
    }
    if (workAt.has(p.id)) markers.push({ ...base, id: `work:${p.id}`, kind: 'work', engagements: workAt.get(p.id) });
  }
  // Offices and people lead at the same longitude; work follows.
  return markers.sort((a, b) => a.place.lon - b.place.lon || (a.kind === 'work') - (b.kind === 'work'));
}

// Spread markers apart in screen space so every one stays its own button.
// Each marker starts at its true spot (two markers at one place start side
// by side), overlapping markers push each other away, and a weak spring
// pulls each back home. The caller draws a thin line from the true spot to
// any marker that moved. Markers whose spot is off screen are dropped.
export function spread(markers, view, width, height, minDist, spring = 0.04) {
  const s = width / view.w;
  const pts = [];
  const seen = new Map();
  for (const m of markers) {
    const ax = (m.x - view.x) * s;
    const ay = (m.y - view.y) * s;
    if (ax < -20 || ay < -20 || ax > width + 20 || ay > height + 20) continue;
    const n = seen.get(m.place.id) || 0;
    seen.set(m.place.id, n + 1);
    pts.push({ m, ax, ay, x: ax + (n ? minDist * 0.55 : 0), y: ay });
  }
  const pad = minDist / 2 + 4;
  for (let iter = 0; iter < 220; iter++) {
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const a = pts[i];
        const b = pts[j];
        let dx = b.x - a.x;
        let dy = b.y - a.y;
        let d = Math.hypot(dx, dy);
        if (d >= minDist) continue;
        if (d < 0.01) {
          const angle = (i * 2.399 + j) % (Math.PI * 2); // golden-angle fan for exact overlaps
          dx = Math.cos(angle);
          dy = Math.sin(angle);
          d = 1;
        }
        const push = (minDist - d) / 2;
        a.x -= (dx / d) * push;
        a.y -= (dy / d) * push;
        b.x += (dx / d) * push;
        b.y += (dy / d) * push;
      }
    }
    for (const p of pts) {
      p.x += (p.ax - p.x) * spring;
      p.y += (p.ay - p.y) * spring;
      p.x = Math.min(Math.max(p.x, pad), width - pad);
      p.y = Math.min(Math.max(p.y, pad), height - pad);
    }
  }
  return pts;
}

export const MIN_VIEW_WIDTH = 60;

// Smallest view at the stage's aspect ratio that contains every point with
// `pad` frame units around it, never wider than the world.
export function fitView(points, aspect, pad = 40, minWidth = MIN_VIEW_WIDTH) {
  const xs = points.map((p) => p.x);
  const ys = points.map((p) => p.y);
  let x0 = Math.min(...xs) - pad;
  let x1 = Math.max(...xs) + pad;
  let y0 = Math.min(...ys) - pad;
  let y1 = Math.max(...ys) + pad;
  let w = Math.max(x1 - x0, (y1 - y0) * aspect, minWidth);
  w = Math.min(w, GEO_FRAME.width);
  const h = w / aspect;
  return clampView({ x: (x0 + x1) / 2 - w / 2, y: (y0 + y1) / 2 - h / 2, w, h });
}

// Keep the view inside the frame where it can; when the view is taller
// than the frame (narrow phones), centre it vertically instead.
export function clampView(v) {
  const { width: FW, height: FH } = GEO_FRAME;
  const w = Math.min(Math.max(v.w, MIN_VIEW_WIDTH), FW);
  const h = (v.h / v.w) * w;
  const x = Math.min(Math.max(v.x, 0), FW - w);
  const y = h >= FH ? (FH - h) / 2 : Math.min(Math.max(v.y, 0), FH - h);
  return { x, y, w, h };
}

// The world view: the inhabited extent the pins live in, so the opening
// frame is not mostly polar ice.
export function worldView(aspect) {
  const corners = [project(62, -138), project(-30, 150)];
  return fitView(corners, aspect, 0, 100);
}
