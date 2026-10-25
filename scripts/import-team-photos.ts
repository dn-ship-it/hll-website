/**
 * Loads the team photos (Hannan's "team grid picture.zip", 25 Oct 2026) into
 * the CMS: each Team member's photo, and the four people in Home › Who are we.
 *
 *   npx payload run scripts/import-team-photos.ts -- <folder of <slug>.webp>
 *
 * Files are named by the member's slug (e.g. arjun-pathni.webp). Media are
 * matched by file name (`team-photo--<slug>`), so re-runs upload nothing twice.
 * A member without a file keeps an empty photo (Swapnil and Lalith for now).
 */
import fs from "node:fs";
import path from "node:path";

import { getPayload } from "payload";

import config from "@payload-config";
import { homePageContent } from "@/data/home";

const dir = process.argv.slice(2).find((a) => a !== "--" && !a.startsWith("--"));
if (!dir || !fs.existsSync(dir)) {
  console.error("Usage: npx payload run scripts/import-team-photos.ts -- <photo folder>");
  process.exit(1);
}

const payload = await getPayload({ config });

async function photoFor(slug: string, alt: string) {
  const src = path.join(dir!, `${slug}.webp`);
  if (!fs.existsSync(src)) return null;
  const filename = `team-photo--${slug}`;
  const found = await payload.find({ collection: "media", where: { filename: { like: filename } }, limit: 1, depth: 0 });
  if (found.docs[0]) return found.docs[0].id;
  const created = await payload.create({
    collection: "media",
    data: { alt, mediaType: "image" },
    file: { data: fs.readFileSync(src), name: `${filename}.webp`, mimetype: "image/webp", size: fs.statSync(src).size },
  });
  return created.id;
}

const members = await payload.find({ collection: "team-members", limit: 200, depth: 0 });
const missing: string[] = [];
for (const member of members.docs) {
  const photo = await photoFor(member.slug, member.name);
  if (!photo) {
    missing.push(member.name);
    continue;
  }
  await payload.update({ collection: "team-members", id: member.id, data: { photo } });
}

// Home › Who are we: the four people, with their photos.
const people = [];
for (const person of homePageContent.whoWeAre.people) {
  people.push({ name: person.name, role: person.role, photo: await photoFor(person.id, person.name) });
}
const current = await payload.findGlobal({ slug: "marketing-content", depth: 0 });
await payload.updateGlobal({
  slug: "marketing-content",
  data: {
    home: { ...(current.home ?? {}), whoWeAre: { ...(current.home?.whoWeAre ?? {}), people } },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any,
});

console.log(
  `team photos: ${members.docs.length - missing.length}/${members.docs.length} members` +
    (missing.length ? ` (no photo: ${missing.join(", ")})` : "") +
    `; who are we: ${people.filter((p) => p.photo).length}/${people.length}`,
);
process.exit(0);
