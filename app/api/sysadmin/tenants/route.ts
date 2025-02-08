import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const token = req.cookies.get("token");
  try {
    const {
      title,
      country,
      state,
      city,
      address,
      address2,
      zip,
      phone,
      email,
      region,
      profile,
      additionalInfo: { description },
    } = await req.json();

    const response = await fetch(`${process.env.THINGSBOARD_URL}/api/tenant`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token?.value}`,
      },
      body: JSON.stringify({
        title,
        country,
        state,
        city,
        address,
        address2,
        zip,
        phone,
        email,
        region,
        profile,
        additionalInfo: { description },
      }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { message: "Error adding tenant" },
        { status: response.status }
      );
    }

    return NextResponse.json(
      { message: "Tenant Added Successful" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error adding tenant" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  const token = req.cookies.get("token");
  const params = req.nextUrl.searchParams;
  const pageSize = params.get("pageSize") || 1;
  const page = params.get("page") || 0;
  try {
    const response = await fetch(`${process.env.THINGSBOARD_URL}/api/tenants?pageSize=${pageSize}&page=${page}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token?.value}`
      }
    })

    if (!response.ok) {
      return NextResponse.json(
        { message: "Error getting tenants" },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(
      data,
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error getting tenants" },
      { status: 500 }
    );
  }
}
