"use client";

import { useEffect, useState } from "react";

/**
 * Left-hand index of the capabilities list. Figma: "as you scroll it
 * highlights according to the section you are in" — the item whose article is
 * crossing the upper part of the viewport takes the service colour.
 */
export function CapabilityNav({
  items,
  accent,
}: {
  items: readonly { id: string; title: string }[];
  accent: string;
}) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

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
  );
}
