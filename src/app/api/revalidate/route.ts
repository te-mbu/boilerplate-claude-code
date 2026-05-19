import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");

  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json(
      { success: false, error: "Invalid secret" },
      { status: 401 }
    );
  }

  try {
    revalidateTag("sanity", "max");
    return NextResponse.json({
      success: true,
      revalidated: true,
      now: Date.now(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Revalidation failed",
      },
      { status: 500 }
    );
  }
}
