import { MarketingShell } from "@/components/marketing/marketing-shell";
import { getMarketingContent } from "@/lib/payload/queries";
import { SERVICE_LABELS } from "@/data/engagements";
import { getServicePageByVariant } from "@/data/services";
import { cleanServiceName, serviceHref } from "@/components/hll/variants";

import { AllCapabilities, type CapabilityService } from "./all-capabilities";
import { ServiceReveal } from "./service-reveal";

// AI and Ontology still carry the template's (Foundation's) capability list
// as placeholder; their sub-services stay hidden until real ones are written.
const PLACEHOLDER_CAPABILITIES = new Set(["hll-ai", "hll-ontology"]);

function serviceEntry(id: keyof typeof SERVICE_LABELS): CapabilityService {
  const page = getServicePageByVariant(id);
  return {
    id,
    name: SERVICE_LABELS[id],
    href: serviceHref(id),
    description: page?.hero.headline ?? "",
    subServices: PLACEHOLDER_CAPABILITIES.has(id) ? [] : (page?.capabilities.items.map((item) => item.title) ?? []),
  };
}

/** The wheel from the CMS (Marketing content › All Capabilities wheel), if set. */
async function loadCmsWheel(): Promise<{ wheel: CapabilityService[]; start?: number } | null> {
  try {
    const cms = (await getMarketingContent())?.allCapabilities;
    const items = cms?.items ?? [];
    if (!items.length) return null;
    return {
      wheel: items.map((item, i) => ({
        id: `${item.tile}-${i}`,
        tile: item.tile,
        name: cleanServiceName(item.name),
        href: item.href || null,
        description: item.description ?? "",
        subServices: item.subServices?.map((sub) => sub.label) ?? [],
      })),
      start: cms?.startIndex ? Math.min(items.length, cms.startIndex) - 1 : undefined,
    };
  } catch {
    return null;
  }
}

/** Figma Capabilities › All Capabilities (2562:5155), the /services overview. */
export async function AllCapabilitiesPage() {
  const cms = await loadCmsWheel();
  const entry = (id: string) => serviceEntry(id as keyof typeof SERVICE_LABELS);
  // Figma wheel, top to bottom (Application in focus).
  const wheel = [
    "hll-foundation",
    "hll-cloud",
    "hll-ai",
    "hll-application",
    "hll-trust",
    "hll-people",
    "hll-ontology",
  ].map(entry);

  return (
    <MarketingShell>
      <ServiceReveal>
        <div className="hll-home hll-service-page">
          <AllCapabilities
            services={cms?.wheel ?? wheel}
            startIndex={cms ? (cms.start ?? Math.min(3, cms.wheel.length - 1)) : 3}
          />
        </div>
      </ServiceReveal>
    </MarketingShell>
  );
}
