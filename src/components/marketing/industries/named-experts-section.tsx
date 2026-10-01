import { HomeHeading } from "@/components/marketing/home/primitives";
import { SERVICE_GUTTER } from "@/components/marketing/services/service-chrome";
import type { IndustryPageData } from "@/types/industry";

/** Figma: four 366px cards 10px apart, name then a three-line Functional bio. */
export function NamedExpertsSection({
  data,
  accentColor,
}: {
  data: IndustryPageData["experts"];
  accentColor: string;
}) {
  return (
    <section className="pb-[clamp(5.375rem,calc(10.19*var(--vw)),9.625rem)]">
      <div className={SERVICE_GUTTER}>
        <div data-line className="h-px bg-[var(--hll-mid-grey)]" />
        <div className="pt-[84px]">
          <HomeHeading
            eyebrow={data.eyebrow}
            title={data.title}
            eyebrowColor={accentColor}
            eyebrowMedium
          />
        </div>
      </div>

      <div className="mt-[84px] grid gap-[10px] px-[10px] sm:grid-cols-2 lg:grid-cols-4">
        {data.people.map((person) => (
          <article key={person.id}>
            <div
              className="aspect-square w-full rounded-lg bg-[#D9D9D9]"
              style={
                person.photo
                  ? {
                      background: `#D9D9D9 url(${person.photo}) center / cover`,
                    }
                  : undefined
              }
            />
            <p className="mt-2 text-[clamp(1.5rem,calc(2.38*var(--vw)),2.25rem)] font-normal leading-[1.16] text-[var(--hll-dark-grey)]">
              {person.name}
            </p>
            <p className="hll-label mt-[2px] whitespace-pre-line text-[12px] uppercase leading-[1.2] text-[var(--hll-dark-grey)]">
              {person.bio.split(/\s*·\s*|\n/).join("\n")}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
