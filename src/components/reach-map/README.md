# ReachMap: the About page "Our Reach" map

An interactive world map, light mode only, that leads with our people and offices. There are no filters. Three kinds of pin, each its own button with its own icon:

| Pin | Looks like | Opens |
|---|---|---|
| Office | Dark square, building | The office type (registered office, registered business address, office) and the partners a client can reach there, with photographs, roles and email links. |
| Partners | Round, About gradient, person | Partners based in a place with no office (New York, North America, Singapore). |
| Our work | Smaller white square, briefcase, count | The engagements delivered there, in a compact list: service, client, project and headline figure, each linking to its engagement page. |

Pins never merge. Where they crowd (Europe, the Gulf), they spread apart and a thin line joins each pin to its true spot. When a place has both an office or partners and work, the card has a button that jumps to the other pin. Previous and Next step through every pin west to east. Everything sits inside the map: the card, Whole world (bottom left, once zoomed in) and the key (bottom right).

## Developer integration: step by step

### 1. Copy the files

Unzip `reach-map-embed.zip` and copy these into the website project. Keep the three component folders side by side so the relative imports resolve:

| From the zip | Into the site | What it is |
|---|---|---|
| `src/components/reach-map/` | your components folder, for example `src/components/reach-map/` | The map component, its data, styles and the partner photos (in `photos/`) |
| `src/components/hll-outline-button/` | the same components folder, beside `reach-map/` | The site's outline button, used for Close, Previous, Next, Whole world and the jump between pins |
| `src/components/hll-button/` | the same components folder | Only `hll-button-variants.js` is read (the gradient colours); copy the folder whole |
| `scripts/build-reach-map-data.mjs` | the site's `scripts/` folder | Regenerates the engagement list from a new handoff |

The partner photos live in `reach-map/photos/` and are imported by `reach-map-places.js`, so the site's build tool copies and links them with the code. There is no public folder to set up, and the photos work at any base path or subfolder (checked with the site served from `/about-us/`). Vite, webpack, Create React App and Next.js all handle these imports without extra configuration.

`src/pages/about-reach/` is the demo page. It shows the intended spacing and is not needed on the site.

### 2. Install the packages

```bash
npm install react@^18.3.1 react-dom@^18.3.1 class-variance-authority@^0.7.1 three@^0.164.1
```

React and React DOM are probably there already. `class-variance-authority` and `three` are what the outline button needs. There is no map library, tile server or API key: the country shapes ship as SVG paths in `reach-map-geo.js` (64 KB gzipped).

### 3. Fonts

The component uses the site's own fonts and does not load them: `'Aeonik Regular'` and `'Aeonik Light'` (the same `@font-face` names the HLL UI library registers) and Sometype Mono from Google Fonts. If the site names Aeonik differently, change the three `--reach-font*` variables at the top of `reach-map.css`.

### 4. Put it on the About page

```jsx
import { ReachMap } from '../components/reach-map';

export default function About() {
  return (
    <section className="about-reach">
      <ReachMap />
      {/* the ABOUT / Our Reach heading and the rest of the page follow */}
    </section>
  );
}
```

```css
/* Matches the approved design: a 1396 x 505 map inside a 1600px page with
   102px side margins. */
.about-reach {
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 clamp(16px, 6.4vw, 102px);
  box-sizing: border-box;
}
```

The map takes its parent's full width and sets its own height from that width: 2.76 : 1 from 1100px of map width, 2.2 : 1 from 820px, 1.45 : 1 from 560px, and a taller 1 : 1.2 card on phones. The parent needs a real width. A normal block element is fine; a shrink-to-fit parent (a flex item with no width, an inline-block) collapses it to zero.

**Next.js or another server-rendering framework:** the map measures the screen and handles touch, so it runs in the browser. In the Next.js App Router, add `'use client';` as the first line of `ReachMap.jsx`, or load it with `dynamic(() => import('../components/reach-map'), { ssr: false })`. Plain React, Vite and Create React App need nothing.

### 5. Links: what each one points at

| Link | Where it goes | Check |
|---|---|---|
| Each engagement row in a work card | `/engagements/<id>`, the handoff's `url_path` | All 34 paths match `SITE-MAP.xlsx` exactly. The engagement page template must answer at that path. |
| Each partner's email | `mailto:<Name>@hyperlycheelabs.com` | Opens the visitor's mail app |
| Partner photos | Imported from `reach-map/photos/`; the build gives them hashed file names | Nothing to configure. If a photo ever fails to load it is hidden and the person shows by name, so a broken image never appears |

If the site's routes differ, pass your own function, for example `<ReachMap engagementHref={(e) => '/work/' + e.id} />`. With a client-side router the plain links still work as full page loads. To keep navigation client-side, swap the `<a>` in `EngagementItem` (bottom of `ReachMap.jsx`) for the router's link component.

