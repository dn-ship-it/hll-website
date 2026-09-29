import Link from "next/link";

import type { SiteNavItem } from "@/lib/payload/marketing-mappers";

import { FooterCta } from "./footer-cta";

/*
 * Figma "Footer" component (1341:23164, 1512 × 980), used on every page:
 * a 237px "Let's start a conversation" band, then the body on Background with
 * the large logo, four text columns, and a shader strip behind the copyright.
 * All list type is the Button style: Aeonik 12px, uppercase, 0.25em tracking,
 * on a 28px line; group headings are Mid Grey, items Dark Grey.
 */

const FOOTER_NAV: SiteNavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Team", href: "/team" },
  { label: "Engagement", href: "/engagement" },
  { label: "Contact", href: "/contact" },
];

const DEFAULT_FOOTER_SERVICES = [
  "HLL Application",
  "HLL People & Policy",
  "HLL Trust & Governance",
  "HLL Foundation",
  "HLL AI",
  "HLL Ontology",
];

type IndustryGroup = { title: string; items: string[] };

// Figma lists industries as groups over two columns; the second column has no
// "industry" heading, so it starts one line lower.
const INDUSTRY_COLUMNS: IndustryGroup[][] = [
  [
    { title: "Financial Services", items: ["Banking", "Insurance", "Other Financial Services"] },
    { title: "Commerce & Consumer", items: ["Retail Commerce & Brands", "Travel & Hospitality", "Pet Tech"] },
    { title: "Health & Life Sciences", items: ["Healthcare", "Pharmaceuticals"] },
  ],
  [
    { title: "Built Environment & Industry", items: ["Manufacturing", "Real Estate", "Logistics"] },
    {
      title: "Government & Public Institutions",
      items: ["Public Sector – External Affairs", "Public Sector – Tax & Commerce", "International Organization"],
    },
    { title: "Professional Services", items: ["Consulting Firms"] },
  ],
];

// Figma sets every list line on one line (e.g. "Government & Public
// Institutions" fills its 305px column exactly), so lines never wrap on desktop.
const LIST = "text-[12px] uppercase leading-[28px] tracking-[0.25em] lg:whitespace-nowrap";

function FooterButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="inline-flex h-[36.5px] items-center rounded-[4px] bg-[var(--hll-light-grey)] px-[21px] text-[12px] uppercase leading-none tracking-[0.25em] text-[var(--hll-dark-grey)] transition-colors hover:bg-[#d9d9d9]"
    >
      {children}
    </a>
  );
}

type SiteFooterProps = {
  siteName?: string;
  socialLinks?: { platform?: string | null; url: string }[];
  services?: string[];
  ctaHeadline?: string;
  ctaLabel?: string;
  ctaHref?: string;
  /** This page's CTA background video (Figma: "each page will play a different video"). */
  ctaVideo?: string;
};

export function SiteFooter({
  siteName = "Hyper Lychee Labs",
  socialLinks = [],
  services = DEFAULT_FOOTER_SERVICES,
  ctaHeadline = "Let’s start a conversation",
  ctaLabel = "Write to us",
  ctaHref = "/contact",
  ctaVideo,
}: SiteFooterProps) {
  const emailLink = socialLinks.find((s) => s.platform === "email")?.url ?? "mailto:hello@hyperlychee.com";
  const linkedInLink = socialLinks.find((s) => s.platform === "linkedin")?.url ?? "https://linkedin.com";

  return (
    <footer className="bg-[var(--hll-bg)]">
      <FooterCta
        headline={ctaHeadline}
        label={ctaLabel}
        href={ctaHref}
        poster="/assets/footer/cta-still.webp"
        videoSrc={ctaVideo}
      />

      <div className="relative overflow-hidden px-[clamp(1.25rem,1.98vw,1.875rem)] pt-[52px] lg:min-h-[743px]">
        {/* Shader strip behind the copyright row: Figma crops the image to
            its middle band (x 22.9–100%, y 47.3–69.1%) and stretches it. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-[514px] hidden h-[241px] lg:block"
          style={{
            backgroundImage: "url(/assets/footer/footer-strip.webp)",
            backgroundSize: "129.7% 457.9%",
            backgroundPosition: "100% 60.5%",
          }}
        />

        <Link href="/" aria-label={siteName} className="relative inline-flex items-center gap-[22px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/hll-mark.png" alt="" aria-hidden className="h-[66px] w-[48px]" />
          <span className="text-[32.7px] leading-none text-[#535353]">{siteName}</span>
        </Link>

        <div className="relative mt-[22px] grid gap-10 sm:grid-cols-2 lg:grid-cols-[455fr_151fr_260fr_281fr_305fr] lg:gap-0">
          <div className="hidden lg:block" />

          <ul className={`${LIST} text-[var(--hll-dark-grey)]`}>
            {FOOTER_NAV.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-black">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <ul className={`${LIST} text-[var(--hll-dark-grey)]`}>
            <li className="text-[var(--hll-mid-grey)]">Services</li>
            {services.map((label) => (
              <li key={label}>{label}</li>
            ))}
          </ul>

          {INDUSTRY_COLUMNS.map((groups, col) => (
            <div key={col} className={`${LIST} text-[var(--hll-dark-grey)] ${col === 1 ? "lg:pt-[28px]" : ""}`}>
              {col === 0 ? <p className="text-[var(--hll-mid-grey)]">Industry</p> : null}
              {groups.map((group, i) => (
                <ul key={group.title} className={i > 0 ? "mt-[28px]" : undefined}>
                  <li className="text-[var(--hll-mid-grey)]">{group.title}</li>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ))}
            </div>
          ))}
        </div>

        <div className="relative mt-16 flex flex-wrap items-start justify-between gap-4 pb-12 lg:absolute lg:inset-x-0 lg:bottom-[48px] lg:mt-0 lg:pb-0 lg:pl-[23px] lg:pr-[30px]">
          <p className="mt-[18px] text-[12px] uppercase leading-none tracking-[0.25em] text-black">
            ©{siteName} {new Date().getFullYear()}
          </p>
          <div className="flex gap-2">
            <FooterButton href={emailLink}>Email</FooterButton>
            <FooterButton href={linkedInLink}>LinkedIn</FooterButton>
          </div>
        </div>
      </div>
    </footer>
  );
}
