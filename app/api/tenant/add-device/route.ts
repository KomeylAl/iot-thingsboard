import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { token, name, label } = await req.json();

    const sendData = JSON.stringify({
      name,
      label,
    });

    const response = await fetch(`${process.env.THINGSBOARD_URL}/api/device`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: sendData,
    });

    if (!response.ok) {
      const data = await response.json();
      console.log(data);
      return NextResponse.json(
        { message: `Error adding device: ${data.message}` },
        { status: response.status }
      );
    }

    const data = await response.json();

    const tokenResponse = await fetch(
      `${process.env.THINGSBOARD_URL}/api/device/${data.id.id}/credentials`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!tokenResponse.ok) {
      const data = await tokenResponse.json();
      return NextResponse.json(
        { message: `Failed to get device credentials: ${data.message}` },
        { status: tokenResponse.status }
      );
    }

    const credentials = await tokenResponse.json();

    return NextResponse.json(
      { token: credentials.credentialsId },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: `Error adding device: ${error.message}` },
      { status: 500 }
    );
  }
}
