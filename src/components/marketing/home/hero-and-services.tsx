"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Asterisk,
  Database,
  Network,
  PanelsTopLeft,
  ShieldCheck,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

import { GradientRevealTextSlow } from "@/components/hll";
import { getVariantColors, type ServiceVariant } from "@/components/hll/variants";

import { MediaPlaceholder, OutlinePillButton } from "./primitives";

const HOME_SERVICES: {
  label: string;
  name: string;
  description: string;
  icon: LucideIcon;
  variant: ServiceVariant;
}[] = [
  { label: "KINETIC", name: "HLL Kinetic", description: "We build applications that are a delight to use.", icon: PanelsTopLeft, variant: "hll-application" },
  { label: "MOMENTUM", name: "HLL Momentum", description: "The talent gap closed for you in under a week.", icon: UsersRound, variant: "hll-people" },
  { label: "MOTION", name: "HLL Motion", description: "Applied AI built to move from experimentation into real work.", icon: Asterisk, variant: "hll-ai" },
  { label: "FOUNDATION", name: "HLL Foundation", description: "Data your business can finally trust.", icon: Database, variant: "hll-foundation" },
  { label: "ONTOLOGY", name: "HLL Ontology", description: "A connected view of the knowledge and relationships in your business.", icon: Network, variant: "hll-ontology" },
  { label: "GOVERNANCE & TRUST", name: "HLL Governance & Trust", description: "Could you show a regulator where that number came from?", icon: ShieldCheck, variant: "hll-trust" },
];

export function HomeHero({
  heading,
  ctaLabel = "See our work",
  ctaHref = "#impact",
  heroImageUrl,
}: {
  heading?: string;
  ctaLabel?: string;
  ctaHref?: string;
  heroImageUrl?: string | null;
}) {
  const title =
    heading ?? "We champion future-facing initiatives for an accelerated advancement.";

  return (
    <section className="hll-home-section px-[clamp(1.25rem,4vw,3rem)] pb-[clamp(2rem,5vw,3rem)] pt-[clamp(17rem,23vw,22rem)]">
      <div className="mx-auto max-w-[90rem]">
        <GradientRevealTextSlow
          as="h1"
          text={title}
          variant="hll-ai"
          className="hll-display block max-w-[min(100%,68rem)] tracking-tight text-black"
          fontSize="clamp(2rem, 4.25vw, 4rem)"
          letterSpacing="-0.01em"
        />

        <div className="relative mt-[clamp(1.5rem,3vw,2.5rem)]">
          {heroImageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={heroImageUrl}
              alt=""
              className="aspect-[1.48/1] min-h-[clamp(15rem,48vw,38rem)] w-full object-cover"
            />
          ) : (
            <MediaPlaceholder
              className="aspect-[1.48/1] min-h-[clamp(15rem,48vw,38rem)] w-full"
              label="Hero media"
            />
          )}
          <div className="mt-6 flex justify-center">
            <OutlinePillButton href={ctaHref}>{ctaLabel}</OutlinePillButton>
          </div>
        </div>
      </div>
    </section>
  );
}

