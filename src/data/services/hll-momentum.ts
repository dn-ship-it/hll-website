import type { ServicePageData } from "./types";

export const hllMomentum: ServicePageData = {
  slug: "hll-people",
  variant: "hll-people",
  brand: "HLL Momentum",
  breadcrumb: ["Services", "HLL Momentum"],
  hero: {
    headline: "The talent gap closed for you in under a week",
    support:
      "Most staffing pitches sound the same because most staffing firms run the same playbook: post the role, forward whoever applies, let you discover who's actually senior around week three. We run the technical evaluation first, before a name ever reaches you. By the time you see a resume, the qualification question is already answered. You're just deciding if you like them.",
    tabs: [
      { id: "technology-engineering", label: "Technology & Engineering" },
      { id: "executive-search", label: "Executive Search" },
      { id: "staffing-augmentation", label: "Staffing & Augmentation" },
      { id: "permanent-placement", label: "Permanent Placement" },
    ],
  },
  capabilities: {
    eyebrow: "What we offer",
    title: "Capabilities",
    items: [
      {
        id: "technology-engineering",
        index: "01/04",
        title: "Technology & Engineering Talent",
        description:
          "We staff across data and AI (data engineering, lakehouse and feature stores, ML, GenAI and RAG systems, model governance), platform and application engineering, cloud and DevOps, enterprise integration including core banking and ERP, and security and compliance tech. Every technical candidate sits a live working session with an in-house panel member who has shipped in that stack. The assessment is conversational and goes at architectural judgement and complex problem-solving, held at the same depth for every seniority level.",
        subServices: [
          { name: "Data, Analytics & AI" },
          { name: "Platform & Application Engineering" },
          { name: "Cloud, Infrastructure & DevOps" },
          { name: "Security & Compliance Tech" },
        ],
      },
      {
        id: "executive-search",
        index: "02/04",
        title: "Executive & Leadership Search",
        description:
          "Retained mandates across four tiers: C-suite (CEO, CFO, CTO, CMO, CHRO, COO, CRO, CDO), board and advisory seats, senior leadership including managing directors and regional heads, and functional or P&L leaders. Search runs on partner-led outreach into passive candidates, using a proprietary reference architecture to map who is actually operating well in the role elsewhere. Compensation is benchmarked against live market data pulled for that specific mandate. Every search is discreet by default: the mandate goes unadvertised and candidates are approached directly.",
        subServices: [
          { name: "C-Suite & Board" },
          { name: "Functional Heads & VPs" },
          { name: "Retained Search" },
          { name: "Compensation Benchmarking" },
        ],
      },
      {
        id: "staffing-augmentation",
        index: "03/04",
        title: "Staffing & Augmentation",
        description:
          "Dedicated pods or individual specialists, embedded in your team and working in your tools, your sprints, and your repo. The focus is deliberately narrow — technology and design roles, where our own domain evaluation holds up under scrutiny. Rates are pegged to current market. Engagements run a six-month minimum, because in complex technical work the productivity gap between an average and a strong contributor runs as high as 8x, and swapping someone mid-build resets that gap to zero.",
        subServices: [
          { name: "Dedicated Pods" },
          { name: "Project-Based Contracts" },
          { name: "Six-Month Minimum Engagement" },
          { name: "Rapid Scaling" },
        ],
      },
      {
        id: "permanent-placement",
        index: "04/04",
        title: "Permanent Placement",
        description:
          "Permanent hiring across the full functional map: technology and design, finance and accounting including FP&A, treasury, risk and actuarial roles, sales and revenue operations, marketing, HR and people ops, legal and compliance, and operations and supply chain. Fees run 15–25% of annual compensation, scaled to the seniority and scarcity of the role. Background verification and compliance checks are completed before a candidate reaches your interview stage. Every placement carries a 90-day replacement guarantee.",
        subServices: [
          { name: "Full-Spectrum Coverage" },
          { name: "90-Day Replacement Guarantee" },
          { name: "Market-Aligned Pricing" },
          { name: "Full Background & Reference Checks" },
        ],
      },
    ],
  },
  outcomes: {
    title: "Outcome",
    cards: [
      {
        stat: "<1 Week",
        description:
          "First batch of technically validated profiles, delivered in under a week — fast enough to start interviews the same week most searches are still being scoped.",
      },
      {
        stat: "95%",
        description:
          "Candidates who accept the offer once it's extended. We screen for fit before we screen for skill, so the yes is rarely a surprise.",
      },
      {
        stat: "90 Days",
        description:
          "Free replacement window on every permanent placement. If the fit's wrong, that's ours to fix.",
        hasMedia: true,
      },
      {
        stat: "Up to 8x",
        description:
          "The productivity spread between an average hire and a strong one on high-complexity work. It's why we're strict about who gets sent.",
      },
    ],
  },
  engagement: {
    title: "Engagement",
    intro: "How the practice runs, and where it holds up under constraint.",
    cards: [
      {
        id: "precision-process",
        title: "The Precision Process",
        client: "Insight",
        tag: "Insight",
        description:
          "Three phases, six checkpoints: align on the role, source and screen at scale, then validate before deployment. Every candidate sits a human interview, regardless of how the algorithmic screen scored them.",
        variant: "navy",
      },
      {
        id: "two-models",
        title: "Two Models, Not One",
        client: "Insight",
        tag: "Insight",
        description:
          "Retained search and staff augmentation solve different problems. We price them differently, staff them differently, and keep the two teams apart.",
        variant: "orange",
      },
      {
        id: "regulated-high-scale",
        title: "Regulated & High-Scale Environments",
        client: "Industry",
        tag: "Industry",
        description:
          "Banking, insurance, and enterprise technology hiring carries its own constraints: compliance screening, clearance timelines, and a technical bar built for regulated environments specifically.",
        variant: "image",
      },
    ],
  },
  expertVoice: null,
  relatedServices: [
    { label: "HLL Foundation", href: "/services/hll-foundation" },
    { label: "HLL Kinetic", href: "/services/hll-application" },
    { label: "HLL Governance & Trust", href: "/services/hll-trust" },
    { label: "HLL Motion", href: "/services/hll-ai" },
    { label: "HLL Ontology", href: "/services/hll-ontology" },
  ],
  cta: {
    headline: "Talk to us about your next hire.",
    buttonLabel: "Write to us",
    href: "/contact",
  },
};
