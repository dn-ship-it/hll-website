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
  wide = false,
  headingInset = false,
}: {
  data: ExpertVoice;
  heading: React.ReactNode;
  counterColor?: string;
  slideCount?: number;
  /** Hairline above the section (Careers' Team Voice has none). */
  divider?: boolean;
  /** Industry pages show the carousel's timer bar under the portrait. */
  timerColor?: string;
  /** Figma Industry mobile: a 253px square portrait at x 75 (Services: 245 × 253 at x 79). */
  wide?: boolean;
  /** Industry / Careers mobile set the heading in the 20px gutter (Services: 8px). */
  headingInset?: boolean;
}) {
  const accent = counterColor;
  const affiliation = [data.role, data.company].filter(Boolean).join(", ");

  return (
    // Figma Services mobile: an 8px gutter, the counter at x 34, a 245 × 253
    // portrait at x 79 and a 57px logo tile on the right edge, the quote
    // indented under the portrait. On narrower phones the portrait gives way
    // so it always clears the logo tile by 8px.
    <section
      className={`px-2 lg:px-[clamp(1.25rem,calc(1.98*var(--vw)),1.875rem)] lg:pb-[clamp(2.875rem,calc(5.56*var(--vw)),5.25rem)] ${timerColor ? "pb-[84px]" : "pb-[11px]"}`}
    >
      {divider ? (
        <div data-line className="h-px bg-[var(--hll-mid-grey)]" />
      ) : null}

      <div
        className={`${divider ? "pt-[87px] lg:pt-[clamp(2.875rem,calc(5.56*var(--vw)),5.25rem)]" : ""} ${headingInset ? "px-3 lg:px-0" : ""}`}
      >
        {heading}
      </div>

      {/* Figma: counter + arrows | 300×400 portrait | 115px logo tile, with the
          quote starting at 60% of the frame. One quote per service today, so
          the carousel controls render in their resting state. */}
      <div className="mt-6 grid gap-4 lg:mt-[clamp(2.875rem,calc(5.56*var(--vw)),5.25rem)] lg:grid-cols-[878fr_574fr] lg:gap-0">
        <div className="relative h-[253px] lg:flex lg:h-auto lg:items-start lg:gap-[10px]">
          <div className="absolute left-[26px] top-1 w-[30px] lg:static lg:w-9 lg:shrink-0" data-service-label>
            <p className="text-[10px] leading-[12px] lg:text-[12px] lg:leading-none" style={{ color: accent }}>
              01/{String(slideCount).padStart(2, "0")}
            </p>
            <p
              className="flex justify-between text-[10px] leading-[12px] text-[var(--hll-dark-grey)] lg:mt-1 lg:text-[12px] lg:leading-none"
              aria-hidden
            >
              <span>&lt;</span>
              <span>&gt;</span>
            </p>
          </div>
          <div
            className={`absolute top-0 lg:static lg:w-[clamp(10rem,calc(19.8*var(--vw)),18.75rem)] lg:shrink-0 ${wide ? "left-[67px] w-[min(253px,calc(100%-132px))]" : "left-[71px] w-[min(245px,calc(100%-136px))]"}`}
          >
            {data.portrait ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={data.portrait}
                alt={data.name ?? data.role}
                className={`w-full rounded-[6px] object-cover lg:aspect-[3/4] lg:rounded-[4px] ${wide ? "aspect-square" : "aspect-[245/253]"}`}
              />
            ) : (
              <MediaPlaceholder
                className={`w-full rounded-[6px] lg:aspect-[3/4] lg:rounded-[4px] ${wide ? "aspect-square" : "aspect-[245/253]"}`}
                label="Expert portrait"
              />
            )}
            {timerColor ? (
              <VoiceTimer color={timerColor} className="mt-2 hidden lg:block" />
            ) : null}
          </div>
          {data.company ? (
            <div className="absolute right-0 top-0 grid aspect-square w-[57px] place-items-center rounded-[6px] bg-[#24477F] p-1 text-center text-[9px] text-white lg:static lg:w-[clamp(4.5rem,calc(7.6*var(--vw)),7.2rem)] lg:shrink-0 lg:rounded-[4px] lg:p-2 lg:text-[11px]">
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

        <blockquote className="ml-[67px] flex max-w-[311px] flex-col justify-between gap-4 lg:ml-0 lg:max-w-none lg:gap-10 lg:pr-[20px]">
          <p className="text-[24px] font-normal leading-[27.8px] text-[var(--hll-dark-grey)] lg:text-[clamp(1.5rem,calc(2.38*var(--vw)),2.25rem)] lg:leading-[1.17]">
            &ldquo;{data.quote}&rdquo;
          </p>
          <footer className="text-[14px] leading-[1.25] lg:pb-[9px] lg:text-[clamp(1rem,calc(1.32*var(--vw)),1.25rem)]">
            {data.name ? (
              <cite className="block not-italic text-black">{data.name}</cite>
            ) : null}
            <span className="block text-[var(--hll-mid-grey)]">
              {affiliation}
            </span>
          </footer>
        </blockquote>
        {/* Figma Industry mobile: the timer sits 54px under the name. */}
        {timerColor ? (
          <VoiceTimer color={timerColor} className="ml-[67px] mt-[38px] lg:hidden" />
        ) : null}
      </div>
    </section>
  );
}

/** Figma: "carousel with timer delay" — a 103 × 2 track filling in the page
 *  colour until the next testimonial. */
function VoiceTimer({ color, className }: { color: string; className: string }) {
  return (
    <div className={`h-[2px] w-[103px] overflow-hidden rounded bg-black/20 ${className}`}>
      <div
        className="h-full [animation:voice-timer_6s_linear_infinite]"
        style={{ background: color }}
      />
    </div>
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
      className={`relative overflow-hidden pb-[163px] pt-[193px] lg:pb-[clamp(5.125rem,calc(9.85*var(--vw)),9.3125rem)] lg:pt-[clamp(5.1875rem,calc(9.99*var(--vw)),9.4375rem)] ${SERVICE_GUTTER}`}
      style={{
        background: `linear-gradient(0deg, ${washFrom} 0%, #FAFAFA 100%)`,
      }}
    >
      <div className="relative text-center">
        <h2 className="text-[24px] font-normal leading-[1.16] text-black lg:text-[clamp(1.75rem,calc(2.38*var(--vw)),2.25rem)]">
          {title}
        </h2>
        {/* Mobile: "Button Mobile" pills, 34px and 6px apart. */}
        <div className="mx-auto mt-3 flex max-w-[37rem] flex-wrap justify-center gap-[6px] lg:mt-9 lg:gap-2">
          {items.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="inline-flex h-[34px] items-center rounded-[3px] bg-[var(--hll-bg)] px-[21px] text-[10px] uppercase leading-none tracking-[0.25em] text-[var(--hll-dark-grey)] transition hover:bg-white lg:h-9 lg:rounded-[4px] lg:text-[12px]"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
