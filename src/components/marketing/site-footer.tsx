import Link from "next/link";

import type { SiteNavItem } from "@/lib/payload/marketing-mappers";

import { FooterButton, FooterCta } from "./footer-cta";
import { HllMark } from "./hll-mark";

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
    {
      title: "Financial Services",
      items: ["Banking", "Insurance", "Other Financial Services"],
    },
    {
      title: "Commerce & Consumer",
      items: ["Retail Commerce & Brands", "Travel & Hospitality", "Pet Tech"],
    },
    {
      title: "Health & Life Sciences",
      items: ["Healthcare", "Pharmaceuticals"],
    },
  ],
  [
    {
      title: "Built Environment & Industry",
      items: ["Manufacturing", "Real Estate", "Logistics"],
    },
    {
      title: "Government & Public Institutions",
      items: [
        "Public Sector – External Affairs",
        "Public Sector – Tax & Commerce",
        "International Organization",
      ],
    },
    { title: "Professional Services", items: ["Consulting Firms"] },
  ],
];

// Figma sets every list line on one line (e.g. "Government & Public
// Institutions" fills its 305px column exactly), so lines never wrap on desktop.
const LIST =
  "text-[12px] uppercase leading-[28px] tracking-[0.25em] whitespace-nowrap";

// Footer Mobile: 10px, 0.25em tracking, 20px lines; a name that wraps closes
// up to 14px lines (Figma "Public Sector – / External Affairs").
const MOBILE_LIST = "text-[10px] uppercase tracking-[0.25em]";
const MOBILE_ITEM = "py-[3px] leading-[14px]";

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
  const emailLink =
    socialLinks.find((s) => s.platform === "email")?.url ??
    "mailto:hello@hyperlychee.com";
  const linkedInLink =
    socialLinks.find((s) => s.platform === "linkedin")?.url ??
    "https://linkedin.com";

  return (
    <footer className="bg-[var(--hll-bg)]">
      <FooterCta
        headline={ctaHeadline}
        label={ctaLabel}
        href={ctaHref}
        poster="/assets/footer/cta-still.webp"
        videoSrc={ctaVideo}
      />

      <MobileFooterBody
        siteName={siteName}
        services={services}
        emailLink={emailLink}
        linkedInLink={linkedInLink}
      />

      <div className="relative hidden min-h-[743px] overflow-hidden px-[clamp(1.25rem,calc(1.98*var(--vw)),1.875rem)] pt-[52px] lg:block">
        {/* Shader strip behind the copyright row: Figma crops the image to
            its middle band (x 22.9–100%, y 47.3–69.1%) and stretches it. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-[514px] h-[241px]"
          style={{
            backgroundImage: "url(/assets/footer/footer-strip.webp)",
            backgroundSize: "129.7% 457.9%",
            backgroundPosition: "100% 60.5%",
          }}
        ></div>

        <Link
          href="/"
          aria-label={siteName}
          className="relative inline-flex items-center gap-[22px]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/hll-mark.png"
            alt=""
            aria-hidden
            className="h-[66px] w-[48px]"
          />
          <span className="text-[32.7px] leading-none text-[#535353]">
            {siteName}
          </span>
        </Link>

        <div className="relative mt-[22px] grid grid-cols-[455fr_151fr_260fr_281fr_305fr]">
          <div />

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
            <div
              key={col}
              className={`${LIST} text-[var(--hll-dark-grey)] ${col === 1 ? "pt-[28px]" : ""}`}
            >
              {col === 0 ? (
                <p className="text-[var(--hll-mid-grey)]">Industry</p>
              ) : null}
              {groups.map((group, i) => (
                <ul
                  key={group.title}
                  className={i > 0 ? "mt-[28px]" : undefined}
                >
                  <li className="text-[var(--hll-mid-grey)]">{group.title}</li>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ))}
            </div>
          ))}
        </div>

        <div
          data-footer-row
          className="absolute inset-x-0 bottom-[48px] z-[31] flex items-start justify-between gap-4 pl-[23px] pr-[30px]"
        >
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

/**
 * Figma Footer Mobile (1341:12761, 402 × 1103) under the CTA band: logo at
 * (20, 35), then two columns — nav and services at x 20, industries at x 190
 * — and the copyright row 26px from the bottom over the blurred strip.
 */
function MobileFooterBody({
  siteName,
  services,
  emailLink,
  linkedInLink,
}: {
  siteName: string;
  services: string[];
  emailLink: string;
  linkedInLink: string;
}) {
  const groups = INDUSTRY_COLUMNS.flat();
  return (
    <div className="relative overflow-hidden px-5 pb-[26px] pt-[35px] lg:hidden">
      {/* The strip's image fill, cropped to its centre band and under a 34px
          Figma layer blur, behind the copyright row. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-3 h-[241px] blur-[17px]"
        style={{
          backgroundImage: "url(/assets/footer/footer-strip.webp)",
          backgroundSize: "489.3% 457.9%",
          backgroundPosition: "51.9% 60.5%",
        }}
      />

      <Link
        href="/"
        aria-label={siteName}
        className="relative flex w-fit items-center gap-[11px] text-[#535353]"
      >
        <HllMark className="block h-[34px] w-[25px] shrink-0" />
        <span className="whitespace-nowrap text-[17.28px] leading-none">
          {siteName}
        </span>
      </Link>

      <div
        className={`relative mt-[34px] grid grid-cols-[150px_1fr] gap-x-5 ${MOBILE_LIST} text-[var(--hll-dark-grey)]`}
      >
        <div className="pt-1">
          <ul>
            {FOOTER_NAV.map((link) => (
              <li key={link.href} className={MOBILE_ITEM}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
          <ul className="mt-[37px]">
            <li className={`${MOBILE_ITEM} text-[var(--hll-mid-grey)]`}>
              Services
            </li>
            {services.map((label) => (
              <li key={label} className={MOBILE_ITEM}>
                {label}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className={`${MOBILE_ITEM} text-[var(--hll-mid-grey)]`}>Industry</p>
          {groups.map((group, i) => (
            <ul key={group.title} className={i > 0 ? "mt-5" : undefined}>
              <li className={`${MOBILE_ITEM} text-[var(--hll-mid-grey)]`}>
                {group.title}
              </li>
              {group.items.map((item) => (
                <li key={item} className={MOBILE_ITEM}>
                  {item}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      <div className="relative -mr-[10px] mt-[93px] flex items-center justify-between gap-4">
        <p className="text-[9px] uppercase leading-none tracking-[0.25em] text-black">
          ©{siteName} {new Date().getFullYear()}
        </p>
        <div className="flex gap-2">
          <FooterButton href={emailLink}>Email</FooterButton>
          <FooterButton href={linkedInLink}>LinkedIn</FooterButton>
        </div>
      </div>
    </div>
  );
}
