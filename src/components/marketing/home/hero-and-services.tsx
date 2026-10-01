"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { GradientRevealTextSlow, HLLButton } from "@/components/hll";
import type { ServiceVariant } from "@/components/hll/variants";

import { useScaleToViewport } from "@/components/marketing/use-scale-to-viewport";

import { HomeHeading, HOME_GUTTER } from "./primitives";

const HOME_SERVICES: {
  label: string;
  name: string;
  href: string;
  description: string;
  variant: ServiceVariant;
}[] = [
  {
    label: "Application",
    name: "HLL Application",
    href: "/services/hll-application",
    description: "We build applications that are a delight to use.",
    variant: "hll-application",
  },
  {
    label: "People & Policy",
    name: "HLL People & Policy",
    href: "/services/hll-people",
    description: "The talent gap closed for you in under a week.",
    variant: "hll-people",
  },
  {
    label: "Trust & Governance",
    name: "HLL Trust & Governance",
    href: "/services/hll-trust",
    description: "Could you show a regulator where that number came from?",
    variant: "hll-trust",
  },
  {
    label: "AI",
    name: "HLL AI",
    href: "/services/hll-ai",
    description:
      "Applied AI built to move from experimentation into real work.",
    variant: "hll-ai",
  },
  {
    label: "Foundation",
    name: "HLL Foundation",
    href: "/services/hll-foundation",
    description: "Data your business can finally trust.",
    variant: "hll-foundation",
  },
  {
    label: "Ontology",
    name: "HLL Ontology",
    href: "/services/hll-ontology",
    description:
      "A connected view of the knowledge and relationships in your business.",
    variant: "hll-ontology",
  },
];

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

  useScaleToViewport(ref);

  return (
    <div
      ref={ref}
      className="relative z-10 mt-[31px] aspect-[1452/982] w-full origin-center overflow-hidden rounded-lg bg-[#D9D9D9] will-change-transform"
    >
      {videoUrl ? (
        <video
          src={videoUrl}
          poster={imageUrl ?? undefined}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 size-full object-cover"
        />
      ) : imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageUrl}
          alt=""
          className="absolute inset-0 size-full object-cover"
        />
      ) : null}
      <div className="absolute inset-x-0 bottom-9 flex justify-center">
        <HLLButton href={ctaHref} variant="engagement" size="md">
          {ctaLabel}
        </HLLButton>
      </div>
    </div>
  );
}

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
  const title =
    heading ??
    "We champion future-facing initiatives for an accelerated advancement.";

  return (
    <section
      className={`hll-home-section pt-[clamp(8rem,calc(23.2*var(--vw)),21.9rem)] ${HOME_GUTTER}`}
    >
      <GradientRevealTextSlow
        as="h1"
        text={title}
        variant="hll-ai"
        className="hll-display block max-w-[1040px] font-light text-[var(--hll-dark-grey)]"
        fontSize="clamp(2rem, calc(4.23*var(--vw)), 4rem)"
        letterSpacing="0"
        lineHeight="1.16"
      />
      <HeroWindow
        imageUrl={heroImageUrl}
        videoUrl={heroVideoUrl}
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
export function WhatWeDo() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const count = HOME_SERVICES.length;
  const selected = HOME_SERVICES[active];

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
      scrollRange * (index / (count - 1));
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.scrollTo({ top, behavior: reduceMotion ? "auto" : "smooth" });
  }

  // Figma shows two neighbours above the active service and three below.
  const wheel = (offsets: number[]) =>
    offsets.map((offset) => {
      const index = (active + offset + count) % count;
      return { index, service: HOME_SERVICES[index] };
    });
  const above = wheel([-2, -1]);
  const below = wheel([1, 2, 3]);

  const Label = ({
    index,
    service,
  }: {
    index: number;
    service: (typeof HOME_SERVICES)[number];
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
      className="hll-home-section"
      style={{ height: `calc(${count * 60} * var(--svh))` }}
      aria-label="Our services"
    >
      <div
        ref={stickyRef}
        className={`sticky top-[66px] flex h-[calc(calc(100*var(--svh))-66px)] flex-col justify-center ${HOME_GUTTER}`}
      >
        <HomeHeading eyebrow="Services" title="What we do" />

        <div className="mt-[84px] grid gap-8 md:grid-cols-[731fr_721fr] md:gap-0">
          <div className="md:pt-[75px]" aria-live="polite">
            <ul className="space-y-3">
              {above.map((item) => (
                <Label key={item.service.variant} {...item} />
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
                <Label key={item.service.variant} {...item} />
              ))}
            </ul>
          </div>

          <div className="min-w-0">
            <div
              className="relative aspect-[721/444] overflow-hidden rounded-lg bg-[#D9D9D9] transition-[background] duration-500"
              style={{
                background: `#D9D9D9 url(/assets/services/${selected.variant}-demo.webp) center / cover`,
              }}
            >
              <span className="absolute left-2 top-2 grid size-12 place-items-center rounded-[4px] bg-[var(--hll-bg)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/assets/services/${selected.variant}-glyph.svg`}
                  alt=""
                  aria-hidden
                  className="size-12"
                />
              </span>
            </div>
            <p className="mt-6 max-w-[509px] text-[clamp(1rem,calc(1.32*var(--vw)),1.25rem)] leading-[1.25] text-[var(--hll-dark-grey)]">
              {selected.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Figma: "marquee runner displaying the clients logos (PNG or webp images)". */
export function OurClients() {
  const slots = Array.from({ length: 8 }, (_, i) => i);

  return (
    <section className="hll-home-section overflow-hidden bg-[var(--hll-bg)] pt-[76px] pb-[104px]">
      <div className={HOME_GUTTER}>
        <HomeHeading eyebrow="Clients" title="Our Clients" />
      </div>
      <div className="mt-[76px] flex w-max gap-[10px] [animation:home-marquee_40s_linear_infinite] hover:[animation-play-state:paused]">
        {[...slots, ...slots].map((i, n) => (
          <div
            key={n}
            aria-hidden={n >= slots.length}
            className="h-[165px] w-[220px] shrink-0 rounded-lg bg-[#D9D9D9]"
          />
        ))}
      </div>
    </section>
  );
}
