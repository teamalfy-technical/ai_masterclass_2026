import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  title: "Ananseum | Modern AI in Practice",
  description:
    "An interactive Ananseum course website for Modern AI in Practice: Foundations, Codex, and OpenClaw.",
  openGraph: {
    title: "Ananseum | Modern AI in Practice",
    description: "An interactive Ananseum course website for Modern AI in Practice: Foundations, Codex, and OpenClaw.",
    type: "website",
    images: [
      {
        url: "/brand/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ananseum Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ananseum | Modern AI in Practice",
    description: "An interactive Ananseum course website for Modern AI in Practice: Foundations, Codex, and OpenClaw.",
    images: ["/brand/og-image.png"],
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body><Providers>{children}</Providers></body>
    </html>
  );
}

