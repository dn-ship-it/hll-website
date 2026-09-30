import type { ServiceVariant } from "@/components/hll/variants";

/**
 * Engagements (Figma Desktop › Engagement Main, Case Study Template and
 * Engagement Story Template). Each engagement is a card on /engagement and a
 * detail page at /engagement/[slug] built from content blocks the CMS can
 * reorder ("a custom cms page that allows the user to switch content blocks
 * around").
 */

export const ENGAGEMENT_TYPES = [
  "Insight",
  "Client Work",
  "Case Study",
] as const;
export type EngagementType = (typeof ENGAGEMENT_TYPES)[number];

/** Case Study: neutral page, related band in the service colour.
 *  Story: the whole page takes the client's colour. */
export type EngagementTemplate = "case-study" | "story";

export const SERVICE_LABELS: Record<ServiceVariant, string> = {
  "hll-ai": "HLL AI",
  "hll-trust": "HLL Trust & Governance",
  "hll-foundation": "HLL Foundation",
  "hll-ontology": "HLL Ontology",
  "hll-people": "HLL People & Policy",
  "hll-application": "HLL Application",
};

/** The expanded filter's industry columns (Figma Engagement Filter Expanded). */
export const INDUSTRY_GROUPS = [
  {
    title: "Financial services",
    items: ["Banking", "Insurance", "Other Financial Services"],
  },
  {
    title: "Commerce & Consumer",
    items: ["Retail Commerce & Brands", "Travel & Hospitality", "Pet Tech"],
  },
  { title: "Health & Life Sciences", items: ["Healthcare", "Pharmaceuticals"] },
  {
    title: "Built Environment & Industry",
    items: ["Manufacturing", "Real Estate", "Logistics"],
  },
  {
    title: "Government & Public Institutions",
    items: [
      "Public Sector – External Affairs",
      "Public Sector – Tax & Commerce",
      "International Organization",
    ],
  },
  { title: "Professional Services", items: ["Consulting Firms"] },
] as const;

export type EngagementMedia = {
  src?: string | null;
  /** Natural size; the card and grid ratios follow the image. */
  width?: number;
  height?: number;
  alt?: string;
  video?: string | null;
};

export type EngagementStat = {
  label: string;
  value: string;
  unit?: string;
  body?: string;
  chart: { label: string; value: number }[];
};

export type EngagementBlock =
  | { kind: "media"; id: string; media: EngagementMedia }
  | {
      /** Figma "Media Block": with no image it shows the quote on the
       *  textured background in the page colour. */
      kind: "quote";
      id: string;
      quote: string;
      name?: string;
      role?: string;
      media?: EngagementMedia;
    }
  | { kind: "mediaGrid"; id: string; rows: EngagementMedia[][] }
  | {
      kind: "text";
      id: string;
      label?: string;
      paragraphs: string[];
      /** The sidebar artifact appears once this section comes up. */
      showsArtifact?: boolean;
    }
  | {
      /** "What we built": a demo window, image / video, or text. */
      kind: "showcase";
      id: string;
      label: string;
      display: "text" | "media" | "demo";
      paragraphs: string[];
      media?: EngagementMedia;
      demoUrl?: string;
    }
  | {
      kind: "outcome";
      id: string;
      label: string;
      items: { stat: string; text: string }[];
    }
  | {
      kind: "team";
      id: string;
      label: string;
      rows: { role: string; names: string[] }[];
    }
  | { kind: "learnings"; id: string; label: string; items: string[] };

export type Engagement = {
  id: string;
  slug: string;
  client: string;
  year: number;
  type: EngagementType;
  template: EngagementTemplate;
  services: ServiceVariant[];
  industry?: string;
  period?: string;
  location?: string;
  /** "Colours of the page will be the primary colour of the client". */
  primaryColor?: string;
  /** "Elements can be put in focus and made bigger (see Zelish)". */
  featured?: boolean;
  card: EngagementMedia;
  stat?: EngagementStat;
  blocks: EngagementBlock[];
  /** Picked in the CMS; otherwise engagements sharing a service. */
  related?: string[];
};

