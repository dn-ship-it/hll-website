import type { TeamPageContent } from "@/data/team-page";

export function TeamHero({ data }: { data: TeamPageContent["hero"] }) {
  return (
    <section className="hll-team-hero px-[30px] pb-[clamp(8rem,12vw,9.5rem)] pt-[clamp(13rem,23.2vw,22rem)]">
      <div className="grid items-start gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-8">
        <h1 className="hll-team-display font-light text-[clamp(2rem,4.25vw,4rem)] leading-[1.16] text-[#1a1a1a]">
          Team
        </h1>
        <p className="hll-team-display pt-1 text-[clamp(1.25rem,2.4vw,2.25rem)] leading-[1.1] text-[#1a1a1a] md:pt-5">
          {data.description}
        </p>
      </div>
      <div
        aria-hidden="true"
        className="mt-8 aspect-[1.478/1] w-full rounded-lg md:mt-[38px]"
        style={{ backgroundColor: "#d9d9d9" }}
      />
    </section>
  );
}
