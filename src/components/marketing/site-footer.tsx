import Link from "next/link";

import { SERVICE_VARIANTS, VARIANT_GRADIENTS } from "@/components/hll";
import { HLLButton } from "@/components/hll/hll-button";

const FOOTER_LINKS = [
  { label: "Tenders", href: "/tenders" },
  { label: "Careers", href: "/careers" },
  { label: "News", href: "/news" },
  { label: "Estimate", href: "/estimate" },
  { label: "CMS", href: "/admin" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/8 bg-[#090909]">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1.2fr_1fr] lg:px-10">
        <div>
          <p className="text-lg font-semibold text-white">HLL × Cornerstone India</p>
          <p className="mt-3 max-w-md text-sm leading-7 text-white/55">
            Healthcare logistics, trust infrastructure, and digital innovation for
            public health systems across India.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-white/35">Explore</p>
            <div className="mt-4 flex flex-col gap-2">
              {FOOTER_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/60 transition hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-white/35">Services</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {SERVICE_VARIANTS.map((variant) => (
                <HLLButton
                  key={variant}
                  href={`/services/${variant}`}
                  variant={variant}
                  size="sm"
                >
                  {variant.replace("hll-", "").replace(/-/g, " ")}
                </HLLButton>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/8 px-6 py-6 text-center text-xs text-white/35 lg:px-10">
        © {new Date().getFullYear()} HLL Lifecare · Cornerstone India experience
      </div>
    </footer>
  );
}

export { FOOTER_LINKS, VARIANT_GRADIENTS };
