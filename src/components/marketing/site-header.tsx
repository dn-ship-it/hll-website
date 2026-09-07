import Link from "next/link";

import {
  HLLButton,
  NAV_VARIANTS,
  VARIANT_GRADIENTS,
  type NavVariant,
} from "@/components/hll";

const NAV_ITEMS: { label: string; href: string; variant: NavVariant }[] = [
  { label: "Services", href: "/services", variant: "services" },
  { label: "Industries", href: "/industries", variant: "industries" },
  { label: "Engagement", href: "/engagement", variant: "engagement" },
  { label: "About", href: "/about", variant: "about" },
  { label: "Contact", href: "/contact", variant: "contact" },
];

export function SiteHeader({ activeVariant }: { activeVariant?: NavVariant }) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-[#0c0c0c]/80 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-[90rem] items-center justify-between gap-6 px-[clamp(1.25rem,4vw,2.5rem)] py-5">
        <Link href="/" className="group flex items-center gap-3">
          <span
            className="flex size-9 items-center justify-center rounded-full text-xs font-bold text-white"
            style={{
              background: `linear-gradient(135deg, ${VARIANT_GRADIENTS["hll-ai"].colors.join(", ")})`,
            }}
          >
            HLL
          </span>
          <div className="leading-tight">
            <p className="text-sm font-semibold tracking-wide text-white">Cornerstone</p>
            <p className="text-[11px] uppercase tracking-[0.18em] text-white/45">
              India
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 lg:flex">
          {NAV_ITEMS.map((item) => (
            <HLLButton
              key={item.href}
              href={item.href}
              variant={item.variant}
              size="sm"
              active={activeVariant === item.variant}
            >
              {item.label}
            </HLLButton>
          ))}
        </nav>

        <details className="relative lg:hidden">
          <summary className="cursor-pointer list-none rounded-full border border-white/10 px-4 py-2 text-sm text-white/80">
            Menu
          </summary>
          <div className="absolute right-0 mt-3 flex w-56 flex-col gap-2 rounded-2xl border border-white/10 bg-[#111]/95 p-3 shadow-2xl">
            {NAV_ITEMS.map((item) => (
              <HLLButton
                key={item.href}
                href={item.href}
                variant={item.variant}
                size="sm"
                className="w-full"
              >
                {item.label}
              </HLLButton>
            ))}
          </div>
        </details>
      </div>
    </header>
  );
}

export { NAV_ITEMS, NAV_VARIANTS };
