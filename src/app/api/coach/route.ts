import { NextRequest, NextResponse } from "next/server";
import { answerCoach } from "@/lib/coach";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as { question?: string };
  const question = body.question?.trim();

  if (!question) {
    return NextResponse.json(
      { error: "A question is required." },
      { status: 400 },
    );
  }

  try {
    const response = await answerCoach(question);
    return NextResponse.json(response);
  } catch (error) {
    console.error("AI Coach Error:", error);
    return NextResponse.json(
      { error: "Failed to reach the AI Coach. Ensure OPENAI_API_KEY is configured." },
      { status: 500 }
    );
  }
}
