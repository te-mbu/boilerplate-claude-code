import { NextResponse } from "next/server";
import { newsletterSchema } from "@/lib/validation";
import { sendWebhook } from "@/lib/webhooks/send";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = newsletterSchema.parse(body);

    const webhookUrl = process.env.WEBHOOK_NEWSLETTER;
    if (!webhookUrl) {
      console.error("WEBHOOK_NEWSLETTER is not configured");
      return NextResponse.json(
        { success: false, error: "Server configuration error" },
        { status: 500 }
      );
    }

    const result = await sendWebhook(webhookUrl, data);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: "Failed to subscribe" },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true, message: "Subscribed" });
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { success: false, error: "Invalid email" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
