import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token");
  const params = req.nextUrl.searchParams;
  const pageSize = params.get("pageSize") || 1;
  const page = params.get("page") || 0;
  const textSearch = params.get("textSearch") || "";
  const severityList = params.get("severityList") || "";

  try {
    const response = await fetch(
      `${process.env.THINGSBOARD_URL}/api/alarms?pageSize=${pageSize}&page=${page}&textSearch=${textSearch}&severityList=${severityList}&sortProperty=createdTime&sortOrder=DESC`,
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
        { message: "Error getting alarms" },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error getting alarms" },
      { status: 500 }
    );
  }
}
