import type { AboutPageData } from "@/data/about";
import { MediaPlaceholder, SectionTitle } from "@/components/marketing/home/primitives";

import { AboutPageHeader } from "./about-chrome";

export function AboutClientsSection({
  data,
  accentColor,
}: {
  data: AboutPageData["clients"];
  accentColor: string;
}) {
  const slots = Array.from({ length: data.slotCount }, (_, i) => i);

  return (
    <section className="border-t border-black/6 px-[clamp(1.25rem,4vw,3rem)] py-[clamp(2.5rem,6vw,4rem)]">
      <div className="mx-auto max-w-[90rem]">
        <AboutPageHeader title={data.eyebrow} accentColor={accentColor} />
        <SectionTitle>{data.title}</SectionTitle>

        <div
          className="mt-10 grid gap-4"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 7rem), 1fr))",
          }}
        >
          {slots.map((slot) => (
            <MediaPlaceholder
              key={slot}
              className="aspect-[3/2] min-h-[clamp(4rem,10vw,6rem)] w-full"
              label="Client"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
