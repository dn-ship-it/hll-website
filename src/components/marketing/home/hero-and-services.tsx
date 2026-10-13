"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { GradientRevealTextSlow, HLLButton } from "@/components/hll";
import type { HomePageContent, HomeService } from "@/data/home";

import { BUTTON_MOBILE } from "@/components/marketing/button-sizes";
import { useScaleToViewport } from "@/components/marketing/use-scale-to-viewport";

import { HomeHeading, HOME_GUTTER } from "./primitives";


/**
 * Figma: "window starts at given ratio with video playing and then smoothly
 * scales to viewport width and height to cover the entire screen, video
 * continues playing." The window grows from its 1452 × 982 frame to cover the
 * viewport as it scrolls up to the centre of the screen; "See our work is
 * within the video card, takes user to engagements".
 */
function HeroWindow({
  imageUrl,
  videoUrl,
  ctaLabel,
  ctaHref,
}: {
  imageUrl?: string | null;
  videoUrl?: string | null;
  ctaLabel: string;
  ctaHref: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useScaleToViewport(ref, { desktopOnly: true });

  return (
    <>
    <div
      ref={ref}
      className="relative z-10 mt-3 aspect-[362/244] w-full origin-center overflow-hidden rounded-[6px] bg-[#D9D9D9] will-change-transform lg:mt-[31px] lg:aspect-[1452/982] lg:rounded-lg"
    >
      {videoUrl ? (
        <video
          src={videoUrl}
          poster={imageUrl ?? undefined}
          autoPlay
          muted
          loop
          playsInline
          controls
          controlsList="nodownload"
          className="absolute inset-0 size-full bg-[#111] object-contain"
        />
      ) : imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageUrl}
          alt=""
          className="absolute inset-0 size-full object-cover"
        />
      ) : null}
      {/* Raised over a video so it clears the native controls bar. */}
      <div
        className={`pointer-events-none absolute inset-x-0 hidden justify-center lg:flex ${videoUrl ? "bottom-24" : "bottom-9"}`}
      >
        <HLLButton href={ctaHref} variant="engagement" size="md" className="pointer-events-auto">
          {ctaLabel}
        </HLLButton>
      </div>
    </div>
    {/* Figma Home mobile: the button sits 54px under the window. */}
    <div className="mt-[54px] flex justify-center lg:hidden">
      <HLLButton href={ctaHref} variant="engagement" size="md" className={BUTTON_MOBILE}>
        {ctaLabel}
      </HLLButton>
    </div>
    </>
  );
}

/** Placeholder until the CMS supplies a hero: the old site's video loop. */
const PLACEHOLDER_HERO_VIDEO = "/video/home-hero.mp4";
const PLACEHOLDER_HERO_POSTER = "/video/home-hero-poster.jpg";

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
      className={`hll-home-section flex min-h-[calc(100*var(--svh)-var(--nav-h))] flex-col justify-end pb-10 lg:block lg:min-h-0 lg:pb-0 lg:pt-[clamp(8rem,calc(23.2*var(--vw)),21.9rem)] ${HOME_GUTTER}`}
    >
      {/* Mobile: the first screen, its content set on the bottom edge
          (button 40px up), as the 874px Figma Hero frame. */}
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
        ctaLabel={ctaLabel}
        ctaHref={ctaHref}
      />
    </section>
  );
}

/**
 * "On scroll the services change shifting through the list of names as you
 * scroll. the content and icon opposite to it changes accordingly as well"
 * (Figma note). The active service is set large with its neighbours listed
 * small above and below it, as a wheel.
 */
export function WhatWeDo({ data }: { data: HomePageContent["whatWeDo"] }) {
  if (!data.items.length) return null;
  return (
    <>
      <WhatWeDoMobile data={data} />
      <WhatWeDoWheel data={data} />
    </>
  );
}

/** The capability's demo still: the CMS image, else the bundled one. The
 *  glyph on it is shown in black and white (QA H-26): the card carries the
 *  colour. */
const demoImage = (service: HomeService) =>
  service.image ?? `/assets/services/${service.variant}-demo.webp`;

const CARD = 253;
const CARD_GAP = 10;
const pad2 = (n: number) => String(n).padStart(2, "0");

/**
 * Figma Home mobile › What we do: the services as a row of 253px cards from
 * x 74, a "01/06" counter with "<  >" arrows at x 30, and the card in front's
 * name and line under it. "On pressing the arrows the services change
 * shifting through the list of names … the content and icon changes too";
 * the row also swipes.
 */
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
        <div
          className="absolute left-[30px] top-0 z-10 text-[10px] uppercase leading-[12px] text-[var(--hll-dark-grey)]"
          style={{ fontFamily: "var(--hll-font-functional)" }}
        >
          <p aria-live="polite">
            {pad2(active + 1)}/{pad2(count)}
          </p>
          {/* 32px tap areas around the 10px glyphs, pulled back so the
              glyphs keep their Figma places. */}
          <div className="-mb-[10px] -ml-[11px] -mt-[10px] flex">
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
          {/* Lets the last card come to rest at x 74. */}
          <span aria-hidden className="w-[calc(100%-327px)] shrink-0" />
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

/** Figma Home: the What we do description sits 163px above "Clients". */
const DESIGN_GAP_TO_CLIENTS = 163;
/** Our Clients' desktop top padding (lg:pt-[76px] below). */
const CLIENTS_TOP_PAD = 76;