// PLACEHOLDER — Figma's own stand-in copy until the engagement write-ups are
// entered in the CMS.
const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sodales laoreet velit, sagittis laoreet neque tincidunt at. Vestibulum euismod nec lacus vel volutpat. Aenean scelerisque sagittis metus, in luctus nibh rhoncus nec.";
const LOREM_SHORT =
  "Lorem ipsum dolor sit amet elit. Curabitur sodales laoreet velit, sagittis laoreet neque tincidunt at. Vestibulum euismod nec lacus vel volutpat. Aenean scelerisque sagittis metus, in luctus nibh rhoncus nec.";

const PLACEHOLDER_STAT: EngagementStat = {
  label: "Operational Efficiency",
  value: "58.3",
  unit: "%",
  body: LOREM,
  chart: [
    { label: "Apr 25", value: 48 },
    { label: "Aug 25", value: 68.5 },
    { label: "Nov 25", value: 54 },
    { label: "Feb 26", value: 88.4 },
  ],
};

const OUTCOME = {
  label: "Outcome",
  items: [
    {
      stat: "30+",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sodales laoreet velit.",
    },
    {
      stat: "65%",
      text: "Sagittis laoreet neque tincidunt at. Vestibulum euismod nec lacus vel volutpat. Aenean scelerisque sagittis metus.",
    },
    {
      stat: "20+",
      text: "Vestibulum euismod nec lacus vel volutpat. Aenean scelerisque sagittis metus, in luctus nibh rhoncus nec.",
    },
  ],
};

const TEAM = {
  label: "Team",
  rows: [
    { role: "Commissioned by", names: ["Kia Global", "Innocean"] },
    {
      role: "Executive Creative Direction",
      names: ["Marcus Wendt", "Xander Marritt"],
    },
    {
      role: "Design",
      names: [
        "Leon Novaković",
        "Tsingyun Zhang",
        "Ray Chong",
        "Margot Hofmans",
        "Julien Bauzin",
        "Riccardo Torresi",
        "Misha Shyukin",
        "Andrea Zucchetti",
      ],
    },
  ],
};

/** Figma Case Study Template, top to bottom. */
function caseStudyBlocks(): EngagementBlock[] {
  return [
    { kind: "media", id: "hero", media: { width: 1117, height: 617 } },
    { kind: "text", id: "intro", paragraphs: [LOREM], showsArtifact: true },
    {
      kind: "text",
      id: "challenge",
      label: "The challenge",
      paragraphs: [LOREM],
    },
    {
      kind: "text",
      id: "approach",
      label: "Our approach",
      paragraphs: [LOREM, LOREM_SHORT],
    },
    { kind: "media", id: "media-1", media: { width: 1111, height: 617 } },
    {
      kind: "mediaGrid",
      id: "grid-1",
      rows: [
        [
          { width: 623, height: 617 },
          { width: 476, height: 617 },
        ],
      ],
    },
    {
      kind: "mediaGrid",
      id: "grid-2",
      rows: [
        [
          { width: 363, height: 358 },
          { width: 364, height: 358 },
          { width: 363, height: 358 },
        ],
      ],
    },
    { kind: "outcome", id: "outcome", ...OUTCOME },
    { kind: "media", id: "media-2", media: { width: 1096, height: 617 } },
    { kind: "team", id: "team", ...TEAM },
  ];
}

