// app/api/tb-proxy/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const tbBaseUrl = process.env.THINGSBOARD_URL!;
  const path = req.nextUrl.searchParams.get("path");

  if (!path) {
    return NextResponse.json({ error: "Missing path" }, { status: 400 });
  }

  const targetUrl = `${tbBaseUrl}/${path}`;

  try {
    const tbRes = await fetch(targetUrl, {
      method: "GET",
      headers: {
        // توجه: این کوکی باید شامل توکن ThingsBoard باشه!
        Cookie: req.headers.get("cookie") || "",
      },
    });

    const contentType = tbRes.headers.get("content-type") || "application/octet-stream";
    const buffer = await tbRes.arrayBuffer();

    return new NextResponse(buffer, {
      status: tbRes.status,
      headers: {
        "content-type": contentType,
        "cache-control": "public, max-age=3600",
      },
    });
  } catch (e) {
    return NextResponse.json({ error: "Fetch failed", details: (e as Error).message }, { status: 500 });
  }
}
