"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

import { GradientRevealTextSlow, HLLOutlineButton } from "@/components/hll";
import type { HomePageContent, HomeService } from "@/data/home";

import { useScaleToViewport } from "@/components/marketing/use-scale-to-viewport";

import { HomeHeading, HOME_GUTTER } from "./primitives";


/** The window grows from its frame size to cover the viewport as it scrolls to the screen centre. */
function HeroWindow({
  imageUrl,
  videoUrl,
  webmUrl,
  ctaLabel,
  ctaHref,
}: {
  imageUrl?: string | null;
  videoUrl?: string | null;
  /** A WebM of the same video, offered first (smaller for Chrome and Firefox). */
  webmUrl?: string | null;
  ctaLabel: string;
  ctaHref: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useScaleToViewport(ref, { desktopOnly: true, follower: ctaRef });

  return (
    <>
    <div
      ref={ref}
      // 16:9, the intro video's own shape. Transparent: the reveal grows the video in from
      // the top, so no grey window shows under it.
      className="relative z-10 mt-3 aspect-video w-full origin-center overflow-hidden rounded-[6px] will-change-transform lg:mt-[31px] lg:rounded-lg"
    >
      {videoUrl ? (
        <video
          // WebM first, MP4 for Safari; #F6F6F6 matches the film's first and last frame.
          src={webmUrl ? undefined : videoUrl}
          poster={imageUrl ?? undefined}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          // A background loop: no controls; fills the box so no dark bars show.
          className={`absolute inset-0 size-full object-cover ${webmUrl ? "bg-[#F6F6F6]" : "bg-[#D9D9D9]"}`}
        >
          {webmUrl ? (
            <>
              <source src={webmUrl} type="video/webm" />
              <source src={videoUrl} type="video/mp4" />
            </>
          ) : null}
        </video>
      ) : imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageUrl}
          alt=""
          className="absolute inset-0 size-full bg-[#D9D9D9] object-cover"
        />
      ) : null}
    </div>
    {/* The outline button sits under the window on every screen, 32px below it on desktop even as it grows. */}
    <div ref={ctaRef} className="mt-[54px] flex justify-center lg:mt-8">
      <HLLOutlineButton href={ctaHref} variant="engagement">
        {ctaLabel}
      </HLLOutlineButton>
    </div>
    </>
  );
}

/** Placeholder hero film (loop version) until the CMS supplies one. */
const PLACEHOLDER_HERO_VIDEO = "/video/HLL_intro_loop_v7.mp4";
const PLACEHOLDER_HERO_WEBM = "/video/HLL_intro_loop_v7.webm";
const PLACEHOLDER_HERO_POSTER = "/video/HLL_intro_loop_v7-poster.jpg";

export function HomeHero({
  heading,
  ctaLabel = "See our work",
  ctaHref = "/engagement",
  heroImageUrl,
  heroVideoUrl,
}: {
  heading?: string;
  ctaLabel?: string;
  ctaHref?: string;
  heroImageUrl?: string | null;
  heroVideoUrl?: string | null;
}) {
  const usePlaceholder = !heroVideoUrl && !heroImageUrl;
  const title =
    heading ??
    "We champion future-facing initiatives for an accelerated advancement.";

  return (
    <section
      data-no-text-scroll
      className={`hll-home-section flex min-h-[calc(100*var(--svh)-var(--nav-h))] flex-col justify-end pb-10 lg:block lg:min-h-0 lg:pb-0 lg:pt-[max(8rem,min(calc(23.2*var(--vw)),21.9rem,calc(42.4*var(--svh)-var(--nav-h))))] ${HOME_GUTTER}`}
    >
      {/* Mobile: first screen with content on the bottom edge. Desktop: the heading sits 42%
          down so a short laptop screen doesn't push it lower. */}
      <GradientRevealTextSlow
        as="h1"
        text={title}
        variant="hll-ai"
        className="hll-display block max-w-[355px] font-light text-[var(--hll-dark-grey)] lg:max-w-[1040px]"
        fontSize="clamp(30px, calc(4.23*var(--vw)), 4rem)"
        letterSpacing="0"
        lineHeight="1.16"
      />
      <HeroWindow
        imageUrl={usePlaceholder ? PLACEHOLDER_HERO_POSTER : heroImageUrl}
        videoUrl={usePlaceholder ? PLACEHOLDER_HERO_VIDEO : heroVideoUrl}
        webmUrl={usePlaceholder ? PLACEHOLDER_HERO_WEBM : null}
        ctaLabel={ctaLabel}
        ctaHref={ctaHref}
      />
    </section>
  );
}

