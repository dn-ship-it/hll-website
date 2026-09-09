import type { Metadata } from "next";

import { MenuTriggerOverlay } from "@/components/hll";
import { NAV_VARIANTS, type NavVariant } from "@/components/hll/variants";

export const metadata: Metadata = {
  title: "LightFX — MenuTriggerOverlay",
  description: "Jewel-refraction background animation, services variant.",
};

const VARIANT_BLURB: Record<NavVariant, string> = {
  services: "Warm amber through to signal red — the default menu-item palette.",
  industries: "Deep blue through violet, for vertical landing pages.",
  engagement: "Yellow through orange, the brightest of the five.",
  about: "Cool slate blue drifting into orchid.",
  contact: "Pale periwinkle into deep cyan.",
};

export default function LightFXPreviewPage() {
  return (
    <MenuTriggerOverlay variant="services" layer="under">
      <main className="min-h-[220vh] px-[clamp(1.25rem,5vw,4rem)] py-24 text-black">
        <div className="mx-auto max-w-3xl">
          <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-black/45">
            LightFX kit
          </p>
          <h1
            className="mt-5 font-medium tracking-tight"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.08 }}
          >
            MenuTriggerOverlay, services variant
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-black/60">
            The jewel-refraction shader is pinned to the viewport and composited over the page
            with straight alpha, so this copy stays legible while the effect drifts behind it.
            Move your cursor — the highlight, the voronoi shatter, and the chromatic split all
            track the pointer. Scroll to see the canvas stay fixed while content moves past it.
          </p>

          <dl className="mt-14 grid gap-px overflow-hidden rounded-xl border border-black/10 bg-black/10 sm:grid-cols-2">
            {NAV_VARIANTS.map((variant) => (
              <div key={variant} className="bg-white/85 p-5 backdrop-blur-sm">
                <dt className="text-[10px] font-medium uppercase tracking-[0.2em] text-black/70">
                  {variant}
                </dt>
                <dd className="mt-2 text-sm leading-6 text-black/55">{VARIANT_BLURB[variant]}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-14 text-sm leading-7 text-black/50">
            Swap the palette with the <code className="text-black/70">variant</code> prop, or pass
            an explicit <code className="text-black/70">colors</code> array to override it. Use{" "}
            <code className="text-black/70">layer=&quot;over&quot;</code> to composite the jewel on
            top of the content instead, and <code className="text-black/70">contained</code> to
            scope it to a single section rather than the viewport.
          </p>
        </div>
      </main>
    </MenuTriggerOverlay>
  );
}
