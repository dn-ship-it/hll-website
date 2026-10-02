import { HomeHeading } from "@/components/marketing/home/primitives";
import { SERVICE_GUTTER } from "@/components/marketing/services/service-chrome";
import type { IndustryPageData } from "@/types/industry";

/** Figma: four 366px cards 10px apart, name then a three-line Functional bio.
 *  Mobile: rows of a 93px photo with the name and bio 12px to its right. */
export function NamedExpertsSection({
  data,
  accentColor,
}: {
  data: IndustryPageData["experts"];
  accentColor: string;
}) {
  return (
    <section className="pb-[84px] lg:pb-[clamp(5.375rem,calc(10.19*var(--vw)),9.625rem)]">
      <div className={SERVICE_GUTTER}>
        <div data-line className="-mx-3 h-px bg-[var(--hll-mid-grey)] lg:mx-0" />
        <div className="pt-8 lg:pt-[84px]">
          <HomeHeading
            eyebrow={data.eyebrow}
            title={data.title}
            eyebrowColor={accentColor}
            eyebrowMedium
          />
        </div>
      </div>

      <ul className="mt-8 space-y-[10px] px-5 lg:hidden">
        {data.people.map((person) => (
          <li key={person.id} className="flex gap-3">
            <div
              className="size-[93px] shrink-0 rounded-lg bg-[#D9D9D9]"
              style={
                person.photo
                  ? { background: `#D9D9D9 url(${person.photo}) center / cover` }
                  : undefined
              }
            />
            <div>
              <p className="text-[24px] leading-[27.8px] text-black">{person.name}</p>
              <p
                className="whitespace-pre-line text-[10px] uppercase leading-[12px] text-[var(--hll-dark-grey)]"
                style={{ fontFamily: "var(--hll-font-functional)" }}
              >
                {person.bio.split(/\s*·\s*|\n/).join("\n")}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-[84px] hidden grid-cols-4 gap-[10px] px-[10px] lg:grid">
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
