"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { HLLButton, Shader, TUNED_SETTINGS, VARIANT_GRADIENTS, type NavVariant } from "@/components/hll";
import type { ServiceVariant } from "@/components/hll/variants";
import { SERVICE_LABELS } from "@/data/engagements";
import { serviceHref } from "@/components/hll/variants";
import type { IndustryMenuGroup } from "@/data/industry-menu";
import type { SiteNavItem } from "@/lib/payload/marketing-mappers";

export type NewsItem = { title: string; href?: string | null };
export type NewsData = { image?: string | null; items: NewsItem[] };

const NAV_FONT = {
  fontFamily: '"Aeonik TRIAL", var(--font-geist-sans), sans-serif',
};

export const VARIANT_BY_HREF: Record<string, NavVariant> = {
  "/services": "services",
  "/industries": "industries",
  "/engagement": "engagement",
  "/about": "about",
  "/contact": "contact",
};


export const MENU_SERVICES: ServiceVariant[] = [
  "hll-application",
  "hll-people",
  "hll-trust",
  "hll-foundation",
  "hll-cloud",
  "hll-ai",
  "hll-ontology",
];

// Each menu's panel keeps its own place under the Nav Bar (right edges at x 1247 / 1244 of 1512, News at 1503); About's
// sits under its button. Services and Industries carry the 250px News panel + 6px gap, so they're placed by News's edge.
const PANEL_RIGHT: Record<NavVariant, number> = {
  services: 9,
  industries: 9,
  engagement: 9,
  about: 44,
  contact: 9,
};

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
  if (!news.items.length) return null;
  return (
    <Panel className={`h-[242px] pt-[19px] ${className}`} opacity={opacity}>
      {/* The Insights page is reached from here, not from its own menu item. */}
      <Link
        href="/insights"
        className="hll-label block text-[12px] uppercase leading-[1.2] text-black underline-offset-[3px] hover:underline"
        style={{ fontFamily: "var(--hll-font-functional)" }}
      >
        In the News
      </Link>
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
              href={serviceHref(service)}
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

function IndustriesPanel({ industries }: { industries: IndustryMenuGroup[] }) {
  return (
    <Panel
      // 3px more than the row's gap, so it still ends at x 1244 while News
      // keeps the same place under every menu.
      className="mr-[3px] min-h-[242px] w-[607px] px-[21px] pb-4 pt-[20px]"
      opacity={0.9}
    >
      <div className="grid grid-cols-[207fr_207fr_151fr] gap-y-[31px]">
        {industries.map((group) => (
          <div key={group.title}>
            <p className="text-[12px] leading-[1.25] text-[var(--hll-mid-grey)]">
              {group.title}
            </p>
            <ul className="mt-[13px]">
              {group.items.map(({ label, href }) => {
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

/** The About menu's pages (desktop panel and mobile list). */
export const ABOUT_LINKS = [
  { label: "About", href: "/about" },
  { label: "Team", href: "/team" },
  { label: "Careers", href: "/careers" },
];

function AboutPanel() {
  return (
    <Panel className="min-h-[139px] w-[196px] px-[25px] pb-2 pt-[11px]">
      <ul>
        {ABOUT_LINKS.map((link) => (
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
 * Nav items whose button goes elsewhere than their href: Industries has no landing page, so it goes to the Home
 * knowledge graph (hover still opens its menu).
 */
export const NAV_TARGET: Record<string, string> = {
  "/industries": "/#industries",
};

export function NavMenu({
  nav,
  news,
  industries,
}: {
  nav: SiteNavItem[];
  news: NewsData;
  industries: IndustryMenuGroup[];
}) {
  const [open, setOpen] = useState<NavVariant | null>(null);
  // The shader covers the screen in the open button's palette. Built on first open,
  // then kept paused so reopening doesn't rebuild it.
  const [shaderVariant, setShaderVariant] = useState<NavVariant | null>(null);
  useEffect(() => {
    if (open) setShaderVariant(open);
  }, [open]);
  const rootRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef(0);
  const pathname = usePathname();

  // Hover opens a button's menu; a short grace period lets the pointer
  // travel from the button down into its panel without it closing.
  const show = (variant: NavVariant) => {
    window.clearTimeout(closeTimer.current);
    // Engagement's menu is "In the News" alone: with no posts there is nothing to open.
    if (variant === "engagement" && !news.items.length) {
      setOpen(null);
      return;
    }
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
      {open === "industries" ? <IndustriesPanel industries={industries} /> : null}
      {open === "about" ? <AboutPanel /> : null}
      {/* "In the News" beside Services and Industries, and alone under Engagement. */}
      {open === "services" || open === "industries" || open === "engagement" ? (
        <NewsPanel news={news} opacity={0.8} />
      ) : null}
    </>
  ) : null;

  return (
    <div ref={rootRef} className="hidden lg:block">
      <nav className="flex items-center gap-5" aria-label="Main navigation">
        {nav.map((item) => {
          const variant = VARIANT_BY_HREF[item.href];
          const active = open === variant;
          // The palette's shader blooms on hover and follows the cursor.
          if (variant) {
            return (
              <HLLButton
                key={item.href}
                href={NAV_TARGET[item.href] ?? item.href}
                variant={variant}
                className="hll-button--nav"
                shaderOnHover
                aria-expanded={active}
                data-held={active ? "true" : undefined}
                onPointerEnter={() => show(variant)}
                onPointerLeave={hide}
                onFocus={() => show(variant)}
                style={{
                  ...NAV_FONT,
                  "--hll-label-color": "#949494",
                  "--hll-label-hover-color": "#FAFAFA",
                  "--hll-nav-gradient": `linear-gradient(90deg, ${VARIANT_GRADIENTS[variant].colors.join(", ")})`,
                } as CSSProperties}
              >
                {item.label}
              </HLLButton>
            );
          }
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
          // Industries has no page of its own, so it only opens its menu.
          return (
            <Link key={item.href} href={NAV_TARGET[item.href] ?? item.href} {...triggerProps}>
              {content}
            </Link>
          );
        })}
      </nav>

      {/* Under the menu: the shader over the page, below the Nav Bar, with a subtle blur of the page beneath. */}
      {shaderVariant ? (
        <div
          aria-hidden
          className="pointer-events-none fixed inset-x-0 top-[var(--nav-h)] h-[calc(100*var(--vh)-var(--nav-h))] backdrop-blur-[10px] transition-opacity duration-300 ease-out motion-reduce:hidden"
          style={{ opacity: open ? 1 : 0 }}
        />
      ) : null}
      {shaderVariant ? (
        <Shader
          variant={shaderVariant}
          settings={TUNED_SETTINGS}
          passthrough
          pauseOnDoubleClick={false}
          paused={!open}
          className="transition-opacity duration-300 ease-out motion-reduce:hidden"
          style={{
            background: "transparent",
            top: "var(--nav-h)",
            height: "calc(100 * var(--vh) - var(--nav-h))",
            opacity: open ? 1 : 0,
          }}
        />
      ) : null}

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
