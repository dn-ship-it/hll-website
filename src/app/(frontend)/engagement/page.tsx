import { MarketingShell } from "@/components/marketing/marketing-shell";
import { MediaPlaceholder } from "@/components/marketing/home/primitives";

type Project = {
  name: string;
  year?: string;
  layout: string;
  imageLabel: string;
};

const PROJECTS: Project[] = [
  {
    name: "Bajaj",
    year: "2021",
    layout: "engagement-project--bajaj",
    imageLabel: "Bajaj project image",
  },
  {
    name: "KTM",
    layout: "engagement-project--ktm",
    imageLabel: "KTM project image",
  },
  {
    name: "The Big Red Group",
    layout: "engagement-project--big-red-top",
    imageLabel: "The Big Red Group project image",
  },
  {
    name: "WeCare",
    layout: "engagement-project--wecare",
    imageLabel: "WeCare project image",
  },
  {
    name: "Zelish",
    layout: "engagement-project--zelish",
    imageLabel: "Zelish project image",
  },
  {
    name: "Salt",
    layout: "engagement-project--salt",
    imageLabel: "Salt project image",
  },
  {
    name: "The Big Red Group",
    layout: "engagement-project--big-red-bottom",
    imageLabel: "The Big Red Group project image",
  },
];

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className={`engagement-project ${project.layout}`}>
      <MediaPlaceholder
        className="engagement-project__image"
        label={project.imageLabel}
      />
      <div className="engagement-project__meta">
        <div className="flex items-center gap-2">
          <h2>{project.name}</h2>
          {project.year ? <p>{project.year}</p> : null}
        </div>
      </div>
    </article>
  );
}

export default function EngagementPage() {
  return (
    <MarketingShell showFooter={false}>
      <section className="engagement-page" aria-labelledby="engagement-title">
        <header className="engagement-page__heading">
          <p className="engagement-page__eyebrow">Selected work</p>
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
