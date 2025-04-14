import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token");
  const params = req.nextUrl.searchParams;
  const id = params.get("id");

  try {
    const response = await fetch(
      `${process.env.THINGSBOARD_URL}/api/notification/${id}/read`,
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
        { message: `Error marking noti: ${data}` },
        { status: response.status }
      );
    }
    return NextResponse.json({ message: "Notif marked successfully" }, { status: 200 });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json(
      { message: `Error marking notif: ${error.message}` },
      { status: 500 }
    );
  }
}
