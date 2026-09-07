import { healthcareIndustry } from "@/data/industries/healthcare";
import { HomeCta } from "@/components/marketing/home/sections-bottom";
import { MarketingShell } from "@/components/marketing/marketing-shell";
import { ClientVoiceSection } from "./client-voice-section";
import { IndustryCapabilitiesSection } from "./industry-capabilities";
import {
  IndustryBreadcrumb,
  IndustryCategoryHeader,
} from "./industry-chrome";
import { IndustryHero } from "./industry-hero";
import { IndustryLabSection } from "./industry-lab-section";
import { NamedExpertsSection } from "./named-experts-section";
import { RelatedIndustriesSection } from "./related-industries-section";

export function HealthcareIndustryPage() {
  const data = healthcareIndustry;

  return (
    <MarketingShell>
      <div className="space-y-4 px-[clamp(1.25rem,4vw,3rem)] pt-6">
        <div className="mx-auto max-w-[90rem] space-y-4">
          <IndustryBreadcrumb items={data.breadcrumb} />
          <IndustryCategoryHeader category={data.category} />
        </div>
      </div>

      <IndustryHero data={data.hero} accentColor={data.accentColor} />
      <IndustryCapabilitiesSection
        data={data.capabilities}
        accentColor={data.accentColor}
      />
      <ClientVoiceSection data={data.clientVoice} accentColor={data.accentColor} />
      <NamedExpertsSection data={data.experts} />
      <IndustryLabSection data={data.lab} />
      <RelatedIndustriesSection items={data.relatedIndustries} />
      <HomeCta />
    </MarketingShell>
  );
}
