import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const token = req.cookies.get("token");
  try {
    const {
      name,
      label,
      type,
      additionalInfo: { location, description },
    } = await req.json();

    const response = await fetch("http://62.60.204.234:8081/api/device", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token?.value}`,
      },
      body: JSON.stringify({
        name,
        label,
        type,
        additionalInfo: { location, description },
      }),
    });

    if (!response.ok) {
      return NextResponse.json(
         { message: "Error adding device" },
         { status: response.status }
       );
    }

    return NextResponse.json(
      { message: "Device Added Successful" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error adding device" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token");
  const params = req.nextUrl.searchParams;
  const pageSize = params.get("pageSize") || 1;
  const page = params.get("page") || 0;

  try {
    const response = await fetch(`http://62.60.204.234:8081/api/tenant/devices?pageSize=${pageSize}&page=${page}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token?.value}`,
      }
    });

    if (!response.ok) {
      return NextResponse.json(
         { message: "Error getting devices" },
         { status: response.status }
       );
    }
    
    const data = await response.json();

    return NextResponse.json(
      data,
      { status: 200 }
    );
  } catch(error) {
    return NextResponse.json(
      { message: `Error geting devices - ${error}` },
      { status: 500 }
    );
  }
}
