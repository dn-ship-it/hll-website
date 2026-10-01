import type { ServiceVariant } from "@/components/hll/variants";
import type { ServicePageData, ServiceTool } from "@/data/services/types";

import { CapabilityNav } from "./capability-nav";
import { SERVICE_GUTTER, ServiceSectionHeading } from "./service-chrome";
import { getServiceTheme } from "./service-theme";

// Figma service template columns at 1512px: nav list 436 | index 45 |
// title 500 | body 366 | empty 105. Expressed as fractions so the proportions
// hold at other desktop widths.
const ROW_GRID = "lg:grid-cols-[45fr_500fr_366fr_105fr]";

/** Figma pill: Mid Grey hairline, 18px radius, logo then name, 12px in. */
function ToolPill({ tool }: { tool: ServiceTool }) {
  return (
    <span className="inline-flex h-[33px] items-center gap-[11px] rounded-[18px] border border-[var(--hll-mid-grey)] px-3 text-[18.6px] leading-[1.25] text-[var(--hll-dark-grey)]">
      {tool.icon ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={tool.icon} alt="" className="h-5 max-w-6 object-contain" />
      ) : null}
      {tool.name}
    </span>
  );
}

export function CapabilitiesSection({
  data,
  breadcrumb,
  variant,
}: {
  data: ServicePageData["capabilities"];
  breadcrumb: readonly string[];
  variant: ServiceVariant;
}) {
  const { accent } = getServiceTheme(variant);

  return (
    <section
      id="capabilities"
      className={`pt-[clamp(5.375rem,calc(10.32*var(--vw)),9.75rem)] pb-[clamp(3rem,calc(5.75*var(--vw)),5.4375rem)] ${SERVICE_GUTTER}`}
    >
      <ServiceSectionHeading
        breadcrumb={breadcrumb}
        title={data.title}
        variant={variant}
      />

      <div className="mt-[clamp(2.5rem,calc(4.76*var(--vw)),4.5rem)] grid gap-[clamp(2rem,calc(5*var(--vw)),4rem)] lg:grid-cols-[436fr_1016fr] lg:gap-0">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <CapabilityNav items={data.items} accent={accent} />
        </div>

        <div>
          {data.items.map((item) => (
            <article
              key={item.id}
              id={item.id}
              className={`grid scroll-mt-28 grid-cols-1 pb-[clamp(2.3125rem,calc(4.43*var(--vw)),4.1875rem)] ${ROW_GRID}`}
            >
              <CapabilityRule index={item.index} accent={accent} />
              <h3 className="mt-[clamp(0.8125rem,calc(1.59*var(--vw)),1.5rem)] text-[clamp(1.75rem,calc(2.38*var(--vw)),2.25rem)] font-normal leading-[1.16] text-black lg:col-start-2 lg:pr-8">
                {item.title}
              </h3>
              <div className="mt-4 lg:col-start-3 lg:mt-[clamp(0.8125rem,calc(1.59*var(--vw)),1.5rem)]">
                <p className="text-[clamp(1rem,calc(1.32*var(--vw)),1.25rem)] leading-[1.25] text-[var(--hll-dark-grey)]">
                  {item.description}
                </p>
                <SubServices items={item.subServices} />
              </div>
            </article>
          ))}

          {data.tools ? (
            <article
              className={`grid scroll-mt-28 grid-cols-1 pb-[clamp(2.3125rem,calc(4.43*var(--vw)),4.1875rem)] ${ROW_GRID}`}
            >
              <CapabilityRule accent={accent} />
              <h3 className="mt-[clamp(0.8125rem,calc(1.59*var(--vw)),1.5rem)] text-[clamp(1.75rem,calc(2.38*var(--vw)),2.25rem)] font-normal leading-[1.16] text-black lg:col-start-2">
                Tools and Technologies
              </h3>
              <div className="mt-6 space-y-9 lg:col-start-3 lg:mt-[clamp(0.8125rem,calc(1.59*var(--vw)),1.5rem)]">
                <ToolGroup label="Cloud" tools={data.tools.cloud} />
                <ToolGroup label="Data" tools={data.tools.data} />
              </div>
            </article>
          ) : null}
        </div>
      </div>
    </section>
  );
}

/** "01/04" in the service colour, then a Mid Grey hairline to the body's right edge. */
function CapabilityRule({ index, accent }: { index?: string; accent: string }) {
  return (
    <div className="flex h-6 items-center gap-3 lg:col-span-3 lg:grid lg:grid-cols-subgrid lg:items-center lg:gap-0">
      <span
        className="shrink-0 text-[12px] leading-[1.2]"
        style={{ color: accent, fontFamily: "var(--hll-font-functional)" }}
        data-service-label
      >
        {index}
      </span>
      <span
        aria-hidden
        data-line
        className="h-px flex-1 bg-[var(--hll-mid-grey)] lg:col-span-2"
      />
    </div>
  );
}

/** Figma: the group name at 20px, then its pills 11px apart. */
function ToolGroup({
  label,
  tools,
}: {
  label: string;
  tools: readonly ServiceTool[];
}) {
  return (
    <div>
      <p className="text-[clamp(1rem,calc(1.32*var(--vw)),1.25rem)] leading-[1.25] text-[var(--hll-dark-grey)]">
        {label}
      </p>
      <div className="mt-4 flex flex-wrap gap-[11px]">
        {tools.map((tool) => (
          <ToolPill key={tool.name} tool={tool} />
        ))}
      </div>
    </div>
  );
}

/** Foundation's sub-services carry a body, so they render as a two-column list;
    the other verticals are name-only and render as Figma's bulleted list. */
function SubServices({
  items,
}: {
  items?: ServicePageData["capabilities"]["items"][number]["subServices"];
}) {
  if (!items || items.length === 0) return null;

  const hasDescriptions = items.some((sub) => sub.description);

  if (!hasDescriptions) {
    return (
      <ul className="mt-[clamp(0.8125rem,calc(1.59*var(--vw)),1.5rem)] text-[14px] leading-[28px] text-[var(--hll-mid-grey)]">
        {items.map((sub) => (
          <li key={sub.name} className="flex gap-[9px]">
            <span aria-hidden>•</span>
            {sub.name}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <dl className="mt-6 grid gap-x-[clamp(1.5rem,calc(3*var(--vw)),2.5rem)] gap-y-5 sm:grid-cols-2">
      {items.map((sub) => (
        <div key={sub.name}>
          <dt className="text-[11px] uppercase tracking-[0.16em] text-black/70">
            {sub.name}
          </dt>
          {sub.description ? (
            <dd className="mt-2 text-sm leading-6 text-black/50">
              {sub.description}
            </dd>
          ) : null}
        </div>
      ))}
    </dl>
  );
}
