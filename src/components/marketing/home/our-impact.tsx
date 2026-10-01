import { ArrowUpRight } from "lucide-react";

import { HLLButton } from "@/components/hll";
import { CountUp } from "@/components/marketing/count-up";

import { HOME_GUTTER, HomeHeading } from "./primitives";

type Card = {
  kind: "card";
  id: string;
  title: string;
  tags: string[];
  /** Media height in px at the 490px card width (Figma). */
  mediaH: number;
  wide?: boolean;
};
type Stat = { kind: "stat"; id: string; stat: string; label: string };
type Tile = (Card | Stat) & { x: number; y: number };

// Figma "Our Impact" (1512px frame): three 490px columns 10px apart, laid out
// as a staggered grid rather than equal rows. x / y are offsets inside the
// 1491 × 1761 block that starts 10px from the frame's left edge.
const BLOCK = { w: 1491, h: 1761 };
const TILES: Tile[] = [
  {
    kind: "card",
    id: "bajaj",
    title: "Bajaj",
    tags: ["HLL People & Policy"],
    mediaH: 490,
    x: 1,
    y: 0,
  },
  {
    kind: "card",
    id: "ktm",
    title: "KTM",
    tags: ["HLL Trust & Governance"],
    mediaH: 317,
    x: 501,
    y: 0,
  },
  {
    kind: "card",
    id: "wecare",
    title: "WeCare",
    tags: ["HLL AI", "HLL Trust & Governance"],
    mediaH: 551,
    x: 1001,
    y: 0,
  },
  {
    kind: "card",
    id: "big-red",
    title: "The Big Red Group",
    tags: ["HLL People & Policy", "HLL AI", "HLL Trust & Governance"],
    mediaH: 490,
    x: 501,
    y: 641,
  },
  {
    kind: "card",
    id: "salt",
    title: "Salt",
    tags: ["HLL AI"],
    mediaH: 317,
    x: 1001,
    y: 641,
  },
  {
    kind: "stat",
    id: "clients",
    stat: "60+",
    label: "Clients across the world",
    x: 0,
    y: 959,
  },
  {
    kind: "card",
    id: "zelish",
    title: "Zelish",
    tags: ["HLL AI", "HLL Trust & Governance"],
    mediaH: 490,
    wide: true,
    x: 0,
    y: 1221,
  },
  {
    kind: "stat",
    id: "satisfaction",
    stat: "80%",
    label: "Client satisfaction",
    x: 1002,
    y: 1533,
  },
];

const pct = (v: number, of: number) => `${(v / of) * 100}%`;

function ImpactCard({ tile }: { tile: Card }) {
  const width = tile.wide ? 991 : 490;
  return (
    <article className="group">
      <div
        className="relative overflow-hidden rounded-lg bg-[#D9D9D9]"
        style={{ aspectRatio: `${width} / ${tile.mediaH}` }}
      >
        <span
          aria-hidden
          className="absolute right-2 top-2 grid size-9 place-items-center rounded-[4px] bg-white text-[var(--hll-dark-grey)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        >
          <ArrowUpRight className="size-4" strokeWidth={1.4} />
        </span>
        <div className="absolute bottom-2 left-2 right-2 flex flex-wrap-reverse gap-2">
          {tile.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex h-9 items-center rounded-[4px] bg-[var(--hll-bg)] px-[21px] text-[12px] uppercase leading-none tracking-[0.25em] text-[var(--hll-dark-grey)]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <h3 className="mt-2 text-[clamp(1.5rem,calc(2.38*var(--vw)),2.25rem)] font-normal leading-[1.16] text-[var(--hll-dark-grey)]">
        {tile.title}
      </h3>
    </article>
  );
}

function ImpactStat({ tile }: { tile: Stat }) {
  return (
    <div className="text-black">
      {/* Figma: "Number counter". */}
      <p className="hll-display text-[clamp(4rem,calc(8.47*var(--vw)),8rem)] font-light leading-[1.16]">
        <CountUp value={tile.stat} />
      </p>
      <p className="mt-[-12px] text-[clamp(1.5rem,calc(2.38*var(--vw)),2.25rem)] font-light leading-[1.16]">
        {tile.label}
      </p>
    </div>
  );
}

export function OurImpact() {
  return (
    <section id="impact" className="hll-home-section">
      <div data-line className="h-[2px] bg-[#D9D9D9]" />

      <div className={`pt-[154px] ${HOME_GUTTER}`}>
        <HomeHeading eyebrow="Work" title="Our Impact" />
      </div>

      {/* Desktop: Figma's staggered placement, scaled with the block width. */}
      <div
        className="relative mx-[10px] mt-[84px] hidden lg:block"
        style={{ aspectRatio: `${BLOCK.w} / ${BLOCK.h}` }}
      >
        {TILES.map((tile) => (
          <div
            key={tile.id}
            className="absolute"
            style={{
              left: pct(tile.x, BLOCK.w),
              top: pct(tile.y, BLOCK.h),
              width: pct(
                tile.kind === "card" && tile.wide ? 991 : 490,
                BLOCK.w,
              ),
            }}
          >
            {tile.kind === "card" ? (
              <ImpactCard tile={tile} />
            ) : (
              <ImpactStat tile={tile} />
            )}
          </div>
        ))}
      </div>

      {/* Smaller screens: the same tiles in reading order. */}
      <div
        className={`mt-12 grid gap-8 sm:grid-cols-2 lg:hidden ${HOME_GUTTER}`}
      >
        {TILES.map((tile) => (
          <div
            key={tile.id}
            className={
              tile.kind === "card" && tile.wide ? "sm:col-span-2" : undefined
            }
          >
            {tile.kind === "card" ? (
              <ImpactCard tile={tile} />
            ) : (
              <ImpactStat tile={tile} />
            )}
          </div>
        ))}
      </div>

      {/* Figma: "View All work button will be sticky and leads to the
          engagements page". */}
      <div className="pointer-events-none sticky bottom-8 z-10 my-[59px] flex justify-center">
        <span className="pointer-events-auto">
          <HLLButton href="/engagement" variant="engagement" size="md">
            View all work
          </HLLButton>
        </span>
      </div>
    </section>
  );
}
