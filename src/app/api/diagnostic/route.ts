import { NextResponse } from "next/server";
import { diagnosticSchema } from "@/lib/validation";
import { sendWebhook } from "@/lib/webhooks/send";

function calculateScore(
  answers: { questionId: string; value: string | string[] }[]
): number {
  return answers.reduce((sum, answer) => {
    const val = answer.value;
    if (typeof val === "string") {
      const num = parseInt(val, 10);
      return sum + (isNaN(num) ? 0 : num);
    }
    // For array values, sum each numeric entry
    return (
      sum +
      val.reduce((acc, v) => {
        const num = parseInt(v, 10);
        return acc + (isNaN(num) ? 0 : num);
      }, 0)
    );
  }, 0);
}

function categorizeScore(score: number): {
  category: string;
  recommendations: string[];
} {
  if (score >= 80) {
    return {
      category: "Advanced",
      recommendations: [
        "You are well-positioned — focus on scaling and optimization.",
        "Consider advanced automation strategies.",
        "Explore partnership and growth opportunities.",
      ],
    };
  }
  if (score >= 50) {
    return {
      category: "Intermediate",
      recommendations: [
        "Solidify your foundations before scaling further.",
        "Invest in process documentation and tooling.",
        "Consider professional guidance for key growth areas.",
      ],
    };
  }
  return {
    category: "Beginner",
    recommendations: [
      "Start with the fundamentals — build a strong base.",
      "Focus on one priority area at a time.",
      "A guided strategy session could accelerate your progress.",
    ],
  };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = diagnosticSchema.parse(body);

    const score = calculateScore(data.answers);
    const { category, recommendations } = categorizeScore(score);

    const webhookUrl = process.env.WEBHOOK_DIAGNOSTIC;
    if (webhookUrl) {
      await sendWebhook(webhookUrl, {
        ...data,
        score,
        category,
      });
    }

    return NextResponse.json({
      success: true,
      result: {
        score,
        maxScore: 100,
        category,
        recommendations,
      },
    });
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { success: false, error: "Invalid diagnostic data" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
