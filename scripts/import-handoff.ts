/**
 * Imports a content handoff (HLL-web-handoff-<date>) into the CMS.
 *
 *   npx payload run scripts/import-handoff.ts -- <handoff folder> [--only engagements]
 *
 * Every page is matched by its permanent handoff ID (the CMS slug), so a
 * second run updates what's there instead of adding duplicates. Images are
 * uploaded once each, named after their engagement and slot, and reused on
 * later runs. A re-run overwrites the imported fields of each page, so edits
 * made in the CMS to those fields are replaced by the handoff's copy.
 */
import fs from "node:fs";
import path from "node:path";

import { getPayload, type Payload } from "payload";

import config from "@payload-config";

import { INDUSTRY_GROUPS } from "../src/data/engagements";

const args = process.argv.slice(2).filter((a) => a !== "--");
const root = args.find((a) => !a.startsWith("--"));
if (!root || !fs.existsSync(root)) {
  console.error("Usage: npx payload run scripts/import-handoff.ts -- <handoff folder>");
  process.exit(1);
}

/** Handoff service IDs → the site's service values. */
const SERVICE: Record<string, string> = {
  "data-analytics": "hll-foundation",
  applications: "hll-application",
  ai: "hll-ai",
  "trust-governance": "hll-trust",
  "people-policy": "hll-people",
  ontology: "hll-ontology",
  cloud: "hll-cloud",
};

type HandoffEngagement = {
  id: string;
  name: string;
  shown_as?: string | null;
  client?: string | null;
  service_id: string;
  tier: string;
  industry_child?: string | null;
  years: string;
  location?: string | null;
  brand_colour?: string | null;
  hero_quote?: string | null;
  quote_attribution?: string | null;
  the_challenge?: string | null;
  our_approach?: string | null;
  what_we_built?: string | null;
  hll_team?: string | null;
  outcomes: { figure: string; text: string }[];
  kpi: { headline: string | null; label: string | null; chart_4_points: string | null; caption: string | null };
  learnings: string[];
};

const report: string[] = [];

/** The site's industry name for a ledger one, ignoring case, spaces and dash style. */
const squash = (text: string) => text.toLowerCase().replace(/[\s\-–—&]+/g, "");
const INDUSTRIES = new Map(
  INDUSTRY_GROUPS.flatMap((group) => group.items).map((name) => [squash(name), name]),
);
function industryFor(name: string | null | undefined, id: string) {
  if (!name) return null;
  const match = INDUSTRIES.get(squash(name));
  if (!match) report.push(`${id}: industry "${name}" isn't in the site's list – left empty`);
  return match ?? null;
}

/** Uploads a file once, as `<prefix>--<file name>`, and returns its media ID. */
async function upload(payload: Payload, file: string, prefix: string, alt: string) {
  const filename = `${prefix}--${path.basename(file)}`;
  const found = await payload.find({
    collection: "media",
    where: { filename: { equals: filename } },
    limit: 1,
    depth: 0,
  });
  if (found.docs[0]) return found.docs[0].id;
  const data = fs.readFileSync(file);
  const doc = await payload.create({
    collection: "media",
    data: { alt, mediaType: "image" },
    file: { data, name: filename, mimetype: "image/webp", size: data.length },
  });
  return doc.id;
}

/** As `upload`, but the file's public URL (for the artwork JSON). */
async function uploadUrl(payload: Payload, file: string, prefix: string, alt: string) {
  const id = await upload(payload, file, prefix, alt);
  const doc = await payload.findByID({ collection: "media", id, depth: 0 });
  return doc.url ?? null;
}

/** Handoff service IDs → their lockup in /public/engagement-lockups. */
const LOCKUP_NAME: Record<string, string> = {
  "data-analytics": "Data & Analytics",
  applications: "Applications",
  ai: "AI",
  "trust-governance": "Trust & Governance",
  "people-policy": "People & Policy",
  ontology: "Ontology",
  cloud: "Cloud",
};

type ArtSize = {
  w: number;
  h: number;
  poster?: string;
  poster2x?: string;
  layer?: string;
  ripple_speed?: number;
  palette?: string[];
  ink?: string;
  scrim?: string;
  live?: unknown;
  elements?: { type: string; cx?: number; cy?: number; max_w?: number; font?: number; weight?: number; colour?: string; align?: string }[];
};

