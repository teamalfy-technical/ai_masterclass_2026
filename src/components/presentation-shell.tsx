"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  brandConfig,
  downloads,
  getDownloadById,
  getDownloadsForAudience,
  modules,
  storySections,
} from "@/lib/course-data";
import type { StorySection } from "@/types/course";

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

function SectionPanel({
  section,
  presenterMode,
  notesOpen,
  isActive,
}: {
  section: StorySection;
  presenterMode: boolean;
  notesOpen: boolean;
  isActive: boolean;
}) {
  const currentModule = section.moduleSlug
    ? modules.find((entry) => entry.slug === section.moduleSlug)
    : undefined;

  const visibleDownloads = presenterMode ? downloads : getDownloadsForAudience("learner");

  const linkedDownloads = currentModule?.downloads
    .map((downloadId) => getDownloadById(downloadId))
    .filter(
      (download) =>
        Boolean(download) && (presenterMode || download?.audience === "learner"),
    );

  return (
    <section
      id={section.id}
      data-section-id={section.id}
      className={`scene scene-${section.kind} ${isActive ? "is-active" : ""}`}
    >
      <div className="scene-inner">
        <div className="scene-copy">
          <p className="eyebrow">{section.eyebrow}</p>
          <h2>{section.title}</h2>
          <p className="scene-summary">{section.summary}</p>

          {section.kind === "hero" ? (
            <div className="hero-grid">
              <div>
                <ul className="signal-list">
                  <li>8 focused hours on how modern AI systems create value and risk</li>
                  <li>Practical coverage of Codex, OpenClaw, governance, and pilot design</li>
                  <li>A shareable course surface with learner resources built in</li>
                </ul>
                <div className="hero-actions">
                  <a href="#day-1" className="primary-action">
                    Enter story mode
                  </a>
                  <Link href="/downloads" className="secondary-action">
                    Open downloads
                  </Link>
                </div>
              </div>
              <div className="hero-brand-block">
                <div className="brand-mark-wrap">
                  <Image
                    src="/brand/ananseum-wordmark-dark.svg"
                    alt="Ananseum"
                    className="brand-wordmark"
                    width={320}
                    height={88}
                  />
                </div>
                <p>A practical course for leaders deciding where AI fits, where it does not, and how to pilot it responsibly.</p>
                <p className="muted">
                  Clear systems thinking, bounded automation, strong review loops, and deliberate use of tools.
                </p>
              </div>
            </div>
          ) : null}

          {currentModule ? (
            <div className="module-grid">
              <div className="module-card">
                <span>Core idea</span>
                <p>{currentModule.objective}</p>
              </div>
              <div className="module-card">
                <span>What this section establishes</span>
                <p>{currentModule.deliveryLead ?? currentModule.objective}</p>
              </div>
              <div className="module-card">
                <span>Key points to leave with</span>
                <ul>
                  {currentModule.talkingPoints.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
              <div className="module-card">
                <span>Workshop prompt</span>
                <p>{currentModule.exercise.title}</p>
                <p className="muted">{currentModule.exercise.prompt}</p>
              </div>
              <div className="module-card">
                <span>Why it matters</span>
                <p>{currentModule.takeaway}</p>
              </div>
            </div>
          ) : null}

          {section.kind === "demos" ? (
            <div className="module-grid">
              <div className="module-card">
                <span>What participants will see</span>
                <ul>
                  <li>Prompt/context quality comparison</li>
                  <li>End-to-end Codex software task</li>
                  <li>OpenClaw orchestration walkthrough</li>
                </ul>
              </div>
              <div className="module-card">
                <span>Why the demos matter</span>
                <p>Each demo makes the system visible: what context it needs, what controls matter, and how a human should judge the result.</p>
              </div>
            </div>
          ) : null}

          {section.kind === "downloads" ? (
            <>
              <div className="module-grid">
                <div className="module-card">
                  <span>Learner materials</span>
                  <p>These are the participant-facing assets: course guide, summaries, workbook, blueprint, and reference sheet.</p>
                </div>
                {presenterMode ? (
                  <div className="module-card">
                    <span>Presenter materials</span>
                    <p>Presenter mode exposes the course-owner pack with delivery notes, runbook, and demo guidance.</p>
                  </div>
                ) : null}
              </div>
              <div className="downloads-inline">
                {visibleDownloads.map((download) => (
                  <a key={download.id} href={download.file} className="download-pill" download>
                    <strong>{download.title}</strong>
                    <span>{download.category}</span>
                  </a>
                ))}
              </div>
            </>
          ) : null}

          {section.kind === "capstone" ? (
            <div className="module-grid">
              <div className="module-card">
                <span>What the capstone produces</span>
                <ul>
                  <li>A named workflow with a real user group</li>
                  <li>A control model for approvals, risk, and containment</li>
                  <li>Success metrics and a go / no-go threshold</li>
                  <li>A 30-60-90 day next step</li>
                </ul>
              </div>
              <div className="module-card">
                <span>Template</span>
                <a href="/downloads/learner/pilot-blueprint-template.md" download className="secondary-action inline-action">
                  Download the blueprint
                </a>
              </div>
            </div>
          ) : null}

          {section.kind === "final" ? (
            <div className="module-grid">
              <div className="module-card">
                <span>What participants leave with</span>
                <ul>
                  <li>A mental model for modern AI systems</li>
                  <li>Operational understanding of Codex and OpenClaw</li>
                  <li>One realistic adoption blueprint</li>
                </ul>
              </div>
              <div className="module-card">
                <span>Continue</span>
                <p>Share the site as a cohort resource before, during, and after delivery.</p>
              </div>
            </div>
          ) : null}

          {linkedDownloads?.length ? (
            <div className="support-links">
              {linkedDownloads.map((download) => (
                <a key={download?.id} href={download?.file} download>
                  {download?.title}
                </a>
              ))}
              <Link href={currentModule ? `/modules/${currentModule.slug}` : "/downloads"}>
                Open full module page
              </Link>
            </div>
          ) : null}
        </div>

        <AnimatePresence initial={false}>
          {presenterMode && notesOpen && section.speakerNote ? (
            <motion.aside
              className="notes-panel"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 24 }}
            >
              <p className="notes-label">Presenter notes</p>
              <p>{section.speakerNote}</p>
              {currentModule ? (
                <>
                  <p className="notes-label">Facilitator cue</p>
                  <p>{currentModule.speakerNotes[1] ?? currentModule.speakerNotes[0]}</p>
                </>
              ) : null}
            </motion.aside>
          ) : null}
        </AnimatePresence>
      </div>
    </section>
  );
}

