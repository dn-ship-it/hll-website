# HLL × Cornerstone — Figma MCP prompt checklist

Use this in **Cursor** with **Figma MCP** connected and the file open:

`https://www.figma.com/design/m08lOU9DrNl1YNI4kfFvl5/HLL-%3C%3E-Cornerstone-India`

**Before you start:** open the **Pages** cluster (not node `16:3` — that is the project board). For each frame, copy its node id from the Figma URL (`node-id=XX-YY` → use `XX:YY` in prompts).

**Animation kit source:** copy folders from `HLL-UI-Demo` or Studio export into `src/components/` — see [hok-sdf-lensblur docs](https://hok-sdf-lensblur-lyart.vercel.app/docs.html).

**Stack assumed:** Next.js (App Router), TypeScript, Tailwind, shadcn/ui.

---

## Phase 0 — One-time setup (run once)

### 0.1 Connect Figma MCP

In Cursor: Settings → MCP → add/authenticate Figma. Confirm the agent can call Figma tools on file `m08lOU9DrNl1YNI4kfFvl5`.

### 0.2 Project bootstrap

```
Create a Next.js App Router project (TypeScript, Tailwind, shadcn/ui) for the HLL Cornerstone marketing site.

Requirements:
- Dark canvas background (#0c0c0c or from Figma styles)
- Route groups: (marketing) for public pages
- src/components/hll/ for LightFX components (empty placeholders for now)
- src/lib/content/ with mock JSON for news, tenders, careers
- Font families from Figma MCP (fetch file styles first)
- Respect prefers-reduced-motion globally

Do not build page UI yet — only shell, layout.tsx, globals.css tokens, and folder structure.
```

### 0.3 Pull design tokens from Figma

```
Using Figma MCP on file m08lOU9DrNl1YNI4kfFvl5:

1. List all pages and frames under the "Pages" section (not the Status/Tags board).
2. Export color styles, text styles, and spacing patterns into src/styles/figma-tokens.css (CSS variables).
3. Output a markdown inventory: page name | frame name | node id | width × height | mobile variant yes/no.

Save the inventory to docs/figma-frame-inventory.md and stop for my review before building screens.
```

### 0.4 Install animation kit

```
Copy the HLL LightFX components into src/components/hll/ from the repo/zip:
- hll-button/ (HLLButton)
- hll-outline-button/
- heading-anim/ (GradientRevealText, GradientRevealTextNormal)
- shader/, bottom-shader/, ripple/, cornerripple/, tag/

Dependencies: three, class-variance-authority.

Create src/components/hll/index.ts barrel export.
Add a client-only WebGL provider if needed so multiple shaders share one canvas context.
Add reduced-motion fallbacks (static gradient buttons when prefers-reduced-motion).
Do not restyle the shader engine — only integrate.
```

---

## Master prompt template (every screen)

Replace `{NODE}`, `{ROUTE}`, `{VARIANT}`, `{SCREEN_NAME}`.

```
Using Figma MCP, read frame node {NODE} in file m08lOU9DrNl1YNI4kfFvl5.

Build the {SCREEN_NAME} page at route {ROUTE} in Next.js:

1. Match layout, typography, spacing, and colors to Figma (use Dev Mode specs via MCP).
2. Use existing components from src/components/hll/:
   - Nav CTAs → HLLButton variant="{VARIANT}" (as="a" with href)
   - Hero headings → GradientRevealText variant="{VARIANT}"
   - Page atmosphere → Shader or BottomShader where the design shows glow/wash
   - Chips/filters → Tag
3. Use shadcn/ui for plain form fields, cards, tables (not shader buttons).
4. Static/mock content from src/lib/content/ — no API calls yet.
5. Responsive: if a mobile frame exists for this screen, implement it; else stack at md/lg breakpoints.
6. States: include loading skeleton and empty state for any list/block section.
7. Accessibility: semantic landmarks, focus order, alt text, reduced-motion safe.

When done: list any Figma elements you could not map 1:1 and what you approximated.
```

---

## Phase 1 — Shared chrome (do before inner pages)

### 1.1 Site header + mega nav

```
Figma MCP: find the header/nav component or frame (search "nav", "header", "menu" in Pages).

Build src/components/site-header.tsx:
- Logo, primary nav: Services, Industries, Engagement, About, Contact
- Each item uses HLLButton with variant matching the item (services, industries, engagement, about, contact)
- Mobile: hamburger → sheet/drawer, same variants
- Sticky behavior if shown in Figma
- Skip-to-content link

Use node id: {PASTE_HEADER_NODE}
```

**Follow-up:**

```
Compare site-header.tsx to Figma node {NODE} at 1440px and 375px. Fix padding, logo size, and active/hover states. Screenshot diff mentally — spacing must match within 4px.
```

### 1.2 Footer

```
Figma MCP: footer frame node {PASTE_FOOTER_NODE}.

Build src/components/site-footer.tsx:
- Links from Figma (social, legal, sitemap)
- BottomShader if design shows footer glow
- Match column layout desktop / stacked mobile
```

### 1.3 Root layout

```
Wire SiteHeader + SiteFooter into src/app/(marketing)/layout.tsx.
Add full-page Shader background only on routes where Figma shows it (home first).
Ensure main content is z-index above background effects.
```

---

## Phase 2 — Core pages (in order)

Do **Home first** — it becomes the reference for spacing and motion. Later pages are mostly copy + variant swaps.

### 2.1 Home

| Field | Value |
| --- | --- |
| Node | `{HOME_DESKTOP_NODE}` |
| Mobile | `{HOME_MOBILE_NODE}` or infer |
| Route | `/` |
| Variant | `services` (or hero variant from Figma) |

```
[Paste Master prompt with HOME values]

Extra for home:
- Hero: GradientRevealText slow variant for main headline
- Section reveals on scroll only if Figma prototype shows motion; otherwise static
- News/tenders teaser blocks: empty + loading states
- Link CTAs to /services, /industries, etc.
```

**Follow-ups:**

```
Fix home hero WebGL performance: pause Shader when tab hidden; cap DPR on mobile.
```

```
Add empty state when mock news array is [] — match Figma tone, do not use lorem.
```

---

### 2.2 Services

| Field | Value |
| --- | --- |
| Node | `{SERVICES_NODE}` |
| Route | `/services` |
| Variant | `services` |

```
[Paste Master prompt]

Extra: grid/list of 6 service verticals linking to /services/hll-ai, hll-trust, hll-foundation, hll-ontology, hll-people, hll-application.
Use Tag or card pattern from Figma.
```

---

### 2.3 Industries

| Node | `{INDUSTRIES_NODE}` | Route | `/industries` | Variant | `industries` |

```
[Paste Master prompt]
```

---

### 2.4 Engagement

| Node | `{ENGAGEMENT_NODE}` | Route | `/engagement` | Variant | `engagement` |

```
[Paste Master prompt]
```

---

### 2.5 About

| Node | `{ABOUT_NODE}` | Route | `/about` | Variant | `about` |

```
[Paste Master prompt]
```

---

### 2.6 Contact

| Node | `{CONTACT_NODE}` | Route | `/contact` | Variant | `contact` |

```
[Paste Master prompt]

Extra: contact form UI only (no POST yet):
- Fields from Figma
- Client validation
- Success/error toast UI
- HLLOutlineButton for secondary actions if in design
```

---

## Phase 3 — Service verticals (repeat pattern)

After **first** service page is approved, batch the rest with one prompt:

```
Using Figma MCP, compare frames for service verticals (AI, Trust, Foundation, Ontology, People, Application).

Use /services/hll-ai as the template (or build first from node {HLL_AI_NODE}).

Create:
- /services/hll-trust      variant hll-trust
- /services/hll-foundation variant hll-foundation
- /services/hll-ontology   variant hll-ontology
- /services/hll-people     variant hll-people
- /services/hll-application variant hll-application

For each: swap GradientRevealText + HLLButton + Shader variant colors per hll-button-variants.js.
Copy structure from Figma only where the vertical frame differs from the template.
Mock copy in src/lib/content/services/*.json.
```

**Per-vertical prompt (if batch fails):**

```
Build /services/hll-{name} from Figma node {NODE}. Same layout as /services/hll-ai. Variant hll-{name}. Mock content from src/lib/content/services/{name}.json.
```

---

## Phase 4 — Secondary templates (if in Figma Pages)

Run only if these frames exist in your inventory.

| Page | Route | Prompt snippet |
| --- | --- | --- |
| Tenders list | `/tenders` | Master prompt + table/list from Figma; mock rows; filter chips via Tag |
| Tender detail | `/tenders/[id]` | Master prompt + PDF download button (UI only) |
| Careers | `/careers` | Master prompt + notice list with expiry badge |
| News / media | `/media` | Master prompt + card grid |
| Article detail | `/media/[slug]` | Master prompt + prose styles from Figma |
| Downloads | `/downloads` | Master prompt + file list |
| Gallery | `/gallery` | Master prompt + lightbox if in design |
| Search results | `/search` | Master prompt + query param q= |
| 404 | `/not-found` | Match Figma or minimal dark page with HLLButton home |

---

## Phase 5 — Polish pass (run after all pages exist)

### 5.1 Visual QA vs Figma

```
For each route in docs/figma-frame-inventory.md, compare the implemented page to the Figma frame via MCP.

Output a table: Route | Match % | Issues (spacing, color, missing element) | Fix priority.

Then fix all P0 issues (wrong layout, missing sections) without changing shader internals.
```

### 5.2 Responsive sweep

```
Audit every route at 375px, 768px, 1440px.
Fix overflow, touch targets min 44px, WebGL canvas resize glitches.
Document any breakpoint that required guessing because Figma had no mobile frame.
```

### 5.3 Motion & a11y

```
- prefers-reduced-motion: disable Shader animation, keep static gradients
- Keyboard: tab through header, main, footer on every page
- Focus visible on HLLButton (already in kit CSS — verify)
- Pause WebGL when off-screen (IntersectionObserver)
```

### 5.4 Performance

```
Run Lighthouse on /. Target LCP < 2.5s on desktop.
Lazy-load below-fold shaders. Preload hero font only.
List remaining perf risks for low-end Android.
```

---

## Quick follow-up prompts (reuse often)

**Spacing fix**

```
Figma node {NODE} section "{SECTION_NAME}": padding/gap does not match. Re-read MCP specs and fix Tailwind classes. Target ±4px.
```

**Mobile**

```
Implement mobile layout from Figma node {MOBILE_NODE}. If none, collapse desktop grid to single column at max-md.
```

**Component swap**

```
Replace plain Button with HLLButton variant="{VARIANT}" on {PAGE} — same labels and hrefs.
```

**Empty / loading**

```
Add skeleton loader and empty state for {COMPONENT} on {ROUTE}. Match dark theme; no lorem ipsum.
```

**Copy variant**

```
Duplicate /services/hll-ai to new route using variant {VARIANT} and mock JSON — do not redesign layout.
```

---

## Your time budget (instruction-only)

| Phase | Agent time | Your review time |
| --- | --- | --- |
| 0 Setup + inventory | 4–8 h | 1–2 h |
| 1 Chrome | 4–6 h | 1 h |
| 2 Six core pages | 12–18 h | 3–5 h |
| 3 Six service verticals | 6–10 h | 1–2 h |
| 4 Secondary (if any) | 2–4 h per page | 20 min per page |
| 5 Polish | 8–12 h | 2–3 h |
| **Total (12-template site)** | **~40–55 h (~6–8 days)** | **~12–20 h (~2–3 days)** |

---

## Checklist — tick as you go

- [ ] Figma MCP authenticated
- [ ] `docs/figma-frame-inventory.md` generated and reviewed
- [ ] Animation kit in `src/components/hll/`
- [ ] Header + footer approved
- [ ] Home approved at desktop + mobile
- [ ] Services, Industries, Engagement, About, Contact
- [ ] Six `/services/hll-*` pages
- [ ] Secondary pages (if in Figma)
- [ ] Visual QA table complete
- [ ] Reduced-motion + keyboard pass
- [ ] Ready for API phase (separate checklist)

---

## Next phase (APIs — separate)

When UI is frozen, start a new chat:

```
Wire all marketing pages to Payload CMS (or Sanity). Replace mock JSON with API calls for pages, tenders, careers, media, contact POST. Keep all UI components unchanged — data layer only.
```

Use the API list in `src/data/estimate.ts` in this repo for endpoint scope.
