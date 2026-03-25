import { DownloadAsset, Module, StorySection } from "@/types/course";

export const brandConfig = {
  name: "Ananseum",
  tag: "Modern AI in Practice",
  assetSwapPoints: ["logo", "brand colors", "fonts", "hero imagery"],
  contactEmail: "hello@ananseum.com",
};

export const downloads: DownloadAsset[] = [
  {
    id: "course-guide",
    title: "Course Guide",
    category: "Learner Pack",
    audience: "learner",
    description: "A concise overview of the two-day course, learning outcomes, and pacing.",
    file: "/downloads/learner/course-guide.md",
    type: "Markdown",
  },
  {
    id: "module-summaries",
    title: "Module Summaries",
    category: "Learner Pack",
    audience: "learner",
    description: "One-page summaries of all twelve modules for post-session review.",
    file: "/downloads/learner/module-summaries.md",
    type: "Markdown",
  },
  {
    id: "facilitator-notes",
    title: "Facilitator Notes",
    category: "Facilitator Pack",
    audience: "course-owner",
    description: "Teaching cues, pacing notes, and fallback prompts for each module.",
    file: "/downloads/course-owner/facilitator-notes.md",
    type: "Markdown",
  },
  {
    id: "exercise-workbook",
    title: "Exercise Workbook",
    category: "Worksheet",
    audience: "learner",
    description: "Discussion prompts, review rubrics, and space to capture group outputs.",
    file: "/downloads/learner/exercise-workbook.md",
    type: "Markdown",
  },
  {
    id: "pilot-blueprint",
    title: "Pilot Blueprint Template",
    category: "Template",
    audience: "learner",
    description: "A fillable template for designing one practical AI pilot workflow.",
    file: "/downloads/learner/pilot-blueprint-template.md",
    type: "Markdown",
  },
  {
    id: "resource-sheet",
    title: "Resource Sheet",
    category: "Resource",
    audience: "learner",
    description: "Recommended readings, official docs, and implementation references.",
    file: "/downloads/learner/resource-sheet.md",
    type: "Markdown",
  },
  {
    id: "delivery-runbook",
    title: "Delivery Runbook",
    category: "Facilitator Pack",
    audience: "course-owner",
    description: "Presenter flow, timing checkpoints, and section transition cues.",
    file: "/downloads/course-owner/delivery-runbook.md",
    type: "Markdown",
  },
  {
    id: "module-delivery-notes",
    title: "Module Delivery Notes",
    category: "Facilitator Pack",
    audience: "course-owner",
    description: "Owner-only module notes with objectives, cues, and emphasis points.",
    file: "/downloads/course-owner/module-delivery-notes.md",
    type: "Markdown",
  },
  {
    id: "demo-guide",
    title: "Demo Guide",
    category: "Facilitator Pack",
    audience: "course-owner",
    description: "Step-by-step guidance for the live Codex and OpenClaw walkthroughs.",
    file: "/downloads/course-owner/demo-guide.md",
    type: "Markdown",
  },
];

