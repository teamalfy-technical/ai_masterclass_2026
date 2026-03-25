import { downloads, getDownloadById, modules, storySections } from "@/lib/course-data";
import { CoachReply, Module } from "@/types/course";

function scoreText(query: string, values: string[]) {
  const normalized = query.toLowerCase();
  return values.reduce((score, value) => {
    const parts = value.toLowerCase().split(/[\s,./-]+/).filter(Boolean);
    return score + parts.filter((part) => normalized.includes(part)).length;
  }, 0);
}

function pickModule(question: string): Module | undefined {
  return modules
    .map((entry) => ({
      module: entry,
      score: scoreText(question, [
        entry.title,
        entry.objective,
        entry.takeaway,
        ...entry.keywords,
        ...entry.talkingPoints,
      ]),
    }))
    .sort((a, b) => b.score - a.score)[0]?.module;
}

function buildQuiz(module: Module) {
  const bank = [
    {
      question: `What is the main objective of "${module.title}"?`,
      options: [
        module.objective,
        "To teach advanced model training techniques.",
        "To replace human oversight with automated decision making.",
      ],
      answer: module.objective,
    },
    {
      question: `Which takeaway best matches "${module.title}"?`,
      options: [
        module.takeaway,
        "AI systems should always operate without retrieval or tools.",
        "Broad, undefined pilots are the best way to start.",
      ],
      answer: module.takeaway,
    },
  ];

  return bank[module.order % bank.length];
}

function buildGuidance(question: string) {
  const lower = question.toLowerCase();

  if (lower.includes("download") || lower.includes("worksheet") || lower.includes("template")) {
    return {
      answer:
        "Use the Downloads Hub for the course guide, module summaries, facilitator notes, worksheets, blueprint template, and resource sheet.",
      recommendedSectionId: "downloads",
      relatedDownloads: downloads.map((download) => download.id),
    };
  }

  if (lower.includes("next") || lower.includes("where should i start")) {
    return {
      answer:
        "Start with the hero and Day 1 flow if you are new to the course, then use the capstone once you have a candidate pilot in mind.",
      recommendedSectionId: "home",
      relatedDownloads: ["course-guide", "pilot-blueprint"],
    };
  }

  return undefined;
}

export function answerCoach(question: string): CoachReply {
  const guidance = buildGuidance(question);
  if (guidance) {
    return { ...guidance };
  }

  const courseModule = pickModule(question) ?? modules[0];
  const linkedDownload = courseModule.downloads
    .map((downloadId) => getDownloadById(downloadId))
    .find((download) => download?.audience === "learner");
  const recommendedSection =
    storySections.find((section) => section.moduleSlug === courseModule.slug)?.id ??
    courseModule.slug;

  return {
    answer: `${courseModule.title} is the best match for this question. ${courseModule.objective} Focus the discussion on ${courseModule.takeaway.toLowerCase()}`,
    recommendedSectionId: recommendedSection,
    recommendedModuleSlug: courseModule.slug,
    relatedDownloads: linkedDownload ? [linkedDownload.id] : [],
    quiz: buildQuiz(courseModule),
  };
}
