export const headline = {
  recommendedDays: "23–33",
  recommendedHours: "186–260",
  team: "1 engineer + Cursor",
  animationSavedWeeks: "3–4",
} as const;

export const scenarios = [
  {
    id: "ui",
    name: "UI only",
    subtitle: "Figma screens + existing LightFX kit, mock content",
    days: "12–17",
    hours: "98–136",
    people: "1 engineer + Cursor",
    fit: "Design review / stakeholder demo",
  },
  {
    id: "ui-api",
    name: "UI + APIs",
    subtitle: "Recommended: production frontend wired to content APIs",
    days: "23–33",
    hours: "186–260",
    people: "1 engineer + Cursor",
    fit: "Launchable site with CMS-backed pages",
    recommended: true,
  },
  {
    id: "rfp",
    name: "Full HLL RFP",
    subtitle: "Bilingual GIGW CMS, tenders, chatbot, STQC, migration",
    days: "55–75",
    hours: "440–600",
    people: "2 engineers + Cursor",
    fit: "Matches HLL Lifecare tender (90 calendar days)",
  },
] as const;

export const sources = [
  {
    name: "Figma",
    status: "Partial",
    detail:
      "File HLL <> Cornerstone India (key m08lOU9DrNl1YNI4kfFvl5). Node 16:3 is the project board (Cover, Pages, Status, Tags, Master). Export is restricted; inspect/dev mode needs a Figma login. Actual marketing screens sit in the Pages cluster and were not fully zoomed.",
  },
  {
    name: "Animation kit",
    status: "Analyzed",
    detail:
      "Live demo at hok-sdf-lensblur-lyart.vercel.app. Eight copy-paste React components plus LightFX Studio and SDF lens-blur / circle-merge playgrounds. GitHub HLL-UI-Demo is private; local zips were not on this machine.",
  },
  {
    name: "Existing HLL site + RFP",
    status: "Mapped",
    detail:
      "lifecarehll.com sitemap (~60 public URLs) and HLL/CHO/IT/CC/2024 RFP (90-day bilingual CMS, tenders, careers, media, chatbot, GIGW/STQC).",
  },
] as const;

export const ia = {
  nav: [
    { id: "services", label: "Services", color: "#F7A567" },
    { id: "industries", label: "Industries", color: "#0352B2" },
    { id: "engagement", label: "Engagement", color: "#F9B535" },
    { id: "about", label: "About", color: "#9AB4D3" },
    { id: "contact", label: "Contact", color: "#076EB8" },
  ],
  services: [
    { id: "hll-ai", label: "AI", colors: ["#3773FF", "#BCA6D6"] },
    { id: "hll-trust", label: "Trust", colors: ["#129562", "#7CBAAA"] },
    { id: "hll-foundation", label: "Foundation", colors: ["#FF5A1E", "#CC8B93"] },
    { id: "hll-ontology", label: "Ontology", colors: ["#7455FF", "#FFB26A"] },
    { id: "hll-people", label: "People", colors: ["#FF9042", "#FFEEC7"] },
    { id: "hll-application", label: "Application", colors: ["#FF1F1F", "#72AAFF"] },
  ],
} as const;

export const animationKit = [
  {
    name: "HLLButton",
    folder: "hll-button",
    role: "Primary nav + CTA. WebGL LightFX fill, 11 variants, sm/md/lg, loading/disabled.",
    effortIfNew: "5–7 days",
    effortNow: "4–6 hours to mount and theme",
  },
  {
    name: "HLLOutlineButton",
    folder: "hll-outline-button",
    role: "Secondary / outline CTA with the same shader engine.",
    effortIfNew: "2–3 days",
    effortNow: "2–3 hours",
  },
  {
    name: "GradientRevealText",
    folder: "heading-anim",
    role: "Hero/heading reveal. Slow 1200ms leak sweep + Normal 600ms sweep.",
    effortIfNew: "2–3 days",
    effortNow: "2–3 hours",
  },
  {
    name: "Shader",
    folder: "shader",
    role: "Full-viewport background shader, variant-tinted.",
    effortIfNew: "4–6 days",
    effortNow: "3–4 hours",
  },
  {
    name: "BottomShader",
    folder: "bottom-shader",
    role: "Footer/page-end wash with fade overlay.",
    effortIfNew: "2 days",
    effortNow: "2 hours",
  },
  {
    name: "Ripple / CornerRipple",
    folder: "ripple, cornerripple",
    role: "Pointer-driven full-page ripple layers.",
    effortIfNew: "3–4 days",
    effortNow: "3–4 hours",
  },
  {
    name: "Tag",
    folder: "tag",
    role: "Filter/status chips with shader fill and optional remove.",
    effortIfNew: "1–2 days",
    effortNow: "1–2 hours",
  },
  {
    name: "SDF Lens Blur + Circle Merge",
    folder: "demo playgrounds",
    role: "Hero/atmosphere effects. Studio exports React/Framer snippets.",
    effortIfNew: "1–2 weeks",
    effortNow: "4–8 hours if a hero uses them",
  },
] as const;

