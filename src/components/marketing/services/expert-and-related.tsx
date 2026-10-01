import Link from "next/link";

import type { ServiceVariant } from "@/components/hll/variants";
import type { ExpertVoice, ServicePageData } from "@/data/services/types";
import { MediaPlaceholder } from "@/components/marketing/home/primitives";

import { SERVICE_GUTTER, ServiceSectionHeading } from "./service-chrome";
import { getServiceTheme } from "./service-theme";

export function ExpertVoiceSection({
  data,
  breadcrumb,
  variant,
}: {
  data: ExpertVoice | null;
  breadcrumb: readonly string[];
  variant: ServiceVariant;
}) {
  if (!data) return null;
  const { accent } = getServiceTheme(variant);
  return (
    <VoiceSection
      data={data}
      counterColor={accent}
      heading={
        <ServiceSectionHeading
          breadcrumb={breadcrumb}
          title="Expert Voice"
          variant={variant}
        />
      }
    />
  );
}

/**
 * Figma testimonial block (service "Expert Voice", industry "Client Voice"):
 * counter + arrows, 300×400 portrait, 115px logo tile, quote from 60% across.
 */
export function VoiceSection({
  data,
  heading,
  counterColor = "var(--hll-dark-grey)",
  timerColor,
  slideCount = 1,
  divider = true,
}: {
  data: ExpertVoice;
  heading: React.ReactNode;
  counterColor?: string;
  slideCount?: number;
  /** Hairline above the section (Careers' Team Voice has none). */
  divider?: boolean;
  /** Industry pages show the carousel's timer bar under the portrait. */
  timerColor?: string;
}) {
  const accent = counterColor;
  const affiliation = [data.role, data.company].filter(Boolean).join(", ");

  return (
    <section
      className={`pb-[clamp(2.875rem,calc(5.56*var(--vw)),5.25rem)] ${SERVICE_GUTTER}`}
    >
      {divider ? (
        <div data-line className="h-px bg-[var(--hll-mid-grey)]" />
      ) : null}

      <div
        className={divider ? "pt-[clamp(2.875rem,calc(5.56*var(--vw)),5.25rem)]" : undefined}
      >
        {heading}
      </div>

      {/* Figma: counter + arrows | 300×400 portrait | 115px logo tile, with the
          quote starting at 60% of the frame. One quote per service today, so
          the carousel controls render in their resting state. */}
      <div className="mt-[clamp(2.875rem,calc(5.56*var(--vw)),5.25rem)] grid gap-[clamp(2rem,calc(4*var(--vw)),3rem)] lg:grid-cols-[878fr_574fr] lg:gap-0">
        <div className="flex items-start gap-[10px]">
          <div className="hidden w-9 shrink-0 sm:block" data-service-label>
            <p className="text-[12px] leading-none" style={{ color: accent }}>
              01/{String(slideCount).padStart(2, "0")}
            </p>
            <p
              className="mt-1 flex justify-between text-[12px] leading-none text-[var(--hll-dark-grey)]"
              aria-hidden
            >
              <span>&lt;</span>
              <span>&gt;</span>
            </p>
          </div>
          <div className="w-[clamp(10rem,calc(19.8*var(--vw)),18.75rem)] shrink-0">
            {data.portrait ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={data.portrait}
                alt={data.name ?? data.role}
                className="aspect-[3/4] w-full rounded-[4px] object-cover"
              />
            ) : (
              <MediaPlaceholder
                className="aspect-[3/4] w-full rounded-[4px]"
                label="Expert portrait"
              />
            )}
            {timerColor ? (
              // Figma: "carousel with timer delay" — 103 × 2 track, filling
              // in the page colour until the next testimonial.
              <div className="mt-2 h-[2px] w-[103px] overflow-hidden rounded bg-black/20">
                <div
                  className="h-full [animation:voice-timer_6s_linear_infinite]"
                  style={{ background: timerColor }}
                />
              </div>
            ) : null}
          </div>
          {data.company ? (
            <div className="grid aspect-square w-[clamp(4.5rem,calc(7.6*var(--vw)),7.2rem)] shrink-0 place-items-center rounded-[4px] bg-[#24477F] p-2 text-center text-[11px] text-white">
              {data.companyLogo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={data.companyLogo}
                  alt={data.company}
                  className="w-[92%] object-contain"
                />
              ) : (
                data.company
              )}
            </div>
          ) : null}
        </div>

        <blockquote className="flex flex-col justify-between gap-10 lg:pr-[20px]">
          <p className="text-[clamp(1.5rem,calc(2.38*var(--vw)),2.25rem)] font-normal leading-[1.17] text-[var(--hll-dark-grey)]">
            &ldquo;{data.quote}&rdquo;
          </p>
          <footer className="pb-[9px] text-[clamp(1rem,calc(1.32*var(--vw)),1.25rem)] leading-[1.25]">
            {data.name ? (
              <cite className="block not-italic text-black">{data.name}</cite>
            ) : null}
            <span className="block text-[var(--hll-mid-grey)]">
              {affiliation}
            </span>
          </footer>
        </blockquote>
      </div>
    </section>
  );
}

export function RelatedServicesSection({
  items,
  title = "Related Services",
  washFrom = "#B1B1B1",
}: {
  items: ServicePageData["relatedServices"];
  title?: string;
  /** Industry pages wash from their own colour (Figma "Industry Colours"). */
  washFrom?: string;
}) {
  // Figma paints this wash in place of the page's bottom shader overlay; it is
  // what lifts the light buttons off the page.
  return (
    <section
      className={`relative overflow-hidden pt-[clamp(5.1875rem,calc(9.99*var(--vw)),9.4375rem)] pb-[clamp(5.125rem,calc(9.85*var(--vw)),9.3125rem)] ${SERVICE_GUTTER}`}
      style={{
        background: `linear-gradient(0deg, ${washFrom} 0%, #FAFAFA 100%)`,
      }}
    >
      <div className="relative text-center">
        <h2 className="text-[clamp(1.75rem,calc(2.38*var(--vw)),2.25rem)] font-normal leading-[1.16] text-black">
          {title}
        </h2>
        <div className="mx-auto mt-9 flex max-w-[37rem] flex-wrap justify-center gap-2">
          {items.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="inline-flex h-9 items-center rounded-[4px] bg-[var(--hll-bg)] px-[21px] text-[12px] uppercase leading-none tracking-[0.25em] text-[var(--hll-dark-grey)] transition hover:bg-white"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
