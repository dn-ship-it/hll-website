import type { ServiceVariant } from "@/components/hll/variants";

import type { ServicePageData } from "./types";

/**
 * PLACEHOLDER content for services that have a Figma frame but no copy yet
 * (HLL AI 1341:16956, HLL Ontology 1341:16568). Everything below the headline
 * mirrors the Figma service template verbatim, including its stand-in text,
 * so the page matches the design until the real copy lands in the CMS.
 */
const BODY =
  "Senior talent deployed across the stack with a knowledge graph window showing what customers see. Momentum is the money-maker, it takes center stage.";
const SHORT = "Senior talent deployed across the stack with a knowledge graph window showing what customers.";
const LONG = `${BODY} Senior talent deployed across the stack with a knowledge graph window showing what customers see. Momentum is the money-maker.`;
const CARD = "Senior talent deployed across the stack with a knowledge graph window showing what customers see. Momentum is the money-maker.";

const SUB_SERVICES = [1, 2, 3, 4].map((n) => ({ name: `Sub-Service ${n}` }));

const CAPABILITIES = [
  { id: "data-engineering", title: "Data Engineering" },
  { id: "data-analytics", title: "Data Analytics" },
  { id: "data-audit", title: "Data Audit" },
  { id: "data-infrastructure-assessment", title: "Data Infrastructure Assessment" },
];

export function figmaTemplateService({
  slug,
  variant,
  brand,
  headline,
  relatedServices,
}: {
  slug: string;
  variant: ServiceVariant;
  brand: string;
  headline: string;
  relatedServices: ServicePageData["relatedServices"];
}): ServicePageData {
  return {
    slug,
    variant,
    brand,
    breadcrumb: ["Services", brand],
    hero: {
      headline,
      tabs: CAPABILITIES.map(({ id, title }) => ({ id, label: title })),
    },
    capabilities: {
      eyebrow: "What we offer",
      title: "Capabilities",
      items: CAPABILITIES.map(({ id, title }, i) => ({
        id,
        index: `0${i + 1}/04`,
        title,
        description: BODY,
        subServices: SUB_SERVICES,
      })),
    },
    outcomes: {
      title: "Outcome",
      cards: [
        { stat: "60%", description: LONG },
        { stat: "30 to 1", description: SHORT },
        { stat: "85+", description: BODY, hasMedia: true },
        { stat: "50%", description: LONG },
      ],
    },
    engagement: {
      title: "Engagement",
      intro: "Senior talent deployed across the stack with a knowledge graph window showing what customers see.",
      cards: [
        {
          id: "mckinsey",
          title: "McKinsey",
          client: "McKinsey",
          tag: "Client work",
          description: CARD,
          variant: "navy",
          logo: "/assets/engagement/logo-mckinsey.png",
        },
        {
          id: "ktm",
          title: "KTM",
          client: "KTM",
          tag: "Client work",
          description: CARD,
          variant: "orange",
          logo: "/assets/engagement/logo-ktm.png",
        },
        {
          id: "banking",
          title: "Banking",
          client: "Industry",
          tag: "Industry",
          description: CARD,
          variant: "image",
          image: "/assets/engagement/banking.webp",
        },
      ],
    },
    expertVoice: {
      quote: CARD,
      name: "John Doe",
      role: "CEO",
      company: "McKinsey",
      portrait: "/assets/engagement/expert-portrait.webp",
      companyLogo: "/assets/engagement/logo-mckinsey.png",
    },
    relatedServices,
    cta: {
      headline: "Let's start a conversation.",
      buttonLabel: "Write to us",
      href: "/contact",
    },
  };
}
