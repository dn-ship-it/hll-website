"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, X } from "lucide-react";

import type { ServiceVariant } from "@/components/hll/variants";
import {
  ENGAGEMENT_TYPES,
  INDUSTRY_GROUPS,
  SERVICE_LABELS,
  type Engagement,
} from "@/data/engagements";

import { EngagementCard } from "./engagement-card";

type Filters = {
  services: ServiceVariant[];
  industries: string[];
  types: string[];
  years: number[];
};

const EMPTY: Filters = { services: [], industries: [], types: [], years: [] };
const BUTTON =
  "text-[12px] uppercase leading-none tracking-[0.25em] text-[var(--hll-dark-grey)]";
const HEADER =
  "text-[12px] uppercase leading-[1.16] tracking-[0.25em] text-[var(--hll-mid-grey)]";

function toggle<T>(list: T[], value: T) {
  return list.includes(value)
    ? list.filter((v) => v !== value)
    : [...list, value];
}

/** An option in the expanded filter; the chosen ones are underlined. */
function Option({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`block text-left text-[12px] leading-[1.65] text-[var(--hll-dark-grey)] underline-offset-[3px] hover:underline ${
        active ? "underline" : ""
      }`}
    >
      {children}
    </button>
  );
}

/**
 * Figma Engagement Main + Engagement Filter Expanded.
 * "Dynamic custom layout: mainly follows a 3 column grid, but elements can be
 * put in focus and made bigger (see Zelish). Ratio of cards depends on image
 * ratio." "Filter button will be sticky to the bottom, with an expanded view."
 */
