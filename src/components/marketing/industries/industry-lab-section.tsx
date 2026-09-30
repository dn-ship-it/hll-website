import { HomeHeading } from "@/components/marketing/home/primitives";
import { SERVICE_GUTTER } from "@/components/marketing/services/service-chrome";
import type { IndustryPageData } from "@/types/industry";

/** Figma "Inside the Lab": 982px band on its ripple still, 1171 × 658 window. */
export function IndustryLabSection({
  data,
}: {
  data: IndustryPageData["lab"];
}) {
  return (
    <section
      className={`relative min-h-[982px] overflow-hidden pb-[79px] pt-[84px] ${SERVICE_GUTTER}`}
      style={{
        background:
          "#1FA7D8 url(/assets/industries/lab-bg.webp) center / cover",
      }}
    >
      <div className="[&_p:first-child]:!text-[var(--hll-light-grey)]">
        <HomeHeading eyebrow={data.eyebrow} title={data.title} tone="dark" />
      </div>
      <div className="mx-auto mt-[60px] aspect-[1171/658] w-full max-w-[1171px] overflow-hidden rounded-lg bg-[var(--hll-bg)]">
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
