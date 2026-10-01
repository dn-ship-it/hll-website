import Link from "next/link";

import type { SiteNavItem } from "@/lib/payload/marketing-mappers";

import { NavMark } from "./nav-mark";
import { MobileMenu } from "./mobile-menu";
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
  markTint,
  news = DEFAULT_NEWS,
}: {
  siteName?: string;
  nav?: SiteNavItem[];
  /** Service/industry colour for the logo mark; grey when omitted. */
  markTint?: string;
  /** "In the News" in the nav menus. */
  news?: NewsData;
}) {
  return (
    <header className="sticky top-0 z-50 h-[var(--nav-h)] bg-white lg:bg-[#fafafa]">
      {/* Figma Nav Mobile: logo at (20, 21) with the mark cropped to 25 × 34,
          the menu dot 19px from the edge. Nav Bar (desktop): logo block at
          (30, 11.5), menu buttons 36px tall on y 20, 20px apart, ending 12px
          from the edge. */}
      <div className="flex h-full items-center justify-between pl-5 pr-[19px] pt-[2px] lg:pl-[30px] lg:pr-3 lg:pt-[9px]">
        <Link
          href="/"
          aria-label={siteName}
          className="flex shrink-0 items-center gap-[11px] text-[#383838] lg:h-[51px] lg:gap-[10px]"
        >
          <NavMark
            tint={markTint}
            className="block h-[34px] w-[25px] shrink-0 lg:h-[51px] lg:w-[25.5px]"
          />
          <span
            className="whitespace-nowrap text-[17.28px] leading-none lg:relative lg:-top-[2px]"
            style={{
              fontFamily: '"Aeonik TRIAL", var(--font-geist-sans), sans-serif',
            }}
          >
            {siteName}
          </span>
        </Link>

        <NavMenu nav={nav} news={news} />
        <MobileMenu
          siteName={siteName}
          nav={nav}
          news={news}
          markTint={markTint}
        />
      </div>
    </header>
  );
}

export { DEFAULT_NAV as NAV };
