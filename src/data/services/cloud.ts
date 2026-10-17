import { figmaTemplateService } from "./figma-template";

// Cloud arrived with the 17 Oct content handoff. Its copy comes from the CMS
// (imported from the handoff); this is only the template it falls back on.
export const cloud = figmaTemplateService({
  slug: "cloud",
  variant: "hll-cloud",
  brand: "Cloud",
  headline: "Cloud platforms that stay secure, cost-aware and easy to run",
  relatedServices: [
    { label: "Data & Analytics", href: "/services/data-analytics" },
    { label: "Applications", href: "/services/applications" },
    { label: "Trust & Governance", href: "/services/trust-governance" },
    { label: "AI", href: "/services/ai" },
  ],
});
