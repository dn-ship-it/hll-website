export type IndustryFilter = {
  id: string;
  label: string;
};

export type IndustryCapabilityCard = {
  id: string;
  title: string;
  tag: string;
  description: string;
  variant: "navy" | "orange" | "image";
  client?: string;
  image?: string;
  logo?: string;
};

export type IndustryCapability = {
  id: string;
  index: string;
  title: string;
  description: string;
  cards: IndustryCapabilityCard[];
};

export type IndustryExpert = {
  id: string;
  name: string;
  /** Role, experience and history, one per line in the Functional style. */
  bio: string;
  photo?: string;
};

export type IndustryPageData = {
  slug: string;
  category: string;
  breadcrumb: readonly string[];
  accentColor: string;
  hero: {
    title: string;
    headline: string;
    filters: IndustryFilter[];
    overlayLabel: string;
    image?: string;
  };
  capabilities: {
    eyebrow: string;
    title: string;
    sidebar: readonly string[];
    items: IndustryCapability[];
  };
  clientVoice: {
    eyebrow: string;
    quote: string;
    name: string;
    role: string;
    company: string;
    slideCount: number;
    /** Further testimonials after the main one (CMS "More testimonials"). */
    more?: { quote: string; name?: string; role: string; company?: string }[];
  };
  experts: {
    eyebrow: string;
    title: string;
    people: IndustryExpert[];
  };
  lab: {
    eyebrow: string;
    title: string;
    selectorLabel: string;
    demoUrl: string;
  };
  relatedIndustries: readonly { label: string; href: string }[];
};
