import { teamPageContent } from "@/data/team-page";
import { MarketingShell } from "@/components/marketing/marketing-shell";
import { mapTeamMembers, mapTeamPageContent } from "@/lib/payload/marketing-mappers";
import { getMarketingContent, getTeamMembers } from "@/lib/payload/queries";
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
      <div className="hll-team-page bg-[#fafafa] text-[#1a1a1a]">
        <TeamHero data={content.hero} />
        <TeamGridSection members={members} />
        <TeamJoinSection data={content.join} />
      </div>
    </MarketingShell>
  );
}
