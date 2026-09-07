import { hllFoundation } from "@/data/services/hll-foundation";
import { HomeCta } from "@/components/marketing/home/sections-bottom";
import { MarketingShell } from "@/components/marketing/marketing-shell";
import { CapabilitiesSection } from "./capabilities-section";
import {
  ExpertVoiceSection,
  RelatedServicesSection,
} from "./expert-and-related";
import { EngagementSection } from "./engagement-section";
import { OutcomeSection } from "./outcome-section";
import { ServiceBrandHeader, ServiceBreadcrumb } from "./service-chrome";
import { ServiceHero } from "./service-hero";

export function HLLFoundationPage() {
  const data = hllFoundation;

  return (
    <MarketingShell>
      <div className="px-[clamp(1.25rem,4vw,3rem)] pt-6">
        <div className="mx-auto max-w-[90rem] space-y-4">
          <ServiceBreadcrumb items={data.breadcrumb} />
          <ServiceBrandHeader brand={data.brand} />
        </div>
      </div>

      <ServiceHero data={data.hero} />
      <CapabilitiesSection data={data.capabilities} />
      <OutcomeSection data={data.outcomes} />
      <EngagementSection data={data.engagement} />
      <ExpertVoiceSection data={data.expertVoice} />
      <RelatedServicesSection items={data.relatedServices} />
      <HomeCta />
    </MarketingShell>
  );
}
