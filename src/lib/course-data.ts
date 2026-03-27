import { CodexSubtopic, DownloadAsset, Module, StorySection } from "@/types/course";

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

export function getDownloadById(id: string) {
  return downloads.find((download) => download.id === id);
}

export function getDownloadsForAudience(audience: "learner" | "course-owner") {
  return downloads.filter((download) => download.audience === audience);
}

export type ChapterStory = {
  title: string;
  image: string;
  storyText: string;
  teachingPoint: string;
  bridgeLine: string;
};

export const chapterStories: Record<string, ChapterStory> = {
  "ai-fundamentals-and-the-llm-shift": {
    title: "The Mechanical Turk",
    image: "/images/stories/mechanical-turk.png",
    storyText:
      "In 1770, Europe became fascinated by a machine called the Mechanical Turk. It looked like an automaton that could play chess against humans and win. Audiences saw gears, cabinets, and apparent mechanical genius. But the machine was a performance. A human chess player was hidden inside, controlling the moves. The reason this story still matters is that it captures something timeless about AI: people are very willing to confuse impressive output with real autonomy.",
    teachingPoint:
      "Before asking whether an AI system is \"intelligent,\" ask what is actually doing the work — a model, a human, a workflow, hidden labor, or some combination.",
    bridgeLine:
      "That's why we start this course by understanding what AI actually is, before we admire what it produces.",
  },
  "ai-landscape-and-systems": {
    title: "The Roomba and the Robot Butler",
    image: "/images/stories/mechanical-turk.png",
    storyText:
      "A Roomba is one of the most successful AI-powered products ever sold. It navigates rooms, avoids obstacles, and cleans floors. But nobody mistakes it for a general-purpose robot. It does one thing well because the problem is tightly bounded. Now compare that to the promise of a \"robot butler\" that can cook, clean, manage schedules, and hold conversations. The gap between a Roomba and a robot butler is the gap between a bounded AI workflow and an unbounded fantasy.",
    teachingPoint:
      "The most useful AI systems are bounded, specific, and reviewable — not general-purpose. Start by defining the workflow, not the ambition.",
    bridgeLine:
      "That is why this chapter maps the system around the model, not just the model itself.",
  },
  "context-engineering-and-prompting": {
    title: "Air France 447",
    image: "/images/stories/air-france-447.png",
    storyText:
      "Let me start with Air France 447. It was a flight crossing the Atlantic at night, and like any flight in those conditions, the pilots were relying heavily on the instruments. Then something small but critical happened: the pitot probes iced over, the speed readings became unreliable, and the autopilot disconnected. So in a very short space of time, the crew went from flying with a stable, trusted system to trying to make sense of signals that were no longer fully reliable. And that\u2019s the part that really matters for us. The danger didn\u2019t start because everything went silent. It started because the system was still giving information, still demanding decisions, but its picture of reality had started to break. That\u2019s a useful way to think about AI too. The real risk is not always when the system fails loudly. It\u2019s when it keeps sounding confident after it has lost its grounding.",
    teachingPoint:
      "Plausible language is not the same thing as reliable reasoning. A model that sounds confident may still be missing context, constraints, and ground truth.",
    bridgeLine:
      "So this chapter is not about prompt magic. It is about giving the model enough structure to be useful.",
  },
  "codex-workflows-validation-and-governance": {
    title: "Mars Climate Orbiter",
    image: "/images/stories/mars-orbiter.png",
    storyText:
      "NASA lost the Mars Climate Orbiter because one part of the system used U.S. customary units while another expected metric units. The investigation found that a software interface produced thruster data in pound-seconds instead of the newton-seconds the system expected, and the mismatch was not caught before the spacecraft was lost.",
    teachingPoint:
      "This is really a story about unclear interfaces, weak validation, and missing checks. The system did not fail because someone lacked intelligence. It failed because ambiguity and verification gaps survived long enough to become catastrophic.",
    bridgeLine:
      "That is exactly why a good Codex workflow starts with clear specs, explicit constraints, and validation before trust.",
  },
  "ai-systems-rag-tools-memory-evaluation": {
    title: "Google Flu Trends and the Danger of Elegant Proxies",
    image: "/images/stories/google-flu.png",
    storyText:
      "Google once built a system called Google Flu Trends that looked like the future of prediction: use search behavior to estimate flu outbreaks faster than traditional reporting. Then the system stumbled badly. In early 2013, researchers noted that it was estimating more than double the percentage of flu-related doctor visits compared with CDC surveillance. The deeper lesson was not that data is useless. It was that a clever signal can drift away from reality when you stop grounding it, checking it, and understanding how the environment changes.",
    teachingPoint:
      "Raw model power is not enough. Good systems need grounding, verification, feedback, and measurement.",
    bridgeLine:
      "This chapter is about building systems that stay connected to reality.",
  },
  "openclaw-orchestration-skills-and-security": {
    title: "Tay on Twitter",
    image: "/images/stories/tay.png",
    storyText:
      "In 2016, Microsoft launched Tay on Twitter as an experiment in conversational understanding. Very quickly, Tay began posting offensive and harmful content. Microsoft pulled it down and publicly apologized for the unintended tweets. The reason this story is so useful is that it shows what happens when an agent is dropped into a live channel without enough control around inputs, behavior, escalation, and boundaries. The channel is not neutral. The environment shapes the system.",
    teachingPoint:
      "Orchestration is not just about connecting tools. It is about deciding which agent can act where, with which permissions, under which controls.",
    bridgeLine:
      "OpenClaw matters when you want assistants that are connected, routed, and governed — not just exposed.",
  },
  "capstone-pilot-blueprint": {
    title: "Air Canada's Chatbot Liability Case",
    image: "/images/stories/air-canada.png",
    storyText:
      "A customer asked Air Canada's website chatbot about bereavement fares. The chatbot gave incorrect instructions. The customer relied on that answer, bought the ticket, and later tried to recover the difference. Air Canada argued it should not be responsible for what the chatbot said, but the British Columbia Civil Resolution Tribunal rejected that position and held the airline liable for the misinformation delivered through its chatbot.",
    teachingPoint:
      "Once an AI system speaks on your behalf, the organisation still owns the outcome. A pilot is not just about proving value. It is about deciding what can be trusted, what must be reviewed, and who is accountable when something goes wrong.",
    bridgeLine:
      "So in this final chapter, we are not designing a flashy AI pilot. We are designing one that is useful, controlled, and owned.",
  },
};

