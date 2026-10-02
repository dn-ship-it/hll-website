import { HomeHeading } from "@/components/marketing/home/primitives";
import { CapabilityNav } from "@/components/marketing/services/capability-nav";
import { EngagementCardView } from "@/components/marketing/services/engagement-section";
import { SERVICE_GUTTER } from "@/components/marketing/services/service-chrome";
import type { IndustryPageData } from "@/types/industry";

/**
 * Figma Industry "Capabilities": a service list on the left and, per service,
 * a row of number + hairline, title, body and two engagement cards. Columns at
 * the 1512px frame: list 436 | number 51 | title 493 | body/card 490.
 */
export function IndustryCapabilitiesSection({
  data,
  accentColor,
}: {
  data: IndustryPageData["capabilities"];
  accentColor: string;
}) {
  return (
    <section className="pt-[84px] lg:pt-[clamp(5.375rem,calc(10.19*var(--vw)),9.625rem)]">
      <div className={SERVICE_GUTTER}>
        <HomeHeading eyebrow={data.eyebrow} title={data.title} />
      </div>

      {/* Figma Industry mobile: the service row 29px under the heading, the
          first service 54px below it. */}
      <div className="mt-[29px] grid grid-cols-[minmax(0,1fr)] gap-[54px] px-[clamp(1.25rem,calc(1.98*var(--vw)),1.875rem)] lg:mt-[72px] lg:grid-cols-[436fr_1036fr] lg:gap-0 lg:pr-[10px]">
        {/* Figma: "as you scroll it highlights according to the section you
            are in". Labels without a capability row yet stay unlinked. */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <CapabilityNav
            mobileRow
            accent={accentColor}
            items={data.sidebar.map((label) => ({
              id: data.items.find((item) => item.title === label)?.id ?? "",
              title: label,
            }))}
          />
        </div>

        <div>
          {data.items.map((item) => (
            <article
              key={item.id}
              id={item.id}
              className="grid scroll-mt-28 grid-cols-[minmax(0,1fr)] pb-8 lg:grid-cols-[51fr_493fr_490fr] lg:pb-[72px]"
            >
              {/* Mobile: no index, the hairline runs to the screen edge. */}
              <div className="-mr-5 flex items-center gap-3 lg:col-span-3 lg:mr-0 lg:grid lg:grid-cols-subgrid lg:gap-0">
                <span
                  className="hidden text-[12px] font-medium leading-[1.2] lg:inline"
                  style={{
                    color: accentColor,
                    fontFamily: "var(--hll-font-functional)",
                  }}
                  data-service-label
                >
                  {item.index}
                </span>
                <span
                  aria-hidden
                  data-line
                  className="h-px flex-1 bg-[var(--hll-mid-grey)] lg:col-span-2"
                />
              </div>
              <h3 className="mt-3 text-[24px] font-normal leading-[1.16] text-black lg:col-start-2 lg:mt-9 lg:text-[clamp(1.75rem,calc(2.38*var(--vw)),2.25rem)]">
                {item.title}
              </h3>
              <p className="mt-4 max-w-[368px] text-[14px] leading-[1.25] text-[var(--hll-dark-grey)] lg:col-start-3 lg:mt-9 lg:text-[clamp(1rem,calc(1.32*var(--vw)),1.25rem)]">
                {item.description}
              </p>
              {/* Mobile: the cards swipe, 289px wide and 10px apart, running
                  off the right edge. */}
              <div className="-mr-5 mt-8 flex snap-x snap-mandatory gap-[10px] overflow-x-auto pr-5 [scrollbar-width:none] lg:col-span-2 lg:col-start-2 lg:mr-0 lg:-ml-[5px] lg:mt-[64px] lg:grid lg:grid-cols-2 lg:gap-2 lg:overflow-visible lg:pr-0 [&::-webkit-scrollbar]:hidden">
                {item.cards.map((card) => (
                  <div key={card.id} className="w-[289px] shrink-0 snap-start lg:w-auto">
                    <EngagementCardView card={card} />
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
