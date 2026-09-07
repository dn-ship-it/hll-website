import type { IndustryPageData } from "@/types/industry";

export const healthcareIndustry: IndustryPageData = {
  slug: "healthcare",
  category: "Health & Life Sciences",
  breadcrumb: ["Industries", "Health & Life Sciences"],
  accentColor: "#0D9488",
  hero: {
    title: "Healthcare",
    headline: "Audit answers in hours, not weeks",
    filters: [
      { id: "nbfcs", label: "NBFCs" },
      { id: "brokerage", label: "Brokerage" },
      { id: "finserv", label: "Finserv" },
      { id: "insurance", label: "Insurance" },
      { id: "payments", label: "Payments" },
      { id: "wealth", label: "Wealth" },
    ],
    overlayLabel: "Healthcare",
  },
  capabilities: {
    eyebrow: "Industry: Banking",
    title: "Capabilities",
    sidebar: [
      "HLL Kinetic",
      "HLL Momentum",
      "HLL Governance & Trust",
      "HLL Foundation",
      "HLL Motion",
      "HLL Ontology",
    ],
    items: [
      {
        id: "hll-kinetic",
        index: "01/06",
        title: "HLL Kinetic",
        description:
          "Senior talent deployed across the stack with governed delivery models built for regulated healthcare environments.",
        cards: [
          {
            id: "mckinsey",
            title: "McKinsey",
            client: "McKinsey & Company",
            tag: "Client work",
            description:
              "Enterprise analytics modernization for a global consulting healthcare practice.",
            variant: "navy",
          },
          {
            id: "llm",
            title: "LLM Integration",
            tag: "Insight",
            description:
              "Knowledge graph window showing what clinical and operations teams see in production.",
            variant: "image",
          },
        ],
      },
      {
        id: "hll-momentum",
        index: "02/06",
        title: "HLL Momentum",
        description:
          "Momentum is the money-maker — product-grade experiences that connect patient, provider, and payer data.",
        cards: [
          {
            id: "ktm",
            title: "KTM",
            client: "KTM",
            tag: "Client work",
            description:
              "Unified engagement layer supporting multi-market digital health programs.",
            variant: "orange",
          },
          {
            id: "mobile",
            title: "Care pathways",
            tag: "Insight",
            description:
              "Mobile-first care coordination prototypes validated with clinical stakeholders.",
            variant: "image",
          },
        ],
      },
    ],
  },
  clientVoice: {
    eyebrow: "Industry: Healthcare",
    quote:
      "Senior talent deployed across the stack with a knowledge graph window showing what customers see. Momentum is the money-maker.",
    name: "John Doe",
    role: "CEO",
    company: "McKinsey",
    slideCount: 3,
  },
  experts: {
    eyebrow: "Team",
    title: "Named Experts",
    people: [
      {
        id: "1",
        name: "Hannan Hakim",
        bio: "Chief Operating Officer · 15+ yrs of experience · Previously at McKinsey, SNL",
      },
      {
        id: "2",
        name: "Hannan Hakim",
        bio: "Chief Operating Officer · 15+ yrs of experience · Previously at McKinsey, SNL",
      },
      {
        id: "3",
        name: "Hannan Hakim",
        bio: "Chief Operating Officer · 15+ yrs of experience · Previously at McKinsey, SNL",
      },
      {
        id: "4",
        name: "Hannan Hakim",
        bio: "Chief Operating Officer · 15+ yrs of experience · Previously at McKinsey, SNL",
      },
    ],
  },
  lab: {
    eyebrow: "Demo tool",
    title: "Inside the Lab",
    selectorLabel: "Healthcare",
    demoUrl: "/demos/hll-foundation-data-engineering.html",
  },
  relatedIndustries: [
    { label: "Payments", href: "/industries/payments" },
    { label: "Insurance", href: "/industries/insurance" },
  ],
};
