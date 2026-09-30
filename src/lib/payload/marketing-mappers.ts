import type {
  Media,
  Service,
  TeamMember,
  Industry,
  MarketingContent,
  SiteSetting,
} from "@/payload-types";
import type { AboutPageData } from "@/data/about";
import { aboutPage } from "@/data/about";
import type { CareersPageContent } from "@/data/careers-page";
import { careersPageContent } from "@/data/careers-page";
import type { ContactPageContent } from "@/data/contact-page";
import { contactPageContent } from "@/data/contact-page";
import type {
  EngagementCardType,
  ServicePageData,
  ServiceTool,
} from "@/data/services/types";
import { hllFoundation } from "@/data/services/hll-foundation";
import type { IndustryPageData } from "@/types/industry";
import { healthcareIndustry } from "@/data/industries/healthcare";
import type {
  TeamMember as UiTeamMember,
  TeamPageContent,
} from "@/data/team-page";
import { teamPageContent } from "@/data/team-page";

import { resolveMediaUrl } from "./media";

export type CmsImageRef = Media | number | string | null | undefined;

/** CMS tools keep the fallback's logo for a tool of the same name until one is uploaded. */
function mapTools(
  cms: { label: string; icon?: CmsImageRef }[] | null | undefined,
  fallback: readonly ServiceTool[],
): readonly ServiceTool[] {
  if (!cms?.length) return fallback;
  return cms.map((tool) => ({
    name: tool.label,
    icon:
      resolveMediaUrl(tool.icon) ??
      fallback.find((f) => f.name === tool.label)?.icon ??
      null,
  }));
}

export function mapServiceToPage(
  service: Service | null,
  fallback: ServicePageData = hllFoundation,
): ServicePageData {
  const pc = service?.pageContent;
  if (!pc?.hero?.headline) return fallback;

  return {
    slug: service?.slug ?? fallback.slug,
    variant: fallback.variant,
    brand: pc.brand ?? service?.title ?? fallback.brand,
    breadcrumb: (pc.breadcrumb?.map((b) => b.label) ??
      fallback.breadcrumb) as ServicePageData["breadcrumb"],
    hero: {
      headline: pc.hero.headline ?? fallback.hero.headline,
      support: fallback.hero.support,
      tabs:
        pc.hero.tabs?.map((t) => ({ id: t.id, label: t.label })) ??
        fallback.hero.tabs,
    },
    capabilities: {
      eyebrow: pc.capabilities?.eyebrow ?? fallback.capabilities.eyebrow,
      title: pc.capabilities?.title ?? fallback.capabilities.title,
      items:
        pc.capabilities?.items?.map((item) => ({
          id: item.id,
          index: item.index ?? "",
          title: item.title,
          description: item.description ?? "",
          subServices: item.subServices?.map((s) => ({ name: s.label })) ?? [],
        })) ?? fallback.capabilities.items,
      tools: fallback.capabilities.tools
        ? {
            cloud: mapTools(
              pc.capabilities?.tools?.cloud,
              fallback.capabilities.tools.cloud,
            ),
            data: mapTools(
              pc.capabilities?.tools?.data,
              fallback.capabilities.tools.data,
            ),
          }
        : undefined,
    },
    outcomes: {
      title: pc.outcomes?.title ?? fallback.outcomes.title,
      cards:
        pc.outcomes?.cards?.map((card) => ({
          stat: card.stat,
          description: card.description ?? "",
          hasMedia: card.hasMedia ?? Boolean(card.image),
        })) ?? fallback.outcomes.cards,
    },
    engagement: {
      title: pc.engagement?.title ?? fallback.engagement.title,
      intro: pc.engagement?.intro ?? fallback.engagement.intro,
      cards:
        pc.engagement?.cards?.map((card) => ({
          id: card.id,
          title: card.title,
          client: card.client ?? card.title,
          tag: (card.tag ?? "Client work") as EngagementCardType,
          description: card.description ?? "",
          variant: (card.variant ?? "navy") as "navy" | "orange" | "image",
        })) ?? fallback.engagement.cards,
    },
    expertVoice: pc.expertVoice?.quote
      ? {
          quote: pc.expertVoice.quote,
          name: pc.expertVoice.name ?? undefined,
          role: pc.expertVoice.role ?? "",
          company: pc.expertVoice.company ?? undefined,
        }
      : fallback.expertVoice,
    relatedServices:
      pc.relatedServices?.map((link) => ({
        label: link.label,
        href: link.href,
      })) ?? fallback.relatedServices,
    cta: fallback.cta,
  };
}