export const workstreams = [
  {
    id: "setup",
    area: "UI",
    name: "Foundation",
    hours: { opt: 8, likely: 12, pess: 16 },
    alreadyHave: "Next.js/Tailwind stack choice; LightFX runtime exists",
    work: "App shell, design tokens from Figma, fonts, routing, dark canvas, responsive grid.",
  },
  {
    id: "kit",
    area: "UI",
    name: "Integrate animation kit",
    hours: { opt: 12, likely: 16, pess: 24 },
    alreadyHave: "All 8 production components + Studio presets + docs",
    work: "Copy components in, shared Three.js context, reduced-motion fallbacks, performance budget.",
  },
  {
    id: "home",
    area: "UI",
    name: "Homepage",
    hours: { opt: 16, likely: 20, pess: 28 },
    alreadyHave: "Hero heading + button + shader primitives",
    work: "Hero, scroll sections, motion choreography, mobile breakpoints, empty/error of featured content.",
  },
  {
    id: "nav5",
    area: "UI",
    name: "Five primary templates",
    hours: { opt: 24, likely: 32, pess: 48 },
    alreadyHave: "Variant colors for Services / Industries / Engagement / About / Contact",
    work: "One template per nav item, shared header/footer, list + detail layouts, forms on Contact.",
  },
  {
    id: "svc6",
    area: "UI",
    name: "Six service verticals",
    hours: { opt: 16, likely: 24, pess: 36 },
    alreadyHave: "hll-ai / trust / foundation / ontology / people / application gradients",
    work: "Same layout, different copy/media/shader variant. Cursor repeats fast once the first is locked.",
  },
  {
    id: "chrome",
    area: "UI",
    name: "Chrome + a11y",
    hours: { opt: 12, likely: 16, pess: 24 },
    alreadyHave: "Button hover/focus/disabled states in the kit",
    work: "Mega nav, footer, search UI, skip link, A−/A/A+ font scale, keyboard, reduced motion.",
  },
  {
    id: "responsive",
    area: "UI",
    name: "Responsive polish",
    hours: { opt: 10, likely: 16, pess: 24 },
    alreadyHave: "Kit components scale via size prop",
    work: "375 / 768 / 1440 passes, WebGL canvas resize, touch targets, long Hindi strings later.",
  },
  {
    id: "cms-pages",
    area: "API",
    name: "Pages, media, i18n fields",
    hours: { opt: 16, likely: 24, pess: 32 },
    alreadyHave: "None — new",
    work: "Headless CMS (Payload/Sanity) or Next route handlers: pages, blocks, media, drafts, preview.",
  },
  {
    id: "catalog",
    area: "API",
    name: "Products / services catalog",
    hours: { opt: 12, likely: 16, pess: 24 },
    alreadyHave: "None — new",
    work: "Categories, product/service records, related media, listing + detail endpoints.",
  },
  {
    id: "tenders",
    area: "API",
    name: "Tenders",
    hours: { opt: 12, likely: 16, pess: 24 },
    alreadyHave: "None — new",
    work: "CRUD, file attachments, expiry → archive job, corrigenda, public list/filter API.",
  },
  {
    id: "careers",
    area: "API",
    name: "Careers / notices",
    hours: { opt: 6, likely: 8, pess: 12 },
    alreadyHave: "None — new",
    work: "Employment notices with expiry, document attach, link out to recruitment portal.",
  },
  {
    id: "contact",
    area: "API",
    name: "Contact, feedback, locations",
    hours: { opt: 8, likely: 12, pess: 16 },
    alreadyHave: "None — new",
    work: "Enquiry form, locations, optional complaint ticket, rate-limit, email notify.",
  },
  {
    id: "search",
    area: "API",
    name: "Search",
    hours: { opt: 6, likely: 8, pess: 16 },
    alreadyHave: "None — new",
    work: "Full-text across pages/tenders/media. Start with Postgres FTS; upgrade later if needed.",
  },
  {
    id: "admin",
    area: "API",
    name: "Admin / CMS UI",
    hours: { opt: 16, likely: 24, pess: 32 },
    alreadyHave: "None — new",
    work: "Editors for pages/tenders/media, roles, audit trail. Payload admin is the fast path.",
  },
  {
    id: "qa",
    area: "QA",
    name: "QA, SEO, performance",
    hours: { opt: 12, likely: 16, pess: 24 },
    alreadyHave: "Kit playgrounds already stress WebGL",
    work: "Lighthouse, shader FPS on mid devices, OG/meta, sitemap, error states, visual QA vs Figma.",
  },
] as const;

