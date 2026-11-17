import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";

import type { EngagementMedia } from "@/data/engagements";
import type { Media, Post } from "@/payload-types";

import { getPayloadClient } from "./client";

export type InsightStat = { stat: string; text: string };

export type InsightBlock =
  | { kind: "text"; id: string; label?: string; paragraphs: string[] }
  | { kind: "stats"; id: string; label?: string; items: InsightStat[] }
  | { kind: "media"; id: string; media: EngagementMedia }
  | { kind: "quote"; id: string; quote: string; name?: string; role?: string; colour: string }
  | {
      kind: "box";
      id: string;
      colour: string;
      content: "quote" | "demo" | "outcomes";
      quote?: string;
      name?: string;
      role?: string;
      demoUrl?: string;
      items: InsightStat[];
    };

export type Insight = {
  id: number;
  slug: string;
  title: string;
  byline?: string;
  tags: string[];
  excerpt?: string;
  cover: EngagementMedia;
  author?: { name: string; photo: string | null };
  date: string | null;
  featured: boolean;
  intro: SerializedEditorState | null;
  blocks: InsightBlock[];
  related: number[];
};

const BLUE = "#086EE8";
const HEX = /^#[0-9a-f]{6}$/i;

const paragraphs = (body?: string | null) =>
  (body ?? "")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

function media(ref: number | Media | null | undefined, video?: number | Media | null): EngagementMedia {
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

const colour = (value?: string | null) => (value && HEX.test(value) ? value : BLUE);

const stats = (items?: { stat: string; text: string }[] | null) =>
  (items ?? []).map(({ stat, text }) => ({ stat, text }));

function mapBlock(block: NonNullable<Post["sections"]>[number], index: number): InsightBlock {
  const id = block.id ?? `block-${index}`;
  switch (block.blockType) {
    case "insightText":
      return { kind: "text", id, label: block.label ?? undefined, paragraphs: paragraphs(block.body) };
    case "insightStats":
      return { kind: "stats", id, label: block.label ?? undefined, items: stats(block.items) };
    case "insightMedia":
      return { kind: "media", id, media: media(block.image, block.video) };
    case "insightQuote":
      return {
        kind: "quote",
        id,
        quote: block.quote,
        name: block.name ?? undefined,
        role: block.role ?? undefined,
        colour: colour(block.colour),
      };
    case "insightBox":
      return {
        kind: "box",
        id,
        colour: colour(block.colour),
        content: block.content,
        quote: block.quote ?? undefined,
        name: block.name ?? undefined,
        role: block.role ?? undefined,
        demoUrl: block.demoUrl ?? undefined,
        items: stats(block.items),
      };
  }
}

export function mapInsight(post: Post): Insight {
  const author = post.author?.name
    ? {
        name: post.author.name,
        photo:
          post.author.photo && typeof post.author.photo === "object"
            ? post.author.photo.url ?? null
            : null,
      }
    : undefined;
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    byline: post.byline ?? undefined,
    tags: post.tags ?? [],
    excerpt: post.excerpt ?? undefined,
    cover: media(post.coverImage),
    author,
    date: post.publishedAt ?? null,
    featured: Boolean(post.featured),
    intro: (post.body as SerializedEditorState | null | undefined) ?? null,
    blocks: (post.sections ?? []).map(mapBlock),
    related: (post.related ?? []).map((r) => (typeof r === "object" ? r.id : r)),
  };
}

/** Every published article, newest first. */
export async function loadInsights(): Promise<Insight[]> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "posts",
      where: { _status: { equals: "published" } },
      sort: "-publishedAt",
      limit: 200,
      depth: 1,
    });
    return result.docs.map(mapInsight);
  } catch {
    return [];
  }
}

/** "12 November 2026", as the Figma date line (set in capitals there). */
export function formatInsightDate(date: string | null) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** The editor's picks, else the latest articles sharing a tag, else the latest. */
export function relatedInsights(insight: Insight, all: Insight[], count = 3) {
  const others = all.filter((i) => i.id !== insight.id);
  const picked = insight.related
    .map((id) => others.find((i) => i.id === id))
    .filter((i): i is Insight => Boolean(i));
  if (picked.length) return picked.slice(0, count);
  const tags = new Set(insight.tags.map((t) => t.toLowerCase()));
  const sharing = others.filter((i) => i.tags.some((t) => tags.has(t.toLowerCase())));
  const rest = others.filter((i) => !sharing.includes(i));
  return [...sharing, ...rest].slice(0, count);
}
