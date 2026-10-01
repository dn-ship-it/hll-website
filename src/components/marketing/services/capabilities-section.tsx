import type { ServiceVariant } from "@/components/hll/variants";
import type { ServicePageData, ServiceTool } from "@/data/services/types";

import { CapabilityNav } from "./capability-nav";
import { SERVICE_GUTTER, ServiceSectionHeading } from "./service-chrome";
import { getServiceTheme } from "./service-theme";

// Figma service template columns at 1512px: nav list 436 | index 45 |
// title 500 | body 366 | empty 105. Expressed as fractions so the proportions
// hold at other desktop widths.
const ROW_GRID = "lg:grid-cols-[45fr_500fr_366fr_105fr]";

/** Figma pill: Mid Grey hairline, 18px radius, logo then name, 12px in.
 *  Mobile: 27px tall, 14.9px name, 10px in. */
function ToolPill({ tool }: { tool: ServiceTool }) {
  return (
    <span className="inline-flex h-[27px] items-center gap-[9px] rounded-[16px] border-[0.75px] border-[var(--hll-mid-grey)] px-[10px] text-[14.87px] leading-[1.25] text-[var(--hll-dark-grey)] lg:h-[33px] lg:gap-[11px] lg:rounded-[18px] lg:border lg:px-3 lg:text-[18.6px]">
      {tool.icon ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={tool.icon} alt="" className="h-4 max-w-5 object-contain lg:h-5 lg:max-w-6" />
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
      className={`pb-[52px] pt-[84px] lg:pb-[clamp(3rem,calc(5.75*var(--vw)),5.4375rem)] lg:pt-[clamp(5.375rem,calc(10.32*var(--vw)),9.75rem)] ${SERVICE_GUTTER}`}
    >
      <ServiceSectionHeading
        breadcrumb={breadcrumb}
        title={data.title}
        variant={variant}
      />

      <div className="mt-8 grid gap-[clamp(2rem,calc(5*var(--vw)),4rem)] lg:mt-[clamp(2.5rem,calc(4.76*var(--vw)),4.5rem)] lg:grid-cols-[436fr_1016fr] lg:gap-0">
        <div className="hidden lg:sticky lg:top-24 lg:block lg:self-start">
          <CapabilityNav items={data.items} accent={accent} />
        </div>

        <div>
          {data.items.map((item) => (
            <article
              key={item.id}
              id={item.id}
              className={`grid scroll-mt-28 grid-cols-1 pb-8 pl-[54px] lg:pb-[clamp(2.3125rem,calc(4.43*var(--vw)),4.1875rem)] lg:pl-0 ${ROW_GRID}`}
            >
              <CapabilityRule index={item.index} accent={accent} />
              <h3 className="mt-[6px] text-[24px] font-normal leading-[1.16] text-black lg:mt-[clamp(0.8125rem,calc(1.59*var(--vw)),1.5rem)] lg:text-[clamp(1.75rem,calc(2.38*var(--vw)),2.25rem)] lg:col-start-2 lg:pr-8">
                {item.title}
              </h3>
              <div className="mt-3 lg:col-start-3 lg:mt-[clamp(0.8125rem,calc(1.59*var(--vw)),1.5rem)]">
                <p className="text-[14px] leading-[1.25] text-[var(--hll-dark-grey)] lg:text-[clamp(1rem,calc(1.32*var(--vw)),1.25rem)]">
                  {item.description}
                </p>
                <SubServices items={item.subServices} />
              </div>
            </article>
          ))}

          {data.tools ? (
            <article
              className={`grid scroll-mt-28 grid-cols-1 pb-8 pl-[54px] lg:pb-[clamp(2.3125rem,calc(4.43*var(--vw)),4.1875rem)] lg:pl-0 ${ROW_GRID}`}
            >
              <CapabilityRule accent={accent} />
              <h3 className="mt-[6px] text-[24px] font-normal leading-[1.16] text-black lg:mt-[clamp(0.8125rem,calc(1.59*var(--vw)),1.5rem)] lg:text-[clamp(1.75rem,calc(2.38*var(--vw)),2.25rem)] lg:col-start-2">
                Tools and Technologies
              </h3>
              <div className="mt-3 space-y-8 lg:col-start-3 lg:mt-[clamp(0.8125rem,calc(1.59*var(--vw)),1.5rem)] lg:space-y-9">
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

/** "01/04" in the service colour, then a Mid Grey hairline to the body's right
 *  edge. Mobile hangs the index at x 36, the hairline from the text at x 74. */
function CapabilityRule({ index, accent }: { index?: string; accent: string }) {
  return (
    <div className="relative flex h-3 items-center lg:col-span-3 lg:grid lg:h-6 lg:grid-cols-subgrid lg:items-center lg:gap-0">
      <span
        className="absolute -left-[38px] top-0 shrink-0 text-[10px] font-medium leading-[1.2] lg:static lg:text-[12px] lg:font-normal"
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
      <p className="text-[14px] leading-[28px] text-[var(--hll-mid-grey)] lg:text-[clamp(1rem,calc(1.32*var(--vw)),1.25rem)] lg:leading-[1.25] lg:text-[var(--hll-dark-grey)]">
        {label}
      </p>
      <div className="mt-2 flex flex-wrap gap-x-1 gap-y-[3px] lg:mt-4 lg:gap-[11px]">
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
      <ul className="mt-3 text-[14px] leading-[28px] text-[var(--hll-mid-grey)] lg:mt-[clamp(0.8125rem,calc(1.59*var(--vw)),1.5rem)]">
        {items.map((sub) => (
          <li key={sub.name} className="flex gap-[9px]">
            {/* Figma Services mobile lists sub-services without bullets. */}
            <span aria-hidden className="hidden lg:inline">•</span>
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
