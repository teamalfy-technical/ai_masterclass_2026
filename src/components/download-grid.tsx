import { statSync } from "node:fs";
import path from "node:path";
import Link from "next/link";
import { getDownloadsForAudience } from "@/lib/course-data";

const rootDir = process.cwd();

const downloadNotes: Record<
  string,
  {
    eyebrow: string;
    highlights: string[];
  }
> = {
  "course-guide": {
    eyebrow: "Orientation",
    highlights: ["2 days", "7 chapters", "outcomes and pacing"],
  },
  "module-summaries": {
    eyebrow: "Review set",
    highlights: ["7 chapter summaries", "key ideas", "post-session reference"],
  },
  "exercise-workbook": {
    eyebrow: "Workshop pack",
    highlights: ["7 activities", "success criteria", "debrief prompts"],
  },
  "pilot-blueprint": {
    eyebrow: "Capstone",
    highlights: ["fillable PDF", "24 fields", "30-60-90 next steps"],
  },
  "resource-sheet": {
    eyebrow: "Follow-up",
    highlights: ["official docs", "implementation artifacts", "30-day path"],
  },
  "facilitator-notes": {
    eyebrow: "Delivery support",
    highlights: ["facilitation stance", "governance thread", "fallback mode"],
  },
  "delivery-runbook": {
    eyebrow: "Pacing",
    highlights: ["day-by-day timing", "time protections", "required outputs"],
  },
  "module-delivery-notes": {
    eyebrow: "Teaching cues",
    highlights: ["module emphasis", "watch-fors", "expected outputs"],
  },
  "demo-guide": {
    eyebrow: "Live walkthroughs",
    highlights: ["demo goals", "acceptance criteria", "debrief prompts"],
  },
};

function formatBytes(bytes: number) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }
  const kb = bytes / 1024;
  if (kb < 1024) {
    return `${kb.toFixed(1)} KB`;
  }
  return `${(kb / 1024).toFixed(1)} MB`;
}

function fileSizeFor(downloadPath: string) {
  try {
    const filePath = path.join(rootDir, "public", downloadPath.replace(/^\/downloads\//, "downloads/"));
    return formatBytes(statSync(filePath).size);
  } catch {
    return null;
  }
}

export function DownloadGrid({
  audience,
}: {
  audience: "learner" | "course-owner";
}) {
  const downloads = getDownloadsForAudience(audience);
  const grouped = Object.groupBy(downloads, (download) => download.category);

  return (
    <div className="download-groups-redesign">
      <div className="download-switch">
        <Link
          href="/downloads"
          className={audience === "learner" ? "download-switch-link active" : "download-switch-link"}
        >
          Learner pack
        </Link>
        <Link
          href="/downloads?audience=course-owner"
          className={
            audience === "course-owner"
              ? "download-switch-link active"
              : "download-switch-link"
          }
        >
          Course owner pack
        </Link>
      </div>
      {Object.entries(grouped).map(([category, items]) => (
        <section key={category} className="download-section">
          <div className="module-header">
            <p className="eyebrow">{audience === "learner" ? "Participant assets" : "Facilitator assets"}</p>
            <h2>{category}</h2>
          </div>
          <div className="downloads-grid">
            {items?.map((download) => (
              <a key={download.id} href={download.file} className="resource-card" download>
                <span className="resource-badge">
                  {downloadNotes[download.id]?.eyebrow ?? download.category}
                </span>
                <strong>{download.title}</strong>
                <p>{download.description}</p>
                <div className="resource-meta-row">
                  <span>{download.type}</span>
                  {fileSizeFor(download.file) ? <span>{fileSizeFor(download.file)}</span> : null}
                </div>
                <ul className="resource-highlights">
                  {(downloadNotes[download.id]?.highlights ?? []).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <span className="download-action">Download</span>
              </a>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
