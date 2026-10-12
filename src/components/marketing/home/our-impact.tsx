import { ArrowUpRight } from "lucide-react";

import { HLLButton } from "@/components/hll";
import { BUTTON_MOBILE } from "@/components/marketing/button-sizes";
import { CountUp } from "@/components/marketing/count-up";

import type { HomeImpactCard, HomeImpactStat, HomePageContent } from "@/data/home";

import { HOME_GUTTER, HomeHeading } from "./primitives";

/** Figma slot for a card: its media height (px at the 490px card width, and
 *  at the 386px mobile width) and whether it spans two columns. */
type CardSlot = { kind: "card"; id: string; mediaH: number; mobileH?: number; wide?: boolean };
type StatSlot = { kind: "stat"; id: string };
type Slot = (CardSlot | StatSlot) & { x: number; y: number };
type Card = CardSlot & HomeImpactCard;
type Stat = StatSlot & HomeImpactStat;
type Tile = (Card | Stat) & { x: number; y: number };

// Figma "Our Impact" (1512px frame): three 490px columns 10px apart, laid out
// as a staggered grid rather than equal rows. x / y are offsets inside the
// 1491 × 1761 block that starts 10px from the frame's left edge. The CMS fills
// the six card slots and two counters in order; the layout stays Figma's.
const BLOCK = { w: 1491, h: 1761 };
const CARD_SLOTS: (CardSlot & { x: number; y: number })[] = [
  { kind: "card", id: "card-1", mediaH: 490, mobileH: 385, x: 1, y: 0 },
  { kind: "card", id: "card-2", mediaH: 317, mobileH: 280, x: 501, y: 0 },
  { kind: "card", id: "card-3", mediaH: 551, mobileH: 380, x: 1001, y: 0 },
  { kind: "card", id: "card-4", mediaH: 490, mobileH: 380, x: 501, y: 641 },
  { kind: "card", id: "card-5", mediaH: 317, x: 1001, y: 641 },
  { kind: "card", id: "card-6", mediaH: 490, wide: true, x: 0, y: 1221 },
];
const STAT_SLOTS: (StatSlot & { x: number; y: number })[] = [
  { kind: "stat", id: "stat-1", x: 0, y: 959 },
  { kind: "stat", id: "stat-2", x: 1002, y: 1533 },
];

// Figma Home mobile reading order: the clients counter follows the third card.
const MOBILE_ORDER = ["card-1", "card-2", "card-3", "stat-1", "card-4", "card-5", "card-6", "stat-2"];

function tilesFor(data: HomePageContent["impact"]): Tile[] {
  const cards = CARD_SLOTS.flatMap((slot, i): Tile[] =>
    data.cards[i] ? [{ ...slot, ...data.cards[i] }] : [],
  );
  const stats = STAT_SLOTS.flatMap((slot, i): Tile[] =>
    data.stats[i] ? [{ ...slot, ...data.stats[i] }] : [],
  );
  return [...cards, ...stats];
}

const pct = (v: number, of: number) => `${(v / of) * 100}%`;

function ImpactCard({ tile, mobile = false }: { tile: Card; mobile?: boolean }) {
  const width = tile.wide ? 991 : 490;
  const ratio =
    mobile && tile.mobileH
      ? `386 / ${tile.mobileH}`
      : `${width} / ${tile.mediaH}`;
  const body = (
    <>
      <div
        className="relative overflow-hidden rounded-[6px] bg-[#D9D9D9] lg:rounded-lg"
        style={{
          aspectRatio: ratio,
          background: tile.image ? `#D9D9D9 url(${tile.image}) center / cover` : undefined,
        }}
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
    </>
  );
  return (
    <article className="group">
      {tile.href ? (
        <a href={tile.href} className="block">
          {body}
        </a>
      ) : (
        body
      )}
    </article>
  );
}

function ImpactStat({ tile }: { tile: Stat }) {
  return (
    <div className="text-black">
      {/* Figma: "Number counter". */}
      <p className="hll-display text-[128px] font-light leading-[1.16] lg:text-[clamp(4rem,calc(8.47*var(--vw)),8rem)]">
        <CountUp value={tile.value} />
      </p>
      <p className="mt-[-12px] text-[clamp(1.5rem,calc(2.38*var(--vw)),2.25rem)] font-light leading-[1.16]">
        {tile.label}
      </p>
    </div>
  );
}

export function OurImpact({ data }: { data: HomePageContent["impact"] }) {
  const tiles = tilesFor(data);
  const mobileTiles = MOBILE_ORDER.flatMap((id) => tiles.filter((t) => t.id === id));
  return (
    <section id="impact" className="hll-home-section">
      {/* No divider on top (QA H-15): the knowledge graph above fades into
          the page, and a line here read as a divider under the graph. */}
      <div className={`pt-[154px] ${HOME_GUTTER}`}>
        <HomeHeading eyebrow={data.eyebrow} title={data.title} />
      </div>

      {/* Desktop: Figma's staggered placement, scaled with the block width. */}
      <div
        className="relative mx-[10px] mt-[84px] hidden lg:block"
        style={{ aspectRatio: `${BLOCK.w} / ${BLOCK.h}` }}
      >
        {tiles.map((tile) => (
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
        {mobileTiles.map((tile, i) => {
          const prev = mobileTiles[i - 1];
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
      {/* QA H-28: rides higher on desktop (10% of the screen off the
          bottom) so it's noticed, and its glow comes on quicker. */}
      <div className="pointer-events-none sticky bottom-8 z-10 mb-20 mt-10 flex justify-start px-2 lg:bottom-[calc(10*var(--svh))] lg:my-[59px] lg:justify-center lg:px-0">
        <span className="pointer-events-auto">
          <HLLButton href={data.ctaHref} variant="engagement" size="md" className={`hll-button--quick ${BUTTON_MOBILE}`}>
            {data.ctaLabel}
          </HLLButton>
        </span>
      </div>
    </section>
  );
}
