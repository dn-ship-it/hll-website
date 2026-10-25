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

/** `video`: the step's motion piece, played over its image (the still). */
export type HomeStep = { id: string; title: string; body: string; image: string; video?: string };

export type HomePerson = { id: string; name: string; role: string; photo?: string | null };

export type HomePageContent = {
  whatWeDo: HomeHeadingContent & { items: HomeService[] };
  clients: HomeHeadingContent & { logos: HomeClientLogo[] };
  impact: HomeHeadingContent & {
    /** Rows of three, two and one (the wide card), in order. */
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
      // Hannan's canvas (25 Oct): DocuPet, McKinsey & Company, Galeries
      // Lafayette / Wataniya, KTM / WeWork. Images come from the CMS.
      { title: "DocuPet", tags: ["Applications"], href: "/engagement/docupet" },
      { title: "McKinsey & Company", tags: ["People & Policy"], href: "/engagement/fraud-model-recovery-government-tax-auth" },
      { title: "Galeries Lafayette", tags: ["Applications"], href: "/engagement/galeries-lafayette" },
      { title: "Wataniya", tags: ["People & Policy"], href: "/engagement/wataniya-monolith-to-microservices-archi" },
      { title: "KTM", tags: ["Applications"], href: "/engagement/ktm" },
      { title: "WeWork", tags: ["Applications"], href: "/engagement/wework" },
    ],
    stats: [
      { value: "15+", label: "Enterprise Clients" },
      { value: "$1B+", label: "Revenue Impact Across Clients" },
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
        video: "/assets/home/shape.mp4",
        body: "We constantly push the envelope to help you define what needs to exist and translate ambiguity into a clear and dynamic future.",
      },
      {
        id: "build",
        title: "Build",
        image: "/assets/home/build.webp",
        body: "We leverage the collective momentum of our people along with future mental models to deliver impact-driven products and services.",
      },
      {
        id: "evolve",
        title: "Evolve",
        image: "/assets/home/evolve.webp",
        video: "/assets/home/evolve.mp4",
        body: "We help organisations evolve using insights and by augmenting them with the right people. All with the intent of solving challenges with a future-forward mindset.",
      },
    ],
  },
  whoWeAre: {
    eyebrow: "Team",
    title: "Who are we",
    // Hannan's canvas (25 Oct). Photos to come from Rima.
    people: [
      { id: "hannan-hakim", name: "Hannan Hakim", role: "Founding Partner" },
      { id: "arjun-pathni", name: "Arjun Pathni", role: "Senior Partner" },
      { id: "rima-sarkar", name: "Rima Sarkar", role: "Head Of Growth" },
      { id: "nilesh-nalnikar", name: "Nilesh Nalnikar", role: "Senior Partner" },
    ],
    ctaLabel: "View all team",
    ctaHref: "/team",
  },
  lab: {
    eyebrow: "Demo tool",
    title: "Inside the Lab",
    background: "/assets/home/lab-bg.webp",
  },
};
