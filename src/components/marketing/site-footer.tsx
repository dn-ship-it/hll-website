import Link from "next/link";

const FOOTER_NAV = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Team", href: "/about" },
  { label: "Engagement", href: "/engagement" },
  { label: "Contact", href: "/contact" },
];

const FOOTER_SERVICES = [
  "HLL Kinetic",
  "HLL Momentum",
  "HLL Mission",
  "HLL Foundation",
  "HLL Ontology",
  "HLL Trust & Governance",
];

const FOOTER_INDUSTRIES = [
  "Financial Services",
  "Banking",
  "Insurance",
  "Healthcare",
  "Retail",
  "Technology",
];

export function SiteFooter() {
  return (
    <footer className="border-t border-black/6 bg-white">
      <div className="mx-auto grid max-w-[90rem] gap-10 px-[clamp(1.25rem,4vw,3rem)] py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-sm font-medium text-black">Hyper Lychee Labs</p>
          <p className="mt-3 text-sm leading-7 text-black/50">
            Future-facing initiatives for accelerated advancement.
          </p>
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-black/40">Navigation</p>
          <ul className="mt-4 space-y-2">
            {FOOTER_NAV.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="text-xs text-black/60 hover:text-black">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-black/40">Services</p>
          <ul className="mt-4 space-y-2">
            {FOOTER_SERVICES.map((label) => (
              <li key={label} className="text-xs text-black/55">
                {label}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-black/40">Industry</p>
          <ul className="mt-4 space-y-2">
            {FOOTER_INDUSTRIES.map((label) => (
              <li key={label} className="text-xs text-black/55">
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div
        className="relative overflow-hidden border-t border-black/6 px-[clamp(1.25rem,4vw,3rem)] py-8"
      >
        <div
          className="footer-shader pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "linear-gradient(120deg, #FF9126, #2BB4EB, #7455FF, #F7A567)",
            filter: "blur(60px)",
          }}
        />
        <div className="relative flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="text-[10px] uppercase tracking-[0.16em] text-black/45">
            © Hyper Lychee Labs {new Date().getFullYear()}
          </p>
          <div className="flex gap-3">
            <a
              href="mailto:hello@hyperlychee.com"
              className="rounded-full border border-black/15 px-4 py-1.5 text-[10px] uppercase tracking-wider text-black/70"
            >
              Email
            </a>
            <a
              href="https://linkedin.com"
              className="rounded-full border border-black/15 px-4 py-1.5 text-[10px] uppercase tracking-wider text-black/70"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
