import { NextRequest, NextResponse } from "next/server";
import { defineKeyword } from "@/lib/glossary";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as { term?: string };
  const term = body.term?.trim();

  if (!term) {
    return NextResponse.json(
      { error: "A term is required." },
      { status: 400 },
    );
  }

  try {
    const result = await defineKeyword(term);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Glossary API Error:", error);
    return NextResponse.json(
      { error: "Failed to generate definition. Ensure OPENAI_API_KEY is configured." },
      { status: 500 },
    );
  }
}
