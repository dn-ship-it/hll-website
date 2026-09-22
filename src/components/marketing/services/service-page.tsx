import { HomeCta } from "@/components/marketing/home/sections-bottom";
import { MarketingShell } from "@/components/marketing/marketing-shell";
import type { ServicePageData } from "@/data/services/types";
import {
  defaultFoundationDemo,
  normalizeServiceDemoConfig,
  resolveServiceDemoConfig,
} from "@/lib/payload/service-demo";
import { mapServiceToPage } from "@/lib/payload/marketing-mappers";
import { getServiceBySlug } from "@/lib/payload/queries";
import type { ServiceDemoConfig } from "@/types/service-demo";
import { CapabilitiesSection } from "./capabilities-section";
import { ExpertVoiceSection, RelatedServicesSection } from "./expert-and-related";
import { EngagementSection } from "./engagement-section";
import { OutcomeSection } from "./outcome-section";
import { ServiceBrandHeader, ServiceBreadcrumb } from "./service-chrome";
import { ServiceHero } from "./service-hero";

async function loadServicePage(fallback: ServicePageData) {
  try {
    const service = await getServiceBySlug(fallback.slug);
    const data = mapServiceToPage(service, fallback);
    const resolved = resolveServiceDemoConfig(service);
    const demo = normalizeServiceDemoConfig(resolved ?? defaultFoundationDemo);
    return { data, demo };
  } catch {
    return {
      data: fallback,
      demo: defaultFoundationDemo as ServiceDemoConfig,
    };
  }
}

export async function ServicePage({ content }: { content: ServicePageData }) {
  const { data, demo } = await loadServicePage(content);

  return (
    <MarketingShell>
      <div className="px-[clamp(1.25rem,4vw,3rem)] pt-6">
        <div className="mx-auto max-w-[90rem] space-y-4">
          <ServiceBreadcrumb items={data.breadcrumb} />
          <ServiceBrandHeader brand={data.brand} />
        </div>
      </div>

      <ServiceHero data={data.hero} demo={demo} variant={data.variant} />
      <CapabilitiesSection data={data.capabilities} />
      <OutcomeSection data={data.outcomes} variant={data.variant} />
      <EngagementSection data={data.engagement} />
      <ExpertVoiceSection data={data.expertVoice} />
      <RelatedServicesSection items={data.relatedServices} />
      <HomeCta
        headline={data.cta.headline}
        buttonLabel={data.cta.buttonLabel}
        href={data.cta.href}
      />
    </MarketingShell>
  );
}
