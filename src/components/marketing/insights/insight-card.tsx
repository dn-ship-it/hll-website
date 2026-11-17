import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import type { Insight } from "@/lib/payload/insights";

import { EngagementMediaBox } from "../engagement/engagement-card";

export const insightHref = (insight: Pick<Insight, "slug">) => `/insights/${insight.slug}`;

/** Figma Insights tags: 36px tiles, 12px caps spaced 0.25em. */
export function InsightTags({
  tags,
  className = "",
  outlined = false,
}: {
  tags: string[];
  className?: string;
  /** The article hero's tags sit on the page, so they take a hairline. */
  outlined?: boolean;
}) {
  if (!tags.length) return null;
  return (
    <span className={`flex flex-wrap gap-2 ${className}`}>
      {tags.map((tag) => (
        <span
          key={tag}
          className={`inline-flex h-8 items-center rounded-[4px] px-[14px] text-[10px] uppercase leading-none tracking-[0.25em] text-[var(--hll-dark-grey)] lg:h-9 lg:px-[21px] lg:text-[12px] ${outlined ? "border border-[#E5E5E5] bg-white" : "bg-[var(--hll-bg)]"}`}
        >
          {tag}
        </span>
      ))}
    </span>
  );
}

/**
 * Figma Insights card (209:944 / 209:959): cover at 514 × 384 (the grid's
 * 471 × 352 is the same shape) with the tags 8px in from its bottom left and
 * the arrow tile on hover; the headline and "By <author>" under it.
 */
export function InsightCard({
  insight,
  onColour = false,
}: {
  insight: Insight;
  /** White type, for the Latest band's gradient. */
  onColour?: boolean;
}) {
  const ink = onColour ? "text-white" : "text-[var(--hll-dark-grey)]";
  return (
    <Link href={insightHref(insight)} className="group block">
      <div data-reveal-media>
        <EngagementMediaBox media={insight.cover} fallbackRatio={514 / 384} className="!aspect-[514/384]">
          <span
            aria-hidden
            className="absolute right-2 top-2 grid size-9 place-items-center rounded-[4px] bg-white text-[var(--hll-dark-grey)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          >
            <ArrowUpRight className="size-4" strokeWidth={1.4} />
          </span>
          <InsightTags tags={insight.tags} className="absolute bottom-2 left-2 right-2 !flex-wrap-reverse" />
        </EngagementMediaBox>
      </div>
      <span className={`mt-3 block text-[24px] leading-[1.16] lg:mt-4 lg:text-[clamp(1.5rem,calc(2.12*var(--vw)),2rem)] ${ink}`}>
        {insight.title}
      </span>
      {insight.author ? (
        <span className={`mt-1 block text-[14px] leading-[1.25] lg:text-[clamp(1rem,calc(1.32*var(--vw)),1.25rem)] ${ink}`}>
          By {insight.author.name}
        </span>
      ) : null}
    </Link>
  );
}

/** A row of cards that swipes sideways, the third one cut by the edge (Latest, Related Articles). */
export function InsightCarousel({
  items,
  onColour = false,
}: {
  items: Insight[];
  onColour?: boolean;
}) {
  return (
    <div className="flex snap-x snap-mandatory scroll-pl-5 gap-[10px] overflow-x-auto px-5 [scrollbar-width:none] lg:scroll-pl-[30px] lg:gap-5 lg:px-[30px] [&::-webkit-scrollbar]:hidden">
      {items.map((item) => (
        <div
          key={item.id}
          data-fade-up
          className="w-[289px] shrink-0 snap-start lg:w-[calc(34*var(--vw))] lg:max-w-[514px]"
        >
          <InsightCard insight={item} onColour={onColour} />
        </div>
      ))}
    </div>
  );
}
