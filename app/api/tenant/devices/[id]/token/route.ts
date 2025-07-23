import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = req.cookies.get("token");
  const { id } = await params;

  try {
    const tokenResponse = await fetch(
      `${process.env.THINGSBOARD_URL}/api/device/${id}/credentials`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token?.value}`,
        },
      }
    );

    if (!tokenResponse.ok) {
      return NextResponse.json(
        { message: "Failed to get device credentials" },
        { status: tokenResponse.status }
      );
    }

    const credentials = await tokenResponse.json();

    return NextResponse.json(
      credentials.credentialsId,
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json(
      { message: `Something went wrong: ${error.message}` },
      { status: 500 }
    );
  }
}