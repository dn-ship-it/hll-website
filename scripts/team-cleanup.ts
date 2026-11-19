/**
 * Team clean-up (Hannan, 19 Nov): only the named team goes on the website.
 * - Removes Lalith Kumar, Swapnil H and Tej Haldule from Team members.
 * - Removes Lalith Kumar's quote from the Cloud capability page.
 * - Renames Dhanashree Nawale to Dhanashree Tambe (Applications quote, photo alt text).
 *
 *   npx payload run scripts/team-cleanup.ts
 *
 * Re-running changes nothing once done.
 */
import { getPayload } from "payload";

import config from "@payload-config";

const REMOVE = ["Lalith Kumar", "Swapnil H", "Tej Haldule"];
const OLD_NAME = "Dhanashree Nawale";
const NEW_NAME = "Dhanashree Tambe";

const payload = await getPayload({ config });

for (const name of REMOVE) {
  const found = await payload.find({ collection: "team-members", where: { name: { equals: name } }, depth: 0, limit: 10 });
  for (const doc of found.docs) {
    await payload.delete({ collection: "team-members", id: doc.id });
    console.log(`team member removed: ${name}`);
  }
}

const services = await payload.find({ collection: "services", depth: 0, limit: 50, draft: false });
for (const service of services.docs) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pc = (service as any).pageContent;
  const quotes = pc?.expertVoice?.moreQuotes;
  if (!Array.isArray(quotes)) continue;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const next = quotes
    .filter((q: any) => !REMOVE.includes(q.name))
    .map((q: any) => (q.name === OLD_NAME ? { ...q, name: NEW_NAME } : q));
  if (JSON.stringify(next) === JSON.stringify(quotes)) continue;
  await payload.update({
    collection: "services",
    id: service.id,
    draft: false,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: { pageContent: { ...pc, expertVoice: { ...pc.expertVoice, moreQuotes: next } } } as any,
  });
  console.log(`${service.slug}: quotes ${quotes.map((q: any) => q.name).join(", ")} -> ${next.map((q: any) => q.name).join(", ")}`);
}

const media = await payload.find({ collection: "media", where: { alt: { equals: OLD_NAME } }, depth: 0, limit: 10 });
for (const doc of media.docs) {
  await payload.update({ collection: "media", id: doc.id, data: { alt: NEW_NAME } });
  console.log(`media ${doc.filename}: alt renamed`);
}
console.log("done");
process.exit(0);
