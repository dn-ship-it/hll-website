# HLL Careers — team pill skyline

The image block for the Careers page ("Why work at HLL?"). Twelve team members, each cut out at three-quarter length inside a pill, with the live HLL ripple shader moving behind them. Light mode only.

Open `index.html` through any local server (ES modules do not load from `file://`), for example `npx serve .`, then resize the window.

## Files

| File | What it is |
|---|---|
| `team-skyline.js` | The component. Vanilla ES module, no dependencies. `mountTeamSkyline(el, options)` returns `{ relayout, destroy }`. |
| `team-skyline.css` | Styles. Import once. |
| `ripple-shader.js` | The ripple shader and the six variant palettes/params, copied unchanged from HLL-UI-Demo `src/components/ripple/` (commit 96311b9). If those files change, re-copy them; do not hand-edit values. |
| `team.js` | The people, in order, with their image, ripple variant and face position. |
| `TeamSkyline.jsx` | React wrapper (React 18). |
| `images/*.webp` | Transparent cut-outs, 1200px tall, top of head to mid-thigh. About 1.4 MB for all 12; they lazy-load. |
| `index.html` | Standalone demo. |

## Use it

React (the HLL-UI-Demo stack):

```jsx
import TeamSkyline from './team-skyline/TeamSkyline.jsx';
// copy images/ to public/images/team/
<TeamSkyline imageBase="/images/team/" />
```

Plain HTML:

```html
<link rel="stylesheet" href="team-skyline.css">
<section id="team" aria-label="The HLL team"></section>
<script type="module">
  import { mountTeamSkyline } from './team-skyline.js';
  import { TEAM } from './team.js';
  mountTeamSkyline(document.getElementById('team'), { team: TEAM, imageBase: 'images/' });
</script>
```

The block fills its parent's width and sets its own height. Put it straight into the Careers image block container; no fixed height on the parent.

## Responsive behaviour

Breakpoints are on the block's own width (ResizeObserver), not the viewport, so it works in any column:

| Block width | Layout | Approx. height |
|---|---|---|
| 1000px and up | one row of 12 | width / 2.2 (matches the Figma block) |
| 600–999px | two rows of 6 | about 1.2 × width |
| under 600px | one swipeable row, about 2.8 pills visible, scroll-snap | about 1.25 × width |

Pill heights follow a fixed skyline pattern (`heights` option). Everyone is drawn at the same scale; heads sit lower in short pills and the figure is cropped at the pill's bottom, so the row reads as a staggered group.

The 600/1000px breakpoints are my call; Figma only has 1512px and 402px artboards.

## Options

| Option | Default | |
|---|---|---|
| `team` | `[]` | Array from `team.js`. |
| `imageBase` | `'images/'` | Prefix for each `image`. |
| `heights` | 12-step pattern | Pill height as a share of row height. |
| `figure` | `0.80` | Person height as a share of row height. |
| `fps` | `30` | Ripple frame rate. |
| `renderScale` | `0.8` | Ripple resolution vs CSS pixels. Lower it (e.g. 0.55) if a low-end device struggles. |
| `hoverSpeed` | `3` | Ripple speed-up on hover/focus. |
| `rippleBands` | `1.4` | Multiplies each variant's band count. |
| `rippleContrast` | `0.35` | Added to each variant's contrast. |
| `rippleFlow` | `3` | Multiplies flow (how far the rings bend the colour field). |
| `rippleShear` | `2` | Multiplies shear. |
| `rippleSpacing` | `0.45` | Caps the ring-spacing exponent; lower keeps rings visible further from the centre. |
| `ringY` | `0.5` | Ring centre: 0.5 behind the face, 0 at the pill top. |

The ripple options strengthen the repo's ripple so the rings read inside narrow pills. They are applied at draw time; `ripple-shader.js` keeps the repo's values untouched. Setting `rippleBands: 1, rippleContrast: 0, rippleFlow: 1, rippleShear: 1, rippleSpacing: null` gives the repo's own, much subtler look.

## Performance

- One shared WebGL context renders all 12 ripples (each pill then copies its frame into a 2D canvas). Browsers cap WebGL contexts at about 16, so do not switch to one context per pill.
- Ripples render at about half resolution and 30 fps, pause when the block is off screen (IntersectionObserver) or the tab is hidden.
- `destroy()` stops the loop, disconnects observers and releases the GL context. The React wrapper calls it on unmount.

## Accessibility and fallbacks

- The block is a list; each person is a focusable `figure` with `alt` set to their full name and a first-name caption on hover/focus.
- `prefers-reduced-motion: reduce`: ripples render one still frame; no animation.
- No WebGL, a shader compile error or a lost context: pills fall back to a static gradient of their ripple palette (`.is-static`).

## Adding or replacing a person

1. Cut-out: transparent PNG or WebP, cropped from the top of the head to mid-thigh, about 1200px tall, front-facing, soft white studio light.
2. Add an entry to `team.js`: `name`, `caption` (first name), `image`, `variant` (one of the six keys in `ripple-shader.js`; avoid repeating a neighbour's), `aspect` (width / height), `headX` (horizontal centre of the head, 0–1, usually about 0.5) and `faceY` (vertical centre of the face, 0–1, usually 0.13–0.15). `headX` and `faceY` only steer the crop and where the ripple rings centre.
3. The layout is built for 12; with a different count, adjust `heights` so the pattern still steps up and down.

## Image notes

Outfits and bodies were generated; every face is the person's approved headshot, aligned and blended back in (measured difference from the headshot under 4/255 on average). Re-run the same process for new team members rather than generating faces.
