import { GradientRevealTextSlow } from "@/components/hll";
import type { AboutPageData } from "@/data/about";
import { MediaPlaceholder, OutlinePillButton } from "@/components/marketing/home/primitives";

import { AboutPageHeader } from "./about-chrome";

export function AboutHero({
  data,
  accentColor,
}: {
  data: AboutPageData["hero"];
  accentColor: string;
}) {
  return (
    <section className="px-[clamp(1.25rem,4vw,3rem)] pb-[clamp(2rem,5vw,3rem)]">
      <div className="mx-auto max-w-[90rem]">
        <AboutPageHeader title={data.eyebrow} accentColor={accentColor} />

        <GradientRevealTextSlow
          as="h1"
          text={data.headline}
          variant="about"
          className="mt-4 block max-w-[min(100%,52rem)] tracking-tight text-black"
          fontSize="clamp(2rem, 4vw + 0.5rem, 3.25rem)"
          letterSpacing="-0.01em"
        />

        <p className="mt-6 max-w-2xl text-sm leading-7 text-black/55">{data.description}</p>

        <div className="relative mt-[clamp(1.5rem,4vw,2.5rem)]">
          <MediaPlaceholder
            className="aspect-[16/7] min-h-[clamp(12rem,36vw,22rem)] w-full rounded-sm"
            label="About hero"
          />
          <div
            className="pointer-events-none absolute inset-0 rounded-sm opacity-40 mix-blend-multiply"
            style={{
              background:
                "linear-gradient(135deg, #9AB4D3 0%, #A28DD7 50%, #AD7ECF 100%)",
            }}
          />
          <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6">
            <OutlinePillButton href={data.ctaHref} variant="about">
              {data.ctaLabel}
            </OutlinePillButton>
          </div>
        </div>
      </div>
    </section>
  );
}
