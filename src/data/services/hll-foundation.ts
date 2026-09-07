export type CapabilityItem = {
  id: string;
  index: string;
  title: string;
  description: string;
  subServices?: string[];
};

export type OutcomeCard = {
  stat: string;
  description: string;
  hasMedia?: boolean;
};

export type EngagementCard = {
  id: string;
  title: string;
  client: string;
  tag: string;
  description: string;
  variant: "navy" | "orange" | "image";
};

export const hllFoundation = {
  slug: "hll-foundation",
  brand: "HLL Foundation",
  breadcrumb: ["Services", "HLL Foundation"],
  hero: {
    headline: "Data your business can finally trust",
    tabs: [
      { id: "data-engineering", label: "Data Engineering" },
      { id: "data-analytics", label: "Data Analytics" },
      { id: "data-audit", label: "Data Audit" },
      { id: "data-infrastructure", label: "Data Infrastructure Assessment" },
    ],
  },
  capabilities: {
    eyebrow: "What we offer",
    title: "Capabilities",
    items: [
      {
        id: "data-engineering",
        index: "01/05",
        title: "Data Engineering",
        description:
          "Design and build reliable data pipelines, lakehouse architectures, and integration layers that unify operational and analytical systems.",
        subServices: [
          "Pipeline design & orchestration",
          "Lakehouse & warehouse setup",
          "Real-time & batch ingestion",
          "Data quality frameworks",
        ],
      },
      {
        id: "data-analytics",
        index: "02/05",
        title: "Data Analytics",
        description:
          "Turn raw data into decision-ready insights with governed metrics, self-serve analytics, and executive dashboards.",
        subServices: [
          "Metric layer & semantic models",
          "BI & dashboard delivery",
          "Advanced analytics & forecasting",
          "Embedded analytics",
        ],
      },
      {
        id: "data-audit",
        index: "03/05",
        title: "Data Audit",
        description:
          "Assess lineage, controls, and compliance posture across your data estate with actionable remediation roadmaps.",
        subServices: [
          "Lineage & catalog review",
          "Access & privacy controls",
          "Regulatory alignment",
          "Remediation planning",
        ],
      },
      {
        id: "data-infrastructure",
        index: "04/05",
        title: "Data Infrastructure Assessment",
        description:
          "Evaluate cloud readiness, cost efficiency, and scalability of your current data platform before major investment.",
        subServices: [
          "Architecture review",
          "Cost & performance tuning",
          "Migration readiness",
          "Security baseline",
        ],
      },
      {
        id: "tools",
        index: "05/05",
        title: "Tools and Technologies",
        description:
          "We deploy proven cloud-native stacks aligned to your governance and integration requirements.",
        subServices: [],
      },
    ] satisfies CapabilityItem[],
    tools: {
      cloud: ["AWS", "Azure", "GCP", "Digital Ocean"],
      stack: ["Kotlin", "Python", "Spark", "dbt", "Airflow", "Snowflake"],
    },
  },
  outcomes: {
    title: "Outcome",
    cards: [
      {
        stat: "60%",
        description: "Reduction in time-to-insight for operational reporting cycles.",
      },
      {
        stat: "30 to 1",
        description: "Consolidation ratio achieved across redundant data pipelines.",
      },
      {
        stat: "85+",
        description: "Data assets catalogued with lineage in enterprise deployments.",
        hasMedia: true,
      },
      {
        stat: "50%",
        description: "Average infrastructure cost savings after platform assessment.",
      },
    ] satisfies OutcomeCard[],
  },
  engagement: {
    title: "Engagement",
    intro:
      "Representative client and industry work demonstrating Foundation capabilities in market.",
    cards: [
      {
        id: "mckinsey",
        title: "McKinsey",
        client: "McKinsey & Company",
        tag: "Client work",
        description:
          "Enterprise data platform modernization with governed analytics for global consulting operations.",
        variant: "navy",
      },
      {
        id: "ktm",
        title: "KTM",
        client: "KTM",
        tag: "Client work",
        description:
          "Unified customer and product data layer supporting multi-market digital engagement.",
        variant: "orange",
      },
      {
        id: "banking",
        title: "Banking",
        client: "Industry",
        tag: "Industry",
        description:
          "Regulatory-grade audit and analytics framework for a tier-one banking data estate.",
        variant: "image",
      },
    ] satisfies EngagementCard[],
  },
  expertVoice: {
    quote:
      "Senior talent deployed across the stack with a knowledge graph window showing what customers see. Momentum is the money-maker, it takes center stage.",
    name: "John Doe",
    role: "CEO",
    company: "McKinsey",
  },
  relatedServices: [
    { label: "HLL Momentum", href: "/services/hll-application" },
    { label: "HLL Governance & Trust", href: "/services/hll-trust" },
    { label: "HLL Kinetic", href: "/services/hll-ai" },
    { label: "HLL Motion", href: "/services/hll-people" },
    { label: "HLL Ontology", href: "/services/hll-ontology" },
  ],
} as const;

export type HLLFoundationData = typeof hllFoundation;
