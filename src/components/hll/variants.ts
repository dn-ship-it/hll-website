export const NAV_VARIANTS = [
  "services",
  "industries",
  "engagement",
  "about",
  "contact",
] as const;

export const SERVICE_VARIANTS = [
  "hll-ai",
  "hll-trust",
  "hll-foundation",
  "hll-ontology",
  "hll-people",
  "hll-application",
  "hll-cloud",
] as const;

export const HLL_VARIANTS = [...NAV_VARIANTS, ...SERVICE_VARIANTS] as const;

/**
 * The service lines as the site shows them (17 Oct content handoff): the
 * names exactly as the Service Pages ledger has them, never with "HLL" in
 * front, and their page URLs. The `hll-*` variant names are code identifiers
 * only and are never shown.
 */
export const SERVICE_NAMES: Record<(typeof SERVICE_VARIANTS)[number], string> = {
  "hll-foundation": "Data & Analytics",
  "hll-application": "Applications",
  "hll-ai": "AI",
  "hll-trust": "Trust & Governance",
  "hll-people": "People & Policy",
  "hll-ontology": "Ontology",
  "hll-cloud": "Cloud",
};

/**
 * Service names as older content and the CMS may still have them, mapped to
 * the names the site shows. Applied to service names that come from the CMS,
 * so the "no HLL in front" rule holds whatever was typed there.
 */
const OLD_SERVICE_NAMES: Record<string, string> = {
  "hll foundation": "Data & Analytics",
  "hll data & analytics": "Data & Analytics",
  "hll application": "Applications",
  "hll applications": "Applications",
  "hll kinetic": "Applications",
  "hll ai": "AI",
  "hll trust & governance": "Trust & Governance",
  "hll governance & trust": "Trust & Governance",
  "hll people & policy": "People & Policy",
  "hll momentum": "People & Policy",
  "hll ontology": "Ontology",
  "hll cloud": "Cloud",
};

export function cleanServiceName(name: string) {
  return OLD_SERVICE_NAMES[name.trim().toLowerCase()] ?? name;
}

/** A link, with an old service URL (/services/hll-foundation) made current. */
export function cleanServiceHref(href: string) {
  const match = href.match(/^\/services\/(hll-[a-z]+)(.*)$/);
  if (!match) return href;
  const variant = (SERVICE_VARIANTS as readonly string[]).includes(match[1])
    ? (match[1] as (typeof SERVICE_VARIANTS)[number])
    : null;
  return variant ? `/services/${SERVICE_SLUGS[variant]}${match[2]}` : href;
}

/** Each service's URL slug: /services/<slug>. */
export const SERVICE_SLUGS: Record<(typeof SERVICE_VARIANTS)[number], string> = {
  "hll-foundation": "data-analytics",
  "hll-application": "applications",
  "hll-ai": "ai",
  "hll-trust": "trust-governance",
  "hll-people": "people-policy",
  "hll-ontology": "ontology",
  "hll-cloud": "cloud",
};

export const serviceHref = (variant: (typeof SERVICE_VARIANTS)[number]) =>
  `/services/${SERVICE_SLUGS[variant]}`;

/** The service for a URL slug, new (data-analytics) or old (hll-foundation). */
export function serviceVariantForSlug(slug: string) {
  const found = (Object.entries(SERVICE_SLUGS) as [(typeof SERVICE_VARIANTS)[number], string][]).find(
    ([variant, s]) => s === slug || variant === slug,
  );
  return found?.[0] ?? null;
}

export type HLLVariant = (typeof HLL_VARIANTS)[number];

export type NavVariant = (typeof NAV_VARIANTS)[number];
export type ServiceVariant = (typeof SERVICE_VARIANTS)[number];

export const VARIANT_GRADIENTS: Record<
  HLLVariant,
  { colors: string[]; usage: string }
> = {
  services: {
    colors: ["#F7A567", "#E05A35", "#EB3B3E"],
    usage: "Services menu item",
  },
  industries: {
    colors: ["#0352B2", "#037A9F", "#6460D5"],
    usage: "Industries menu item",
  },
  engagement: {
    colors: ["#F9B535", "#FF9126", "#FF6302"],
    usage: "Engagement menu item",
  },
  about: {
    colors: ["#9AB4D3", "#A28DD7", "#AD7ECF"],
    usage: "About menu item",
  },
  contact: {
    colors: ["#ABBFFF", "#2BB4EB", "#076EB8"],
    usage: "Contact menu item",
  },
  "hll-ai": { colors: ["#3773FF", "#BCA6D6"], usage: "HLL AI service" },
  "hll-trust": { colors: ["#129562", "#7CBAAA"], usage: "HLL Trust service" },
  "hll-foundation": {
    colors: ["#FF5A1E", "#CC8B93"],
    usage: "HLL Foundation service",
  },
  "hll-ontology": {
    colors: ["#7455FF", "#FFB26A"],
    usage: "HLL Ontology service",
  },
  "hll-people": { colors: ["#FF9042", "#FFEEC7"], usage: "HLL People service" },
  // The All Capabilities wheel's Cloud tile (the design system has no Cloud
  // gradient of its own yet).
  "hll-cloud": { colors: ["#57B9E1", "#AAEBE3"], usage: "Cloud service" },
  "hll-application": {
    colors: ["#FF1F1F", "#72AAFF"],
    usage: "HLL Application service",
  },
};

export function getVariantColors(variant: HLLVariant, override?: string[]) {
  if (override?.length) return override;
  return VARIANT_GRADIENTS[variant]?.colors ?? VARIANT_GRADIENTS.services.colors;
}

export function gradientCss(colors: string[], angle = 135) {
  const stops = colors.join(", ");
  return `linear-gradient(${angle}deg, ${stops})`;
}
