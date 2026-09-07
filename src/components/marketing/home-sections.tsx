import Link from "next/link";

import {
  BottomShader,
  GradientRevealText,
  HLLButton,
  SERVICE_VARIANTS,
  VARIANT_GRADIENTS,
  type ServiceVariant,
} from "@/components/hll";
import {
  sectionPaddingStyle,
  serviceGridStyle,
  splitGridStyle,
  statGridStyle,
} from "@/lib/layout/grid";

const SERVICE_COPY: Record<
  ServiceVariant,
  { title: string; description: string }
> = {
  "hll-ai": {
    title: "HLL AI",
    description:
      "Intelligent platforms for forecasting, diagnostics support, and operational decision-making.",
  },
  "hll-trust": {
    title: "Trust & Governance",
    description:
      "Compliance, auditability, and secure data exchange across public health programs.",
  },
  "hll-foundation": {
    title: "Foundation",
    description:
      "Core infrastructure and shared services that power nationwide health logistics.",
  },
  "hll-ontology": {
    title: "Ontology",
    description:
      "Standardized health data models that connect systems, suppliers, and institutions.",
  },
  "hll-people": {
    title: "People & Policy",
    description:
      "Workforce programs, policy frameworks, and capacity building at scale.",
  },
  "hll-application": {
    title: "Applications",
    description:
      "Patient-facing and operational applications for procurement, delivery, and care.",
  },
};