export const llmSubtopics: CodexSubtopic[] = [
  {
    id: "llm-story-mechanical-turk",
    label: "Page 1 of 10",
    title: "The Mechanical Turk",
    summary: "A story from 1770 that still explains the most common mistake people make about AI.",
    cards: {
      coreIdea: [
        "In 1770, audiences believed the Mechanical Turk was a chess-playing automaton — it was actually a human hidden inside",
        "People are very willing to confuse impressive output with real intelligence",
        "The same pattern repeats today: AI systems that look autonomous often depend on hidden structure, training data, human design, and workflow constraints",
        "The question is not 'is this AI smart?' — the question is 'what is actually doing the work?'"
      ],
      establishes: "The Mechanical Turk is the opening frame for the entire course. It sets up the central habit: when you see impressive AI output, look behind the curtain. Ask what is a model, what is a workflow, what is human, and what is hidden.",
      takeaways: [
        "Impressive output does not mean real understanding",
        "Always ask what is actually doing the work behind an AI system",
        "AI systems often involve more human design and workflow structure than the user sees",
        "This habit — questioning visible intelligence — will guide every later chapter"
      ],
      whyItMatters: "Without this frame, learners tend to either over-trust AI (treating it as autonomous) or under-value it (dismissing it as a toy). Getting this right at the start makes every later chapter more useful."
    }
  },
  {
    id: "llm-what-people-mean-ai",
    label: "Page 2 of 10",
    title: "What People Mean When They Say 'AI'",
    summary: "AI is a broad umbrella. Many very different systems get called AI for very different reasons.",
    cards: {
      coreIdea: [
        "AI is not one thing — it is a label applied to a wide range of technologies",
        "A spam filter, a recommendation engine, a chatbot, and a self-driving car are all called AI",
        "When someone says 'we should use AI,' the first useful question is: which kind, for what task?",
        "The value of AI depends entirely on the specific system and the specific problem"
      ],
      establishes: "Learners often arrive with a vague sense that AI means chatbots or robots. This page resets the conversation to the practical reality: AI is a toolkit, not a single invention.",
      takeaways: [
        "AI is an umbrella term covering many different approaches",
        "Different AI systems solve very different problems",
        "Asking 'should we use AI?' is too broad — ask 'which AI approach fits this task?'",
        "Understanding the landscape prevents picking the wrong tool for the job"
      ],
      whyItMatters: "Teams that treat AI as one thing often pick the wrong solution, set the wrong expectations, or stall because the term is too vague to act on. Clarity here saves time later."
    }
  },
  {
    id: "llm-ml-dl-genai",
    label: "Page 3 of 10",
    title: "Machine Learning, Deep Learning, and Generative AI",
    summary: "These are layers, not synonyms. Understanding the relationship helps learners place LLMs in context.",
    cards: {
      coreIdea: [
        "Machine learning: systems that learn patterns from data instead of being explicitly programmed",
        "Deep learning: a subset of ML using neural networks with many layers — good at images, text, speech, and complex patterns",
        "Generative AI: a subset of deep learning trained to produce new content — text, images, code, audio",
        "LLMs are a specific type of generative AI trained on massive text corpora to predict language"
      ],
      establishes: "This page gives learners a simple mental map: AI → ML → deep learning → generative AI → LLMs. Each layer narrows the scope and makes the technology more specific.",
      takeaways: [
        "Machine learning learns from data rather than following hand-coded rules",
        "Deep learning uses neural networks — powerful but harder to interpret",
        "Generative AI creates new content rather than just classifying or predicting",
        "LLMs are generative AI models trained specifically on language"
      ],
      whyItMatters: "Without this map, every AI conversation collapses into confusion. People use terms interchangeably and end up talking past each other. This clarity is the foundation for everything that follows."
    }
  },
  {
    id: "llm-what-is-llm",
    label: "Page 4 of 10",
    title: "What a Large Language Model Is",
    summary: "An LLM is a model trained to predict the most likely next token given a sequence of input tokens.",
    cards: {
      coreIdea: [
        "An LLM is a neural network trained on enormous amounts of text data",
        "Its core task during training is predicting the next word (token) in a sequence",
        "By learning to predict well, it develops internal representations of grammar, facts, reasoning patterns, and style",
        "It does not 'know' things the way a human does — it has learned statistical patterns across billions of text samples"
      ],
      establishes: "This is the most important technical concept in the chapter. Once learners understand that an LLM is a prediction engine, most of its strengths and failures become intuitive.",
      takeaways: [
        "LLMs are prediction engines for language, not reasoning engines",
        "They were trained on massive text data — books, articles, code, conversations",
        "Their impressive output comes from extremely good pattern matching at scale",
        "Understanding this one idea explains most of what follows about strengths and failures"
      ],
      whyItMatters: "Misunderstanding what an LLM is leads to two common mistakes: over-trusting it (assuming it reasons like a human) or under-trusting it (dismissing it as random). Neither is useful."
    }
  },
  {
    id: "llm-how-they-work",
    label: "Page 5 of 10",
    title: "How LLMs Work in Practice",
    summary: "Tokens, context windows, prompting, and prediction — the practical mechanics behind every interaction.",
    cards: {
      coreIdea: [
        "Text is broken into tokens — roughly word parts — before the model processes it",
        "The context window is the amount of text the model can see at once (typically thousands to hundreds of thousands of tokens)",
        "A prompt is the input you give — it shapes the prediction the model makes",
        "The model generates output one token at a time, each prediction conditioned on everything before it"
      ],
      establishes: "This page makes the abstract concrete. When learners understand tokens and context windows, they understand why wording matters, why long documents get lost, and why the same question can produce different answers.",
      takeaways: [
        "Everything the model reads and writes is tokens — understanding tokens helps you manage cost and quality",
        "The context window is finite — the model cannot see your entire organisation's knowledge at once",
        "Better prompts produce better predictions because they give the model better context",
        "Output is generated token by token — the model does not write a full answer and then send it"
      ],
      whyItMatters: "Practical understanding of tokens, context, and prediction prevents the most common prompting mistakes and prepares learners for the context engineering chapter that follows."
    }
  },
  {
    id: "llm-why-they-seem-smart",
    label: "Page 6 of 10",
    title: "Why LLMs Seem Smart",
    summary: "Fluency, abstraction, and memory-like behaviour create a powerful illusion of understanding.",
    cards: {
      coreIdea: [
        "LLMs produce fluent, grammatically correct, well-structured text — this feels like understanding",
        "They can summarise, compare, translate, and rephrase — this feels like reasoning",
        "They can recall facts encountered in training — this feels like memory",
        "But all of this is pattern completion, not conscious thought — the model has no goals, beliefs, or awareness"
      ],
      establishes: "This page is the antidote to the Mechanical Turk illusion. The model is impressive, but not for the reasons most people assume. Understanding why it seems smart makes you a better user.",
      takeaways: [
        "Fluent language is not the same as understanding — a model can be eloquent and wrong",
        "The illusion of reasoning comes from patterns learned across billions of examples",
        "Apparent memory is pattern recall, not lived experience",
        "Knowing this prevents over-reliance and helps you design better workflows"
      ],
      whyItMatters: "People who mistake fluency for understanding skip validation, trust overconfident outputs, and design systems without safeguards. This page is the foundation for responsible use."
    }
  },
  {
    id: "llm-where-they-fail",
    label: "Page 7 of 10",
    title: "Where LLMs Fail",
    summary: "Hallucinations, outdated knowledge, brittle reasoning, overconfidence, and inconsistency.",
    cards: {
      coreIdea: [
        "Hallucinations: the model generates plausible-sounding content that is factually wrong — because it optimises for likelihood, not truth",
        "Outdated knowledge: the model's training data has a cutoff — it does not know what happened yesterday",
        "Brittle reasoning: multi-step logic, arithmetic, and precise factual recall are unreliable",
        "Overconfidence and inconsistency: the model rarely says 'I don't know' and may give different answers to the same question"
      ],
      establishes: "This page is essential for building realistic expectations. Every failure mode listed here directly motivates a later chapter: context engineering fixes weak prompts, Codex adds validation, systems add tools and retrieval.",
      takeaways: [
        "Hallucinations are a feature of the architecture, not a bug that will simply be fixed",
        "Never trust an LLM for time-sensitive, safety-critical, or legally binding information without verification",
        "If accuracy matters, add retrieval, grounding, and human review",
        "The model's confidence level tells you nothing about its accuracy"
      ],
      whyItMatters: "Teams that do not understand failure modes build fragile systems, ship unreliable products, and lose trust in AI tools after the first incident. This page prevents that."
    }
  },
  {
    id: "llm-what-theyre-good-for",
    label: "Page 8 of 10",
    title: "What LLMs Are Good For",
    summary: "Summarisation, drafting, coding support, classification, extraction, synthesis, and structured generation.",
    cards: {
      coreIdea: [
        "Summarisation: condensing long documents, meetings, or threads into usable briefs",
        "Drafting: producing first drafts of emails, reports, proposals, documentation, and communications",
        "Coding support: writing, explaining, refactoring, and reviewing code in context",
        "Classification, extraction, and synthesis: sorting categories, pulling structured data from unstructured text, combining multiple sources"
      ],
      establishes: "After covering failures, this page rebuilds confidence with practical, proven use cases. These are the tasks where LLMs add real value today — when used with appropriate validation.",
      takeaways: [
        "LLMs are strongest when the task is bounded, the output is reviewable, and the cost of an error is low",
        "Summarisation and drafting are the most immediately useful capabilities for most teams",
        "Coding support is powerful but requires review — treat AI-generated code like a pull request",
        "Classification and extraction can automate hours of manual work when the categories are well-defined"
      ],
      whyItMatters: "Many teams stall because they do not know where to start. This page gives them a practical shortlist of high-value, low-risk starting points for their own work."
    }
  },
  {
    id: "llm-why-systems-matter",
    label: "Page 9 of 10",
    title: "Why Systems Matter More Than Single Prompts",
    summary: "Retrieval, tools, memory, validation, human review, and workflow design turn a model into a useful system.",
    cards: {
      coreIdea: [
        "A single prompt gives you a single answer — a system gives you a reliable workflow",
        "Retrieval (RAG) grounds the model in real, current data instead of relying on training memory",
        "Tools let the model take actions: search, calculate, look up records, send messages",
        "Validation, human review, and governance ensure the output is safe, correct, and accountable"
      ],
      establishes: "This is the conceptual bridge between the LLM fundamentals and the rest of the course. It previews context engineering, Codex, RAG, tools, OpenClaw, and pilot design without jumping into any one topic.",
      takeaways: [
        "A model generates language — a system gets real work done",
        "The reliable unit is: model + context + tools + validation + human review",
        "Every later chapter in this course adds a layer to this system model",
        "Start thinking in workflows, not in prompts"
      ],
      whyItMatters: "This is the single most important idea in the course. Teams that understand systems build useful AI. Teams that stop at prompts build impressive demos that do not survive contact with reality."
    }
  },
  {
    id: "llm-bridge-to-course",
    label: "Page 10 of 10",
    title: "Bridge to the Rest of the Course",
    summary: "From foundations to practical use: what comes next and why it matters.",
    cards: {
      coreIdea: [
        "Next: Context Engineering and Prompting — how to give the model enough structure to be useful",
        "Then: Codex — an AI coding agent that runs inside your repo with validation and governance",
        "Then: AI Systems, RAG, Tools, and Orchestration — building systems that stay connected to reality",
        "Finally: Pilot Blueprint — designing one realistic AI adoption plan with controls, metrics, and ownership"
      ],
      establishes: "This page connects the foundational chapter to the rest of the programme. Learners leave this chapter knowing what they know, what they are about to learn, and why the sequence matters.",
      takeaways: [
        "You now have the mental model — the rest of the course makes it practical",
        "Context engineering is about giving the model better inputs, not just hoping for better outputs",
        "Codex and OpenClaw show how AI agents and orchestration work inside real workflows",
        "The capstone turns this knowledge into one actionable pilot for your team"
      ],
      whyItMatters: "A strong bridge reduces learner anxiety and prevents the feeling of 'information overload.' It turns a list of topics into a coherent journey."
    }
  }
];

