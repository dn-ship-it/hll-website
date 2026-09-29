import Link from "next/link";

import type { SiteNavItem } from "@/lib/payload/marketing-mappers";


const DEFAULT_NAV: SiteNavItem[] = [
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Engagement", href: "/engagement" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function SiteHeader({
  siteName = "Hyper Lychee Labs",
  nav = DEFAULT_NAV,
  compact = false,
  markSrc,
}: {
  siteName?: string;
  nav?: SiteNavItem[];
  compact?: boolean;
  /** Service/industry-tinted logo mark (Figma "logo in the navbar changes
      colour according to the service or industries"); grey when omitted. */
  markSrc?: string;
}) {
  return (
    <header className={`sticky top-0 z-50 ${compact ? "h-9 bg-white" : "h-[66px] bg-[#fafafa]"}`}>
      <div className={`flex h-full items-center justify-between ${compact ? "px-5" : "px-[30px] pt-1.5"}`}>
        <Link
          href="/"
          aria-label={siteName}
          className={`flex shrink-0 items-center text-[#383838] ${compact ? "gap-2" : "h-[51px] gap-[10px]"}`}
        >
          {/* Figma Nav Bar: the mark is drawn at 28 × 35, which squashes the
              two lobes of the 25.5 × 51 vector into flat domes. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={markSrc ?? "/assets/hll-mark.png"}
            alt=""
            aria-hidden="true"
            className={compact ? "block h-[18px] w-[14px] shrink-0" : "block h-[35px] w-[28px] shrink-0"}
          />
          <span
            className={`whitespace-nowrap leading-none ${compact ? "text-[10px]" : "text-[17.28px]"}`}
            style={{ fontFamily: '"Aeonik TRIAL", var(--font-geist-sans), sans-serif' }}
          >
            {siteName}
          </span>
        </Link>

        <nav
          className={`items-center ${compact ? "hidden gap-1 sm:flex" : "mr-[-21px] hidden gap-0 lg:flex"}`}
          aria-label="Main navigation"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-[4px] uppercase leading-none text-[#949494] transition-colors hover:text-[#383838] focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#949494] ${
                compact
                  ? "px-2 py-2 text-[7px] tracking-[1.6px]"
                  : "px-[21px] py-[11px] text-[12px] tracking-[3px]"
              }`}
              style={{ fontFamily: '"Aeonik TRIAL", var(--font-geist-sans), sans-serif' }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

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
                style={{ fontFamily: '"Aeonik TRIAL", var(--font-geist-sans), sans-serif' }}
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
