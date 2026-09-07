import type { AboutPageData } from "@/data/about";
import { MediaPlaceholder, SectionTitle } from "@/components/marketing/home/primitives";

import { AboutPageHeader } from "./about-chrome";

export function AboutTeamSection({ data }: { data: AboutPageData["team"] }) {
  return (
    <section className="border-t border-black/6 px-[clamp(1.25rem,4vw,3rem)] py-[clamp(3rem,8vw,5rem)]">
      <div className="mx-auto max-w-[90rem]">
        <AboutPageHeader title={data.eyebrow} accentColor="#9AB4D3" />
        <SectionTitle>{data.title}</SectionTitle>

        <div
          className="mt-10 grid gap-6"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 10rem), 1fr))",
          }}
        >
          {data.members.map((person) => (
            <article key={person.id}>
              <MediaPlaceholder className="aspect-[3/4] w-full min-h-[clamp(12rem,28vw,18rem)]" />
              <p className="mt-4 text-sm font-medium text-black">{person.name}</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-black/45">
                {person.role}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href={data.ctaHref}
            className="inline-flex rounded-full border border-black/20 px-5 py-2 text-[11px] uppercase tracking-[0.18em] text-black/80"
          >
            {data.ctaLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
