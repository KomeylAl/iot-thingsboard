import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token");
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await prisma.request.findMany({
      orderBy: { requestTime: "desc" },
    });

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Something went wrong", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get("token");
  const { deviceId, tenantId } = await req.json();
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const intDeviseId = Number(deviceId);
  const intTenantId = Number(tenantId);

  try {
    const request = await prisma.request.create({
      data: {
        requestType: "TEMP",
        status: "success",
        deviceId: intDeviseId,
        tenantId: intTenantId,
      }
    });

    return NextResponse.json(
      { request },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: `Error getting tenants: ${error.message}` },
      { status: 500 }
    );
  }
}