# Frontend Map

| Route | Page component | Sections | Data |
|---|---|---|---|
| `/` | `app/(frontend)/page.tsx` | `home/hero-and-services` (HomeHero, WhatWeDo, OurClients), `hll/OurPromise impactGraph`, `home/our-impact`, `home/sections-bottom` (HowWeWork, WhoWeAre, InsideTheLab, HomeCta) | `getMarketingContent().home` |
| `/services`, `/services/[slug]` | `marketing/services/service-page` | service-chrome (brand header, breadcrumb), service-hero + service-demo-window, capabilities, outcome, engagement, expert-and-related, HomeCta; wrapped in service-reveal | `getServiceBySlug` + `data/services/*`; demos in `public/demos/*.html` |
| `/industries`, `/industries/[slug]` | `marketing/industries/healthcare-page` | industry-chrome, industry-hero, industry-capabilities, named-experts, client-voice, industry-lab, related-industries | `getIndustryBySlug` + `data/industries/healthcare.ts` |
| `/about` | `marketing/about/about-page` | about-chrome, hero, story, values, process, promise-lab, team, clients | `marketing-content.about` + `data/about.ts` |
| `/team` | `marketing/team/team-page` | team-chrome, hero, grid, join | `getTeamMembers` + `data/team-page.ts` |
| `/careers` | `marketing/careers/careers-page` | chrome, hero, culture, notices, reveal | `getPublishedCareers` + `data/careers-page.ts` |
| `/contact` | `marketing/contact/contact-page` | chrome, hero, details, form (client, UI-only) | `data/contact-page.ts` |
| `/engagement` | inline in page.tsx | 10 project cards, CSS-positioned (`engagement-project--*`), no footer | static |
| `/estimate` | `components/estimate-dashboard` | shadcn tables/tabs/progress | `data/estimate.ts` |
| `/lightfx` | playground | all LightFX components | – |
| `/[slug]` | `cms/cms-page` → `block-renderer` | CMS blocks | `getPageBySlug` |

## Shell
- `marketing-shell.tsx` (server): `SiteHeader` + `<main>` + `SiteFooter`; props `showFooter`, `compactHeader`
- Nav/footer from `site-settings` + `marketing-content.footerServices/Industries`

## LightFX components (`@/components/hll`)
| Component | Engine | Notes |
|---|---|---|
| `HLLButton`, `HLLOutlineButton`, `LightFXTag` | three.js (`lightfx-runtime.js`, `use-light-component.ts`) | variant = nav/service variant |
| `Shader`, `BottomShader`, `MenuTriggerOverlay` | `shader-runtime.ts` (WebGL2, degrades gracefully) | |
| `Ripple`, `CornerRipple` | p5 WEBGL | `SERVICE_TO_RIPPLE` map |
| `OurPromise` | p5 WEBGL | throws if WebGL missing |
| `GradientRevealText(Slow/Normal)` | CSS/JS | headings |
| `Tag`, `HLLServiceTag` | CSS | `components/hll/tag.tsx` |

## Variants (`components/hll/variants.ts`)
- Nav: services, industries, engagement, about, contact
- Service: hll-ai, hll-trust, hll-foundation, hll-ontology, hll-people, hll-application
- `VARIANT_GRADIENTS` — colour stops per variant