export function hoursFor(
  which: "opt" | "likely" | "pess",
  area?: "UI" | "API" | "QA"
) {
  return workstreams
    .filter((w) => (area ? w.area === area : true))
    .reduce((sum, w) => sum + w.hours[which], 0);
}

export const apis = [
  {
    group: "Content",
    items: [
      "GET/PUT /pages and /pages/[slug] — CMS pages, blocks, SEO, draft/publish",
      "GET /nav — menu tree (add/disable items from admin)",
      "GET/POST /media — images, PDF, video; signed upload",
      "GET /globals — footer, social, visitor-counter, bilingual strings",
    ],
  },
  {
    group: "Catalog",
    items: [
      "GET /products and /products/[slug]",
      "GET /services and /services/[slug] — AI, Trust, Foundation, Ontology, People, Application",
      "GET /industries",
    ],
  },
  {
    group: "Tenders",
    items: [
      "GET /tenders?status=open|archived&category=",
      "GET /tenders/[id] — notice + documents + corrigenda",
      "Admin POST/PATCH/DELETE — expiry date auto-archives",
    ],
  },
  {
    group: "Careers & media",
    items: [
      "GET /careers — employment notices with expiry",
      "GET /news, /press, /publications, /downloads",
      "GET /gallery",
    ],
  },
  {
    group: "Public forms",
    items: [
      "POST /contact — enquiry",
      "POST /feedback and POST /complaints",
      "GET /locations",
    ],
  },
  {
    group: "Platform",
    items: [
      "GET /search?q= — pages, tenders, media",
      "POST /auth — admin only (no public accounts)",
      "GET /audit — admin trail",
    ],
  },
] as const;

export const existingHllPages = [
  "Home",
  "About (intro, vision, history, milestones, CMD, board, management, SHE policy)",
  "Business (plants, products landing, services, partners)",
  "Media (HLL in media, family, Prateeksha, Samanwaya, gallery)",
  "Tenders + vendor registration",
  "Careers",
  "RTI, GST, Knowledge Centre, MoU, Official Language",
  "Downloads, annual report, product catalogue, blog",
  "Subsidiaries (HLFPPT, LifeSpring, GAPL, HITES, HMA, Bhishm Cube)",
  "Contact, sitemap, privacy, terms, disclaimer",
] as const;

export const assumptions = [
  "One senior frontend/full-stack engineer using Cursor for most implementation, not a large agency team.",
  "Animation components are copied from HLL-UI-Demo / Studio export — shader engine is not rewritten.",
  "Figma Pages cluster is a marketing site (~12 unique templates: home, 5 nav, 6 services), not 60 unique layouts.",
  "English first. Hindi is i18n-ready fields, not full GIGW bilingual launch, unless the Full RFP scenario is chosen.",
  "Headless CMS (Payload CMS or equivalent) rather than a custom admin from scratch.",
  "No STQC certification, MeghRaj hosting, or AI chatbot in the UI+APIs scenario.",
  "Content migration from lifecarehll.com is out of the recommended slice (included only in Full RFP).",
  "Local zips (hll-website-skill.zip, HLL-UI-Demo.zip) were not available in this environment; the live Vercel demo was used instead.",
] as const;

export const risks = [
  {
    risk: "Figma Pages cluster has more unique screens than inferred",
    impact: "UI hours scale ~4–8h per extra unique template",
    mitigation: "Zoom the Pages frame in Figma and lock a screen inventory before sprint 1.",
  },
  {
    risk: "WebGL on government/low-end devices + GIGW/WCAG",
    impact: "+8–16h for CSS fallbacks, pause-on-hidden, reduced-motion",
    mitigation: "The kit already has disabled/loading states; add a no-canvas mode.",
  },
  {
    risk: "Private GitHub + missing zips",
    impact: "If Studio export differs from the Vercel build, re-integration cost",
    mitigation: "Use Studio Download zip as source of truth; docs.html already describes the file layout.",
  },
  {
    risk: "RFP PHP/MySQL vs modern Next stack",
    impact: "If the client mandates PHP, API work is a rewrite",
    mitigation: "Keep CMS API-first; swap Next for a PHP frontend later if required.",
  },
  {
    risk: "Bilingual + GIGW + STQC in v1",
    impact: "Moves the project into the 55–75 day band",
    mitigation: "Ship English UI+APIs first; compliance as a second phase.",
  },
] as const;

export const cursorMultiplier = {
  uiBoilerplate: "50–65% faster vs hand-coding layouts from Figma",
  apis: "45–60% faster for CRUD/CMS wiring",
  shaders: "Already done — Cursor does not need to invent LightFX",
  compliance: "Little speedup (GIGW/STQC is process, not code gen)",
} as const;
