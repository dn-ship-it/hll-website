/**
 * About › Leader: Hannan's headshot in the quote's portrait (Hannan, 19 Nov: "for this place image use my face").
 * Uses his existing Team headshot, so nothing is uploaded.
 *
 *   npx payload run scripts/set-leader-portrait.ts
 */
import { getPayload } from "payload";

import config from "@payload-config";

const payload = await getPayload({ config });
const found = await payload.find({
  collection: "media",
  where: { filename: { like: "team-photo-sq--hannan-hakim" } },
  depth: 0,
  limit: 1,
});
const photo = found.docs[0];
if (!photo) {
  console.error("Hannan's team headshot not found");
  process.exit(1);
}
const global = await payload.findGlobal({ slug: "marketing-content", depth: 0 });
const leader = global.about?.leader;
if (leader?.portrait === photo.id) {
  console.log(`already set (${photo.filename})`);
} else {
  await payload.updateGlobal({
    slug: "marketing-content",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: { about: { ...global.about, leader: { ...leader, portrait: photo.id } } } as any,
  });
  console.log(`portrait set: ${photo.filename}`);
}
process.exit(0);
