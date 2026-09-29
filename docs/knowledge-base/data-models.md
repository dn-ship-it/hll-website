# Data Models (Payload)

Types generated to `src/payload-types.ts` (`npm run generate:types`).

## Collections
| Slug | Drafts | Key fields |
|---|---|---|
| `users` | – | auth, name, role (admin/editor) |
| `media` | – | upload, alt, mediaType (select), caption |
| `pages` | ✓ | title, slug, layout (blocks), seo |
| `services` | ✓ | title, slug, variant, summary, featuredImage, demoWindow{selectorLabel, demos[] {tabKey,title,contentType,html,htmlFile}, fallbackHtml, fallbackFile}, pageContent, layout |
| `industries` | ✓ | title, slug, pageContent (group) |
| `posts` | ✓ | title, slug, excerpt, coverImage, publishedAt, body (richText) |
| `careers` | – | title, slug, status, summary (richText), expiryDate, externalApplyUrl, documents[] |
| `tenders` | – | title, referenceNo, category, summary, expiryDate, archived, documents[], corrigenda[] |
| `team-members` | – | name, slug, role, bio, department, featured, sortOrder, photo |

## Globals
| Slug | Fields |
|---|---|
| `site-settings` | siteName, headerNav[] {label,href,variant}, footerLinks[], socialLinks[] {platform,url}, defaultSeo{title,description,ogImage} |
| `marketing-content` | home{heroHeading, heroImage, heroCtaLabel, heroCtaHref, clientLogos[]}, about{accentColor, hero, story, values, …}, footerServices[], footerIndustries[], … (see `globals/MarketingContent.ts`, `fields/marketing-fields.ts`) |

## Page-builder blocks (`src/blocks/index.ts`)
`hero`, `richText`, `imageBlock`, `shaderSection`, `lottieAnimation`, `video`, `htmlEmbed`, `cta`, `contentGrid` → rendered by `components/cms/block-renderer.tsx`

## Static fallback data (`src/data/`)
| File | Used by |
|---|---|
| `services/{hll-foundation,hll-governance-trust,hll-kinetic,hll-momentum}.ts` + `types.ts` (ServicePageData) | ServicePage |
| `industries/healthcare.ts` | HealthcareIndustryPage |
| `about.ts`, `team-page.ts`, `careers-page.ts`, `contact-page.ts` | respective pages |
| `estimate.ts` | EstimateDashboard |

## Mappers (`lib/payload/marketing-mappers.ts`)
- `mapSiteNav`, `mapServiceToPage(service, fallback)`, `getCmsImageUrl` — merge CMS over static fallback
