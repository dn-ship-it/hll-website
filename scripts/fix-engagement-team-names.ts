/**
 * Engagement team tables (Arjun / Hannan, 20 Nov): "Pukti" is a typo for Spoorthi, and Lalit Kumar is no longer
 * on the website. Only engagementTeam rows change; every other block and field is kept as it is.
 *
 *   npx payload run scripts/fix-engagement-team-names.ts
 *
 * Re-running changes nothing once done.
 */
import { getPayload } from "payload";

import config from "@payload-config";

const RENAME: Record<string, string> = { Pukti: "Spoorthi" };
const REMOVE = ["Lalit Kumar", "Lalith Kumar"];

const payload = await getPayload({ config });
const { docs } = await payload.find({ collection: "engagements", depth: 0, limit: 500, pagination: false });

let changedDocs = 0;
for (const doc of docs) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const layout = (doc as any).layout as any[] | undefined;
  if (!Array.isArray(layout)) continue;
  const notes: string[] = [];
  const next = layout.map((block) => {
    if (block.blockType !== "engagementTeam" || !Array.isArray(block.rows)) return block;
    const rows = block.rows
      .map((row: { role: string; names: string }) => {
        const names = row.names
          .split("\n")
          .map((n) => {
            const t = n.trim();
            if (RENAME[t]) {
              notes.push(`${row.role}: ${t} -> ${RENAME[t]}`);
              return n.replace(t, RENAME[t]);
            }
            return n;
          })
          .filter((n) => {
            const drop = REMOVE.includes(n.trim());
            if (drop) notes.push(`${row.role}: ${n.trim()} removed`);
            return !drop;
          });
        return { ...row, names: names.join("\n") };
      })
      .filter((row: { names: string }) => row.names.trim());
    return { ...block, rows };
  });
  if (!notes.length) continue;
  await payload.update({
    collection: "engagements",
    id: doc.id,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: { layout: next } as any,
  });
  changedDocs++;
  console.log(`${doc.slug}: ${notes.join("; ")}`);
}
console.log(`${changedDocs} engagement(s) updated`);
process.exit(0);
