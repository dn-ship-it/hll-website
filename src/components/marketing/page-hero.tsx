import { GradientRevealTextSlow } from "@/components/hll";
import { SERVICE_GUTTER } from "@/components/marketing/services/service-chrome";

/**
 * Figma Team / Careers hero: H1 at the left, a 36px lead from halfway across,
 * then the 1452 × 982 media window. `children` sits inside the window (the
 * Careers "See open roles" button).
 */
export function PageHero({
  title,
  lead,
  image,
  children,
}: {
  title: string;
  lead: string;
  image?: string | null;
  children?: React.ReactNode;
}) {
  return (
    <section className={`pt-[clamp(8rem,23.2vw,21.9rem)] ${SERVICE_GUTTER}`}>
      {/* The media sits 104px under the title or 32px under the lead,
          whichever is lower (Figma: 32px under a three-line lead). */}
      <div className="grid items-start gap-6 lg:grid-cols-[731fr_721fr] lg:gap-0">
        <div className="lg:pb-[72px]">
          <GradientRevealTextSlow
            as="h1"
            text={title}
            variant="about"
            className="block font-light text-[var(--hll-dark-grey)]"
            fontSize="clamp(2.5rem, 4.23vw, 4rem)"
            letterSpacing="0"
            lineHeight="1.16"
          />
        </div>
        <p className="text-[clamp(1.5rem,2.38vw,2.25rem)] leading-[1.16] text-[var(--hll-dark-grey)] lg:pt-5">{lead}</p>
      </div>
      <div
        className="relative mt-8 aspect-[1452/982] w-full overflow-hidden rounded-lg bg-[#D9D9D9]"
        style={image ? { background: `#D9D9D9 url(${image}) center / cover` } : undefined}
      >
        {children}
      </div>
    </section>
  );
}
