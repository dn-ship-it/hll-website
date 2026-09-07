import Link from "next/link";

import {
  BottomShader,
  GradientRevealText,
  HLLButton,
  SERVICE_VARIANTS,
  VARIANT_GRADIENTS,
} from "@/components/hll";

export function HomeHero() {
  return (
    <section className="relative overflow-hidden px-6 pb-24 pt-16 lg:px-10 lg:pb-32 lg:pt-24">
      <BottomShader variant="hll-ai" intensity={70} />
      <div className="relative mx-auto max-w-7xl">
        <p className="mb-6 text-xs uppercase tracking-[0.24em] text-white/45">
          HLL Lifecare × Cornerstone India
        </p>
        <GradientRevealText
          text="Intelligence and Imagination"
          variant="hll-ai"
          className="max-w-4xl"
        />
        <p className="mt-8 max-w-2xl text-lg leading-8 text-white/65 md:text-xl">
          A next-generation digital experience for healthcare logistics, trust
          infrastructure, and AI-led public health innovation.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <HLLButton href="/services" variant="services" size="lg">
            Explore services
          </HLLButton>
          <HLLButton href="/contact" variant="contact" size="lg">
            Talk to us
          </HLLButton>
        </div>
      </div>
    </section>
  );
}

export function ServiceVerticals() {
  return (
    <section className="border-y border-white/8 bg-[#0f0f0f]/70 px-6 py-20 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-white/40">Capabilities</p>
            <h2 className="mt-2 text-3xl font-semibold text-white md:text-4xl">
              Six service verticals
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-white/55">
            Each vertical maps to the LightFX shader preset system — swap in the full
            WebGL kit from HLL-UI-Demo when available.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {SERVICE_VARIANTS.map((variant) => {
            const { colors } = VARIANT_GRADIENTS[variant];
            return (
              <Link
                key={variant}
                href={`/services/${variant}`}
                className="group rounded-3xl border border-white/8 bg-white/[0.02] p-6 transition hover:border-white/16 hover:bg-white/[0.04]"
              >
                <div
                  className="mb-5 h-1.5 w-16 rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${colors.join(", ")})`,
                  }}
                />
                <h3 className="text-xl font-medium capitalize text-white">
                  {variant.replace("hll-", "").replace(/-/g, " ")}
                </h3>
                <p className="mt-3 text-sm leading-7 text-white/55">
                  Strategy, delivery, and platform experiences for{" "}
                  {variant.replace("hll-", "").replace(/-/g, " ")}.
                </p>
                <span className="mt-6 inline-flex">
                  <HLLButton href={`/services/${variant}`} variant={variant} size="sm">
                    View vertical
                  </HLLButton>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function ProofStrip() {
  const stats = [
    { label: "Public health reach", value: "Pan-India" },
    { label: "Digital platforms", value: "CMS + APIs" },
    { label: "Experience system", value: "LightFX" },
  ];

  return (
    <section className="px-6 py-16 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-3xl border border-white/8 bg-white/[0.02] px-6 py-8"
          >
            <p className="text-xs uppercase tracking-[0.18em] text-white/40">{stat.label}</p>
            <p className="mt-3 text-2xl font-semibold text-white">{stat.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
