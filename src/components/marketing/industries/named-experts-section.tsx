import type { IndustryPageData } from "@/types/industry";
import { MediaPlaceholder, SectionEyebrow, SectionTitle } from "@/components/marketing/home/primitives";

export function NamedExpertsSection({ data }: { data: IndustryPageData["experts"] }) {
  return (
    <section className="border-t border-black/6 px-[clamp(1.25rem,4vw,3rem)] py-[clamp(3rem,8vw,5rem)]">
      <div className="mx-auto max-w-[90rem]">
        <SectionEyebrow>{data.eyebrow}</SectionEyebrow>
        <SectionTitle>{data.title}</SectionTitle>

        <div
          className="mt-10 grid gap-6"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 10rem), 1fr))",
          }}
        >
          {data.people.map((person) => (
            <article key={person.id}>
              <MediaPlaceholder className="aspect-[3/4] w-full min-h-[clamp(12rem,28vw,18rem)]" />
              <p className="mt-4 text-sm font-medium text-black">{person.name}</p>
              <p className="mt-2 text-[10px] uppercase leading-5 tracking-[0.12em] text-black/45">
                {person.bio}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
