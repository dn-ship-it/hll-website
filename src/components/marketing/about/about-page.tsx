import { HowWeWork } from "@/components/marketing/home/sections-bottom";
import { MarketingShell } from "@/components/marketing/marketing-shell";
import { aboutPage } from "@/data/about";
import { homePageContent } from "@/data/home";
import { mapAboutPage, mapHomePage } from "@/lib/payload/marketing-mappers";
import { getMarketingContent } from "@/lib/payload/queries";

import { AboutHero } from "./about-hero";
import { AboutCareersSection, AboutLeaderSection, AboutReachSection } from "./about-sections";
import { AboutValuesSection } from "./about-values";

async function loadAboutData() {
  try {
    const marketing = await getMarketingContent();
    return {
      data: mapAboutPage(marketing, aboutPage),
      howWeWork: mapHomePage(marketing).howWeWork,
    };
  } catch {
    return { data: aboutPage, howWeWork: homePageContent.howWeWork };
  }
}

/** Figma Desktop › About_02 (About_01 differs only in the hero collage). */
export async function AboutPage() {
  const { data, howWeWork } = await loadAboutData();

  return (
    <MarketingShell>
      <div className="hll-home hll-service-page">
        <AboutHero data={data.hero} />
        <AboutValuesSection data={data.values} />
        <AboutLeaderSection data={data.leader} />
        <div className="pt-[84px] lg:pt-[214px]">
          <HowWeWork data={howWeWork} dividerClassName="mb-[84px]" />
        </div>
        <AboutReachSection data={data.reach} />
        <AboutCareersSection data={data.careers} />
      </div>
    </MarketingShell>
  );
}
