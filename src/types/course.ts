export type Module = {
  slug: string;
  day: 1 | 2;
  order: number;
  title: string;
  duration: string;
  audience: string;
  objective: string;
  coreIdea: string[];
  deliveryLead?: string;
  talkingPoints: string[];
  demo?: {
    title: string;
    flow: string[];
  };
  exercise?: {
    title: string;
    prompt: string;
    output: string;
  };
  takeaway: string;
  speakerNotes: string[];
  downloads: string[];
  keywords: string[];
};

export type CodexSubtopic = {
  id: string;
  label: string;
  title: string;
  summary: string;
  cards: {
    coreIdea: string[];
    establishes: string;
    takeaways: string[];
    whyItMatters: string;
  };
};

export type DownloadAsset = {
  id: string;
  title: string;
  category: "Learner Pack" | "Facilitator Pack" | "Worksheet" | "Template" | "Resource";
  audience: "learner" | "course-owner";
  description: string;
  file: string;
  type: string;
};

export type StorySection = {
  id: string;
  kind:
    | "hero"
    | "day-intro"
    | "module"
    | "demos"
    | "downloads"
    | "capstone"
    | "final";
  title: string;
  eyebrow: string;
  summary: string;
  moduleSlug?: string;
  speakerNote?: string;
};

export type CoachReply = {
  answer: string;
  recommendedSectionId?: string;
  recommendedModuleSlug?: string;
  relatedDownloads: string[];
  quiz?: {
    question: string;
    options: string[];
    answer: string;
  };
};
