"use client";

import React, { createContext, useCallback, useContext, useRef, useState, useEffect } from "react";

/* ── Glossary Context (caches definitions app-wide) ──────────────── */

type GlossaryCtx = {
  getDefinition: (term: string) => Promise<string>;
};

const GlossaryContext = createContext<GlossaryCtx>({
  getDefinition: async () => "",
});

export function GlossaryProvider({ children }: { children: React.ReactNode }) {
  const cache = useRef<Map<string, string>>(new Map());
  const inflight = useRef<Map<string, Promise<string>>>(new Map());

  const getDefinition = useCallback(async (term: string): Promise<string> => {
    const key = term.toLowerCase();

    if (cache.current.has(key)) return cache.current.get(key)!;
    if (inflight.current.has(key)) return inflight.current.get(key)!;

    const promise = fetch("/api/glossary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ term }),
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("API error");
        const data = (await res.json()) as { definition: string };
        cache.current.set(key, data.definition);
        return data.definition;
      })
      .catch(() => {
        return "Definition unavailable — check your connection or API key.";
      })
      .finally(() => {
        inflight.current.delete(key);
      });

    inflight.current.set(key, promise);
    return promise;
  }, []);

  return (
    <GlossaryContext.Provider value={{ getDefinition }}>
      {children}
    </GlossaryContext.Provider>
  );
}

/* ── Keyword Tooltip Component ───────────────────────────────────── */

export function KeywordTooltip({ term }: { term: string }) {
  const { getDefinition } = useContext(GlossaryContext);
  const [state, setState] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [definition, setDefinition] = useState("");
  const [visible, setVisible] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);

  function clearHideTimer() {
    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
  }

  async function handleEnter() {
    clearHideTimer();
    setVisible(true);
    if (state === "ready" || state === "loading") return;
    setState("loading");
    try {
      const def = await getDefinition(term);
      setDefinition(def);
      setState("ready");
    } catch {
      setState("error");
      setDefinition("Definition unavailable.");
    }
  }

  function handleLeave() {
    clearHideTimer();
    hideTimer.current = setTimeout(() => setVisible(false), 200);
  }

  // Keep tooltip visible when hovering over the tooltip itself
  function handleTooltipEnter() {
    clearHideTimer();
  }

  function handleTooltipLeave() {
    handleLeave();
  }

  // Cleanup timer on unmount
  useEffect(() => {
    return () => clearHideTimer();
  }, []);

  const displayTerm = term
    .split(/[\s-]+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return (
    <span className="keyword-pill-wrapper">
      <span
        ref={pillRef}
        className="keyword-pill"
        onMouseEnter={() => { void handleEnter(); }}
        onMouseLeave={handleLeave}
        onFocus={() => { void handleEnter(); }}
        onBlur={handleLeave}
        tabIndex={0}
        role="button"
        aria-describedby={`tooltip-${term}`}
      >
        <span className="keyword-pill-icon">✦</span>
        {displayTerm}
      </span>

      {visible && (
        <div
          ref={tooltipRef}
          id={`tooltip-${term}`}
          className={`keyword-tooltip ${state === "ready" || state === "error" ? "loaded" : ""}`}
          role="tooltip"
          onMouseEnter={handleTooltipEnter}
          onMouseLeave={handleTooltipLeave}
        >
          <div className="keyword-tooltip-header">
            <span className="keyword-tooltip-icon">✦</span>
            <strong>{displayTerm}</strong>
          </div>
          <div className="keyword-tooltip-body">
            {state === "loading" && (
              <div className="keyword-tooltip-loading">
                <div className="shimmer-line" />
                <div className="shimmer-line short" />
              </div>
            )}
            {(state === "ready" || state === "error") && (
              <p className="keyword-tooltip-def">{definition}</p>
            )}
          </div>
        </div>
      )}
    </span>
  );
}

/* ── Keyword Row (renders a list of keywords for a module) ───────── */

export function KeywordRow({ keywords }: { keywords: string[] }) {
  if (!keywords || keywords.length === 0) return null;

  return (
    <div className="keyword-row">
      <span className="keyword-row-label">Key Terms</span>
      <div className="keyword-row-pills">
        {keywords.map((kw) => (
          <KeywordTooltip key={kw} term={kw} />
        ))}
      </div>
    </div>
  );
}
