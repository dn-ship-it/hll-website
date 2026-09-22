import type { ServicePageData } from "./types";

export const hllKinetic: ServicePageData = {
  slug: "hll-application",
  variant: "hll-application",
  brand: "HLL Kinetic",
  breadcrumb: ["Services", "HLL Kinetic"],
  hero: {
    headline: "We build applications that are a delight to use",
    tabs: [
      { id: "experience-design", label: "Experience Design" },
      { id: "interface-product-design", label: "Interface & Product Design" },
      { id: "web-design-development", label: "Web Design & Development" },
      { id: "software-engineering", label: "Software Engineering" },
      { id: "quality-devops", label: "Quality & DevOps" },
    ],
  },
  capabilities: {
    eyebrow: "What we offer",
    title: "Capabilities",
    items: [
      {
        id: "experience-design",
        index: "01/05",
        title: "Experience Design",
        description:
          "Experience design runs from research through to buildable specification: UX audits of the existing product, primary and secondary research, personas built from interviews, journey maps, user stories and flows, information architecture, and wireframes. The research drives the architecture — where users abandon a flow determines how the IA gets restructured, and that decision is made with evidence rather than in a workshop. What engineering receives is a specification with the interaction behaviour already resolved.",
        subServices: [
          { name: "UX Research & Audits" },
          { name: "Customer Journey Mapping" },
          { name: "User Flows & IA" },
          { name: "Wireframing" },
        ],
      },
      {
        id: "interface-product-design",
        index: "02/05",
        title: "Interface & Product Design",
        description:
          "Interface work is built as a system: a design language, a component library, interaction states, and the rules governing how components compose. Mobile and web derive from the same system, so one visual identity holds across platforms shipping on different release cycles. Prototypes are built at interaction fidelity — motion, states, and edge cases resolved in the prototype itself, so behaviour is agreed and estimable before engineering picks it up.",
        subServices: [
          { name: "Design Systems" },
          { name: "Mobile App Design" },
          { name: "Web App Design" },
          { name: "Prototyping & Interaction Design" },
        ],
      },
      {
        id: "web-design-development",
        index: "03/05",
        title: "Web Design & Development",
        description:
          "Website work covers audit, content architecture, design, and build. The content model is the decision that determines whether a site survives its second year: how many module types the editorial team gets, what they can publish without a developer, and whether the structure holds when the site doubles in size. We build custom CMS backends sized to that model, then the front end on top. Copywriting and content architecture sit in scope together, since the structure and the words get decided at the same time.",
        subServices: [
          { name: "Website Design" },
          { name: "Custom CMS Development" },
          { name: "Content Architecture" },
          { name: "Website Audits" },
        ],
      },
      {
        id: "software-engineering",
        index: "04/05",
        title: "Software Engineering",
        description:
          "Engineering covers web and mobile applications, backend and API development, and the integration layer connecting them to the systems already running the business: SAP, core banking, ERP, and third-party services. Architecture decisions get made explicitly and defended — native or cross-platform, microservices or monolith, event-driven where the business genuinely needs asynchronous processing. High-load architecture design sits in the practice, as do code and architecture audits, run on inherited codebases as readily as our own.",
        subServices: [
          { name: "Web & Mobile Apps" },
          { name: "Backend & API Engineering" },
          { name: "Cloud & DevOps" },
          { name: "Legacy Modernization" },
        ],
      },
      {
        id: "quality-devops",
        index: "05/05",
        title: "Quality & DevOps",
        description:
          "Quality engineering covers functional and regression testing, integration, load and stress testing, security testing, and UI and API automation. DevOps covers the path from commit to production: CI/CD pipelines, infrastructure automation, observability, and L3 production support. Both run inside the same sprint as feature work, starting at the first commit. Where a codebase arrives with decayed coverage, rebuilding the suite is scoped as its own workstream with a target coverage figure agreed before any work begins.",
        subServices: [
          { name: "Test Automation" },
          { name: "Performance & Load Testing" },
          { name: "CI/CD & Release Engineering" },
          { name: "Legacy Modernization" },
        ],
      },
    ],
  },
  outcomes: {
    title: "Outcome",
    cards: [
      {
        stat: "16% → 85%",
        description:
          "Unit test coverage on a legacy codebase, after a lean team rebuilt the safety net by hand.",
      },
      {
        stat: "<2 Weeks",
        description:
          "Time to execute a modernization effort originally scoped at 10 to 12 months.",
      },
      {
        stat: "44",
        description:
          "Content modules built into a custom CMS for a $4B industrial conglomerate's corporate site.",
        hasMedia: true,
      },
      {
        stat: "200+",
        description:
          "Projects delivered across 17+ industries: an FDA-cleared cardiac monitoring platform, a national cricket board's website, a $4B conglomerate's CMS. Different problems, same team.",
      },
    ],
  },
  engagement: {
    title: "Engagement",
    intro: "Selected work behind the outcomes above.",
    cards: [
      {
        id: "wework",
        title: "WeWork",
        client: "WeWork",
        tag: "Client work",
        description:
          "A full redesign of the WeWork member app: UX research, journey mapping, wireframes, and the mobile design that shipped, built for both members and on-demand customers across WeWork's product lines.",
        variant: "navy",
      },
      {
        id: "ktm-bajaj",
        title: "KTM x Bajaj",
        client: "KTM x Bajaj",
        tag: "Client work",
        description:
          "A production-planning platform integrated end-to-end with Bajaj and KTM's SAP systems, giving vendors real-time visibility into schedules and material requirements.",
        variant: "orange",
      },
      {
        id: "legacy-modernization",
        title: "Legacy Modernization",
        client: "Insight",
        tag: "Insight",
        description:
          "Unit test coverage from 16% to 85% in under two weeks, using GenAI-assisted engineering. The manual estimate for the same work: 50 people, nine to twelve months.",
        variant: "image",
      },
    ],
  },
  expertVoice: null,
  relatedServices: [
    { label: "HLL Foundation", href: "/services/hll-foundation" },
    { label: "HLL Momentum", href: "/services/hll-people" },
    { label: "HLL Governance & Trust", href: "/services/hll-trust" },
    { label: "HLL Motion", href: "/services/hll-ai" },
    { label: "HLL Ontology", href: "/services/hll-ontology" },
  ],
  cta: {
    headline: "Talk to us about what you're building.",
    buttonLabel: "Write to us",
    href: "/contact",
  },
};