### 6. Check it before release

- Widths 320, 375, 768, 1024, 1366, 1600 and 2560: no sideways scroll, no overlapping pins, every card's contents inside the card.
- Desktop: hover a pin to see its label, click to open the card, drag to move, double click to zoom, Escape to close, left and right arrows to step.
- Phone: one finger scrolls the page straight past the map; two fingers move and pinch-zoom the map; a sideways one-finger drag shows "Use two fingers to move the map"; tapping a pin opens its card as a sheet at the bottom of the map; the card scrolls with one finger.
- Every engagement link opens its page and every email link opens a new message.

## Props

| Prop | Default | What it does |
|---|---|---|
| `engagementHref` | `(e) => e.href` | Link for each engagement row. `e.href` is the handoff's `url_path` (`/engagements/<id>`). Pass your own function for a router or a different scheme. |
| `className` | `''` | Extra class on the root. |

## Where the data comes from

| File | Edited by | Holds |
|---|---|---|
| `reach-map-places.js` | By hand | Pin coordinates, the offices and who is reachable at each, the people (name, role, photo, email, home location), and which ledger `location` lands on which pin. |
| `reach-map-engagements.js` | Generated | The 34 published engagements: name, service, industry, years, ledger location, first outcome figure, link. Never hand-edit. |
| `reach-map-geo.js` | Generated | Country outlines. Only regenerate when the map frame changes. |

To add or change a photo: save a square JPEG (320 x 320 is plenty) as `reach-map/photos/<name>.jpg`, add `import <name>Photo from './photos/<name>.jpg';` at the top of `reach-map-places.js`, and set that person's `photo: <name>Photo`.

A person shows on the card of every office whose `team` lists them, and on the card of every place in their own `home` list. A place with people and no office gets a Partners pin.

After each website handoff, regenerate the engagements:

```bash
node scripts/build-reach-map-data.mjs ~/Downloads/HLL-web-handoff-20261017
```

A new engagement with a ledger location already in `LOCATION_TO_PLACE` appears on its place's work pin with no other change. A new location needs one line in `PLACES` and one in `LOCATION_TO_PLACE`. Engagements marked Global or Cross-industry are not shown on the map.

## Behaviour

- **Pins** are real buttons with a 44 px touch area. Hovering shows the place, what the pin holds and, for offices and partners, their faces.
- **Opening a pin** flies the map to it. At 820 px and wider the card docks inside the map on the right. Below 820 it opens as a sheet over the bottom of the map, and the pin moves up above it.
- **Moving the map:** with a mouse, drag to pan and double click to zoom; a trackpad pinch zooms. A plain mouse wheel scrolls the page, never the map. On a touch screen, one finger always scrolls the page, and two fingers move and pinch-zoom the map, the same as an embedded Google map. A sideways one-finger drag shows a short "Use two fingers to move the map" note.
- **Card scrolling:** a long card scrolls inside itself with a thin scrollbar whose space is always reserved, so a computer set to show scrollbars never crowds the content.
- **Keyboard:** Tab reaches every pin and control, Escape closes the card, the left and right arrows step between pins while a card is open.
- **Reduced motion:** the fly-to becomes an instant cut and transitions switch off.
- Checked at 320, 375, 768, 1024, 1366, 1600 and 2560 px: no horizontal scroll, no overlapping pins, and all 20 cards with their contents inside the card.

## People and offices on the map (given by Hannan, 2026-10-23; emails 2026-10-24)

Every partner's card shows their email as a mail link, for example `Hannan@hyperlycheelabs.com`.

| Pin | Kind | Partners |
|---|---|---|
| Cupertino, California | Registered office | Hannan Hakim (Partner), Nilesh Nalnikar (Senior Partner) |
| Delaware | Registered business address | None listed |
| New York | Partners | Advaith Mohan (Partner) |
| North America | Partners | Nilesh Nalnikar (Senior Partner) |
| Amsterdam, Netherlands | Registered business address | Tej Haldule, Arjun Pathni (Partner, Operations) |
| Dubai, UAE | Office | Arjun Pathni |
| India | Office | Nilesh Nalnikar, Rima Sarkar (Associate Partner), Vidya Mohan (Partner) |
| Singapore | Partners | Santosh Maruwada (Associate Partner) |

## Open items in the data

- **Photos missing:** Vidya Mohan and Santosh Maruwada show by name only. Add their photos as described under "Where the data comes from".
- **Tej Haldule** has no role on file.
- **Advaith Mohan's photo** is the Ontology service page headshot, which carries a small HLL badge.
- **India office city** is not given, so the office sits on the India country pin.
- **Cloud** has no gradient variant of its own and borrows Foundation's.
- **Region pins** (North America, Europe, Middle East) mark anonymised work where the ledger names only a region. The card labels them "Region" so no pin claims a city it does not know.
