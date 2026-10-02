import { HomeHeading } from "@/components/marketing/home/primitives";
import { SERVICE_GUTTER } from "@/components/marketing/services/service-chrome";
import type { IndustryPageData } from "@/types/industry";

/** Figma "Inside the Lab": 982px band on its ripple still, 1171 × 658 window.
 *  Mobile: a 395px band, the 312 × 238 window 32px under the heading. */
export function IndustryLabSection({
  data,
}: {
  data: IndustryPageData["lab"];
}) {
  return (
    <section
      className={`relative overflow-hidden pb-10 pt-8 lg:min-h-[982px] lg:pb-[79px] lg:pt-[84px] ${SERVICE_GUTTER}`}
      style={{
        background:
          "#1FA7D8 url(/assets/industries/lab-bg.webp) center / cover",
      }}
    >
      <div className="[&_p:first-child]:!text-[var(--hll-light-grey)]">
        <HomeHeading eyebrow={data.eyebrow} title={data.title} tone="dark" />
      </div>
      <div className="mx-auto mt-8 aspect-[312/238] w-full max-w-[312px] overflow-hidden rounded-[6px] bg-[var(--hll-bg)] lg:mt-[60px] lg:aspect-[1171/658] lg:max-w-[1171px] lg:rounded-lg">
        <iframe
          title={`${data.selectorLabel} lab demo`}
          src={data.demoUrl}
          sandbox="allow-scripts allow-same-origin allow-forms allow-modals"
          loading="lazy"
          className="block size-full border-0"
        />
      </div>
    </section>
  );
}
