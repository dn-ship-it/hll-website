import Link from "next/link";

import type { SiteNavItem } from "@/lib/payload/marketing-mappers";

import { NavMark } from "./nav-mark";
import { NavMenu, type NewsData } from "./nav-menu";

const DEFAULT_NAV: SiteNavItem[] = [
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Engagement", href: "/engagement" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

// PLACEHOLDER — Figma's "In the News" items until Posts are published in the CMS.
export const DEFAULT_NEWS: NewsData = {
  items: [
    { title: "Fresh Recruit: John Doe joins HLL" },
    { title: "HLL to showcase work at SFCON2026" },
    { title: "HLL to showcase work at SFCON2026" },
  ],
};

export function SiteHeader({
  siteName = "Hyper Lychee Labs",
  nav = DEFAULT_NAV,
  compact = false,
  markTint,
  news = DEFAULT_NEWS,
}: {
  siteName?: string;
  nav?: SiteNavItem[];
  compact?: boolean;
  /** Service/industry colour for the logo mark; grey when omitted. */
  markTint?: string;
  /** "In the News" in the nav menus. */
  news?: NewsData;
}) {
  return (
    <header
      className={`sticky top-0 z-50 ${compact ? "h-9 bg-white" : "h-[66px] bg-[#fafafa]"}`}
    >
      {/* Figma Nav Bar component: logo block at (30, 11.5), menu buttons
          36px tall on y 20, 20px apart, ending 12px from the edge. */}
      <div
        className={`flex h-full items-center justify-between ${compact ? "px-5" : "pl-[30px] pr-3 pt-[9px]"}`}
      >
        <Link
          href="/"
          aria-label={siteName}
          className={`flex shrink-0 items-center text-[#383838] ${compact ? "gap-2" : "h-[51px] gap-[10px]"}`}
        >
          <NavMark
            tint={markTint}
            className={
              compact
                ? "block h-[18px] w-[9px] shrink-0"
                : "block h-[51px] w-[25.5px] shrink-0"
            }
          />
          <span
            className={`whitespace-nowrap leading-none ${compact ? "text-[10px]" : "relative -top-[2px] text-[17.28px]"}`}
            style={{
              fontFamily: '"Aeonik TRIAL", var(--font-geist-sans), sans-serif',
            }}
          >
            {siteName}
          </span>
        </Link>

        {compact ? (
          <nav
            className="hidden items-center gap-1 sm:flex"
            aria-label="Main navigation"
          >
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-[4px] px-2 py-2 text-[7px] uppercase leading-none tracking-[1.6px] text-[#949494] transition-colors hover:text-[#383838]"
                style={{
                  fontFamily:
                    '"Aeonik TRIAL", var(--font-geist-sans), sans-serif',
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        ) : (
          <NavMenu nav={nav} news={news} />
        )}

        <details className={`relative ${compact ? "sm:hidden" : "lg:hidden"}`}>
          <summary className="cursor-pointer list-none text-[10px] uppercase tracking-[0.18em] text-[#383838]">
            Menu
          </summary>
          <div className="absolute right-0 mt-2 flex w-48 flex-col gap-2 rounded bg-[#fafafa] p-3 shadow-lg">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded px-2 py-2 text-[10px] uppercase tracking-[0.16em] text-[#949494] hover:text-[#383838] focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#949494]"
                style={{
                  fontFamily:
                    '"Aeonik TRIAL", var(--font-geist-sans), sans-serif',
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </details>
      </div>
    </header>
  );
}

export { DEFAULT_NAV as NAV };
