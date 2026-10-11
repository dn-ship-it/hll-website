import type { IndustryPageData } from "@/types/industry";
import { MarketingShell } from "@/components/marketing/marketing-shell";
import { HomeHeading } from "@/components/marketing/home/primitives";
import {
  RelatedServicesSection,
  VoiceSection,
} from "@/components/marketing/services/expert-and-related";
import { mapIndustryPage } from "@/lib/payload/marketing-mappers";
import { getIndustryBySlug, getMarketingContent } from "@/lib/payload/queries";

import { IndustryCapabilitiesSection } from "./industry-capabilities";
import { INDUSTRY_LINKS, IndustryHero } from "./industry-hero";
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

/** The switcher's industries: the linked ones from the CMS Industries menu,
 *  or the four industry pages until that menu is set. */
async function loadSwitcherLinks() {
  try {
    const groups = (await getMarketingContent())?.industryMenu ?? [];
    const links = groups.flatMap((group) =>
      (group.items ?? []).flatMap((item) => (item.href ? [{ label: item.label, href: item.href }] : [])),
    );
    return links.length ? links : INDUSTRY_LINKS;
  } catch {
    return INDUSTRY_LINKS;
  }
}

export async function IndustryPage({ content }: { content: IndustryPageData }) {
  const [data, switcherLinks] = await Promise.all([loadIndustry(content), loadSwitcherLinks()]);
  const accent = getIndustryAccent(data.hero.title, data.accentColor);
  const voice = data.clientVoice;

  return (
    <MarketingShell markTint={accent}>
      <div className="hll-service-page">
        <IndustryHero
          data={data.hero}
          category={data.category}
          accentColor={accent}
          switcherLinks={switcherLinks}
        />
        <IndustryCapabilitiesSection
          data={data.capabilities}
          accentColor={accent}
        />
        <VoiceSection
          slides={[
            { quote: voice.quote, name: voice.name, role: voice.role, company: voice.company },
            ...(voice.more ?? []),
          ]}
          timerColor={accent}
          wide
          headingInset
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