export function mapIndustryPage(
  industry: Industry | null,
  fallback: IndustryPageData = healthcareIndustry,
): IndustryPageData {
  const pc = industry?.pageContent;
  if (!pc?.hero?.headline) return fallback;

  return {
    slug: industry?.slug ?? fallback.slug,
    category: pc.category ?? industry?.title ?? fallback.category,
    breadcrumb: (pc.breadcrumb?.map((b) => b.label) ??
      fallback.breadcrumb) as IndustryPageData["breadcrumb"],
    accentColor: pc.accentColor ?? fallback.accentColor,
    hero: {
      title: pc.hero.title ?? fallback.hero.title,
      headline: pc.hero.headline ?? fallback.hero.headline,
      overlayLabel: pc.hero.overlayLabel ?? fallback.hero.overlayLabel,
      image: fallback.hero.image,
      filters:
        pc.hero.filters?.map((f) => ({ id: f.id, label: f.label })) ??
        fallback.hero.filters,
    },
    capabilities: {
      eyebrow: pc.capabilities?.eyebrow ?? fallback.capabilities.eyebrow,
      title: pc.capabilities?.title ?? fallback.capabilities.title,
      sidebar: (pc.capabilities?.sidebar?.map((s) => s.label) ??
        fallback.capabilities
          .sidebar) as IndustryPageData["capabilities"]["sidebar"],
      items:
        pc.capabilities?.items?.map((item) => ({
          id: item.id,
          index: item.index ?? "",
          title: item.title,
          description: item.description ?? "",
          cards:
            item.cards?.map((card) => {
              // The CMS has no media fields for these cards yet, so keep the
              // static fallback's image / logo for the same card.
              const media = fallback.capabilities.items
                .flatMap((i) => i.cards)
                .find((c) => c.id === card.id);
              return {
                id: card.id,
                title: card.title,
                client: card.client ?? card.title,
                tag: card.tag ?? "",
                description: card.description ?? "",
                variant: (card.variant ?? "image") as
                  "navy" | "orange" | "image",
                image: media?.image,
                logo: media?.logo,
              };
            }) ?? [],
        })) ?? fallback.capabilities.items,
    },
    clientVoice: {
      eyebrow: pc.clientVoice?.eyebrow ?? fallback.clientVoice.eyebrow,
      quote: pc.clientVoice?.quote ?? fallback.clientVoice.quote,
      name: pc.clientVoice?.name ?? fallback.clientVoice.name,
      role: pc.clientVoice?.role ?? fallback.clientVoice.role,
      company: pc.clientVoice?.company ?? fallback.clientVoice.company,
      slideCount: pc.clientVoice?.slideCount ?? fallback.clientVoice.slideCount,
    },
    experts: {
      eyebrow: pc.experts?.eyebrow ?? fallback.experts.eyebrow,
      title: pc.experts?.title ?? fallback.experts.title,
      people:
        pc.experts?.people?.map((p, i) => ({
          id: String(i + 1),
          name: p.name,
          bio: p.bio ?? "",
          photo: fallback.experts.people[i]?.photo,
        })) ?? fallback.experts.people,
    },
    lab: {
      eyebrow: pc.lab?.eyebrow ?? fallback.lab.eyebrow,
      title: pc.lab?.title ?? fallback.lab.title,
      selectorLabel: pc.lab?.selectorLabel ?? fallback.lab.selectorLabel,
      demoUrl: pc.lab?.demoUrl ?? fallback.lab.demoUrl,
    },
    relatedIndustries:
      pc.relatedIndustries?.map((link) => ({
        label: link.label,
        href: link.href,
      })) ?? fallback.relatedIndustries,
  };
}

export function mapTeamMembers(members: TeamMember[]): UiTeamMember[] {
  return members.map((member) => ({
    id: String(member.id),
    name: member.name,
    role: member.role,
    bio: member.bio ?? "",
    department: member.department as UiTeamMember["department"],
    featured: member.featured ?? false,
    photoUrl: resolveMediaUrl(member.photo as CmsImageRef),
  }));
}

export function mapAboutPage(
  marketing: MarketingContent | null,
  fallback: AboutPageData = aboutPage,
): AboutPageData {
  const cms = marketing?.about;
  if (!cms?.hero?.headline) return fallback;

  const paragraphs = cms.story?.paragraphs?.map((p) => p.text).filter(Boolean);
  return {
    ...fallback,
    hero: {
      ...fallback.hero,
      title: cms.hero.headline ?? fallback.hero.title,
      paragraphs: paragraphs?.length ? paragraphs : fallback.hero.paragraphs,
    },
    values: {
      ...fallback.values,
      // Copy is editable in the CMS; the storyboard media stays with the
      // static entry in the same position until the CMS has media fields.
      items:
        cms.values?.items?.map((item, i) => ({
          id: item.id,
          title: item.title,
          description: item.description ?? "",
          image: fallback.values.items[i % fallback.values.items.length].image,
        })) ?? fallback.values.items,
    },
  };
}

