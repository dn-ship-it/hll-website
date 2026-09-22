import { hllFoundation } from "./hll-foundation";
import { hllGovernanceTrust } from "./hll-governance-trust";
import { hllKinetic } from "./hll-kinetic";
import { hllMomentum } from "./hll-momentum";
import type { ServicePageData } from "./types";

export const SERVICE_PAGES: Record<string, ServicePageData> = {
  [hllFoundation.slug]: hllFoundation,
  [hllMomentum.slug]: hllMomentum,
  [hllKinetic.slug]: hllKinetic,
  [hllGovernanceTrust.slug]: hllGovernanceTrust,
};

export function getServicePage(slug: string): ServicePageData | null {
  return SERVICE_PAGES[slug] ?? null;
}

export { hllFoundation, hllGovernanceTrust, hllKinetic, hllMomentum };
export type { ServicePageData };
