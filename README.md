# HLL × Cornerstone India

Marketing site + Payload CMS for the **HLL <> Cornerstone India** Figma design.

## Quick start

```bash
cp .env.example .env
npm install
npm run dev
```

| URL | What |
|-----|------|
| http://127.0.0.1:43141 | Marketing UI (home, nav pages, service verticals) |
| http://127.0.0.1:43141/admin | Payload CMS |
| http://127.0.0.1:43141/estimate | Planning effort dashboard |

## Stack

- **Frontend:** Next.js 16, React 19, TypeScript, Tailwind, shadcn/ui
- **Animation kit:** `src/components/hll/` — LightFX-style components (CSS fallback; swap in WebGL from HLL-UI-Demo)
- **CMS:** Payload 3, block-based pages, SQLite dev / Postgres prod

## UI routes (Phase 1)

| Route | Status |
|-------|--------|
| `/` | Home hero + service verticals |
| `/services`, `/industries`, `/engagement`, `/about`, `/contact` | Nav shells with variant shaders |
| `/services/hll-ai` … `/services/hll-application` | Service vertical pages |
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

Create the repo in your `dn-ship-it` namespace, then:

```bash
git remote add dn-ship-it https://origin.cursor.com/git/dn-ship-it/hll-cornerstone.git
git push -u dn-ship-it main
```

Or mirror from GitHub once `HLL-UI-Demo` / this project is on GitHub:

```bash
origin repo create-mirrored your-org/hll-cornerstone --namespace dn-ship-it
```

## Docs

- [CMS guide](docs/cms-payload.md)
- [Figma MCP prompts](docs/figma-mcp-prompt-checklist.md)
- [UI spec](docs/HLL_CORNERSTONE_UI_SPEC.md) · [Visual summary](docs/HLL_VISUAL_SUMMARY.md) · [Quick reference](docs/QUICK_REFERENCE.md)
