import { ArrowUpRight } from "lucide-react";

import type { ServiceVariant } from "@/components/hll/variants";
import type { ServicePageData } from "@/data/services/types";

import { SERVICE_GUTTER, ServiceSectionHeading } from "./service-chrome";

const MEDIA_STYLES = {
  navy: "bg-[#24477F] text-white",
  orange: "bg-[#F27620] text-white",
  image: "bg-[#e3e3e3] text-black",
} as const;

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
    <section className="pt-[clamp(5.3125rem,10.19vw,9.625rem)] pb-[clamp(5.3125rem,10.19vw,9.625rem)]">
      <div className={SERVICE_GUTTER}>
        <ServiceSectionHeading breadcrumb={breadcrumb} title={data.title} variant={variant} />
        <p className="mt-[25px] max-w-[23rem] text-[clamp(1rem,1.32vw,1.25rem)] leading-[1.25] text-[var(--hll-dark-grey)]">
          {data.intro}
        </p>
      </div>

      {/* Figma: two columns starting a third of the way across, running to
          10px from the right edge of the frame. */}
      <div className="mt-[clamp(2.625rem,5.09vw,4.8125rem)] grid grid-cols-1 gap-x-[14px] gap-y-[clamp(1.625rem,3.17vw,3rem)] px-[clamp(1.25rem,1.98vw,1.875rem)] sm:grid-cols-2 lg:ml-[33.66%] lg:px-0 lg:pr-[10px]">
        {data.cards.map((card) => (
          <article key={card.id} className="group">
            <div
              className={`relative grid aspect-[490/308] place-items-center overflow-hidden rounded-lg ${MEDIA_STYLES[card.variant]}`}
            >
              {card.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={card.image} alt="" className="absolute inset-0 size-full object-cover" />
              ) : card.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={card.logo} alt={card.client} className="max-h-[24%] max-w-[72%] object-contain" />
              ) : card.tag === "Client work" && card.variant !== "image" ? (
                <p className="text-[clamp(1.5rem,2.4vw,2.25rem)] font-medium">{card.client}</p>
              ) : null}

              <span
                aria-hidden
                className="absolute right-2 top-2 grid size-9 place-items-center rounded-[4px] bg-white text-[var(--hll-dark-grey)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              >
                <ArrowUpRight className="size-4" strokeWidth={1.4} />
              </span>

              <span className="absolute bottom-2 left-2 inline-flex h-9 items-center rounded-[4px] bg-[var(--hll-bg)] px-[21px] text-[12px] uppercase leading-none tracking-[0.25em] text-[var(--hll-dark-grey)]">
                {card.tag}
              </span>
            </div>

            <h3 className="mt-2 text-[clamp(1.75rem,2.38vw,2.25rem)] font-normal leading-[1.16] text-[var(--hll-dark-grey)]">
              {card.title}
            </h3>
            <p className="mt-3 text-[clamp(1rem,1.32vw,1.25rem)] leading-[1.25] text-[var(--hll-dark-grey)]">
              {card.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
