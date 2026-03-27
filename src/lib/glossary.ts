import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

export async function defineKeyword(term: string): Promise<{ term: string; definition: string }> {
  const { object } = await generateObject({
    model: openai("gpt-4o-mini"),
    system: `You are a concise AI glossary assistant for the Ananseum "Modern AI in Practice" course.
The course covers: AI foundations, context engineering / prompting, Codex (AI coding agent), RAG / tools / memory / evaluation, OpenClaw orchestration, and pilot blueprint design.

When given a keyword or phrase, return a clear, practical definition in 2–3 sentences. Write for a professional audience that may be new to AI. Use plain language, avoid hype, and ground the definition in how the term is used in real workflows.`,
    prompt: `Define: "${term}"`,
    schema: z.object({
      term: z.string(),
      definition: z.string(),
    }),
  });

  return { term: object.term, definition: object.definition };
}
