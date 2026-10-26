import type { IndustryPageData } from "@/types/industry";

import { healthcareIndustry } from "./healthcare";

/**
 * Payments and Insurance follow the Figma "Industry_Image Test" frames
 * (Imagery section), and Pharmaceuticals the "Industries Color Palettes"
 * frame: the Healthcare template with their own name, colour and hero image. Everything below the hero is the template's placeholder copy
 * until each industry's content is written.
 */
function fromTemplate(overrides: {
  slug: string;
  category: string;
  title: string;
  image: string;
  related: IndustryPageData["relatedIndustries"];
}): IndustryPageData {
  const eyebrow = `Industry  ${overrides.title}`;
  return {
    ...healthcareIndustry,
    slug: overrides.slug,
    category: overrides.category,
    breadcrumb: ["Industries", overrides.category],
    hero: { ...healthcareIndustry.hero, title: overrides.title, overlayLabel: overrides.title, image: overrides.image },
    capabilities: { ...healthcareIndustry.capabilities, eyebrow },
    clientVoice: { ...healthcareIndustry.clientVoice, eyebrow },
    lab: { ...healthcareIndustry.lab, selectorLabel: overrides.title },
    relatedIndustries: overrides.related,
  };
}

export const INDUSTRY_PAGES: Record<string, IndustryPageData> = {
  healthcare: healthcareIndustry,
  payments: fromTemplate({
    slug: "payments",
    category: "Finance",
    title: "Payments",
    image: "/assets/industries/payments-hero.webp",
    related: [
      { label: "Healthcare", href: "/industries/healthcare" },
      { label: "Insurance", href: "/industries/insurance" },
    ],
  }),
  insurance: fromTemplate({
    slug: "insurance",
    // The Figma test frame repeats "Health & Life Sciences" here; Insurance
    // sits under Financial Services in the industry palette.
    category: "Financial Services",
    title: "Insurance",
    image: "/assets/industries/insurance-hero.webp",
    related: [
      { label: "Healthcare", href: "/industries/healthcare" },
      { label: "Payments", href: "/industries/payments" },
    ],
  }),
  pharmaceuticals: fromTemplate({
    slug: "pharmaceuticals",
    category: "Health & Life Sciences",
    title: "Pharmaceuticals",
    // Figma Imagery › "HLL_Pharma".
    image: "/assets/industries/pharmaceuticals-hero.webp",
    related: [
      { label: "Healthcare", href: "/industries/healthcare" },
      { label: "Insurance", href: "/industries/insurance" },
    ],
  }),  // The rest of the 17 Oct handoff's industries (its permanent IDs). Their
  // copy comes from the CMS. Hero images: Figma › Final › Imagery, shared by
  // Hannan's groups (canvas 19/10/26): Financial Services the Payments image,
  // Commerce & Consumer the Commerce one, Public Sector and International
  // Organizations Governance, Consulting Professional Services; Logistics has
  // its own. PetTech, Manufacturing and Real Estate have none yet and keep
  // the template's.
  "banking": fromTemplate({
    slug: "banking",
    category: "Financial Services",
    title: "Banking",
    image: "/assets/industries/payments-hero.webp",
    related: [],
  }),
  "other-financial-services": fromTemplate({
    slug: "other-financial-services",
    category: "Financial Services",
    title: "Other Financial Services",
    image: "/assets/industries/payments-hero.webp",
    related: [],
  }),
  "retail-commerce-brands": fromTemplate({
    slug: "retail-commerce-brands",
    category: "Commerce & Consumer",
    title: "Retail Commerce & Brands",
    image: "/assets/industries/commerce-hero.webp",
    related: [],
  }),
  "travel-hospitality": fromTemplate({
    slug: "travel-hospitality",
    category: "Commerce & Consumer",
    title: "Travel & Hospitality",
    image: "/assets/industries/commerce-hero.webp",
    related: [],
  }),
  "pettech": fromTemplate({
    slug: "pettech",
    category: "Commerce & Consumer",
    title: "Pet Tech",
    image: healthcareIndustry.hero.image ?? "",
    related: [],
  }),
  "manufacturing": fromTemplate({
    slug: "manufacturing",
    category: "Built Environment & Industry",
    title: "Manufacturing",
    image: healthcareIndustry.hero.image ?? "",
    related: [],
  }),
  "real-estate": fromTemplate({
    slug: "real-estate",
    category: "Built Environment & Industry",
    title: "Real Estate",
    image: healthcareIndustry.hero.image ?? "",
    related: [],
  }),
  "logistics": fromTemplate({
    slug: "logistics",
    category: "Built Environment & Industry",
    title: "Logistics",
    image: "/assets/industries/logistics-hero.webp",
    related: [],
  }),
  "public-sector-external-affairs": fromTemplate({
    slug: "public-sector-external-affairs",
    category: "Government & Public Institutions",
    title: "Public Sector – External Affairs",
    image: "/assets/industries/governance-hero.webp",
    related: [],
  }),
  "public-sector-tax-commerce": fromTemplate({
    slug: "public-sector-tax-commerce",
    category: "Government & Public Institutions",
    title: "Public Sector – Tax & Commerce",
    image: "/assets/industries/governance-hero.webp",
    related: [],
  }),
  "international-organization": fromTemplate({
    slug: "international-organization",
    category: "Government & Public Institutions",
    title: "International Organization",
    image: "/assets/industries/governance-hero.webp",
    related: [],
  }),
  "consulting-firms": fromTemplate({
    slug: "consulting-firms",
    category: "Professional Services",
    title: "Consulting Firms",
    image: "/assets/industries/professional-services-hero.webp",
    related: [],
  }),

};

/** Menu labels whose page ID isn't just the label in kebab case. */
export const INDUSTRY_ALIASES: Record<string, string> = {
  "health-life-sciences": "healthcare",
  "pet-tech": "pettech",
};

export function getIndustryPage(slug: string): IndustryPageData | null {
  return INDUSTRY_PAGES[INDUSTRY_ALIASES[slug] ?? slug] ?? null;
}
