interface WebhookPayload {
  [key: string]: unknown;
}

interface WebhookResult {
  success: boolean;
  status?: number;
  error?: string;
}

export async function sendWebhook(
  url: string,
  payload: WebhookPayload
): Promise<WebhookResult> {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...payload,
        timestamp: new Date().toISOString(),
        source: process.env.NEXT_PUBLIC_SITE_URL || "unknown",
      }),
    });

    return {
      success: response.ok,
      status: response.status,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
