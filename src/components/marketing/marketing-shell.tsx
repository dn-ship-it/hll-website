import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";

export function MarketingShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-black">
      <SiteHeader />
      <main className="overflow-x-clip">{children}</main>
      <SiteFooter />
    </div>
  );
}
