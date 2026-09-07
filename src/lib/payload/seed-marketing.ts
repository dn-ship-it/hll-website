import type { Payload } from "payload";

import { aboutPage } from "@/data/about";
import { careersPageContent } from "@/data/careers-page";
import { contactPageContent } from "@/data/contact-page";
import { healthcareIndustry } from "@/data/industries/healthcare";
import { hllFoundation } from "@/data/services/hll-foundation";
import { teamPageContent } from "@/data/team-page";

function foundationPageContentSeed() {
  const f = hllFoundation;
  return {
    brand: f.brand,
    breadcrumb: f.breadcrumb.map((label) => ({ label })),
    hero: {
      headline: f.hero.headline,
      tabs: f.hero.tabs.map((tab) => ({ id: tab.id, label: tab.label })),
    },
    capabilities: {
      eyebrow: f.capabilities.eyebrow,
      title: f.capabilities.title,
      items: f.capabilities.items.map((item) => ({
        id: item.id,
        index: item.index,
        title: item.title,
        description: item.description,
        subServices: item.subServices?.map((label) => ({ label })) ?? [],
      })),
      tools: {
        cloud: f.capabilities.tools.cloud.map((label) => ({ label })),
        data: f.capabilities.tools.data.map((label) => ({ label })),
      },
    },
    outcomes: {
      title: f.outcomes.title,
      cards: f.outcomes.cards.map((card) => ({
        stat: card.stat,
        description: card.description,
        hasMedia: card.hasMedia ?? false,
      })),
    },
    engagement: {
      title: f.engagement.title,
      intro: f.engagement.intro,
      cards: f.engagement.cards.map((card) => ({
        id: card.id,
        title: card.title,
        client: card.client,
        tag: card.tag,
        description: card.description,
        variant: card.variant,
      })),
    },
    expertVoice: {
      quote: f.expertVoice.quote,
      name: f.expertVoice.name,
      role: f.expertVoice.role,
      company: f.expertVoice.company,
    },
    relatedServices: f.relatedServices.map((link) => ({
      label: link.label,
      href: link.href,
    })),
  };
}

function healthcarePageContentSeed() {
  const h = healthcareIndustry;
  return {
    category: h.category,
    breadcrumb: h.breadcrumb.map((label) => ({ label })),
    accentColor: h.accentColor,
    hero: {
      title: h.hero.title,
      headline: h.hero.headline,
      overlayLabel: h.hero.overlayLabel,
      filters: h.hero.filters.map((f) => ({ id: f.id, label: f.label })),
    },
    capabilities: {
      eyebrow: h.capabilities.eyebrow,
      title: h.capabilities.title,
      sidebar: h.capabilities.sidebar.map((label) => ({ label })),
      items: h.capabilities.items.map((item) => ({
        id: item.id,
        index: item.index,
        title: item.title,
        description: item.description,
        cards: item.cards.map((card) => ({
          id: card.id,
          title: card.title,
          client: card.client,
          tag: card.tag,
          description: card.description,
          variant: card.variant,
        })),
      })),
    },
    clientVoice: h.clientVoice,
    experts: {
      eyebrow: h.experts.eyebrow,
      title: h.experts.title,
      people: h.experts.people.map((p) => ({ name: p.name, bio: p.bio })),
    },
    lab: h.lab,
    relatedIndustries: h.relatedIndustries.map((link) => ({
      label: link.label,
      href: link.href,
    })),
  };
}

