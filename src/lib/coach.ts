import { downloads } from "@/lib/course-data";
import { getModules } from "@/lib/course-parser";
import { CoachReply } from "@/types/course";
import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

export async function answerCoach(question: string): Promise<CoachReply> {
  const modules = getModules();

  const contextStr = modules.map(m => `Module: ${m.title} (Slug: ${m.slug})\nObjective: ${m.objective}\nTakeaway: ${m.takeaway}\n`).join("\n");
  const downloadNames = downloads.map(d => `${d.title} (ID: ${d.id})`).join(", ");

  const { object } = await generateObject({
    model: openai("gpt-4o-mini"),
    system: `You are the AI Quiz Coach for the Ananseum "Modern AI in Practice" course.
Answer the user's question directly, clearly, and concisely. Keep your tone calm, practical, and operational.
Use the course context below to ground your answer:
${contextStr}

Available downloads: ${downloadNames}

You must return a JSON object with:
- answer: Your verbal response to the question.
- recommendedSectionId: (optional) The slug of the module most relevant to the user's question, or "downloads" if they ask about worksheets/templates, or "home" if they ask where to start.
- recommendedModuleSlug: (optional) Same as recommendedSectionId if it matches a module exactly.
- relatedDownloads: an array of string IDs from the available downloads that match. Use [] if none.
- quiz: (optional) a multiple-choice question to test their understanding of the topic, containing 'question', 'options' (array of strings), and 'answer'.`,
    prompt: question,
    schema: z.object({
      answer: z.string(),
      recommendedSectionId: z.string().optional(),
      recommendedModuleSlug: z.string().optional(),
      relatedDownloads: z.array(z.string()),
      quiz: z.object({
        question: z.string(),
        options: z.array(z.string()),
        answer: z.string(),
      }).optional(),
    }),
  });

  return object as CoachReply;
}
