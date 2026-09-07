import { teamPageContent } from "@/data/team-page";
import { HomeCta } from "@/components/marketing/home/sections-bottom";
import { MarketingShell } from "@/components/marketing/marketing-shell";
import { mapTeamMembers, mapTeamPageContent } from "@/lib/payload/marketing-mappers";
import { getMarketingContent, getTeamMembers } from "@/lib/payload/queries";
import { TeamBreadcrumb } from "./team-chrome";
import { TeamGridSection } from "./team-grid";
import { TeamHero } from "./team-hero";
import { TeamJoinSection } from "./team-join";

async function loadTeamPage() {
  try {
    const [marketing, cmsMembers] = await Promise.all([
      getMarketingContent(),
      getTeamMembers(),
    ]);

    const content = mapTeamPageContent(marketing, teamPageContent);
    const members =
      cmsMembers.length > 0
        ? mapTeamMembers(cmsMembers)
        : [...teamPageContent.members];

    return { content, members };
  } catch {
    return { content: teamPageContent, members: [...teamPageContent.members] };
  }
}

export async function TeamPage() {
  const { content, members } = await loadTeamPage();

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
        members={members}
        accentColor={content.accentColor}
      />
      <TeamJoinSection data={content.join} />
      <HomeCta />
    </MarketingShell>
  );
}
