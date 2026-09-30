import { EngagementDetail } from "@/components/marketing/engagement/engagement-detail";

export default async function EngagementDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <EngagementDetail slug={slug} />;
}
