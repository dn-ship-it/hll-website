import { figmaTemplateService } from "./figma-template";

// Headline from the home page's service list; the rest is the Figma template
// placeholder (see figma-template.ts) until the HLL AI copy is written.
export const hllAi = figmaTemplateService({
  slug: "hll-ai",
  variant: "hll-ai",
  brand: "HLL AI",
  headline: "Applied AI built to move from experimentation into real work",
  relatedServices: [
    { label: "HLL Foundation", href: "/services/hll-foundation" },
    { label: "HLL Trust & Governance", href: "/services/hll-trust" },
    { label: "HLL Application", href: "/services/hll-application" },
    { label: "HLL People & Policy", href: "/services/hll-people" },
    { label: "HLL Ontology", href: "/services/hll-ontology" },
  ],
});
