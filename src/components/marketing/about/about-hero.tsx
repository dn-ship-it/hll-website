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

// Figma About mobile: four tiles in a 374 × 318 band from x 14 (the other
// two sit off-frame).
const MOBILE_BAND = { w: 374, h: 318 };
const MOBILE_TILES = [
  { x: 0, y: 0, w: 88, h: 81 },
  { x: 93, y: 0, w: 281, h: 147 },
  { x: 0, y: 152, w: 129, h: 166 },
  { x: 245, y: 152, w: 129, h: 96 },
];

const pct = (v: number, of: number) => `${(v / of) * 100}%`;

function Band({
  band,
  tiles,
  images,
  radius,
  className,
}: {
  band: { w: number; h: number };
  tiles: typeof TILES;
  images: AboutPageData["hero"]["images"];
  radius: string;
  className: string;
}) {
  return (
    <div className={`relative ${className}`} style={{ aspectRatio: `${band.w} / ${band.h}` }}>
      {tiles.map((tile, i) => {
        const image = images[i];
        return (
          <div
            key={i}
            className={`absolute overflow-hidden bg-[#D9D9D9] ${radius}`}
            style={{
              left: pct(tile.x, band.w),
              top: pct(tile.y, band.h),
              width: pct(tile.w, band.w),
              height: pct(tile.h, band.h),
              ...(image ? { background: `#D9D9D9 url(${image}) center / cover` } : null),
            }}
          />
        );
      })}
    </div>
  );
}

export function AboutHero({ data }: { data: AboutPageData["hero"] }) {
  return (
    <section className={`lg:pt-[80px] ${SERVICE_GUTTER}`}>
      <Band
        band={MOBILE_BAND}
        tiles={MOBILE_TILES}
        images={data.images}
        radius="rounded-[2px]"
        className="-mx-[6px] lg:hidden"
      />
      <Band
        band={BAND}
        tiles={TILES}
        images={data.images}
        radius="rounded-[4px]"
        className="hidden lg:block"
      />

      <GradientRevealTextSlow
        as="h1"
        text={data.title}
        variant="about"
        className="mt-[120px] block font-light text-[var(--hll-dark-grey)] lg:mt-[109px]"
        fontSize="clamp(30px, calc(4.23*var(--vw)), 4rem)"
        letterSpacing="0"
        lineHeight="1.16"
      />

      <div className="mt-[84px] max-w-[353px] space-y-[17px] lg:ml-[45.2%] lg:mt-[-14px] lg:max-w-[682px] lg:space-y-[50px]">
        {data.paragraphs.map((text) => (
          <p key={text} className="text-[14px] leading-[1.25] text-[var(--hll-dark-grey)] lg:text-[clamp(1.125rem,calc(1.59*var(--vw)),1.5rem)]">
            {text}
          </p>
        ))}
      </div>
    </section>
  );
}
