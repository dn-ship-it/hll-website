"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import Link from "next/link";

import { HomeHeading } from "@/components/marketing/home/primitives";
import { SERVICE_GUTTER } from "@/components/marketing/services/service-chrome";
import type {
  CareerNotice,
  CareerSection,
  CareersPageContent,
} from "@/data/careers-page";

import { BUTTON_TYPE, OutlineTag, roleTags } from "./role-tags";

const MID = "var(--hll-mid-grey)";

/** Figma "Approach": a 2 × 2 grid from 36% across, each item numbered n/4. */
export function CareersApproach({
  data,
}: {
  data: CareersPageContent["approach"];
}) {
  const total = String(data.items.length).padStart(2, "0");
  return (
    <section className={`pb-[84px] pt-[84px] lg:pb-[214px] lg:pt-[154px] ${SERVICE_GUTTER}`}>
      <HomeHeading eyebrow="Careers" title={data.title} eyebrowColor={MID} />
      {/* Mobile: one column from x 74, 32px between items. */}
      <div className="mt-[54px] grid gap-y-8 pl-[54px] lg:ml-[36.8%] lg:mr-[90px] lg:mt-[14px] lg:grid-cols-2 lg:gap-x-[120px] lg:gap-y-[155px] lg:pl-0">
        {data.items.map((item, i) => (
          <article key={item.id}>
            <p
              className="hll-label text-[10px] leading-[1.2] text-[var(--hll-dark-grey)] lg:text-[12px]"
              style={{ fontFamily: "var(--hll-font-functional)" }}
            >
              {String(i + 1).padStart(2, "0")}/{total}
            </p>
            <h3 className="mt-3 text-[24px] font-normal leading-[1.16] text-black lg:mt-[10px] lg:text-[clamp(1.75rem,calc(2.38*var(--vw)),2.25rem)]">
              {item.title}
            </h3>
            <p className="mt-3 max-w-[341px] text-[14px] leading-[1.25] text-[var(--hll-dark-grey)] lg:mt-8 lg:text-[clamp(1rem,calc(1.32*var(--vw)),1.25rem)]">
              {item.body}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function FilterMenu({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string | null;
  onChange: (value: string | null) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="inline-flex h-[34px] items-center gap-2 rounded-[4px] bg-[var(--hll-light-grey)] px-[21px] text-[10px] uppercase leading-none tracking-[0.25em] text-[var(--hll-dark-grey)] lg:h-9 lg:text-[12px]"
      >
        {value ?? label}
        <ChevronDown className="size-3.5" strokeWidth={1.4} aria-hidden />
      </button>
      {open ? (
        <ul className="absolute left-0 top-11 z-10 min-w-full rounded-[4px] bg-[var(--hll-bg)] py-1 shadow-[0_12px_40px_rgba(0,0,0,0.12)]">
          {[null, ...options].map((option) => (
            <li key={option ?? "all"}>
              <button
                type="button"
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
                className={`block w-full whitespace-nowrap px-[21px] py-2 text-left hover:bg-[var(--hll-light-grey)] ${BUTTON_TYPE}`}
              >
                {option ?? `All ${label.toLowerCase()}s`}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

/**
 * Figma "Open Roles": filter bar on the left, role rows from 41.7% across.
 * "Clicking this leads you to the detailed view page of that specific role."
 */
export function CareersOpenRoles({
  roles,
  emptyMessage,
}: {
  roles: CareerNotice[];
  emptyMessage: string;
}) {
  const [service, setService] = useState<string | null>(null);
  const [location, setLocation] = useState<string | null>(null);
  const unique = (values: (string | undefined)[]) => [
    ...new Set(values.filter(Boolean) as string[]),
  ];
  const services = useMemo(() => unique(roles.map((r) => r.service)), [roles]);
  const locations = useMemo(
    () => unique(roles.map((r) => r.location)),
    [roles],
  );
  const shown = roles.filter(
    (r) =>
      (!service || r.service === service) &&
      (!location || r.location === location),
  );

  return (
    <section id="open-roles" className="scroll-mt-24">
      <div data-line className="mx-2 h-px bg-[var(--hll-mid-grey)] lg:mx-0" />
      <div className={`pb-[84px] pt-[84px] lg:pb-[214px] lg:pt-[154px] ${SERVICE_GUTTER}`}>
        <HomeHeading eyebrow="Team" title="Open Roles" />

        {/* Mobile: the filters 12px under the title, the rows 54px below. */}
        <div className="mt-3 grid items-start gap-[54px] lg:mt-[72px] lg:grid-cols-[600fr_852fr] lg:gap-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`mr-[13px] hidden lg:inline ${BUTTON_TYPE}`}>Filter by</span>
            <FilterMenu
              label="Service"
              options={services}
              value={service}
              onChange={setService}
            />
            <FilterMenu
              label="Location"
              options={locations}
              value={location}
              onChange={setLocation}
            />
          </div>

          <ul className="-mx-3 lg:mx-0 lg:mr-[100px]">
            <li
              aria-hidden
              data-line
              className="h-px bg-[var(--hll-mid-grey)]"
            />
            {shown.length === 0 ? (
              <li className="py-8 text-[clamp(1rem,calc(1.32*var(--vw)),1.25rem)] text-[var(--hll-dark-grey)]">
                {emptyMessage}
              </li>
            ) : null}
            {shown.map((role) => {
              const tags = roleTags(role);
              return (
                <li key={role.id}>
                  <Link
                    href={`/careers/${role.slug}`}
                    className="group flex items-start justify-between gap-6 pb-[10px] pl-[13px] pr-1 pt-[10px] lg:pb-[23px] lg:pl-0 lg:pr-0 lg:pt-[21px]"
                  >
                    <span>
                      <span className="block text-[24px] leading-[1.16] text-black lg:text-[clamp(1.75rem,calc(2.38*var(--vw)),2.25rem)]">
                        {role.title}
                      </span>
                      {tags.length ? (
                        <span className="mt-[26px] flex flex-wrap gap-[7px] lg:mt-3 lg:gap-2">
                          {tags.map((tag) => (
                            <OutlineTag key={tag}>{tag}</OutlineTag>
                          ))}
                        </span>
                      ) : (
                        <span className="mt-3 block max-w-[560px] text-[14px] leading-[1.25] text-[var(--hll-dark-grey)] lg:text-[clamp(1rem,calc(1.32*var(--vw)),1.25rem)]">
                          {role.summary}
                        </span>
                      )}
                    </span>
                    <span className="mt-[3px] grid size-6 shrink-0 place-items-center rounded-[2.6px] bg-[var(--hll-light-grey)] text-[var(--hll-dark-grey)] transition-colors group-hover:bg-[#d9d9d9] lg:mt-0 lg:size-9 lg:rounded-[4px]">
                      <ArrowUpRight
                        className="size-3 lg:size-4"
                        strokeWidth={1.4}
                        aria-hidden
                      />
                    </span>
                  </Link>
                  <div data-line className="h-px bg-[var(--hll-mid-grey)]" />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

/** A label column and a numbered (or plain) body, as in Careers "Process". */
export function LabelledRows({
  rows,
  numbered = true,
}: {
  rows: readonly CareerSection[];
  numbered?: boolean;
}) {
  return (
    <div>
      {rows.map((row, r) => (
        <div key={row.title}>
          {/* Mobile: no hairline, the next block 54px down. */}
          {r > 0 ? (
            <div
              data-line
              className="mt-[154px] hidden h-px bg-[var(--hll-mid-grey)] lg:block"
            />
          ) : null}
          <div
            className={`grid lg:grid-cols-[250fr_705fr] lg:gap-4 ${r > 0 ? "pt-[54px] lg:pt-[84px]" : ""} ${numbered && r === 0 ? "gap-[35px]" : "gap-4"}`}
          >
            <p className={`pt-[3px] text-[10px] uppercase leading-none tracking-[0.25em] text-[var(--hll-dark-grey)] lg:text-[12px]`}>{row.title}</p>
            <ol className="space-y-[18px] lg:space-y-[30px]">
              {row.paragraphs.map((text, i) => {
                const num = numbered && r === 0;
                return (
                <li
                  key={i}
                  className={`grid lg:grid-cols-[25fr_595fr] lg:gap-0 lg:pl-0 ${num ? "grid-cols-[15px_1fr] gap-[9px] pl-[31px]" : "grid-cols-1"}`}
                >
                  <span
                    className={`hll-label pt-[2px] text-[12px] leading-[1.2] text-black lg:block lg:pt-[3px] ${num ? "" : "hidden"}`}
                    style={{ fontFamily: "var(--hll-font-functional)" }}
                  >
                    {num ? String(i + 1).padStart(2, "0") : ""}
                  </span>
                  <p className="text-[14px] leading-[1.25] text-[var(--hll-dark-grey)] lg:text-[clamp(1.125rem,calc(1.59*var(--vw)),1.5rem)]">
                    {text}
                  </p>
                </li>
                );
              })}
            </ol>
          </div>
        </div>
      ))}
    </div>
  );
}

export function CareersProcess({
  data,
}: {
  data: CareersPageContent["process"];
}) {
  return (
    <section>
      {/* Figma Careers mobile runs Process straight on from the roles. */}
      <div data-line className="hidden h-px bg-[var(--hll-mid-grey)] lg:block" />
      <div
        className={`grid gap-[54px] pb-[84px] lg:grid-cols-[529fr_960fr] lg:gap-0 lg:pb-[151px] lg:pt-[154px] ${SERVICE_GUTTER}`}
      >
        <HomeHeading eyebrow="Careers" title={data.title} eyebrowColor={MID} />
        <div className="lg:pt-[63px]">
          <LabelledRows rows={data.rows} />
        </div>
      </div>
    </section>
  );
}

/** Figma: "see open roles is sticky and takes you to the open roles section." */
export function SeeOpenRoles() {
  return (
    // A zero-height sticky row at the end of the sections above Open Roles:
    // the button hangs above it, 32px off the bottom of the screen.
    <div className="pointer-events-none sticky bottom-8 z-20 flex h-0 justify-center">
      <a
        href="#open-roles"
        className="pointer-events-auto inline-flex h-[34px] -translate-y-full items-center gap-2 rounded-[3px] bg-[var(--hll-light-grey)] px-[21px] text-[10px] uppercase leading-none tracking-[0.25em] text-[var(--hll-dark-grey)] lg:h-9 lg:rounded-[4px] lg:text-[12px]"
      >
        See open roles
        <ChevronDown className="size-3.5" strokeWidth={1.4} aria-hidden />
      </a>
    </div>
  );
}
