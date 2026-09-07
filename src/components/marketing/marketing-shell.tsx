import type { NavVariant } from "@/components/hll";
import { Shader } from "@/components/hll";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";

export function MarketingShell({
  children,
  activeVariant,
  shaderVariant,
}: {
  children: React.ReactNode;
  activeVariant?: NavVariant;
  shaderVariant?: NavVariant;
}) {
  return (
    <div className="relative min-h-screen bg-[#0c0c0c] text-white">
      {shaderVariant ? <Shader variant={shaderVariant} intensity={55} /> : null}
      <SiteHeader activeVariant={activeVariant} />
      <main className="overflow-x-clip">{children}</main>
      <SiteFooter />
    </div>
  );
}
