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
import {
  ExpertVoiceSection,
  RelatedServicesSection,
} from "./expert-and-related";
import { EngagementSection } from "./engagement-section";
import { OutcomeSection } from "./outcome-section";
import { SERVICE_GUTTER, ServiceBrandHeader } from "./service-chrome";
import { ServiceHero } from "./service-hero";
import { getServiceTheme } from "./service-theme";
import { ServiceReveal } from "./service-reveal";

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
    <MarketingShell markTint={getServiceTheme(data.variant).accent}>
      <div className="hll-service-page">
        <div className={`pt-[18px] ${SERVICE_GUTTER}`}>
          <ServiceBrandHeader brand={data.brand} variant={data.variant} />
        </div>

        <ServiceReveal>
          <ServiceHero data={data.hero} demo={demo} variant={data.variant} />
          <CapabilitiesSection
            data={data.capabilities}
            breadcrumb={data.breadcrumb}
            variant={data.variant}
          />
          <OutcomeSection
            data={data.outcomes}
            breadcrumb={data.breadcrumb}
            variant={data.variant}
          />
          <EngagementSection
            data={data.engagement}
            breadcrumb={data.breadcrumb}
            variant={data.variant}
          />
          <ExpertVoiceSection
            data={data.expertVoice}
            breadcrumb={data.breadcrumb}
            variant={data.variant}
          />
          <RelatedServicesSection items={data.relatedServices} />
        </ServiceReveal>
      </div>
    </MarketingShell>
  );
}
