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
  const affiliation = [data.role, data.company].filter(Boolean).join(", ");

  return (
    <section className={`pb-[clamp(2.875rem,5.56vw,5.25rem)] ${SERVICE_GUTTER}`}>
      <div className="h-px bg-[var(--hll-mid-grey)]" />

      <div className="pt-[clamp(2.875rem,5.56vw,5.25rem)]">
        <ServiceSectionHeading breadcrumb={breadcrumb} title="Expert Voice" variant={variant} />
      </div>

      {/* Figma: counter + arrows | 300×400 portrait | 115px logo tile, with the
          quote starting at 60% of the frame. One quote per service today, so
          the carousel controls render in their resting state. */}
      <div className="mt-[clamp(2.875rem,5.56vw,5.25rem)] grid gap-[clamp(2rem,4vw,3rem)] lg:grid-cols-[878fr_574fr] lg:gap-0">
        <div className="flex items-start gap-[10px]">
          <div className="hidden w-9 shrink-0 sm:block" data-service-label>
            <p className="text-[12px] leading-none" style={{ color: accent }}>
              01/01
            </p>
            <p className="mt-1 flex justify-between text-[12px] leading-none text-[var(--hll-dark-grey)]" aria-hidden>
              <span>&lt;</span>
              <span>&gt;</span>
            </p>
          </div>
          {data.portrait ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={data.portrait}
              alt={data.name ?? data.role}
              className="aspect-[3/4] w-[clamp(10rem,19.8vw,18.75rem)] shrink-0 rounded-[4px] object-cover"
            />
          ) : (
            <MediaPlaceholder
              className="aspect-[3/4] w-[clamp(10rem,19.8vw,18.75rem)] shrink-0 rounded-[4px]"
              label="Expert portrait"
            />
          )}
          {data.company ? (
            <div className="grid aspect-square w-[clamp(4.5rem,7.6vw,7.2rem)] shrink-0 place-items-center rounded-[4px] bg-[#24477F] p-2 text-center text-[11px] text-white">
              {data.companyLogo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={data.companyLogo} alt={data.company} className="w-[92%] object-contain" />
              ) : (
                data.company
              )}
            </div>
          ) : null}
        </div>

        <blockquote className="flex flex-col justify-between gap-10 lg:pr-[20px]">
          <p className="text-[clamp(1.5rem,2.38vw,2.25rem)] font-normal leading-[1.17] text-[var(--hll-dark-grey)]">
            &ldquo;{data.quote}&rdquo;
          </p>
          <footer className="pb-[9px] text-[clamp(1rem,1.32vw,1.25rem)] leading-[1.25]">
            {data.name ? <cite className="block not-italic text-black">{data.name}</cite> : null}
            <span className="block text-[var(--hll-mid-grey)]">{affiliation}</span>
          </footer>
        </blockquote>
      </div>
    </section>
  );
}

export function RelatedServicesSection({ items }: { items: ServicePageData["relatedServices"] }) {
  // Figma paints this wash in place of the page's bottom shader overlay; it is
  // what lifts the light buttons off the page.
  return (
    <section
      className={`relative overflow-hidden pt-[clamp(5.1875rem,9.99vw,9.4375rem)] pb-[clamp(5.125rem,9.85vw,9.3125rem)] ${SERVICE_GUTTER}`}
      style={{ background: "linear-gradient(0deg, #B1B1B1 0%, #FAFAFA 100%)" }}
    >
      <div className="relative text-center">
        <h2 className="text-[clamp(1.75rem,2.38vw,2.25rem)] font-normal leading-[1.16] text-black">
          Related Services
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
