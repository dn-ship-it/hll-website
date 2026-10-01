import {
  getLatestPosts,
  getMarketingContent,
  getSiteSettings,
} from "@/lib/payload/queries";
import { resolveMediaUrl } from "@/lib/payload/media";
import { mapSiteNav } from "@/lib/payload/marketing-mappers";
import { SiteFooter } from "@/components/marketing/site-footer";
import { AiBubble } from "@/components/marketing/ai-bubble";
import { LineReveal } from "@/components/marketing/line-reveal";
import { PageIntro } from "@/components/marketing/page-intro";
import { loadEngagements } from "@/lib/payload/engagements";
import { buildSearchIndex } from "@/lib/site-search";
import { DEFAULT_NEWS, SiteHeader } from "@/components/marketing/site-header";
import type { NewsData } from "@/components/marketing/nav-menu";

export async function MarketingShell({
  children,
  showFooter = true,
  markTint,
  ctaVideo,
}: {
  children: React.ReactNode;
  showFooter?: boolean;
  markTint?: string;
  /** Background video for the footer's CTA band on this page. */
  ctaVideo?: string;
}) {
  let siteName = "Hyper Lychee Labs";
  let nav = undefined;
  let socialLinks = undefined;
  let services = undefined;
  let news: NewsData = DEFAULT_NEWS;

  try {
    const [settings, marketing] = await Promise.all([
      getSiteSettings(),
      getMarketingContent(),
    ]);
    const mapped = mapSiteNav(settings);
    siteName = mapped.siteName;
    nav = mapped.nav;
    socialLinks = mapped.socialLinks;

    const posts = await getLatestPosts();
    if (posts.length) {
      news = {
        image: resolveMediaUrl(posts[0].coverImage),
        items: posts.map((post) => ({ title: post.title })),
      };
    }

    if (marketing?.footerServices?.length) {
      services = marketing.footerServices.map((item) => item.label);
    }
  } catch {
    // use defaults
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <SiteHeader
        siteName={siteName}
        nav={nav}
        markTint={markTint}
        news={news}
      />
      <main className="overflow-x-clip" data-intro="pending">
        {children}
      </main>
      <PageIntro />
      <LineReveal />
      <AiBubble index={buildSearchIndex(await loadEngagements())} />
      <noscript>
        <style>{`main[data-intro] :has(h1) > * { visibility: visible !important; }`}</style>
      </noscript>
      {showFooter ? (
        // Nav and industry columns are fixed to the Figma footer; the CMS
        // footerLinks / footerIndustries fields don't carry its grouping.
        <SiteFooter
          siteName={siteName}
          socialLinks={socialLinks}
          services={services}
          ctaVideo={ctaVideo}
        />
      ) : null}
    </div>
  );
}
