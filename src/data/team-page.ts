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
    /** The 1452 × 982 picture under the intro. */
    image?: string | null;
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
      "We are as good as our people. As our ecosystem expands, so does our momentum. Our strength comes from our people.",
    // Hannan's "team grid picture.zip" (canvas, 25 Oct).
    image: "/assets/team/team-grid.webp",
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
  // Hannan's canvas (25 Oct), /team. Photos to come from Rima.
  members: [
    {
      id: "hannan-hakim",
      name: "Hannan Hakim",
      role: "Founding Partner / Innovation Consulting",
      bio: "“Our team brings together proficient, discerning people who always pushing the boundaries of what's next. We work across domains and at every scale, so we meet each challenge with the right expertise. We understand where our clients are heading, and we pair human ingenuity with experience to help them get there. Each of us leads with a clear sense of our own values. Relationships matter to us as much as excellence.”",
      department: "leadership",
      featured: true,
    },
    {
      id: "arjun-pathni",
      name: "Arjun Pathni",
      role: "Senior Partner / Group Operations & People",
      bio: "Ex-UEA (UK)",
      department: "leadership",
    },
    {
      id: "rima-sarkar",
      name: "Rima Sarkar",
      role: "Head Of Growth / New Business Lines",
      bio: "Ex-NIT",
      department: "leadership",
    },
    {
      id: "nilesh-nalnikar",
      name: "Nilesh Nalnikar",
      role: "Senior Partner / Data & Analytics",
      bio: "Ex-IIT · Ex-Principal Financial · Ex-JP Morgan · Ex-Citi Bank",
      department: "leadership",
    },
    {
      id: "advaith-mohan",
      name: "Advaith Mohan",
      role: "Partner / AI & Ontology",
      bio: "Ex-IIT · Ex-FlipKart",
      department: "leadership",
    },
    {
      id: "tej-haldule",
      name: "Tej Haldule",
      role: "Partner / People & Policy",
      bio: "Ex-FC",
      department: "leadership",
    },
    {
      id: "santosh-maruwada",
      name: "Santosh Maruwada",
      role: "Partner / People & Policy",
      bio: "Ex-SMU · Ex-Mavim",
      department: "leadership",
    },
    {
      id: "spoorthi-v",
      name: "Spoorthi V",
      role: "Associate Partner / People & Policy",
      bio: "",
      department: "leadership",
    },
    {
      id: "chinmay-chandgude",
      name: "Chinmay Chandgude",
      role: "Partner / Applications",
      bio: "Ex-MIT",
      department: "leadership",
    },
    {
      id: "swapnil-h",
      name: "Swapnil H",
      role: "Partner / Cloud Technologies",
      bio: "Ex-MIT",
      department: "leadership",
    },
    {
      id: "lalith-kumar",
      name: "Lalith Kumar",
      role: "Lead Architect / Enterprise Architecture Insurance & Healthcare",
      bio: "Ex-MIT",
      department: "leadership",
    },
    {
      id: "anjali-darbha",
      name: "Anjali Darbha",
      role: "Design Lead / Experience Design & Applications",
      bio: "",
      department: "leadership",
    },
  ] satisfies TeamMember[],
};