export function EngagementList({ engagements }: { engagements: Engagement[] }) {
  const [filters, setFilters] = useState<Filters>(EMPTY);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const years = useMemo(
    () => [...new Set(engagements.map((e) => e.year))].sort((a, b) => b - a),
    [engagements],
  );

  const shown = engagements.filter(
    (e) =>
      (!filters.services.length ||
        e.services.some((s) => filters.services.includes(s))) &&
      (!filters.industries.length ||
        (e.industry && filters.industries.includes(e.industry))) &&
      (!filters.types.length || filters.types.includes(e.type)) &&
      (!filters.years.length || filters.years.includes(e.year)),
  );

  // Close the expanded view on Escape or a click outside it.
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event: KeyboardEvent) =>
      event.key === "Escape" && setOpen(false);
    const onPointer = (event: PointerEvent) => {
      if (!panelRef.current?.contains(event.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  const chips = [
    ...filters.services.map((s) => ({
      key: `s-${s}`,
      label: SERVICE_LABELS[s],
      remove: () =>
        setFilters((f) => ({
          ...f,
          services: f.services.filter((v) => v !== s),
        })),
    })),
    ...filters.industries.map((i) => ({
      key: `i-${i}`,
      label: i,
      remove: () =>
        setFilters((f) => ({
          ...f,
          industries: f.industries.filter((v) => v !== i),
        })),
    })),
    ...filters.types.map((t) => ({
      key: `t-${t}`,
      label: t,
      remove: () =>
        setFilters((f) => ({ ...f, types: f.types.filter((v) => v !== t) })),
    })),
    ...filters.years.map((y) => ({
      key: `y-${y}`,
      label: String(y),
      remove: () =>
        setFilters((f) => ({ ...f, years: f.years.filter((v) => v !== y) })),
    })),
  ];

  return (
    <>
      {/* Chosen filters under the title ("Banking  x"); the row keeps its
          height so the grid doesn't jump. */}
      <div
        data-fade-up
        className="mt-[19px] flex min-h-[38px] flex-wrap gap-2 px-[clamp(1.25rem,calc(1.98*var(--vw)),1.875rem)] lg:pl-[31px]"
      >
        {chips.map((chip) => (
          <button
            key={chip.key}
            type="button"
            onClick={chip.remove}
            aria-label={`Remove ${chip.label} filter`}
            className={`inline-flex h-[38px] items-center gap-2 rounded-[4px] border border-[var(--hll-light-grey)] pl-[21px] pr-[18px] transition-colors hover:bg-[var(--hll-light-grey)] ${BUTTON}`}
          >
            {chip.label}
            <X className="size-3" strokeWidth={1.4} aria-hidden />
          </button>
        ))}
      </div>

      <div className="mt-[47px] grid grid-cols-1 items-start gap-x-[10px] gap-y-[40px] px-[10px] sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((engagement) => (
          <div
            key={engagement.id}
            data-fade-up
            className={
              engagement.featured ? "sm:col-span-2 lg:col-span-3" : undefined
            }
          >
            <EngagementCard engagement={engagement} />
          </div>
        ))}
        {shown.length === 0 ? (
          <p className="col-span-full py-20 text-center text-[clamp(1rem,calc(1.32*var(--vw)),1.25rem)] text-[var(--hll-dark-grey)]">
            No engagements match these filters yet.
          </p>
        ) : null}
      </div>

      {/* Sticky Filter button, 37px off the bottom, opening the expanded view
          8px above it. */}
      <div className="pointer-events-none sticky bottom-[37px] z-30 mt-[60px] flex justify-center">
        <div ref={panelRef} className="pointer-events-auto relative">
          {open ? (
            <div
              role="dialog"
              aria-label="Filter engagements"
              className="absolute bottom-[calc(100%+8px)] left-1/2 w-[min(1004px,calc(calc(100*var(--vw))-32px))] -translate-x-1/2 rounded-lg bg-[var(--hll-light-grey)] px-[28px] pb-[40px] pt-[33px] [animation:page-intro-in_300ms_cubic-bezier(0.22,1,0.36,1)_both]"
            >
              <div className="grid gap-8 md:grid-cols-[211fr_591fr_146fr] md:gap-0">
                <div>
                  <p className={HEADER}>Services</p>
                  <ul className="mt-[25px]">
                    {(Object.keys(SERVICE_LABELS) as ServiceVariant[]).map(
                      (service) => {
                        const active = filters.services.includes(service);
                        return (
                          <li key={service}>
                            <button
                              type="button"
                              aria-pressed={active}
                              onClick={() =>
                                setFilters((f) => ({
                                  ...f,
                                  services: toggle(f.services, service),
                                }))
                              }
                              className={`flex h-9 items-center gap-[10px] text-[12px] text-[var(--hll-dark-grey)] underline-offset-[3px] hover:underline ${
                                active ? "underline" : ""
                              }`}
                            >
                              <span className="grid size-6 place-items-center rounded-[4px] bg-[var(--hll-bg)]">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={`/assets/services/${service}-glyph.svg`}
                                  alt=""
                                  className="size-5"
                                />
                              </span>
                              {SERVICE_LABELS[service]}
                            </button>
                          </li>
                        );
                      },
                    )}
                  </ul>
                </div>

                <div>
                  <p className={HEADER}>Industries</p>
                  <div className="mt-[21px] grid grid-cols-2 gap-x-[20px] gap-y-[31px] sm:grid-cols-3">
                    {INDUSTRY_GROUPS.map((group) => (
                      <div key={group.title}>
                        <p className="text-[12px] leading-[1.25] text-[var(--hll-mid-grey)]">
                          {group.title}
                        </p>
                        <div className="mt-[13px]">
                          {group.items.map((industry) => (
                            <Option
                              key={industry}
                              active={filters.industries.includes(industry)}
                              onClick={() =>
                                setFilters((f) => ({
                                  ...f,
                                  industries: toggle(f.industries, industry),
                                }))
                              }
                            >
                              {industry}
                            </Option>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className={HEADER}>Engagement</p>
                  <div className="mt-[21px]">
                    {ENGAGEMENT_TYPES.map((type) => (
                      <Option
                        key={type}
                        active={filters.types.includes(type)}
                        onClick={() =>
                          setFilters((f) => ({
                            ...f,
                            types: toggle(f.types, type),
                          }))
                        }
                      >
                        {type}
                      </Option>
                    ))}
                  </div>
                  <p className={`mt-[60px] ${HEADER}`}>Year</p>
                  <div className="mt-[20px]">
                    {years.map((year) => (
                      <Option
                        key={year}
                        active={filters.years.includes(year)}
                        onClick={() =>
                          setFilters((f) => ({
                            ...f,
                            years: toggle(f.years, year),
                          }))
                        }
                      >
                        {year}
                      </Option>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          <button
            type="button"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className={`inline-flex h-9 items-center gap-[10px] rounded-[4px] bg-[var(--hll-light-grey)] px-[21px] ${BUTTON}`}
          >
            Filter
            <ChevronDown
              className={`size-3.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
              strokeWidth={1.2}
              aria-hidden
            />
          </button>
        </div>
      </div>
    </>
  );
}
