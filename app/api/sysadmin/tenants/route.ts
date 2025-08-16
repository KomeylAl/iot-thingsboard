import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const token = req.cookies.get("token");
  try {
    const {
      title,
      country,
      city,
      address,
      address2,
      zip,
      phone,
      region,
      email,
      additionalInfo: {description},
      tenantProfileId: {
        id
      },
    } = await req.json();

    const sendData = JSON.stringify({
      title,
      country,
      city,
      address,
      address2,
      zip,
      phone,
      region,
      email,
      additionalInfo: {description},
      tenantProfileId: id ? {
        id, entityType: "TENANT_PROFILE"
      } : null,
    });

    const response = await fetch(`${process.env.THINGS_BOARD_URL}/api/tenant`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token?.value}`,
      },
      body: sendData,
    });

    if (!response.ok) {
      const data = await response.json();
      return NextResponse.json(
          {message: data?.message ?? data},
          {status: response.status}
      );
    }

    const data = await response.json();
    const tenant = await prisma.tenant.findUnique({where: {things_id: data.id.id}});

    if (!tenant) {
      await prisma.tenant.create({
        data: {
          email,
          phone,
          name: title,
          things_id: data.id.id
        }
      })
    }

    return NextResponse.json(
        data,
        {status: 201}
    );
  } catch (error) {
    return NextResponse.json(
        {message: `Something went wrong: ${error}`},
        {status: 500}
    );
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  const token = req.cookies.get("token");
  const params = req.nextUrl.searchParams;
  const pageSize = params.get("pageSize") || 1;
  const page = params.get("page") || 0;
  const textSearch = params.get("textSearch") || "";

  try {
    const response = await fetch(
      `${process.env.THINGSBOARD_URL}/api/tenants?pageSize=${pageSize}&page=${page}&textSearch=${textSearch}&sortProperty=createdTime&sortOrder=DESC`,
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
        { message: "Error getting tenants" },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error getting tenants" },
      { status: 500 }
    );
  }
}
