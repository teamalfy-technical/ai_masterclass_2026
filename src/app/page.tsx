import { PresentationShell } from "@/components/presentation-shell";
import { getModules, getStorySections } from "@/lib/course-parser";

export default function HomePage() {
  const modules = getModules();
  const storySections = getStorySections(modules);
  
  return <PresentationShell initialModules={modules} initialStorySections={storySections} />;
}
