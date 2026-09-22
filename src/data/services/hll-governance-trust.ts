import type { ServicePageData } from "./types";

export const hllGovernanceTrust: ServicePageData = {
  slug: "hll-trust",
  variant: "hll-trust",
  brand: "HLL Governance & Trust",
  breadcrumb: ["Services", "HLL Governance & Trust"],
  hero: {
    headline: "Could you show a regulator where that number came from?",
    support:
      "Teams can usually see the number. What they can't do is prove where it came from or who touched it last. A catalog tells you a field exists. Lineage tells you what happened to it. We build both, because auditors ask the second question first.",
    tabs: [
      { id: "governance-cataloging", label: "Data Governance & Cataloging" },
      { id: "quality-validation", label: "Data Quality & Validation" },
      { id: "ai-model-governance", label: "AI & Model Governance" },
      { id: "compliance-audit", label: "Compliance & Audit Enablement" },
    ],
  },
  capabilities: {
    eyebrow: "What we offer",
    title: "Capabilities",
    items: [
      {
        id: "governance-cataloging",
        index: "01/04",
        title: "Data Governance & Cataloging",
        description:
          "Cataloging answers four questions about every asset: what exists, who owns it, where it lives, and what is permitted to touch it. Lineage answers the harder one — what happened to a field between source system and dashboard, and which job last changed it. We implement both on Collibra, Alation, or whichever platform already sits in your stack, wired into the pipelines themselves. The catalog then updates as data moves and stays accurate after the engagement ends.",
        subServices: [
          { name: "Metadata Cataloging" },
          { name: "Data Lineage" },
          { name: "Ownership Mapping" },
          { name: "Collibra & Alation Implementation" },
        ],
      },
      {
        id: "quality-validation",
        index: "02/04",
        title: "Data Quality & Validation",
        description:
          "Validation means automated checks running inside the pipeline: schema conformance, null and range thresholds, referential integrity, distribution drift, and freshness windows. We implement on Great Expectations or Soda, positioned upstream so a failure halts the run before bad data reaches a dashboard. Rules get defined with your data owners and tuned against real failure history — thresholds set in a workshop without production evidence generate noise, and noisy checks get switched off within a quarter.",
        subServices: [
          { name: "Automated Data Validation" },
          { name: "Pipeline-Level Quality Checks" },
          { name: "Rule Definition with Data Owners" },
          { name: "Great Expectations & Soda Implementation" },
        ],
      },
      {
        id: "ai-model-governance",
        index: "03/04",
        title: "AI & Model Governance",
        description:
          "Model governance covers what every production model needs on record: training data provenance, input drift monitoring, performance KPI tracking, explainability, and bias testing against protected attributes. For credit and underwriting models that extends to formal debiasing work and the monitoring examiners ask for by name — OCC-style review of model health and performance over time. The layer gets built alongside the model, so the documentation exists before the first audit request arrives.",
        subServices: [
          { name: "Model Monitoring" },
          { name: "Bias & Explainability Testing" },
          { name: "Model Risk Documentation" },
          { name: "Drift Detection" },
        ],
      },
      {
        id: "compliance-audit",
        index: "04/04",
        title: "Compliance & Audit Enablement",
        description:
          "Audit enablement is the operational layer of governance: regulatory reporting support, evidence retrieval, and access and identity controls implemented through Unity Catalog, IAM, and Vault. Retrieval is almost always the real bottleneck — the policy exists, and locating it takes days. We build RAG-based agents over internal knowledge bases and deploy them into the tools teams already have open, so a policy question returns a sourced answer with its origin attached rather than a document to go read.",
        subServices: [
          { name: "Agentic AI for Policy Search" },
          { name: "RAG-Based Knowledge Retrieval" },
          { name: "Regulatory Reporting Support" },
          { name: "Access & Identity Controls" },
        ],
      },
    ],
  },
  outcomes: {
    title: "Outcome",
    cards: [
      {
        stat: "17+",
        description:
          "Industries served, including banking, insurance, healthcare, and government — the ones where governance questions get asked first.",
      },
      {
        stat: "5+ Years",
        description:
          "Firm track record, with our data leadership carrying deep banking and insurance domain experience.",
      },
      {
        stat: "150+",
        description:
          "In-house domain experts across data engineering, analytics, governance, and compliance ready to go.",
      },
    ],
  },
  engagement: {
    title: "Engagement",
    intro: "How the practice runs, and where it holds up under constraint.",
    cards: [
      {
        id: "catalog-without-lineage",
        title: "Catalog Without Lineage Is Half a Program",
        client: "Insight",
        tag: "Insight",
        description:
          "Most catalogs stop at listing what exists and who owns it. We go one layer deeper and track what happened to each field over time, because that's the layer an actual audit tests.",
        variant: "navy",
      },
      {
        id: "agentic-ai-audit",
        title: "Agentic AI for Audit Response",
        client: "Insight",
        tag: "Insight",
        description:
          "Manual document searches and tribal knowledge, replaced by a RAG-based agent deployed across Teams, Slack, and WhatsApp — one knowledge base, queried the same way no matter which tool someone opens first.",
        variant: "orange",
      },
      {
        id: "banking-insurance",
        title: "Banking & Insurance",
        client: "Industry",
        tag: "Industry",
        description:
          "Model risk, credit analytics, and regulatory reporting carry governance requirements most data platforms weren't built for. Our data science bench has delivered inside those exact constraints, for banking and insurance clients, on live regulatory workloads.",
        variant: "image",
      },
    ],
  },
  expertVoice: null,
  relatedServices: [
    { label: "HLL Foundation", href: "/services/hll-foundation" },
    { label: "HLL Momentum", href: "/services/hll-people" },
    { label: "HLL Motion", href: "/services/hll-ai" },
    { label: "HLL Ontology", href: "/services/hll-ontology" },
    { label: "HLL Kinetic", href: "/services/hll-application" },
  ],
  cta: {
    headline: "Talk to us about your data governance gap.",
    buttonLabel: "Write to us",
    href: "/contact",
  },
};
