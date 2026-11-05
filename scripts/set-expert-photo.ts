/**
 * A capability page expert's photo, wherever they speak (lead quote or one
 * of the more quotes), from House of Katha's "Team Images" (Figma 3417:6132;
 * Hannan 5 Nov: the new Figma file has the team images).
 *
 *   npx payload run scripts/set-expert-photo.ts -- "<name>" <photo.webp>
 *
 * The photo uploads as new media, `team-photo-sq--<file name>`, so the old one
 * stays wherever else it's used. Only quotes by that exact name change; their
 * words and roles stay. Safe to re-run.
 */
import fs from "node:fs";
import path from "node:path";

import { getPayload } from "payload";

import config from "@payload-config";

const [name, src] = process.argv.slice(2).filter((a) => a !== "--");
if (!name || !src || !fs.existsSync(src)) {
  console.error('Usage: npx payload run scripts/set-expert-photo.ts -- "<name>" <photo.webp>');
  process.exit(1);
}

const payload = await getPayload({ config });

const filename = `team-photo-sq--${path.basename(src, ".webp")}`;
const found = await payload.find({ collection: "media", where: { filename: { like: filename } }, limit: 1, depth: 0 });
const photo =
  found.docs[0]?.id ??
  (
    await payload.create({
      collection: "media",
      data: { alt: name, mediaType: "image" },
      file: { data: fs.readFileSync(src), name: `${filename}.webp`, mimetype: "image/webp", size: fs.statSync(src).size },
    })
  ).id;

const services = await payload.find({ collection: "services", limit: 100, depth: 0, draft: true });
for (const doc of services.docs) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pageContent: any = doc.pageContent ?? {};
  const lead = pageContent.expertVoice;
  if (!lead) continue;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const swap = (q: any) => (q?.name === name ? { ...q, portrait: photo } : q);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const more: any[] = lead.moreQuotes ?? [];
  if (lead.name !== name && !more.some((q) => q.name === name)) continue;
  await payload.update({
    collection: "services",
    id: doc.id,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: { pageContent: { ...pageContent, expertVoice: { ...swap(lead), moreQuotes: more.map(swap) } }, _status: "published" } as any,
  });
  console.log(`${doc.slug}: ${name}'s photo`);
}
process.exit(0);
