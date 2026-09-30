import type { CareerNotice } from "@/data/careers-page";

export const BUTTON_TYPE = "text-[12px] uppercase leading-none tracking-[0.25em] text-[var(--hll-dark-grey)]";

/** Figma "Button" outline state: 38px, Light Grey hairline. */
export function OutlineTag({ children }: { children: React.ReactNode }) {
  return (
    <span className={`inline-flex h-[38px] items-center rounded-[4px] border border-[var(--hll-light-grey)] px-[21px] ${BUTTON_TYPE}`}>
      {children}
    </span>
  );
}

export function roleTags(role: CareerNotice) {
  return [role.service, role.employmentType, role.location, role.seniority].filter(Boolean) as string[];
}
