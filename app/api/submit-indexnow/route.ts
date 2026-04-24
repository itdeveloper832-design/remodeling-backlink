import { NextRequest, NextResponse } from "next/server";
import { submitToIndexNow, submitSitemapToIndexNow } from "@/lib/indexnow";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "URL parameter is required" }, { status: 400 });
  }

  const success = await submitToIndexNow(url);

  if (success) {
    return NextResponse.json({ message: "Successfully submitted to IndexNow", url });
  } else {
    return NextResponse.json({ error: "Failed to submit to IndexNow" }, { status: 500 });
  }
}

// POST endpoint for daily sitemap submission (e.g., from a cron job)
export async function POST(request: NextRequest) {
  // Optional: Check for an auth header or secret key to prevent abuse
  const authHeader = request.headers.get("authorization");
  const secret = process.env.INDEXNOW_SECRET;

  if (secret && authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const success = await submitSitemapToIndexNow();

  if (success) {
    return NextResponse.json({ message: "Sitemap successfully submitted to IndexNow" });
  } else {
    return NextResponse.json({ error: "Failed to submit sitemap to IndexNow" }, { status: 500 });
  }
}
