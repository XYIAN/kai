import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { getKylePrompt } from "@/data/kyleProfile";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required and must be a string" },
        { status: 400 }
      );
    }

    const kylePrompt = getKylePrompt();

    const stream = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: kylePrompt,
        },
        {
          role: "user",
          content: message,
        },
      ],
      stream: true,
      max_tokens: 500,
      temperature: 0.7,
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const text = chunk.choices[0]?.delta?.content || "";
          if (text) {
            controller.enqueue(encoder.encode(text));
          }
        }
        controller.close();
      },
    });

    return new NextResponse(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error: unknown) {
    console.error("Chat API error:", error);

    // Handle specific OpenAI API errors
    const apiError = error as {
      status?: number;
      code?: string;
      message?: string;
    };

    if (apiError?.status === 429 || apiError?.code === "insufficient_quota") {
      return NextResponse.json(
        {
          error:
            "OpenAI API quota exceeded. Please check your billing or try again later.",
          details: "The API key has reached its usage limit.",
        },
        { status: 429 }
      );
    }

    if (apiError?.status === 401) {
      return NextResponse.json(
        {
          error: "Invalid OpenAI API key. Please check your configuration.",
          details: "The API key is invalid or expired.",
        },
        { status: 401 }
      );
    }

    if (apiError?.status === 400) {
      return NextResponse.json(
        {
          error: "Invalid request to OpenAI API.",
          details: apiError.message || "The request format is incorrect.",
        },
        { status: 400 }
      );
    }

    // Generic error for other cases
    return NextResponse.json(
      {
        error: "Failed to process chat request",
        details:
          "An unexpected error occurred while connecting to the AI service.",
      },
      { status: 500 }
    );
  }
}
