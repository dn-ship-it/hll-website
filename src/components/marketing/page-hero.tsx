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
    <section className={`pt-[311px] lg:pt-[clamp(8rem,calc(23.2*var(--vw)),21.9rem)] ${SERVICE_GUTTER}`}>
      {/* The media sits 104px under the title or 32px under the lead,
          whichever is lower (Figma: 32px under a three-line lead). Mobile:
          title at y 385, the lead 54px under it, a 386 × 244 window. */}
      <div className="grid items-start gap-[54px] lg:grid-cols-[731fr_721fr] lg:gap-0">
        <div className="lg:pb-[72px]">
          <GradientRevealTextSlow
            as="h1"
            text={title}
            variant="about"
            className="block font-light text-[var(--hll-dark-grey)]"
            fontSize="clamp(30px, calc(4.23*var(--vw)), 4rem)"
            letterSpacing="0"
            lineHeight="1.16"
          />
        </div>
        <p className="max-w-[344px] text-[24px] leading-[1.16] text-[var(--hll-dark-grey)] lg:max-w-none lg:pt-5 lg:text-[clamp(1.5rem,calc(2.38*var(--vw)),2.25rem)]">{lead}</p>
      </div>
      <div
        className="relative -mx-3 mt-8 aspect-[386/244] w-[calc(100%+24px)] overflow-hidden rounded-[6px] bg-[#D9D9D9] lg:mx-0 lg:aspect-[1452/982] lg:w-full lg:rounded-lg"
        style={image ? { background: `#D9D9D9 url(${image}) center / cover` } : undefined}
      >
        {children}
      </div>
    </section>
  );
}
