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
  bio: string;
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
