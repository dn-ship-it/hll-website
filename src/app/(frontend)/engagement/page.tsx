import { MarketingShell } from "@/components/marketing/marketing-shell";

type Project = {
  name: string;
  year: string;
  placement: string;
  imageAlt: string;
};

const PROJECTS: Project[] = [
  {
    name: "Bajaj",
    year: "2021",
    placement: "engagement-project--bajaj",
    imageAlt: "Bajaj project",
  },
  {
    name: "KTM",
    year: "2021",
    placement: "engagement-project--ktm",
    imageAlt: "KTM project",
  },
  {
    name: "WeCare",
    year: "2021",
    placement: "engagement-project--wecare",
    imageAlt: "WeCare project",
  },
  {
    name: "Salt",
    year: "2021",
    placement: "engagement-project--salt-middle-left",
    imageAlt: "Salt project",
  },
  {
    name: "The Big Red Group",
    year: "2021",
    placement: "engagement-project--big-red-top",
    imageAlt: "The Big Red Group project",
  },
  {
    name: "Salt",
    year: "2021",
    placement: "engagement-project--salt-middle-right",
    imageAlt: "Salt project",
  },
  {
    name: "Zelish",
    year: "2021",
    placement: "engagement-project--zelish",
    imageAlt: "Zelish project",
  },
  {
    name: "Salt",
    year: "2021",
    placement: "engagement-project--salt-bottom-left",
    imageAlt: "Salt project",
  },
  {
    name: "The Big Red Group",
    year: "2021",
    placement: "engagement-project--big-red-bottom",
    imageAlt: "The Big Red Group project",
  },
  {
    name: "Salt",
    year: "2021",
    placement: "engagement-project--salt-bottom-right",
    imageAlt: "Salt project",
  },
];

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className={`engagement-project ${project.placement}`}>
      <div className="engagement-project__image" role="img" aria-label={project.imageAlt} />
      <div className="engagement-project__meta">
        <h2>{project.name}</h2>
        <p>{project.year}</p>
      </div>
    </article>
  );
}

export default function EngagementPage() {
  return (
    <MarketingShell showFooter={false}>
      <section className="engagement-page" aria-labelledby="engagement-title">
        <header className="engagement-page__heading">
          <h1 id="engagement-title" className="hll-display">
            Engagements/ Work
          </h1>
        </header>

        <div className="engagement-projects">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={`${project.name}-${index}`} project={project} />
          ))}
        </div>
      </section>
    </MarketingShell>
  );
}
