import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // req.cookies.set("token", "");
    // req.cookies.delete("refreshToken");

    const response = NextResponse.json(
      {message: "Logout successful"},
      { status: 200 }
    );

    response.cookies.delete("token");
    response.cookies.delete("refreshToken");

    return response;

  } catch (error) {
    return NextResponse.json(
      {message: "Something went wrong"},
      { status: 500 }
    );
  }
}
