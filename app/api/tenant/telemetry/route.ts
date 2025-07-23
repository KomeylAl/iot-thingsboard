import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const token = req.cookies.get("token");
  const params = req.nextUrl.searchParams;
  const id = params.get("id") || "";
  const key = params.get("key") || "";

  const now = Date.now();
  const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;

  const startTs = sevenDaysAgo;
  const endTs = now;

  if (!token || !token.value) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const response = await fetch(
      `${process.env.THINGSBOARD_URL}/api/plugins/telemetry/DEVICE/${id}/values/timeseries?keys=${key}&startTs=${"1751379732000"}&endTs=${endTs}&interval=0&limit=100&useStrictDataTypes=false`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token?.value}`,
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { message: "Error getting telemetries" },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: `Error geting telemetries: ${error.message}` },
      { status: 500 }
    );
  }
}