/** Figma Engagement Story Template, top to bottom. */
function storyBlocks(): EngagementBlock[] {
  return [
    {
      kind: "quote",
      id: "hero",
      quote:
        "“Senior talent deployed across the stack with a knowledge graph window showing what customers see. Momentum is the money-maker.”",
      name: "John Doe",
      role: "CEO, McKinsey",
    },
    {
      kind: "text",
      id: "challenge",
      label: "The challenge",
      paragraphs: [LOREM, LOREM, LOREM],
      showsArtifact: true,
    },
    {
      kind: "text",
      id: "approach",
      label: "Our approach",
      paragraphs: [LOREM, LOREM_SHORT],
    },
    {
      kind: "showcase",
      id: "built",
      label: "What we built",
      display: "text",
      paragraphs: ["?"],
    },
    { kind: "outcome", id: "outcome", ...OUTCOME },
    { kind: "team", id: "team", ...TEAM },
    {
      kind: "learnings",
      id: "learnings",
      label: "Our learnings",
      items: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sodales laoreet velit, sagittis laoreet neque tincidunt at.",
        "Vestibulum euismod nec lacus vel volutpat. Aenean scelerisque sagittis metus, in luctus nibh rhoncus nec.",
        "Lorem ipsum dolor sit amet elit. Curabitur sodales laoreet velit, sagittis laoreet neque tincidunt at.",
        "Vestibulum euismod nec lacus vel volutpat. Aenean scelerisque sagittis metus, in luctus nibh rhoncus nec.",
      ],
    },
  ];
}

type Seed = Pick<Engagement, "slug" | "client" | "services" | "featured"> & {
  card: EngagementMedia;
  template?: EngagementTemplate;
};

// PLACEHOLDER — the Figma Engagement Main grid (names, 2021, card ratios);
// service tags as on the Home "Our Impact" cards. The sidebar's period,
// industry and location are the template's own sample values.
const SEEDS: Seed[] = [
  {
    slug: "bajaj",
    client: "Bajaj",
    services: ["hll-people"],
    card: { width: 490, height: 490 },
    template: "story",
  },
  {
    slug: "ktm",
    client: "KTM",
    services: ["hll-trust"],
    card: { width: 490, height: 317 },
  },
  {
    slug: "wecare",
    client: "WeCare",
    services: ["hll-ai", "hll-trust"],
    card: { width: 490, height: 551 },
  },
  {
    slug: "salt",
    client: "Salt",
    services: ["hll-ai"],
    card: { width: 490, height: 403 },
  },
  {
    slug: "the-big-red-group",
    client: "The Big Red Group",
    services: ["hll-people", "hll-ai", "hll-trust"],
    card: { width: 490, height: 490 },
  },
  {
    slug: "salt-2",
    client: "Salt",
    services: ["hll-ai"],
    card: { width: 490, height: 317 },
  },
  {
    slug: "zelish",
    client: "Zelish",
    services: ["hll-ai", "hll-trust"],
    card: { width: 1492, height: 843 },
    featured: true,
  },
  {
    slug: "salt-3",
    client: "Salt",
    services: ["hll-ai"],
    card: { width: 490, height: 403 },
  },
  {
    slug: "the-big-red-group-2",
    client: "The Big Red Group",
    services: ["hll-people", "hll-ai", "hll-trust"],
    card: { width: 490, height: 490 },
  },
  {
    slug: "salt-4",
    client: "Salt",
    services: ["hll-ai"],
    card: { width: 490, height: 317 },
  },
];

export const fallbackEngagements: Engagement[] = SEEDS.map((seed) => {
  const template = seed.template ?? "case-study";
  return {
    id: seed.slug,
    slug: seed.slug,
    client: seed.client,
    year: 2021,
    type: template === "story" ? "Client Work" : "Case Study",
    template,
    services: seed.services,
    featured: seed.featured,
    period: "2024-2026",
    industry: "Transport & Shipping",
    location: "Mumbai",
    // Figma Story sample colour; case studies stay neutral until one is set.
    primaryColor: template === "story" ? "#FE5844" : undefined,
    card: seed.card,
    stat: PLACEHOLDER_STAT,
    blocks: template === "story" ? storyBlocks() : caseStudyBlocks(),
  };
});
