import Link from "next/link";

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
    <section className="px-[clamp(1.25rem,4vw,3rem)] pb-[clamp(2rem,5vw,3rem)] pt-[clamp(1.5rem,3vw,2rem)]">
      <div className="mx-auto max-w-[90rem]">
        <GradientRevealTextSlow
          as="h1"
          text={title}
          variant="hll-ai"
          className="block max-w-[min(100%,56rem)] tracking-tight text-black"
          fontSize="clamp(2rem, 4.5vw + 0.5rem, 3.75rem)"
          letterSpacing="-0.01em"
        />

        <div className="relative mt-[clamp(1.5rem,4vw,2.5rem)]">
          {heroImageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={heroImageUrl}
              alt=""
              className="aspect-[16/7] min-h-[clamp(12rem,40vw,22rem)] w-full rounded-sm object-cover"
            />
          ) : (
            <MediaPlaceholder
              className="aspect-[16/7] min-h-[clamp(12rem,40vw,22rem)] w-full rounded-sm"
              label="Hero media"
            />
          )}
          <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6">
            <OutlinePillButton href={ctaHref}>{ctaLabel}</OutlinePillButton>
          </div>
        </div>
      </div>
    </section>
  );
}

export function WhatWeDo() {
  const categories = ["KINETIC", "MOMENTUM", "MOTION", "FOUNDATION", "ONTOLOGY"];

  return (
    <section className="border-t border-black/6 px-[clamp(1.25rem,4vw,3rem)] py-[clamp(3rem,8vw,5rem)]">
      <div className="mx-auto grid max-w-[90rem] gap-[clamp(1.5rem,4vw,3rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <div>
          <p className="text-[10px] uppercase tracking-[0.28em] text-black/45">Services</p>
          <h2 className="mt-2 text-[clamp(1.35rem,2.5vw,1.75rem)] font-normal text-black">
            What we do
          </h2>
          {/* The demo's Tag is its filter/status chip, which is what this
              service list reads as — one static chip per category. */}
          <ul className="mt-8 flex flex-wrap gap-2">
            {categories.map((cat, i) => (
              <li key={cat}>
                <LightFXTag variant={i % 2 === 0 ? "warm" : "cool"} removable={false}>
                  {cat}
                </LightFXTag>
              </li>
            ))}
          </ul>
          <GradientRevealTextSlow
            as="h3"
            text="HLL Governance & Trust"
            variant="hll-trust"
            playOnView
            className="mt-10 block text-black"
            fontSize="clamp(1.75rem, 3vw, 2.5rem)"
          />
        </div>

        <div>
          <MediaPlaceholder className="aspect-[4/3] w-full min-h-[clamp(14rem,35vw,24rem)]" />
          <p className="mt-6 max-w-xl text-sm leading-7 text-black/55">
            Senior talent deployed across the stack with a knowledge graph window showing
            what customers see. Momentum is the money-maker, it takes center stage.
          </p>
        </div>
      </div>
    </section>
  );
}

export function OurClients() {
  const slots = Array.from({ length: 8 }, (_, i) => i);

  return (
    <section className="border-t border-black/6 px-[clamp(1.25rem,4vw,3rem)] py-[clamp(2.5rem,6vw,4rem)]">
      <div className="mx-auto max-w-[90rem]">
        <p className="text-[10px] uppercase tracking-[0.28em] text-black/45">Services</p>
        <h2 className="mt-2 text-[clamp(1.35rem,2.5vw,1.75rem)] font-normal text-black">
          Our Clients
        </h2>
        <div
          className="mt-8 grid gap-3"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 7rem), 1fr))",
          }}
        >
          {slots.map((i) => (
            <MediaPlaceholder
              key={i}
              className="aspect-[3/2] min-h-[4.5rem] w-full"
              label={`Client ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
