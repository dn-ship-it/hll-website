/**
 * Expert voice people per capability page (Hannan's tracker AI-002, ONT-001,
 * DATA-001, APP-002; his reply 29 Oct: "the quotes are correct, only the
 * names and images need to be shuffled", and no two pages should open on the
 * same person). Each quote keeps its words; only who says it changes.
 *
 *   npx payload run scripts/shuffle-expert-voices.ts
 *
 * Pages not listed keep their people. Cloud waits on Hannan (CLA-001 names a
 * "Claude" page), and Applications' second voice ("Hanasri") isn't on the
 * team list yet, so Anjali speaks twice there for now.
 */
import { getPayload } from "payload";

import config from "@payload-config";

const PEOPLE = {
  hannan: { name: "Hannan Hakim", role: "Senior Partner", photo: "portrait--hs-hannan-hakim" },
  nilesh: { name: "Nilesh Nalnikar", role: "Senior Partner", photo: "portrait--hs-nilesh-nalnikar" },
  advaith: { name: "Advaith Mohan", role: "Consulting Partner, AI & Ontology", photo: "portrait--hs-advaith-mohan" },
  anjali: { name: "Anjali Darhba", role: "Consulting Partner, Design", photo: "portrait--hs-anjali-darhba" },
  chinmay: { name: "Chinmay Chandgude", role: "Partner", photo: "portrait--hs-chinmay-chandgude" },
  lalith: { name: "Lalith Kumar", role: "Senior Solution Architect", photo: "team-photo--lalith-kumar" },
} as const;
type Person = keyof typeof PEOPLE;

// The first person on each page is different from every other page's first.
const PAGES: Record<string, Person[]> = {
  "data-analytics": ["nilesh", "hannan", "advaith"],
  ai: ["hannan", "advaith", "nilesh"],
  ontology: ["advaith", "hannan", "nilesh"],
  applications: ["anjali", "chinmay", "anjali"],
  // Nilesh also opened Data & Analytics.
  "trust-governance": ["lalith", "nilesh", "hannan"],
};

const payload = await getPayload({ config });

const photoIds = new Map<string, number | string>();
for (const person of Object.values(PEOPLE)) {
  const found = await payload.find({ collection: "media", where: { filename: { like: person.photo } }, limit: 1, depth: 0 });
  if (!found.docs[0]) {
    console.error(`no photo ${person.photo}`);
    process.exit(1);
  }
  photoIds.set(person.photo, found.docs[0].id);
}

for (const [slug, people] of Object.entries(PAGES)) {
  const found = await payload.find({ collection: "services", where: { slug: { equals: slug } }, limit: 1, depth: 0, draft: true });
  const doc = found.docs[0];
  if (!doc) {
    console.error(`${slug}: not in the CMS`);
    continue;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pageContent: any = doc.pageContent ?? {};
  const first = pageContent.expertVoice;
  if (!first) {
    console.error(`${slug}: no expert voice`);
    continue;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const quotes: any[] = [first, ...(first.moreQuotes ?? [])];
  const speak = (quote: Record<string, unknown>, person: Person) => {
    const p = PEOPLE[person];
    return { ...quote, name: p.name, role: p.role, portrait: photoIds.get(p.photo) };
  };
  const [lead, ...rest] = quotes.map((quote, i) => (people[i] ? speak(quote, people[i]) : quote));
  await payload.update({
    collection: "services",
    id: doc.id,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: { pageContent: { ...pageContent, expertVoice: { ...lead, moreQuotes: rest.map(({ moreQuotes: _, ...q }) => q) } }, _status: "published" } as any,
  });
  console.log(`${slug}: ${quotes.map((_, i) => (people[i] ? PEOPLE[people[i]].name : quotes[i].name)).join(", ")}`);
}
process.exit(0);
