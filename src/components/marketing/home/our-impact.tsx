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
  statLabel?: string;
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
    gridRow: "span 2",
    minHeight: "clamp(15rem, 22vw, 20rem)",
    type: "stat",
    stat: "60+",
    statLabel: "Clients across the world",
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
    gridRow: "span 2",
    minHeight: "clamp(15rem, 22vw, 20rem)",
    type: "stat",
    stat: "80%",
    statLabel: "Client satisfaction",
  },
];

function ImpactCard({ tile }: { tile: ImpactTile }) {
  if (tile.type === "stat") {
    return (
      <article
        className="flex flex-col items-start justify-end p-4 md:p-6"
        style={{ gridColumn: tile.gridColumn, gridRow: tile.gridRow, minHeight: tile.minHeight }}
      >
        <p className="hll-display text-[clamp(3.5rem,8.5vw,8rem)] font-light leading-none text-black">{tile.stat}</p>
        <p className="mt-3 max-w-[12ch] text-[clamp(1.1rem,2.2vw,2.25rem)] leading-[1.05] text-black">{tile.statLabel}</p>
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
      className="hll-home-section border-t border-black/6 px-[clamp(1.25rem,4vw,3rem)] py-[clamp(3rem,8vw,5rem)]"
    >
      <div className="mx-auto max-w-[90rem]">
        <SectionEyebrow>Work</SectionEyebrow>
        <SectionTitle>Our Impact</SectionTitle>

        <div
          className="mt-10 grid auto-rows-min gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          style={{ gridAutoFlow: "dense" }}
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
