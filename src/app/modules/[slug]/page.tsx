import { notFound } from "next/navigation";
import { ModuleDetail } from "@/components/module-detail";
import { getModules } from "@/lib/course-parser";

export async function generateStaticParams() {
  const modules = getModules();
  return modules.map((module) => ({
    slug: module.slug,
  }));
}

export default async function ModulePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const modules = getModules();
  const courseModule = modules.find(m => m.slug === slug);

  if (!courseModule) {
    notFound();
  }

  return (
    <main className="module-page">
      <ModuleDetail module={courseModule} />
    </main>
  );
}
