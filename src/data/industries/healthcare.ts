import type { IndustryPageData } from "@/types/industry";

export const healthcareIndustry: IndustryPageData = {
  slug: "healthcare",
  category: "Health & Life Sciences",
  breadcrumb: ["Industries", "Health & Life Sciences"],
  accentColor: "#09C1B6",
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
    image: "/assets/industries/healthcare-hero.webp",
  },
  capabilities: {
    eyebrow: "Industry  Healthcare",
    title: "Capabilities",
    sidebar: [
      "HLL Application",
      "HLL People & Policy",
      "HLL Trust & Governance",
      "HLL Foundation",
      "HLL AI",
      "HLL Ontology",
    ],
    items: [
      {
        id: "hll-kinetic",
        index: "01/06",
        title: "HLL Application",
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
            logo: "/assets/engagement/logo-mckinsey.png",
          },
          {
            id: "llm",
            title: "LLM Integration",
            tag: "Insight",
            description:
              "Knowledge graph window showing what clinical and operations teams see in production.",
            variant: "image",
            image: "/assets/engagement/banking.webp",
          },
        ],
      },
      {
        id: "hll-momentum",
        index: "02/06",
        title: "HLL People & Policy",
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
            logo: "/assets/engagement/logo-ktm.png",
          },
          {
            id: "mobile",
            title: "Care pathways",
            tag: "Insight",
            description:
              "Mobile-first care coordination prototypes validated with clinical stakeholders.",
            variant: "image",
            image: "/assets/industries/insight-2.webp",
          },
        ],
      },
    ],
  },
  clientVoice: {
    eyebrow: "Industry  Healthcare",
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
        bio: "Chief Operating Officer\n15+ yrs of experience\nPreviously at McKinsey, SNL",
        photo: "/assets/industries/expert-1.webp",
      },
      {
        id: "2",
        name: "Hannan Hakim",
        bio: "Chief Operating Officer\n15+ yrs of experience\nPreviously at McKinsey, SNL",
        photo: "/assets/industries/expert-2.webp",
      },
      {
        id: "3",
        name: "Hannan Hakim",
        bio: "Chief Operating Officer\n15+ yrs of experience\nPreviously at McKinsey, SNL",
        photo: "/assets/industries/expert-3.webp",
      },
      {
        id: "4",
        name: "Hannan Hakim",
        bio: "Chief Operating Officer\n15+ yrs of experience\nPreviously at McKinsey, SNL",
        photo: "/assets/industries/expert-1.webp",
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
