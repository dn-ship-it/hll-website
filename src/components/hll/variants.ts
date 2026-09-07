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
] as const;

export const HLL_VARIANTS = [...NAV_VARIANTS, ...SERVICE_VARIANTS] as const;

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
