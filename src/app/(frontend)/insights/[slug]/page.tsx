import { InsightDetail } from "@/components/marketing/insights/insight-detail";

// Rendered on first visit, then served from the cache; CMS changes refresh it
// through revalidatePath.
export async function generateStaticParams() {
  return [];
}

export default async function InsightDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <InsightDetail slug={slug} />;
}
