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
import { homePageContent, type HomePageContent } from "@/data/home";
import { DEFAULT_INDUSTRY_MENU, type IndustryMenuGroup } from "@/data/industry-menu";
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
    moreExpertVoices:
      pc.expertVoice?.moreQuotes?.map((q) => ({
        quote: q.quote,
        name: q.name ?? undefined,
        role: q.role ?? "",
        company: q.company ?? undefined,
        portrait: resolveMediaUrl(q.portrait as CmsImageRef) ?? undefined,
      })) ?? fallback.moreExpertVoices,
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
      image: resolveMediaUrl(pc.hero.image as CmsImageRef) ?? fallback.hero.image,
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
              // A card without a CMS image keeps the static fallback's image /
              // logo for the same card.
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
                image: resolveMediaUrl(card.image as CmsImageRef) ?? media?.image,
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
      more:
        pc.clientVoice?.moreQuotes?.map((q) => ({
          quote: q.quote,
          name: q.name ?? undefined,
          role: q.role ?? "",
          company: q.company ?? undefined,
        })) ?? fallback.clientVoice.more,
    },
    experts: {
      eyebrow: pc.experts?.eyebrow ?? fallback.experts.eyebrow,
      title: pc.experts?.title ?? fallback.experts.title,
      people:
        pc.experts?.people?.map((p, i) => ({
          id: String(i + 1),
          name: p.name,
          bio: p.bio ?? "",
          photo:
            resolveMediaUrl(p.photo as CmsImageRef) ??
            fallback.experts.people[i]?.photo,
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
  if (!cms) return fallback;

  const paragraphs = cms.story?.paragraphs?.map((p) => p.text).filter(Boolean);
  const collage = cms.hero?.images?.map((tile) => resolveMediaUrl(tile.image as CmsImageRef)) ?? [];
  const values = cms.values?.items ?? [];
  const stats = cms.reach?.stats?.map((stat) => stat.text).filter(Boolean) ?? [];
  const pins = cms.reach?.pins ?? [];

  return {
    hero: {
      title: text(cms.hero?.headline, fallback.hero.title),
      paragraphs: paragraphs?.length ? paragraphs : fallback.hero.paragraphs,
      // Four collage tiles; a missing one stays the Figma grey placeholder.
      images: collage.some(Boolean)
        ? fallback.hero.images.map((_, i) => collage[i] ?? null)
        : fallback.hero.images,
    },
    values: {
      ...heading(cms.values, fallback.values),
      // A value without its own image keeps the storyboard still in the
      // same position.
      items: values.length
        ? values.map((item, i) => ({
            id: item.id,
            title: item.title,
            description: item.description ?? "",
            image:
              resolveMediaUrl(item.image as CmsImageRef) ??
              fallback.values.items[i % fallback.values.items.length].image,
            video: resolveMediaUrl(item.video as CmsImageRef) ?? undefined,
          }))
        : fallback.values.items,
    },
    leader: {
      ...heading(cms.leader, fallback.leader),
      quote: text(cms.leader?.quote, fallback.leader.quote),
      name: text(cms.leader?.name, fallback.leader.name),
      role: text(cms.leader?.role, fallback.leader.role),
      portrait: resolveMediaUrl(cms.leader?.portrait as CmsImageRef) ?? fallback.leader.portrait,
    },
    reach: {
      ...heading(cms.reach, fallback.reach),
      stats: stats.length ? stats : fallback.reach.stats,
      map: resolveMediaUrl(cms.reach?.map as CmsImageRef) ?? fallback.reach.map,
      pins: pins.length
        ? pins.map((pin, i) => ({
            id: pin.id ?? String(i),
            x: pin.x,
            y: pin.y,
            title: pin.title || undefined,
            location: pin.location || undefined,
            href: pin.href || undefined,
          }))
        : fallback.reach.pins,
    },
    careers: {
      ...heading(cms.careers, fallback.careers),
      image: resolveMediaUrl(cms.careers?.image as CmsImageRef) ?? fallback.careers.image,
      label: text(cms.careers?.label, fallback.careers.label),
      points: mapCareersPageContent(marketing).culture.highlights,
      ctaLabel: text(cms.careers?.ctaLabel, fallback.careers.ctaLabel),
      ctaHref: text(cms.careers?.ctaHref, fallback.careers.ctaHref),
    },
  };
}

type HomeCms = NonNullable<MarketingContent["home"]>;

/** Empty CMS text keeps the fallback's. */
const text = (value: string | null | undefined, fallback: string) =>
  value?.trim() ? value : fallback;

function heading(
  cms: { eyebrow?: string | null; title?: string | null } | null | undefined,
  fallback: { eyebrow: string; title: string },
) {
  return { eyebrow: text(cms?.eyebrow, fallback.eyebrow), title: text(cms?.title, fallback.title) };
}

/** Home sections below the hero: each list replaces the fallback's only once
 *  it has entries, so an empty section keeps the current content. */
export function mapHomePage(
  marketing: MarketingContent | null,
  fallback: HomePageContent = homePageContent,
): HomePageContent {
  const cms: HomeCms | undefined = marketing?.home ?? undefined;
  if (!cms) return fallback;

  const services = cms.whatWeDo?.items ?? [];
  const logos = cms.clientLogos ?? [];
  const cards = cms.impact?.cards ?? [];
  const stats = cms.impact?.stats ?? [];
  const steps = cms.howWeWork?.steps ?? [];
  const people = cms.whoWeAre?.people ?? [];

  return {
    whatWeDo: {
      ...heading(cms.whatWeDo, fallback.whatWeDo),
      items: services.length
        ? services.map((item) => ({
            label: item.label,
            name: item.name,
            description: item.description,
            href: item.href,
            variant: item.variant,
            image: resolveMediaUrl(item.image as CmsImageRef),
          }))
        : fallback.whatWeDo.items,
    },
    clients: {
      ...heading(cms.clients, fallback.clients),
      logos: logos.length
        ? logos.map((item) => ({
            name: item.name ?? "",
            logo: resolveMediaUrl(item.logo as CmsImageRef),
          }))
        : fallback.clients.logos,
    },
    impact: {
      ...heading(cms.impact, fallback.impact),
      cards: cards.length
        ? cards.map((card) => ({
            title: card.title,
            tags: card.tags?.map((tag) => tag.label) ?? [],
            image: resolveMediaUrl(card.image as CmsImageRef),
            href: card.href || null,
          }))
        : fallback.impact.cards,
      stats: stats.length
        ? stats.map((stat) => ({ value: stat.value, label: stat.label }))
        : fallback.impact.stats,
      ctaLabel: text(cms.impact?.ctaLabel, fallback.impact.ctaLabel),
      ctaHref: text(cms.impact?.ctaHref, fallback.impact.ctaHref),
    },
    howWeWork: {
      ...heading(cms.howWeWork, fallback.howWeWork),
      steps: steps.length
        ? steps.map((step, i) => ({
            id: step.id ?? String(i),
            title: step.title,
            body: step.body,
            image:
              resolveMediaUrl(step.image as CmsImageRef) ??
              fallback.howWeWork.steps[i % fallback.howWeWork.steps.length].image,
          }))
        : fallback.howWeWork.steps,
    },
    whoWeAre: {
      ...heading(cms.whoWeAre, fallback.whoWeAre),
      people: people.length
        ? people.map((person, i) => ({
            id: person.id ?? String(i),
            name: person.name,
            role: person.role,
            photo: resolveMediaUrl(person.photo as CmsImageRef),
          }))
        : fallback.whoWeAre.people,
      ctaLabel: text(cms.whoWeAre?.ctaLabel, fallback.whoWeAre.ctaLabel),
      ctaHref: text(cms.whoWeAre?.ctaHref, fallback.whoWeAre.ctaHref),
    },
    lab: {
      ...heading(cms.lab, fallback.lab),
      background: resolveMediaUrl(cms.lab?.background as CmsImageRef) ?? fallback.lab.background,
      demoImage: resolveMediaUrl(cms.lab?.demoImage as CmsImageRef) ?? fallback.lab.demoImage,
      demoVideo: resolveMediaUrl(cms.lab?.demoVideo as CmsImageRef) ?? fallback.lab.demoVideo,
    },
  };
}

/** Industries menu groups (nav, mobile menu, footer); empty keeps the default. */
export function mapIndustryMenu(marketing: MarketingContent | null): IndustryMenuGroup[] {
  const groups = marketing?.industryMenu ?? [];
  if (!groups.length) return DEFAULT_INDUSTRY_MENU;
  return groups.map((group) => ({
    title: group.title,
    items: (group.items ?? []).map((item) => ({ label: item.label, href: item.href || null })),
  }));
}

/** The footer's "Let's start a conversation" band; empty fields keep the defaults. */
export function mapFooterCta(marketing: MarketingContent | null) {
  const cta = marketing?.cta;
  return {
    // Typeset apostrophes, as in the default "Let’s start a conversation".
    headline: cta?.headline?.trim().replace(/'/g, "\u2019") || undefined,
    label: cta?.buttonLabel?.trim() || undefined,
    href: cta?.buttonHref?.trim() || undefined,
    still: resolveMediaUrl(cta?.still as CmsImageRef) ?? undefined,
    video: resolveMediaUrl(cta?.video as CmsImageRef) ?? undefined,
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
    title: text(cms.hero?.headline, fallback.title),
    image:
      resolveMediaUrl(cms.details?.officeImage as CmsImageRef) ??
      fallback.image,
    offices: {
      ...heading(cms.locations, fallback.offices),
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
      eyebrow: text(cms.details?.eyebrow, fallback.getInTouch.eyebrow),
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
  const teamVoices =
    cms?.teamVoices?.map((v) => ({
      quote: v.quote,
      name: v.name ?? undefined,
      role: v.role ?? "",
    })) ?? fallback.teamVoices;
  const aboutParagraphs = cms?.aboutHll?.paragraphs?.map((p) => p.text).filter(Boolean) ?? [];
  const shared = {
    teamVoices,
    notices: {
      ...fallback.notices,
      emptyMessage: text(cms?.noRolesMessage, fallback.notices.emptyMessage),
    },
    aboutHll: {
      paragraphs: aboutParagraphs.length ? aboutParagraphs : fallback.aboutHll.paragraphs,
      image: resolveMediaUrl(cms?.aboutHll?.image as CmsImageRef) ?? fallback.aboutHll.image,
    },
  };
  if (!cms?.hero?.headline) return { ...fallback, ...shared };

  return {
    ...fallback,
    ...shared,
    accentColor: cms.accentColor ?? fallback.accentColor,
    hero: {
      eyebrow: cms.hero.eyebrow ?? fallback.hero.eyebrow,
      headline: cms.hero.headline ?? fallback.hero.headline,
      description: cms.hero.description ?? fallback.hero.description,
    },
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
      { label: "Capabilities", href: "/services" },
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
