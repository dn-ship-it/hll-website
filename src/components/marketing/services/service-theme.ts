import type { ServiceVariant } from "@/components/hll/variants";
import { RIPPLE_GRADIENTS, SERVICE_TO_RIPPLE } from "@/components/hll/lightfx/ripple-definition";

/** Per-service design tokens; assets live in public/assets/services/<variant>-*. */
export type ServiceTheme = {
  /** Primary colour: headings, labels, numbers, active states. */
  accent: string;
  /** Icon tile (gradient square + glyph). */
  iconSrc: string;
  /** Stops fed to the LightFX outline button on the hero tabs. */
  tabGradient: string[];
  /** Background of the demo window frame. */
  demoBackground: string;
  /** Background of the Outcome band. */
  outcomeBackground: string;
};

// Text colour per service, and each background image's average colour, painted underneath
// so nothing flashes while the image loads.
const FIGMA: Record<ServiceVariant, { accent: string; demoBase: string; outcomeBase: string }> = {
  "hll-ai": { accent: "#618AEF", demoBase: "#6A79EB", outcomeBase: "#727CE8" },
  "hll-trust": { accent: "#259E6F", demoBase: "#04AF85", outcomeBase: "#00CB80" },
  "hll-foundation": { accent: "#FE5B21", demoBase: "#E3604C", outcomeBase: "#E56249" },
  "hll-ontology": { accent: "#8367FF", demoBase: "#A54FBA", outcomeBase: "#A14CBE" },
  "hll-people": { accent: "#FF9648", demoBase: "#FF9404", outcomeBase: "#FF9205" },
  "hll-application": { accent: "#FA2427", demoBase: "#AC5FA9", outcomeBase: "#A263B1" },
  // Cloud: the wheel tile's colours.
  "hll-cloud": { accent: "#2E9FD3", demoBase: "#57B9E1", outcomeBase: "#7FD0E2" },
};

/**
 * The live ripples sit over the stills rather than replacing them: at full strength the
 * palettes are too saturated, so the still carries the colour and the ripple adds motion.
 */
export const RIPPLE_OPACITY = 0.35;

/**
 * p5 sizes the ripple canvas to the window, so a section taller than the viewport would leave
 * an uncovered band; the field is soft enough to stretch to its host.
 */
export const RIPPLE_FILL = "[&_canvas]:!h-full [&_canvas]:!w-full";

export function getServiceTheme(variant: ServiceVariant): ServiceTheme {
  const { accent, demoBase, outcomeBase } = FIGMA[variant];
  const base = `/assets/services/${variant}`;

  return {
    accent,
    iconSrc: `${base}-icon.svg`,
    tabGradient: RIPPLE_GRADIENTS[SERVICE_TO_RIPPLE[variant]],
    demoBackground: `${demoBase} url(${base}-demo.webp) center / cover`,
    outcomeBackground: `${outcomeBase} url(${base}-outcome.webp) center / cover`,
  };
}
