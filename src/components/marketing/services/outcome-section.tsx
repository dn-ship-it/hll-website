import { Ripple, SERVICE_TO_RIPPLE } from "@/components/hll";
import type { ServiceVariant } from "@/components/hll/variants";
import type { ServicePageData } from "@/data/services/types";
import { CountUp } from "@/components/marketing/count-up";
import { MediaPlaceholder } from "@/components/marketing/home/primitives";

import { SERVICE_GUTTER, ServiceSectionHeading } from "./service-chrome";
import { RIPPLE_FILL, RIPPLE_OPACITY, getServiceTheme } from "./service-theme";

/**
 * Figma sets a trailing "%" at roughly half the stat size ("60%"). A trailing
 * unit word ("5+ Years") gets the same treatment so it stays on one line in a
 * 366px card instead of wrapping at display size.
 */
function Stat({ value }: { value: string }) {
  // "%" or a whole unit word ("Years", "Days"); a single letter such as the
  // "x" in "Up to 8x" stays at display size with its number.
  const match = value.match(/^(.*?\d\+?)\s*(%|[A-Za-z]{2,}.*)$/);
  const main = match ? match[1] : value;
  const unit = match ? match[2] : "";

  return (
    <p className="text-[104px] font-light leading-[1.16] text-black lg:text-[clamp(3.5rem,calc(6.88*var(--vw)),6.5rem)]">
      {/* Figma: "Number counter". */}
      <CountUp value={main} />
      {unit ? (
        <span className="text-[0.55em] tracking-normal">
          {unit === "%" ? unit : ` ${unit}`}
        </span>
      ) : null}
    </p>
  );
}

export function OutcomeSection({
  data,
  breadcrumb,
  variant = "hll-foundation",
}: {
  data: ServicePageData["outcomes"];
  breadcrumb: readonly string[];
  variant?: ServiceVariant;
}) {
  const { outcomeBackground } = getServiceTheme(variant);

  return (
    <section
      className="relative overflow-hidden py-10 lg:pb-[clamp(5.9375rem,calc(11.38*var(--vw)),10.75rem)] lg:pt-[clamp(2.875rem,calc(5.56*var(--vw)),5.25rem)]"
      style={{ background: outcomeBackground }}
    >
      {/* Figma: "Live centered ripple animation in the back according to the
          colours of the service", over the frame's own still. */}
      <Ripple
        variant={SERVICE_TO_RIPPLE[variant]}
        origin="center"
        contained
        className={RIPPLE_FILL}
        style={{ opacity: RIPPLE_OPACITY }}
      />

      <div className={`relative ${SERVICE_GUTTER}`}>
        <ServiceSectionHeading
          breadcrumb={breadcrumb}
          title={data.title}
          variant={variant}
          tone="dark"
        />
      </div>

      {/* Figma: cards run to 10px from the frame edge, 10px apart, and each is
          only as tall as its content — the uneven heights are intentional.
          Mobile: one column in the 20px gutter, 9px between the parts. */}
      <div className="relative mt-8 grid grid-cols-1 items-start gap-[10px] px-5 lg:mt-[clamp(2.8125rem,calc(5.42*var(--vw)),5.125rem)] lg:grid-cols-4 lg:px-[10px]">
        {data.cards.map((card) => (
          <article
            key={card.stat}
            className="flex flex-col rounded-[6px] bg-[var(--hll-bg)] pb-[17px] pl-[22px] pr-[18px] pt-[27px] lg:rounded-lg lg:pb-7 lg:pl-5 lg:pr-6"
          >
            <Stat value={card.stat} />
            {card.hasMedia ? (
              <MediaPlaceholder className="mt-[9px] aspect-[320/234] w-full rounded-[4px] bg-[#d9d9d9] lg:mt-0" />
            ) : null}
            <p
              className={`text-[14px] leading-[1.25] text-[var(--hll-dark-grey)] lg:text-[clamp(1rem,calc(1.32*var(--vw)),1.25rem)] ${
                card.hasMedia ? "mt-[9px] lg:mt-[17px]" : "lg:mt-[14px]"
              }`}
            >
              {card.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
