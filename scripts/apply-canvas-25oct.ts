/**
 * Puts Hannan's canvas copy (internal-dev "19/10/26", 25 Oct 2026) into the
 * CMS where the CMS overrides the built-in text, or where it needs media:
 *
 *   npx payload run scripts/apply-canvas-25oct.ts
 *
 * - Home › Our Impact: the six cards (DocuPet, McKinsey & Company, Galeries
 *   Lafayette / Wataniya, KTM / WeWork) with each engagement's card image.
 * - About: the "ABOUT HLL" intro, and a description for each value (the five
 *   with motion pieces; "Craft as Currency" becomes "Craft is Currency").
 * - Careers: the header line and the three "Why work at HLL?" points.
 * - Team: the intro line, and the founder plus leadership as Team members
 *   (the placeholder members are removed).
 * - Contact: "Schedule a call" goes to rima@hyperlycheelabs.com.
 * - Site settings: the LinkedIn company page.
 *
 * Re-running sets the same values again. Images and other fields stay.
 */
import { getPayload } from "payload";

import config from "@payload-config";
import { ABOUT_HLL_INTRO, careersPageContent } from "@/data/careers-page";
import { homePageContent } from "@/data/home";
import { teamPageContent } from "@/data/team-page";

const VALUES: Record<string, { title: string; description: string }> = {
  "kinetic-agility": {
    title: "Kinetic Agility",
    description: "We are fluid with a small surface and massive depth.",
  },
  "thoughtful-outlook": {
    title: "Thoughtful Outlook",
    description:
      "Every decision feels considered, shaped by the synthesis of experience, knowledge, and research into meaningful action.",
  },
  "intelligence-and-imagination": {
    title: "Intelligence and Imagination",
    description:
      "We believe human ingenuity has the ability to innovate and solve root node problems for an accelerated advancement.",
  },
  "cognitive-craft": {
    title: "Cognitive Craft",
    description:
      "We are imaginative thinkers at the bleeding edge of our craft, dedicated to being a part of your growth story.",
  },
  "craft-as-currency": {
    title: "Craft is Currency",
    description:
      "Creativity, emotions, dreaming, consciousness and excellence in our craft is the currency of our collective future.",
  },
};

const payload = await getPayload({ config });

// Home › Our Impact: each card takes its engagement's card image.
const cards = [];
for (const card of homePageContent.impact.cards) {
  const slug = card.href?.split("/").pop() ?? "";
  const found = await payload.find({ collection: "engagements", where: { slug: { equals: slug } }, limit: 1, depth: 0 });
  const engagement = found.docs[0];
  if (!engagement) console.error(`no engagement "${slug}" – ${card.title} has no image`);
  cards.push({
    title: card.title,
    tags: card.tags.map((label) => ({ label })),
    image: engagement?.cardImage ?? null,
    href: card.href,
  });
}

const current = await payload.findGlobal({ slug: "marketing-content", depth: 0 });
const about = current.about ?? {};
const careers = current.careers ?? {};
const team = current.team ?? {};
const contact = current.contact ?? {};

await payload.updateGlobal({
  slug: "marketing-content",
  data: {
    home: { ...(current.home ?? {}), impact: { ...(current.home?.impact ?? {}), cards } },
    about: {
      ...about,
      story: { ...(about.story ?? {}), paragraphs: ABOUT_HLL_INTRO.map((text) => ({ text })) },
      values: {
        ...(about.values ?? {}),
        items: (about.values?.items ?? []).map((item) => ({ ...item, ...(VALUES[item.id] ?? {}) })),
      },
    },
    careers: {
      ...careers,
      hero: { ...(careers.hero ?? {}), headline: careersPageContent.hero.headline },
      culture: {
        ...(careers.culture ?? {}),
        highlights: careersPageContent.culture.highlights.map((h) => ({ ...h })),
      },
    },
    team: { ...team, hero: { ...(team.hero ?? {}), description: teamPageContent.hero.description } },
    contact: {
      ...contact,
      details: {
        ...(contact.details ?? {}),
        scheduleUrl: "mailto:rima@hyperlycheelabs.com?subject=Schedule%20a%20call",
      },
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any,
});

const settings = await payload.findGlobal({ slug: "site-settings", depth: 0 });
const social = (settings.socialLinks ?? []).filter((link) => link.platform !== "linkedin");
await payload.updateGlobal({
  slug: "site-settings",
  data: { socialLinks: [...social, { platform: "linkedin", url: "https://www.linkedin.com/company/hyper-lychee-labs" }] },
});

// Team members: the canvas list replaces the placeholders.
const old = await payload.find({ collection: "team-members", limit: 200, depth: 0 });
for (const member of old.docs) await payload.delete({ collection: "team-members", id: member.id });
for (const [i, member] of teamPageContent.members.entries()) {
  await payload.create({
    collection: "team-members",
    data: {
      name: member.name,
      slug: member.id,
      role: member.role,
      bio: member.bio,
      department: member.department,
      featured: member.featured ?? false,
      sortOrder: i + 1,
    },
  });
}

console.log(
  `canvas copy applied: ${cards.length} impact cards, ${ABOUT_HLL_INTRO.length} about paragraphs, ` +
    `${about.values?.items?.length ?? 0} values, ${teamPageContent.members.length} team members (removed ${old.docs.length})`,
);
process.exit(0);
