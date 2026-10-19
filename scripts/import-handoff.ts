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

import { SERVICE_NAMES, SERVICE_SLUGS } from "../src/components/hll/variants";
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
  industry?: string | null;
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
/** Engagement ID → the site industries whose handoff page lists it in linked_engagement_ids. */
function linkedIndustries(): Map<string, string[]> {
  const base = path.join(root!, "04-industries");
  const links = new Map<string, string[]>();
  if (!fs.existsSync(base)) return links;
  for (const dir of fs.readdirSync(base).sort()) {
    const file = path.join(base, dir, "content.json");
    if (!fs.existsSync(file)) continue;
    const page = JSON.parse(fs.readFileSync(file, "utf8"));
    const industry = INDUSTRIES.get(squash(page.name ?? ""));
    if (!industry) continue;
    for (const id of page.linked_engagement_ids ?? []) links.set(id, [...(links.get(id) ?? []), industry]);
  }
  return links;
}

/** "Consumer and commerce" and "Commerce & Consumer" are the same group. */
const words = (text: string) =>
  [...new Set(text.toLowerCase().split(/[^a-z]+/).filter((w) => w && w !== "and"))].sort().join(" ");

/**
 * The engagement's site industry, from the handoff only: the ledger's
 * sub-industry, else its industry column (some rows have the two swapped,
 * e.g. "Insurance" / "Financial Services"), else the industry page that lists
 * the engagement – when several do, the one in the ledger's industry group.
 */
