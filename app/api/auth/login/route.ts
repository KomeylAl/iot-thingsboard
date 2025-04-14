import { getUserInfo } from "@/actions/get-user-info";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    const response = await fetch(`${process.env.THINGSBOARD_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: response.status }
      );
    }

    const data = await response.json();
    const userInfo = await getUserInfo(data.token);

    if (userInfo.authority !== "TENANT_ADMIN" && userInfo.authority !== "SYS_ADMIN") {
      return NextResponse.json(
         { message: "Access Denied" },
         { status: 403 }
      )
    }

    const cookies = [
      `token=${data.token}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24};`,
      `refreshToken=${data.refreshToken}; HttpOnly; Path=/; Max-Age=${
        60 * 60 * 24 * 30
      };`,
      `role=${userInfo.authority}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24 * 30};`,
    ].join(", ");

    const headers = new Headers();
    headers.append("Set-Cookie", cookies);

    return new NextResponse(JSON.stringify({ message: "Login successful" }), {
      headers,
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: `Something went wrong ${error.message}` },
      { status: 500 }
    );
  }
}
