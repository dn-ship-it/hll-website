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
  /** The Team Voice slides from the CMS; empty means just `teamVoice`. */
  teamVoices?: { quote: string; name?: string; role: string }[];
  approach: { title: string; items: readonly { id: string; title: string; body: string }[] };
  process: { title: string; rows: readonly CareerSection[] };
  aboutHll: { paragraphs: readonly string[]; image: string };
};

// PLACEHOLDER copy from the Figma Careers / JD frames, until real copy lands.
/** Hannan's canvas (25 Oct), /about "ABOUT HLL: Intro"; also the job pages' About HLL. */
export const ABOUT_HLL_INTRO = [
  "At our core, we believe in the power of technology to transform businesses, industries, and society as a whole. That's why we approach every project with a blend of creativity, expertise, and empathy - to truly understand our clients' needs and build solutions that drive impact.",
  "We know that success is not just about what we build, but how we build it. That's why we value transparency, accountability, and a commitment to doing what's right, even when it's not the easy choice. We believe in creating a culture that fosters creativity, diversity, and inclusivity - because we believe that the best ideas come from a range of perspectives.",
  "Join us on our mission to empower businesses to thrive in a rapidly changing world. Let's work together to build a better future, one impact story at a time.",
];
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
    headline: "HLL is a Data, Analytics, AI & Design lab for large organisations.",
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
        body: "You work on engagements for leading enterprises in Insurance, Banking and the Public Sector. We build for the decades and magnitudes, so what you deliver stays in use for years.",
      },
      {
        id: "growth",
        title: "Room to grow",
        body: "You work beside senior partners from enterprise backgrounds, and they mentor you. You own your results and work directly with clients on challenges in different domains.",
      },
      {
        id: "culture",
        title: "Transparent culture",
        body: "We communicate openly and show our progress, so you always know the status of every project. Relationships matter to us as much as excellence, with clients and with each other.",
      },
    ],
  },
  // Hannan's canvas (25 Oct), /careers.
  teamVoice: {
    quote:
      "Our strength comes from our people, and we hire for capability and culture. We look for discerning people who strive for more and can lead from their first engagement.",
    name: "Arjun Pathni",
    role: "Partner, HLL",
    slideCount: 2,
  },
  teamVoices: [
    {
      quote:
        "Our strength comes from our people, and we hire for capability and culture. We look for discerning people who strive for more and can lead from their first engagement.",
      name: "Arjun Pathni",
      role: "Partner, HLL",
    },
    {
      quote:
        "We design for the decades, and that starts with the people we invite in. I look for colleagues who care about their craft and keep learning and pushing the bounds of innovation",
      name: "Hannan Hakim",
      role: "Founding Partner, HLL",
    },
  ],
  approach: {
    title: "Approach",
    items: [
      {
        id: "craft-first",
        title: "Craft First",
        body: "The quality of your work and the depth behind it come first. We want to be part of your growth story, and partners mentor you.",
      },
      {
        id: "curious-by-default",
        title: "Curious by Default",
        body: "We believe human ingenuity can solve root node problems. Expect colleagues who ask good questions and imagine what should exist, then turn ambiguity into a plan.",
      },
      {
        id: "early-ownership",
        title: "Early Ownership",
        body: "Our team is small and our expertise is deep. You take on real responsibility early, across different domains and scales, with senior partners beside you.",
      },
      {
        id: "relationships-matter",
        title: "Relationships Matter",
        body: "We are interested in you beyond your work. Good relationships with colleagues and clients matter as much as excellence, and they make the work better.",
      },
    ],
  },
  process: {
    title: "Process",
    rows: [
      {
        title: "Steps",
        paragraphs: [
          "All applications are accepted only via our official listings and portals. Once your application is shortlisted, you speak with a member of our team about the requirements and your experience and goals. You learn how the role fits the firm.",
          "You meet a senior partner for a conversation about your craft and how you approach problems. We will tell you what each step assesses.",
          "You meet the colleagues you would work with. Together we explore how you work with others and what you want from the team.",
          "We share our decision and our reasons with you. If we make an offer, we walk you through the role and your first engagement.",
        ],
      },
      {
        title: "Timelines",
        paragraphs: [
          "We reply to relevant applications within five working days. The full process takes about three weeks, and you hear from us after each step.",
          "Please note that as much as we would like to reply to all applications, we simply can not due to the extremely high volume of applications per role.",
          "Pro-tip: Read the job description thoroughly. Ensure that your application is well thought through and relevant for the requirement and is formatted correctly with all the information our teams would need to qualify you.",
          "Post the initial screening and interviews we take about 12 working days for a background verification check. Typical hiring cycles can range from 2 weeks to 4 weeks.",
        ],
      },
      {
        title: "Expectations",
        paragraphs: [
          "We expect you to show your work openly. Come ready to talk about what you have built and where you want to grow.",
          "You can expect an update after each step. If we decide not to move forward, you receive honest feedback. Questions are welcome at any point.",
        ],
      },
    ],
  },
  aboutHll: {
    paragraphs: ABOUT_HLL_INTRO,
    image: "/assets/about/careers.webp",
  },
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
