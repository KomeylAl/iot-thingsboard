import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token");

  try {
    const response = await fetch(
      `${process.env.THINGSBOARD_URL}/api/notifications/read?deliveryMethod=WEB`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token?.value}`,
        },
      }
    );

    if (!response.ok) {
      const data = await response.json();
      return NextResponse.json(
        { message: `Error marking notis: ${data}` },
        { status: response.status }
      );
    }
    return NextResponse.json({ message: "Notifs marked successfully" }, { status: 200 });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json(
      { message: `Error marking notifs: ${error.message}` },
      { status: 500 }
    );
  }
}
