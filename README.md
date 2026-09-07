# HLL × Cornerstone India

React marketing site for **HLL <> Cornerstone India** — Next.js, Tailwind, LightFX UI components, and Payload CMS.

**Repository:** https://github.com/dn-ship-it/hll-cornerstone

## Clone & run

```bash
git clone https://github.com/dn-ship-it/hll-cornerstone.git
cd hll-cornerstone
cp .env.example .env
npm install
npm run dev
```

Open http://127.0.0.1:43141

| URL | What |
|-----|------|
| http://127.0.0.1:43141 | Marketing UI (home, nav pages, service verticals) |
| http://127.0.0.1:43141/admin | Payload CMS (create admin user on first visit) |
| http://127.0.0.1:43141/estimate | Planning effort dashboard |

## Stack

- **React 19** via **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS v4** + shadcn/ui
- **LightFX components** in `src/components/hll/`
- **Payload CMS 3** — SQLite locally, PostgreSQL in production

## Project structure

```
src/
├── app/(frontend)/     Public React pages
├── app/(payload)/      CMS admin + API
├── components/hll/     LightFX UI (buttons, shaders, headings)
├── components/marketing/  Site shell, header, footer
└── payload.config.ts   CMS schema
```

## UI routes

| Route | Status |
|-------|--------|
| `/` | Home hero + service verticals |
| `/services`, `/industries`, `/engagement`, `/about`, `/contact` | Nav pages |
| `/services/hll-ai` … `/services/hll-application` | Service verticals |
| `/[slug]` | CMS-driven pages from Payload |

## Copy full LightFX kit from HLL-UI-Demo

The private repo `buildwithteky/HLL-UI-Demo` is not accessible from this environment. To drop in the real WebGL components:

```bash
# After cloning HLL-UI-Demo locally:
cp -R HLL-UI-Demo/src/components/hll-button workspace/src/components/hll/hll-button
cp -R HLL-UI-Demo/src/components/shader workspace/src/components/hll/shader
# … repeat for heading-anim, ripple, tag, etc.
```

Reference: [LightFX docs](https://hok-sdf-lensblur-lyart.vercel.app/docs.html)

Then update imports in `src/components/hll/index.ts` to re-export the real components.

## Figma MCP build workflow

1. Open [Figma file](https://www.figma.com/design/m08lOU9DrNl1YNI4kfFvl5/HLL-%3C%3E-Cornerstone-India) → **Pages** cluster (not node `16:3`, which is the project board)
2. Use [docs/figma-mcp-prompt-checklist.md](docs/figma-mcp-prompt-checklist.md) screen-by-screen
3. Each frame → route under `src/app/(frontend)/`

## Publish to `dn-ship-it/hll-cornerstone`

This project targets **https://github.com/dn-ship-it/hll-cornerstone**. Push from your machine:

```bash
git remote add origin https://github.com/dn-ship-it/hll-cornerstone.git  # if needed
git push -u origin main
```

## Docs

- [CMS guide](docs/cms-payload.md)
- [Figma MCP prompts](docs/figma-mcp-prompt-checklist.md)
- [UI spec](docs/HLL_CORNERSTONE_UI_SPEC.md) · [Visual summary](docs/HLL_VISUAL_SUMMARY.md) · [Quick reference](docs/QUICK_REFERENCE.md)
