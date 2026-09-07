"use client";

import { useState } from "react";

import { MediaPlaceholder } from "./primitives";

const STEPS = [
  {
    id: "shape",
    title: "Shape",
    body: "",
    active: false,
  },
  {
    id: "build",
    title: "Build",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    active: true,
  },
  {
    id: "evolve",
    title: "Evolve",
    body: "",
    active: false,
  },
] as const;

export function HowWeWork() {
  const [active, setActive] = useState<(typeof STEPS)[number]["id"]>("build");

  return (
    <section className="border-t border-black/6 px-[clamp(1.25rem,4vw,3rem)] py-[clamp(3rem,8vw,5rem)]">
      <div className="mx-auto max-w-[90rem]">
        <p className="text-[10px] uppercase tracking-[0.28em] text-black/45">About</p>
        <h2 className="mt-2 text-[clamp(1.35rem,2.5vw,1.75rem)] font-normal text-black">
          How we work
        </h2>

        <div className="mt-10 grid grid-cols-[auto_1fr_auto] items-center gap-4">
          <button
            type="button"
            className="text-black/30 hover:text-black/60"
            aria-label="Previous"
            onClick={() => setActive("shape")}
          >
            ←
          </button>

          <div
            className="grid items-end gap-4"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 8rem), 1fr))",
            }}
          >
            {STEPS.map((step) => {
              const isActive = active === step.id;
              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => setActive(step.id)}
                  className={`flex flex-col items-center text-center transition ${
                    isActive ? "scale-100 opacity-100" : "scale-90 opacity-45 grayscale"
                  }`}
                >
                  <MediaPlaceholder
                    className={`rounded-full ${
                      isActive
                        ? "size-[clamp(5rem,12vw,7.5rem)]"
                        : "size-[clamp(3.5rem,8vw,5rem)]"
                    }`}
                    label={step.title}
                  />
                  <p className="mt-4 text-sm font-medium text-black">{step.title}</p>
                  {isActive && step.body ? (
                    <p className="mt-3 max-w-xs text-xs leading-6 text-black/55">{step.body}</p>
                  ) : null}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            className="text-black/30 hover:text-black/60"
            aria-label="Next"
            onClick={() => setActive("evolve")}
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}

export function WhoWeAre() {
  const team = Array.from({ length: 4 }, (_, i) => ({
    name: "Hannan Hakim",
    role: "Chief Operating Officer",
    id: i,
  }));

  return (
    <section className="border-t border-black/6 px-[clamp(1.25rem,4vw,3rem)] py-[clamp(3rem,8vw,5rem)]">
      <div className="mx-auto max-w-[90rem]">
        <p className="text-[10px] uppercase tracking-[0.28em] text-black/45">Team</p>
        <h2 className="mt-2 text-[clamp(1.35rem,2.5vw,1.75rem)] font-normal text-black">
          Who are we
        </h2>

        <div
          className="mt-10 grid gap-6"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 10rem), 1fr))",
          }}
        >
          {team.map((person) => (
            <article key={person.id}>
              <MediaPlaceholder className="aspect-[3/4] w-full min-h-[clamp(12rem,28vw,18rem)]" />
              <p className="mt-4 text-sm font-medium text-black">{person.name}</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-black/45">
                {person.role}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href="/team"
            className="inline-flex rounded-full border border-black/20 px-5 py-2 text-[11px] uppercase tracking-[0.18em] text-black/80"
          >
            View all team
          </a>
        </div>
      </div>
    </section>
  );
}

export function InsideTheLab() {
  return (
    <section className="relative overflow-hidden px-[clamp(1.25rem,4vw,3rem)] py-[clamp(4rem,10vw,6rem)]">
      <div
        className="lab-shader absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #FF5A1E 0%, #FF9126 35%, #F9B535 60%, #FFB26A 100%)",
        }}
      />
      <div className="relative mx-auto max-w-[90rem] text-center">
        <p className="text-[10px] uppercase tracking-[0.28em] text-black/60">Demo tool</p>
        <h2 className="mt-2 text-[clamp(1.35rem,2.5vw,1.75rem)] font-normal text-black">
          Inside the Lab
        </h2>
        <div className="mx-auto mt-10 max-w-4xl rounded-lg border border-white/40 bg-white p-3 shadow-xl">
          <MediaPlaceholder className="aspect-[16/9] w-full min-h-[clamp(10rem,30vw,18rem)]" label="Demo window" />
        </div>
      </div>
    </section>
  );
}

export function HomeCta() {
  return (
    <section
      className="px-[clamp(1.25rem,4vw,3rem)] py-[clamp(2rem,5vw,3rem)]"
      style={{
        background: "linear-gradient(90deg, #FFF6B7 0%, #E8F4FF 50%, #D4ECFF 100%)",
      }}
    >
      <div className="mx-auto flex max-w-[90rem] flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <h2
          className="font-light text-black"
          style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
        >
          Let&apos;s start a conversation
        </h2>
        <a
          href="/contact"
          className="inline-flex rounded-full border border-black/25 bg-white/60 px-6 py-2.5 text-[11px] font-medium uppercase tracking-[0.18em] text-black/80 backdrop-blur-sm transition hover:bg-white"
        >
          Write to us
        </a>
      </div>
    </section>
  );
}