export const codexSubtopics: CodexSubtopic[] = [
  {
    id: "codex-what-it-is",
    label: "Subtopic 1 of 7",
    title: "What Codex Is in Practice",
    summary: "Codex is an AI coding agent that runs in a sandboxed cloud environment, reads your repo, proposes a plan, writes code, runs tests, and returns a diff for human review.",
    cards: {
      coreIdea: [
        "Codex is not autocomplete — it is a cloud-hosted coding agent that works inside your repository",
        "It reads context, proposes changes, executes code, and returns diffs for review",
        "Available via ChatGPT app, VS Code / IDE integration, and CLI",
        "Every task runs in a sandboxed environment with no persistent access to production"
      ],
      establishes: "Codex fits between pair-programming copilot tools and full autonomous coding. It takes a task, works in your repo, and gives back a reviewable result. The human stays in the approval loop.",
      takeaways: [
        "Codex is an agent, not a text-completion tool",
        "It works inside a sandbox with your repo cloned in",
        "Output is always a diff, PR, or patch — never auto-deployed",
        "Three access points: app, IDE, CLI — each suited to different workflows"
      ],
      whyItMatters: "Understanding what Codex actually is prevents two common mistakes: underusing it as a fancy autocomplete, or overusing it as unsupervised automation. Knowing the sandbox model makes governance conversations concrete."
    }
  },
  {
    id: "codex-setup",
    label: "Subtopic 2 of 7",
    title: "Setup and First Run",
    summary: "How to connect Codex to a repository, run your first task, and understand what happens behind the scenes.",
    cards: {
      coreIdea: [
        "Connect Codex to a GitHub repo or local workspace",
        "Start with a small, well-scoped task — not a full feature build",
        "First run: Codex clones the repo, installs dependencies, reads context, then works",
        "Use your first task to verify that Codex can access, build, and test the project correctly"
      ],
      establishes: "A smooth first run builds confidence and surfaces environment issues early. The setup step also teaches the team how Codex reads and processes a codebase before making changes.",
      takeaways: [
        "Always start with a read-only task: ask Codex to explain the codebase or a specific file before editing",
        "Verify that builds, tests, and linting pass in the sandbox before assigning real work",
        "Small first tasks surface setup issues without creating large messes",
        "The first run is your proof that the environment is correctly configured"
      ],
      whyItMatters: "Teams that skip setup verification waste hours debugging environment issues mid-project. A deliberate first-run habit ensures the sandbox matches the real repo."
    }
  },
  {
    id: "codex-operating-loop",
    label: "Subtopic 3 of 7",
    title: "The Everyday Codex Operating Loop",
    summary: "The plan → implement → test → diff → review workflow that makes Codex practical and safe for daily engineering.",
    cards: {
      coreIdea: [
        "Always ask for a plan first: use /plan to see what Codex intends before it changes anything",
        "The core loop: plan → implement → run checks → review diff → approve or revise",
        "Use /status to monitor progress, /diff to inspect changes, /review to request a self-assessment",
        "Think of Codex as a junior engineer who always shows their work before merging"
      ],
      establishes: "The operating loop is the single most important habit. It prevents the most common Codex failure: accepting code without reviewing it because it compiled.",
      takeaways: [
        "Never skip the plan step — it is the cheapest place to catch misunderstanding",
        "/plan → /status → /diff → /review is the daily rhythm",
        "Review the diff, not just the test result — passing tests do not guarantee correct behavior",
        "Treat every Codex output as a pull request, not a finished product"
      ],
      whyItMatters: "Without a consistent operating loop, teams oscillate between over-trusting Codex and abandoning it. The loop creates a repeatable discipline that scales across the organisation."
    }
  },
  {
    id: "codex-configuration",
    label: "Subtopic 4 of 7",
    title: "Configure Codex for Repeatable Team Work",
    summary: "AGENTS.md for durable repo guidance, MCP for external context and tools, skills for reusable workflows, and /model + /permissions for control.",
    cards: {
      coreIdea: [
        "AGENTS.md is a file in your repo root that gives Codex persistent instructions — coding standards, file structure rules, review requirements",
        "MCP (Model Context Protocol) connects Codex to external data sources, tools, and APIs",
        "Skills are packaged, reusable workflows: test suites, deployment steps, migration scripts",
        "Use /model to select the right model tier and /permissions to restrict file and network access"
      ],
      establishes: "Configuration is what separates a one-off experiment from a scalable team tool. AGENTS.md makes Codex behave consistently. MCP makes it context-aware. Skills make workflows repeatable.",
      takeaways: [
        "Write AGENTS.md like onboarding docs for a new developer — clear, specific, and maintained",
        "MCP lets Codex pull from databases, APIs, knowledge bases, and monitoring tools",
        "Package common tasks as skills so any team member can trigger them reliably",
        "Set /permissions per task to enforce least-privilege access"
      ],
      whyItMatters: "Without configuration, every Codex task starts from zero. With it, the team accumulates institutional knowledge in code, and Codex becomes more useful over time rather than staying at demo level."
    }
  },
  {
    id: "codex-validation",
    label: "Subtopic 5 of 7",
    title: "Validation and Review",
    summary: "How to verify Codex output through tests, linting, builds, diff review, and structured acceptance criteria.",
    cards: {
      coreIdea: [
        "Run automated checks first: tests, lint, type checks, and build verification",
        "Review the diff line by line — do not trust passing tests alone",
        "Check for silent regressions: behaviour changes that don't break tests but change outcomes",
        "Require acceptance criteria before starting — define what 'done' looks like before Codex runs"
      ],
      establishes: "Validation is the layer that makes AI-assisted coding safe. Without it, speed becomes a risk multiplier. With it, speed becomes a genuine productivity gain.",
      takeaways: [
        "Always define acceptance criteria before handing a task to Codex",
        "Treat AI-generated code with the same review rigour as code from a new team member",
        "Use /review to ask Codex to self-assess, then verify its self-assessment independently",
        "Add edge-case tests for any logic Codex generates — AI tends to handle the happy path well but miss boundaries"
      ],
      whyItMatters: "The Mars Climate Orbiter was lost because validation gaps survived long enough to become catastrophic. The same principle applies: ambiguity that feels small at the start becomes expensive at the end."
    }
  },
  {
    id: "codex-governance",
    label: "Subtopic 6 of 7",
    title: "Governance and Safe Operation",
    summary: "Approvals, sandboxing, writable roots, network controls, human review checkpoints, and organisational policy.",
    cards: {
      coreIdea: [
        "Every Codex task runs in a sandboxed environment — it cannot touch production, secrets, or external systems without explicit permissions",
        "Set writable roots to limit which directories Codex can modify",
        "Network controls restrict outbound access — Codex cannot call arbitrary endpoints unless allowed",
        "Human review is a governance mechanism, not an optional quality step"
      ],
      establishes: "Governance is what turns Codex from a risky experiment into an approved team tool. Sandboxing and approvals are the technical controls. Policy and review culture are the human controls.",
      takeaways: [
        "Sandbox by default — expand permissions only as trust is earned through validated output",
        "Restrict writable roots so Codex cannot modify config, infrastructure, or deployment files without approval",
        "Disable network access for tasks that don't need it — reduce attack surface",
        "Governance is not about slowing down — it is about making speed safe"
      ],
      whyItMatters: "Organisations that skip governance controls during adoption end up pausing AI tools entirely after the first incident. Building governance in from the start prevents the backlash cycle."
    }
  },
  {
    id: "codex-live-lab",
    label: "Subtopic 7 of 7",
    title: "Guided Live Lab: Run Codex End to End",
    summary: "A structured 20-minute exercise where participants run a complete Codex workflow from setup to reviewed pull request.",
    cards: {
      coreIdea: [
        "Step 1: Connect Codex to the sample repo and verify the build passes",
        "Step 2: Ask Codex to explain the codebase structure before making changes",
        "Step 3: Assign a bounded task — add input validation to an existing API endpoint",
        "Step 4: Review the plan, run checks, inspect the diff, approve or revise"
      ],
      establishes: "The lab turns conceptual knowledge into muscle memory. Participants run the full operating loop once, end-to-end, so they leave with a real experience rather than just slides.",
      takeaways: [
        "Success criteria: build passes, tests pass, diff is reviewed, and the change is correct",
        "Common lab mistakes: skipping the plan step, accepting without diff review, over-scoping the task",
        "Debrief question: what would you change about the workflow for your own team's repo?",
        "Take-home: repeat this exercise with one real task from your own codebase within the next 7 days"
      ],
      whyItMatters: "Reading about Codex is not the same as using Codex. This lab is designed to create one successful experience that participants can replicate independently after the course."
    }
  }
];

