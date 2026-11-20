/**
 * Industry Client Voice cards from the HLL_Testimonials_Handoff sheet (20 Nov). Each card's photo place is a logo box
 * (the page accent, with the company logo), so the portrait is cleared. Only rows listed in CARDS are written; every
 * other industry and field is left as it is.
 *
 *   npx payload run scripts/set-industry-testimonials.ts
 *
 * Re-running changes nothing once done.
 */
import fs from "node:fs";

import { getPayload } from "payload";

import config from "@payload-config";

/** `logo`: a media filename prefix; null shows the company name in the box until a logo is supplied. */
type Card = { quote: string; name: string; role?: string; company: string; logo: string | null };

/** Industry slug: its cards in order (the first is the main quote, the rest are further slides). */
const CARDS: Record<string, Card[]> = {
  healthcare: [
    {
      quote:
        "The platform turned out to be a driver for engagement and exceeded our expectations. Customers come back to it regularly.",
      name: "Shivi Gupta",
      company: "Vedic Lab",
      logo: "logo-vedic-lab--logo-white",
    },
  ],
  pharmaceuticals: [
    {
      quote:
        "We have a complex hardware-software consumer product and the HLL team's commitment to innovating and learning on the job has been a great asset to us at Lesielle.",
      name: "Ruben Vázquez",
      company: "Lesielle",
      logo: "logo-lesielle--logo-white",
    },
  ],
  "real-estate": [
    {
      quote:
        "We brought the HLL team right at the start to imagine our new customer platform. Their expertise in the convergence of business, technology and people was instrumental in delivering a high quality experience to our members.",
      name: "Rupesh Kumar",
      company: "WeWork",
      logo: "logo-wework--logo-white",
    },
  ],
  "retail-commerce-brands": [
    {
      quote:
        "The HLL team is fast, reliable and creative. I can trust them to deliver under tight timelines and brand constraints.",
      name: "Apeksha Gupta",
      company: "Galeries Lafayette",
      logo: "logo-galeries-lafayette--logo-white",
    },
    {
      quote:
        "We've trusted them with our core data systems, architecture and digital consumer portfolio. They've had direct impact on our growth.",
      name: "Gabriella Demetriades",
      company: "Deme",
      logo: "logo-deme--logo-white",
    },
  ],
  "international-organization": [
    {
      quote: "They did a good job on our knowledge products and we are very happy with their work.",
      name: "Amrah Ashraf",
      company: "UNDP",
      logo: "logo-undp--logo-white",
    },
  ],
  pettech: [
    {
      quote:
        "Advaith was instrumental in leading the product and alongside him Swapnil led the engineering team. There were numerous challenges and timeline pressure, but the team was dedicated and pulled through.",
      name: "Grant Goodwin",
      company: "Docupet Inc",
      logo: "logo-docupet--logo-white",
    },
  ],
};

const payload = await getPayload({ config });

/**
 * Logos made for these cards, uploaded once if missing: a white UNDP from its client-strip logo, a white Deme from
 * demebygabriella.com, and the Cox & Kings crest from coxandkings.com (for its card once approved).
 */
const BUNDLED: Record<string, string> = {
  "logo-undp--logo-white": "scripts/assets/logo-undp--logo-white.png",
  "logo-deme--logo-white": "scripts/assets/logo-deme--logo-white.png",
  "logo-cox-and-kings--logo": "scripts/assets/logo-cox-and-kings--logo.png",
};

async function mediaId(prefix: string | null) {
  if (!prefix) return null;
  const found = await payload.find({ collection: "media", where: { filename: { like: prefix } }, depth: 0, limit: 1 });
  if (found.docs[0]) return found.docs[0].id;
  const file = BUNDLED[prefix];
  if (!file) throw new Error(`logo not found: ${prefix}`);
  const data = fs.readFileSync(file);
  const doc = await payload.create({
    collection: "media",
    data: { alt: prefix, mediaType: "image" },
    file: { data, name: `${prefix}.png`, mimetype: "image/png", size: data.length },
  });
  console.log(`uploaded ${prefix}.png`);
  return doc.id;
}

for (const [slug, cards] of Object.entries(CARDS)) {
  const { docs } = await payload.find({ collection: "industries", where: { slug: { equals: slug } }, depth: 0, limit: 1 });
  const doc = docs[0];
  if (!doc) {
    console.error(`${slug}: industry not found`);
    continue;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pc = ((doc as any).pageContent ?? {}) as any;
  const cv = pc.clientVoice ?? {};
  const [first, ...rest] = cards;
  const next = {
    ...cv,
    quote: first.quote,
    name: first.name,
    role: first.role ?? null,
    company: first.company,
    companyLogo: await mediaId(first.logo),
    portrait: null,
    moreQuotes: await Promise.all(
      rest.map(async (c) => ({
        quote: c.quote,
        name: c.name,
        role: c.role ?? null,
        company: c.company,
        companyLogo: await mediaId(c.logo),
        portrait: null,
      })),
    ),
  };
  const same = (["quote", "name", "role", "company", "companyLogo", "portrait"] as const).every(
    (k) => (cv[k] ?? null) === (next[k] ?? null),
  ) &&
    JSON.stringify(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (cv.moreQuotes ?? []).map((q: any) => [q.quote, q.companyLogo ?? null]),
    ) === JSON.stringify(next.moreQuotes.map((q: { quote: string; companyLogo: number | string | null }) => [q.quote, q.companyLogo ?? null]));
  if (same) {
    console.log(`${slug}: already set`);
    continue;
  }
  await payload.update({
    collection: "industries",
    id: doc.id,
    draft: false,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: { pageContent: { ...pc, clientVoice: next } } as any,
  });
  console.log(`${slug}: ${cards.map((c) => `${c.name} (${c.company})`).join(", ")}`);
}
process.exit(0);
