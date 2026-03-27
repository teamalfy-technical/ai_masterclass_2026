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
    <main className="course-layout downloads-layout">
      <aside className="toc-sidebar">
        <p className="eyebrow">Downloads</p>
        <a href="#overview" className="toc-link active">
          Overview
        </a>
        <a href="#pack" className="toc-link">
          {audience === "learner" ? "Learner pack" : "Course owner pack"}
        </a>
        <a href="#switch" className="toc-link">
          Switch pack
        </a>
      </aside>

      <div className="course-main">
        <section id="overview" className="section-anchor">
          <div className="hero-wrapper">
            <div className="hero-copy">
              <p className="eyebrow">Ananseum Course Assets</p>
              <h1>{audience === "learner" ? "Learner Pack PDFs" : "Course Owner Downloads"}</h1>
              <p className="subtitle">
                {audience === "learner"
                  ? "These are the participant-facing materials for the current course structure: a refreshed course guide, seven-chapter summary set, workshop workbook, fillable pilot blueprint, and resource sheet."
                  : "These files support delivery on the day: pacing, facilitation cues, governance reminders, and live demo guidance."}
              </p>
              <div className="support-links">
                <Link href="/" className="btn-secondary">
                  Return to the presentation
                </Link>
                {audience === "learner" ? (
                  <Link href="/downloads?audience=course-owner" className="btn-outline">
                    Open course-owner pack
                  </Link>
                ) : (
                  <Link href="/downloads" className="btn-outline">
                    Back to learner pack
                  </Link>
                )}
              </div>
            </div>

            <div className="facts-card">
              {audience === "learner" ? (
                <>
                  <p>
                    <strong>5 learner PDFs.</strong> Built from the refreshed learner source
                    files and published as polished downloads.
                  </p>
                  <p>
                    <strong>7 core chapters.</strong> The summary pack now follows the latest
                    course structure rather than the earlier scaffold.
                  </p>
                  <p>
                    <strong>24 fillable fields.</strong> The pilot blueprint PDF is interactive
                    and ready for live completion during the capstone.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    <strong>4 facilitator files.</strong> Focused on pacing, delivery support,
                    demo execution, and module emphasis.
                  </p>
                  <p>
                    <strong>Delivery-only by design.</strong> This pack is for the course owner
                    or facilitator, not the default learner handout route.
                  </p>
                  <p>
                    <strong>Built for the live room.</strong> Use it to protect timing, keep the
                    governance thread visible, and keep demos on track.
                  </p>
                </>
              )}
            </div>
          </div>
        </section>

        <section id="pack" className="section-anchor">
          <div className="module-grid-new">
            {audience === "learner" ? (
              <>
                <div className="module-card-clean">
                  <h3>What learners get</h3>
                  <p>
                    The learner pack is designed to carry the session before, during, and after
                    delivery. It starts with orientation, supports the live exercises, and ends
                    with the fillable pilot blueprint and follow-up references.
                  </p>
                </div>
                <div className="module-card-clean">
                  <h3>What changed</h3>
                  <p>
                    This route now reflects the current PDF-first learner flow. The emphasis is on
                    downloadable, polished handouts rather than the earlier markdown scaffold.
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="module-card-clean">
                  <h3>What facilitators get</h3>
                  <p>
                    The owner pack supports the live run of the course: pacing, transitions,
                    module emphasis, and the demo sequence that anchors the room.
                  </p>
                </div>
                <div className="module-card-clean">
                  <h3>How to use it</h3>
                  <p>
                    Keep this route for the delivery team. Learners should generally stay on the
                    participant pack unless you intentionally expose facilitator material.
                  </p>
                </div>
              </>
            )}
          </div>

          <DownloadGrid audience={audience} />
        </section>

        <section id="switch" className="section-anchor">
          <div className="interstitial-panel">
            <p className="eyebrow">Route intent</p>
            <h2>
              {audience === "learner"
                ? "Learner first, facilitator second"
                : "Facilitator tools, not learner handouts"}
            </h2>
            <p className="subtitle">
              {audience === "learner"
                ? "The default route now centers the participant-facing PDFs. Course-owner materials still exist, but they sit behind a deliberate switch."
                : "This view is intentionally narrower and operational. It exists to support delivery, not to double as the learner handout page."}
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