export const modules: Module[] = [
  {
    slug: "welcome-framing",
    day: 1,
    order: 1,
    title: "Welcome and Framing",
    duration: "15 min",
    audience: "Executive cohort",
    objective: "AI becomes easier to lead when it is framed as a workflow and governance question rather than a vague technology trend.",
    deliveryLead:
      "Today is about building a practical language for AI adoption. We will focus on where AI creates value, where it introduces risk, and how tools like Codex and OpenClaw fit into real operating workflows.",
    talkingPoints: [
      "What this course covers: practical AI systems, coding agents, orchestration, and adoption decisions.",
      "Why executives need an operational model rather than a list of tools.",
      "How the two days move from foundations to real deployment patterns.",
    ],
    exercise: {
      title: "Signal Scan",
      prompt: "Ask participants where AI is already appearing in their teams, and where the signal still feels noisy.",
      output: "A shortlist of internal use cases and skepticism themes to revisit later.",
    },
    takeaway: "AI adoption becomes manageable when it is framed around bounded workflows and reviewable outcomes.",
    speakerNotes: [
      "Open by narrowing the scope: this is not a history of AI or a research seminar.",
      "Use participant responses to personalize the examples later in the day.",
    ],
    downloads: ["course-guide"],
    keywords: ["course promise", "outcomes", "executive", "adoption"],
  },
  {
    slug: "ai-map",
    day: 1,
    order: 2,
    title: "The AI Map",
    duration: "45 min",
    audience: "Executive cohort",
    objective: "Not every AI problem needs the same kind of system. The first job is to place each use case on the right part of the map.",
    deliveryLead:
      "We begin by separating core ideas that are often blended together: AI, machine learning, generative AI, retrieval, automation, and agents. That shared map keeps later tool decisions grounded.",
    talkingPoints: [
      "AI, machine learning, deep learning, and generative AI are related but not interchangeable.",
      "Agents combine models, tools, memory, and workflow logic.",
      "Coding agents and orchestration platforms sit inside the broader automation stack.",
    ],
    demo: {
      title: "From chatbot to workflow",
      flow: [
        "Show a generic chatbot answer to a business question.",
        "Contrast it with a tool-using assistant that can route, retrieve, and act.",
        "Tie the difference back to business value and control.",
      ],
    },
    exercise: {
      title: "Use Case Sorting",
      prompt: "Have teams classify sample scenarios as chatbot, retrieval workflow, automation, or agentic system.",
      output: "A clearer sense of where different AI patterns belong.",
    },
    takeaway: "A good AI program starts by choosing the right system type for the job, not the most impressive model.",
    speakerNotes: [
      "Keep the taxonomy practical; avoid academic detours.",
      "Push participants to describe value and risk in the same sentence.",
    ],
    downloads: ["module-summaries", "exercise-workbook"],
    keywords: ["AI", "ML", "GenAI", "agents", "RAG", "multimodal"],
  },
  {
    slug: "how-ai-works",
    day: 1,
    order: 3,
    title: "How Modern AI Works",
    duration: "45 min",
    audience: "Executive cohort",
    objective: "Modern AI systems are easier to manage once you can distinguish model capability from context, retrieval, tools, memory, and review.",
    deliveryLead:
      "This section removes the mystery. Instead of treating AI output as magic, we will name the moving parts and show how each one affects quality, cost, and risk.",
    talkingPoints: [
      "Models predict plausible next tokens; they do not reason like humans.",
      "Context quality determines usefulness more than prompt tricks.",
      "Retrieval, tool use, and evaluation are what make systems trustworthy enough to deploy.",
    ],
    exercise: {
      title: "Failure Diagnosis",
      prompt: "Review one flawed AI output and identify whether the failure came from poor context, bad prompting, missing retrieval, or weak review.",
      output: "A short explanation of which component failed and how to fix it.",
    },
    takeaway: "Leaders can manage AI systems better when they understand their operating pieces and failure modes.",
    speakerNotes: [
      "Use simple language: tokens are units of text, not magic.",
      "Keep evaluation visible as the bridge from novelty to trust.",
    ],
    downloads: ["module-summaries"],
    keywords: ["tokens", "context", "retrieval", "memory", "hallucination", "evaluation"],
  },
  {
    slug: "prompting-context",
    day: 1,
    order: 4,
    title: "Prompting and Context Engineering",
    duration: "45 min",
    audience: "Executive cohort",
    objective: "Good prompting is really good task design: clear context, clear boundaries, and a clear definition of done.",
    deliveryLead:
      "Rather than prompt tricks, we focus on context engineering. The quality of the brief often determines whether the output is usable, reviewable, and safe.",
    talkingPoints: [
      "Prompting is task framing, not clever phrasing.",
      "Good prompts define context, constraints, acceptance criteria, and verification steps.",
      "Reusable task templates improve team consistency and safety.",
    ],
    demo: {
      title: "Weak ask to operational brief",
      flow: [
        "Start with a vague request such as 'help with our AI strategy'.",
        "Refine it into a bounded request with scope, audience, and deliverable criteria.",
        "Show how the improved brief changes the output quality.",
      ],
    },
    exercise: {
      title: "Prompt Repair",
      prompt: "Rewrite weak prompts into strong task briefs that a coding or workflow agent could execute safely.",
      output: "Three revised prompts with context, output expectations, and guardrails.",
    },
    takeaway: "Better context design leads to more reliable AI work than generic prompt hacks.",
    speakerNotes: [
      "This is the point where the audience should see prompt quality as operating discipline.",
      "Tie back to internal standards and governance language.",
    ],
    downloads: ["exercise-workbook"],
    keywords: ["prompting", "context engineering", "acceptance criteria", "task brief"],
  },
  {
    slug: "codex-deep-dive",
    day: 1,
    order: 5,
    title: "Codex Deep Dive",
    duration: "45 min",
    audience: "Executive cohort",
    objective: "Codex is most useful when it works inside a disciplined loop: inspect, plan, implement, validate, review, and summarize.",
    deliveryLead:
      "In practice, Codex is not just a code chatbot. It becomes powerful when paired with durable guidance, tool access, validation routines, and sensible approval controls.",
    talkingPoints: [
      "Codex works best when it can inspect context, propose a plan, make changes, and validate the result.",
      "Approvals, sandboxing, and network policies shape safe deployment.",
      "Project guidance, repo context, and validation routines matter more than prompting theatrics.",
    ],
    exercise: {
      title: "Control Point Review",
      prompt: "Ask where approval checkpoints should exist for AI-assisted code changes in your organization.",
      output: "A rough map of high-trust, medium-trust, and restricted scenarios.",
    },
    takeaway: "Codex is powerful when bounded by context, policy, and review discipline.",
    speakerNotes: [
      "Keep this practical: explain the workflow, not the branding.",
      "Emphasize how technical and governance controls reinforce each other.",
    ],
    downloads: ["facilitator-notes", "resource-sheet"],
    keywords: ["Codex", "coding agent", "sandbox", "approvals", "validation"],
  },
  {
    slug: "codex-demo",
    day: 1,
    order: 6,
    title: "Codex End-to-End Demo",
    duration: "30 min",
    audience: "Executive cohort",
    objective: "A trustworthy AI coding run is observable from start to finish: the task is clear, the plan is explicit, the validation is visible, and the result is reviewable.",
    deliveryLead:
      "This demo shows the whole loop in motion so participants can judge it like operators, not just spectators. The point is not speed alone. The point is controlled usefulness.",
    talkingPoints: [
      "The human defines the task and acceptance criteria.",
      "Codex inspects, plans, edits, and validates.",
      "The human reviews the outcome, not every keystroke.",
    ],
    demo: {
      title: "Plan, implement, validate, summarize",
      flow: [
        "Ask Codex to explain the repository.",
        "Request a concrete plan for a small change.",
        "Have Codex implement and run checks.",
        "Review the diff, the risks, and the validation result.",
      ],
    },
    exercise: {
      title: "Review the Run",
      prompt: "Score the demo on usefulness, risk, reviewability, and rollout readiness.",
      output: "A short executive assessment of where this would fit today.",
    },
    takeaway: "Trust comes from observable workflow and validation, not from blind confidence in the model.",
    speakerNotes: [
      "Use a safe demo repository and keep the task intentionally small.",
      "Have backup screenshots ready in case the live run fails.",
    ],
    downloads: ["facilitator-notes"],
    keywords: ["demo", "validation", "diff review", "repo understanding"],
  },
  {
    slug: "recap-reflection",
    day: 2,
    order: 7,
    title: "Recap and Reflection",
    duration: "15 min",
    audience: "Executive cohort",
    objective: "Before moving into systems and orchestration, we reset the core model and surface the adoption questions that still matter most.",
    deliveryLead:
      "Day 2 begins by reconnecting value and risk. The strongest pilots usually emerge from the tension between the two, not from optimism alone.",
    talkingPoints: [
      "What mattered most from Day 1.",
      "What questions still block adoption decisions.",
      "How Day 2 shifts from tools to systems and rollout design.",
    ],
    exercise: {
      title: "Risk and Opportunity Pairing",
      prompt: "Each pair names one high-value use case and one risk that must be designed around.",
      output: "A balanced starting point for the systems discussion.",
    },
    takeaway: "The goal is not confidence theater; it is disciplined readiness.",
    speakerNotes: [
      "Use this module to refresh energy and sharpen focus for the second half.",
    ],
    downloads: ["course-guide"],
    keywords: ["recap", "reflection", "risk", "opportunity"],
  },
  {
    slug: "ai-systems",
    day: 2,
    order: 8,
    title: "Building Real AI Systems",
    duration: "45 min",
    audience: "Executive cohort",
    objective: "A useful AI system is more than a model. It is a workflow with context, tools, memory, controls, and human checkpoints.",
    deliveryLead:
      "This section bridges the gap between isolated chat experiences and operational systems. It shows where retrieval helps, where orchestration matters, and where human oversight belongs.",
    talkingPoints: [
      "RAG improves grounded answers, but it does not automatically create a workflow.",
      "Agentic systems add tool use, state, routing, and controlled action.",
      "Human oversight is a design component, not a fallback afterthought.",
    ],
    exercise: {
      title: "System Mapping",
      prompt: "Map one internal process to the components of an AI system: model, context, tools, approvals, and outputs.",
      output: "A rough systems sketch for one candidate workflow.",
    },
    takeaway: "Real value comes from connecting models to useful systems with clear control boundaries.",
    speakerNotes: [
      "This is the bridge into OpenClaw; make the orchestration need obvious.",
    ],
    downloads: ["exercise-workbook", "pilot-blueprint"],
    keywords: ["RAG", "tools", "memory", "orchestration", "human-in-the-loop"],
  },
  {
    slug: "codex-lab",
    day: 2,
    order: 9,
    title: "Codex Practical Lab",
    duration: "45 min",
    audience: "Executive cohort",
    objective: "Leaders do not need to code to judge whether an AI-assisted workflow is disciplined, reviewable, and ready for a bounded pilot.",
    deliveryLead:
      "This lab uses Codex output as something to inspect, question, and score. The emphasis is on operational judgment rather than technical spectacle.",
    talkingPoints: [
      "A good AI workflow can be evaluated by clarity, validation, and risk posture.",
      "Executives do not need to code to judge whether the operating model is sound.",
      "Small, bounded tasks are the right entry point for pilots.",
    ],
    exercise: {
      title: "Executive Review Rubric",
      prompt: "Use the rubric to assess a bug fix or refactor task completed by Codex.",
      output: "A go, no-go, or pilot recommendation with rationale.",
    },
    takeaway: "Operational inspection skills matter more than technical spectacle.",
    speakerNotes: [
      "Treat the lab as a decision-making exercise, not a coding lesson.",
    ],
    downloads: ["exercise-workbook"],
    keywords: ["lab", "review rubric", "pilot", "bounded task"],
  },
  {
    slug: "openclaw-architecture",
    day: 2,
    order: 10,
    title: "OpenClaw Architecture and Setup",
    duration: "45 min",
    audience: "Executive cohort",
    objective: "OpenClaw matters when you need AI to operate across channels, sessions, and controlled workflows rather than as isolated chat windows.",
    deliveryLead:
      "We position OpenClaw as the orchestration layer: a self-hosted gateway that connects users, channels, providers, skills, and routed sessions under a clearer trust model.",
    talkingPoints: [
      "OpenClaw connects channels, providers, nodes, and sessions into a durable assistant layer.",
      "Self-hosting changes the trust, data, and governance conversation.",
      "Architecture matters because orchestration multiplies both value and risk.",
    ],
    exercise: {
      title: "Ownership Map",
      prompt: "Identify which internal teams would own platform operations, security review, workflow design, and business adoption.",
      output: "A draft RACI for an orchestration platform.",
    },
    takeaway: "Orchestration platforms turn isolated AI use into a managed operating capability.",
    speakerNotes: [
      "Keep the architecture diagram readable and role-based.",
    ],
    downloads: ["resource-sheet", "facilitator-notes"],
    keywords: ["OpenClaw", "gateway", "routing", "sessions", "self-hosted"],
  },
  {
    slug: "skills-and-clawhub",
    day: 2,
    order: 11,
    title: "Skills, ClawHub, and Codex Inside OpenClaw",
    duration: "45 min",
    audience: "Executive cohort",
    objective: "Skills and ACP sessions make OpenClaw extensible, but that extra power only matters when governance keeps pace with capability.",
    deliveryLead:
      "This section shows how native skills, ClawHub packages, and external runtimes such as Codex can be composed into larger workflows without losing the control thread.",
    talkingPoints: [
      "Skills package repeatable instructions and task conventions.",
      "ClawHub distributes those capabilities across environments.",
      "ACP sessions allow external agent runtimes, including coding harnesses, to plug into routed workflows.",
    ],
    exercise: {
      title: "Guardrail Design Review",
      prompt: "Discuss which guardrails are required before connecting a coding agent to a routed assistant platform.",
      output: "A shortlist of non-negotiable controls for production pilots.",
    },
    takeaway: "Composable skills and external runtimes create leverage only when governance keeps pace.",
    speakerNotes: [
      "Use this module to show how platform and agent layers meet.",
    ],
    downloads: ["resource-sheet", "pilot-blueprint"],
    keywords: ["skills", "ClawHub", "ACP", "external runtimes", "governance"],
  },
  {
    slug: "capstone-workshop",
    day: 2,
    order: 12,
    title: "Capstone Workflow Workshop",
    duration: "30 min",
    audience: "Executive cohort",
    objective: "The right first pilot is specific, measurable, and governable. It is not the broadest or most ambitious idea in the room.",
    deliveryLead:
      "The course closes by turning the discussion into action. Each team should leave with one pilot that has a sponsor, a control model, and a clear success threshold.",
    talkingPoints: [
      "Choose a use case with clear value, bounded risk, and measurable outcomes.",
      "Define users, approvals, data sources, and success metrics before tooling decisions harden.",
      "Keep the first pilot small enough to govern and big enough to matter.",
    ],
    exercise: {
      title: "Pilot Blueprint",
      prompt: "Complete the template for one AI-assisted workflow your organization could pilot in 30 to 90 days.",
      output: "A completed pilot blueprint with owners, controls, and success metrics.",
    },
    takeaway: "A good pilot is specific, measurable, and governable from day one.",
    speakerNotes: [
      "End with commitment language: one pilot, one owner, one review cycle.",
    ],
    downloads: ["pilot-blueprint"],
    keywords: ["capstone", "pilot blueprint", "workflow", "metrics", "owners"],
  },
];

