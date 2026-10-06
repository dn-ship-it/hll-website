import { ArrowUpRight } from "lucide-react";

import { HLLButton } from "@/components/hll";
import { BUTTON_MOBILE } from "@/components/marketing/button-sizes";
import { CountUp } from "@/components/marketing/count-up";

import { HOME_GUTTER, HomeHeading } from "./primitives";

type Card = {
  kind: "card";
  id: string;
  title: string;
  tags: string[];
  /** Media height in px at the 490px card width (Figma). */
  mediaH: number;
  /** Figma Home mobile: media height at its 386px card width. */
  mobileH?: number;
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
    mobileH: 385,
    x: 1,
    y: 0,
  },
  {
    kind: "card",
    id: "ktm",
    title: "KTM",
    tags: ["HLL Trust & Governance"],
    mediaH: 317,
    mobileH: 280,
    x: 501,
    y: 0,
  },
  {
    kind: "card",
    id: "wecare",
    title: "WeCare",
    tags: ["HLL AI", "HLL Trust & Governance"],
    mediaH: 551,
    mobileH: 380,
    x: 1001,
    y: 0,
  },
  {
    kind: "card",
    id: "big-red",
    title: "The Big Red Group",
    tags: ["HLL People & Policy", "HLL AI", "HLL Trust & Governance"],
    mediaH: 490,
    mobileH: 380,
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

// Figma Home mobile reading order: the clients counter follows WeCare.
const MOBILE_ORDER = [
  "bajaj",
  "ktm",
  "wecare",
  "clients",
  "big-red",
  "salt",
  "zelish",
  "satisfaction",
];
const MOBILE_TILES = MOBILE_ORDER.map((id) => TILES.find((t) => t.id === id)!);

const pct = (v: number, of: number) => `${(v / of) * 100}%`;

function ImpactCard({ tile, mobile = false }: { tile: Card; mobile?: boolean }) {
  const width = tile.wide ? 991 : 490;
  const ratio =
    mobile && tile.mobileH
      ? `386 / ${tile.mobileH}`
      : `${width} / ${tile.mediaH}`;
  return (
    <article className="group">
      <div
        className="relative overflow-hidden rounded-[6px] bg-[#D9D9D9] lg:rounded-lg"
        style={{ aspectRatio: ratio }}
      >
        <span
          aria-hidden
          className="absolute right-2 top-2 grid size-9 place-items-center rounded-[4px] bg-white text-[var(--hll-dark-grey)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        >
          <ArrowUpRight className="size-4" strokeWidth={1.4} />
        </span>
        {/* Mobile tags are the "Button Mobile" pill: 34px, 10px label. */}
        <div className="absolute bottom-[6px] left-[6px] right-[6px] flex flex-wrap-reverse gap-[6px] lg:bottom-2 lg:left-2 lg:right-2 lg:gap-2">
          {tile.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex h-[34px] items-center rounded-[3px] bg-[var(--hll-bg)] px-[21px] text-[10px] uppercase leading-none tracking-[0.25em] text-[var(--hll-dark-grey)] lg:h-9 lg:rounded-[4px] lg:text-[12px]"
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
      <p className="hll-display text-[128px] font-light leading-[1.16] lg:text-[clamp(4rem,calc(8.47*var(--vw)),8rem)]">
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
      <div data-line className="h-px bg-[#D9D9D9] lg:h-[2px]" />

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

      {/* Figma Home mobile: one 386px column, 8px from the edges; cards 32px
          apart, 84px around a counter. */}
      <div className="mt-8 px-2 lg:hidden">
        {MOBILE_TILES.map((tile, i) => {
          const prev = MOBILE_TILES[i - 1];
          const gap =
            i === 0
              ? undefined
              : tile.kind === "stat" || prev?.kind === "stat"
                ? "mt-[84px]"
                : "mt-8";
          return (
            <div key={tile.id} className={gap}>
              {tile.kind === "card" ? (
                <ImpactCard tile={tile} mobile />
              ) : (
                <div className="pl-px">
                  <ImpactStat tile={tile} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Figma: "View All work button will be sticky and leads to the
          engagements page". Phones set it on the cards' left edge. */}
      <div className="pointer-events-none sticky bottom-8 z-10 mb-20 mt-10 flex justify-start px-2 lg:my-[59px] lg:justify-center lg:px-0">
        <span className="pointer-events-auto">
          <HLLButton href="/engagement" variant="engagement" size="md" className={BUTTON_MOBILE}>
            View all work
          </HLLButton>
        </span>
      </div>
    </section>
  );
}
