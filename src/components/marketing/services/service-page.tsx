import { MarketingShell } from "@/components/marketing/marketing-shell";
import type { ServicePageData } from "@/data/services/types";
import {
  defaultFoundationDemo,
  normalizeServiceDemoConfig,
  resolveServiceDemoConfig,
} from "@/lib/payload/service-demo";
import { mapServiceToPage } from "@/lib/payload/marketing-mappers";
import { getServiceBySlug } from "@/lib/payload/queries";
import { loadEngagements, withRelatedStills } from "@/lib/payload/engagements";
import type { ServiceDemoConfig } from "@/types/service-demo";
import { CapabilitiesSection } from "./capabilities-section";
import {
  ExpertVoiceSection,
  RelatedServicesSection,
} from "./expert-and-related";
import { EngagementSection } from "./engagement-section";
import { OutcomeSection } from "./outcome-section";
import { ServiceBrandHeader } from "./service-chrome";
import { ServiceHero } from "./service-hero";
import { getServiceTheme } from "./service-theme";
import { RevealRoot } from "@/components/hll/reveal/reveal-root";

async function loadServicePage(fallback: ServicePageData) {
  try {
    const service = await getServiceBySlug(fallback.slug);
    const mapped = mapServiceToPage(service, fallback);
    const engagements = await loadEngagements();
    const data = {
      ...mapped,
      engagement: { ...mapped.engagement, cards: withRelatedStills(mapped.engagement.cards, engagements) },
    };
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
        {/* Figma Services mobile: the brand row 8px under the nav, at x 16. */}
        <div className="pl-4 pr-5 pt-2 lg:px-[clamp(1.25rem,calc(1.98*var(--vw)),1.875rem)] lg:pt-[18px]">
          <ServiceBrandHeader brand={data.brand} variant={data.variant} />
        </div>

        {/* House of Katha's reveal animations (5 Nov), in place of the
            fade-up. The hero's demo window and the quote carousel change
            their own text, so they opt out. */}
        <RevealRoot skip=".hll-display, .hll-label">
          <ServiceHero
            data={data.hero}
            demo={demo}
            variant={data.variant}
            capabilities={data.capabilities.items.map((item) => ({ id: item.id, label: item.title }))}
          />
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
            more={data.moreExpertVoices}
            breadcrumb={data.breadcrumb}
            variant={data.variant}
          />
          <RelatedServicesSection items={data.relatedServices} />
        </RevealRoot>
      </div>
    </MarketingShell>
  );
}
