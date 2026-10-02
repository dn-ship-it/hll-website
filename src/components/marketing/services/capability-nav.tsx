"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Left-hand index of the capabilities list. Figma: "as you scroll it
 * highlights according to the section you are in" — the item whose article is
 * crossing the upper part of the viewport takes the service colour.
 */
export function CapabilityNav({
  items,
  accent,
  mobileRow = false,
}: {
  items: readonly { id: string; title: string }[];
  accent: string;
  /** Figma Industry mobile: the list as one swipeable row above the
   *  services. "Clicking on service here auto scrolls to the section." */
  mobileRow?: boolean;
}) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");
  const rowRef = useRef<HTMLUListElement>(null);

  // Keep the highlighted label in view as the row's highlight moves on.
  useEffect(() => {
    const row = rowRef.current;
    const active = row?.querySelector<HTMLElement>('[aria-current="true"]');
    if (!row || !active || row.offsetParent === null) return;
    row.scrollTo({ left: active.offsetLeft - 10, behavior: "smooth" });
  }, [activeId]);

  useEffect(() => {
    const targets = items
      .map((item) => (item.id ? document.getElementById(item.id) : null))
      .filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) return undefined;

    // A thin band 25–35% down the viewport: exactly one article crosses it at
    // a time, so the highlight never flickers between two neighbours.
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((entry) => entry.isIntersecting);
        if (hit) setActiveId(hit.target.id);
      },
      { rootMargin: "-25% 0px -65% 0px" },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  return (
    <>
    {mobileRow ? (
      <ul
        ref={rowRef}
        className="-mr-5 flex gap-[18px] overflow-x-auto pl-[10px] pr-5 [scrollbar-width:none] lg:hidden [&::-webkit-scrollbar]:hidden"
        data-service-label
      >
        {items.map((item) => {
          const active = item.id === activeId;
          return (
            <li key={item.title} className="relative shrink-0">
              <span
                aria-hidden
                className="absolute -left-[10px] top-1/2 size-[4px] -translate-y-1/2 bg-[var(--hll-dark-grey)] transition-opacity duration-300"
                style={{ opacity: active ? 1 : 0 }}
              />
              {item.id ? (
                <a
                  href={`#${item.id}`}
                  aria-current={active ? "true" : undefined}
                  className={`block whitespace-nowrap text-[12px] uppercase leading-[24px] transition-colors duration-300 ${active ? "font-medium" : ""}`}
                  style={{ color: active ? accent : "var(--hll-mid-grey)" }}
                >
                  {item.title}
                </a>
              ) : (
                <span className="block whitespace-nowrap text-[12px] uppercase leading-[24px] text-[var(--hll-mid-grey)]">
                  {item.title}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    ) : null}
    <ul className="hidden lg:block" data-service-label>
      {items.map((item) => {
        const active = item.id === activeId;
        return (
          <li key={item.title} className="relative">
            {/* Figma marks the active row with a small Dark Grey square
                hanging in the gutter, so the labels stay left-aligned. */}
            <span
              aria-hidden
              className="absolute -left-[9px] top-1/2 size-[4px] -translate-y-1/2 bg-[var(--hll-dark-grey)] transition-opacity duration-300"
              style={{ opacity: active ? 1 : 0 }}
            />
            {item.id ? (
              <a
                href={`#${item.id}`}
                aria-current={active ? "true" : undefined}
                className="block text-[12px] uppercase leading-[24px] transition-colors duration-300"
                style={{ color: active ? accent : "var(--hll-mid-grey)" }}
              >
                {item.title}
              </a>
            ) : (
              <span className="block text-[12px] uppercase leading-[24px] text-[var(--hll-mid-grey)]">
                {item.title}
              </span>
            )}
          </li>
        );
      })}
    </ul>
    </>
  );
}
