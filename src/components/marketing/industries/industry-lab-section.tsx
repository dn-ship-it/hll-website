import { HomeHeading } from "@/components/marketing/home/primitives";
import { SERVICE_GUTTER } from "@/components/marketing/services/service-chrome";
import type { IndustryPageData } from "@/types/industry";

/** Figma "Inside the Lab": one screen-high band on its ripple still, a 1171 × 658 window.
 *  Mobile: a 395px band, the 312 × 238 window 32px under the heading. */
export function IndustryLabSection({
  data,
}: {
  data: IndustryPageData["lab"];
}) {
  return (
    <section
      className={`relative overflow-hidden pb-10 pt-8 lg:min-h-[calc(100*var(--svh)-var(--nav-h))] lg:pb-[79px] lg:pt-[84px] ${SERVICE_GUTTER}`}
      style={{
        background:
          "#1FA7D8 url(/assets/industries/lab-bg.webp) center / cover",
      }}
    >
      <div className="[&_p:first-child]:!text-[var(--hll-light-grey)]">
        <HomeHeading eyebrow={data.eyebrow} title={data.title} tone="dark" />
      </div>
      {/* QA I-08: back to the design's centred 1171 × 658 window, and never
          taller than the screen leaves under the heading, so the whole demo
          sits in view on smaller laptops. */}
      <div className="mt-8 aspect-[312/238] w-full overflow-hidden rounded-[6px] bg-[var(--hll-bg)] lg:mx-auto lg:mt-[60px] lg:aspect-[1171/658] lg:w-[min(calc(77.45*var(--vw)),calc((100*var(--svh)-var(--nav-h)-330px)*1.7796))] lg:rounded-lg">
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
