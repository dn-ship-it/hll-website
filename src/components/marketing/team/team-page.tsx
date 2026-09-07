import { teamPageContent } from "@/data/team-page";
import { HomeCta } from "@/components/marketing/home/sections-bottom";
import { MarketingShell } from "@/components/marketing/marketing-shell";
import { TeamBreadcrumb } from "./team-chrome";
import { TeamGridSection } from "./team-grid";
import { TeamHero } from "./team-hero";
import { TeamJoinSection } from "./team-join";

export function TeamPage() {
  const content = teamPageContent;

  return (
    <MarketingShell>
      <div className="space-y-4 px-[clamp(1.25rem,4vw,3rem)] pt-6">
        <div className="mx-auto max-w-[90rem]">
          <TeamBreadcrumb items={content.breadcrumb} />
        </div>
      </div>

      <TeamHero data={content.hero} accentColor={content.accentColor} />
      <TeamGridSection
        content={content.grid}
        members={[...content.members]}
        accentColor={content.accentColor}
      />
      <TeamJoinSection data={content.join} />
      <HomeCta />
    </MarketingShell>
  );
}