export function WhatWeDo() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const selected = HOME_SERVICES[active];
  const selectedColors = getVariantColors(selected.variant);

  const updateActiveFromScroll = useCallback(() => {
    const section = sectionRef.current;
    const sticky = stickyRef.current;
    if (!section || !sticky) return;

    const scrollRange = section.offsetHeight - sticky.offsetHeight;
    if (scrollRange <= 0) return;

    const progress = Math.min(1, Math.max(0, -section.getBoundingClientRect().top / scrollRange));
    const next = Math.min(HOME_SERVICES.length - 1, Math.round(progress * (HOME_SERVICES.length - 1)));
    setActive((current) => (current === next ? current : next));
  }, []);

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

    const scrollRange = section.offsetHeight - sticky.offsetHeight;
    const progress = index / (HOME_SERVICES.length - 1);
    const top = window.scrollY + section.getBoundingClientRect().top + scrollRange * progress;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top, behavior: reduceMotion ? "auto" : "smooth" });
  }

  return (
    <section
      ref={sectionRef}
      className="hll-home-section border-t border-black/6"
      style={{ height: `${HOME_SERVICES.length * 100}svh` }}
      aria-label="Our services"
    >
      <div
        ref={stickyRef}
        className="sticky top-[66px] flex h-[calc(100svh-66px)] items-center px-[clamp(1.25rem,4vw,3rem)]"
      >
        <div className="mx-auto grid w-full max-w-[90rem] items-center gap-[clamp(1rem,4vw,3rem)] md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-black/45">Services</p>
            <h2 className="hll-display mt-2 text-[clamp(1.875rem,4.25vw,4rem)] font-normal text-black">
              What we do
            </h2>
            <nav className="mt-6 flex max-w-full flex-row gap-4 overflow-x-auto pb-1 md:mt-8 md:flex-col md:items-start md:gap-1" aria-label="Choose a service">
              {HOME_SERVICES.map((service, index) => (
                <button
                  key={service.label}
                  type="button"
                  aria-current={active === index ? "step" : undefined}
                  onClick={() => scrollToService(index)}
                  className={`hll-display whitespace-nowrap text-left text-[clamp(1.125rem,2.3vw,2rem)] leading-tight transition-[opacity,color] duration-300 md:text-[clamp(1.25rem,2.3vw,2rem)] ${
                    active === index ? "opacity-100" : "opacity-35 hover:opacity-65"
                  }`}
                >
                  {service.name}
                </button>
              ))}
            </nav>
          </div>

          <div aria-live="polite" className="min-w-0">
            <div className="mb-4 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-black/45">
              <span>{selected.label}</span>
              <span>0{active + 1} / 06</span>
            </div>
            <div
              className="relative grid aspect-[2/1] min-h-[clamp(8rem,32vw,14rem)] place-items-center overflow-hidden transition-[background] duration-500 md:aspect-[1.15/1] md:min-h-[clamp(14rem,35vw,24rem)]"
              style={{ background: `linear-gradient(135deg, ${selectedColors.join(", ")})` }}
            >
              <selected.icon
                aria-hidden="true"
                className="relative size-[clamp(5rem,13vw,10rem)] transition-colors duration-500"
                stroke="white"
                strokeWidth={1}
              />
            </div>
            <div className="mt-4 flex flex-col items-start gap-2 sm:mt-6 sm:flex-row sm:justify-between sm:gap-6">
              <GradientRevealTextSlow
                key={selected.name}
                as="h3"
                text={selected.name}
                variant={selected.variant}
                playOnView
                className="hll-display block text-black"
                fontSize="clamp(1.5rem, 3.6vw, 3rem)"
              />
              <p className="max-w-sm text-sm leading-7 text-black/55">{selected.description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function OurClients() {
  const slots = Array.from({ length: 8 }, (_, i) => i);

  return (
    <section className="hll-home-section border-t border-black/6 px-[clamp(1.25rem,4vw,3rem)] py-[clamp(2.5rem,6vw,4rem)]">
      <div className="mx-auto max-w-[90rem]">
        <p className="hll-label text-[10px] uppercase tracking-[0.28em] text-black/45">Clients</p>
        <h2 className="hll-display mt-2 text-[clamp(1.875rem,4.25vw,4rem)] font-normal text-black">
          Our Clients
        </h2>
        <div
          className="mt-8 grid gap-3 max-md:flex max-md:overflow-x-auto max-md:pb-2"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 7rem), 1fr))",
          }}
        >
          {slots.map((i) => (
            <MediaPlaceholder
              key={i}
              className="aspect-[1.33/1] min-h-[9rem] w-full max-md:min-w-[13.75rem]"
              label={`Client ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
