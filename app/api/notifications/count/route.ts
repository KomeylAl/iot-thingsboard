import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token");

  try {
    const response = await fetch(
      `${process.env.THINGSBOARD_URL}/api/notifications/unread/count?deliveryMethod=WEB`,
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
        { message: "Error getting devices" },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: `Error geting devices: ${error.message}` },
      { status: 500 }
    );
  }
}