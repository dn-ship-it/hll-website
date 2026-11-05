/**
 * Takes engagements off the site: sets each one's status to draft, so its
 * page and every card of it go, while its content stays in the CMS.
 * First use: Voxxy Media (5 Nov handoff; Hannan, 4 Nov: do not publish). Its
 * old address redirects to the engagements list (next.config).
 *
 *   npx payload run scripts/unpublish-engagements.ts -- <slug> [<slug> ...]
 *
 * Safe to re-run.
 */
import { getPayload } from "payload";

import config from "@payload-config";

const slugs = process.argv.slice(2).filter((a) => a !== "--" && !a.startsWith("--"));
if (!slugs.length) {
  console.error("Usage: npx payload run scripts/unpublish-engagements.ts -- <slug> [<slug> ...]");
  process.exit(1);
}

const payload = await getPayload({ config });
for (const slug of slugs) {
  const found = await payload.find({ collection: "engagements", where: { slug: { equals: slug } }, limit: 1, depth: 0 });
  const doc = found.docs[0];
  if (!doc) {
    console.log(`${slug}: not in the CMS`);
    continue;
  }
  if (doc.status === "draft") {
    console.log(`${slug}: already unpublished`);
    continue;
  }
  await payload.update({ collection: "engagements", id: doc.id, data: { status: "draft" } });
  console.log(`${slug}: unpublished`);
}
process.exit(0);
