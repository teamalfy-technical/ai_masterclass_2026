import Link from "next/link";
import { getDownloadsForAudience } from "@/lib/course-data";

export function DownloadGrid({
  audience,
}: {
  audience: "learner" | "course-owner";
}) {
  const downloads = getDownloadsForAudience(audience);
  const grouped = Object.groupBy(downloads, (download) => download.category);

  return (
    <div className="download-groups">
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
        <section key={category} className="download-group">
          <div>
            <p className="eyebrow">{category}</p>
            <h2>{category}</h2>
          </div>
          <div className="download-list">
            {items?.map((download) => (
              <a key={download.id} href={download.file} className="download-card" download>
                <strong>{download.title}</strong>
                <p>{download.description}</p>
                <span>{download.type}</span>
              </a>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
