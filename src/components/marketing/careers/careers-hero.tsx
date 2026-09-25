import { GradientRevealTextSlow } from "@/components/hll";
import type { CareersPageContent } from "@/data/careers-page";
import { MediaPlaceholder, OutlinePillButton } from "@/components/marketing/home/primitives";

import { CareersSectionLabel } from "./careers-chrome";

export function CareersHero({
  data,
  accentColor,
}: {
  data: CareersPageContent["hero"];
  accentColor: string;
}) {
  return (
    <section className="px-[clamp(1.25rem,4vw,3rem)] pb-[clamp(2rem,5vw,3rem)]">
      <div className="mx-auto max-w-[90rem]">
        <CareersSectionLabel title={data.eyebrow} accentColor={accentColor} />

        <GradientRevealTextSlow
          as="h1"
          text={data.headline}
          variant="engagement"
          className="mt-4 block max-w-[min(100%,52rem)] text-black"
          fontSize="clamp(1.875rem, 4.25vw, 4rem)"
          letterSpacing="0"
        />

        <p className="careers-body-copy mt-6 max-w-2xl leading-[1.25] text-black/55">{data.description}</p>

        <div className="relative mt-[clamp(1.5rem,4vw,2.5rem)]">
          <MediaPlaceholder
            className="careers-motion-media aspect-[16/7] min-h-[clamp(12rem,32vw,20rem)] w-full rounded-sm"
            label="Team at work"
          />
          <div
            className="pointer-events-none absolute inset-0 rounded-sm opacity-35 mix-blend-multiply"
            style={{
              background: "linear-gradient(135deg, #F9B535 0%, #FF9126 50%, #FF6302 100%)",
            }}
          />
          <div className="careers-open-roles-cta fixed bottom-5 right-5 z-30 md:bottom-6 md:right-6">
            <OutlinePillButton href="#open-roles" variant="engagement">
              See open roles
            </OutlinePillButton>
          </div>
        </div>
      </div>
    </section>
  );
}
