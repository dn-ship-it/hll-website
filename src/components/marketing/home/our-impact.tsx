import { HLLServiceTag } from "@/components/hll/tag";

import { MediaPlaceholder, OutlinePillButton, SectionEyebrow, SectionTitle } from "./primitives";

type ImpactTile = {
  id: string;
  title: string;
  tags: string[];
  gridColumn: string;
  gridRow: string;
  minHeight: string;
  type?: "media" | "stat";
  stat?: string;
};

const IMPACT_TILES: ImpactTile[] = [
  {
    id: "bajaj",
    title: "Bajaj",
    tags: ["HLL MOMENTUM"],
    gridColumn: "span 1",
    gridRow: "span 2",
    minHeight: "clamp(14rem, 28vw, 20rem)",
  },
  {
    id: "ktm",
    title: "KTM",
    tags: ["HLL GOVERNANCE"],
    gridColumn: "span 1",
    gridRow: "span 1",
    minHeight: "clamp(8rem, 16vw, 11rem)",
  },
  {
    id: "wecare",
    title: "WeCare",
    tags: ["HLL MOTION", "HLL GOVERNANCE"],
    gridColumn: "span 1",
    gridRow: "span 2",
    minHeight: "clamp(16rem, 32vw, 24rem)",
  },
  {
    id: "stat-60",
    title: "",
    tags: [],
    gridColumn: "span 1",
    gridRow: "span 1",
    minHeight: "clamp(8rem, 14vw, 10rem)",
    type: "stat",
    stat: "60+ Clients across the world",
  },
  {
    id: "big-red",
    title: "The Big Red Group",
    tags: ["HLL MOMENTUM", "HLL MOTION", "HLL GOVERNANCE"],
    gridColumn: "span 1",
    gridRow: "span 2",
    minHeight: "clamp(14rem, 28vw, 20rem)",
  },
  {
    id: "salt",
    title: "Salt",
    tags: ["HLL MOTION"],
    gridColumn: "span 1",
    gridRow: "span 1",
    minHeight: "clamp(8rem, 16vw, 11rem)",
  },
  {
    id: "zelish",
    title: "Zelish",
    tags: ["HLL MOTION", "HLL GOVERNANCE"],
    gridColumn: "span 2",
    gridRow: "span 1",
    minHeight: "clamp(10rem, 18vw, 14rem)",
  },
  {
    id: "stat-80",
    title: "",
    tags: [],
    gridColumn: "span 1",
    gridRow: "span 1",
    minHeight: "clamp(8rem, 14vw, 10rem)",
    type: "stat",
    stat: "80% Clients across the world",
  },
];

function ImpactCard({ tile }: { tile: ImpactTile }) {
  if (tile.type === "stat") {
    return (
      <article
        className="flex items-end p-4"
        style={{ gridColumn: tile.gridColumn, gridRow: tile.gridRow, minHeight: tile.minHeight }}
      >
        <p
          className="font-light leading-tight text-black"
          style={{ fontSize: "clamp(1.35rem, 2.5vw, 2rem)" }}
        >
          {tile.stat}
        </p>
      </article>
    );
  }

  return (
    <article
      className="group relative flex flex-col"
      style={{ gridColumn: tile.gridColumn, gridRow: tile.gridRow, minHeight: tile.minHeight }}
    >
      <MediaPlaceholder className="h-full min-h-[inherit] flex-1 w-full" label={tile.title} />
      <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
        {tile.tags.map((tag) => (
          <HLLServiceTag key={tag} label={tag} />
        ))}
      </div>
      <p className="mt-2 text-xs text-black/50">{tile.title}</p>
    </article>
  );
}

export function OurImpact() {
  return (
    <section
      id="impact"
      className="border-t border-black/6 px-[clamp(1.25rem,4vw,3rem)] py-[clamp(3rem,8vw,5rem)]"
    >
      <div className="mx-auto max-w-[90rem]">
        <SectionEyebrow>Work</SectionEyebrow>
        <SectionTitle>Our Impact</SectionTitle>

        <div
          className="mt-10 grid gap-3"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 11rem), 1fr))",
            gridAutoRows: "minmax(8rem, auto)",
            gridAutoFlow: "dense",
          }}
        >
          {IMPACT_TILES.map((tile) => (
            <ImpactCard key={tile.id} tile={tile} />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <OutlinePillButton href="/services">View all work</OutlinePillButton>
        </div>
      </div>
    </section>
  );
}
