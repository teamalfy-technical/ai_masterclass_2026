import Link from "next/link";
import { getDownloadById } from "@/lib/course-data";
import type { Module } from "@/types/course";

export function ModuleDetail({ module }: { module: Module }) {
  return (
    <article className="module-detail">
      <header className="detail-hero">
        <p className="eyebrow">
          Day {module.day} / Module {module.order} / {module.duration}
        </p>
        <h1>{module.title}</h1>
        <p>{module.objective}</p>
        <div className="support-links">
          <Link href={`/#${module.slug}`}>Back to story mode</Link>
          <Link href="/downloads">Open downloads</Link>
        </div>
      </header>

      <section className="detail-grid">
        <div className="detail-block">
          <h2>What this section establishes</h2>
          <p>{module.deliveryLead ?? module.objective}</p>
        </div>
        <div className="detail-block">
          <h2>Core idea</h2>
          <ul>
            {module.coreIdea.map((idea, idx) => (
              <li key={idx}>{idea}</li>
            ))}
          </ul>
        </div>
        <div className="detail-block">
          <h2>Key points to leave with</h2>
          <ul>
            {module.talkingPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
        {module.exercise ? (
          <div className="detail-block">
            <h2>Workshop prompt</h2>
            <p>{module.exercise.title}</p>
            <p>{module.exercise.prompt}</p>
            <p className="muted">Expected output: {module.exercise.output}</p>
          </div>
        ) : null}
        <div className="detail-block">
          <h2>Why it matters</h2>
          <p>{module.takeaway}</p>
        </div>
      </section>

      {module.demo ? (
        <section className="detail-block">
          <h2>Demo walkthrough</h2>
          <p>{module.demo.title}</p>
          <ol>
            {module.demo.flow.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>
      ) : null}

      <section className="detail-block">
        <h2>Related downloads</h2>
        <div className="support-links">
          {module.downloads.map((downloadId) => {
            const download = getDownloadById(downloadId);
            if (!download || download.audience !== "learner") {
              return null;
            }
            return (
              <a key={download.id} href={download.file} download>
                {download.title}
              </a>
            );
          })}
        </div>
      </section>
    </article>
  );
}
