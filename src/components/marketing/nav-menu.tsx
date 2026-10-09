"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { VARIANT_GRADIENTS, type NavVariant } from "@/components/hll";
import type { ServiceVariant } from "@/components/hll/variants";
import { SERVICE_LABELS } from "@/data/engagements";
import { INDUSTRY_PAGES } from "@/data/industries";
import type { SiteNavItem } from "@/lib/payload/marketing-mappers";

export type NewsItem = { title: string; href?: string | null };
export type NewsData = { image?: string | null; items: NewsItem[] };

const NAV_FONT = {
  fontFamily: '"Aeonik TRIAL", var(--font-geist-sans), sans-serif',
};

// Figma Nav Bar order and the palette each button takes on hover / click.
export const VARIANT_BY_HREF: Record<string, NavVariant> = {
  "/services": "services",
  "/industries": "industries",
  "/engagement": "engagement",
  "/about": "about",
  "/contact": "contact",
};

// Figma Services Menu order (Kinetic, Momentum, Governance & Trust,
// Foundation, Motion, Foundation → today's names).
export const MENU_SERVICES: ServiceVariant[] = [
  "hll-application",
  "hll-people",
  "hll-trust",
  "hll-foundation",
  "hll-ai",
  "hll-ontology",
];

// Figma Industries Menu: two rows of three groups.
export const MENU_INDUSTRIES = [
  {
    title: "Financial services",
    items: ["Banking", "Insurance", "Other Financial Services"],
  },
  {
    title: "Commerce & Consumer",
    items: ["Retail Commerce & Brands", "Travel & Hospitality", "Pet Tech"],
  },
  { title: "Health & Life Sciences", items: ["Healthcare", "Pharmaceuticals"] },
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
];

export const industryHref = (label: string) => {
  const slug = label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return INDUSTRY_PAGES[slug] ? `/industries/${slug}` : null;
};

// Figma: each menu's panel keeps its own place under the Nav Bar (right
// edges at x 1247 / 1244 of 1512, News at 1503); About's sits under its button.
const PANEL_RIGHT: Record<NavVariant, number> = {
  services: 265,
  industries: 268,
  engagement: 9,
  about: 44,
  contact: 9,
};

// Figma's panels: Light Grey at 80–90% over a background blur, 4px corners.
function Panel({
  className = "",
  opacity = 0.8,
  children,
}: {
  className?: string;
  opacity?: number;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`rounded-[4px] backdrop-blur-[15px] ${className}`}
      style={{ background: `rgba(230, 230, 230, ${opacity})` }}
    >
      {children}
    </div>
  );
}

const ITEM =
  "text-[12px] text-[var(--hll-dark-grey)] underline-offset-[3px] hover:underline";

/** Figma "In the News": image slot, then three headlines split by hairlines. */
export function NewsPanel({
  news,
  opacity,
  className = "w-[250px] px-[10px]",
  dividerClassName = "my-[11px]",
}: {
  news: NewsData;
  opacity: number;
  className?: string;
  dividerClassName?: string;
}) {
  return (
    <Panel className={`h-[242px] pt-[19px] ${className}`} opacity={opacity}>
      <p
        className="hll-label text-[12px] uppercase leading-[1.2] text-black"
        style={{ fontFamily: "var(--hll-font-functional)" }}
      >
        In the News
      </p>
      <div
        className="mt-2 h-[87px] rounded-[4px] bg-[var(--hll-bg)]"
        style={
          news.image
            ? { background: `var(--hll-bg) url(${news.image}) center / cover` }
            : undefined
        }
      />
      <ul className="mt-[9px]">
        {news.items.slice(0, 3).map((item, i) => (
          <li key={`${item.title}-${i}`}>
            {i > 0 ? (
              <div
                className={`h-px bg-[var(--hll-mid-grey)] ${dividerClassName}`}
              />
            ) : null}
            {item.href ? (
              <Link
                href={item.href}
                className={`block leading-[1.25] text-black ${ITEM}`}
              >
                {item.title}
              </Link>
            ) : (
              <p className="text-[12px] leading-[1.25] text-black">
                {item.title}
              </p>
            )}
          </li>
        ))}
      </ul>
    </Panel>
  );
}

