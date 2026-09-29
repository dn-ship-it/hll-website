# API Reference

No custom API routes. All endpoints are Payload-generated.

| Method | Path | Handler | Auth |
|---|---|---|---|
| ALL | `/api/[...slug]` | Payload REST (`app/(payload)/api/[...slug]/route.ts`) | Collection access rules |
| POST/GET | `/api/graphql` | Payload GraphQL | Collection access rules |
| GET | `/admin/*` | Payload admin UI | Users (auth collection) |
| GET | `/api/media/file/**` | Media files (whitelisted in next.config images) | Public |

## REST resources (auto)
| Resource | Public read |
|---|---|
| `/api/pages`, `/api/services`, `/api/industries`, `/api/posts` | Published only (`_status = published`); all when logged in |
| `/api/careers`, `/api/tenders` | Filtered read (status/expiry) for anon; all when logged in |
| `/api/media`, `/api/team-members` | Public |
| `/api/globals/site-settings`, `/api/globals/marketing-content` | Public |
| `/api/users` | Auth collection |

## Server-side query helpers (`src/lib/payload/queries.ts`)
| Function | Source | Notes |
|---|---|---|
| `getSiteSettings()` | global `site-settings` | null on error |
| `getMarketingContent()` | global `marketing-content`, depth 2 | null on error |
| `getPageBySlug(slug)` | `pages`, published | depth 2 |
| `getServiceBySlug(slug)` | `services`, published | depth 2 |
| `getIndustryBySlug(slug)` | `industries`, published | depth 2 |
| `getPublishedCareers()` | `careers`, status=published | sort -updatedAt, limit 50 |
| `getTeamMembers()` | `team-members` | sort sortOrder, limit 100 |

## Missing / TODO
- Contact form: UI-only (fake 600ms delay) — `POST /api/contact` not implemented (`contact-form.tsx:83`)
- No email adapter (Payload logs emails to console)
