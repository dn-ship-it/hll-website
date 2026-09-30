import { JdPage } from "@/components/marketing/careers/jd-page";

export default async function CareerDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <JdPage slug={slug} />;
}
