/**
 * Points each Home › Our Impact card at its engagement's current card image.
 * The cards hold their own copy of the image, so after a handoff re-import
 * (25 Oct 2026: white client names) they still showed the old one:
 *
 *   npx payload run scripts/refresh-home-impact-images.ts
 *
 * Only the card images change; titles, tags and links stay as they are.
 */
import { getPayload } from "payload";

import config from "@payload-config";

const payload = await getPayload({ config });

const current = await payload.findGlobal({ slug: "marketing-content", depth: 0 });
const cards = [];
for (const card of current.home?.impact?.cards ?? []) {
  const slug = card.href?.split("/").pop() ?? "";
  const found = await payload.find({ collection: "engagements", where: { slug: { equals: slug } }, limit: 1, depth: 0 });
  const image = found.docs[0]?.cardImage;
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
