import { getMarketingContent, getSiteSettings } from "@/lib/payload/queries";
import { mapSiteNav } from "@/lib/payload/marketing-mappers";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";

export async function MarketingShell({
  children,
  showFooter = true,
  compactHeader = false,
  markSrc,
  ctaVideo,
}: {
  children: React.ReactNode;
  showFooter?: boolean;
  compactHeader?: boolean;
  markSrc?: string;
  /** Background video for the footer's CTA band on this page. */
  ctaVideo?: string;
}) {
  let siteName = "Hyper Lychee Labs";
  let nav = undefined;
  let socialLinks = undefined;
  let services = undefined;

  try {
    const [settings, marketing] = await Promise.all([
      getSiteSettings(),
      getMarketingContent(),
    ]);
    const mapped = mapSiteNav(settings);
    siteName = mapped.siteName;
    nav = mapped.nav;
    socialLinks = mapped.socialLinks;

    if (marketing?.footerServices?.length) {
      services = marketing.footerServices.map((item) => item.label);
    }
  } catch {
    // use defaults
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <SiteHeader siteName={siteName} nav={nav} compact={compactHeader} markSrc={markSrc} />
      <main className="overflow-x-clip">{children}</main>
      {showFooter ? (
        // Nav and industry columns are fixed to the Figma footer; the CMS
        // footerLinks / footerIndustries fields don't carry its grouping.
        <SiteFooter siteName={siteName} socialLinks={socialLinks} services={services} ctaVideo={ctaVideo} />
      ) : null}
    </div>
  );
}
