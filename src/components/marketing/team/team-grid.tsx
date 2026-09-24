import type { TeamMember } from "@/data/team-page";
import { CmsImage } from "@/components/marketing/cms-image";

function ProfileCard({ member, founder = false }: { member: TeamMember; founder?: boolean }) {
  const photo = (
    <>
      {member.photoUrl ? (
        <CmsImage
          src={member.photoUrl}
          alt={member.name}
          className={`aspect-square w-full rounded-lg ${founder ? "max-w-[490px]" : ""}`}
        />
      ) : (
        <div aria-hidden="true" className="aspect-square w-full rounded-lg bg-[#d9d9d9]" />
      )}
      <p className="hll-team-name mt-2">
        {member.name}
      </p>
      <p className="hll-team-label mt-1 text-[12px] uppercase leading-[1.2] text-[#1a1a1a]">
        {member.role}
      </p>
      {member.bio ? (
        <p className="hll-team-display mt-3 text-[clamp(0.9375rem,1.33vw,1.25rem)] leading-[1.25] text-[#1a1a1a]">
          {member.bio}
        </p>
      ) : null}
    </>
  );

  return (
    <article className={founder ? "w-full max-w-[490px]" : "w-full"}>
      {photo}
    </article>
  );
}

export function TeamGridSection({ members }: { members: TeamMember[] }) {
  const [founder, ...leadership] = members;
  const leadershipMembers = leadership.slice(0, 6);

  return (
    <>
      {founder ? (
        <section className="hll-team-section px-[30px] pb-[13rem]">
          <p className="hll-team-label text-[12px] uppercase text-[#1a1a1a]">Team</p>
          <h2 className="hll-team-display mt-[14px] text-[clamp(2rem,4.25vw,4rem)] leading-[1.16] text-[#1a1a1a]">
            Founder
          </h2>
          <div className="mt-[84px] grid grid-cols-1 md:grid-cols-3">
            <div className="md:col-start-2 md:justify-self-center">
              <ProfileCard member={founder} founder />
            </div>
          </div>
        </section>
      ) : null}

      <section className="hll-team-section border-t border-[#d9d9d9] px-[10px] pb-[12rem] pt-[5rem]">
        <div className="px-5">
          <p className="hll-team-label text-[12px] uppercase text-[#1a1a1a]">Team</p>
          <div className="mt-[14px] flex items-baseline gap-8">
            <h2 className="hll-team-display text-[clamp(2rem,4.25vw,4rem)] leading-[1.16] text-[#1a1a1a]">
              Leadership
            </h2>
            <span className="hll-team-label text-[12px] uppercase text-[#1a1a1a]">
              {String(leadershipMembers.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        <div className="mt-[84px] grid grid-cols-1 gap-x-[10px] gap-y-[88px] sm:grid-cols-2 lg:grid-cols-3">
          {leadershipMembers.map((member) => (
            <ProfileCard key={member.id} member={member} />
          ))}
        </div>
      </section>
    </>
  );
}
