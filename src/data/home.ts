import type { ServiceVariant } from "@/components/hll/variants";

/** Figma Desktop › Home: the sections below the hero. Each one falls back to
 *  this copy until the CMS fills it in (Marketing content › Home page). */

export type HomeHeadingContent = { eyebrow: string; title: string };

export type HomeService = {
  label: string;
  name: string;
  href: string;
  description: string;
  /** Picks the capability's colours, demo still and glyph. */
  variant: ServiceVariant;
  /** Replaces the demo still when set. */
  image?: string | null;
};

export type HomeClientLogo = { name: string; logo: string | null };

export type HomeImpactCard = {
  title: string;
  tags: string[];
  image?: string | null;
  href?: string | null;
};

export type HomeImpactStat = { value: string; label: string };

export type HomeStep = { id: string; title: string; body: string; image: string };

export type HomePerson = { id: string; name: string; role: string; photo?: string | null };

export type HomePageContent = {
  whatWeDo: HomeHeadingContent & { items: HomeService[] };
  clients: HomeHeadingContent & { logos: HomeClientLogo[] };
  impact: HomeHeadingContent & {
    /** In Figma order: Bajaj, KTM, WeCare, The Big Red Group, Salt, Zelish. */
    cards: HomeImpactCard[];
    /** Clients counter, then satisfaction. */
    stats: HomeImpactStat[];
    ctaLabel: string;
    ctaHref: string;
  };
  howWeWork: HomeHeadingContent & { steps: HomeStep[] };
  whoWeAre: HomeHeadingContent & {
    people: HomePerson[];
    ctaLabel: string;
    ctaHref: string;
  };
  lab: HomeHeadingContent & {
    background: string;
    demoImage?: string | null;
    demoVideo?: string | null;
  };
};

export const homePageContent: HomePageContent = {
  whatWeDo: {
    eyebrow: "Capabilities",
    title: "What we do",
    items: [
      {
        label: "Application",
        name: "Applications",
        href: "/services/applications",
        description: "We build applications that are a delight to use.",
        variant: "hll-application",
      },
      {
        label: "People & Policy",
        name: "People & Policy",
        href: "/services/people-policy",
        description: "The talent gap closed for you in under a week.",
        variant: "hll-people",
      },
      {
        label: "Trust & Governance",
        name: "Trust & Governance",
        href: "/services/trust-governance",
        description: "Could you show a regulator where that number came from?",
        variant: "hll-trust",
      },
      {
        label: "AI",
        name: "AI",
        href: "/services/ai",
        description: "Applied AI built to move from experimentation into real work.",
        variant: "hll-ai",
      },
      {
        label: "Foundation",
        name: "Data & Analytics",
        href: "/services/data-analytics",
        description: "Data your business can finally trust.",
        variant: "hll-foundation",
      },
      {
        label: "Ontology",
        name: "Ontology",
        href: "/services/ontology",
        description: "A connected view of the knowledge and relationships in your business.",
        variant: "hll-ontology",
      },
    ],
  },
  clients: { eyebrow: "Clients", title: "Our Clients", logos: [] },
  impact: {
    eyebrow: "Work",
    title: "Our Impact",
    cards: [
      { title: "Bajaj", tags: ["People & Policy"] },
      { title: "KTM", tags: ["Trust & Governance"] },
      { title: "WeCare", tags: ["AI", "Trust & Governance"] },
      {
        title: "The Big Red Group",
        tags: ["People & Policy", "AI", "Trust & Governance"],
      },
      { title: "Salt", tags: ["AI"] },
      { title: "Zelish", tags: ["AI", "Trust & Governance"] },
    ],
    stats: [
      { value: "60+", label: "Clients across the world" },
      { value: "80%", label: "Client satisfaction" },
    ],
    ctaLabel: "View all work",
    ctaHref: "/engagement",
  },
  howWeWork: {
    eyebrow: "About",
    title: "How we work",
    steps: [
      {
        id: "shape",
        title: "Shape",
        image: "/assets/home/shape.webp",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sodales laoreet vehicula.",
      },
      {
        id: "build",
        title: "Build",
        image: "/assets/home/build.webp",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sodales laoreet vehicula.",
      },
      {
        id: "evolve",
        title: "Evolve",
        image: "/assets/home/evolve.webp",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sodales laoreet vehicula.",
      },
    ],
  },
  whoWeAre: {
    eyebrow: "Team",
    title: "Who are we",
    people: Array.from({ length: 4 }, (_, i) => ({
      id: String(i),
      name: "Hannan Hakim",
      role: "Chief Operating Officer",
    })),
    ctaLabel: "View all team",
    ctaHref: "/team",
  },
  lab: {
    eyebrow: "Demo tool",
    title: "Inside the Lab",
    background: "/assets/home/lab-bg.webp",
  },
};
