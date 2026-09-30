import { HowWeWork } from "@/components/marketing/home/sections-bottom";
import { MarketingShell } from "@/components/marketing/marketing-shell";
import { aboutPage } from "@/data/about";
import { mapAboutPage } from "@/lib/payload/marketing-mappers";
import { getMarketingContent } from "@/lib/payload/queries";

import { AboutHero } from "./about-hero";
import { AboutCareersSection, AboutLeaderSection, AboutReachSection } from "./about-sections";
import { AboutValuesSection } from "./about-values";

async function loadAboutData() {
  try {
    const marketing = await getMarketingContent();
    return mapAboutPage(marketing, aboutPage);
  } catch {
    return aboutPage;
  }
}

/** Figma Desktop › About_02 (About_01 differs only in the hero collage). */
export async function AboutPage() {
  const data = await loadAboutData();

  return (
    <MarketingShell>
      <div className="hll-home hll-service-page">
        <AboutHero data={data.hero} />
        <AboutValuesSection data={data.values} />
        <AboutLeaderSection data={data.leader} />
        <div className="pt-[214px]">
          <HowWeWork />
        </div>
        <AboutReachSection data={data.reach} />
        <AboutCareersSection data={data.careers} />
      </div>
    </MarketingShell>
  );
}
