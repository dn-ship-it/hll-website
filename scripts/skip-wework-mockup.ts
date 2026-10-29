/**
 * Takes the three-phone mock-up off the WeWork case study (Hannan, 29 Oct:
 * the mock-up file has an error and there's no other image, so skip it). It
 * appears twice: the first row of the image grid (block-1111x617) and the
 * closing image after the outcome (block-1096x617). Everything else on the
 * page, including the pair of screens under it, stays.
 *
 *   npx payload run scripts/skip-wework-mockup.ts
 *
 * Safe to re-run: once both are gone it changes nothing.
 */
import { getPayload } from "payload";

import config from "@payload-config";

const MOCKUP = /eng-wework--block-(1111|1096)x617/;

const payload = await getPayload({ config });
const found = await payload.find({ collection: "engagements", where: { slug: { equals: "wework" } }, limit: 1, depth: 1 });
const doc = found.docs[0];
if (!doc) {
  console.error("wework: not in the CMS");
  process.exit(1);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isMockup = (media: any) => MOCKUP.test(media?.filename ?? "");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const id = (media: any) => (typeof media === "object" && media ? media.id : media);

let removed = 0;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const layout = ((doc as any).layout ?? []).flatMap((block: any) => {
  if (block.blockType === "engagementMedia" && isMockup(block.image)) {
    removed++;
    return [];
  }
  if (block.blockType === "engagementMediaGrid") {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rows = (block.rows ?? []).filter((row: any) => {
      const drop = (row.images ?? []).some(isMockup);
      if (drop) removed++;
      return !drop;
    });
    if (!rows.length) return [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return [{ ...block, rows: rows.map((row: any) => ({ ...row, images: row.images.map(id) })) }];
  }
  return [{ ...block, ...(block.image ? { image: id(block.image) } : {}) }];
});

if (!removed) {
  console.log("wework: mock-up already gone");
  process.exit(0);
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
await payload.update({ collection: "engagements", id: doc.id, data: { layout } as any });
console.log(`wework: removed ${removed} mock-up image(s); layout ${layout.map((b: { blockType: string }) => b.blockType.replace("engagement", "")).join(" > ")}`);
process.exit(0);
