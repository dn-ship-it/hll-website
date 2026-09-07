import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CmsPage } from "@/components/cms/cms-page";
import { getPageBySlug, getSiteSettings } from "@/lib/payload/queries";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page) {
    return { title: "Not found" };
  }

  return {
    title: page.seo?.title ?? page.title,
    description: page.seo?.description ?? undefined,
  };
}

export default async function PageRoute({ params }: Props) {
  const { slug } = await params;
  const [page, settings] = await Promise.all([getPageBySlug(slug), getSiteSettings()]);

  if (!page) {
    notFound();
  }

  return <CmsPage page={page} settings={settings} />;
}
