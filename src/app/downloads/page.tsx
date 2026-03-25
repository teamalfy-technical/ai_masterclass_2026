import Link from "next/link";
import { DownloadGrid } from "@/components/download-grid";

export default async function DownloadsPage({
  searchParams,
}: {
  searchParams: Promise<{ audience?: string }>;
}) {
  const params = await searchParams;
  const audience = params.audience === "course-owner" ? "course-owner" : "learner";

  return (
    <main className="downloads-page">
      <div className="page-intro">
        <p className="eyebrow">Ananseum Course Assets</p>
        <h1>{audience === "learner" ? "Learner Downloads" : "Course Owner Downloads"}</h1>
        <p>
          {audience === "learner"
            ? "Use these materials before, during, and after the session as the participant-facing course pack."
            : "Use these materials to run the day: delivery notes, pacing support, and demo guidance."}
        </p>
        <div className="support-links">
          <Link href="/">Return to the presentation</Link>
        </div>
      </div>
      <DownloadGrid audience={audience} />
    </main>
  );
}
