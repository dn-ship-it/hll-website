import Link from "next/link";

import type { ServiceVariant } from "@/components/hll/variants";
import type { ExpertVoice, ServicePageData } from "@/data/services/types";

import { SERVICE_GUTTER, ServiceSectionHeading } from "./service-chrome";
import { getServiceTheme } from "./service-theme";
import { VoiceSection } from "./voice-carousel";

export { VoiceSection };

export function ExpertVoiceSection({
  data,
  more = [],
  breadcrumb,
  variant,
}: {
  data: ExpertVoice | null;
  /** Further testimonials after `data`, from the CMS's "More testimonials". */
  more?: readonly ExpertVoice[];
  breadcrumb: readonly string[];
  variant: ServiceVariant;
}) {
  if (!data) return null;
  const { accent } = getServiceTheme(variant);
  return (
    <VoiceSection
      slides={[data, ...more]}
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

export function RelatedServicesSection({
  items,
  title = "Related Capabilities",
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
