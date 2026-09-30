"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import type { SearchEntry } from "@/lib/site-search";

type Stage = "rest" | "open" | "search";

const GLASS = "backdrop-blur-[12.8px]";

/** Figma's two-window mark, as on the stat card and the result rows. */
function OpenIcon() {
  return (
    <svg
      viewBox="0 0 11 11"
      className="size-[11px] shrink-0"
      fill="#fff"
      stroke="#1A1A1A"
      strokeWidth="1.1"
      aria-hidden
    >
      <rect x="0.55" y="3.9" width="6.6" height="6.6" rx="2.2" />
      <rect x="2.6" y="0.55" width="7.9" height="7.9" rx="1.1" />
    </svg>
  );
}

function rank(index: SearchEntry[], query: string) {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  return index
    .map((entry) => {
      const title = entry.title.toLowerCase();
      const body = `${title} ${entry.keywords.toLowerCase()}`;
      let score = 0;
      for (const word of words) {
        if (title.startsWith(word)) score += 4;
        else if (title.includes(word)) score += 3;
        else if (body.includes(word)) score += 1;
        else return { entry, score: 0 };
      }
      return { entry, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map((r) => r.entry);
}

/**
 * Figma "AI Bubble" (1707:7332 / 7492 / 7657): a soft orb bottom right; on
 * click it offers "How can I help?" and Search, and Search opens a frosted
 * panel whose results sit in rows with the service's colour tile, the page
 * name and "Learn more".
 */
export function AiBubble({ index }: { index: SearchEntry[] }) {
  const [stage, setStage] = useState<Stage>("rest");
  const [query, setQuery] = useState("");
  // Lift the bubble above the footer's Email / LinkedIn row while it's in view.
  const [lift, setLift] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();
  const results = useMemo(() => rank(index, query), [index, query]);

  useEffect(() => {
    setStage("rest");
    setQuery("");
  }, [pathname]);

  useEffect(() => {
    if (stage === "rest") return undefined;
    const onKey = (event: KeyboardEvent) =>
      event.key === "Escape" && setStage("rest");
    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setStage("rest");
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [stage]);

  useEffect(() => {
    if (stage === "search") inputRef.current?.focus();
  }, [stage]);

  useEffect(() => {
    const row = document.querySelector("[data-footer-row]");
    if (!row) return undefined;
    const observer = new IntersectionObserver(([entry]) =>
      setLift(entry.isIntersecting ? 72 : 0),
    );
    observer.observe(row);
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <div
      ref={rootRef}
      className="fixed bottom-0 right-0 z-40 hidden transition-transform duration-500 ease-out lg:block"
      style={{ transform: `translateY(-${lift}px)` }}
    >
      {stage === "open" ? (
        <div className="absolute bottom-[92px] right-[13px] flex flex-col items-end gap-[3px] [animation:page-intro-in_300ms_cubic-bezier(0.22,1,0.36,1)_both]">
          <button
            type="button"
            onClick={() => setStage("search")}
            className={`h-[39px] whitespace-nowrap rounded-lg bg-[rgba(230,230,230,0.7)] px-4 text-[16px] leading-[1.25] text-[var(--hll-dark-grey)] ${GLASS}`}
          >
            How can I help?
          </button>
          <button
            type="button"
            onClick={() => setStage("search")}
            className={`flex h-[39px] items-center gap-[7px] rounded-lg bg-[rgba(230,230,230,0.7)] pl-[15px] pr-[15px] text-[16px] leading-[1.25] text-[var(--hll-mid-grey)] ${GLASS}`}
          >
            <Search className="size-[18px]" strokeWidth={1.4} aria-hidden />
            Search
          </button>
        </div>
      ) : null}

      {stage === "search" ? (
        <div
          role="dialog"
          aria-label="Search the site"
          className={`absolute bottom-[89px] right-[13px] w-[217px] rounded-lg bg-[rgba(230,230,230,0.8)] px-[5px] pb-[5px] pt-[10px] [animation:page-intro-in_300ms_cubic-bezier(0.22,1,0.36,1)_both] ${GLASS}`}
        >
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="How can I help?"
            aria-label="Search"
            className="block w-full bg-transparent px-1 text-[16px] leading-[1.25] text-[var(--hll-dark-grey)] outline-none placeholder:text-[var(--hll-mid-grey)]"
          />
          <ul className="mt-8 space-y-[3px]">
            {query && results.length === 0 ? (
              <li className="px-2 pb-2 text-[12px] leading-[1.25] text-[var(--hll-mid-grey)]">
                No matches yet.
              </li>
            ) : null}
            {results.map((entry) => (
              <li key={entry.href}>
                <Link
                  href={entry.href}
                  className={`flex h-12 items-center gap-[19px] rounded-[6px] bg-[rgba(250,250,250,0.8)] pl-3 pr-[15px] transition-colors hover:bg-white ${GLASS}`}
                >
                  <span
                    aria-hidden
                    className="size-[26px] shrink-0 rounded-[2.5px] opacity-80"
                    style={{
                      background: entry.colors
                        ? `linear-gradient(90deg, ${entry.colors.join(", ")})`
                        : "#949494",
                    }}
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[14px] leading-[1.25] text-[var(--hll-dark-grey)]">
                      {entry.title}
                    </span>
                    <span className="block text-[10px] leading-[1.25] text-[var(--hll-mid-grey)]">
                      Learn more
                    </span>
                  </span>
                  <OpenIcon />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {/* The orb: Figma's image in a 57px circle under a 5.2px layer blur,
          sitting 10px further left once the bubble opens. */}
      <button
        type="button"
        aria-label={
          stage === "rest"
            ? "Open the HLL assistant"
            : "Close the HLL assistant"
        }
        aria-expanded={stage !== "rest"}
        onClick={() => setStage((s) => (s === "rest" ? "open" : "rest"))}
        className="absolute bottom-[30px] grid size-[57px] place-items-center rounded-full transition-[right] duration-300 ease-out"
        style={{ right: stage === "rest" ? 51 : 41 }}
      >
        <span
          aria-hidden
          className="size-full rounded-full bg-[length:158%_158%] bg-center blur-[5.2px] saturate-[0.86] transition-transform duration-300 hover:scale-105"
          style={{ backgroundImage: "url(/assets/ai/orb.png)" }}
        />
      </button>
    </div>
  );
}
