/**
 * Sets the still (the picture shown when a value isn't playing) on About › Our Values items, matched by item id,
 * leaving every other value and field as it is.
 *
 *   npx payload run scripts/set-value-stills.ts -- <folder of <value-id>.webp>
 *
 * Stills are uploaded as `motion--<value-id>.webp`; one already uploaded is reused, so re-runs change nothing.
 */
import fs from "node:fs";
import path from "node:path";

import { getPayload } from "payload";

import config from "@payload-config";

const dir = process.argv.slice(2).find((a) => a !== "--" && !a.startsWith("--"));
if (!dir || !fs.existsSync(dir)) {
  console.error("Usage: npx payload run scripts/set-value-stills.ts -- <folder>");
  process.exit(1);
}

const payload = await getPayload({ config });
const global = await payload.findGlobal({ slug: "marketing-content", depth: 0 });
const items = global.about?.values?.items ?? [];

let changed = 0;
const next = [];
for (const item of items) {
  const file = path.join(dir, `${item.id}.webp`);
  if (!item.id || !fs.existsSync(file)) {
    next.push(item);
    continue;
  }
  const filename = `motion--${item.id}.webp`;
  const found = await payload.find({ collection: "media", where: { filename: { equals: filename } }, limit: 1, depth: 0 });
  let imageId = found.docs[0]?.id;
  if (!imageId) {
    const data = fs.readFileSync(file);
    const doc = await payload.create({
      collection: "media",
      data: { alt: item.title ?? item.id, mediaType: "image" },
      file: { data, name: filename, mimetype: "image/webp", size: data.length },
    });
    imageId = doc.id;
    console.log(`uploaded ${filename}`);
  }
  if (item.image === imageId) {
    console.log(`${item.id}: already has this still`);
  } else {
    changed++;
    console.log(`${item.id}: still set`);
  }
  next.push({ ...item, image: imageId });
}

if (changed) {
  await payload.updateGlobal({
    slug: "marketing-content",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: { about: { ...global.about, values: { ...global.about?.values, items: next } } } as any,
  });
}
console.log(`${changed} value(s) updated, ${items.length} values in total`);
process.exit(0);
