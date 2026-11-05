/**
 * The team's square photos (House of Katha's "Team Images", Figma 3417:6132,
 * Hannan 5 Nov: "the team images for the individual team blocks") on the Team
 * page: each member's photo.
 *
 *   npx payload run scripts/set-team-photos.ts -- <folder of <slug>.webp>
 *
 * Files are named by the member's slug (e.g. advaith-mohan.webp). They upload
 * as new media, `team-photo-sq--<slug>`, so the earlier photos stay as they
 * are wherever else they're used (Home › Who are we, Lalith's expert quote).
 * A member without a file keeps their photo. Safe to re-run.
 */
import fs from "node:fs";
import path from "node:path";

import { getPayload } from "payload";

import config from "@payload-config";

const dir = process.argv.slice(2).find((a) => a !== "--" && !a.startsWith("--"));
if (!dir || !fs.existsSync(dir)) {
  console.error("Usage: npx payload run scripts/set-team-photos.ts -- <photo folder>");
  process.exit(1);
}

const payload = await getPayload({ config });

const members = await payload.find({ collection: "team-members", limit: 200, depth: 0 });
const kept: string[] = [];
for (const member of members.docs) {
  const src = path.join(dir, `${member.slug}.webp`);
  if (!fs.existsSync(src)) {
    kept.push(member.name);
    continue;
  }
  const filename = `team-photo-sq--${member.slug}`;
  const found = await payload.find({ collection: "media", where: { filename: { like: filename } }, limit: 1, depth: 0 });
  const photo =
    found.docs[0]?.id ??
    (
      await payload.create({
        collection: "media",
        data: { alt: member.name, mediaType: "image" },
        file: { data: fs.readFileSync(src), name: `${filename}.webp`, mimetype: "image/webp", size: fs.statSync(src).size },
      })
    ).id;
  await payload.update({ collection: "team-members", id: member.id, data: { photo } });
  console.log(`${member.slug}: square photo`);
}
if (kept.length) console.log(`kept their photo (no file): ${kept.join(", ")}`);
process.exit(0);
