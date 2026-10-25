/**
 * Loads the client logos (Hannan's HLL-logo-blocks, 24 Oct 2026) into
 * Home › Client logos in the CMS: black logos on transparent, 480 × 240.
 *
 *   npx payload run scripts/import-client-logos.ts -- <HLL-logo-blocks/2x folder>
 *
 * Only the companies on Hannan's list (canvas, 23 Oct), in his order; the
 * pack's other logos aren't used. Media are
 * matched by file name (`client-logo--<file>`), so re-runs upload nothing
 * twice. Only home.clientLogos is replaced; editors can reorder, add or
 * remove logos in the CMS afterwards.
 */
import fs from "node:fs";
import path from "node:path";

import { getPayload } from "payload";

import config from "@payload-config";

const dir = process.argv.slice(2).find((a) => a !== "--" && !a.startsWith("--"));
if (!dir || !fs.existsSync(dir)) {
  console.error("Usage: npx payload run scripts/import-client-logos.ts -- <logo folder>");
  process.exit(1);
}

const LOGOS: [file: string, name: string][] = [
  ["mckinsey", "McKinsey & Company"],
  ["wataniya", "Wataniya Insurance"],
  ["snb", "Saudi National Bank"],
  ["undp", "United Nations Development Programme"],
  // Not in the pack; Hannan (25 Oct): "just download the WeWork logo from
  // the internet". Wikimedia Commons "WeWork logo.png", set like the rest.
  ["wework", "WeWork"],
  ["upstox", "Upstox"],
  ["zatca", "Zakat, Tax and Customs Authority"],
  ["sacramento-community-development", "City of Sacramento"],
  ["niti-aayog", "NITI Aayog"],
  ["gosi", "GOSI"],
  ["galeries-lafayette", "Galeries Lafayette"],
];

const payload = await getPayload({ config });
const clientLogos = [];
for (const [file, name] of LOGOS) {
  const src = path.join(dir, `${file}.png`);
  if (!fs.existsSync(src)) {
    console.error(`missing ${file}.png – skipped`);
    continue;
  }
  const filename = `client-logo--${file}`;
  const found = await payload.find({ collection: "media", where: { filename: { like: filename } }, limit: 1, depth: 0 });
  const logo =
    found.docs[0]?.id ??
    (
      await payload.create({
        collection: "media",
        data: { alt: name, mediaType: "image" },
        file: { data: fs.readFileSync(src), name: `${filename}.png`, mimetype: "image/png", size: fs.statSync(src).size },
      })
    ).id;
  clientLogos.push({ name, logo });
}

const current = await payload.findGlobal({ slug: "marketing-content", depth: 0 });
await payload.updateGlobal({
  slug: "marketing-content",
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: { home: { ...(current.home ?? {}), clientLogos } } as any,
});
console.log(`client logos: ${clientLogos.map((l) => l.name).join(", ")}`);
process.exit(0);
