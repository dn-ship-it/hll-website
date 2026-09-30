import type { ServiceVariant } from "@/components/hll/variants";

export type SubService = {
  name: string;
  /** Foundation's sub-services carry a body; the other verticals are name-only. */
  description?: string;
};

export type CapabilityItem = {
  id: string;
  index: string;
  title: string;
  description: string;
  subServices?: SubService[];
};

/** Figma "Tools and Technologies" pill: a logo and a name, both set in the CMS. */
export type ServiceTool = { name: string; icon?: string | null };

export type OutcomeCard = {
  stat: string;
  description: string;
  hasMedia?: boolean;
};

/** Matches the copy spec's card typing, which drives the tag shown on the card. */
export type EngagementCardType = "Client work" | "Insight" | "Industry";

export type EngagementCard = {
  id: string;
  title: string;
  client: string;
  tag: EngagementCardType;
  description: string;
  variant: "navy" | "orange" | "image";
  /** Full-bleed photo for the card's media block (Figma: "Banking"). */
  image?: string;
  /** Client logo centred on the coloured block (Figma: McKinsey, KTM). */
  logo?: string;
};

export type ExpertVoice = {
  quote: string;
  /** Deck-sourced quotes are anonymized to role only, so name and company can be absent. */
  name?: string;
  role: string;
  company?: string;
  /** 300×400 portrait beside the quote. */
  portrait?: string;
  /** Company logo for the 115px tile next to the portrait. */
  companyLogo?: string;
};

export type ServicePageData = {
  slug: string;
  variant: ServiceVariant;
  brand: string;
  breadcrumb: readonly string[];
  hero: {
    headline: string;
    support?: string;
    tabs: { id: string; label: string }[];
  };
  capabilities: {
    eyebrow: string;
    title: string;
    items: CapabilityItem[];
    tools?: {
      cloud: readonly ServiceTool[];
      data: readonly ServiceTool[];
    };
  };
  outcomes: {
    title: string;
    cards: OutcomeCard[];
  };
  engagement: {
    title: string;
    intro: string;
    cards: EngagementCard[];
  };
  /** Null where the copy spec flagged the quote as undrafted. */
  expertVoice: ExpertVoice | null;
  relatedServices: readonly { label: string; href: string }[];
  cta: {
    headline: string;
    buttonLabel: string;
    href: string;
  };
};