export const storySections: StorySection[] = [
  {
    id: "home",
    kind: "hero",
    eyebrow: "Ananseum Executive Course",
    title: "Modern AI in Practice",
    summary:
      "A presentation-first course website for leaders evaluating AI systems, coding agents, and orchestration platforms.",
    speakerNote: "Set the tone: calm, practical, and operational.",
  },
  {
    id: "day-1",
    kind: "day-intro",
    eyebrow: "Day 1",
    title: "Foundations and Codex",
    summary:
      "Establish the AI mental model, teach context engineering, and demonstrate Codex as a governed coding agent.",
    speakerNote: "Move from concepts to one complete product workflow.",
  },
  ...modules.slice(0, 6).map((module) => ({
    id: module.slug,
    kind: "module" as const,
    eyebrow: `Day ${module.day} / ${module.duration}`,
    title: module.title,
    summary: module.objective,
    moduleSlug: module.slug,
    speakerNote: module.speakerNotes[0],
  })),
  {
    id: "day-2",
    kind: "day-intro",
    eyebrow: "Day 2",
    title: "Systems and Orchestration",
    summary:
      "Connect the model and agent concepts to self-hosted orchestration, routed assistants, and pilot design.",
    speakerNote: "Keep the room focused on systems, not shiny demos.",
  },
  ...modules.slice(6).map((module) => ({
    id: module.slug,
    kind: "module" as const,
    eyebrow: `Day ${module.day} / ${module.duration}`,
    title: module.title,
    summary: module.objective,
    moduleSlug: module.slug,
    speakerNote: module.speakerNotes[0],
  })),
  {
    id: "demos-exercises",
    kind: "demos",
    eyebrow: "Live Facilitation",
    title: "Demos and Guided Exercises",
    summary:
      "Anchor the course around three live demos and cumulative executive exercises rather than a static deck.",
    speakerNote: "Use the notes panel to keep transitions tight between demo and discussion.",
  },
  {
    id: "downloads",
    kind: "downloads",
    eyebrow: "Course Assets",
    title: "Downloads Hub",
    summary:
      "Give participants direct access to summaries, facilitator notes, worksheets, templates, and references.",
    speakerNote: "Remind participants that the site replaces the deck and the handout pack.",
  },
  {
    id: "capstone",
    kind: "capstone",
    eyebrow: "Applied Planning",
    title: "Pilot Blueprint",
    summary:
      "End with one workflow each team could take into a 30-60-90 day adoption conversation.",
    speakerNote: "This section should create action, not just reflection.",
  },
  {
    id: "final",
    kind: "final",
    eyebrow: "Next Move",
    title: "From Curiosity to Pilot",
    summary:
      "Use the course outputs to align one realistic AI pilot, the controls around it, and the team that owns it.",
    speakerNote: "Close on clear action and where to continue after the session.",
  },
];

export const modulesBySlug = Object.fromEntries(
  modules.map((module) => [module.slug, module]),
);

export function getDownloadById(id: string) {
  return downloads.find((download) => download.id === id);
}

export function getDownloadsForAudience(audience: "learner" | "course-owner") {
  return downloads.filter((download) => download.audience === audience);
}
