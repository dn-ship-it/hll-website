import { JdPage } from "@/components/marketing/careers/jd-page";

// Rendered on first visit, then served from the cache (it rendered on every
// visit before, ~0.6s). CMS changes refresh it through revalidatePath.
export async function generateStaticParams() {
  return [];
}

export default async function CareerDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <JdPage slug={slug} />;
}
