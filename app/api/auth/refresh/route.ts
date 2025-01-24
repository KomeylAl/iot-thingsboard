import type { NextApiRequest } from "next";
import { NextResponse } from "next/server";

interface RefreshResponse {
  token: string;
  refreshToken: string;
}

export default async function POST(req: NextApiRequest) {
  const { refreshToken } = req.body;

  try {
    const response = await fetch("http://62.60.204.234:8081/api/auth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      return NextResponse.json(
         { message: "Failed to refresh token" },
         { status: response.status }
      );
    }

    const data: RefreshResponse = await response.json();

    const cookies = [
      `token=${data.token}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24};`,
      `refreshToken=${data.refreshToken}; HttpOnly; Path=/; Max-Age=${
        60 * 60 * 24 * 30
      };`,
    ].join(", ");

    const headers = new Headers();
    headers.append("Set-Cookie", cookies);

    return NextResponse.json(
      { message: data },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
         { status: 500 }
    );
  }
}
