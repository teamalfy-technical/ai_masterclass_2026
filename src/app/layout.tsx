import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ananseum | Modern AI in Practice",
  description:
    "An interactive Ananseum course website for Modern AI in Practice: Foundations, Codex, and OpenClaw.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
