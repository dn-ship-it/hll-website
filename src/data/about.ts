export type AboutValue = {
  id: string;
  title: string;
  description: string;
};

export type AboutTeamMember = {
  id: string;
  name: string;
  role: string;
};

export type AboutProcessStep = {
  id: string;
  title: string;
  body: string;
};

export type AboutPageData = {
  breadcrumb: readonly string[];
  accentColor: string;
  hero: {
    eyebrow: string;
    headline: string;
    description: string;
    ctaLabel: string;
    ctaHref: string;
  };
  story: {
    eyebrow: string;
    title: string;
    paragraphs: readonly string[];
  };
  values: {
    eyebrow: string;
    title: string;
    items: AboutValue[];
  };
  process: {
    eyebrow: string;
    title: string;
    steps: AboutProcessStep[];
  };
  team: {
    eyebrow: string;
    title: string;
    members: AboutTeamMember[];
    ctaLabel: string;
    ctaHref: string;
  };
  promise: {
    eyebrow: string;
    line1: string;
    line2: string;
  };
  lab: {
    eyebrow: string;
    title: string;
    selectorLabel: string;
    demoUrl: string;
  };
  clients: {
    eyebrow: string;
    title: string;
    slotCount: number;
  };
};

export const aboutPage: AboutPageData = {
  breadcrumb: ["About"],
  accentColor: "#9AB4D3",
  hero: {
    eyebrow: "About us",
    headline: "Mission-led partners for future-facing initiatives",
    description:
      "Hyper Lychee Labs helps enterprises bridge vision and execution through data engineering, AI, and experience design — combining deep technical expertise with thoughtful design.",
    ctaLabel: "See our work",
    ctaHref: "/#impact",
  },
  story: {
    eyebrow: "Our story",
    title: "When dreamers and makers come together",
    paragraphs: [
      "Creating top-notch digital products is not just smart code or stylish design. It takes a true partnership between strategists, engineers, and designers.",
      "We build those partnerships with clear communication, thorough project management, and a commitment to every detail — from the first workshop to production launch.",
    ],
  },
  values: {
    eyebrow: "Our values",
    title: "When all the parts come together, extraordinary things can happen",
    items: [
      {
        id: "transparency",
        title: "Transparency",
        description:
          "You can monitor project status, expenditures, and progress at every stage. Openness fosters positive communication and outstanding products.",
      },
      {
        id: "communication",
        title: "Communication",
        description:
          "Effective communication means listening, staying informed, and proactively sharing updates — the foundation of efficient delivery.",
      },
      {
        id: "delivery",
        title: "Delivery",
        description:
          "We deliver on schedule and within budget, with project managers closely monitoring every aspect from start to finish.",
      },
      {
        id: "investment",
        title: "Investment",
        description:
          "When you partner with us, your growth is tied to ours. Every pixel and line of code must be perfect because your success relies on it.",
      },
    ] satisfies AboutValue[],
  },
  process: {
    eyebrow: "About",
    title: "How we work",
    steps: [
      { id: "shape", title: "Shape", body: "" },
      {
        id: "build",
        title: "Build",
        body: "Senior talent deployed across the stack with governed delivery models, semantic clarity, and production-grade engineering.",
      },
      { id: "evolve", title: "Evolve", body: "" },
    ] satisfies AboutProcessStep[],
  },
  team: {
    eyebrow: "Team",
    title: "Who are we",
    members: Array.from({ length: 4 }, (_, i) => ({
      id: String(i + 1),
      name: "Hannan Hakim",
      role: "Chief Operating Officer",
    })) satisfies AboutTeamMember[],
    ctaLabel: "View all team",
    ctaHref: "/team",
  },
  promise: {
    eyebrow: "Our promise",
    line1: "what is the one-line promise?",
    line2: "a single sentence bridging the stack to proof.",
  },
  lab: {
    eyebrow: "Demo tool",
    title: "Inside the Lab",
    selectorLabel: "About",
    demoUrl: "/demos/hll-foundation-data-engineering.html",
  },
  clients: {
    eyebrow: "Clients",
    title: "People & companies we've partnered with",
    slotCount: 8,
  },
};

