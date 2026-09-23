"use client";

import { useState } from "react";

import { GradientRevealTextSlow, LightFXTag } from "@/components/hll";

import { MediaPlaceholder, OutlinePillButton } from "./primitives";

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
  const categories = ["KINETIC", "MOMENTUM", "MOTION", "FOUNDATION", "ONTOLOGY", "GOVERNANCE & TRUST"];
  const [active, setActive] = useState(1);
  const selected = categories[active];
  const serviceName = selected === "GOVERNANCE & TRUST" ? "Governance & Trust" : selected.charAt(0) + selected.slice(1).toLowerCase();

  return (
    <section className="hll-home-section border-t border-black/6 px-[clamp(1.25rem,4vw,3rem)] py-[clamp(3rem,8vw,5rem)]">
      <div className="mx-auto grid max-w-[90rem] gap-[clamp(1.5rem,4vw,3rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <div>
          <p className="text-[10px] uppercase tracking-[0.28em] text-black/45">Services</p>
          <h2 className="hll-display mt-2 text-[clamp(1.875rem,4.25vw,4rem)] font-normal text-black">
            What we do
          </h2>
          <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Services">
            {categories.map((cat, i) => (
              <button key={cat} type="button" role="tab" aria-selected={active === i} onClick={() => setActive(i)}>
                <LightFXTag variant={active === i ? "warm" : "cool"} removable={false}>{cat}</LightFXTag>
              </button>
            ))}
          </div>
          <GradientRevealTextSlow
            as="h3"
            text={`HLL ${selected === "MOMENTUM" ? "Trust & Governance" : serviceName}`}
            variant="hll-trust"
            playOnView
            className="hll-display mt-10 block text-black"
            fontSize="clamp(1.5rem, 3.6vw, 3rem)"
          />
        </div>

        <div>
          <div className="mb-4 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-black/45"><span>{selected}</span><span>0{active + 1} / 06</span></div>
          <MediaPlaceholder className="aspect-square w-full min-h-[clamp(14rem,35vw,24rem)] lg:aspect-[1.15/1]" />
          <p className="mt-6 max-w-xl text-sm leading-7 text-black/55">
            {selected === "MOMENTUM" ? "Senior talent deployed across the stack with a knowledge graph window showing what customers see. Momentum is the money-maker, it takes center stage." : `Explore HLL ${serviceName} capabilities, built to move future-facing initiatives forward.`}
          </p>
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
