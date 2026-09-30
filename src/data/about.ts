import { careersPageContent } from "./careers-page";

export type AboutValue = {
  id: string;
  title: string;
  description: string;
  /** Still shown in the storyboard tiles; `video` plays over it when in focus. */
  image: string;
  video?: string;
};

export type AboutMapPin = {
  id: string;
  /** Position on the map image, as fractions of its width / height. */
  x: number;
  y: number;
  title?: string;
  location?: string;
  href?: string;
};

export type AboutPageData = {
  hero: {
    title: string;
    paragraphs: readonly string[];
    /** Collage tiles; empty entries render as the Figma grey placeholder. */
    images: readonly (string | null)[];
  };
  values: {
    eyebrow: string;
    title: string;
    items: AboutValue[];
  };
  leader: {
    eyebrow: string;
    title: string;
    quote: string;
    name: string;
    role: string;
    portrait?: string;
  };
  reach: {
    eyebrow: string;
    title: string;
    stats: readonly string[];
    map: string;
    pins: AboutMapPin[];
  };
  careers: {
    eyebrow: string;
    title: string;
    image: string;
    label: string;
    points: readonly { id: string; title: string; body: string }[];
    ctaLabel: string;
    ctaHref: string;
  };
};

export const aboutPage: AboutPageData = {
  hero: {
    title: "About",
    paragraphs: [
      "Creating top-notch digital products is not just smart code or stylish design. It takes a true partnership between strategists, engineers, and designers.",
      "We build those partnerships with clear communication, thorough project management, and a commitment to every detail — from the first workshop to production launch.",
    ],
    images: [null, null, null, null],
  },
  values: {
    eyebrow: "About",
    title: "Our Values",
    items: [
      {
        id: "transparency",
        title: "Transparency",
        description:
          "You can monitor project status, expenditures, and progress at every stage. Openness fosters positive communication and outstanding products.",
        image: "/assets/about/value-1.webp",
      },
      {
        id: "communication",
        title: "Communication",
        description:
          "Effective communication means listening, staying informed, and proactively sharing updates — the foundation of efficient delivery.",
        image: "/assets/about/value-2.webp",
      },
      {
        id: "delivery",
        title: "Delivery",
        description:
          "We deliver on schedule and within budget, with project managers closely monitoring every aspect from start to finish.",
        image: "/assets/about/value-3.webp",
      },
      {
        id: "investment",
        title: "Investment",
        description:
          "When you partner with us, your growth is tied to ours. Every pixel and line of code must be perfect because your success relies on it.",
        image: "/assets/about/value-4.webp",
      },
    ],
  },
  // PLACEHOLDER — Figma's stand-in quote until the leadership quote is written.
  leader: {
    eyebrow: "About",
    title: "HLL",
    quote:
      "Senior talent deployed across the stack with a knowledge graph window showing what customers see. Momentum is the money-maker.",
    name: "Hannan Hakim",
    role: "Chief Executive Officer",
  },
  // PLACEHOLDER pins from the Figma "Interactive Map"; the real project list
  // (location, title, case study link) is meant to come from the CMS.
  reach: {
    eyebrow: "About",
    title: "Our Reach",
    stats: ["20+ Countries", "100+ Projects"],
    map: "/assets/about/map.webp",
    pins: [
      { id: "mckinsey", x: 0.086, y: 0.244, title: "Data Science Project for McKinsey", location: "Seattle", href: "/engagement" },
      { id: "snl", x: 0.665, y: 0.431, title: "Data Project for SNL", location: "Riyadh", href: "/engagement" },
      { id: "p1", x: 0.218, y: 0.787 },
      { id: "p2", x: 0.559, y: 0.141 },
      { id: "p3", x: 0.902, y: 0.594 },
      { id: "p4", x: 0.534, y: 0.664 },
      { id: "p5", x: 0.913, y: 0.363 },
      { id: "p6", x: 0.44, y: 0.465 },
    ],
  },
  careers: {
    eyebrow: "About",
    title: "Careers",
    image: "/assets/about/careers.webp",
    label: "Why work at HLL?",
    points: careersPageContent.culture.highlights,
    ctaLabel: "View careers page",
    ctaHref: "/careers",
  },
};
