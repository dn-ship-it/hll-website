import type { IndustryPageData } from "@/types/industry";
import { RevealRoot } from "@/components/hll/reveal/reveal-root";
import { MarketingShell } from "@/components/marketing/marketing-shell";
import { HomeHeading } from "@/components/marketing/home/primitives";
import {
  RelatedServicesSection,
  VoiceSection,
} from "@/components/marketing/services/expert-and-related";
import { mapIndustryMenu, mapIndustryPage } from "@/lib/payload/marketing-mappers";
import { getIndustryBySlug, getMarketingContent } from "@/lib/payload/queries";
import { loadEngagements, withRelatedStills } from "@/lib/payload/engagements";

import { IndustryCapabilitiesSection } from "./industry-capabilities";
import { IndustryHero } from "./industry-hero";
import { IndustryLabSection } from "./industry-lab-section";
import { getIndustryAccent } from "./industry-theme";
import { NamedExpertsSection } from "./named-experts-section";

async function loadIndustry(fallback: IndustryPageData) {
  try {
    const industry = await getIndustryBySlug(fallback.slug);
    const data = mapIndustryPage(industry, fallback);
    const engagements = await loadEngagements();
    return {
      ...data,
      capabilities: {
        ...data.capabilities,
        items: data.capabilities.items.map((item) => ({
          ...item,
          cards: withRelatedStills(item.cards, engagements),
        })),
      },
    };
  } catch {
    return fallback;
  }
}

const PLACEHOLDER_NAMES = new Set(["john doe", "jane doe"]);

export async function IndustryPage({ content }: { content: IndustryPageData }) {
  const data = await loadIndustry(content);
  const accent = getIndustryAccent(data.hero.title, data.accentColor);
  const voice = data.clientVoice;
  // Only real quotes: the design's "John Doe" placeholder (the code default, and Healthcare's CMS copy) stays hidden
  // until a client quote is entered.
  const slides = [
    {
      quote: voice.quote,
      name: voice.name,
      role: voice.role,
      company: voice.company,
      companyLogo: voice.companyLogo,
      portrait: voice.portrait,
    },
    ...(voice.more ?? []),
  ].filter((slide) => slide.quote?.trim() && !PLACEHOLDER_NAMES.has((slide.name ?? "").trim().toLowerCase()));

  return (
    <MarketingShell markTint={accent}>
      <RevealRoot skip=".hll-display, .hll-label">
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
        {slides.length ? (
          <VoiceSection
            slides={slides}
            timerColor={accent}
            wide
            headingInset
            heading={<HomeHeading eyebrow={voice.eyebrow} title="Client Voice" />}
          />
        ) : null}
        <NamedExpertsSection data={data.experts} accentColor={accent} />
        <IndustryLabSection data={data.lab} />
        <RelatedServicesSection title="Related Industries" items={data.relatedIndustries} />
      </div>
      </RevealRoot>
    </MarketingShell>
  );
}
