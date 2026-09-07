import type { Metadata } from "next";

import { CmsPage } from "@/components/cms/cms-page";
import { EstimateDashboard } from "@/components/estimate-dashboard";
import { getPageBySlug, getSiteSettings } from "@/lib/payload/queries";

export const metadata: Metadata = {
  title: "HLL × Cornerstone",
  description: "HLL Cornerstone India marketing site powered by Payload CMS.",
};

export default async function Home() {
  const [page, settings] = await Promise.all([
    getPageBySlug("home"),
    getSiteSettings(),
  ]);

  if (page) {
    return <CmsPage page={page} settings={settings} />;
  }

  return (
    <>
      <div className="border-b border-emerald-500/20 bg-emerald-500/10 px-6 py-3 text-center text-sm text-emerald-100">
        Payload CMS is ready at{" "}
        <a href="/admin" className="underline underline-offset-2">
          /admin
        </a>
        . Publish a page with slug{" "}
        <code className="rounded bg-black/30 px-1.5 py-0.5">home</code> to replace this
        estimate view.
      </div>
      <EstimateDashboard />
    </>
  );
}
