import { notFound } from "next/navigation";

import { IndustryPage } from "@/components/marketing/industries/industry-page";
import { getIndustryPage } from "@/data/industries";

// Rendered on first visit, then served from the cache (it rendered on every
// visit before, ~0.6s). CMS changes refresh it through revalidatePath.
export async function generateStaticParams() {
  return [];
}

export default async function IndustryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const content = getIndustryPage(slug);
  if (!content) notFound();
  return <IndustryPage content={content} />;
}