function engagementIndustry(c: HandoffEngagement, id: string, links: Map<string, string[]>) {
  const fromLedger =
    (c.industry_child ? INDUSTRIES.get(squash(c.industry_child)) : undefined) ??
    (c.industry ? INDUSTRIES.get(squash(c.industry)) : undefined);
  if (fromLedger) return fromLedger;
  const pages = links.get(id) ?? [];
  if (pages.length === 1) return pages[0];
  const group = INDUSTRY_GROUPS.find((g) => c.industry && words(g.title) === words(c.industry));
  const inGroup = pages.filter((p) => (group?.items as readonly string[] | undefined)?.includes(p));
  if (inGroup.length === 1) return inGroup[0];
  const ledger = [c.industry_child, c.industry].filter(Boolean).join(" / ") || "none";
  report.push(
    pages.length
      ? `${id}: ledger industry "${ledger}" isn't the site's, and ${pages.join(" and ")} both list it – left empty`
      : `${id}: ledger industry "${ledger}" isn't the site's, and no industry page lists it – left empty`,
  );
  return null;
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

/** Sets only each engagement's industry: quick, and no images are touched. */
async function importEngagementIndustries(payload: Payload) {
  const base = path.join(root!, "02-engagements");
  const links = linkedIndustries();
  for (const id of fs.readdirSync(base).sort()) {
    const file = path.join(base, id, "content.json");
    if (!fs.existsSync(file)) continue;
    const c: HandoffEngagement = JSON.parse(fs.readFileSync(file, "utf8"));
    const industry = engagementIndustry(c, id, links);
    const existing = await payload.find({ collection: "engagements", where: { slug: { equals: id } }, limit: 1, depth: 0 });
    const doc = existing.docs[0];
    if (!doc) {
      report.push(`${id}: not in the CMS yet – run the engagements import first`);
      continue;
    }
    if ((doc.industry ?? null) === industry) continue;
    await payload.update({ collection: "engagements", id: doc.id, data: { industry } as any });
    console.log(`industry ${id}: ${doc.industry ?? "—"} → ${industry ?? "—"}`);
  }
}

async function importEngagements(payload: Payload) {
  const base = path.join(root!, "02-engagements");
  const ids = fs.readdirSync(base).filter((id) => fs.existsSync(path.join(base, id, "content.json")));
  const links = linkedIndustries();
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
      industry: engagementIndustry(c, id, links),
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

type ServiceRow = {
  component_id: string;
  order: number;
  item: string;
  parent_id: string | null;
  title: string | null;
  figure: string | null;
  copy: string | null;
  attribution_name: string | null;
  attribution_title: string | null;
  asset_ids: string[];
};

/** A service name (as the ledger writes it) → its page URL. */
function serviceHrefFor(name: string) {
  const entry = (Object.entries(SERVICE_NAMES) as [keyof typeof SERVICE_SLUGS, string][]).find(
    ([, n]) => n.toLowerCase() === name.trim().toLowerCase(),
  );
  return entry ? `/services/${SERVICE_SLUGS[entry[0]]}` : null;
}

/**
 * Engagements shown on a service page, where Hannan named them (19 Oct
 * 2026 review); every other service shows its own engagements in the library.
 */
const SERVICE_ENGAGEMENTS: Record<string, string[]> = {
  "people-policy": ["fraud-model-recovery-government-tax-auth", "wataniya-monolith-to-microservices-archi", "docupet"],
};

/** A service page's engagement cards: client, project, card artwork and link. */
async function serviceEngagementCards(payload: Payload, serviceId: string) {
  const base = path.join(root!, "02-engagements");
  const library = fs
    .readdirSync(base)
    .filter((id) => fs.existsSync(path.join(base, id, "content.json")))
    .sort()
    .map((id) => ({ id, c: JSON.parse(fs.readFileSync(path.join(base, id, "content.json"), "utf8")) as HandoffEngagement }));
  const chosen = SERVICE_ENGAGEMENTS[serviceId]
    ? SERVICE_ENGAGEMENTS[serviceId].flatMap((id) => library.filter((e) => e.id === id))
    : library.filter((e) => e.c.service_id === serviceId);
  if (!chosen.length) report.push(`service ${serviceId}: no engagements in the library – section left empty`);
  const cards = [];
  for (const { id, c } of chosen) {
    const client = c.shown_as || c.client || c.name;
    const file = best(path.join(base, id), "card-related_490x308");
    // Every engagement's card has the same file name, so the engagement goes
    // in the stored name too, or each card would reuse the first one's image.
    const image = file ? await upload(payload, file, `svc-${serviceId}-${id}`, client) : null;
    if (!file) report.push(`service ${serviceId}: ${id} has no card image`);
    cards.push({
      id: `${serviceId}-${id}`,
      title: client,
      client,
      tag: "Client work",
      description: c.name,
      variant: image ? "image" : "navy",
      image,
      href: `/engagement/${id}`,
    });
  }
  return cards;
}

/** Replaces only each service page's engagement cards. */
async function importServiceEngagements(payload: Payload) {
  const base = path.join(root!, "03-services");
  for (const id of fs.readdirSync(base).sort()) {
    const variant = SERVICE[id];
    if (!variant || !fs.existsSync(path.join(base, id, "content.json"))) continue;
    const slug = SERVICE_SLUGS[variant as keyof typeof SERVICE_SLUGS];
    const found = await payload.find({ collection: "services", where: { slug: { equals: slug } }, limit: 1, depth: 0, draft: true });
    const doc = found.docs[0];
    if (!doc) {
      report.push(`service ${id}: not in the CMS yet – run the services import first`);
      continue;
    }
    const cards = await serviceEngagementCards(payload, id);
    const pageContent = doc.pageContent ?? {};
    await payload.update({
      collection: "services",
      id: doc.id,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: { pageContent: { ...pageContent, engagement: { ...(pageContent.engagement ?? {}), cards } }, _status: "published" } as any,
    });
    console.log(`engagements service ${slug}: ${cards.map((card) => card.href.replace("/engagement/", "")).join(", ") || "none"}`);
  }
}

/**
 * Who says each Expert Voice quote, where Hannan changed it (19 Oct 2026
 * review): quote number (0-based) → name, title and, when there is one, the
 * headshot in the handoff. Without one the portrait stays empty until it's
 * uploaded in the CMS.
 */
const QUOTE_PEOPLE: Record<string, Record<number, { name: string; role: string; headshot?: string }>> = {
  "people-policy": { 1: { name: "Santosh Maruwada", role: "Partner" } },
  "trust-governance": {
    1: { name: "Lalith Kumar", role: "Senior Solution Architect" },
    2: { name: "Hannan Hakim", role: "Senior Partner", headshot: "03-services/ai/assets/hs-hannan-hakim.png" },
  },
};

/** Outcomes whose case study Hannan named (19 Oct 2026 review), by component ID. */
const OUTCOME_ENGAGEMENTS: Record<string, string> = {
  "PP-OUT-01": "fraud-model-recovery-government-tax-auth", // "<1 Week": the McKinsey card from the ZATCA fraud case
};

/** Engagement name (as the outcome sheet writes it) → its ID, for the published ones. */
function engagementIdsByName() {
  const base = path.join(root!, "02-engagements");
  const ids = new Map<string, string>();
  for (const id of fs.readdirSync(base)) {
    const file = path.join(base, id, "content.json");
    if (fs.existsSync(file)) ids.set(JSON.parse(fs.readFileSync(file, "utf8")).name.trim().toLowerCase(), id);
  }
  return ids;
}

/** Which part of each service page to import: everything, or just the quotes or outcomes. */
type ServicePart = "all" | "quotes" | "outcomes";

async function importServices(payload: Payload, part: ServicePart = "all") {
  const engagementIds = engagementIdsByName();
  const base = path.join(root!, "03-services");
  for (const id of fs.readdirSync(base).sort()) {
    const dir = path.join(base, id);
    if (!fs.existsSync(path.join(dir, "content.json"))) continue;
    const c = JSON.parse(fs.readFileSync(path.join(dir, "content.json"), "utf8"));
    const assets: Record<string, { file?: string | null; status?: string }> = fs.existsSync(path.join(dir, "assets.json"))
      ? JSON.parse(fs.readFileSync(path.join(dir, "assets.json"), "utf8"))
      : {};
    const variant = SERVICE[id];
    if (!variant) {
      report.push(`service ${id}: not a service the site knows – skipped`);
      continue;
    }
    const slug = SERVICE_SLUGS[variant as keyof typeof SERVICE_SLUGS];
    const S: Record<string, ServiceRow[]> = c.sections;
    const rows = (name: string) => [...(S[name] ?? [])].sort((a, b) => a.order - b.order);

    // Capabilities: top-level rows, each with its sub-services.
    const caps = rows("Capabilities");
    const parents = caps.filter((r) => !r.parent_id);
    const items = parents.map((r, i) => ({
      id: r.component_id,
      index: String(i + 1).padStart(2, "0"),
      title: r.title ?? "",
      description: r.copy ?? "",
      subServices: caps
        .filter((sub) => sub.parent_id === r.component_id)
        .map((sub) => ({ label: sub.title ?? "", description: sub.copy ?? undefined })),
    }));

    // Engagement cards: the service's engagements in the library, each with
    // its card artwork, opening its engagement page.
    const engRows = rows("Engagement");
    const intro = engRows.find((r) => !/card/i.test(r.item))?.copy ?? undefined;
    const cards = part === "all" ? await serviceEngagementCards(payload, id) : [];

    // Expert voice: three quotes; the headshot ships in assets/.
    const quotes = [];
    for (const r of rows("Expert Voice")) {
      const hs = r.asset_ids.map((a) => assets[a]).find((a) => a?.file && /\.png$/i.test(a.file));
      const hsFile = hs?.file ? path.join(dir, hs.file) : null;
      let portrait = null;
      if (hsFile && fs.existsSync(hsFile)) {
        const found = await payload.find({ collection: "media", where: { filename: { equals: `svc-${id}--${path.basename(hsFile)}` } }, limit: 1, depth: 0 });
        if (found.docs[0]) portrait = found.docs[0].id;
        else {
          const data = fs.readFileSync(hsFile);
          portrait = (
            await payload.create({
              collection: "media",
              data: { alt: r.attribution_name ?? "", mediaType: "image" },
              file: { data, name: `svc-${id}--${path.basename(hsFile)}`, mimetype: "image/png", size: data.length },
            })
          ).id;
        }
      } else report.push(`service ${id}: no headshot for ${r.attribution_name ?? "a quote"}`);
      quotes.push({ quote: r.copy ?? "", name: r.attribution_name ?? undefined, role: r.attribution_title ?? "", portrait });
    }
    for (const [index, person] of Object.entries(QUOTE_PEOPLE[id] ?? {})) {
      const q = quotes[Number(index)];
      if (!q) continue;
      const file = person.headshot ? path.join(root!, person.headshot) : null;
      q.name = person.name;
      q.role = person.role;
      q.portrait = file && fs.existsSync(file) ? await upload(payload, file, `svc-${id}`, person.name) : null;
      if (!q.portrait) report.push(`service ${id}: no photo for ${person.name} yet – upload it in the CMS`);
    }

    if (part === "quotes") {
      const found = await payload.find({ collection: "services", where: { slug: { equals: slug } }, limit: 1, depth: 0, draft: true });
      const doc = found.docs[0];
      if (!doc) continue;
      const pageContent = doc.pageContent ?? {};
      await payload.update({
        collection: "services",
        id: doc.id,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data: { pageContent: { ...pageContent, expertVoice: quotes[0] ? { ...quotes[0], moreQuotes: quotes.slice(1) } : pageContent.expertVoice }, _status: "published" } as any,
      });
      console.log(`quotes   service ${slug}: ${quotes.map((q) => q.name).join(", ")}`);
      continue;
    }

    const outcomeRows = rows("Outcome");
    for (const r of outcomeRows.filter((row) => !row.figure)) report.push(`service ${id}: outcome "${r.copy}" has no figure – skipped`);
    // Hannan's review: an outcome from a case study shows that engagement's
    // small card, opening it (the sheet's "Linked engagement / source").
    const sheet: { "Component ID": string; "Linked engagement / source"?: string }[] = c.outcome_images ?? [];
    const outcomes = [];
    for (const r of outcomeRows.filter((row) => row.figure)) {
      const source = sheet.find((o) => o["Component ID"] === r.component_id)?.["Linked engagement / source"]?.trim() ?? "";
      const engagementId = OUTCOME_ENGAGEMENTS[r.component_id] ?? engagementIds.get(source.toLowerCase()) ?? null;
      if (!engagementId && source && source !== "Firm-level") report.push(`service ${id}: outcome "${r.figure}" is from "${source}", which isn't published – no card`);
      const file = engagementId ? best(path.join(root!, "02-engagements", engagementId), "card-related_490x308") : null;
      const image = file ? await upload(payload, file, `svc-${id}-${engagementId}`, source || engagementId!) : null;
      outcomes.push({
        stat: r.figure ?? "",
        description: r.copy ?? "",
        hasMedia: false,
        image,
        href: image ? `/engagement/${engagementId}` : undefined,
      });
    }

    if (part === "outcomes") {
      const found = await payload.find({ collection: "services", where: { slug: { equals: slug } }, limit: 1, depth: 0, draft: true });
      const doc = found.docs[0];
      if (!doc) continue;
      const pageContent = doc.pageContent ?? {};
      await payload.update({
        collection: "services",
        id: doc.id,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data: { pageContent: { ...pageContent, outcomes: { ...(pageContent.outcomes ?? {}), cards: outcomes } }, _status: "published" } as any,
      });
      console.log(`outcomes service ${slug}: ${outcomes.map((o) => `${o.stat}${o.href ? ` → ${o.href.replace("/engagement/", "")}` : ""}`).join(" | ")}`);
      continue;
    }
    const related = (rows("Related Services")[0]?.copy ?? "")
      .split("·")
      .map((name) => name.trim())
      .filter(Boolean)
      .map((name) => ({ label: name, href: serviceHrefFor(name) ?? "/services" }));
    const cta = rows("CTA")[0]?.copy;
    if (cta) report.push(`service ${id}: CTA "${cta}" – the page has no place for it yet, not shown`);

    const pageContent = {
      brand: c.name,
      breadcrumb: [{ label: "Capabilities" }, { label: c.name }],
      hero: { headline: rows("Hero")[0]?.copy ?? undefined },
      capabilities: { items },
      outcomes: { cards: outcomes },
      engagement: { intro, cards },
      expertVoice: quotes[0]
        ? { ...quotes[0], moreQuotes: quotes.slice(1) }
        : undefined,
      relatedServices: related,
    };
    const data = { title: c.name, slug, variant, summary: rows("Hero")[0]?.copy ?? undefined, pageContent, _status: "published" as const };

    // Matched by the new slug, or the old hll-* one (which it then takes over).
    // The new slug first; an entry still on the old one is taken over only
    // when there's none on the new slug yet.
    const bySlug = (value: string) =>
      payload.find({ collection: "services", where: { slug: { equals: value } }, limit: 1, depth: 0, draft: true });
    const current = await bySlug(slug);
    const existing = current.docs[0] ? current : await bySlug(variant);
    if (existing.docs[0]) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await payload.update({ collection: "services", id: existing.docs[0].id, data: data as any });
      console.log(`updated  service ${slug}`);
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await payload.create({ collection: "services", data: data as any });
      console.log(`created  service ${slug}`);
    }
  }
}

type IndustryPanel = {
  panel_order: string;
  service_line: string;
  service_id: string;
  copy: string | null;
  engagement_cards: { name: string; id: string | null; match?: string }[];
};

async function importIndustries(payload: Payload) {
  const base = path.join(root!, "04-industries");
  const engBase = path.join(root!, "02-engagements");
  const ids = fs.readdirSync(base).filter((id) => fs.existsSync(path.join(base, id, "content.json"))).sort();
  const names: Record<string, string> = {};
  for (const id of ids) names[id] = JSON.parse(fs.readFileSync(path.join(base, id, "content.json"), "utf8")).name;

  for (const id of ids) {
    const c = JSON.parse(fs.readFileSync(path.join(base, id, "content.json"), "utf8"));
    // Panels with no copy are hidden (QA I-06: "hide capabilities with no
    // content for that industry").
    const panels: IndustryPanel[] = (c.capability_panels ?? []).filter((p: IndustryPanel) => p.copy?.trim());
    const items = [];
    for (const [i, panel] of panels.entries()) {
      const cards = [];
      for (const card of panel.engagement_cards ?? []) {
        if (!card.id) {
          report.push(`industry ${id}: card "${card.name}" is ${card.match ?? "not linked to an engagement"} – left out`);
          continue;
        }
        const dir = path.join(engBase, card.id);
        const file = best(dir, "card-related_490x308");
        const image = file ? await upload(payload, file, `ind-${card.id}`, card.name) : null;
        const eng = fs.existsSync(path.join(dir, "content.json"))
          ? JSON.parse(fs.readFileSync(path.join(dir, "content.json"), "utf8"))
          : null;
        cards.push({
          // Row IDs are unique across every industry in the CMS, so they
          // carry the industry's.
          id: `${id}-${panel.service_id}-${card.id}`,
          title: card.name,
          client: eng?.shown_as || eng?.client || card.name,
          tag: "Client work",
          description: "",
          variant: image ? "image" : "navy",
          image,
          href: `/engagement/${card.id}`,
        });
      }
      items.push({
        id: `${id}-${panel.service_id}`,
        index: String(i + 1).padStart(2, "0"),
        title: panel.service_line,
        description: panel.copy ?? "",
        cards,
      });
    }
    if (c.hero_eyebrow) report.push(`industry ${id}: hero eyebrow "${c.hero_eyebrow}" – the page has no place for it yet, not shown`);

    const pageContent = {
      category: c.group,
      breadcrumb: [{ label: "Industries" }, { label: c.group }],
      hero: {
        title: c.name,
        headline: c.hero_statement,
        overlayLabel: c.name,
        filters: items.map((item) => ({ id: item.id, label: item.title })),
      },
      capabilities: {
        eyebrow: `Industry  ${c.name}`,
        title: "Capabilities",
        sidebar: items.map((item) => ({ label: item.title })),
        items,
      },
      relatedIndustries: (c.related_industries ?? []).map((rid: string) => ({
        label: names[rid] ?? rid,
        href: `/industries/${rid}`,
      })),
    };

    const existing = await payload.find({
      collection: "industries",
      where: { slug: { equals: id } },
      limit: 1,
      depth: 0,
      draft: true,
    });
    if (existing.docs[0]) {
      // Only the handoff's sections: Client Voice, Experts and Lab stay as
      // they are in the CMS.
      const current = (existing.docs[0] as { pageContent?: Record<string, unknown> }).pageContent ?? {};
      const data = { title: c.name, slug: id, pageContent: { ...current, ...pageContent }, _status: "published" as const };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await payload.update({ collection: "industries", id: existing.docs[0].id, data: data as any });
      console.log(`updated  industry ${id}`);
    } else {
      const data = { title: c.name, slug: id, pageContent, _status: "published" as const };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await payload.create({ collection: "industries", data: data as any });
      console.log(`created  industry ${id}`);
    }
  }
}

const payload = await getPayload({ config });
const only = args.includes("--only") ? args[args.indexOf("--only") + 1] : null;
if (!only || only === "engagements") await importEngagements(payload);
if (only === "engagement-industries") await importEngagementIndustries(payload);
if (only === "service-engagements") await importServiceEngagements(payload);
if (!only || only === "services") await importServices(payload);
if (only === "service-quotes") await importServices(payload, "quotes");
if (only === "service-outcomes") await importServices(payload, "outcomes");
if (!only || only === "industries") await importIndustries(payload);
if (report.length) {
  console.log("\nTo check:");
  for (const line of report) console.log(`  - ${line}`);
}
process.exit(0);
