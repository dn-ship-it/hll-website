import { hllAi } from "./hll-ai";
import { hllFoundation } from "./hll-foundation";
import { hllGovernanceTrust } from "./hll-governance-trust";
import { hllKinetic } from "./hll-kinetic";
import { hllMomentum } from "./hll-momentum";
import { hllOntology } from "./hll-ontology";
import type { ServicePageData } from "./types";

export const SERVICE_PAGES: Record<string, ServicePageData> = {
  [hllFoundation.slug]: hllFoundation,
  [hllMomentum.slug]: hllMomentum,
  [hllKinetic.slug]: hllKinetic,
  [hllGovernanceTrust.slug]: hllGovernanceTrust,
  [hllAi.slug]: hllAi,
  [hllOntology.slug]: hllOntology,
};

export function getServicePage(slug: string): ServicePageData | null {
  return SERVICE_PAGES[slug] ?? null;
}

export { hllAi, hllFoundation, hllGovernanceTrust, hllKinetic, hllMomentum, hllOntology };
export type { ServicePageData };
