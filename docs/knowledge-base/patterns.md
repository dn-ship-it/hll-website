# Patterns & Conventions

## Pages
- Route file is thin: `export default () => <XPage />`; real page in `components/marketing/<page>/<page>-page.tsx`
- Page = `<MarketingShell>` + section components, one file per section (`<page>-hero.tsx`, `<page>-chrome.tsx`, …)
- Dynamic routes: `params: Promise<{slug}>` → `await params` (Next 16)
- Unbuilt verticals render a "coming soon" MarketingShell block; unknown slug → `notFound()`

## Data
- Server components fetch via `lib/payload/queries.ts`; ALWAYS `try/catch` and fall back to `src/data/*`
- Static copy typed in `src/data/**/types.ts`; CMS merged over it via `marketing-mappers.ts`
- Images from CMS via `getCmsImageUrl()`; `next/image` unoptimized

## Components
- `"use client"` only for interactivity/animation (reveals, forms, LightFX, tabs)
- Import LightFX via barrel `@/components/hll`, never deep paths
- Colour/variant driven by `HLLVariant` string, not ad-hoc colours
- shadcn primitives in `components/ui/`; `cn()` from `@/lib/utils`

## Styling
- Tailwind v4 utilities + fluid `clamp()` sizes (e.g. `px-[clamp(1.25rem,4vw,3rem)]`)
- Figma-exact layouts use BEM-ish classes in `app/(frontend)/globals.css` (`hll-home`, `hll-service-page--foundation`, `engagement-project__meta`, `careers-*`)
- Per-page font vars: `--hll-display-font`, `--hll-service-font`, `--hll-team-font`, `--hll-engagement-font`, `--careers-font` → Aeonik fallback Helvetica Neue
- Breakpoints used in CSS: 1100px, 767px, 600px
- Grid helpers: `lib/layout/grid.ts` (`fluidGridStyle`, `serviceGridStyle`, `statGridStyle`, `splitGridStyle`, `sectionPaddingStyle`)
- Always honour `prefers-reduced-motion`
- White canvas, black text (`bg-white text-black`); muted text `text-black/45`–`/55`

## CMS
- New content type → collection in `src/collections/`, register in `payload.config.ts`, run `generate:types`
- Drafts-enabled collections: public read filtered to `_status=published`
- Seed defaults in `onInit` / `seed-marketing.ts` only when empty (idempotent)
- `public/demos/*.html` is source of truth for service demos (don't inline into DB)

## Comments
- Explain *why* (non-obvious decisions), multi-line block comments above code
