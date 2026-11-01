import { EngagementDetail } from "@/components/marketing/engagement/engagement-detail";

// Rendered on first visit, then served from the cache (it rendered on every
// visit before, ~0.6s). CMS changes refresh it through revalidatePath.
export async function generateStaticParams() {
  return [];
}

export default async function EngagementDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <EngagementDetail slug={slug} />;
}
