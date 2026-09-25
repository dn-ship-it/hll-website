import type { CareersPageContent } from "@/data/careers-page";
import { MediaPlaceholder, SectionTitle } from "@/components/marketing/home/primitives";

import { CareersSectionLabel } from "./careers-chrome";

export function CareersCultureSection({
  data,
  accentColor,
}: {
  data: CareersPageContent["culture"];
  accentColor: string;
}) {
  return (
    <section className="border-t border-black/6 bg-[#fafafa] px-[clamp(1.25rem,4vw,3rem)] py-[clamp(3rem,8vw,5rem)]">
      <div className="mx-auto grid max-w-[90rem] gap-[clamp(2rem,5vw,4rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <div>
          <CareersSectionLabel title={data.eyebrow} accentColor={accentColor} />
          <SectionTitle>{data.title}</SectionTitle>
          <p className="careers-body-copy mt-6 leading-[1.25] text-black/55">{data.description}</p>

          <div className="mt-8 space-y-6">
            {data.highlights.map((item) => (
              <article key={item.id}>
                <h3 className="text-base font-medium text-black">{item.title}</h3>
                <p className="careers-body-copy mt-2 leading-[1.25] text-black/55">{item.body}</p>
              </article>
            ))}
          </div>
        </div>

        <MediaPlaceholder className="careers-motion-media aspect-[4/3] w-full min-h-[clamp(14rem,35vw,24rem)]" label="Life at HLL" />
      </div>
    </section>
  );
}
