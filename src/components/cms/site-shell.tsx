import Link from "next/link";

import type { SiteSetting } from "@/payload-types";

export function SiteShell({
  settings,
  children,
}: {
  settings: SiteSetting | null;
  children: React.ReactNode;
}) {
  const siteName = settings?.siteName ?? "HLL Cornerstone";

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0c0c0c]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
          <Link href="/" className="text-sm font-semibold tracking-wide text-white">
            {siteName}
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            {settings?.headerNav?.map((item) => (
              <Link
                key={item.id ?? item.href}
                href={item.href}
                className="text-sm text-white/70 transition hover:text-white"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/admin"
              className="text-sm text-white/40 transition hover:text-white/70"
            >
              CMS
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-white/10 py-12">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 md:flex-row md:justify-between">
          <p className="text-sm text-white/40">{siteName}</p>
          <div className="flex flex-wrap gap-4">
            {settings?.footerLinks?.map((link) => (
              <Link
                key={link.id ?? link.href}
                href={link.href}
                className="text-sm text-white/50 hover:text-white/80"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
