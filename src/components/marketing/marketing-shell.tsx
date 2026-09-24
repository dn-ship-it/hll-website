import { getMarketingContent, getSiteSettings } from "@/lib/payload/queries";
import { mapSiteNav } from "@/lib/payload/marketing-mappers";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";

export async function MarketingShell({
  children,
  showFooter = true,
}: {
  children: React.ReactNode;
  showFooter?: boolean;
}) {
  let siteName = "Hyper Lychee Labs";
  let nav = undefined;
  let footerLinks = undefined;
  let socialLinks = undefined;
  let services = undefined;
  let industries = undefined;

  try {
    const [settings, marketing] = await Promise.all([
      getSiteSettings(),
      getMarketingContent(),
    ]);
    const mapped = mapSiteNav(settings);
    siteName = mapped.siteName;
    nav = mapped.nav;
    footerLinks = mapped.footerLinks.length ? mapped.footerLinks : undefined;
    socialLinks = mapped.socialLinks;

    if (marketing?.footerServices?.length) {
      services = marketing.footerServices.map((item) => item.label);
    }
    if (marketing?.footerIndustries?.length) {
      industries = marketing.footerIndustries.map((item) => item.label);
    }
  } catch {
    // use defaults
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <SiteHeader siteName={siteName} nav={nav} />
      <main className="overflow-x-clip">{children}</main>
      {showFooter ? (
        <SiteFooter
          siteName={siteName}
          footerLinks={footerLinks}
          socialLinks={socialLinks}
          services={services}
          industries={industries}
        />
      ) : null}
    </div>
  );
}