export function HomeHero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        paddingInline: "clamp(1.25rem, 4vw, 2.5rem)",
        paddingTop: "clamp(4rem, 10vw, 6rem)",
        paddingBottom: "clamp(5rem, 12vw, 8rem)",
      }}
    >
      <BottomShader variant="hll-ai" intensity={75} />
      <div className="relative mx-auto w-full max-w-[90rem]">
        <p className="mb-[clamp(1rem,3vw,1.5rem)] text-[clamp(0.65rem,1.5vw,0.75rem)] uppercase tracking-[0.24em] text-white/45">
          HLL Lifecare × Cornerstone India
        </p>
        <GradientRevealText
          text="Intelligence and Imagination"
          variant="hll-ai"
          className="max-w-[min(100%,52rem)]"
          fontSize="clamp(2.25rem, 5.5vw + 0.5rem, 4.5rem)"
        />
        <p
          className="mt-[clamp(1.25rem,3vw,2rem)] max-w-[min(100%,40rem)] text-white/65"
          style={{
            fontSize: "clamp(1rem, 1.5vw + 0.5rem, 1.25rem)",
            lineHeight: 1.65,
          }}
        >
          A next-generation digital experience for healthcare logistics, trust
          infrastructure, and AI-led public health innovation.
        </p>
        <div className="mt-[clamp(1.5rem,4vw,2.5rem)] flex flex-wrap gap-3">
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
    <section
      className="border-y border-white/8 bg-[#0f0f0f]/80"
      style={sectionPaddingStyle()}
    >
      <div className="mx-auto w-full max-w-[90rem]">
        <div style={splitGridStyle()} className="mb-[clamp(2rem,5vw,2.5rem)]">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-white/40">Capabilities</p>
            <h2
              className="mt-2 font-semibold text-white"
              style={{ fontSize: "clamp(1.75rem, 3vw + 0.5rem, 2.25rem)" }}
            >
              Six service verticals
            </h2>
          </div>
          <p
            className="text-white/55"
            style={{
              fontSize: "clamp(0.875rem, 1vw + 0.5rem, 1rem)",
              lineHeight: 1.7,
              maxWidth: "36rem",
            }}
          >
            Each vertical maps to the LightFX shader preset system for a consistent
            brand experience across pages.
          </p>
        </div>

        <div style={serviceGridStyle()}>
          {SERVICE_VARIANTS.map((variant) => {
            const { colors } = VARIANT_GRADIENTS[variant];
            const copy = SERVICE_COPY[variant];

            return (
              <Link
                key={variant}
                href={`/services/${variant}`}
                className="group flex h-full min-h-[14rem] flex-col rounded-3xl border border-white/8 bg-white/[0.02] p-[clamp(1rem,2.5vw,1.5rem)] transition hover:border-white/16 hover:bg-white/[0.04]"
              >
                <div
                  className="mb-4 h-1.5 rounded-full"
                  style={{
                    width: "clamp(3rem, 8vw, 4rem)",
                    background: `linear-gradient(90deg, ${colors.join(", ")})`,
                  }}
                />
                <h3
                  className="font-medium text-white"
                  style={{ fontSize: "clamp(1.05rem, 1.5vw + 0.4rem, 1.25rem)" }}
                >
                  {copy.title}
                </h3>
                <p
                  className="mt-2 flex-1 text-white/55"
                  style={{
                    fontSize: "clamp(0.8125rem, 1vw + 0.35rem, 0.875rem)",
                    lineHeight: 1.65,
                  }}
                >
                  {copy.description}
                </p>
                <span className="mt-5 inline-flex">
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

export function MissionStrip() {
  return (
    <section style={sectionPaddingStyle()}>
      <div
        className="mx-auto w-full max-w-[90rem] rounded-3xl border border-white/8 bg-white/[0.02] p-[clamp(1.5rem,4vw,2.5rem)]"
        style={splitGridStyle()}
      >
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-white/40">Our mission</p>
          <h2
            className="mt-2 font-semibold text-white"
            style={{ fontSize: "clamp(1.5rem, 2.5vw + 0.5rem, 2rem)" }}
          >
            Trusted infrastructure for every citizen
          </h2>
        </div>
        <p
          className="text-white/60"
          style={{ fontSize: "clamp(0.9375rem, 1.2vw + 0.4rem, 1.0625rem)", lineHeight: 1.75 }}
        >
          HLL Lifecare connects hospitals, government programs, and suppliers through
          secure digital platforms — from tendering and warehousing to last-mile delivery.
        </p>
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
    <section
      className="border-t border-white/8 bg-[#0c0c0c]"
      style={{
        ...sectionPaddingStyle(),
        paddingBlock: "clamp(2.5rem, 6vw, 4rem)",
      }}
    >
      <div className="mx-auto w-full max-w-[90rem]">
        <div style={statGridStyle()}>
          {stats.map((stat) => (
            <article
              key={stat.label}
              className="rounded-3xl border border-white/8 bg-white/[0.02] p-[clamp(1rem,2.5vw,1.5rem)]"
            >
              <p className="text-xs uppercase tracking-[0.18em] text-white/40">{stat.label}</p>
              <p
                className="mt-2 font-semibold text-white"
                style={{ fontSize: "clamp(1.35rem, 2vw + 0.5rem, 1.75rem)" }}
              >
                {stat.value}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomeCtaBand() {
  const links = [
    { label: "Tenders", href: "/tenders", variant: "services" as const, blurb: "Active procurement notices" },
    { label: "Careers", href: "/careers", variant: "engagement" as const, blurb: "Join the mission" },
    { label: "News", href: "/news", variant: "industries" as const, blurb: "Press & updates" },
  ];

  return (
    <section className="border-t border-white/8" style={sectionPaddingStyle()}>
      <div className="mx-auto w-full max-w-[90rem]">
        <div style={statGridStyle()}>
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex flex-col rounded-3xl border border-white/8 bg-white/[0.02] p-[clamp(1rem,2.5vw,1.5rem)] transition hover:border-white/16"
            >
              <p className="text-xs uppercase tracking-[0.18em] text-white/40">{item.blurb}</p>
              <p
                className="mt-2 font-semibold text-white"
                style={{ fontSize: "clamp(1.1rem, 1.8vw + 0.4rem, 1.35rem)" }}
              >
                {item.label}
              </p>
              <span className="mt-4 inline-flex">
                <HLLButton href={item.href} variant={item.variant} size="sm">
                  View {item.label.toLowerCase()}
                </HLLButton>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
