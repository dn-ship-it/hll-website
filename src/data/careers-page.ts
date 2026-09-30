export type CareerSection = { title: string; paragraphs: readonly string[] };

export type CareerNotice = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  expiryDate: string | null;
  applyUrl: string | null;
  documents: { label: string; url: string }[];
  /** Tags on the Open Roles row and the JD page (Figma: service, type, location). */
  service?: string;
  employmentType?: string;
  location?: string;
  seniority?: string;
  /** JD accordion: The role, Responsibilities, Who you are, Process. */
  sections?: CareerSection[];
};

export type CareersPageContent = {
  breadcrumb: readonly string[];
  accentColor: string;
  hero: {
    eyebrow: string;
    headline: string;
    description: string;
  };
  notices: {
    eyebrow: string;
    title: string;
    emptyMessage: string;
  };
  culture: {
    eyebrow: string;
    title: string;
    description: string;
    highlights: readonly { id: string; title: string; body: string }[];
  };
  teamVoice: { quote: string; name: string; role: string; slideCount: number };
  approach: { title: string; items: readonly { id: string; title: string; body: string }[] };
  process: { title: string; rows: readonly CareerSection[] };
  aboutHll: { paragraphs: readonly string[] };
};

// PLACEHOLDER copy from the Figma Careers / JD frames, until real copy lands.
const FIGMA_LEAD =
  "Senior talent deployed across the stack with a knowledge graph window showing what customers see. Momentum is the money-maker, it takes center stage.";
const LOREM_1 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sodales laoreet velit, sagittis laoreet neque tincidunt at.";
const LOREM_2 = "Vestibulum euismod nec lacus vel volutpat. Aenean scelerisque sagittis metus, in luctus nibh rhoncus nec.";

export const placeholderJdSections: CareerSection[] = [
  { title: "The role", paragraphs: [`${LOREM_1} ${LOREM_2}`, `${LOREM_1} ${LOREM_2}`] },
  { title: "Responsibilities", paragraphs: [`${LOREM_1} ${LOREM_2}`] },
  { title: "Who you are", paragraphs: [`${LOREM_1} ${LOREM_2}`] },
  { title: "Process", paragraphs: [`${LOREM_1} ${LOREM_2}`] },
];

export const careersPageContent: CareersPageContent = {
  breadcrumb: ["Careers"],
  accentColor: "#FF9126",
  hero: {
    eyebrow: "Careers",
    headline: "Build what enterprises need to work better",
    description:
      "Join a global team of engineers, designers, and strategists helping enterprises move faster with data, AI, and experience design.",
  },
  notices: {
    eyebrow: "Open roles",
    title: "Open Roles",
    emptyMessage: "There are no open notices at the moment. Check back soon or reach out directly.",
  },
  culture: {
    eyebrow: "Life at HLL",
    title: "Why join Hyper Lychee Labs",
    description:
      "We combine global delivery with local accountability — transparent project management, design-led thinking, and room to grow.",
    highlights: [
      {
        id: "impact",
        title: "Meaningful impact",
        body: "Work on platforms and products used by leading enterprises across healthcare, finance, and public sector.",
      },
      {
        id: "growth",
        title: "Room to grow",
        body: "Senior talent across the stack with mentorship, ownership, and exposure to client-facing delivery.",
      },
      {
        id: "culture",
        title: "Transparent culture",
        body: "Open communication, visible progress, and partnerships built on trust — from kickoff to production.",
      },
    ],
  },
  teamVoice: {
    quote:
      "Senior talent deployed across the stack with a knowledge graph window showing what customers see. Momentum is the money-maker.",
    name: "John Doe",
    role: "CEO, McKinsey",
    slideCount: 3,
  },
  approach: {
    title: "Approach",
    items: [
      { id: "momentum", title: "Collective Momentum", body: FIGMA_LEAD },
      { id: "learning", title: "Learning Culture", body: FIGMA_LEAD },
      { id: "cadence", title: "Meeting Cadence", body: FIGMA_LEAD },
      { id: "learning-2", title: "Learning Culture", body: FIGMA_LEAD },
    ],
  },
  process: {
    title: "Process",
    rows: [
      { title: "Steps", paragraphs: [LOREM_1, LOREM_2, LOREM_1, LOREM_2] },
      { title: "Timelines", paragraphs: [`${LOREM_1} ${LOREM_2}`, LOREM_1] },
      { title: "Expectations", paragraphs: [`${LOREM_1} ${LOREM_2}`, LOREM_1] },
    ],
  },
  aboutHll: { paragraphs: [`${LOREM_1} ${LOREM_1}`, `${LOREM_1} ${LOREM_1}`] },
};

export const defaultCareerNotices: CareerNotice[] = [
  {
    id: "1",
    slug: "senior-data-engineer",
    title: "Senior Data Engineer",
    summary:
      "Design and build lakehouse pipelines, governed metrics, and integration layers for enterprise clients.",
    expiryDate: "2026-10-15",
    applyUrl: "mailto:careers@hyperlychee.com?subject=Senior%20Data%20Engineer",
    documents: [{ label: "Job description (PDF)", url: "#" }],
    sections: placeholderJdSections,
  },
  {
    id: "2",
    slug: "experience-design-lead",
    title: "Experience Design Lead",
    summary:
      "Lead UX research and product design engagements — translating complexity into clarity for global brands.",
    expiryDate: "2026-09-30",
    applyUrl: "mailto:careers@hyperlychee.com?subject=Experience%20Design%20Lead",
    documents: [{ label: "Job description (PDF)", url: "#" }],
    sections: placeholderJdSections,
  },
  {
    id: "3",
    slug: "ai-ml-engineer",
    title: "AI / ML Engineer",
    summary:
      "Ship production ML systems including knowledge graphs, anomaly detection, and LLM-powered workflows.",
    expiryDate: null,
    applyUrl: "mailto:careers@hyperlychee.com?subject=AI%20ML%20Engineer",
    documents: [],
    sections: placeholderJdSections,
  },
];
