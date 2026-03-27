"use client";

import { GlossaryProvider } from "@/components/keyword-tooltip";

export function Providers({ children }: { children: React.ReactNode }) {
  return <GlossaryProvider>{children}</GlossaryProvider>;
}
