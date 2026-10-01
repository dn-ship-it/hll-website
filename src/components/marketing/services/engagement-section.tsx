import { ArrowUpRight } from "lucide-react";

import type { ServiceVariant } from "@/components/hll/variants";
import type { ServicePageData } from "@/data/services/types";

import { ServiceSectionHeading } from "./service-chrome";

const MEDIA_STYLES = {
  navy: "bg-[#24477F] text-white",
  orange: "bg-[#F27620] text-white",
  image: "bg-[#e3e3e3] text-black",
} as const;

/** The shape both service engagement cards and industry capability cards share. */
export type EngagementCardLike = {
  title: string;
  client?: string;
  tag: string;
  description: string;
  variant: keyof typeof MEDIA_STYLES;
  image?: string;
  logo?: string;
};

/** Figma "Component 4": 490 × 308 media block with its tag, then title and
 *  body. Mobile: 386 × 242, the 34px tag pill, 24px title, 14px body. */
export function EngagementCardView({ card }: { card: EngagementCardLike }) {
  return (
    <article className="group">
      <div
        className={`relative grid aspect-[386/242] place-items-center overflow-hidden rounded-[6px] lg:aspect-[490/308] lg:rounded-lg ${MEDIA_STYLES[card.variant]}`}
      >
        {card.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={card.image}
            alt=""
            className="absolute inset-0 size-full object-cover"
          />
        ) : card.logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={card.logo}
            alt={card.client}
            className="max-h-[24%] max-w-[72%] object-contain"
          />
        ) : card.tag === "Client work" && card.variant !== "image" ? (
          <p className="text-[clamp(1.5rem,calc(2.4*var(--vw)),2.25rem)] font-medium">
            {card.client}
          </p>
        ) : null}

        <span
          aria-hidden
          className="absolute right-2 top-2 grid size-9 place-items-center rounded-[4px] bg-white text-[var(--hll-dark-grey)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        >
          <ArrowUpRight className="size-4" strokeWidth={1.4} />
        </span>

        <span className="absolute bottom-[6px] left-[6px] inline-flex h-[34px] items-center rounded-[3px] bg-[var(--hll-bg)] px-[21px] text-[10px] uppercase leading-none tracking-[0.25em] text-[var(--hll-dark-grey)] lg:bottom-2 lg:left-2 lg:h-9 lg:rounded-[4px] lg:text-[12px]">
          {card.tag}
        </span>
      </div>

      <h3 className="mt-[9px] text-[24px] font-normal leading-[1.16] text-[var(--hll-dark-grey)] lg:mt-2 lg:text-[clamp(1.75rem,calc(2.38*var(--vw)),2.25rem)]">
        {card.title}
      </h3>
      <p className="mt-3 text-[14px] leading-[1.25] text-[var(--hll-dark-grey)] lg:text-[clamp(1rem,calc(1.32*var(--vw)),1.25rem)]">
        {card.description}
      </p>
    </article>
  );
}

export function EngagementSection({
  data,
  breadcrumb,
  variant,
}: {
  data: ServicePageData["engagement"];
  breadcrumb: readonly string[];
  variant: ServiceVariant;
}) {
  return (
    <section className="py-[84px] lg:py-[clamp(5.3125rem,calc(10.19*var(--vw)),9.625rem)]">
      {/* Figma Services mobile sets this section on an 8px gutter. */}
      <div className="px-2 lg:px-[clamp(1.25rem,calc(1.98*var(--vw)),1.875rem)]">
        <ServiceSectionHeading
          breadcrumb={breadcrumb}
          title={data.title}
          variant={variant}
        />
        <p className="mt-[10px] text-[14px] leading-[1.25] text-[var(--hll-dark-grey)] lg:mt-[25px] lg:max-w-[23rem] lg:text-[clamp(1rem,calc(1.32*var(--vw)),1.25rem)]">
          {data.intro}
        </p>
      </div>

      {/* Figma: two columns starting a third of the way across, running to
          10px from the right edge of the frame. */}
      <div className="mt-8 grid grid-cols-1 gap-x-[14px] gap-y-8 px-2 lg:ml-[33.66%] lg:mt-[clamp(2.625rem,calc(5.09*var(--vw)),4.8125rem)] lg:grid-cols-2 lg:gap-y-[clamp(1.625rem,calc(3.17*var(--vw)),3rem)] lg:px-0 lg:pr-[10px]">
        {data.cards.map((card) => (
          <EngagementCardView key={card.id} card={card} />
        ))}
      </div>
    </section>
  );
}
