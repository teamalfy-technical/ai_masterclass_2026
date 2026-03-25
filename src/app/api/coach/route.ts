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

  return NextResponse.json(answerCoach(question));
}
