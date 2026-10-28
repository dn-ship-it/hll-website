/**
 * Points each Home › Our Impact card at its engagement's current card image.
 * The cards hold their own copy of the image, so after a handoff re-import
 * (25 Oct 2026: white client names) they still showed the old one:
 *
 *   npx payload run scripts/refresh-home-impact-images.ts [-- <tiles folder>]
 *
 * Only the card images change; titles, tags and links stay as they are.
 * A card whose Home tile has another shape takes that size of the
 * engagement's artwork (WIDE_TILES, from <tiles folder>/<slug>.webp: the
 * handoff's card-wide_991x490@2x), so nothing in it is cropped.
 */
import fs from "node:fs";
import path from "node:path";

import { getPayload } from "payload";

import config from "@payload-config";

const payload = await getPayload({ config });

/** Hannan, 28 Oct: WeWork sits in the wide (about 2:1) tile at the bottom of
 *  Our Impact, and its taller card image cut the phones off at the top. */
const WIDE_TILES = new Set(["wework"]);

const tiles = process.argv.slice(2).find((a) => a !== "--" && !a.startsWith("--"));

/** The wide artwork for a tile, uploaded once as `home-tile--<slug>`. */
async function wideArtwork(slug: string) {
  const name = `home-tile--${slug}`;
  const found = await payload.find({ collection: "media", where: { filename: { like: name } }, limit: 1, depth: 0 });
  if (found.docs[0]) return found.docs[0].id;
  const src = tiles ? path.join(tiles, `${slug}.webp`) : null;
  if (!src || !fs.existsSync(src)) {
    console.error(`no wide artwork for "${slug}" – pass the tiles folder`);
    return null;
  }
  const created = await payload.create({
    collection: "media",
    data: { alt: slug, mediaType: "image" },
    file: { data: fs.readFileSync(src), name: `${name}.webp`, mimetype: "image/webp", size: fs.statSync(src).size },
  });
  return created.id;
}

const current = await payload.findGlobal({ slug: "marketing-content", depth: 0 });
const cards = [];
for (const card of current.home?.impact?.cards ?? []) {
  const slug = card.href?.split("/").pop() ?? "";
  const found = await payload.find({ collection: "engagements", where: { slug: { equals: slug } }, limit: 1, depth: 0 });
  const image = (WIDE_TILES.has(slug) ? await wideArtwork(slug) : null) ?? found.docs[0]?.cardImage;
  if (!image) console.error(`no engagement image for "${slug}" – ${card.title} keeps its image`);
  cards.push({ ...card, image: image ?? card.image });
}

await payload.updateGlobal({
  slug: "marketing-content",
  data: {
    home: { ...(current.home ?? {}), impact: { ...(current.home?.impact ?? {}), cards } },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any,
});

console.log(`home impact: ${cards.length} card images refreshed`);
process.exit(0);
