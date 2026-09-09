import { GradientRevealTextSlow } from "@/components/hll";
import type { TeamPageContent } from "@/data/team-page";

import { TeamSectionLabel } from "./team-chrome";

export function TeamHero({
  data,
  accentColor,
}: {
  data: TeamPageContent["hero"];
  accentColor: string;
}) {
  return (
    <section className="px-[clamp(1.25rem,4vw,3rem)] pb-[clamp(1.5rem,4vw,2.5rem)]">
      <div className="mx-auto max-w-[90rem]">
        <TeamSectionLabel title={data.eyebrow} accentColor={accentColor} />

        <GradientRevealTextSlow
          as="h1"
          text={data.headline}
          variant="about"
          className="mt-4 block max-w-[min(100%,48rem)] tracking-tight text-black"
          fontSize="clamp(2rem, 4vw + 0.5rem, 3.25rem)"
          letterSpacing="-0.01em"
        />

        <p className="mt-6 max-w-2xl text-sm leading-7 text-black/55">{data.description}</p>
      </div>
    </section>
  );
}
