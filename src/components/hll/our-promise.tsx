"use client";

import { cn } from "@/lib/utils";

import { gradientCss, type HLLVariant } from "./variants";

type OurPromiseProps = {
  eyebrow?: string;
  line1?: string;
  line2?: string;
  variant?: HLLVariant;
  className?: string;
};

/** Full-bleed gradient promise band — mirrors HLL-UI-Demo `our-promise`. */
export function OurPromise({
  eyebrow = "OUR PROMISE",
  line1 = "what is the one-line promise?",
  line2 = "a single sentence bridging the stack to proof.",
  variant = "engagement",
  className,
}: OurPromiseProps) {
  return (
    <section
      className={cn("relative overflow-hidden py-[clamp(4rem,12vw,7rem)]", className)}
      aria-label="Our promise"
    >
      <div
        className="promise-shader absolute inset-0"
        style={{ background: gradientCss(["#FF9126", "#2BB4EB", "#F7A567"], 120) }}
      />
      <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]" />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-black/70">
          {eyebrow}
        </p>
        <p className="mt-4 text-[clamp(1.125rem,2.5vw,1.5rem)] font-light leading-snug text-black/90">
          {line1}
        </p>
        <p className="mt-1 text-[clamp(1.125rem,2.5vw,1.5rem)] font-light leading-snug text-black/90">
          {line2}
        </p>
      </div>
    </section>
  );
}