export function mapContactPage(
  marketing: MarketingContent | null,
  fallback: ContactPageContent = contactPageContent,
): ContactPageContent {
  const cms = marketing?.contact;
  if (!cms) return fallback;

  const email = cms.details?.email ?? fallback.getInTouch.email;
  // Offices entered before the company / tax fields existed don't carry the
  // Figma layout's details, so they fall back to the Figma list.
  const offices = (cms.locations?.items ?? []).filter((item) => item.company);

  return {
    ...fallback,
    image:
      resolveMediaUrl(cms.details?.officeImage as CmsImageRef) ??
      fallback.image,
    offices: {
      ...fallback.offices,
      items: offices.length
        ? offices.map((item) => ({
            id: item.id,
            country: item.city,
            company: item.company ?? "",
            address: item.address ?? "",
            taxLabel: item.taxLabel ?? undefined,
            taxId: item.taxId ?? undefined,
          }))
        : fallback.offices.items,
    },
    getInTouch: {
      ...fallback.getInTouch,
      email,
      scheduleHref:
        cms.details?.scheduleUrl ??
        `mailto:${email}?subject=${encodeURIComponent(fallback.getInTouch.scheduleLabel)}`,
    },
  };
}

export function mapCareersPageContent(
  marketing: MarketingContent | null,
  fallback: CareersPageContent = careersPageContent,
): CareersPageContent {
  const cms = marketing?.careers;
  if (!cms?.hero?.headline) return fallback;

  return {
    ...fallback,
    accentColor: cms.accentColor ?? fallback.accentColor,
    hero: {
      eyebrow: cms.hero.eyebrow ?? fallback.hero.eyebrow,
      headline: cms.hero.headline ?? fallback.hero.headline,
      description: cms.hero.description ?? fallback.hero.description,
    },
    notices: fallback.notices,
    culture: {
      eyebrow: cms.culture?.eyebrow ?? fallback.culture.eyebrow,
      title: cms.culture?.title ?? fallback.culture.title,
      description: cms.culture?.description ?? fallback.culture.description,
      highlights: cms.culture?.highlights?.map((h) => ({
        id: h.id,
        title: h.title,
        body: h.body ?? "",
      })) ?? [...fallback.culture.highlights],
    },
  };
}

export function mapTeamPageContent(
  marketing: MarketingContent | null,
  fallback: TeamPageContent = teamPageContent,
): TeamPageContent {
  const cms = marketing?.team;
  if (!cms?.hero?.headline) return fallback;

  return {
    breadcrumb: fallback.breadcrumb,
    accentColor: cms.accentColor ?? fallback.accentColor,
    hero: {
      eyebrow: cms.hero.eyebrow ?? fallback.hero.eyebrow,
      headline: cms.hero.headline ?? fallback.hero.headline,
      description: cms.hero.description ?? fallback.hero.description,
    },
    grid: {
      eyebrow: cms.grid?.eyebrow ?? fallback.grid.eyebrow,
      title: cms.grid?.title ?? fallback.grid.title,
      filters: fallback.grid.filters,
    },
    join: {
      title: cms.join?.title ?? fallback.join.title,
      description: cms.join?.description ?? fallback.join.description,
      ctaLabel: cms.join?.ctaLabel ?? fallback.join.ctaLabel,
      ctaHref: cms.join?.ctaHref ?? fallback.join.ctaHref,
    },
    members: fallback.members,
  };
}

export type SiteNavItem = { label: string; href: string };

export function mapSiteNav(settings: SiteSetting | null): {
  siteName: string;
  nav: SiteNavItem[];
  footerLinks: SiteNavItem[];
  socialLinks: { platform?: string | null; url: string }[];
} {
  return {
    siteName: settings?.siteName ?? "Hyper Lychee Labs",
    nav: settings?.headerNav?.map((item) => ({
      label: item.label,
      href: item.href,
    })) ?? [
      { label: "Services", href: "/services" },
      { label: "Industries", href: "/industries" },
      { label: "Engagement", href: "/engagement" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
    footerLinks:
      settings?.footerLinks?.map((item) => ({
        label: item.label,
        href: item.href,
      })) ?? [],
    socialLinks: settings?.socialLinks ?? [],
  };
}

export function getCmsImageUrl(media: CmsImageRef): string | null {
  return resolveMediaUrl(media);
}
