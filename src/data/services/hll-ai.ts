import { figmaTemplateService } from "./figma-template";

// Headline from the home page's service list; the rest is placeholder copy (see figma-template.ts).
export const hllAi = figmaTemplateService({
  slug: "ai",
  variant: "hll-ai",
  brand: "AI",
  headline: "Applied AI built to move from experimentation into real work",
  relatedServices: [
    { label: "Data & Analytics", href: "/services/data-analytics" },
    { label: "Trust & Governance", href: "/services/trust-governance" },
    { label: "Applications", href: "/services/applications" },
    { label: "People & Policy", href: "/services/people-policy" },
    { label: "Ontology", href: "/services/ontology" },
  ],
});
