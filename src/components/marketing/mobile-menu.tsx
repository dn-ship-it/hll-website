"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { VARIANT_GRADIENTS, type NavVariant } from "@/components/hll";
import { SERVICE_LABELS } from "@/data/engagements";
import type { SiteNavItem } from "@/lib/payload/marketing-mappers";

import { NavMark } from "./nav-mark";
import {
  MENU_INDUSTRIES,
  MENU_SERVICES,
  NewsPanel,
  VARIANT_BY_HREF,
  industryHref,
  type NewsData,
} from "./nav-menu";

/** QA N-03: every menu size here is 2px over Figma, which read too small. */
const NAV_FONT = {
  fontFamily: '"Aeonik TRIAL", var(--font-geist-sans), sans-serif',
};

/** Figma Menu Mobile › Industries: the list scrolls inside a 178px window. */
const TRACK = 178;
const THUMB = 35;

function ServicesList() {
  return (
    <ul className="pl-[17px]">
      {MENU_SERVICES.map((service) => (
        <li key={service}>
          <Link
            href={`/services/${service}`}
            className="group/svc flex h-9 items-center gap-[10px] text-[14px] text-[var(--hll-dark-grey)]"
          >
            {/* The service's own palette fills its icon tile on hover / tap. */}
            <span className="relative grid size-6 place-items-center overflow-hidden rounded-[4px] bg-[var(--hll-bg)]">
              <span
                aria-hidden
                className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/svc:opacity-100 group-active/svc:opacity-100"
                style={{
                  background: `linear-gradient(135deg, ${VARIANT_GRADIENTS[service].colors.join(", ")})`,
                }}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/assets/services/${service}-glyph.svg`}
                alt=""
                className="relative size-[14px] transition-[filter] duration-300 group-hover/svc:invert group-active/svc:invert"
              />
            </span>
            {SERVICE_LABELS[service]}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function IndustriesList() {
  const listRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const onScroll = () => {
    const el = listRef.current;
    if (!el) return;
    const max = el.scrollHeight - el.clientHeight;
    setProgress(max > 0 ? el.scrollTop / max : 0);
  };

  return (
    <div className="relative pl-[38px]">
      {/* Figma's 3px scroll track and thumb, 20px in from the button. */}
      <span
        aria-hidden
        className="absolute left-5 top-0 w-[3px] rounded-[4px] bg-[var(--hll-light-grey)]"
        style={{ height: TRACK }}
      >
        <span
          className="absolute left-0 top-0 w-[3px] rounded-[4px] bg-[var(--hll-mid-grey)]"
          style={{
            height: THUMB,
            transform: `translateY(${progress * (TRACK - THUMB)}px)`,
          }}
        />
      </span>
      <div
        ref={listRef}
        onScroll={onScroll}
        className="overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ height: TRACK - 2 }}
      >
        {MENU_INDUSTRIES.map((group, i) => (
          <div key={group.title} className={i > 0 ? "mt-[29px]" : undefined}>
            <p className="text-[14px] leading-[17px] text-[var(--hll-mid-grey)]">
              {group.title}
            </p>
            <ul className="mt-2">
              {group.items.map((label) => {
                const href = industryHref(label);
                return (
                  <li
                    key={label}
                    className="text-[14px] leading-[23px] text-[var(--hll-dark-grey)]"
                  >
                    {href ? <Link href={href}>{label}</Link> : label}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

/** "In the News" belongs to Engagement only, as in the desktop menu. */
function EngagementNews({ news }: { news: NewsData }) {
  return (
    <div className="ml-px mr-[10px]">
      <NewsPanel
        news={news}
        opacity={1}
        className="w-full px-4"
        dividerClassName="mb-[11px] mt-3"
      />
    </div>
  );
}

/** Which nav buttons open a list in the menu instead of going to a page. */
const SUBMENUS: Partial<
  Record<NavVariant, (props: { news: NewsData }) => React.ReactNode>
> = {
  services: ServicesList,
  industries: IndustriesList,
  engagement: EngagementNews,
};

// Figma Menu Mobile: services' list starts 1px under its button and ends 32px
// above the next; industries' window sits 20px under and 31px above.
// Each opened list ends with a way to its own page, which the button itself
// no longer goes to on mobile (it opens the list instead).
const VIEW_ALL: Partial<Record<NavVariant, { label: string; inset: string }>> = {
  services: { label: "View all services", inset: "ml-[17px]" },
  industries: { label: "View all industries", inset: "ml-[38px]" },
  engagement: { label: "View all work", inset: "ml-px" },
};

const SUBMENU_SPACING: Partial<Record<NavVariant, string>> = {
  services: "pt-px pb-8",
  industries: "pt-5 pb-[31px]",
  engagement: "pt-5 pb-[31px]",
};

/**
 * Figma Nav Mobile / Menu Mobile (1341:21563, 1341:20976 and its Services and
 * Industries states). Closed, the bar is the logo and a Mid Grey dot; the dot
 * opens a full-screen white menu: the five nav buttons 30px apart. Services
 * and Industries open their list in place, Engagement its "In the News", and
 * the buttons below close up to 3px apart.
 */
export function MobileMenu({
  siteName,
  nav,
  news,
  markTint,
}: {
  siteName: string;
  nav: SiteNavItem[];
  news: NewsData;
  markTint?: string;
}) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<NavVariant | null>(null);
  const pathname = usePathname();

  // Close on navigation (render-time reset, so no effect round-trip).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
    setExpanded(null);
  }

  useEffect(() => {
    if (!open) return undefined;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) =>
      event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    setExpanded(null);
  };

  const expandedIndex = nav.findIndex(
    (item) => VARIANT_BY_HREF[item.href] === expanded,
  );

  const menu = (
    <div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className="fixed inset-0 z-[80] overflow-y-auto bg-white [animation:page-intro-in_300ms_cubic-bezier(0.22,1,0.36,1)_both] lg:hidden"
    >
      <div className="relative flex min-h-full flex-col pt-[106px]">
        <Link
          href="/"
          aria-label={siteName}
          onClick={close}
          className="absolute left-5 top-[27px] flex items-center gap-[11px] text-[#383838]"
        >
          <NavMark tint={markTint} className="block h-[34px] w-[25px] shrink-0" />
          <span className="whitespace-nowrap text-[17.28px] leading-none" style={NAV_FONT}>
            {siteName}
          </span>
        </Link>
        <button
          type="button"
          onClick={close}
          aria-label="Close menu"
          className="absolute right-[19px] top-[26.5px] grid size-7 place-items-center"
        >
          {/* Figma: two 18px hairlines crossed at 45°. */}
          <span aria-hidden className="relative size-[13px]">
            <span className="absolute left-1/2 top-1/2 h-px w-[18.4px] -translate-x-1/2 -translate-y-1/2 rotate-45 bg-black" />
            <span className="absolute left-1/2 top-1/2 h-px w-[18.4px] -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-black" />
          </span>
        </button>

        <nav aria-label="Main navigation" className="pl-[10px]">
          <ul>
            {nav.map((item, i) => {
              const variant = VARIANT_BY_HREF[item.href];
              const colors = variant ? VARIANT_GRADIENTS[variant].colors : null;
              const Submenu = variant ? SUBMENUS[variant] : undefined;
              const isOpen = !!variant && expanded === variant;
              const gap =
                i === 0
                  ? 0
                  : expandedIndex >= 0 && i > expandedIndex
                    ? i === expandedIndex + 1
                      ? 0
                      : 3
                    : 30;

              const label = (
                <>
                  {/* The button's palette (desktop hover) shows while pressed. */}
                  {colors ? (
                    <span
                      aria-hidden
                      className="absolute inset-0 rounded-[4px] opacity-0 blur-[6px] transition-opacity duration-300 group-active:opacity-100"
                      style={{
                        background: `linear-gradient(90deg, ${colors.join(", ")})`,
                      }}
                    />
                  ) : null}
                  <span
                    className={`relative transition-colors duration-300 group-active:text-[#FAFAFA] ${
                      isOpen ? "text-[var(--hll-dark-grey)]" : "text-[var(--hll-mid-grey)]"
                    }`}
                  >
                    {item.label}
                  </span>
                </>
              );
              const buttonClass =
                "group relative flex h-[38px] items-center rounded-[4px] pl-[21px] pr-[21px] text-[16px] uppercase leading-none tracking-[3.5px]";

              return (
                <li
                  key={item.href}
                  className="transition-[margin] duration-300"
                  style={{ marginTop: gap }}
                >
                  {Submenu && variant ? (
                    <>
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={`mobile-menu-${variant}`}
                        onClick={() => setExpanded(isOpen ? null : variant)}
                        className={buttonClass}
                        style={NAV_FONT}
                      >
                        {label}
                      </button>
                      <div
                        id={`mobile-menu-${variant}`}
                        className={`grid transition-[grid-template-rows] duration-300 ${
                          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                        }`}
                      >
                        <div className="overflow-hidden" inert={!isOpen}>
                          <div className={SUBMENU_SPACING[variant]}>
                            <Submenu news={news} />
                            {VIEW_ALL[variant] ? (
                              <Link
                                href={item.href}
                                onClick={close}
                                className={`mt-4 inline-flex h-[34px] items-center gap-2 rounded-[3px] bg-[var(--hll-light-grey)] px-[21px] text-[12px] uppercase leading-none tracking-[0.25em] text-[var(--hll-dark-grey)] ${VIEW_ALL[variant].inset}`}
                                style={NAV_FONT}
                              >
                                {VIEW_ALL[variant].label}
                                <span aria-hidden>→</span>
                              </Link>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={close}
                      className={`${buttonClass} w-fit`}
                      style={NAV_FONT}
                    >
                      {label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

      </div>
    </div>
  );

  return (
    <>
      {/* Figma Nav Mobile: the 28px Mid Grey dot opens the menu. */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="-m-2 grid size-11 -translate-y-[2px] place-items-center lg:hidden"
      >
        <span aria-hidden className="size-7 rounded-full bg-[var(--hll-mid-grey)]" />
      </button>
      {open ? createPortal(menu, document.body) : null}
    </>
  );
}
