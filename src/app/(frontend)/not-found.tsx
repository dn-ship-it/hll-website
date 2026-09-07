import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <p className="text-sm uppercase tracking-widest text-white/40">404</p>
      <h1 className="mt-4 text-3xl font-semibold text-white">Page not found</h1>
      <p className="mt-3 max-w-md text-white/60">
        This slug is not published in Payload yet. Create it in the admin or check the URL.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full border border-white/20 px-6 py-2 text-sm text-white hover:bg-white/5"
      >
        Back home
      </Link>
    </div>
  );
}
