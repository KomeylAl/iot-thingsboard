import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token");

  try {
    const response = await fetch(
      "http://93.127.180.145:8080/api/audit/logs?pageSize=1000&page=0",
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
        { message: "Error" },
        { status: response.status }
      );
    }

    
    const data = await response.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json(
      { message: `Somethings went wrong: ${error.message}` },
      { status: 500 }
    );
  }
}
