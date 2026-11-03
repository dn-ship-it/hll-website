import { MarketingShell } from "@/components/marketing/marketing-shell";
import { mapServiceToPage } from "@/lib/payload/marketing-mappers";
import { getMarketingContent, getServiceBySlug } from "@/lib/payload/queries";
import { SERVICE_LABELS } from "@/data/engagements";
import { getServicePageByVariant } from "@/data/services";
import { cleanServiceName, serviceHref } from "@/components/hll/variants";

import { AllCapabilities, type CapabilityService } from "./all-capabilities";
import { ServiceReveal } from "./service-reveal";

// The bundled AI and Ontology pages still carry the template's (Foundation's)
// capability list; without the CMS their sub-services stay hidden.
const PLACEHOLDER_CAPABILITIES = new Set(["hll-ai", "hll-ontology"]);

/** A capability's headline and sub-services as its own page shows them: the
 *  CMS page over the bundled one, the same mapping the page uses, so the
 *  wheel's tags always match the page (Hannan, 3 Nov). */
async function pageCapabilities(variant: string) {
  const page = getServicePageByVariant(variant);
  if (!page) return null;
  try {
    const service = await getServiceBySlug(page.slug);
    if (service) {
      const data = mapServiceToPage(service, page);
      return { headline: data.hero.headline, subServices: data.capabilities.items.map((item) => item.title) };
    }
  } catch {
    // the bundled page below
  }
  return {
    headline: page.hero.headline,
    subServices: PLACEHOLDER_CAPABILITIES.has(variant) ? [] : page.capabilities.items.map((item) => item.title),
  };
}

async function serviceEntry(id: keyof typeof SERVICE_LABELS): Promise<CapabilityService> {
  const page = await pageCapabilities(id);
  return {
    id,
    name: SERVICE_LABELS[id],
    href: serviceHref(id),
    description: page?.headline ?? "",
    subServices: page?.subServices ?? [],
  };
}

/** The wheel from the CMS (Marketing content › All Capabilities wheel), if set. */
async function loadCmsWheel(): Promise<{ wheel: CapabilityService[]; start?: number } | null> {
  try {
    const cms = (await getMarketingContent())?.allCapabilities;
    const items = cms?.items ?? [];
    if (!items.length) return null;
    // A capability with a page of its own takes its sub-services from it;
    // the wheel's own list is only for one without.
    const pages = await Promise.all(items.map((item) => pageCapabilities(item.tile)));
    return {
      wheel: items.map((item, i) => ({
        id: `${item.tile}-${i}`,
        tile: item.tile,
        name: cleanServiceName(item.name),
        href: item.href || null,
        description: item.description ?? "",
        subServices: pages[i]?.subServices ?? item.subServices?.map((sub) => sub.label) ?? [],
      })),
      start: cms?.startIndex ? Math.min(items.length, cms.startIndex) - 1 : undefined,
    };
  } catch {
    return null;
  }
}

/** The wheel's services and the one in focus at first: the CMS list if set,
 *  else the Figma wheel, top to bottom (Application in focus). Also the Home
 *  Capabilities section (Hannan, 2 Nov). */
export async function getCapabilitiesWheel(): Promise<{ services: CapabilityService[]; startIndex: number }> {
  const cms = await loadCmsWheel();
  if (cms) return { services: cms.wheel, startIndex: cms.start ?? Math.min(3, cms.wheel.length - 1) };
  const entry = (id: string) => serviceEntry(id as keyof typeof SERVICE_LABELS);
  const services = await Promise.all(
    [
      "hll-foundation",
      "hll-cloud",
      "hll-ai",
      "hll-application",
      "hll-trust",
      "hll-people",
      "hll-ontology",
    ].map(entry),
  );
  return { services, startIndex: 3 };
}

/** Figma Capabilities › All Capabilities (2562:5155), the /services overview. */
export async function AllCapabilitiesPage() {
  const { services, startIndex } = await getCapabilitiesWheel();

  return (
    <MarketingShell>
      <ServiceReveal>
        <div className="hll-home hll-service-page">
          <AllCapabilities services={services} startIndex={startIndex} />
        </div>
      </ServiceReveal>
    </MarketingShell>
  );
}
