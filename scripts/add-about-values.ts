/**
 * Adds Collective Momentum and Structural Impact to About › Our Values and
 * puts the seven in the order of Hannan's canvas (19/10/26):
 *
 *   npx payload run scripts/add-about-values.ts -- <folder>
 *
 * The folder holds collective-momentum.webp and structural-impact.webp, the
 * "After" stills from Figma › WIP › Motion Stills. These two have no motion
 * piece yet, so they show the still only. The five existing values keep their
 * text, image and video. Media are matched by file name
 * (`value-still--<id>`), so re-runs upload nothing twice.
 */
import fs from "node:fs";
import path from "node:path";

import { getPayload } from "payload";

import config from "@payload-config";

const ORDER = [
  "intelligence-and-imagination",
  "craft-as-currency",
  "collective-momentum",
  "structural-impact",
  "cognitive-craft",
  "kinetic-agility",
  "thoughtful-outlook",
];

const NEW_VALUES: Record<string, { title: string; description: string }> = {
  "collective-momentum": {
    title: "Collective Momentum",
    description:
      "Our ecosystem gains powerful momentum as we expand. We are as good as our people. As our ecosystem expands, so does our momentum. Our strength comes from our people.",
  },
  "structural-impact": {
    title: "Structural Impact",
    description: "If we build for tomorrow, we are already too late. We design for the decades and magnitudes.",
  },
};

const dir = process.argv.slice(2).find((a) => a !== "--" && !a.startsWith("--"));
if (!dir || !fs.existsSync(dir)) {
  console.error("Usage: npx payload run scripts/add-about-values.ts -- <stills folder>");
  process.exit(1);
}

const payload = await getPayload({ config });

async function still(id: string, alt: string) {
  const src = path.join(dir!, `${id}.webp`);
  const filename = `value-still--${id}`;
  const found = await payload.find({ collection: "media", where: { filename: { like: filename } }, limit: 1, depth: 0 });
  if (found.docs[0]) return found.docs[0].id;
  const created = await payload.create({
    collection: "media",
    data: { alt, mediaType: "image" },
    file: { data: fs.readFileSync(src), name: `${filename}.webp`, mimetype: "image/webp", size: fs.statSync(src).size },
  });
  return created.id;
}

const current = await payload.findGlobal({ slug: "marketing-content", depth: 0 });
const existing = new Map((current.about?.values?.items ?? []).map((item) => [item.id, item]));

const items = [];
for (const id of ORDER) {
  const item = existing.get(id);
  if (item) {
    items.push(item);
    continue;
  }
  const value = NEW_VALUES[id];
  if (!value) {
    console.error(`"${id}" is not in the CMS – skipped`);
    continue;
  }
  items.push({ id, ...value, image: await still(id, value.title) });
}

await payload.updateGlobal({
  slug: "marketing-content",
  data: {
    about: {
      ...(current.about ?? {}),
      // A value's `id` (kinetic-agility, …) is also its row's id.
      values: { ...(current.about?.values ?? {}), items },
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any,
});

console.log(`about values: ${items.map((item) => item.title).join(", ")}`);
process.exit(0);
