# Payload CMS — HLL Cornerstone

Headless CMS for the React marketing site. Editors manage content in **Payload Admin**; the Next.js frontend reads it via REST/GraphQL.

## Quick start

```bash
cp .env.example .env
npm install
npm run dev
```

| URL | Purpose |
|-----|---------|
| http://127.0.0.1:43141 | React site (estimate dashboard for now) |
| http://127.0.0.1:43141/admin | Payload CMS admin |

On first visit to `/admin`, create your admin user.

## Collections

| Collection | Purpose |
|------------|---------|
| **Pages** | Composable pages (home, about, contact…) via **blocks** |
| **Services** | Service verticals with shader `variant` + block layout |
| **Tenders** | Notices, PDFs, corrigenda, auto-archive on expiry |
| **Posts** | News / press releases |
| **Careers** | Job notices + documents |
| **Media** | Images, video, Lottie JSON, PDF, HTML assets |

## Global

| Global | Purpose |
|--------|---------|
| **Site settings** | Header nav, footer, social links, default SEO |

## Block types (page builder)

Editors compose pages from blocks — each maps to a React component on the frontend:

| Block | CMS stores | React renders |
|-------|------------|---------------|
| **Hero** | heading, variant, reveal speed, image | `GradientRevealText` + shader variant |
| **Rich text** | Lexical content | Styled prose |
| **Image** | media upload | `<img>` / Next Image |
| **Shader section** | variant, intensity, placement | `Shader` / `BottomShader` |
| **Lottie animation** | `.json` in Media | Lottie player |
| **Video** | video + poster | `<video>` |
| **HTML embed** | raw HTML (sanitized on frontend) | Migration / legacy only |
| **CTA** | label, href, variant | `HLLButton` |
| **Content grid** | cards with image/link | Grid component |

**Shader variants** match your LightFX kit: `services`, `industries`, `hll-ai`, etc.

## Media uploads

| Type | Upload as | Frontend |
|------|-----------|----------|
| Images | Media → type **Image** | Standard image |
| Lottie | `.json` file → type **Lottie JSON** | `lottie-react` |
| Video | MP4/WebM → type **Video** | `<video>` |
| PDF | type **PDF** | Download link (tenders) |
| HTML asset | type **HTML asset** | Sanitized embed |

## Storage

| Environment | Database | Files |
|-------------|----------|-------|
| **Local dev** (default) | SQLite `payload.db` | `./media` folder |
| **Production** | PostgreSQL (`DATABASE_URI=postgresql://…`) | S3 (see below) |

### Enable S3 (production)

Set in `.env`:

```env
DATABASE_URI=postgresql://hll:hll@localhost:5432/hll_cms
S3_BUCKET=hll-media-prod
S3_REGION=ap-south-1
S3_ACCESS_KEY_ID=...
S3_SECRET_ACCESS_KEY=...
# MinIO local test:
# S3_ENDPOINT=http://127.0.0.1:9000
```

Start Postgres + MinIO locally:

```bash
docker compose up -d
```

## Fetch content in React

```typescript
import { getPayloadClient } from "@/lib/payload/client";

const payload = await getPayloadClient();

const page = await payload.find({
  collection: "pages",
  where: { slug: { equals: "home" } },
  depth: 2,
});
```

Generate TypeScript types after schema changes:

```bash
npm run generate:types
```

Output: `src/payload-types.ts`

## Localization

English and Hindi locales are configured. Add localized fields to collections when bilingual content is ready.

## Next steps

1. Seed a **Home** page in admin with Hero + Content grid blocks
2. Wire `src/app/(frontend)/` routes to fetch from Payload
3. Add `BlockRenderer` mapping blocks → LightFX React components
4. Point production to PostgreSQL + S3 in `ap-south-1`

See also: [figma-mcp-prompt-checklist.md](./figma-mcp-prompt-checklist.md)
