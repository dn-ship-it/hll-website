import { figmaTemplateService } from "./figma-template";

// Headline from the home page's service list; the rest is the Figma template
// placeholder (see figma-template.ts) until the HLL Ontology copy is written.
export const hllOntology = figmaTemplateService({
  slug: "hll-ontology",
  variant: "hll-ontology",
  brand: "HLL Ontology",
  headline: "A connected view of the knowledge and relationships in your business",
  relatedServices: [
    { label: "HLL Foundation", href: "/services/hll-foundation" },
    { label: "HLL Trust & Governance", href: "/services/hll-trust" },
    { label: "HLL AI", href: "/services/hll-ai" },
    { label: "HLL Application", href: "/services/hll-application" },
    { label: "HLL People & Policy", href: "/services/hll-people" },
  ],
});
