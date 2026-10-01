import { GradientRevealTextSlow } from "@/components/hll";
import { SERVICE_GUTTER } from "@/components/marketing/services/service-chrome";
import type { AboutPageData } from "@/data/about";

// Figma About_02 collage: four media tiles in a 1452 × 400 band.
const BAND = { w: 1452, h: 400 };
const TILES = [
  { x: 0, y: 0, w: 300, h: 400 },
  { x: 653, y: 57, w: 610, h: 343 },
  { x: 1273, y: 164, w: 177, h: 236 },
  { x: 310, y: 212, w: 333, h: 187 },
];

const pct = (v: number, of: number) => `${(v / of) * 100}%`;

export function AboutHero({ data }: { data: AboutPageData["hero"] }) {
  return (
    <section className={`pt-[80px] ${SERVICE_GUTTER}`}>
      <div className="relative" style={{ aspectRatio: `${BAND.w} / ${BAND.h}` }}>
        {TILES.map((tile, i) => {
          const image = data.images[i];
          return (
            <div
              key={i}
              className="absolute overflow-hidden rounded-[4px] bg-[#D9D9D9]"
              style={{
                left: pct(tile.x, BAND.w),
                top: pct(tile.y, BAND.h),
                width: pct(tile.w, BAND.w),
                height: pct(tile.h, BAND.h),
                ...(image ? { background: `#D9D9D9 url(${image}) center / cover` } : null),
              }}
            />
          );
        })}
      </div>

      <GradientRevealTextSlow
        as="h1"
        text={data.title}
        variant="about"
        className="mt-[109px] block font-light text-[var(--hll-dark-grey)]"
        fontSize="clamp(2.5rem, calc(4.23*var(--vw)), 4rem)"
        letterSpacing="0"
        lineHeight="1.16"
      />

      <div className="mt-[-14px] space-y-[50px] lg:ml-[45.2%] lg:max-w-[682px]">
        {data.paragraphs.map((text) => (
          <p key={text} className="text-[clamp(1.125rem,calc(1.59*var(--vw)),1.5rem)] leading-[1.25] text-[var(--hll-dark-grey)]">
            {text}
          </p>
        ))}
      </div>
    </section>
  );
}
