"use client";

import { useState } from "react";

import type { IndustryPageData } from "@/types/industry";
import { MediaPlaceholder } from "@/components/marketing/home/primitives";

export function ClientVoiceSection({
  data,
  accentColor,
}: {
  data: IndustryPageData["clientVoice"];
  accentColor: string;
}) {
  const [slide, setSlide] = useState(1);

  return (
    <section className="border-t border-black/6 px-[clamp(1.25rem,4vw,3rem)] py-[clamp(3rem,8vw,5rem)]">
      <div className="mx-auto max-w-[90rem]">
        <p
          className="text-[10px] font-medium uppercase tracking-[0.24em]"
          style={{ color: accentColor }}
        >
          {data.eyebrow}
        </p>
        <h2
          className="mt-2 font-light text-black"
          style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
        >
          Client Voice
        </h2>

        <div
          className="mt-10 grid items-center gap-[clamp(1.5rem,4vw,3rem)]"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 18rem), 1fr))",
          }}
        >
          <div>
            <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3">
              <button
                type="button"
                aria-label="Previous slide"
                className="text-black/30 hover:text-black/60"
                onClick={() => setSlide((s) => Math.max(1, s - 1))}
              >
                ←
              </button>
              <MediaPlaceholder
                className="aspect-[4/3] w-full min-h-[clamp(10rem,28vw,16rem)]"
                label="Client gallery"
              />
              <button
                type="button"
                aria-label="Next slide"
                className="text-black/30 hover:text-black/60"
                onClick={() => setSlide((s) => Math.min(data.slideCount, s + 1))}
              >
                →
              </button>
            </div>
            <p className="mt-3 text-[10px] uppercase tracking-[0.16em] text-black/35">
              {String(slide).padStart(2, "0")}/{String(data.slideCount).padStart(2, "0")}
            </p>
          </div>

          <blockquote>
            <p
              className="font-light leading-snug text-black"
              style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)" }}
            >
              &ldquo;{data.quote}&rdquo;
            </p>
            <footer className="mt-8 text-sm text-black/55">
              <cite className="not-italic">
                {data.name}, {data.role}, {data.company}
              </cite>
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
