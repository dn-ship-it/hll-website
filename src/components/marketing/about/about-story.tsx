import type { AboutPageData } from "@/data/about";
import { MediaPlaceholder, SectionTitle } from "@/components/marketing/home/primitives";

import { AboutPageHeader } from "./about-chrome";

export function AboutStorySection({
  data,
  accentColor,
}: {
  data: AboutPageData["story"];
  accentColor: string;
}) {
  return (
    <section className="border-t border-black/6 px-[clamp(1.25rem,4vw,3rem)] py-[clamp(3rem,8vw,5rem)]">
      <div className="mx-auto grid max-w-[90rem] gap-[clamp(2rem,5vw,4rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <div>
          <AboutPageHeader title={data.eyebrow} accentColor={accentColor} />
          <SectionTitle>{data.title}</SectionTitle>
          <div className="mt-6 space-y-4">
            {data.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="text-sm leading-7 text-black/55">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
        <MediaPlaceholder className="aspect-[4/3] w-full min-h-[clamp(14rem,35vw,24rem)]" />
      </div>
    </section>
  );
}