/** The services as a wheel: the active one is large, its neighbours small above and below. */
export function WhatWeDo({ data }: { data: HomePageContent["whatWeDo"] }) {
  if (!data.items.length) return null;
  return (
    <>
      <WhatWeDoMobile data={data} />
      <WhatWeDoWheel data={data} />
    </>
  );
}

/** The capability's demo still (CMS image, else bundled), its glyph in black and white. */
const demoImage = (service: HomeService) =>
  service.image ?? `/assets/services/${service.variant}-demo.webp`;

const CARD = 253;
const CARD_GAP = 10;
const pad2 = (n: number) => String(n).padStart(2, "0");

/** Mobile What we do: a swipeable row of cards with a counter and arrows. */
function WhatWeDoMobile({ data }: { data: HomePageContent["whatWeDo"] }) {
  const services = data.items;
  const rowRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const count = services.length;
  const selected = services[active];

  const onScroll = () => {
    const row = rowRef.current;
    if (!row) return;
    const next = Math.round(row.scrollLeft / (CARD + CARD_GAP));
    setActive(Math.min(count - 1, Math.max(0, next)));
  };

  const go = (delta: number) => {
    const row = rowRef.current;
    if (!row) return;
    const index = (active + delta + count) % count;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    row.scrollTo({
      left: index * (CARD + CARD_GAP),
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <section
      className="hll-home-section pt-[114px] lg:hidden"
      aria-label="Our capabilities"
    >
      <div className={HOME_GUTTER}>
        <HomeHeading eyebrow={data.eyebrow} title={data.title} />
      </div>

      <div className="relative mt-8">
        {/* The counter and arrows sit in their own row so a dragged card never slides under them. */}
        <div
          className="mb-3 ml-[74px] flex w-[253px] items-center justify-between text-[10px] uppercase leading-[12px] text-[var(--hll-dark-grey)]"
          style={{ fontFamily: "var(--hll-font-functional)" }}
        >
          <p aria-live="polite">
            {pad2(active + 1)}/{pad2(count)}
          </p>
          {/* 32px tap areas around the 10px glyphs, pulled back to line up with the card's edge. */}
          <div className="-my-[10px] -mr-[11px] flex">
            <button
              type="button"
              aria-label="Previous capability"
              onClick={() => go(-1)}
              className="grid size-8 place-items-center"
            >
              &lt;
            </button>
            <button
              type="button"
              aria-label="Next capability"
              onClick={() => go(1)}
              className="-ml-[10px] grid size-8 place-items-center"
            >
              &gt;
            </button>
          </div>
        </div>

        <div
          ref={rowRef}
          onScroll={onScroll}
          className="flex snap-x snap-mandatory gap-[10px] overflow-x-auto scroll-pl-[74px] pl-[74px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {services.map((service) => (
            <a
              key={service.href}
              href={service.href}
              aria-label={service.name}
              className="relative h-[252px] w-[253px] shrink-0 snap-start overflow-hidden rounded-[6px] bg-[#D9D9D9]"
              style={{
                background: `#D9D9D9 url(${demoImage(service)}) center / cover`,
              }}
            >
              <span className="absolute left-[6px] top-[6px] grid size-[34px] place-items-center rounded-[3px] bg-[var(--hll-bg)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/assets/services/${service.variant}-glyph.svg`}
                  alt=""
                  aria-hidden
                  className="size-[34px] grayscale"
                />
              </span>
            </a>
          ))}
          {/* Lets the last card rest in line with its name; 100% is the row's width inside its
              padding, so the spacer is the screen less one card and one gap. */}
          <span aria-hidden className="w-[calc(100%-263px)] shrink-0" />
        </div>

        <div className="ml-[74px] w-[253px]">
          <a
            href={selected.href}
            className="mt-2 block text-[24px] leading-[27.8px] text-[var(--hll-dark-grey)]"
          >
            {selected.name}
          </a>
          <p className="mt-2 text-[14px] leading-[17.5px] text-[var(--hll-dark-grey)]">
            {selected.description}
          </p>
        </div>
      </div>
    </section>
  );
}