/** Desktop: the pinned wheel. */
function WhatWeDoWheel({ data }: { data: HomePageContent["whatWeDo"] }) {
  const services = data.items;
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const count = services.length;
  const selected = services[active];

  // QA H-21: the pinned content is centred in a screen-high panel, so the
  // space under the description (and with it the gap down to "Our Clients")
  // grew and shrank with the window's height. Measure that leftover space and
  // trim or extend the section's bottom so the description sits the design's
  // 163px (at 1512, scaled with the width) above the Clients eyebrow.
  const [tail, setTail] = useState(0);
  useEffect(() => {
    const fit = () => {
      const sticky = stickyRef.current;
      const desc = descRef.current;
      if (!sticky || !desc || !sticky.offsetHeight) return;
      const below = sticky.getBoundingClientRect().bottom - desc.getBoundingClientRect().bottom;
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

  // Figma shows two neighbours above the active service and three below.
  const wheel = (offsets: number[]) =>
    offsets.map((offset) => {
      const index = (active + offset + count) % count;
      return { offset, index, service: services[index] };
    });
  const above = wheel([-2, -1]);
  const below = wheel([1, 2, 3]);

  const Label = ({
    index,
    service,
  }: {
    index: number;
    service: HomeService;
  }) => (
    <li>
      <button
        type="button"
        onClick={() => scrollToService(index)}
        className="hll-label text-[12px] uppercase leading-[1.2] text-[var(--hll-mid-grey)] transition-colors hover:text-[var(--hll-dark-grey)]"
      >
        {service.label}
      </button>
    </li>
  );

  return (
    <section
      ref={sectionRef}
      className="hll-home-section hidden lg:block"
      style={{ height: `calc(${count * 60} * var(--svh))`, marginBottom: tail }}
      aria-label="Our capabilities"
    >
      <div
        ref={stickyRef}
        // QA H-18: the design's 158px (at 1512) between the hero window and
        // "Capabilities" on every screen height, rather than centring the
        // block (which squeezed that gap on shorter screens). On a short
        // screen the image card gives up height instead, so the block still
        // fits.
        className={`sticky top-[var(--nav-h)] flex h-[calc(calc(100*var(--svh))-var(--nav-h))] flex-col pb-6 pt-[calc(10.45*var(--vw))] ${HOME_GUTTER}`}
      >
        <HomeHeading eyebrow={data.eyebrow} title={data.title} />

        <div className="mt-[84px] grid min-h-0 flex-1 gap-8 md:grid-cols-[731fr_721fr] md:grid-rows-[minmax(0,1fr)] md:gap-0">
          <div className="md:pt-[75px]" aria-live="polite">
            <ul className="space-y-3">
              {above.map((item) => (
                <Label key={item.offset} index={item.index} service={item.service} />
              ))}
            </ul>
            <a
              href={selected.href}
              className="mb-3 mt-[21px] block text-[clamp(2rem,calc(4.23*var(--vw)),4rem)] font-normal leading-[1.16] text-[var(--hll-dark-grey)]"
            >
              {selected.name}
            </a>
            <ul className="space-y-3">
              {below.map((item) => (
                <Label key={item.offset} index={item.index} service={item.service} />
              ))}
            </ul>
          </div>

          <div className="flex min-h-0 min-w-0 flex-col">
            <div
              className="relative aspect-[721/444] min-h-0 shrink overflow-hidden rounded-lg bg-[#D9D9D9] transition-[background] duration-500"
              style={{
                background: `#D9D9D9 url(${demoImage(selected)}) center / cover`,
              }}
            >
              <span className="absolute left-2 top-2 grid size-12 place-items-center rounded-[4px] bg-[var(--hll-bg)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/assets/services/${selected.variant}-glyph.svg`}
                  alt=""
                  aria-hidden
                  className="size-12 grayscale"
                />
              </span>
            </div>
            <p ref={descRef} className="mt-6 max-w-[509px] shrink-0 text-[clamp(1rem,calc(1.32*var(--vw)),1.25rem)] leading-[1.25] text-[var(--hll-dark-grey)]">
              {selected.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Figma: "marquee runner displaying the clients logos (PNG or webp images)".
 *  Each logo image carries its client's brand colour as its background and
 *  fills its tile (QA H-27). Until logos are added in the CMS it runs eight
 *  grey slots. */
export function OurClients({ data }: { data: HomePageContent["clients"] }) {
  const logos = data.logos.filter((item) => item.logo);
  const slots: (HomePageContent["clients"]["logos"][number] | null)[] = logos.length
    ? logos
    : Array.from({ length: 8 }, () => null);

  return (
    <section className="hll-home-section overflow-hidden bg-[var(--hll-bg)] py-[154px] lg:pb-[104px] lg:pt-[76px]">
      <div className={HOME_GUTTER}>
        <HomeHeading eyebrow={data.eyebrow} title={data.title} />
      </div>
      {/* QA H-27: keeps running under the pointer. */}
      <div className="mt-[49px] flex w-max gap-[10px] lg:mt-[76px] [animation:home-marquee_40s_linear_infinite]">
        {[...slots, ...slots].map((item, n) => (
          <div
            key={n}
            aria-hidden={n >= slots.length}
            className="grid h-[165px] w-[220px] shrink-0 place-items-center overflow-hidden rounded-lg bg-[#D9D9D9]"
          >
            {item?.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.logo}
                alt={n < slots.length ? item.name : ""}
                draggable={false}
                className="size-full object-cover"
              />
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
