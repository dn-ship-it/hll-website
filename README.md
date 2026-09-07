# HLL × Cornerstone

React (Next.js) marketing site for **HLL <> Cornerstone India**, with **Payload CMS** for content and the LightFX animation kit on the frontend.

## Quick start

```bash
cp .env.example .env
npm install
npm run dev
```

| URL | What |
|-----|------|
| http://127.0.0.1:43141 | Public site (CMS-driven when pages are published) |
| http://127.0.0.1:43141/admin | **Payload CMS** — create admin user on first visit |

On first boot, a sample **Home** page and site navigation are seeded automatically. Edit them in `/admin`, or add pages with slugs like `about`, `services`, and `contact`.

Full CMS guide: [docs/cms-payload.md](docs/cms-payload.md)

Figma MCP build prompts: [docs/figma-mcp-prompt-checklist.md](docs/figma-mcp-prompt-checklist.md)

## Stack

- **Frontend:** Next.js 16, React 19, TypeScript, Tailwind, shadcn/ui
- **CMS:** Payload 3 (self-hosted), Lexical rich text, block-based pages
- **DB:** SQLite locally → PostgreSQL in production (`docker-compose.yml` for Postgres + MinIO)
- **Files:** `./media` locally → S3 / MinIO in production

## Production-like local stack

```bash
docker compose up -d
# Set DATABASE_URI and S3_* in .env, then npm run dev
```

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Next.js + Payload on port 43141 |
| `npm run generate:types` | Regenerate `src/payload-types.ts` after schema changes |
| `npm run generate:importmap` | Regenerate admin import map |