export async function seedMarketingContent(payload: Payload) {
  try {
    const existing = await payload.findGlobal({
      slug: "marketing-content",
      overrideAccess: true,
    });

    if (!existing?.about?.hero?.headline) {
      await payload.updateGlobal({
        slug: "marketing-content",
        overrideAccess: true,
        data: {
          home: {
            heroHeading:
              "We champion future-facing initiatives for an accelerated advancement.",
            heroCtaLabel: "See our work",
            heroCtaHref: "/#impact",
          },
          about: {
            accentColor: aboutPage.accentColor,
            hero: {
              eyebrow: aboutPage.hero.eyebrow,
              headline: aboutPage.hero.headline,
              description: aboutPage.hero.description,
              ctaLabel: aboutPage.hero.ctaLabel,
              ctaHref: aboutPage.hero.ctaHref,
            },
            story: {
              eyebrow: aboutPage.story.eyebrow,
              title: aboutPage.story.title,
              paragraphs: aboutPage.story.paragraphs.map((text) => ({ text })),
            },
            values: {
              eyebrow: aboutPage.values.eyebrow,
              title: aboutPage.values.title,
              items: aboutPage.values.items.map((item) => ({
                id: item.id,
                title: item.title,
                description: item.description,
              })),
            },
            promise: aboutPage.promise,
            clients: {
              eyebrow: aboutPage.clients.eyebrow,
              title: aboutPage.clients.title,
            },
          },
          contact: {
            accentColor: contactPageContent.accentColor,
            hero: contactPageContent.hero,
            details: contactPageContent.details,
            locations: {
              eyebrow: contactPageContent.locations.eyebrow,
              title: contactPageContent.locations.title,
              items: contactPageContent.locations.items.map((item) => ({
                id: item.id,
                city: item.city,
                label: item.label,
                address: item.address,
              })),
            },
          },
          careers: {
            accentColor: careersPageContent.accentColor,
            hero: careersPageContent.hero,
            culture: {
              eyebrow: careersPageContent.culture.eyebrow,
              title: careersPageContent.culture.title,
              description: careersPageContent.culture.description,
              highlights: careersPageContent.culture.highlights.map((h) => ({
                id: h.id,
                title: h.title,
                body: h.body,
              })),
            },
          },
          team: {
            accentColor: teamPageContent.accentColor,
            hero: teamPageContent.hero,
            grid: {
              eyebrow: teamPageContent.grid.eyebrow,
              title: teamPageContent.grid.title,
            },
            join: teamPageContent.join,
          },
          footerServices: [
            { label: "HLL Kinetic" },
            { label: "HLL Momentum" },
            { label: "HLL Mission" },
            { label: "HLL Foundation" },
            { label: "HLL Ontology" },
            { label: "HLL Trust & Governance" },
          ],
          footerIndustries: [
            { label: "Financial Services" },
            { label: "Banking" },
            { label: "Insurance" },
            { label: "Healthcare" },
            { label: "Retail" },
            { label: "Technology" },
          ],
          cta: {
            headline: "Let's start a conversation",
            buttonLabel: "Write to us",
            buttonHref: "/contact",
          },
        },
      });
    }
  } catch {
    // marketing-content global may not exist yet
  }

  try {
    const foundation = await payload.find({
      collection: "services",
      where: { slug: { equals: "hll-foundation" } },
      limit: 1,
      overrideAccess: true,
    });

    if (foundation.docs[0] && !foundation.docs[0].pageContent?.hero?.headline) {
      await payload.update({
        collection: "services",
        id: foundation.docs[0].id,
        overrideAccess: true,
        data: {
          pageContent: foundationPageContentSeed(),
        },
      });
    }
  } catch {
    // optional
  }

  try {
    const industry = await payload.find({
      collection: "industries",
      where: { slug: { equals: "healthcare" } },
      limit: 1,
      overrideAccess: true,
    });

    if (industry.totalDocs === 0) {
      await payload.create({
        collection: "industries",
        overrideAccess: true,
        data: {
          title: "Health & Life Sciences",
          slug: "healthcare",
          _status: "published",
          pageContent: healthcarePageContentSeed(),
        },
      });
    }
  } catch {
    // optional
  }

  try {
    const members = await payload.find({
      collection: "team-members",
      limit: 1,
      overrideAccess: true,
    });

    if (members.totalDocs === 0) {
      for (const [index, member] of teamPageContent.members.entries()) {
        await payload.create({
          collection: "team-members",
          overrideAccess: true,
          data: {
            name: member.name,
            slug: `${member.name.toLowerCase().replace(/\s+/g, "-")}-${index + 1}`,
            role: member.role,
            bio: member.bio,
            department: member.department,
            featured: member.featured ?? false,
            sortOrder: index,
          },
        });
      }
    }
  } catch {
    // optional
  }

  try {
    const settings = await payload.findGlobal({
      slug: "site-settings",
      overrideAccess: true,
    });

    if (settings?.siteName === "HLL Cornerstone" || !settings?.headerNav?.length) {
      await payload.updateGlobal({
        slug: "site-settings",
        overrideAccess: true,
        data: {
          siteName: "Hyper Lychee Labs",
          headerNav: [
            { label: "Services", href: "/services", variant: "services" },
            { label: "Industries", href: "/industries", variant: "industries" },
            { label: "Engagement", href: "/engagement", variant: "engagement" },
            { label: "About", href: "/about", variant: "about" },
            { label: "Contact", href: "/contact", variant: "contact" },
          ],
          footerLinks: [
            { label: "Home", href: "/" },
            { label: "About", href: "/about" },
            { label: "Team", href: "/team" },
            { label: "Careers", href: "/careers" },
            { label: "Contact", href: "/contact" },
          ],
          socialLinks: [
            { platform: "linkedin", url: "https://linkedin.com" },
          ],
          defaultSeo: {
            title: "Hyper Lychee Labs",
            description:
              "Future-facing initiatives for accelerated advancement through data, AI, and experience design.",
          },
        },
      });
    }
  } catch {
    // optional
  }
}
