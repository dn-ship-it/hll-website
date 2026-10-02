import type { CareerNotice } from "@/data/careers-page";

export const BUTTON_TYPE = "text-[12px] uppercase leading-none tracking-[0.25em] text-[var(--hll-dark-grey)]";

/** Figma "Button" outline state: 38px, Light Grey hairline. Careers mobile
 *  scales it to 30px with an 8px label. */
export function OutlineTag({
  children,
  size = "row",
}: {
  children: React.ReactNode;
  /** "hero": the JD title's 36px "Button Mobile" tags (10px label). */
  size?: "row" | "hero";
}) {
  const mobile =
    size === "hero"
      ? "h-9 rounded-[3px] px-[21px] text-[10px]"
      : "h-[30px] rounded-[3.5px] px-[18px] text-[8px]";
  return (
    <span className={`inline-flex items-center border border-[var(--hll-light-grey)] uppercase leading-none tracking-[0.25em] text-[var(--hll-dark-grey)] lg:h-[38px] lg:rounded-[4px] lg:px-[21px] lg:text-[12px] ${mobile}`}>
      {children}
    </span>
  );
}

export function roleTags(role: CareerNotice) {
  return [role.service, role.employmentType, role.location, role.seniority].filter(Boolean) as string[];
}
