import type { Metadata } from "next";
import { Geist, Geist_Mono, Sometype_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const sometypeMono = Sometype_Mono({ variable: "--font-sometype-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hyper Lychee Labs",
  description: "Future-facing initiatives for accelerated advancement.",
};

/**
 * The desktop design is a 1512px-wide Figma frame. From 1280px up, the page is
 * laid out at that width and zoomed to fit the screen, so spacing, type and
 * media keep the Figma proportions on every desktop size instead of drifting
 * apart. --vw / --vh stand in for the viewport units (which CSS zoom would
 * otherwise scale a second time). Runs before first paint, then on resize.
 */
const DESIGN_SCALE = `(() => {
  const root = document.documentElement;
  const apply = () => {
    const w = window.innerWidth;
    const zoom = w >= 1280 ? Math.min(w / 1512, 2) : 1;
    root.style.zoom = zoom === 1 ? "" : String(zoom);
    root.style.setProperty("--zoom", String(zoom));
    root.style.setProperty("--vw", zoom === 1 ? "1vw" : (1512 / 100) + "px");
    root.style.setProperty("--vh", zoom === 1 ? "1vh" : (window.innerHeight / zoom / 100) + "px");
  };
  apply();
  window.addEventListener("resize", apply);
})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: DESIGN_SCALE }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${sometypeMono.variable} min-h-screen bg-white antialiased text-black`}
      >
        {children}
      </body>
    </html>
  );
}
