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
  }),
};

export function getIndustryPage(slug: string): IndustryPageData | null {
  if (slug === "health-life-sciences") return healthcareIndustry;
  return INDUSTRY_PAGES[slug] ?? null;
}