/** The engagement's live artwork: ripple, and per slot its poster, layer and live text. */
async function buildArt(payload: Payload, dir: string, id: string, c: HandoffEngagement, listSlot: string) {
  const file = path.join(dir, "engagement.json");
  if (!fs.existsSync(file)) return null;
  const e = JSON.parse(fs.readFileSync(file, "utf8"));
  const slots: Record<string, unknown> = {};
  for (const slot of ["hero-desktop", "hero-mobile", listSlot, "card-related_490x308", "feature-wide_1492x843"]) {
    const size: ArtSize | undefined = e.sizes?.[slot];
    if (!size) continue;
    const posterFile = [size.poster2x, size.poster].map((f) => f && path.join(dir, f)).find((f) => f && fs.existsSync(f));
    if (!posterFile) continue;
    const poster = await uploadUrl(payload, posterFile, `eng-${id}`, `${c.name}`);
    const layerFile = size.layer && path.join(dir, size.layer);
    const layer = layerFile && fs.existsSync(layerFile) ? await uploadUrl(payload, layerFile, `eng-${id}`, `${c.name}`) : null;
    const texts = (size.elements ?? [])
      .filter((el) => el.type === "client_text" && el.cx != null)
      .map((el) => ({
        cx: el.cx,
        cy: el.cy,
        maxW: el.max_w ?? 80,
        font: el.font ?? 4,
        weight: el.weight ?? 500,
        colour: el.colour ?? "#FFFFFF",
        align: (el.align as string) ?? "center",
      }));
    slots[slot] = {
      w: size.w,
      h: size.h,
      poster,
      ...(layer ? { layer } : {}),
      ...(typeof size.ripple_speed === "number" ? { speed: size.ripple_speed } : {}),
      // README: "Every slot carries its own palette: use it, not the top-level ripple.palette".
      ...(size.palette?.length ? { palette: size.palette } : {}),
      ...(size.ink ? { ink: size.ink } : {}),
      ...(size.scrim ? { scrim: size.scrim } : {}),
      ...(texts.length ? { texts } : {}),
      ...(size.live ? { live: size.live } : {}),
    };
  }
  const quote = c.hero_quote?.trim().replace(/^["“]|["”]$/g, "");
  const [role, ...org] = (c.quote_attribution ?? "").split(",");
  return {
    ripple: e.ripple,
    lockup: LOCKUP_NAME[c.service_id]
      ? { src: `/engagement-lockups/${c.service_id}.webp`, name: LOCKUP_NAME[c.service_id] }
      : undefined,
    quote: quote ? { text: quote, role: role.trim(), organisation: org.join(",").trim() } : undefined,
    listSlot,
    slots,
  };
}

/** The sharpest copy of an image slot that's in the folder. */
function best(dir: string, slot: string) {
  for (const suffix of ["@2x", ""]) {
    const file = path.join(dir, `${slot}${suffix}.webp`);
    if (fs.existsSync(file)) return file;
  }
  return null;
}

/** "1.4s" → value 1.4, unit "s"; "$400M+" or "Same day" stay as written. */
function splitStat(headline: string | null | undefined) {
  if (!headline) return { value: "", unit: "" };
  const match = headline.match(/^(\d+(?:\.\d+)?)\s*(%|x|s|h|d)$/i);
  return match ? { value: match[1], unit: match[2] } : { value: headline, unit: "" };
}

/** "Launch 3.2s | M3 2.1s | …" → [{ label: "Launch", value: 3.2 }, …]. */
function chart(points: string | null | undefined) {
  if (!points) return [];
  return points
    .split("|")
    .map((point) => point.trim())
    .map((point) => {
      const numbers = point.match(/-?\d+(?:\.\d+)?/g);
      const last = numbers?.[numbers.length - 1];
      const label = last ? point.slice(0, point.lastIndexOf(last)).replace(/[$£€\s]+$/, "").trim() : point;
      const display = last ? point.slice(point.lastIndexOf(last) - (/[$£€]/.test(point[point.lastIndexOf(last) - 1] ?? "") ? 1 : 0)).trim() : undefined;
      return { label: label || point, value: last ? Number(last) : 0, display };
    })
    .filter((point) => point.label)
    .slice(0, 6);
}

/** "Name, Role · Name, Role" → rows grouped by role. */
function team(text: string | null | undefined) {
  if (!text) return [];
  const rows = new Map<string, string[]>();
  for (const member of text.split("·").map((m) => m.trim()).filter(Boolean)) {
    const [name, ...role] = member.split(",");
    const key = role.join(",").trim() || "Team";
    rows.set(key, [...(rows.get(key) ?? []), name.trim()]);
  }
  return [...rows].map(([role, names]) => ({ role, names: names.join("\n") }));
}

/** Engagements list cards cycle through these shapes, so the grid keeps the
 *  design's staggered heights (the handoff ships every shape per engagement
 *  and leaves the listing to the site). */
const LIST_CARDS = [
  "card-portrait_490x551",
  "card-landscape_490x317",
  "card-mid_490x403",
  "card-square_490x490",
];

/** Gallery blocks in rows of equal height: 1111 | 623 + 476 | 363 + 363 + 364 | 1096. */
const GALLERY_ROWS = [
  ["block-1111x617"],
  ["block-623x617", "block-476x617"],
  ["block-363x358-a", "block-363x358-b", "block-364x358"],
  ["block-1096x617"],
];

