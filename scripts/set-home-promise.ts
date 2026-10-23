/**
 * Sets Home › Our Promise in the CMS (the client's wording, 22 Oct 2026):
 *
 *   npx payload run scripts/set-home-promise.ts
 *
 * Only home.promise.line1 / line2 change; everything else in the global stays.
 * Editors can change it afterwards under Marketing content › Home › Our promise.
 */
import { getPayload } from "payload";

import config from "@payload-config";

const LINE1 = "We help organisations make better decisions and move faster,";
const LINE2 = "with the right data, technology and people behind them.";

const payload = await getPayload({ config });
const current = await payload.findGlobal({ slug: "marketing-content", depth: 0 });
await payload.updateGlobal({
  slug: "marketing-content",
  data: {
    home: { ...(current.home ?? {}), promise: { ...(current.home?.promise ?? {}), line1: LINE1, line2: LINE2 } },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any,
});
console.log(`home promise: ${LINE1} / ${LINE2}`);
process.exit(0);