function ServicesPanel() {
  return (
    <Panel className="min-h-[242px] w-[354px] px-[17px] pb-2 pt-[17px]">
      <ul>
        {MENU_SERVICES.map((service) => (
          <li key={service}>
            <Link
              href={`/services/${service}`}
              className={`group/svc flex h-9 items-center gap-[10px] ${ITEM}`}
            >
              {/* Hover: the service's own palette fills its icon tile. */}
              <span className="relative grid size-6 place-items-center overflow-hidden rounded-[4px] bg-[var(--hll-bg)]">
                <span
                  aria-hidden
                  className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/svc:opacity-100"
                  style={{
                    background: `linear-gradient(135deg, ${VARIANT_GRADIENTS[service].colors.join(", ")})`,
                  }}
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/assets/services/${service}-glyph.svg`}
                  alt=""
                  className="relative size-5 transition-[filter] duration-300 group-hover/svc:invert"
                />
              </span>
              {SERVICE_LABELS[service]}
            </Link>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

function IndustriesPanel() {
  return (
    <Panel
      className="min-h-[242px] w-[607px] px-[21px] pb-4 pt-[20px]"
      opacity={0.9}
    >
      <div className="grid grid-cols-[207fr_207fr_151fr] gap-y-[31px]">
        {MENU_INDUSTRIES.map((group) => (
          <div key={group.title}>
            <p className="text-[12px] leading-[1.25] text-[var(--hll-mid-grey)]">
              {group.title}
            </p>
            <ul className="mt-[13px]">
              {group.items.map((label) => {
                const href = industryHref(label);
                return (
                  <li key={label} className="text-[12px] leading-[1.65]">
                    {href ? (
                      <Link href={href} className={ITEM}>
                        {label}
                      </Link>
                    ) : (
                      <span className="text-[12px] text-[var(--hll-dark-grey)]">
                        {label}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function AboutPanel() {
  return (
    <Panel className="min-h-[139px] w-[196px] px-[25px] pb-2 pt-[11px]">
      <ul>
        {[
          { label: "About", href: "/about" },
          { label: "Team", href: "/team" },
          { label: "Careers", href: "/careers" },
        ].map((link) => (
          <li key={link.href}>
            <Link href={link.href} className={`block leading-9 ${ITEM}`}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

/**
 * Figma Menu / Nav: "palettes for each menu button that changes on hover and
 * click gives the shader effect" — and from the glossary, "the shader also
 * covers the screen upon interacting with or clicking on any options in the
 * navbar". Hovering a button lights it with its palette; clicking opens its
 * menu over the shader in that palette. Clicking the open button again goes
 * to its page, except Industries, which has no page (see MENU_ONLY).
 */
/** Nav buttons with no landing page of their own: they only open their menu. */
const MENU_ONLY = new Set(["/industries"]);

export function NavMenu({ nav, news }: { nav: SiteNavItem[]; news: NewsData }) {
  const [open, setOpen] = useState<NavVariant | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef(0);
  const pathname = usePathname();

  // Hover opens a button's menu; a short grace period lets the pointer
  // travel from the button down into its panel without it closing.
  const show = (variant: NavVariant) => {
    window.clearTimeout(closeTimer.current);
    setOpen(variant);
  };
  const hide = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(null), 180);
  };

  useEffect(() => setOpen(null), [pathname]);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event: KeyboardEvent) =>
      event.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const panels = open ? (
    <>
      {open === "services" ? <ServicesPanel /> : null}
      {open === "industries" ? <IndustriesPanel /> : null}
      {open === "about" ? <AboutPanel /> : null}
      {/* "In the News" sits under Engagement only. */}
      {open === "engagement" ? <NewsPanel news={news} opacity={0.8} /> : null}
    </>
  ) : null;

  return (
    <div ref={rootRef} className="hidden lg:block">
      <nav className="flex items-center gap-5" aria-label="Main navigation">
        {nav.map((item) => {
          const variant = VARIANT_BY_HREF[item.href];
          const active = open === variant;
          const colors = variant ? VARIANT_GRADIENTS[variant].colors : null;
          const triggerProps = {
            "aria-expanded": variant ? active : undefined,
            onPointerEnter: () => variant && show(variant),
            onPointerLeave: hide,
            onFocus: () => variant && show(variant),
            className:
              "group relative flex h-9 items-center rounded-[4px] pl-[21px] pr-[18px] text-[12px] uppercase leading-none tracking-[3px] focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#949494]",
            style: NAV_FONT,
          };
          const content = (
            <>
              {/* Figma: the button's palette as a gradient fill under a 12px
                  layer blur (CSS blur 6px renders the same softness), the
                  label turning white over it. */}
              {colors ? (
                <span
                  aria-hidden
                  className={`absolute inset-0 rounded-[4px] blur-[6px] transition-opacity duration-300 ${
                    active ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  }`}
                  style={{
                    background: `linear-gradient(90deg, ${colors.join(", ")})`,
                  }}
                />
              ) : null}
              <span
                className={`relative transition-colors duration-300 ${
                  active
                    ? "text-[#FAFAFA]"
                    : "text-[#949494] group-hover:text-[#FAFAFA]"
                }`}
              >
                {item.label}
              </span>
            </>
          );
          // QA N-01: there's no general Industries page, so Industries only
          // opens its menu and the visitor picks an industry from it.
          return MENU_ONLY.has(item.href) ? (
            <button
              key={item.href}
              type="button"
              aria-haspopup="true"
              onClick={() => variant && show(variant)}
              {...triggerProps}
            >
              {content}
            </button>
          ) : (
            <Link key={item.href} href={item.href} {...triggerProps}>
              {content}
            </Link>
          );
        })}
      </nav>

      {/* Hover: just the menu, in the space under the Nav Bar. */}
      {open ? (
        <div
          onPointerEnter={() => show(open)}
          onPointerLeave={hide}
          className="fixed top-[var(--nav-h)] flex items-start gap-[6px] pt-2 [animation:page-intro-in_300ms_cubic-bezier(0.22,1,0.36,1)_both]"
          style={{ right: PANEL_RIGHT[open] }}
        >
          {panels}
        </div>
      ) : null}
    </div>
  );
}
