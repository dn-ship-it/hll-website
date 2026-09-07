import type { Media, Service, TeamMember, Industry, MarketingContent, SiteSetting } from "@/payload-types";
import type { AboutPageData } from "@/data/about";
import { aboutPage } from "@/data/about";
import type { CareersPageContent } from "@/data/careers-page";
import { careersPageContent } from "@/data/careers-page";
import type { ContactPageContent } from "@/data/contact-page";
import { contactPageContent } from "@/data/contact-page";
import type { HLLFoundationData } from "@/data/services/hll-foundation";
import { hllFoundation } from "@/data/services/hll-foundation";
import type { IndustryPageData } from "@/types/industry";
import { healthcareIndustry } from "@/data/industries/healthcare";
import type { TeamMember as UiTeamMember, TeamPageContent } from "@/data/team-page";
import { teamPageContent } from "@/data/team-page";

import { resolveMediaUrl } from "./media";

export type CmsImageRef = Media | number | string | null | undefined;

export function mapServiceToFoundation(
  service: Service | null,
  fallback: HLLFoundationData = hllFoundation,
): HLLFoundationData {
  const pc = service?.pageContent;
  if (!pc?.hero?.headline) return fallback;

  return {
    slug: service?.slug ?? fallback.slug,
    brand: pc.brand ?? service?.title ?? fallback.brand,
    breadcrumb: (pc.breadcrumb?.map((b) => b.label) ?? fallback.breadcrumb) as HLLFoundationData["breadcrumb"],
    hero: {
      headline: pc.hero.headline ?? fallback.hero.headline,
      tabs:
        pc.hero.tabs?.map((t) => ({ id: t.id, label: t.label })) ?? fallback.hero.tabs,
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
          subServices: item.subServices?.map((s) => s.label) ?? [],
        })) ?? fallback.capabilities.items,
      tools: {
        cloud:
          pc.capabilities?.tools?.cloud?.map((c) => c.label) ??
          fallback.capabilities.tools.cloud,
        data:
          pc.capabilities?.tools?.data?.map((d) => d.label) ??
          fallback.capabilities.tools.data,
      },
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
          tag: card.tag ?? "Client work",
          description: card.description ?? "",
          variant: (card.variant ?? "navy") as "navy" | "orange" | "image",
        })) ?? fallback.engagement.cards,
    },
    expertVoice: {
      quote: pc.expertVoice?.quote ?? fallback.expertVoice.quote,
      name: pc.expertVoice?.name ?? fallback.expertVoice.name,
      role: pc.expertVoice?.role ?? fallback.expertVoice.role,
      company: pc.expertVoice?.company ?? fallback.expertVoice.company,
    },
    relatedServices:
      pc.relatedServices?.map((link) => ({
        label: link.label,
        href: link.href,
      })) ?? fallback.relatedServices,
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
    breadcrumb: (pc.breadcrumb?.map((b) => b.label) ?? fallback.breadcrumb) as IndustryPageData["breadcrumb"],
    accentColor: pc.accentColor ?? fallback.accentColor,
    hero: {
      title: pc.hero.title ?? fallback.hero.title,
      headline: pc.hero.headline ?? fallback.hero.headline,
      overlayLabel: pc.hero.overlayLabel ?? fallback.hero.overlayLabel,
      filters: pc.hero.filters?.map((f) => ({ id: f.id, label: f.label })) ?? fallback.hero.filters,
    },
    capabilities: {
      eyebrow: pc.capabilities?.eyebrow ?? fallback.capabilities.eyebrow,
      title: pc.capabilities?.title ?? fallback.capabilities.title,
      sidebar: (pc.capabilities?.sidebar?.map((s) => s.label) ??
        fallback.capabilities.sidebar) as IndustryPageData["capabilities"]["sidebar"],
      items:
        pc.capabilities?.items?.map((item) => ({
          id: item.id,
          index: item.index ?? "",
          title: item.title,
          description: item.description ?? "",
          cards:
            item.cards?.map((card) => ({
              id: card.id,
              title: card.title,
              client: card.client ?? card.title,
              tag: card.tag ?? "",
              description: card.description ?? "",
              variant: (card.variant ?? "image") as "navy" | "orange" | "image",
            })) ?? [],
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

  return {
    breadcrumb: fallback.breadcrumb,
    accentColor: cms.accentColor ?? fallback.accentColor,
    hero: {
      eyebrow: cms.hero.eyebrow ?? fallback.hero.eyebrow,
      headline: cms.hero.headline ?? fallback.hero.headline,
      description: cms.hero.description ?? fallback.hero.description,
      ctaLabel: cms.hero.ctaLabel ?? fallback.hero.ctaLabel,
      ctaHref: cms.hero.ctaHref ?? fallback.hero.ctaHref,
    },
    story: {
      eyebrow: cms.story?.eyebrow ?? fallback.story.eyebrow,
      title: cms.story?.title ?? fallback.story.title,
      paragraphs:
        cms.story?.paragraphs?.map((p) => p.text) ?? [...fallback.story.paragraphs],
    },
    values: {
      eyebrow: cms.values?.eyebrow ?? fallback.values.eyebrow,
      title: cms.values?.title ?? fallback.values.title,
      items:
        cms.values?.items?.map((item) => ({
          id: item.id,
          title: item.title,
          description: item.description ?? "",
        })) ?? [...fallback.values.items],
    },
    process: fallback.process,
    team: fallback.team,
    promise: {
      eyebrow: cms.promise?.eyebrow ?? fallback.promise.eyebrow,
      line1: cms.promise?.line1 ?? fallback.promise.line1,
      line2: cms.promise?.line2 ?? fallback.promise.line2,
    },
    lab: fallback.lab,
    clients: {
      eyebrow: cms.clients?.eyebrow ?? fallback.clients.eyebrow,
      title: cms.clients?.title ?? fallback.clients.title,
      slotCount: cms.clients?.logos?.length ?? fallback.clients.slotCount,
    },
  };
}

export function mapContactPage(
  marketing: MarketingContent | null,
  fallback: ContactPageContent = contactPageContent,
): ContactPageContent {
  const cms = marketing?.contact;
  if (!cms?.hero?.headline) return fallback;

  return {
    breadcrumb: fallback.breadcrumb,
    accentColor: cms.accentColor ?? fallback.accentColor,
    hero: {
      eyebrow: cms.hero.eyebrow ?? fallback.hero.eyebrow,
      headline: cms.hero.headline ?? fallback.hero.headline,
      description: cms.hero.description ?? fallback.hero.description,
    },
    form: fallback.form,
    details: {
      eyebrow: cms.details?.eyebrow ?? fallback.details.eyebrow,
      title: cms.details?.title ?? fallback.details.title,
      email: cms.details?.email ?? fallback.details.email,
      linkedin: cms.details?.linkedin ?? fallback.details.linkedin,
      linkedinLabel: cms.details?.linkedinLabel ?? fallback.details.linkedinLabel,
    },
    locations: {
      eyebrow: cms.locations?.eyebrow ?? fallback.locations.eyebrow,
      title: cms.locations?.title ?? fallback.locations.title,
      items:
        cms.locations?.items?.map((item) => ({
          id: item.id,
          city: item.city,
          label: item.label ?? undefined,
          address: item.address ?? "",
        })) ?? [...fallback.locations.items],
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
    breadcrumb: fallback.breadcrumb,
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
      highlights:
        cms.culture?.highlights?.map((h) => ({
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
    nav:
      settings?.headerNav?.map((item) => ({
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
