/**
 * Puts Hannan's About team photos (HLL_About_Team_Photos.zip, 26 Oct 2026)
 * into the About hero collage. Careers shows the same collage (QA CR-05).
 *
 *   npx payload run scripts/set-about-photos.ts -- <folder>
 *
 * The folder holds the four 2x web photos, named as in TILES. Media are
 * matched by file name (`about-photo--<name>`), so re-runs upload nothing
 * twice.
 */
import fs from "node:fs";
import path from "node:path";

import { getPayload } from "payload";

import config from "@payload-config";

// Collage order: tall left, wide top, small tall right, wide bottom. The wide
// photos go in the wide tiles and the two near-square ones in the tall tiles.
const TILES = [
  { name: "money2020-riyadh", alt: "The HLL team at Money20/20 Middle East, Riyadh" },
  { name: "team-lineup", alt: "The HLL team" },
  { name: "paris", alt: "HLL partners in Paris" },
  { name: "riyadh-dinner", alt: "The HLL team at dinner in Riyadh" },
];

const dir = process.argv.slice(2).find((a) => a !== "--" && !a.startsWith("--"));
if (!dir || !fs.existsSync(dir)) {
  console.error("Usage: npx payload run scripts/set-about-photos.ts -- <photo folder>");
  process.exit(1);
}

const payload = await getPayload({ config });

const images = [];
for (const tile of TILES) {
  const src = path.join(dir, `${tile.name}.webp`);
  if (!fs.existsSync(src)) {
    console.error(`missing ${src}`);
    process.exit(1);
  }
  const filename = `about-photo--${tile.name}`;
  const found = await payload.find({ collection: "media", where: { filename: { like: filename } }, limit: 1, depth: 0 });
  const id =
    found.docs[0]?.id ??
    (
      await payload.create({
        collection: "media",
        data: { alt: tile.alt, mediaType: "image" },
        file: { data: fs.readFileSync(src), name: `${filename}.webp`, mimetype: "image/webp", size: fs.statSync(src).size },
      })
    ).id;
  images.push({ image: id });
}

const current = await payload.findGlobal({ slug: "marketing-content", depth: 0 });
await payload.updateGlobal({
  slug: "marketing-content",
  data: {
    about: { ...(current.about ?? {}), hero: { ...(current.about?.hero ?? {}), images } },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any,
});

console.log(`about collage: ${images.length} photos set`);
process.exit(0);
