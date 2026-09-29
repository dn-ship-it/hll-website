# Overview — HLL Website (Hyper Lychee Labs × Cornerstone India)

Marketing site + headless CMS. Repo `dn-ship-it/hll-website` (package name still `hll-cornerstone`).

## Tech stack
| Layer | Tech |
|---|---|
| Framework | Next.js 16.3 (App Router, Turbopack) — breaking changes vs older Next; read `node_modules/next/dist/docs/` (see AGENTS.md) |
| UI | React 19.2, TypeScript 5, Tailwind CSS v4, shadcn/ui (`base-nova`, `@base-ui/react`), lucide-react |
| Animation | LightFX kit (Three.js 0.185 + p5 2.x WebGL shaders) in `src/components/hll/lightfx/` |
| CMS | Payload 3.88 (admin at `/admin`, REST + GraphQL under `/api`) |
| DB | SQLite (`file:./payload.db`) locally; Postgres when `DATABASE_URI` starts with `postgres` |
| Storage | Local `./media`; S3/MinIO when `S3_BUCKET` set |
| i18n | Payload localization: `en` (default), `hi`, fallback on |
| Fonts | Geist, Geist Mono, Sometype Mono (next/font); Aeonik (Light/Regular/Medium) in `public/impact/fonts` |

## Run
- `npm install --registry=https://registry.npmjs.org/` (global npm registry on this machine points elsewhere)
- `cp .env.example .env` → `npm run dev` → http://127.0.0.1:43141
- WebGL/WebGL2 required in browser for LightFX effects
- `docker-compose.yml`: optional Postgres 16 + MinIO

## Architecture
```
src/
├── app/(frontend)/      public routes (RootLayout + globals.css, 1080 lines)
├── app/(payload)/       Payload admin + /api REST/GraphQL
├── collections/         9 Payload collections
├── globals/             SiteSettings, MarketingContent
├── blocks/              9 page-builder blocks
├── components/
│   ├── hll/             variants + LightFX barrel (index.ts)
│   ├── marketing/<page>/ per-page section components
│   ├── cms/             block renderer for CMS pages
│   └── ui/              shadcn primitives
├── data/                static fallback copy (services, industries, about, …)
├── lib/payload/         queries, mappers, seed, demo resolver
└── payload.config.ts    CMS config + onInit seeding
```

## Data flow
- Server components call `lib/payload/queries.ts` (Payload Local API, cached client)
- Every page wraps CMS calls in try/catch → falls back to `src/data/*` static copy
- `onInit` seeds Home page, SiteSettings nav, HLL Foundation service, one career, marketing content

## Design source
- Figma: `m08lOU9DrNl1YNI4kfFvl5` (HLL <> Cornerstone India) — use **Pages** cluster, not node `16:3`
- Checklist: `docs/figma-mcp-prompt-checklist.md`; spec: `docs/HLL_CORNERSTONE_UI_SPEC.md`

## Page build status
| Route | Status |
|---|---|
| `/` | Built: Hero, WhatWeDo, Clients, OurPromise, Impact, HowWeWork, WhoWeAre, InsideTheLab, CTA |
| `/services` | Built (HLL Foundation template) |
| `/services/[slug]` | foundation, governance-trust, kinetic, momentum data; other variants → "coming soon" |
| `/industries`, `/industries/healthcare` | Built (Healthcare template) |
| `/industries/payments`, `/insurance` | "coming soon" placeholder |
| `/about`, `/team`, `/careers`, `/contact`, `/engagement` | Built |
| `/estimate` | Planning effort dashboard |
| `/lightfx` | LightFX component playground |
| `/[slug]` | CMS-driven Pages (blocks) |
