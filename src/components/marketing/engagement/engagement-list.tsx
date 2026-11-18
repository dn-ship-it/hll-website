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

type GridItem = {
  engagement: Engagement;
  media: "video" | "still" | "auto";
  slot?: string;
  big?: boolean;
};

// A row of three, then one card across the full width, repeating (3, 1, 3, 1). Cards keep their own shape.
const BIG = "feature-wide_1492x843";

/** Engagements that trade places in the grid, by slug: each takes the other's spot and size. */
const SWAPS: [string, string][] = [["galeries-lafayette", "wework"]];

function applySwaps(items: GridItem[]): GridItem[] {
  const out = [...items];
  for (const [a, b] of SWAPS) {
    const i = out.findIndex((item) => item.engagement.slug === a);
    const j = out.findIndex((item) => item.engagement.slug === b);
    if (i < 0 || j < 0) continue;
    const [first, second] = [out[i].engagement, out[j].engagement];
    out[i] = { ...out[i], engagement: second };
    out[j] = { ...out[j], engagement: first };
  }
  return out;
}

/** The grid's order: each row of three is a card video, an image card, then a ripple card. Image cards are the named clients
    with a still; once they run out, the row ends in ripples. The full-width card is a video while any are left, then a ripple. */
function arrangeGrid(list: Engagement[]): GridItem[] {
  const listMedia = (e: Engagement) =>
    e.art?.listSlot ? e.art.cardMedia?.[e.art.listSlot] : undefined;
  const isVideo = (e: Engagement) => Boolean(listMedia(e)?.video);
  const isImage = (e: Engagement) => !isVideo(e) && (Boolean(listMedia(e)) || !e.art);
  const videos = list.filter(isVideo);
  const images = list.filter(isImage);
  const ripples = list.filter((e) => !isVideo(e) && !isImage(e));
  const out: GridItem[] = [];
  const left = () => videos.length + images.length + ripples.length;
  while (left() > 0) {
    // A row of three: video, image, ripple, each falling back to what's left.
    const row = [
      videos.shift() ?? images.shift() ?? ripples.shift(),
      images.shift() ?? ripples.shift() ?? videos.shift(),
      ripples.shift() ?? images.shift() ?? videos.shift(),
    ];
    for (const e of row) if (e) out.push({ engagement: e, media: "auto" });
    // Then one across the full width: a video, else a ripple.
    const big = videos.shift() ?? (ripples[0]?.art?.slots[BIG] ? ripples.shift() : undefined);
    if (big) out.push({ engagement: big, media: "auto", slot: BIG, big: true });
  }
  return applySwaps(out);
}

/** The engagement grid with an expanded, sticky filter: mainly 3 columns, with some cards in focus and bigger. */
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
        className="mt-3 flex min-h-[38px] flex-wrap gap-2 px-[clamp(1.25rem,calc(1.98*var(--vw)),1.875rem)] lg:mt-[19px] lg:pl-[31px]"
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

      {/* Mobile: one 386px column, 8px from the edges, cards 34px apart.
          From 1800px up, a fourth column rather than ever-bigger cards. */}
      <div className="mt-8 grid grid-cols-1 items-start gap-x-[10px] gap-y-[34px] px-2 lg:mt-[47px] lg:grid-cols-3 lg:gap-y-[40px] lg:px-[10px]">
        {arrangeGrid(shown).map((item) => (
          <div
            key={item.engagement.id}
            data-fade-up
            className={item.big ? "lg:col-span-full" : undefined}
          >
            <EngagementCard engagement={item.engagement} slot={item.slot} media={item.media} />
          </div>
        ))}
        {shown.length === 0 ? (
          <p className="col-span-full py-20 text-center text-[clamp(1rem,calc(1.32*var(--vw)),1.25rem)] text-[var(--hll-dark-grey)]">
            No engagements match these filters yet.
          </p>
        ) : null}
      </div>

      {/* Sticky Filter button, 37px off the bottom (mobile 23px), opening the expanded view 8px above it.
          Above the page shader (z-30, later in the page), which would otherwise draw over it. */}
      <div className="pointer-events-none sticky bottom-[23px] z-40 mt-[60px] flex justify-center lg:bottom-[37px]">
        <div ref={panelRef} className="pointer-events-auto relative">
          {open ? (
            <div
              role="dialog"
              aria-label="Filter engagements"
              className="absolute bottom-[calc(100%+8px)] left-1/2 max-h-[calc(100*var(--svh)-var(--nav-h)-80px)] w-[calc(calc(100*var(--vw))-16px)] -translate-x-1/2 overflow-y-auto rounded-lg bg-[var(--hll-light-grey)] px-5 pb-8 pt-6 [animation:page-intro-in_300ms_cubic-bezier(0.22,1,0.36,1)_both] lg:max-h-none lg:w-[min(1004px,calc(calc(100*var(--vw))-32px))] lg:overflow-visible lg:px-[28px] lg:pb-[40px] lg:pt-[33px]"
            >
              {/* Mobile stacks the four lists in one scrolling panel. */}
              <div className="grid gap-8 lg:grid-cols-[211fr_591fr_146fr] lg:gap-0">
                <div>
                  <p className={HEADER}>Capabilities</p>
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
            className="inline-flex h-[34px] items-center gap-[10px] rounded-[3px] bg-[var(--hll-light-grey)] px-[21px] text-[10px] uppercase leading-none tracking-[0.25em] text-[var(--hll-dark-grey)] lg:h-9 lg:rounded-[4px] lg:text-[12px]"
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
