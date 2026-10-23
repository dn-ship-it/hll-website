/**
 * Loads the brand-value motion pieces (client, 22 Oct 2026) into the About
 * page's "Our Values" in the CMS: each value's video and a still from it.
 *
 *   npx payload run scripts/import-motion.ts -- <folder of <id>.mp4 + <id>.webp>
 *
 * Media are matched by file name (`motion--<file>`), so re-runs upload nothing
 * twice. Only About › Values › items is replaced; the rest of the global stays.
 * The value descriptions weren't supplied, so they're left empty.
 */
import fs from "node:fs";
import path from "node:path";

import { getPayload, type Payload } from "payload";

import config from "@payload-config";

const dir = process.argv.slice(2).find((a) => a !== "--" && !a.startsWith("--"));
if (!dir || !fs.existsSync(dir)) {
  console.error("Usage: npx payload run scripts/import-motion.ts -- <motion folder>");
  process.exit(1);
}

/** The About values, in the order the client's motion pieces were named. */
const VALUES = [
  { id: "kinetic-agility", title: "Kinetic Agility" },
  { id: "thoughtful-outlook", title: "Thoughtful Outlook" },
  { id: "intelligence-and-imagination", title: "Intelligence and Imagination" },
  { id: "cognitive-craft", title: "Cognitive Craft" },
  { id: "craft-as-currency", title: "Craft as Currency" },
];

async function upload(payload: Payload, file: string, alt: string, mediaType: "image" | "video") {
  const filename = `motion--${path.basename(file)}`;
  const found = await payload.find({ collection: "media", where: { filename: { equals: filename } }, limit: 1, depth: 0 });
  if (found.docs[0]) return found.docs[0].id;
  const data = fs.readFileSync(file);
  const mimetype = file.endsWith(".mp4") ? "video/mp4" : "image/webp";
  const doc = await payload.create({
    collection: "media",
    data: { alt, mediaType },
    file: { data, name: filename, mimetype, size: data.length },
  });
  console.log(`uploaded ${filename}`);
  return doc.id;
}

const payload = await getPayload({ config });
const items = [];
for (const value of VALUES) {
  const video = path.join(dir, `${value.id}.mp4`);
  const still = path.join(dir, `${value.id}.webp`);
  if (!fs.existsSync(video) || !fs.existsSync(still)) {
    console.error(`missing ${value.id}.mp4 or .webp – skipped`);
    continue;
  }
  items.push({
    id: value.id,
    title: value.title,
    description: "",
    image: await upload(payload, still, value.title, "image"),
    video: await upload(payload, video, value.title, "video"),
  });
}

const current = await payload.findGlobal({ slug: "marketing-content", depth: 0 });
await payload.updateGlobal({
  slug: "marketing-content",
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: { about: { ...(current.about ?? {}), values: { ...(current.about?.values ?? {}), items } } } as any,
});
console.log(`about values: ${items.map((i) => i.title).join(", ")}`);
process.exit(0);
