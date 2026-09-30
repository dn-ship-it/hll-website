import type { IndustryPageData } from "@/types/industry";
import { MarketingShell } from "@/components/marketing/marketing-shell";
import { HomeHeading } from "@/components/marketing/home/primitives";
import {
  RelatedServicesSection,
  VoiceSection,
} from "@/components/marketing/services/expert-and-related";
import { mapIndustryPage } from "@/lib/payload/marketing-mappers";
import { getIndustryBySlug } from "@/lib/payload/queries";

import { IndustryCapabilitiesSection } from "./industry-capabilities";
import { IndustryHero } from "./industry-hero";
import { IndustryLabSection } from "./industry-lab-section";
import { getIndustryAccent } from "./industry-theme";
import { NamedExpertsSection } from "./named-experts-section";

async function loadIndustry(fallback: IndustryPageData) {
  try {
    const industry = await getIndustryBySlug(fallback.slug);
    return mapIndustryPage(industry, fallback);
  } catch {
    return fallback;
  }
}

export async function IndustryPage({ content }: { content: IndustryPageData }) {
  const data = await loadIndustry(content);
  const accent = getIndustryAccent(data.hero.title, data.accentColor);
  const voice = data.clientVoice;

  return (
    <MarketingShell markTint={accent}>
      <div className="hll-service-page">
        <IndustryHero
          data={data.hero}
          category={data.category}
          accentColor={accent}
        />
        <IndustryCapabilitiesSection
          data={data.capabilities}
          accentColor={accent}
        />
        <VoiceSection
          data={{
            quote: voice.quote,
            name: voice.name,
            role: voice.role,
            company: voice.company,
          }}
          slideCount={voice.slideCount}
          timerColor={accent}
          heading={<HomeHeading eyebrow={voice.eyebrow} title="Client Voice" />}
        />
        <NamedExpertsSection data={data.experts} accentColor={accent} />
        <IndustryLabSection data={data.lab} />
        <RelatedServicesSection
          title="Related Industries"
          items={data.relatedIndustries}
          washFrom={accent}
        />
      </div>
    </MarketingShell>
  );
}
