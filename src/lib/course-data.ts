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
