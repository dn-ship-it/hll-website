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
};

export type ExpertVoice = {
  quote: string;
  /** Deck-sourced quotes are anonymized to role only, so name and company can be absent. */
  name?: string;
  role: string;
  company?: string;
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
      cloud: readonly string[];
      data: readonly string[];
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
