import { VARIANT_GRADIENTS } from "@/components/hll/variants";
import { SERVICE_LABELS, type Engagement } from "@/data/engagements";
import { INDUSTRY_PAGES } from "@/data/industries";
import { SERVICE_PAGES } from "@/data/services";

/** One result in the AI Bubble search: a page, its tile colour, and the words it answers to. */
export type SearchEntry = {
  title: string;
  href: string;
  /** Tile gradient; a service's own colours, grey for everything else. */
  colors?: string[];
  keywords: string;
};

const PAGES: SearchEntry[] = [
  {
    title: "Engagements",
    href: "/engagement",
    keywords: "work case studies clients projects",
  },
  { title: "About", href: "/about", keywords: "values reach company story" },
  { title: "Team", href: "/team", keywords: "founder leadership people" },
  { title: "Careers", href: "/careers", keywords: "jobs open roles hiring" },
  {
    title: "Contact",
    href: "/contact",
    keywords: "email offices schedule call",
  },
];

/** Everything the AI Bubble can find, built from the same data the pages render. */
export function buildSearchIndex(engagements: Engagement[]): SearchEntry[] {
  const services = Object.values(SERVICE_PAGES).map((page) => ({
    title: SERVICE_LABELS[page.variant],
    href: `/services/${page.slug}`,
    colors: VARIANT_GRADIENTS[page.variant].colors,
    keywords: [
      page.hero.headline,
      ...page.capabilities.items.flatMap((item) => [
        item.title,
        ...(item.subServices ?? []).map((s) => s.name),
      ]),
    ].join(" "),
  }));

  const industries = Object.values(INDUSTRY_PAGES).map((page) => ({
    title: page.hero.title,
    href: `/industries/${page.slug}`,
    keywords: [
      page.category,
      page.hero.headline,
      ...page.hero.filters.map((f) => f.label),
    ].join(" "),
  }));

  const work = engagements.map((e) => ({
    title: e.client,
    href: `/engagement/${e.slug}`,
    keywords: [e.type, e.industry, ...e.services.map((s) => SERVICE_LABELS[s])]
      .filter(Boolean)
      .join(" "),
  }));

  return [...services, ...industries, ...work, ...PAGES];
}