/** The What we do description sits 163px above "Clients". */
const DESIGN_GAP_TO_CLIENTS = 163;
/** Our Clients' desktop top padding (lg:pt-[76px] below). */
const CLIENTS_TOP_PAD = 76;

/** Desktop: the pinned wheel. */
function WhatWeDoWheel({ data }: { data: HomePageContent["whatWeDo"] }) {
  const services = data.items;
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLAnchorElement>(null);
  const count = services.length;
  const selected = services[active];

  // The pinned content is centred in a screen-high panel, so measure the leftover space and
  // trim the section's bottom to keep the description 163px (scaled) above the Clients eyebrow.
  const [tail, setTail] = useState(0);
  useEffect(() => {
    const fit = () => {
      const sticky = stickyRef.current;
      const card = cardRef.current;
      if (!sticky || !card || !sticky.offsetHeight) return;
      const below = sticky.getBoundingClientRect().bottom - card.getBoundingClientRect().bottom;
      const gap = (DESIGN_GAP_TO_CLIENTS * window.innerWidth) / 1512;
      setTail(Math.round(gap - CLIENTS_TOP_PAD - below));
    };
    fit();
    window.addEventListener("resize", fit);
    document.fonts?.ready.then(fit);
    return () => window.removeEventListener("resize", fit);
  }, [active]);

  const updateActiveFromScroll = useCallback(() => {
    const section = sectionRef.current;
    const sticky = stickyRef.current;
    if (!section || !sticky) return;

    const scrollRange = section.getBoundingClientRect().height - sticky.getBoundingClientRect().height;
    if (scrollRange <= 0) return;

    const progress = Math.min(
      1,
      Math.max(0, -section.getBoundingClientRect().top / scrollRange),
    );
    const next = Math.min(count - 1, Math.round(progress * (count - 1)));
    setActive((current) => (current === next ? current : next));
  }, [count]);

  useEffect(() => {
    let frame = 0;
    const scheduleUpdate = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateActiveFromScroll);
    };

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [updateActiveFromScroll]);

  function scrollToService(index: number) {
    const section = sectionRef.current;
    const sticky = stickyRef.current;
    if (!section || !sticky) return;

    const scrollRange = section.getBoundingClientRect().height - sticky.getBoundingClientRect().height;
    const top =
      window.scrollY +
      section.getBoundingClientRect().top +
      scrollRange * (count > 1 ? index / (count - 1) : 0);
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.scrollTo({ top, behavior: reduceMotion ? "auto" : "smooth" });
  }

  // Two neighbours above the active service and three below. Every service is always
  // rendered in a slot by its distance from the active one, so labels slide (~0.6s) not swap.
  const offsetOf = (index: number, from: number) => {
    const o = (index - from + count) % count;
    return o >= count - 2 ? o - count : o;
  };
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const lastTransform = useRef<string[]>([]);
  // Our own slide/fade per label; the CSS opacity transition is left alone so it isn't mistaken for one.
  const slides = useRef<(Animation | undefined)[]>([]);
  const prevActive = useRef(active);
  const bigRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // The slots below the big name depend on its height (names can wrap).
  useEffect(() => {
    const big = bigRef.current;
    const list = listRef.current;
    if (!big || !list) return;
    const remember = () =>
      itemRefs.current.forEach((el, i) => {
        if (el && slides.current[i]?.playState !== "running") lastTransform.current[i] = getComputedStyle(el).transform;
      });
    const observer = new ResizeObserver(() => {
      list.style.setProperty("--big-h", `${big.offsetHeight}px`);
      remember();
    });
    observer.observe(big);
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    const from = prevActive.current;
    prevActive.current = active;
    let delta = active - from;
    if (delta > count / 2) delta -= count;
    if (delta < -count / 2) delta += count;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    itemRefs.current.forEach((el, i) => {
      if (!el) return;
      // Mid-slide (a fast scroll), start from where the label is right now.
      const running = slides.current[i]?.playState === "running" ? slides.current[i] : undefined;
      const start = running ? getComputedStyle(el).transform : lastTransform.current[i];
      running?.cancel();
      const end = getComputedStyle(el).transform;
      lastTransform.current[i] = end;
      if (reduceMotion || delta === 0 || !start || start === end) return;

      const move = offsetOf(i, active) - offsetOf(i, from);
      const timing = { duration: 600, easing: "ease-in-out" };
      // The label that wraps from one end of the list to the other fades in
      // at its new place rather than sliding across everything.
      if (Math.sign(move) !== Math.sign(-delta)) {
        slides.current[i] = el.animate([{ opacity: 0 }, { opacity: getComputedStyle(el).opacity }], timing);
      } else {
        slides.current[i] = el.animate([{ transform: start }, { transform: end }], timing);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, count]);

  // Slot tops: 14.4px labels 12px apart, the big name 21px under the second label.
  const slotTop = (offset: number) => {
    if (offset <= -2) return `${(offset + 2) * 26.4}px`;
    if (offset === -1) return "26.4px";
    if (offset === 0) return "calc(61.8px + var(--big-h) / 2 - 7.2px)";
    return `calc(${73.8 + (offset - 1) * 26.4}px + var(--big-h))`;
  };

  return (
    <section
      ref={sectionRef}
      className="hll-home-section hidden lg:block"
      style={{ height: `calc(${count * 60} * var(--svh))`, marginBottom: tail }}
      aria-label="Our capabilities"
    >
      <div
        ref={stickyRef}
        // 56px (scaled with width) above "Capabilities"; on a short screen the image card gives up height.
        className={`sticky top-[var(--nav-h)] flex h-[calc(calc(100*var(--svh))-var(--nav-h))] flex-col pb-6 pt-[calc(3.7*var(--vw))] ${HOME_GUTTER}`}
      >
        <HomeHeading eyebrow={data.eyebrow} title={data.title} />

        <div className="mt-[48px] grid min-h-0 flex-1 gap-8 md:grid-cols-[731fr_721fr] md:grid-rows-[minmax(0,1fr)] md:gap-0">
          <div className="md:pt-[75px]">
            <p className="sr-only" aria-live="polite">{selected.name}</p>
            <div
              ref={listRef}
              className="relative [--big-h:calc(1.16*clamp(2rem,calc(4.23*var(--vw)),4rem))]"
              style={{ height: "calc(141px + var(--big-h))" }}
            >
              <ul>
                {services.map((service, index) => {
                  const offset = offsetOf(index, active);
                  const shown = offset !== 0 && offset >= -2 && offset <= 3;
                  return (
                    <li
                      key={service.label}
                      ref={(el) => {
                        itemRefs.current[index] = el;
                      }}
                      aria-hidden={!shown}
                      className="absolute left-0 top-0 transition-opacity duration-[600ms] ease-in-out motion-reduce:transition-none"
                      style={{ transform: `translateY(${slotTop(offset)})`, opacity: shown ? 1 : 0 }}
                    >
                      <button
                        type="button"
                        tabIndex={shown ? undefined : -1}
                        onClick={() => scrollToService(index)}
                        className={`hll-label text-[12px] uppercase leading-[1.2] text-[var(--hll-mid-grey)] transition-colors hover:text-[var(--hll-dark-grey)] ${shown ? "" : "pointer-events-none"}`}
                      >
                        {service.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
              {/* The big name crossfades in place with a small slide; all names share one cell, so the box fits the longest. */}
              <div ref={bigRef} className="absolute inset-x-0 top-[61.8px] grid">
                {services.map((service, index) => {
                  const on = index === active;
                  return (
                    <a
                      key={service.label}
                      href={service.href}
                      aria-hidden={!on}
                      tabIndex={on ? undefined : -1}
                      className={`[grid-area:1/1] block text-[clamp(2rem,calc(4.23*var(--vw)),4rem)] font-normal leading-[1.16] text-[var(--hll-dark-grey)] transition-[opacity,transform] duration-[600ms] ease-in-out motion-reduce:transition-none ${on ? "" : "pointer-events-none"}`}
                      style={{
                        opacity: on ? 1 : 0,
                        transform: `translateY(${on ? 0 : index < active ? -16 : 16}px)`,
                      }}
                    >
                      {service.name}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex min-h-0 min-w-0 flex-col">
            {/* The description sits inside the card, bottom left, with an arrow that shows on hover. */}
            <a
              ref={cardRef}
              href={selected.href}
              className="group relative aspect-[721/444] min-h-0 shrink overflow-hidden rounded-lg bg-[#D9D9D9]"
            >
              {/* The image and description fade across to the next service. */}
              {services.map((service, index) => (
                <span
                  key={service.label}
                  aria-hidden
                  className="absolute inset-0 transition-opacity duration-[600ms] ease-in-out motion-reduce:transition-none"
                  style={{
                    background: `url(${demoImage(service)}) center / cover`,
                    opacity: index === active ? 1 : 0,
                  }}
                />
              ))}
              <span className="absolute left-2 top-2 grid size-12 place-items-center rounded-[4px] bg-[var(--hll-bg)]">
                {services.map((service, index) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={service.label}
                    src={`/assets/services/${service.variant}-glyph.svg`}
                    alt=""
                    aria-hidden
                    className="size-12 grayscale transition-opacity duration-[600ms] ease-in-out [grid-area:1/1] motion-reduce:transition-none"
                    style={{ opacity: index === active ? 1 : 0 }}
                  />
                ))}
              </span>
              {/* A soft shade under the text keeps it readable on light images. */}
              <span aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/45 to-transparent" />
              <span className="absolute bottom-6 left-6 right-6 flex items-end gap-3">
                <span className="grid max-w-[509px] text-[clamp(1rem,calc(1.32*var(--vw)),1.25rem)] leading-[1.25] text-white">
                  {services.map((service, index) => (
                    <span
                      key={service.label}
                      aria-hidden={index !== active}
                      className="self-end transition-opacity duration-[600ms] ease-in-out [grid-area:1/1] motion-reduce:transition-none"
                      style={{ opacity: index === active ? 1 : 0 }}
                    >
                      {service.description}
                    </span>
                  ))}
                </span>
                <ArrowUpRight
                  aria-hidden
                  strokeWidth={1.4}
                  className="size-6 shrink-0 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
                />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Marquee of client logos on the page background; keeps running under the pointer.
 *  With no CMS logos it runs eight grey slots. */
export function OurClients({ data }: { data: HomePageContent["clients"] }) {
  const logos = data.logos.filter((item) => item.logo);
  const slots: (HomePageContent["clients"]["logos"][number] | null)[] = logos.length
    ? logos
    : Array.from({ length: 8 }, () => null);

  return (
    // The logos finish growing in once fully on screen, without the blur, so each stays sharp as it slides in.
    <section data-image-reveal="fit" data-image-max-blur="0" className="hll-home-section overflow-hidden bg-[var(--hll-bg)] py-[154px] lg:pb-[104px] lg:pt-[76px]">
      <div className={HOME_GUTTER}>
        <HomeHeading eyebrow={data.eyebrow} title={data.title} />
      </div>
      {/* Phones: 120px logos at about 90px a second; desktop keeps 220px at
          about 63px a second. */}
      <div className="mt-[49px] flex w-max gap-[10px] lg:mt-[76px] [animation:home-marquee_16s_linear_infinite] lg:[animation-duration:40s]">
        {[...slots, ...slots].map((item, n) => (
          <div
            key={n}
            aria-hidden={n >= slots.length}
            className={`grid h-[90px] w-[120px] shrink-0 place-items-center overflow-hidden lg:h-[165px] lg:w-[220px] ${
              item?.logo ? "" : "rounded-lg bg-[#D9D9D9]"
            }`}
          >
            {item?.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.logo}
                alt={n < slots.length ? item.name : ""}
                draggable={false}
                decoding="async"
                className="size-full object-contain px-3"
              />
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
