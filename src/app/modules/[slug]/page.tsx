import { notFound } from "next/navigation";
import { ModuleDetail } from "@/components/module-detail";
import { modulesBySlug } from "@/lib/course-data";

export default async function ModulePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const courseModule = modulesBySlug[slug];

  if (!courseModule) {
    notFound();
  }

  return (
    <main className="module-page">
      <ModuleDetail module={courseModule} />
    </main>
  );
}
