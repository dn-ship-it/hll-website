/**
 * Sets Contact › Our offices to the two company addresses (Hannan, 18 Nov), replacing the older list.
 *
 *   npx payload run scripts/set-contact-offices.ts
 *
 * Re-running changes nothing once the list matches.
 */
import { getPayload } from "payload";

import config from "@payload-config";

const OFFICES = [
  { id: "india-goa", city: "India", company: "Hyper Lychee Labs Pvt Ltd", address: "HLL,\nSiolim 403517, Goa" },
  { id: "us", city: "United States", company: "Hyper Lychee Inc", address: "HLL, N Portal Ave,\nCupertino, CA 95014" },
];

const payload = await getPayload({ config });
const global = await payload.findGlobal({ slug: "marketing-content", depth: 0 });
const contact = global.contact;
const current = (contact?.locations?.items ?? []).map((o) => [o.id, o.city, o.company, o.address].join("|"));
const wanted = OFFICES.map((o) => [o.id, o.city, o.company, o.address].join("|"));

if (JSON.stringify(current) === JSON.stringify(wanted)) {
  console.log("Offices already up to date");
} else {
  console.log("Before:", current);
  await payload.updateGlobal({
    slug: "marketing-content",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: { contact: { ...contact, locations: { ...contact?.locations, items: OFFICES } } } as any,
  });
  console.log("After:", wanted);
}
process.exit(0);
