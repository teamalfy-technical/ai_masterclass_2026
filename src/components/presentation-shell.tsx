"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { brandConfig, getDownloadById, getDownloadsForAudience, chapterStories, codexSubtopics, llmSubtopics, openclawSubtopics } from "@/lib/course-data";
import { learnerContentMap, learnerInterstitials, LearnerTabUI } from "@/lib/learner-content";
import type { Module, StorySection } from "@/types/course";
import { KeywordRow } from "@/components/keyword-tooltip";

// Define the CoachState type
type CoachState = {
  status: "idle" | "loading" | "ready" | "error";
  question: string;
  answer?: string;
  recommendedSectionId?: string;
  recommendedModuleSlug?: string;
  relatedDownloads: string[];
  quiz?: {
    question: string;
    options: string[];
    answer: string;
  };
};

function CoachPanel({ onJump }: { onJump: (sectionId: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState<CoachState>({
    status: "idle",
    question: "",
    relatedDownloads: [],
  });

  async function submitQuestion() {
    const question = state.question.trim();
    if (!question) return;
    setState((current) => ({ ...current, status: "loading" }));

    try {
      const response = await fetch("/api/coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      if (!response.ok) throw new Error("Request failed.");

      const payload = (await response.json()) as Omit<CoachState, "status" | "question">;
      setState((current) => ({
        ...current,
        status: "ready",
        ...payload,
      }));
    } catch {
      setState((current) => ({
        ...current,
        status: "error",
        answer: "The quiz coach could not answer right now. Use the section navigation or downloads hub as a fallback.",
      }));
    }
  }

  return (
    <>
      {!isOpen && (
        <button className="quick-coach-trigger" onClick={() => setIsOpen(true)}>
          AI Quiz Coach
        </button>
      )}
      <aside className={`coach-floating ${isOpen ? "" : "hidden"}`}>
        <div className="coach-head">
          <div>
            <span className="eyebrow" style={{ color: "var(--accent)" }}>AI Quiz Coach</span>
            <h3>Ask about a module or test understanding</h3>
          </div>
          <button className="coach-toggle" onClick={() => setIsOpen(false)}>✕</button>
        </div>
        <div className="coach-body">
          <label className="coach-label" htmlFor="coach-question">
            Ask a course question
          </label>
          <textarea
            id="coach-question"
            value={state.question}
            onChange={(event) =>
              setState((current) => ({ ...current, question: event.target.value }))
            }
            placeholder="Example: Where should I start if I want to understand Codex approvals?"
          />
          <button
            type="button"
            className="btn-primary"
            onClick={() => { void submitQuestion(); }}
            disabled={state.status === "loading"}
          >
            {state.status === "loading" ? "Thinking..." : "Ask coach"}
          </button>

          {state.answer && (
            <div className="coach-response">
              <p>{state.answer}</p>
              {state.recommendedSectionId && (
                <button
                  type="button"
                  className="btn-secondary"
                  style={{ fontSize: "0.85rem", padding: "0.4rem 0.8rem", marginTop: "0.5rem" }}
                  onClick={() => onJump(state.recommendedSectionId!)}
                >
                  Jump to recommended section
                </button>
              )}
              {state.quiz && (
                <div className="quiz-card">
                  <span className="eyebrow">Quick check</span>
                  <p>{state.quiz.question}</p>
                  <ul>
                    {state.quiz.options.map((option) => (
                      <li key={option}>{option}</li>
                    ))}
                  </ul>
                  <p className="muted" style={{ margin: 0, fontSize: "0.9rem" }}>
                    Suggested answer: {state.quiz.answer}
                  </p>
                </div>
              )}
              {state.relatedDownloads.length > 0 && (
                <div style={{ marginTop: "1rem" }}>
                  <span className="eyebrow">Related assets</span>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    {state.relatedDownloads.map((id) => {
                      const d = getDownloadById(id);
                      if (!d) return null;
                      return <a key={d.id} href={d.file} download style={{ color: "var(--accent)", fontWeight: 600, fontSize: "0.9rem" }}>{d.title}</a>;
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

function ChapterStoryPanel({ moduleSlug, presenterMode }: { moduleSlug: string; presenterMode: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const story = chapterStories[moduleSlug];
  if (!story) return null;

  return (
    <div className="story-wrapper">
      <button
        className={`story-trigger-btn ${isOpen ? "active" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="story-trigger-icon">📖</span>
        <span>Chapter Story{isOpen ? ": " + story.title : ""}</span>
        <span className="story-trigger-chevron">{isOpen ? "▲" : "▼"}</span>
      </button>

      {isOpen && (
        <div className={`story-panel ${presenterMode ? "story-panel-tutor" : "story-panel-learner"}`}>
          <div className="story-image-col">
            <Image
              src={story.image}
              alt={story.title}
              width={600}
              height={340}
              className="story-image"
              style={{ objectFit: "cover", borderRadius: "var(--radius-md)" }}
            />
          </div>
          <div className="story-text-col">
            <h3 className="story-title">{story.title}</h3>
            {presenterMode ? (
              <>
                <p className="story-narrative">{story.storyText}</p>
                <div className="story-teaching-block">
                  <span className="eyebrow">Teaching Point</span>
                  <p>{story.teachingPoint}</p>
                </div>
                <div className="story-bridge-block">
                  <span className="eyebrow">Bridge Line</span>
                  <p><em>&ldquo;{story.bridgeLine}&rdquo;</em></p>
                </div>
              </>
            ) : (
              <p className="story-learner-tagline">A story to set the scene for this chapter&hellip;</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const CODEX_SLUG = "codex-workflows-validation-and-governance";
const LLM_SLUG = "ai-fundamentals-and-the-llm-shift";
const OPENCLAW_SLUG = "openclaw-orchestration-skills-and-security";
const SUBTOPIC_SLUGS: Record<string, typeof codexSubtopics> = {
  [CODEX_SLUG]: codexSubtopics,
  [LLM_SLUG]: llmSubtopics,
  [OPENCLAW_SLUG]: openclawSubtopics,
};

function SubtopicsPanel({ subtopics }: { subtopics: typeof codexSubtopics }) {
  const [page, setPage] = useState(0);
  const topic = subtopics[page];
  if (!topic) return null;

  return (
    <div className="subtopic-container">
      <div className="subtopic-pagination">
        <button
          className="btn-secondary subtopic-nav-btn"
          disabled={page === 0}
          onClick={() => setPage(page - 1)}
        >
          ← Prev
        </button>
        <span className="subtopic-page-label">{topic.label}</span>
        <button
          className="btn-secondary subtopic-nav-btn"
          disabled={page === subtopics.length - 1}
          onClick={() => setPage(page + 1)}
        >
          Next →
        </button>
      </div>

      <div className="subtopic-header">
        <h3 className="subtopic-title">{topic.title}</h3>
        <p className="subtopic-summary">{topic.summary}</p>
      </div>

      <div className="subtopic-card-grid">
        <div className="module-card-clean">
          <h3>Core Idea</h3>
          <ul>{topic.cards.coreIdea.map((c, i) => <li key={i}>{c}</li>)}</ul>
        </div>
        <div className="module-card-clean">
          <h3>What This Establishes</h3>
          <p>{topic.cards.establishes}</p>
        </div>
        <div className="module-card-clean">
          <h3>Key Learner Takeaways</h3>
          <ul>{topic.cards.takeaways.map((t, i) => <li key={i}>{t}</li>)}</ul>
        </div>
        <div className="module-card-clean">
          <h3>Why It Matters</h3>
          <p>{topic.cards.whyItMatters}</p>
        </div>
      </div>

      <div className="subtopic-progress-dots">
        {subtopics.map((_, i) => (
          <button
            key={i}
            className={`subtopic-dot ${i === page ? "active" : ""}`}
            onClick={() => setPage(i)}
            aria-label={`Go to subtopic ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export function PresentationShell({
  initialModules,
  initialStorySections,
}: {
  initialModules: Module[];
  initialStorySections: StorySection[];
}) {
  const [activeSection, setActiveSection] = useState("home");
  const [presenterMode, setPresenterMode] = useState(false);
  const [showPwModal, setShowPwModal] = useState(false);
  const [pwInput, setPwInput] = useState("");
  const [pwError, setPwError] = useState(false);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const TUTOR_PW = "Sk983446c!!";

  function handleTutorToggle() {
    if (presenterMode) {
      setPresenterMode(false);
    } else {
      setShowPwModal(true);
      setPwInput("");
      setPwError(false);
    }
  }

  function handlePwSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (pwInput === TUTOR_PW) {
      setPresenterMode(true);
      setShowPwModal(false);
      setPwInput("");
      setPwError(false);
    } else {
      setPwError(true);
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target instanceof HTMLElement) {
          setActiveSection(visible.target.id);
        }
      },
      { threshold: [0.1, 0.4, 0.7], rootMargin: "-15% 0px -40% 0px" },
    );

    Object.values(sectionRefs.current).forEach((section) => {
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, [initialStorySections]);

  function jumpToSection(sectionId: string) {
    sectionRefs.current[sectionId]?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="site-shell">
      <header className="topbar">
        <Image src="/brand/official-logo.jpg" alt="Ananseum" className="brand-mark" width={440} height={120} style={{ objectFit: 'contain', transform: 'scale(1.6)' }} />
        <nav className="topbar-actions">
          <div className="mode-tabs">
            <button className={!presenterMode ? "active" : ""} onClick={() => setPresenterMode(false)}>Learner Mode</button>
            <button className={presenterMode ? "active" : ""} onClick={handleTutorToggle}>Tutor Mode</button>
          </div>
          <Link href="/downloads" className="btn-outline">Downloads Hub</Link>
        </nav>
      </header>

      {showPwModal && (
        <div className="pw-modal-overlay" onClick={() => setShowPwModal(false)}>
          <div className="pw-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Tutor Access</h3>
            <p>Enter the facilitator password to access Tutor Mode.</p>
            <form onSubmit={handlePwSubmit}>
              <input
                type="password"
                value={pwInput}
                onChange={(e) => { setPwInput(e.target.value); setPwError(false); }}
                placeholder="Password"
                autoFocus
                className={pwError ? "pw-input pw-input-error" : "pw-input"}
              />
              {pwError && <span className="pw-error-msg">Incorrect password</span>}
              <div className="pw-modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowPwModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Unlock</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="course-layout">
        <aside className="toc-sidebar">
          <span className="eyebrow">Contents</span>
          <nav className="toc-nav">
            {initialStorySections.map((section) => {
              if (section.kind === 'day-intro') {
                return (
                  <span key={section.id} className="toc-day-label">{section.eyebrow}</span>
                );
              }
              return (
                <button
                  key={section.id}
                  onClick={() => jumpToSection(section.id)}
                  className={`toc-link ${activeSection === section.id ? "active" : ""}`}
                >
                  {section.title}
                </button>
              );
            })}
          </nav>
        </aside>

        <main className="course-main">
          {initialStorySections.map((section) => {
            const currentModule = section.moduleSlug
              ? initialModules.find((m) => m.slug === section.moduleSlug)
              : undefined;

            return (
              <section
                key={section.id}
                id={section.id}
                className="section-anchor"
                ref={(el) => { sectionRefs.current[section.id] = el; }}
              >
                {section.kind === "hero" && (
                  <div className="hero-wrapper">
                    <div className="hero-copy">
                      <span className="eyebrow">{section.eyebrow}</span>
                      <h1>{section.title}</h1>
                      <p className="subtitle">{section.summary}</p>
                      <ul className="signal-list">
                        <li><strong>Who this course is for</strong>Leaders, product teams, technical managers, and practitioners exploring real-world AI adoption.</li>
                        <li><strong>What participants will learn</strong>How modern AI works, how to structure better AI tasks, how to use Codex effectively, how OpenClaw supports orchestration, and how to design a practical AI pilot.</li>
                      </ul>
                    </div>
                    <div className="facts-card">
                       <Image src="/brand/official-logo.jpg" alt="Ananseum Logo" width={400} height={110} className="brand-mark-wrap" style={{ objectFit: 'contain', transform: 'scale(1.5)', transformOrigin: 'left center' }} />
                       {presenterMode ? (
                         <>
                           <p><strong>Facilitator Guide</strong> for the Modern AI in Practice course.</p>
                           <p>Use this guide for timings, teaching notes, demo flow, debrief prompts, exercise facilitation, and capstone coaching.</p>
                         </>
                       ) : (
                         <>
                           <p><strong>Participant Workbook</strong> for the Modern AI in Practice course.</p>
                           <p>Use this pack to follow the sessions, capture notes, complete exercises, and leave with one practical AI pilot blueprint.</p>
                         </>
                       )}
                       <p><strong>Presented by:</strong><br/>Alfred Opare Saforo<br/>CEO Ananseum</p>
                       <p><strong>Date / Cohort:</strong><br/>28/03/2026 | Live Cohort</p>
                       <button className="btn-primary" onClick={() => jumpToSection(initialStorySections[1]?.id ?? "day-1")}>Start Exploring</button>
                    </div>
                  </div>
                )}

                {section.kind === "module" && currentModule && (
                  <div className="module-section">
                    <div className="module-header">
                      <span className="module-meta">Day {currentModule.day} / {currentModule.duration}</span>
                      <h2>{currentModule.title}</h2>
                      <p className="summary">{currentModule.objective}</p>
                    </div>

                    <ChapterStoryPanel moduleSlug={currentModule.slug} presenterMode={presenterMode} />
                    <KeywordRow keywords={currentModule.keywords} />

                    {presenterMode ? (
                      SUBTOPIC_SLUGS[currentModule.slug] ? (
                        <SubtopicsPanel subtopics={SUBTOPIC_SLUGS[currentModule.slug]} />
                      ) : (
                        <>
                          <div className="module-grid-new">
                            <div className="module-card-clean" style={{ gridColumn: 'span 1' }}>
                              <h3>Core Idea</h3>
                              <ul>{currentModule.coreIdea.map((c, i) => <li key={i}>{c}</li>)}</ul>
                            </div>
                            <div className="module-card-clean">
                              <h3>What this section establishes</h3>
                              <p>{currentModule.deliveryLead}</p>
                            </div>
                          </div>

                          <details className="module-accordion" open={false}>
                            <summary>Key points to impart</summary>
                            <div className="accordion-content">
                              <ul>{currentModule.talkingPoints.map((t, i) => <li key={i}>{t}</li>)}</ul>
                            </div>
                          </details>
                          <details className="module-accordion">
                            <summary>Why it matters strategically</summary>
                            <div className="accordion-content">
                              <p>{currentModule.takeaway}</p>
                            </div>
                          </details>
                        </>
                      )
                    ) : learnerContentMap[currentModule.slug] ? (
                      <LearnerTabUI data={learnerContentMap[currentModule.slug]} />
                    ) : (
                      <p className="muted">Learner content pending...</p>
                    )}
                  </div>
                )}

                {section.kind === "day-intro" && (
                  <div className="interstitial-panel">
                    <span className="eyebrow">{section.eyebrow}</span>
                    <h2>{section.title}</h2>
                    <p className="subtitle">{section.summary}</p>
                  </div>
                )}

                {section.kind === "demos" && (
                  <div className="interstitial-panel" style={{ textAlign: !presenterMode ? "left" : "center" }}>
                    {presenterMode ? (
                      <>
                        <span className="eyebrow">{section.eyebrow}</span>
                        <h2>{section.title}</h2>
                        <p className="subtitle">{section.summary}</p>
                        <div className="module-grid-clean" style={{ justifyContent: "center" }}>
                          <div className="interstitial-card">
                            <h3>What participants will see</h3>
                            <ul>
                              <li>Prompt/context quality comparison</li>
                              <li>End-to-end Codex software task</li>
                              <li>OpenClaw orchestration walkthrough</li>
                            </ul>
                          </div>
                          <div className="interstitial-card">
                            <h3>Why the demos matter</h3>
                            <p>Each demo makes the system visible: what context it needs, what controls matter, and how a human should judge the result.</p>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div style={{ textAlign: "left" }}>
                        <h2 style={{ marginBottom: "1.5rem" }}>{section.title}</h2>
                        <LearnerTabUI data={learnerInterstitials["demos"]} />
                      </div>
                    )}
                  </div>
                )}

                {section.kind === "capstone" && (
                  <div className="module-section">
                    <div className="module-header">
                      <span className="eyebrow">{section.eyebrow}</span>
                      <h2>{section.title}</h2>
                      <p className="summary">{section.summary}</p>
                    </div>
                    {presenterMode ? (
                      <div className="module-grid-new">
                         <div className="module-card-clean">
                            <h3>What the capstone produces</h3>
                            <ul>
                              <li>A named workflow with a real user group</li>
                              <li>A control model for approvals, risk, and containment</li>
                              <li>Success metrics and a go / no-go threshold</li>
                              <li>A 30-60-90 day next step</li>
                            </ul>
                         </div>
                         <div className="module-card-clean">
                            <h3>Template</h3>
                            <p>Download the official pilot blueprint to map out your use case.</p>
                            <a href="/downloads/learner/pilot-blueprint-template.md" download className="btn-primary" style={{marginTop:"1rem", width:"auto", display:"inline-block", textAlign:"center"}}>Download Blueprint</a>
                         </div>
                      </div>
                    ) : (
                      <>
                        <LearnerTabUI data={learnerInterstitials["capstone"]} />
                        <div style={{ marginTop: "2rem" }}>
                          <a href="/downloads/learner/pilot-blueprint-template.md" download className="btn-primary" style={{ width: "auto", display: "inline-flex" }}>Download Pilot Blueprint Template</a>
                        </div>
                      </>
                    )}
                  </div>
                )}

                {section.kind === "downloads" && (
                  <div className="module-section">
                    <div className="module-header">
                      <span className="eyebrow">{section.eyebrow}</span>
                      <h2>{section.title}</h2>
                      <p className="summary">{section.summary}</p>
                    </div>
                    <div className="downloads-grid">
                      {getDownloadsForAudience(presenterMode ? "course-owner" : "learner").map(d => (
                         <div key={d.id} className="resource-card">
                           <span className="resource-badge">{d.category}</span>
                           <strong>{d.title}</strong>
                           <p>{d.description || "Core asset for the Modern AI in Practice curriculum."}</p>
                           <a href={d.file} download className="download-action">Download file</a>
                         </div>
                      ))}
                    </div>
                  </div>
                )}

                {section.kind === "final" && (
                  <div className="interstitial-panel" style={{ textAlign: !presenterMode ? "left" : "center" }}>
                    {presenterMode ? (
                      <>
                        <span className="eyebrow">{section.eyebrow}</span>
                        <h2>{section.title}</h2>
                        <p className="subtitle">{section.summary}</p>
                        <div className="module-grid-clean" style={{ justifyContent: "center" }}>
                          <div className="interstitial-card">
                            <h3>What participants leave with</h3>
                            <ul>
                              <li>A mental model for modern AI systems</li>
                              <li>Operational understanding of Codex and OpenClaw</li>
                              <li>One realistic adoption blueprint</li>
                            </ul>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div style={{ textAlign: "left" }}>
                        <h2 style={{ marginBottom: "1.5rem" }}>From Curiosity to Pilot</h2>
                        <LearnerTabUI data={learnerInterstitials["final"]} />
                      </div>
                    )}
                    <div style={{ textAlign: "center" }}>
                      <button className="btn-secondary" style={{marginTop:"3rem"}} onClick={() => window.scrollTo({top:0, behavior:"smooth"})}>Back to Top</button>
                    </div>
                  </div>
                )}

              </section>
            );
          })}
        </main>
      </div>

      <CoachPanel onJump={jumpToSection} />
    </div>
  );
}
