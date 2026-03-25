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
  "ai-landscape-and-systems": {
    title: "The Mechanical Turk",
    image: "/images/stories/mechanical-turk.png",
    storyText:
      "In 1770, Europe became fascinated by a machine called the Mechanical Turk. It looked like an automaton that could play chess against humans and win. Audiences saw gears, cabinets, and apparent mechanical genius. But the machine was a performance. A human chess player was hidden inside, controlling the moves. The reason this story still matters is that it captures something timeless about AI: people are very willing to confuse impressive output with real autonomy.",
    teachingPoint:
      "Before asking whether an AI system is \"intelligent,\" ask what is actually doing the work — a model, a human, a workflow, hidden labor, or some combination.",
    bridgeLine:
      "That's why we start this course by mapping the whole AI system, not just admiring the output.",
  },
  "context-engineering-and-prompting": {
    title: "ELIZA and the Illusion of Being Understood",
    image: "/images/stories/eliza.png",
    storyText:
      "In 1966, Joseph Weizenbaum built ELIZA, a very simple chatbot that mostly reflected a user's words back in the style of a therapist. It was primitive by today's standards. But Weizenbaum later recounted that even his own secretary, who knew it was just a program, asked him to leave the room so she could continue talking to it in private. That's the power of language: people often experience fluency as understanding, even when the system underneath is shallow.",
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
