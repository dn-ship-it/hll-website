import { aboutPage } from "@/data/about";
import { HomeCta } from "@/components/marketing/home/sections-bottom";
import { MarketingShell } from "@/components/marketing/marketing-shell";
import { AboutBreadcrumb } from "./about-chrome";
import { AboutClientsSection } from "./about-clients";
import { AboutHero } from "./about-hero";
import { AboutLabSection, AboutPromiseSection } from "./about-promise-lab";
import { AboutProcessSection } from "./about-process";
import { AboutStorySection } from "./about-story";
import { AboutTeamSection } from "./about-team";
import { AboutValuesSection } from "./about-values";

export function AboutPage() {
  const data = aboutPage;

  return (
    <MarketingShell>
      <div className="space-y-4 px-[clamp(1.25rem,4vw,3rem)] pt-6">
        <div className="mx-auto max-w-[90rem]">
          <AboutBreadcrumb items={data.breadcrumb} />
        </div>
      </div>

      <AboutHero data={data.hero} accentColor={data.accentColor} />
      <AboutStorySection data={data.story} accentColor={data.accentColor} />
      <AboutValuesSection data={data.values} accentColor={data.accentColor} />
      <AboutProcessSection data={data.process} accentColor={data.accentColor} />
      <AboutTeamSection data={data.team} />
      <AboutClientsSection data={data.clients} accentColor={data.accentColor} />
      <AboutPromiseSection data={data.promise} />
      <AboutLabSection data={data.lab} />
      <HomeCta />
    </MarketingShell>
  );
}
