import { figmaTemplateService } from "./figma-template";

// Headline from the home page's service list; the rest is the Figma template
// placeholder (see figma-template.ts) until the Ontology copy is written.
export const hllOntology = figmaTemplateService({
  slug: "ontology",
  variant: "hll-ontology",
  brand: "Ontology",
  headline:
    "A connected view of the knowledge and relationships in your business",
  relatedServices: [
    { label: "Data & Analytics", href: "/services/data-analytics" },
    { label: "Trust & Governance", href: "/services/trust-governance" },
    { label: "AI", href: "/services/ai" },
    { label: "Applications", href: "/services/applications" },
    { label: "People & Policy", href: "/services/people-policy" },
  ],
});
