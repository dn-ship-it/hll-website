import { aboutPage } from "@/data/about";
import { teamPageContent, type TeamMember } from "@/data/team-page";
import { AboutCareersSection } from "@/components/marketing/about/about-sections";
import { HomeHeading } from "@/components/marketing/home/primitives";
import { MarketingShell } from "@/components/marketing/marketing-shell";
import { PageHero } from "@/components/marketing/page-hero";
import { SERVICE_GUTTER } from "@/components/marketing/services/service-chrome";
import {
  mapTeamMembers,
  mapTeamPageContent,
} from "@/lib/payload/marketing-mappers";
import { getMarketingContent, getTeamMembers } from "@/lib/payload/queries";

import { TeamAccordion } from "./team-accordion";

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

/** Figma person card: 490px square photo, 36px name, Functional role, body. */
function PersonCard({ person }: { person: TeamMember }) {
  return (
    <article>
      <div
        className="aspect-square w-full rounded-lg bg-[#D9D9D9]"
        style={
          person.photoUrl
            ? { background: `#D9D9D9 url(${person.photoUrl}) center / cover` }
            : undefined
        }
      />
      <h3 className="mt-2 text-[24px] font-normal leading-[1.16] text-black lg:text-[clamp(1.75rem,calc(2.38*var(--vw)),2.25rem)]">
        {person.name}
      </h3>
      <p
        className="hll-label mt-[2px] text-[10px] uppercase leading-[1.2] text-[var(--hll-dark-grey)] lg:text-[12px]"
        style={{ fontFamily: "var(--hll-font-functional)" }}
      >
        {person.role}
      </p>
      {person.bio ? (
        <p className="mt-3 max-w-[470px] text-[14px] leading-[1.25] text-[var(--hll-dark-grey)] lg:text-[clamp(1rem,calc(1.32*var(--vw)),1.25rem)]">
          {person.bio}
        </p>
      ) : null}
    </article>
  );
}

/** Figma Desktop › Team (1098:5219). */
export async function TeamPage() {
  const { content, members } = await loadTeamPage();
  // The founder is the first featured leader; everyone else is in the grid.
  const founder =
    members.find((m) => m.featured && m.department === "leadership") ??
    members[0];
  const others = members.filter((m) => m !== founder);

  return (
    <MarketingShell>
      <div className="hll-home hll-service-page">
        <PageHero
          title={content.hero.headline}
          lead={content.hero.description}
        />

        {founder ? (
          <section className={`pt-[84px] lg:pb-[154px] lg:pt-[154px] ${SERVICE_GUTTER}`}>
            <HomeHeading eyebrow="Team" title="Founder" />
            {/* Mobile: the card runs to 8px from the edges. */}
            <div className="-mx-3 mt-8 lg:mx-0 lg:ml-[33.1%] lg:mt-[84px] lg:w-[33.75%]">
              <PersonCard person={founder} />
            </div>
          </section>
        ) : null}

        {/* Figma Team mobile has no hairline between Founder and Leadership. */}
        <div data-line className="hidden h-px w-[98.6%] bg-[var(--hll-mid-grey)] lg:block" />
        <section className="pb-[84px] pt-[84px] lg:pb-[154px]">
          <div className={`flex items-end gap-[17px] ${SERVICE_GUTTER}`}>
            <HomeHeading eyebrow="Team" title="Leadership" />
            <span
              className="hll-label mb-[15px] hidden text-[12px] leading-[1.2] text-[var(--hll-dark-grey)] lg:inline"
              style={{ fontFamily: "var(--hll-font-functional)" }}
            >
              {others.length}
            </span>
          </div>
          <div className="mt-8 lg:hidden">
            <TeamAccordion people={others} />
          </div>
          <div className="mt-[84px] hidden grid-cols-3 gap-x-[10px] gap-y-[48px] px-[10px] lg:grid">
            {others.map((person) => (
              <PersonCard key={person.id} person={person} />
            ))}
          </div>
        </section>

        <div data-line className="mx-2 h-px bg-[var(--hll-mid-grey)] lg:mx-0 lg:w-[98.6%]" />
        <AboutCareersSection data={aboutPage.careers} className="pt-[84px]" />
      </div>
    </MarketingShell>
  );
}
