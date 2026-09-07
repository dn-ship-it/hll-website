import Link from "next/link";

const NAV = [
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Engagement", href: "/engagement" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/6 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[90rem] items-center justify-between gap-6 px-[clamp(1.25rem,4vw,3rem)] py-4">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-full border border-black/10 bg-[#f5f5f5] text-[10px] font-bold text-black">
            HLL
          </span>
          <span className="text-sm font-medium tracking-tight text-black">
            Hyper Lychee Labs
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[10px] font-medium uppercase tracking-[0.22em] text-black/70 transition hover:text-black"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <details className="relative lg:hidden">
          <summary className="cursor-pointer list-none text-[10px] uppercase tracking-[0.18em] text-black/70">
            Menu
          </summary>
          <div className="absolute right-0 mt-2 flex w-48 flex-col gap-2 rounded-lg border border-black/10 bg-white p-3 shadow-lg">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[10px] uppercase tracking-[0.16em] text-black/70 hover:text-black"
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

export { NAV };
