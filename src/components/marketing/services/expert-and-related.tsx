import { HLLButton } from "@/components/hll";
import { SERVICE_VARIANTS, type HLLVariant, type ServiceVariant } from "@/components/hll/variants";
import { BUTTON_MOBILE } from "@/components/marketing/button-sizes";
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
      // QA T-03: the timer bar under the portrait, and the slides turn on
      // their own, as on Industry pages.
      timerColor={accent}
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

/** A related link's palette: its capability's (/services/hll-ai → hll-ai), or
 *  the Industries palette for an industry. */
function relatedVariant(href: string): HLLVariant {
  const slug = href.match(/^\/services\/([^/#?]+)/)?.[1];
  if (slug && (SERVICE_VARIANTS as readonly string[]).includes(slug)) return slug as ServiceVariant;
  return href.startsWith("/industries") ? "industries" : "services";
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
            // QA C-18: the site's light-up button, in the colours of the
            // capability (or industry) it leads to.
            <HLLButton
              key={item.label}
              href={item.href}
              variant={relatedVariant(item.href)}
              size="md"
              className={BUTTON_MOBILE}
            >
              {item.label}
            </HLLButton>
          ))}
        </div>
      </div>
    </section>
  );
}
