import type { AboutPageData } from "@/data/about";
import { SectionTitle } from "@/components/marketing/home/primitives";

import { AboutPageHeader } from "./about-chrome";

export function AboutValuesSection({
  data,
  accentColor,
}: {
  data: AboutPageData["values"];
  accentColor: string;
}) {
  return (
    <section className="border-t border-black/6 bg-[#fafafa] px-[clamp(1.25rem,4vw,3rem)] py-[clamp(3rem,8vw,5rem)]">
      <div className="mx-auto max-w-[90rem]">
        <AboutPageHeader title={data.eyebrow} accentColor={accentColor} />
        <SectionTitle>{data.title}</SectionTitle>

        <div
          className="mt-10 grid gap-6"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 14rem), 1fr))",
          }}
        >
          {data.items.map((value) => (
            <article
              key={value.id}
              className="rounded-sm border border-black/6 bg-white p-[clamp(1rem,2.5vw,1.5rem)]"
            >
              <h3 className="text-base font-medium text-black">{value.title}</h3>
              <p className="mt-3 text-sm leading-7 text-black/55">{value.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
