import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Module, StorySection } from "@/types/course";

function getModulesRaw(): Module[] {
  const dir = path.join(process.cwd(), "src/content/modules");
  let files: string[] = [];
  try {
    files = fs.readdirSync(dir);
  } catch (e) {
    return [];
  }
  
  const rawModules = files.filter(f => f.endsWith(".md")).map(file => {
    const content = fs.readFileSync(path.join(dir, file), "utf8");
    const { data } = matter(content);
    return {
      slug: data.slug || file.replace(".md", ""),
      day: Number(data.day),
      order: Number(data.order),
      title: data.title,
      duration: data.duration,
      audience: data.audience,
      objective: data.objective,
      coreIdea: Array.isArray(data.coreIdea) ? data.coreIdea : (data.coreIdea ? [data.coreIdea] : []),
      deliveryLead: data.deliveryLead,
      talkingPoints: Array.isArray(data.talkingPoints) ? data.talkingPoints : [],
      demo: data.demo,
      exercise: data.exercise,
      takeaway: data.takeaway,
      speakerNotes: Array.isArray(data.speakerNotes) ? data.speakerNotes : [],
      downloads: Array.isArray(data.downloads) ? data.downloads : [],
      keywords: Array.isArray(data.keywords) ? data.keywords : []
    } as Module;
  });
  
  return rawModules.sort((a, b) => a.order - b.order);
}

// Simple in-memory cache for development mode to avoid constant fs reads,
// while still allowing process-level caching in production.
let cachedModules: Module[] | null = null;

export function getModules(): Module[] {
  if (cachedModules) return cachedModules;
  cachedModules = getModulesRaw();
  return cachedModules;
}

export function getStorySections(modules: Module[]): StorySection[] {
  return [
    {
      id: "home",
      kind: "hero",
      eyebrow: "A Practical Guide to AI, Codex & OpenClaw",
      title: "Modern AI in Practice",
      summary: "From AI Foundations to Real-World Workflows",
      speakerNote: "Set the tone: calm, practical, and operational.",
    },
    {
      id: "day-1",
      kind: "day-intro",
      eyebrow: "Day 1",
      title: "Foundations and Codex",
      summary: "Establish the AI mental model, teach context engineering, and demonstrate Codex as a governed coding agent.",
      speakerNote: "Move from concepts to one complete product workflow.",
    },
    ...modules.filter(m => m.day === 1).map((module) => ({
      id: module.slug,
      kind: "module" as const,
      eyebrow: `Day ${module.day} / ${module.duration}`,
      title: module.title,
      summary: module.objective,
      moduleSlug: module.slug,
      speakerNote: module.speakerNotes?.[0],
    })),
    {
      id: "day-2",
      kind: "day-intro",
      eyebrow: "Day 2",
      title: "Systems and Orchestration",
      summary: "Connect the model and agent concepts to self-hosted orchestration, routed assistants, and pilot design.",
      speakerNote: "Keep the room focused on systems, not shiny demos.",
    },
    ...modules.filter(m => m.day === 2).map((module) => ({
      id: module.slug,
      kind: "module" as const,
      eyebrow: `Day ${module.day} / ${module.duration}`,
      title: module.title,
      summary: module.objective,
      moduleSlug: module.slug,
      speakerNote: module.speakerNotes?.[0],
    })),
    {
      id: "demos-exercises",
      kind: "demos",
      eyebrow: "Live Facilitation",
      title: "Demos and Guided Exercises",
      summary: "Anchor the course around three live demos and cumulative executive exercises rather than a static deck.",
      speakerNote: "Use the notes panel to keep transitions tight between demo and discussion.",
    },
    {
      id: "downloads",
      kind: "downloads",
      eyebrow: "Course Assets",
      title: "Downloads Hub",
      summary: "Give participants direct access to summaries, facilitator notes, worksheets, templates, and references.",
      speakerNote: "Remind participants that the site replaces the deck and the handout pack.",
    },
    {
      id: "capstone",
      kind: "capstone",
      eyebrow: "Applied Planning",
      title: "Pilot Blueprint",
      summary: "End with one workflow each team could take into a 30-60-90 day adoption conversation.",
      speakerNote: "This section should create action, not just reflection.",
    },
    {
      id: "final",
      kind: "final",
      eyebrow: "Next Move",
      title: "From Curiosity to Pilot",
      summary: "Use the course outputs to align one realistic AI pilot, the controls around it, and the team that owns it.",
      speakerNote: "Close on clear action and where to continue after the session.",
    },
  ];
}
