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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${sometypeMono.variable} min-h-screen bg-white antialiased text-black`}
      >
        {children}
      </body>
    </html>
  );
}
