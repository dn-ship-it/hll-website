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
    <section className={`pt-[154px] pb-[214px] ${SERVICE_GUTTER}`}>
      <HomeHeading eyebrow="Careers" title={data.title} eyebrowColor={MID} />
      <div className="mt-[14px] grid gap-x-[120px] gap-y-[155px] sm:grid-cols-2 lg:ml-[36.8%] lg:mr-[90px]">
        {data.items.map((item, i) => (
          <article key={item.id}>
            <p
              className="hll-label text-[12px] leading-[1.2] text-[var(--hll-dark-grey)]"
              style={{ fontFamily: "var(--hll-font-functional)" }}
            >
              {String(i + 1).padStart(2, "0")}/{total}
            </p>
            <h3 className="mt-[10px] text-[clamp(1.75rem,2.38vw,2.25rem)] font-normal leading-[1.16] text-black">
              {item.title}
            </h3>
            <p className="mt-8 max-w-[341px] text-[clamp(1rem,1.32vw,1.25rem)] leading-[1.25] text-[var(--hll-dark-grey)]">
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
        className={`inline-flex h-9 items-center gap-2 rounded-[4px] bg-[var(--hll-light-grey)] px-[21px] ${BUTTON_TYPE}`}
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
      <div data-line className="h-px bg-[var(--hll-mid-grey)]" />
      <div className={`pt-[154px] pb-[214px] ${SERVICE_GUTTER}`}>
        <HomeHeading eyebrow="Team" title="Open Roles" />

        <div className="mt-[72px] grid items-start gap-10 lg:grid-cols-[600fr_852fr] lg:gap-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`mr-[13px] ${BUTTON_TYPE}`}>Filter by</span>
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

          <ul className="lg:mr-[100px]">
            <li
              aria-hidden
              data-line
              className="h-px bg-[var(--hll-mid-grey)]"
            />
            {shown.length === 0 ? (
              <li className="py-8 text-[clamp(1rem,1.32vw,1.25rem)] text-[var(--hll-dark-grey)]">
                {emptyMessage}
              </li>
            ) : null}
            {shown.map((role) => {
              const tags = roleTags(role);
              return (
                <li key={role.id}>
                  <Link
                    href={`/careers/${role.slug}`}
                    className="group flex items-start justify-between gap-6 pt-[21px] pb-[23px]"
                  >
                    <span>
                      <span className="block text-[clamp(1.75rem,2.38vw,2.25rem)] leading-[1.16] text-black">
                        {role.title}
                      </span>
                      {tags.length ? (
                        <span className="mt-3 flex flex-wrap gap-2">
                          {tags.map((tag) => (
                            <OutlineTag key={tag}>{tag}</OutlineTag>
                          ))}
                        </span>
                      ) : (
                        <span className="mt-3 block max-w-[560px] text-[clamp(1rem,1.32vw,1.25rem)] leading-[1.25] text-[var(--hll-dark-grey)]">
                          {role.summary}
                        </span>
                      )}
                    </span>
                    <span className="grid size-9 shrink-0 place-items-center rounded-[4px] bg-[var(--hll-light-grey)] text-[var(--hll-dark-grey)] transition-colors group-hover:bg-[#d9d9d9]">
                      <ArrowUpRight
                        className="size-4"
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
          {r > 0 ? (
            <div
              data-line
              className="mt-[154px] h-px bg-[var(--hll-mid-grey)]"
            />
          ) : null}
          <div
            className={`grid gap-4 lg:grid-cols-[250fr_705fr] ${r > 0 ? "pt-[84px]" : ""}`}
          >
            <p className={`pt-[3px] ${BUTTON_TYPE}`}>{row.title}</p>
            <ol className="space-y-[30px]">
              {row.paragraphs.map((text, i) => (
                <li key={i} className="grid grid-cols-[25fr_595fr] gap-0">
                  <span
                    className="hll-label pt-[3px] text-[12px] leading-[1.2] text-black"
                    style={{ fontFamily: "var(--hll-font-functional)" }}
                  >
                    {numbered && r === 0 ? String(i + 1).padStart(2, "0") : ""}
                  </span>
                  <p className="text-[clamp(1.125rem,1.59vw,1.5rem)] leading-[1.25] text-[var(--hll-dark-grey)]">
                    {text}
                  </p>
                </li>
              ))}
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
      <div data-line className="h-px bg-[var(--hll-mid-grey)]" />
      <div
        className={`grid gap-10 pt-[154px] pb-[151px] lg:grid-cols-[529fr_960fr] lg:gap-0 ${SERVICE_GUTTER}`}
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
        className={`pointer-events-auto inline-flex h-9 -translate-y-full items-center gap-2 rounded-[4px] bg-[var(--hll-light-grey)] px-[21px] ${BUTTON_TYPE}`}
      >
        See open roles
        <ChevronDown className="size-3.5" strokeWidth={1.4} aria-hidden />
      </a>
    </div>
  );
}
