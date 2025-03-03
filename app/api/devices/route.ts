import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const token = req.cookies.get("token");
  try {
    const {
      name,
      label,
      type,
      tenantId,
      additionalInfo: { location, description },
    } = await req.json();

    
    const tenant = await prisma.tenant.findUnique({
      where: { things_id: tenantId }
    });
    
    if (!tenant) {
      return NextResponse.json(
        { message: "No Tenant Found." },
        { status: 400 }
      );
    }

    const response = await fetch(`${process.env.THINGSBOARD_URL}/api/device`, {
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

    const data = await response.json();
    
    await prisma.device.create({
      data: {
        things_id: data.id.id,
        name,
        type,
        tenantId: tenant!.id,
      },
    });

    return NextResponse.json(
      { message: "Device Added Successful" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: `Error adding device: ${error.message}` },
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
    const response = await fetch(
      `${process.env.THINGSBOARD_URL}/api/tenant/devices?pageSize=${pageSize}&page=${page}`,
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
        { message: "Error getting devices" },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: `Error geting devices: ${error.message}` },
      { status: 500 }
    );
  }
}
