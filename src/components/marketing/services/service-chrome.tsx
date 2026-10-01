import type { ServiceVariant } from "@/components/hll/variants";
import { SectionTitle } from "@/components/marketing/home/primitives";

import { getServiceTheme } from "./service-theme";

/** Page gutter from the Figma service template: 30px at the 1512px frame. */
export const SERVICE_GUTTER = "px-[clamp(1.25rem,calc(1.98*var(--vw)),1.875rem)]";

/** Service icon + name, as in the Figma service template (no breadcrumb). */
export function ServiceBrandHeader({
  brand,
  variant,
}: {
  brand: string;
  variant: ServiceVariant;
}) {
  const { iconSrc } = getServiceTheme(variant);

  return (
    <div className="flex items-center gap-[15px]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={iconSrc}
        alt=""
        aria-hidden="true"
        className="size-[clamp(1.75rem,calc(2.38*var(--vw)),2.25rem)] shrink-0"
      />
      <span className="text-[clamp(1.5rem,calc(2.38*var(--vw)),2.25rem)] font-medium leading-[1.16] text-[var(--hll-dark-grey)]">
        {brand}
      </span>
    </div>
  );
}

/**
 * Eyebrow + H1 used by every section below the hero in the Figma service
 * template: "SERVICES  <service>" in the Functional style, the service name in
 * the service colour, then a 64px light title.
 */
export function ServiceSectionHeading({
  breadcrumb,
  title,
  variant,
  tone = "light",
}: {
  breadcrumb: readonly string[];
  title: string;
  variant: ServiceVariant;
  /** "dark" sits on the coloured Outcome band. */
  tone?: "light" | "dark";
}) {
  const { accent } = getServiceTheme(variant);
  const [section, ...rest] = breadcrumb;

  return (
    <div>
      <p
        className="flex gap-[14px] text-[12px] uppercase leading-[1.2]"
        style={{ fontFamily: "var(--hll-font-functional)" }}
        data-service-label
      >
        <span
          style={{
            color:
              tone === "dark" ? "rgba(250,250,250,0.7)" : "var(--hll-mid-grey)",
          }}
        >
          {section}
        </span>
        <span style={{ color: tone === "dark" ? "#fafafa" : accent }}>
          {rest.join(" ")}
        </span>
      </p>
      <SectionTitle
        variant={variant}
        fontSize="clamp(2.5rem, calc(4.23*var(--vw)), 4rem)"
        letterSpacing="0"
        lineHeight="1.16"
        ink={tone === "dark" ? "#FAFAFA" : "#1A1A1A"}
        className={`mt-[12px] font-light ${
          tone === "dark" ? "text-[#fafafa]" : "text-[var(--hll-dark-grey)]"
        }`}
      >
        {title}
      </SectionTitle>
    </div>
  );
}
