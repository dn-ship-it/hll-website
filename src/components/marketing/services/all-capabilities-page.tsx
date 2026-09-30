import { MarketingShell } from "@/components/marketing/marketing-shell";
import { SERVICE_LABELS } from "@/data/engagements";
import { SERVICE_PAGES } from "@/data/services";

import { AllCapabilities, type CapabilityService } from "./all-capabilities";
import { ServiceReveal } from "./service-reveal";

// PLACEHOLDER — HLL Cloud has a tile in the Figma frame but no page or copy
// yet; it shows Figma's stand-in text and isn't linked.
const HLL_CLOUD: CapabilityService = {
  id: "hll-cloud",
  name: "HLL Cloud",
  href: null,
  description:
    "Senior talent deployed across the stack with a knowledge graph window showing what customers see. Momentum is the money-maker.",
  subServices: [],
};

// AI and Ontology still carry the template's (Foundation's) capability list
// as placeholder; their sub-services stay hidden until real ones are written.
const PLACEHOLDER_CAPABILITIES = new Set(["hll-ai", "hll-ontology"]);

function serviceEntry(id: keyof typeof SERVICE_LABELS): CapabilityService {
  const page = SERVICE_PAGES[id];
  return {
    id,
    name: SERVICE_LABELS[id],
    href: `/services/${id}`,
    description: page?.hero.headline ?? "",
    subServices: PLACEHOLDER_CAPABILITIES.has(id) ? [] : (page?.capabilities.items.map((item) => item.title) ?? []),
  };
}

/** Figma Capabilities › All Capabilities (2562:5155), the /services overview. */
export function AllCapabilitiesPage() {
  const entry = (id: string) =>
    id === "hll-cloud"
      ? HLL_CLOUD
      : serviceEntry(id as keyof typeof SERVICE_LABELS);
  // Figma wheel, top to bottom (Application in focus), and the card grid order.
  const wheel = [
    "hll-foundation",
    "hll-cloud",
    "hll-ai",
    "hll-application",
    "hll-trust",
    "hll-people",
    "hll-ontology",
  ].map(entry);
  const cards = [
    "hll-application",
    "hll-trust",
    "hll-ai",
    "hll-ontology",
    "hll-people",
    "hll-foundation",
    "hll-cloud",
  ].map(entry);

  return (
    <MarketingShell>
      <ServiceReveal>
        <div className="hll-home hll-service-page">
          <AllCapabilities services={wheel} cards={cards} startIndex={3} />
        </div>
      </ServiceReveal>
    </MarketingShell>
  );
}
