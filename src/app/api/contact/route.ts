import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation";
import { sendWebhook } from "@/lib/webhooks/send";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = contactSchema.parse(body);

    const webhookUrl = process.env.WEBHOOK_CONTACT;
    if (!webhookUrl) {
      console.error("WEBHOOK_CONTACT is not configured");
      return NextResponse.json(
        { success: false, error: "Server configuration error" },
        { status: 500 }
      );
    }

    const result = await sendWebhook(webhookUrl, data);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: "Failed to send message" },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true, message: "Message sent" });
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { success: false, error: "Invalid form data" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
