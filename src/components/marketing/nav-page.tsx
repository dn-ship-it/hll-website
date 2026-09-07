import {
  GradientRevealText,
  HLLButton,
  type NavVariant,
} from "@/components/hll";
import { MarketingShell } from "@/components/marketing/marketing-shell";

const PAGE_COPY: Record<
  NavVariant,
  { eyebrow: string; title: string; body: string; cta: string; href: string }
> = {
  services: {
    eyebrow: "What we deliver",
    title: "Services built for public health scale",
    body: "From procurement platforms to patient-facing experiences, Cornerstone India helps HLL Lifecare ship resilient digital services.",
    cta: "View service verticals",
    href: "/services/hll-ai",
  },
  industries: {
    eyebrow: "Who we serve",
    title: "Industries across the health ecosystem",
    body: "Hospital networks, government programs, diagnostics, and pharma supply chains — designed with compliance and accessibility in mind.",
    cta: "Explore engagement models",
    href: "/engagement",
  },
  engagement: {
    eyebrow: "How we work",
    title: "Engagement models that de-risk delivery",
    body: "Discovery, co-design, agile build, and long-term platform operations with bilingual content workflows and STQC-ready QA.",
    cta: "Start a conversation",
    href: "/contact",
  },
  about: {
    eyebrow: "Cornerstone India",
    title: "Mission-led product and platform partners",
    body: "We combine healthcare domain expertise with a cinematic LightFX experience system and Payload CMS content architecture.",
    cta: "Contact us",
    href: "/contact",
  },
  contact: {
    eyebrow: "Get in touch",
    title: "Let’s shape the next HLL experience",
    body: "Share your RFP timeline, design references, or integration constraints. We’ll respond with a delivery plan and UI/API estimate.",
    cta: "View estimate",
    href: "/estimate",
  },
};

export function createNavPage(variant: NavVariant) {
  const copy = PAGE_COPY[variant];

  return function NavPage() {
    return (
      <MarketingShell activeVariant={variant} shaderVariant={variant}>
        <section className="px-6 py-20 lg:px-10 lg:py-28">
          <div className="mx-auto max-w-4xl">
            <p className="text-xs uppercase tracking-[0.24em] text-white/45">{copy.eyebrow}</p>
            <GradientRevealText
              text={copy.title}
              variant="hll-trust"
              className="mt-6"
              fontSize="clamp(2rem, 5vw, 3.5rem)"
            />
            <p className="mt-8 text-lg leading-8 text-white/65">{copy.body}</p>
            <div className="mt-10">
              <HLLButton href={copy.href} variant={variant} size="lg">
                {copy.cta}
              </HLLButton>
            </div>
          </div>
        </section>
      </MarketingShell>
    );
  };
}
