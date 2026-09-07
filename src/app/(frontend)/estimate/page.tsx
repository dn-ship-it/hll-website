import { EstimateDashboard } from "@/components/estimate-dashboard";
import { MarketingShell } from "@/components/marketing/marketing-shell";

export default function EstimatePage() {
  return (
    <MarketingShell>
      <div className="border-b border-white/8 bg-white/[0.02] px-6 py-3 text-center text-sm text-white/55">
        Planning dashboard from the discovery phase — UI routes now live at{" "}
        <code className="rounded bg-black/30 px-1.5 py-0.5">/</code>,{" "}
        <code className="rounded bg-black/30 px-1.5 py-0.5">/services</code>, etc.
      </div>
      <EstimateDashboard />
    </MarketingShell>
  );
}