async function importEngagements(payload: Payload) {
  const base = path.join(root!, "02-engagements");
  const ids = fs.readdirSync(base).filter((id) => fs.existsSync(path.join(base, id, "content.json")));
  let order = 0;
  for (const id of ids.sort()) {
    const dir = path.join(base, id);
    const c: HandoffEngagement = JSON.parse(fs.readFileSync(path.join(dir, "content.json"), "utf8"));
    const title = c.shown_as || c.client || c.name;
    const img = (slot: string, alt: string) => {
      const file = best(dir, slot);
      return file ? upload(payload, file, `eng-${id}`, alt) : Promise.resolve(null);
    };

    const hero = await img("hero-desktop", `${c.name}: hero`);
    const listSlot = LIST_CARDS[order % LIST_CARDS.length];
    const card =
      (await img(listSlot, `${c.name}`)) ?? (await img("card-related_490x308", `${c.name}`));
    const art = await buildArt(payload, dir, id, c, listSlot);
    const feature = await img("feature-wide_1492x843", `${c.name}: what we built`);
    const rows = [];
    for (const row of GALLERY_ROWS) {
      const images = [];
      for (const slot of row) {
        const media = await img(slot, `${c.name}: screen`);
        if (media) images.push(media);
      }
      if (images.length) rows.push({ images });
    }

    const quote = c.hero_quote?.trim().replace(/^["“]|["”]$/g, "");
    const [quoteRole, ...quoteOrg] = (c.quote_attribution ?? "").split(",");
    const stat = splitStat(c.kpi.headline);
    if (!c.kpi.headline) report.push(`${id}: no KPI in the ledger`);
    const yearMatch = c.years.match(/\d{4}/);
    const year = yearMatch ? Number(yearMatch[0]) - (/^pre/i.test(c.years) ? 1 : 0) : new Date().getFullYear();
    if (/confirm|pre-/i.test(c.years)) report.push(`${id}: dates "${c.years}" – year set to ${year}, please confirm`);
    if (!c.industry_child) report.push(`${id}: no industry in the ledger`);
    if (c.brand_colour && !/^#[0-9a-f]{6}$/i.test(c.brand_colour)) report.push(`${id}: brand colour is "${c.brand_colour}" – site default used`);
    if (!c.outcomes.length) report.push(`${id}: no outcomes in the ledger`);

    const layout = [
      ...(hero ? [{ blockType: "engagementMedia", image: hero }] : []),
      ...(quote ? [{ blockType: "engagementQuote", quote, name: quoteOrg.join(",").trim() || undefined, role: quoteRole.trim() || undefined }] : []),
      ...(c.the_challenge ? [{ blockType: "engagementText", label: "The challenge", body: c.the_challenge, showsArtifact: true }] : []),
      ...(c.our_approach ? [{ blockType: "engagementText", label: "Our approach", body: c.our_approach }] : []),
      ...(c.what_we_built
        ? [{ blockType: "engagementShowcase", label: "What we built", display: feature ? "media" : "text", body: c.what_we_built, image: feature ?? undefined }]
        : []),
      ...(rows.length ? [{ blockType: "engagementMediaGrid", rows }] : []),
      ...(c.outcomes.length
        ? [{ blockType: "engagementOutcome", label: "Outcome", items: c.outcomes.map((o) => ({ stat: o.figure, text: o.text })) }]
        : []),
      ...(team(c.hll_team).length ? [{ blockType: "engagementTeam", label: "Team", rows: team(c.hll_team) }] : []),
      ...(c.learnings.length
        ? [{ blockType: "engagementLearnings", label: "Our learnings", items: c.learnings.map((text) => ({ text })) }]
        : []),
    ];

    const data = {
      client: title,
      slug: id,
      status: "published" as const,
      year,
      engagementType: "case-study" as const,
      template: "case-study" as const,
      services: SERVICE[c.service_id] ? [SERVICE[c.service_id]] : [],
      industry: industryFor(c.industry_child, id),
      period: c.years,
      location: c.location || null,
      // Some ledger rows say "Default (white/grey)" instead of a colour.
      primaryColor: /^#[0-9a-f]{6}$/i.test(c.brand_colour ?? "") ? c.brand_colour : null,
      cardImage: card,
      featured: false,
      sortOrder: order++,
      stat: {
        label: c.kpi.label ?? undefined,
        value: stat.value,
        unit: stat.unit,
        body: c.kpi.caption ?? undefined,
        chart: chart(c.kpi.chart_4_points),
      },
      layout,
      art,
    };

    const existing = await payload.find({
      collection: "engagements",
      where: { slug: { equals: id } },
      limit: 1,
      depth: 0,
    });
    if (existing.docs[0]) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await payload.update({ collection: "engagements", id: existing.docs[0].id, data: data as any });
      console.log(`updated  ${id}`);
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await payload.create({ collection: "engagements", data: data as any });
      console.log(`created  ${id}`);
    }
  }
}

const payload = await getPayload({ config });
const only = args.includes("--only") ? args[args.indexOf("--only") + 1] : null;
if (!only || only === "engagements") await importEngagements(payload);
if (report.length) {
  console.log("\nTo check:");
  for (const line of report) console.log(`  - ${line}`);
}
process.exit(0);