function CoachPanel({
  onJump,
}: {
  onJump: (sectionId: string) => void;
}) {
  const [state, setState] = useState<CoachState>({
    status: "idle",
    question: "",
    relatedDownloads: [],
  });

  async function submitQuestion() {
    const question = state.question.trim();
    if (!question) {
      return;
    }

    setState((current) => ({ ...current, status: "loading" }));

    try {
      const response = await fetch("/api/coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      if (!response.ok) {
        throw new Error("Request failed.");
      }

      const payload = (await response.json()) as Omit<CoachState, "status" | "question">;
      setState((current) => ({
        ...current,
        status: "ready",
        answer: payload.answer,
        recommendedSectionId: payload.recommendedSectionId,
        recommendedModuleSlug: payload.recommendedModuleSlug,
        relatedDownloads: payload.relatedDownloads,
        quiz: payload.quiz,
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
    <aside className="coach-panel">
      <div className="coach-head">
        <p className="eyebrow">AI Quiz Coach</p>
        <h3>Ask about a module or test understanding</h3>
      </div>
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
        className="primary-action"
        onClick={() => {
          void submitQuestion();
        }}
        disabled={state.status === "loading"}
      >
        {state.status === "loading" ? "Thinking..." : "Ask coach"}
      </button>

      {state.answer ? (
        <div className="coach-response">
          <p>{state.answer}</p>
          {state.recommendedSectionId ? (
            <button
              type="button"
              className="secondary-action inline-action"
              onClick={() => onJump(state.recommendedSectionId!)}
            >
              Jump to recommended section
            </button>
          ) : null}
          {state.quiz ? (
            <div className="quiz-card">
              <p className="notes-label">Quick check</p>
              <p>{state.quiz.question}</p>
              <ul>
                {state.quiz.options.map((option) => (
                  <li key={option}>{option}</li>
                ))}
              </ul>
              <p className="muted">Suggested answer: {state.quiz.answer}</p>
            </div>
          ) : null}
          {state.relatedDownloads.length ? (
            <div className="support-links">
              {state.relatedDownloads.map((downloadId) => {
                const download = getDownloadById(downloadId);
                if (!download) {
                  return null;
                }
                return (
                  <a key={download.id} href={download.file} download>
                    {download.title}
                  </a>
                );
              })}
            </div>
          ) : null}
        </div>
      ) : null}
    </aside>
  );
}

export function PresentationShell() {
  const [activeSection, setActiveSection] = useState("home");
  const [presenterMode, setPresenterMode] = useState(false);
  const [notesOpen, setNotesOpen] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target instanceof HTMLElement) {
          setActiveSection(visible.target.dataset.sectionId ?? "home");
        }
      },
      { threshold: [0.35, 0.6, 0.9] },
    );

    Object.values(sectionRefs.current).forEach((section) => {
      if (section) {
        observer.observe(section);
      }
    });

    return () => observer.disconnect();
  }, []);

  const activeIndex = useMemo(
    () => storySections.findIndex((section) => section.id === activeSection),
    [activeSection],
  );

  function jumpToSection(sectionId: string) {
    sectionRefs.current[sectionId]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "ArrowDown" && event.key !== "ArrowUp") {
        return;
      }

      const nextIndex =
        event.key === "ArrowDown"
          ? Math.min(activeIndex + 1, storySections.length - 1)
          : Math.max(activeIndex - 1, 0);

      jumpToSection(storySections[nextIndex].id);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex]);

  return (
    <div className="site-shell">
      <header className="topbar">
        <div className="topbar-brand">
          <Image
            src="/brand/ananseum-wordmark-light.svg"
            alt="Ananseum"
            className="topbar-wordmark"
            width={300}
            height={78}
          />
          <span>{brandConfig.tag}</span>
        </div>
        <nav className="topbar-actions">
          <button type="button" onClick={() => setPresenterMode((value) => !value)}>
            {presenterMode ? "Learner view" : "Presenter view"}
          </button>
          {presenterMode ? (
            <button type="button" onClick={() => setNotesOpen((value) => !value)}>
              {notesOpen ? "Hide notes" : "Show notes"}
            </button>
          ) : null}
          <Link href={presenterMode ? "/downloads?audience=course-owner" : "/downloads"}>
            Downloads
          </Link>
        </nav>
      </header>

      <div className="presenter-rail">
        <div className="progress-chip">
          <span>
            {activeIndex + 1} / {storySections.length}
          </span>
          <strong>{storySections[activeIndex]?.title}</strong>
        </div>
        <div className="rail-nav">
          {storySections.map((section) => (
            <button
              key={section.id}
              type="button"
              onClick={() => jumpToSection(section.id)}
              className={section.id === activeSection ? "active" : ""}
              aria-label={section.title}
            />
          ))}
        </div>
        <div className="rail-actions">
          <button
            type="button"
            onClick={() => jumpToSection(storySections[Math.max(activeIndex - 1, 0)].id)}
          >
            Previous
          </button>
          <button
            type="button"
            onClick={() =>
              jumpToSection(
                storySections[Math.min(activeIndex + 1, storySections.length - 1)].id,
              )
            }
          >
            Next
          </button>
        </div>
      </div>

      <main
        className={`presentation-stream ${presenterMode ? "presenter-mode" : "learner-mode"}`}
        onTouchStart={(event) => setTouchStart(event.changedTouches[0]?.clientY ?? null)}
        onTouchEnd={(event) => {
          const end = event.changedTouches[0]?.clientY ?? null;
          if (touchStart === null || end === null) {
            return;
          }

          const delta = touchStart - end;
          if (Math.abs(delta) < 50) {
            return;
          }

          const nextIndex =
            delta > 0
              ? Math.min(activeIndex + 1, storySections.length - 1)
              : Math.max(activeIndex - 1, 0);

          jumpToSection(storySections[nextIndex].id);
          setTouchStart(null);
        }}
      >
        {storySections.map((section) => (
          <div
            key={section.id}
            ref={(element) => {
              sectionRefs.current[section.id] = element;
            }}
          >
            <SectionPanel
              section={section}
              presenterMode={presenterMode}
              notesOpen={notesOpen}
              isActive={section.id === activeSection}
            />
          </div>
        ))}
      </main>

      <CoachPanel onJump={jumpToSection} />
    </div>
  );
}
