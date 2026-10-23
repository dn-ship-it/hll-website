/**
 * Points every service page's Expert Voice portrait at a small web copy
 * (performance, 24 Oct 2026). The handoff headshots are 2160 × 2416 PNGs of
 * 3.4–5.7 MB, shown about 300px wide, and each quote had its own upload of
 * the same file – about 10 MB of images per service page, and a long freeze
 * while the browser decoded them.
 *
 *   npx payload run scripts/optimize-portraits.ts -- <folder of hs-<name>.webp>
 *
 * The person comes from the current file name (svc-ai--hs-hannan-hakim-16.png
 * → hs-hannan-hakim); each person's copy is uploaded once, as
 * portrait--hs-<name>.webp, and shared. A portrait with no web copy stays.
 */
import fs from "node:fs";
import path from "node:path";

import { getPayload, type Payload } from "payload";

import config from "@payload-config";

const dir = process.argv.slice(2).find((a) => a !== "--" && !a.startsWith("--"));
if (!dir || !fs.existsSync(dir)) {
  console.error("Usage: npx payload run scripts/optimize-portraits.ts -- <portraits folder>");
  process.exit(1);
}

const payload = await getPayload({ config });
const uploaded = new Map<string, number | string>();

async function webCopy(p: Payload, person: string) {
  if (uploaded.has(person)) return uploaded.get(person)!;
  const file = path.join(dir!, `${person}.webp`);
  if (!fs.existsSync(file)) return null;
  const prefix = `portrait--${person}`;
  const found = await p.find({ collection: "media", where: { filename: { like: prefix } }, limit: 1, depth: 0 });
  const id =
    found.docs[0]?.id ??
    (
      await p.create({
        collection: "media",
        data: { alt: person.replace(/^hs-/, "").replace(/-/g, " "), mediaType: "image" },
        file: { data: fs.readFileSync(file), name: `${prefix}.webp`, mimetype: "image/webp", size: fs.statSync(file).size },
      })
    ).id;
  uploaded.set(person, id);
  return id;
}

/** svc-ai--hs-hannan-hakim-16.png → hs-hannan-hakim */
const personOf = (filename: string | null | undefined) => filename?.match(/--(hs-[a-z-]+?)(?:-\d+)?\.(?:png|jpe?g|webp)$/)?.[1] ?? null;

/** A portrait id → its web copy, from the person in the current file name. */
async function lighter(p: Payload, id: unknown, filenames: Map<string, string>) {
  if (id === null || id === undefined || typeof id === "object") return id;
  const person = personOf(filenames.get(String(id)));
  const copy = person ? await webCopy(p, person) : null;
  return copy ?? id;
}

// Read with ids (depth 0) for the write-back; file names come from the
// media records themselves.
const services = await payload.find({ collection: "services", limit: 50, depth: 0, draft: true });
const ids = services.docs.flatMap((doc) => {
  const v = doc.pageContent?.expertVoice;
  return v ? [v.portrait, ...(v.moreQuotes ?? []).map((q) => q.portrait)] : [];
}).filter((x): x is number => typeof x === "number");
const media = await payload.find({ collection: "media", where: { id: { in: ids } }, limit: 200, depth: 0 });
const filenames = new Map(media.docs.map((m) => [String(m.id), m.filename ?? ""]));

for (const doc of services.docs) {
  const voice = doc.pageContent?.expertVoice;
  if (!voice) continue;
  const portrait = await lighter(payload, voice.portrait, filenames);
  const moreQuotes = [];
  for (const q of voice.moreQuotes ?? []) moreQuotes.push({ ...q, portrait: await lighter(payload, q.portrait, filenames) });
  await payload.update({
    collection: "services",
    id: doc.id,
    data: {
      pageContent: { ...doc.pageContent, expertVoice: { ...voice, portrait, moreQuotes } },
      _status: "published",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any,
  });
  const people = [voice.portrait, ...(voice.moreQuotes ?? []).map((q) => q.portrait)].map((x) => personOf(filenames.get(String(x))) ?? "—");
  console.log(`portraits ${doc.slug}: ${people.join(", ")}`);
}
process.exit(0);
