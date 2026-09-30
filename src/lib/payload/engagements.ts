import type { Engagement as CmsEngagement, Media } from "@/payload-types";
import {
  fallbackEngagements,
  type Engagement,
  type EngagementBlock,
  type EngagementMedia,
  type EngagementType,
} from "@/data/engagements";

import { getPayloadClient } from "./client";

const TYPE_LABELS: Record<CmsEngagement["engagementType"], EngagementType> = {
  insight: "Insight",
  "client-work": "Client Work",
  "case-study": "Case Study",
};

const paragraphs = (body?: string | null) =>
  (body ?? "")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

function media(
  ref: number | Media | null | undefined,
  video?: number | Media | null,
): EngagementMedia {
  const doc = ref && typeof ref === "object" ? ref : null;
  const clip = video && typeof video === "object" ? video : null;
  return {
    src: doc?.url ?? null,
    width: doc?.width ?? clip?.width ?? undefined,
    height: doc?.height ?? clip?.height ?? undefined,
    alt: doc?.alt ?? "",
    video: clip?.url ?? null,
  };
}

function mapBlock(
  block: NonNullable<CmsEngagement["layout"]>[number],
  index: number,
): EngagementBlock | null {
  const id = block.id ?? `block-${index}`;
  switch (block.blockType) {
    case "engagementMedia":
      return { kind: "media", id, media: media(block.image, block.video) };
    case "engagementQuote":
      return {
        kind: "quote",
        id,
        quote: block.quote,
        name: block.name ?? undefined,
        role: block.role ?? undefined,
        media: block.image ? media(block.image) : undefined,
      };
    case "engagementMediaGrid":
      return {
        kind: "mediaGrid",
        id,
        rows: (block.rows ?? []).map((row) =>
          row.images.map((image) => media(image)),
        ),
      };
    case "engagementText":
      return {
        kind: "text",
        id,
        label: block.label ?? undefined,
        paragraphs: paragraphs(block.body),
        showsArtifact: block.showsArtifact ?? false,
      };
    case "engagementShowcase":
      return {
        kind: "showcase",
        id,
        label: block.label ?? "What we built",
        display: block.display ?? "text",
        paragraphs: paragraphs(block.body),
        media: block.image ? media(block.image) : undefined,
        demoUrl: block.demoUrl ?? undefined,
      };
    case "engagementOutcome":
      return {
        kind: "outcome",
        id,
        label: block.label ?? "Outcome",
        items: (block.items ?? []).map((item) => ({
          stat: item.stat,
          text: item.text,
        })),
      };
    case "engagementTeam":
      return {
        kind: "team",
        id,
        label: block.label ?? "Team",
        rows: (block.rows ?? []).map((row) => ({
          role: row.role,
          names: row.names
            .split("\n")
            .map((n) => n.trim())
            .filter(Boolean),
        })),
      };
    case "engagementLearnings":
      return {
        kind: "learnings",
        id,
        label: block.label ?? "Our learnings",
        items: (block.items ?? []).map((item) => item.text),
      };
    default:
      return null;
  }
}

export function mapEngagement(doc: CmsEngagement): Engagement {
  const stat = doc.stat?.label && doc.stat.value ? doc.stat : null;
  return {
    id: String(doc.id),
    slug: doc.slug,
    client: doc.client,
    year: doc.year,
    type: TYPE_LABELS[doc.engagementType],
    template: doc.template,
    services: doc.services ?? [],
    industry: doc.industry ?? undefined,
    period: doc.period ?? undefined,
    location: doc.location ?? undefined,
    primaryColor: doc.primaryColor ?? undefined,
    featured: doc.featured ?? false,
    card: media(doc.cardImage),
    stat: stat
      ? {
          label: stat.label!,
          value: stat.value!,
          unit: stat.unit ?? undefined,
          body: stat.body ?? undefined,
          chart: (stat.chart ?? []).map((bar) => ({
            label: bar.label,
            value: bar.value,
          })),
        }
      : undefined,
    blocks: (doc.layout ?? [])
      .map(mapBlock)
      .filter((b): b is EngagementBlock => b !== null),
    related: (doc.related ?? [])
      .map((r) => (typeof r === "object" ? r.slug : null))
      .filter((s): s is string => !!s),
  };
}

/** Published engagements from the CMS, or the Figma placeholders until there are any. */
export async function loadEngagements(): Promise<Engagement[]> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "engagements",
      where: { status: { equals: "published" } },
      sort: ["sortOrder", "-year"],
      limit: 200,
      depth: 2,
    });
    if (result.docs.length > 0) return result.docs.map(mapEngagement);
  } catch {
    // fall through to the placeholders
  }
  return fallbackEngagements;
}

/**
 * "Explore related engagements": picked in the CMS, else chosen here. On a
 * case study "all case studies in it will be of the same service"; a story
 * takes any that share a service, then the latest.
 */
export function relatedEngagements(
  current: Engagement,
  all: Engagement[],
  count = 3,
): Engagement[] {
  const others = all.filter((e) => e.slug !== current.slug);
  if (current.related?.length) {
    return current.related
      .map((slug) => others.find((e) => e.slug === slug))
      .filter((e): e is Engagement => !!e);
  }
  if (current.template === "case-study") {
    const service = current.services[0];
    return others
      .filter((e) => service && e.services.includes(service))
      .slice(0, count);
  }
  const shared = others.filter((e) =>
    e.services.some((s) => current.services.includes(s)),
  );
  return [...shared, ...others.filter((e) => !shared.includes(e))].slice(
    0,
    count,
  );
}
