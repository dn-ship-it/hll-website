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
}: {
  siteName?: string;
  nav?: SiteNavItem[];
}) {
  return (
    <header className="sticky top-0 z-50 h-[66px] bg-[#fafafa]">
      <div className="flex h-full items-center justify-between px-[30px]">
        <Link
          href="/"
          aria-label={siteName}
          className="flex h-[51px] shrink-0 items-center gap-[10px] text-[#383838]"
        >
          {/* Keep the Figma SVG at its intrinsic 25.5 × 51 px dimensions. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/hll-mark.svg" alt="" aria-hidden="true" className="block shrink-0" />
          <span
            className="whitespace-nowrap text-[17.28px] leading-none"
            style={{ fontFamily: '"Aeonik TRIAL", var(--font-geist-sans), sans-serif' }}
          >
            {siteName}
          </span>
        </Link>

        <nav className="mr-[-18px] hidden items-center gap-5 lg:flex" aria-label="Main navigation">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-[4px] px-[21px] py-[11px] text-[12px] uppercase leading-none tracking-[3px] text-[#949494] transition-colors hover:text-[#383838] focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#949494]"
              style={{ fontFamily: '"Aeonik TRIAL", var(--font-geist-sans), sans-serif' }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <details className="relative lg:hidden">
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
