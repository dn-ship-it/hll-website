/**
 * Sample Insights articles, with the Figma Insights page's placeholder copy
 * (209:830), to preview the page until real articles are in the CMS. Covers
 * and author photos are left empty, so they show grey as in the design.
 *
 *   npx payload run scripts/seed-insights.ts            add the samples
 *   npx payload run scripts/seed-insights.ts -- --remove remove them again
 *
 * Every sample's slug starts "sample-", which is how --remove finds them.
 * Safe to re-run: existing samples are left as they are.
 */
import { getPayload } from "payload";

import config from "@payload-config";

const LOREM_BODY =
  "Senior talent deployed across the stack with a knowledge graph window showing what customers see. Momentum is the money-maker, it takes center stage. Senior talent deployed across the stack with a knowledge graph window showing what customers see. Momentum is the money-maker, it takes center stage.";
const SHORT = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur  sodales laoreet velit.";

const twoParagraphs = `${LOREM_BODY}\n\n${LOREM_BODY}`;

const sections = [
  { blockType: "insightText", label: "Lorem Ipsum", body: twoParagraphs },
  {
    blockType: "insightBox",
    colour: "#086EE8",
    content: "quote",
    quote:
      "Senior talent deployed across the stack with a knowledge graph window showing what customers see. Momentum is the money-maker.",
    name: "John Doe",
    role: "CEO, Lorem Ipsum",
  },
  { blockType: "insightText", label: "Lorem Ipsum", body: twoParagraphs },
  {
    blockType: "insightStats",
    label: "Lorem Ipsum",
    items: [
      { stat: "30+", text: SHORT },
      { stat: "65%", text: SHORT },
    ],
  },
  { blockType: "insightText", label: "Lorem Ipsum", body: twoParagraphs },
  { blockType: "insightMedia" },
  {
    blockType: "insightQuote",
    quote: "Our formula changes with the weather. That's hard to build. The site shows customers exactly how it works.",
    role: "Founder",
    name: "Jane Doe",
    colour: "#086EE8",
  },
  { blockType: "insightText", label: "Lorem Ipsum", body: twoParagraphs },
];

const intro = {
  root: {
    type: "root",
    format: "",
    indent: 0,
    version: 1,
    direction: "ltr",
    children: [LOREM_BODY, "Senior talent deployed across the stack with a knowledge graph window showing what customers see. Momentum is the money-maker, it takes center stage."].map((text) => ({
      type: "paragraph",
      format: "",
      indent: 0,
      version: 1,
      direction: "ltr",
      textFormat: 0,
      children: [{ type: "text", text, format: 0, style: "", mode: "normal", detail: 0, version: 1 }],
    })),
  },
};

const TAG_SETS = [
  ["Data Analysis", "Investments"],
  ["Data", "Payments", "Wealth"],
  ["Artificial Intelligence", "Data Analysis", "Investments"],
];

const samples = Array.from({ length: 12 }, (_, i) => {
  const n = i + 1;
  const lead = i === 0;
  return {
    slug: `sample-${n}`,
    title: lead ? "Lorem Ipsum" : n % 2 ? "Lorem ipsum dolor sit" : "Lorem ipsum",
    byline: lead || n % 3 === 0 ? "Audit answers in hours, not weeks" : undefined,
    tags: lead ? TAG_SETS[2] : TAG_SETS[n % 2],
    excerpt: SHORT,
    author: { name: n % 2 ? "Jane Doe" : "John Doe" },
    featured: lead,
    // Newest first: 12 November 2026, then a day apart.
    publishedAt: new Date(Date.UTC(2026, 10, 12 - i)).toISOString(),
    body: intro,
    sections,
  };
});

const payload = await getPayload({ config });
const remove = process.argv.includes("--remove");

if (remove) {
  const { docs } = await payload.find({
    collection: "posts",
    where: { slug: { like: "sample-" } },
    limit: 100,
    depth: 0,
    draft: true,
  });
  for (const doc of docs.filter((d) => d.slug.startsWith("sample-"))) {
    await payload.delete({ collection: "posts", id: doc.id });
    console.log(`${doc.slug}: removed`);
  }
  process.exit(0);
}

for (const sample of samples) {
  const found = await payload.find({
    collection: "posts",
    where: { slug: { equals: sample.slug } },
    limit: 1,
    depth: 0,
    draft: true,
  });
  if (found.docs[0]) {
    console.log(`${sample.slug}: already there`);
    continue;
  }
  await payload.create({
    collection: "posts",
    // The block and Lexical shapes are checked by Payload on save.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: { ...sample, _status: "published" } as any,
  });
  console.log(`${sample.slug}: added`);
}
process.exit(0);