export const openclawSubtopics: CodexSubtopic[] = [
  {
    id: "oc-from-models-to-systems",
    label: "Page 1 of 10",
    title: "From Models to Systems",
    summary: "Day 1 focused on models, prompting, and Codex. Day 2 moves up one level into AI systems.",
    cards: {
      coreIdea: [
        "Day 1 taught you what an LLM is, how to prompt it, and how Codex uses it as a bounded coding agent",
        "Day 2 asks: what happens when the AI needs to persist, route, remember, connect to tools, and operate across channels?",
        "The answer is a system — retrieval, tools, memory, sessions, routing, orchestration, safety, and deployment thinking",
        "OpenClaw is the concrete example of this shift: a self-hosted, multi-channel assistant that goes beyond a prompt box"
      ],
      establishes: "This page sets the frame for Day 2. Learners should leave understanding that moving from prompts to systems is the most important step in making AI operationally useful.",
      takeaways: [
        "A model generates text — a system gets real work done",
        "Day 2 covers: retrieval, tools, memory, sessions, routing, orchestration, and safety",
        "OpenClaw is the practical example of what a persistent, self-hosted AI system looks like",
        "By the end of Day 2, you will design a real pilot blueprint"
      ],
      whyItMatters: "Without this frame, Day 2 feels like a collection of topics. With it, every section builds toward one goal: understanding what it takes to deploy AI safely and usefully."
    }
  },
  {
    id: "oc-why-openclaw-exists",
    label: "Page 2 of 10",
    title: "Why OpenClaw Exists",
    summary: "OpenClaw started as a personal project to learn AI and build a genuinely useful assistant.",
    cards: {
      coreIdea: [
        "OpenClaw began as a personal playground — a way to learn AI by building something real and useful",
        "It evolved through earlier names and iterations before becoming OpenClaw",
        "Its purpose is to create an easy-to-use, cross-platform, privacy-conscious, self-hosted AI assistant",
        "Safe defaults, stability, and first-run reliability are not afterthoughts — they are part of the design story"
      ],
      establishes: "Most AI tools are presented without context. Understanding why OpenClaw was built — and what design problems it solves — helps learners evaluate it honestly rather than treating it as a magic product.",
      takeaways: [
        "OpenClaw was designed to solve real problems: persistence, multi-channel access, privacy, and self-hosting",
        "It prioritises safe defaults and beginner-friendly setup over maximum configurability",
        "The project evolved iteratively, not as a single grand design",
        "Understanding the origin helps you assess whether it fits your own needs"
      ],
      whyItMatters: "Trust comes from understanding why a tool exists. Teams adopt tools faster when they understand the design reasoning, not just the feature list."
    }
  },
  {
    id: "oc-architecture-plain-english",
    label: "Page 3 of 10",
    title: "OpenClaw Architecture in Plain English",
    summary: "Gateway, sessions, channels, tools, skills, plugins, and dashboard — explained simply.",
    cards: {
      coreIdea: [
        "The Gateway is the control plane and single source of truth — all messages, routing, and sessions flow through it",
        "Sessions are persistent conversations that can span channels and time — the assistant remembers context across interactions",
        "Tools are the actions the model can call: search, calculate, look up records, send messages, run code",
        "Skills are guidance files (SKILL.md) that teach the agent how and when to use tools — plugins package channels, providers, tools, and skills together"
      ],
      establishes: "This is the mental map learners need before seeing a live demo. Once they understand Gateway → sessions → tools → skills → plugins, the rest of OpenClaw becomes intuitive.",
      takeaways: [
        "Gateway = control plane (single source of truth)",
        "Sessions = persistent conversations across channels",
        "Tools = actions the model can take",
        "Skills = guidance that teaches the agent when and how to act; plugins = packaged bundles of channels, tools, and skills"
      ],
      whyItMatters: "Most AI confusion comes from not knowing what each layer does. This map prevents the 'it is all magic' feeling and enables informed decisions about what to configure."
    }
  },
  {
    id: "oc-easy-setup",
    label: "Page 4 of 10",
    title: "OpenClaw Easy Setup",
    summary: "Install, onboard, verify, open the dashboard, send your first message.",
    cards: {
      coreIdea: [
        "Step 1: Install OpenClaw using the standard installer for your platform",
        "Step 2: Run the onboarding wizard — it configures the Gateway, sets up auth, and creates your first session",
        "Step 3: Verify the Gateway is running — check the status endpoint or dashboard indicator",
        "Step 4: Open the dashboard, send a first message, and confirm the assistant responds"
      ],
      establishes: "This is a confidence-building page. The goal is not deep infrastructure — it is showing that getting started is simple, fast, and works on the first try.",
      takeaways: [
        "OpenClaw is designed for first-run success — the onboarding wizard handles initial setup",
        "You do not need to configure everything before the first message",
        "The dashboard is the operator surface — use it to monitor sessions, review logs, and manage settings",
        "If the first message works, the system is running correctly"
      ],
      whyItMatters: "Many tools fail at first-run. If participants leave the course believing OpenClaw is hard to set up, they will not try it. This page makes the first 10 minutes feel achievable."
    }
  },
  {
    id: "oc-sessions-channels-routing",
    label: "Page 5 of 10",
    title: "Sessions, Channels, and Routing",
    summary: "How OpenClaw maintains continuity across channels and routes requests to the right handler.",
    cards: {
      coreIdea: [
        "A session is a persistent thread — it survives across messages, channels, and time",
        "Channels are surfaces: CLI, web dashboard, Slack, Teams, WhatsApp, or custom integrations",
        "Routing decides which skill, tool, or agent handles a request based on the content and context",
        "One Gateway can serve multiple channels and sessions simultaneously — the user experience is unified"
      ],
      establishes: "This is where OpenClaw differs from a simple chatbot. The ability to maintain session state across channels and route work to the right handler is what makes it a system, not just an interface.",
      takeaways: [
        "Sessions give the assistant memory and continuity — it knows what happened before",
        "Multi-channel means users can interact wherever they already work",
        "Routing is deterministic, not random — the system follows configured rules",
        "This architecture supports team use, not just individual chat"
      ],
      whyItMatters: "Most AI tools lose context between interactions. Sessions and routing solve this — and understanding them helps you design workflows that actually persist."
    }
  },
  {
    id: "oc-tools-skills-plugins",
    label: "Page 6 of 10",
    title: "Tools, Skills, and Plugins",
    summary: "Tools are actions. Skills teach the agent when to act. Plugins package everything together.",
    cards: {
      coreIdea: [
        "Tools give the model the ability to act: fetch data, query APIs, run calculations, send notifications, execute code",
        "Skills are markdown files (SKILL.md) that give the agent structured guidance: when to use a tool, what context to gather, what constraints to follow",
        "Plugins bundle a channel, its tools, its skills, and its provider into one installable package",
        "The dashboard shows which tools and skills are active, letting operators control what the assistant can and cannot do"
      ],
      establishes: "This is where orchestration becomes practical. Skills are not code — they are structured instructions that shape agent behavior without requiring engineering changes.",
      takeaways: [
        "Tools extend what the model can do beyond generating text",
        "Skills extend how the model decides what to do — they are reusable, auditable, and version-controlled",
        "Plugins make distribution and installation simple — one package, everything included",
        "Operators control the boundary: which tools are allowed, which skills are active, and what permissions apply"
      ],
      whyItMatters: "This is the layer most teams miss. They give an AI model access to tools but not guidance on when and how to use them. Skills fill that gap — and they are the key to reliable orchestration."
    }
  },
  {
    id: "oc-safe-defaults-governance",
    label: "Page 7 of 10",
    title: "Safe Defaults and Governance",
    summary: "Loopback-first setup, token auth, pairing, allowlists, and why safe defaults matter.",
    cards: {
      coreIdea: [
        "Default setup binds to loopback/localhost — the assistant is only accessible from the local machine unless you explicitly open it",
        "Token-based authentication ensures only authorized clients can connect to the Gateway",
        "Pairing and allowlist controls define which devices and users can interact with the system",
        "For group or team usage, additional requirements apply: network exposure rules, access controls, and audit logging"
      ],
      establishes: "Security is not an advanced topic — it is the starting point. OpenClaw is designed so that the safe configuration is the default, and you have to make a conscious choice to open it up.",
      takeaways: [
        "Safe defaults mean you start locked down and open up deliberately",
        "Token auth and pairing prevent unauthorized access",
        "Local-first means the system works without internet exposure",
        "When connecting to real channels (Slack, Teams), review what data flows through the Gateway"
      ],
      whyItMatters: "An AI assistant connected to real channels can see real data, take real actions, and make real mistakes. Safe defaults are not optional — they are the foundation of responsible deployment."
    }
  },
  {
    id: "oc-why-not-plain-chat",
    label: "Page 8 of 10",
    title: "Why OpenClaw Instead of Plain Chat",
    summary: "What OpenClaw adds: persistence, sessions, routing, multi-channel, tools, skills, control, and security.",
    cards: {
      coreIdea: [
        "Plain chat: stateless, single-channel, no tools, no routing, no persistence, no operational control",
        "OpenClaw adds: persistent sessions, multi-channel continuity, deterministic routing, tool access, skill guidance",
        "OpenClaw adds: plugin architecture, operator dashboard, security boundaries, audit logging",
        "The difference is not intelligence — it is infrastructure. OpenClaw turns a model into a governed, operational system"
      ],
      establishes: "This is the clearest way to explain the value proposition. If learners can articulate what OpenClaw adds that plain chat does not, they understand why systems matter.",
      takeaways: [
        "Plain chat is fine for one-off questions — it is not enough for operational workflows",
        "Persistence, routing, and tools are what make an assistant useful across a team",
        "Security boundaries and operator control are what make an assistant safe to deploy",
        "OpenClaw is not competing with chat — it is solving a different problem"
      ],
      whyItMatters: "This is the most common context gap. Teams evaluate OpenClaw as 'another chat UI' and miss the point. This comparison makes the value obvious."
    }
  },
  {
    id: "oc-design-exercise",
    label: "Page 9 of 10",
    title: "Guided Design Exercise",
    summary: "Where would OpenClaw fit in a real workflow? Map one use case from your own organisation.",
    cards: {
      coreIdea: [
        "Pick one recurring workflow from your team that involves: receiving a request, gathering context, making a decision, and sending a response",
        "Map it: what triggers the workflow? What context is needed? What tools would the assistant call? Where does a human review?",
        "Ask: does this workflow need persistence, routing, multi-channel access, or tool integration?",
        "If yes — this is a candidate for OpenClaw. If no — a simpler solution might be enough"
      ],
      establishes: "This exercise bridges theory and practice. Participants leave with a concrete workflow map that connects directly to the capstone pilot blueprint.",
      takeaways: [
        "Not every workflow needs orchestration — the exercise helps you identify which ones do",
        "The best candidates have: clear triggers, retrievable context, defined actions, and reviewable outputs",
        "This workflow map becomes the input for your capstone pilot",
        "If you can describe the workflow clearly, you can design the system"
      ],
      whyItMatters: "Theory without application creates passive learning. This exercise forces participants to apply what they learned to their own work, which dramatically increases retention and follow-through."
    }
  },
  {
    id: "oc-bridge-to-capstone",
    label: "Page 10 of 10",
    title: "Bridge to the Capstone",
    summary: "Everything you have learned converges into one deliverable: a realistic AI pilot blueprint.",
    cards: {
      coreIdea: [
        "Day 1 gave you the foundation: what AI is, how to prompt it, and how Codex works as a bounded coding agent",
        "Day 2 showed you the system layer: retrieval, tools, memory, sessions, routing, orchestration, and governance",
        "OpenClaw demonstrated what a self-hosted, multi-channel, governed AI system looks like in practice",
        "Now: design one realistic pilot. Name the workflow, the users, the tools, the controls, the metrics, and the next steps"
      ],
      establishes: "This page completes the Day 2 arc. It connects every prior section to the capstone deliverable, so participants feel prepared rather than overwhelmed.",
      takeaways: [
        "The capstone is not a fantasy — it is a bounded, reviewable, measurable pilot plan",
        "Use the workflow map from the design exercise as your starting point",
        "A good pilot is narrow enough to execute, useful enough to matter, and safe enough to approve",
        "The goal is evidence, not theatre"
      ],
      whyItMatters: "Without a strong bridge, the capstone feels disconnected. With it, participants walk in ready to design — and the quality of their pilot blueprints shows in the output."
    }
  }
];
