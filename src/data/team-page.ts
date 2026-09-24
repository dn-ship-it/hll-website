export type TeamDepartment = "leadership" | "engineering" | "design" | "operations";

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  department: TeamDepartment;
  featured?: boolean;
  photoUrl?: string | null;
};

export type TeamPageContent = {
  breadcrumb: readonly string[];
  accentColor: string;
  hero: {
    eyebrow: string;
    headline: string;
    description: string;
  };
  grid: {
    eyebrow: string;
    title: string;
    filters: readonly { id: string; label: string }[];
  };
  join: {
    title: string;
    description: string;
    ctaLabel: string;
    ctaHref: string;
  };
  members: TeamMember[];
};

export const teamPageContent: TeamPageContent = {
  breadcrumb: ["About", "Team"],
  accentColor: "#9AB4D3",
  hero: {
    eyebrow: "Team",
    headline: "Team",
    description:
      "Senior talent deployed across the stack with a knowledge graph window showing what customers see.",
  },
  grid: {
    eyebrow: "Named experts",
    title: "Who we are",
    filters: [
      { id: "all", label: "All" },
      { id: "leadership", label: "Leadership" },
      { id: "engineering", label: "Engineering" },
      { id: "design", label: "Design" },
      { id: "operations", label: "Operations" },
    ],
  },
  join: {
    title: "Join the mission",
    description: "We're always looking for engineers, designers, and strategists who care about craft and client outcomes.",
    ctaLabel: "View open roles",
    ctaHref: "/careers",
  },
  members: [
    {
      id: "1",
      name: "Hannan Hakim",
      role: "Chief Executive Officer",
      bio: "15+ yrs of experience · Previously at McKinsey, SNL",
      department: "leadership",
      featured: true,
    },
    {
      id: "2",
      name: "Hannan Hakim",
      role: "VP Engineering",
      bio: "Platform & data engineering · Ex-Google · Ph.D Stanford CS",
      department: "engineering",
      featured: true,
    },
    {
      id: "3",
      name: "Hannan Hakim",
      role: "Design Director",
      bio: "Experience design lead · Service design & product UX",
      department: "design",
    },
    {
      id: "4",
      name: "Hannan Hakim",
      role: "Delivery Principal",
      bio: "Enterprise programs · Agile delivery & stakeholder alignment",
      department: "operations",
    },
    {
      id: "5",
      name: "Hannan Hakim",
      role: "Senior Data Engineer",
      bio: "Lakehouse & pipeline architecture · AWS, Spark, dbt",
      department: "engineering",
    },
    {
      id: "6",
      name: "Hannan Hakim",
      role: "Product Designer",
      bio: "Design systems · Research-led product discovery",
      department: "design",
    },
    {
      id: "7",
      name: "Hannan Hakim",
      role: "AI / ML Engineer",
      bio: "Knowledge graphs · LLM integration · Production ML",
      department: "engineering",
    },
    {
      id: "8",
      name: "Hannan Hakim",
      role: "Program Manager",
      bio: "Cross-functional delivery · Healthcare & finserv programs",
      department: "operations",
    },
  ] satisfies TeamMember[],
};

