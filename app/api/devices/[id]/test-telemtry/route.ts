import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = req.cookies.get("token");
  const { id } = await params;
  const searchParams = req.nextUrl.searchParams;
  const tenantId = searchParams.get("tenantId");
  const temperature = (Math.random() * (30 - 20) + 20).toFixed(2);

  try {
    const tokenResponse = await fetch(
      `${process.env.THINGSBOARD_URL}/api/device/${id}/credentials`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token?.value}`,
        },
      }
    );

    if (!tokenResponse.ok) {
      return NextResponse.json(
        { message: "Failed to get device credentials" },
        { status: tokenResponse.status }
      );
    }

    const credentials = await tokenResponse.json();

    const response = await fetch(
      `${process.env.THINGSBOARD_URL}/api/v1/${credentials.credentialsId}/telemetry`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token?.value}`,
        },
        body: JSON.stringify({ temperature }),
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { message: "Failed to send teemtry data" },
        { status: response.status }
      );
    }

    const tenant = await prisma.tenant.findUnique({
      where: { things_id: tenantId! },
    });

    const device = await prisma.device.findUnique({
      where: { things_id: id },
    });

    await prisma.request.create({
      data: {
        requestType: "telemetry",
        status: "success",
        deviceId: device!.id,
        tenantId: tenant!.id,
      },
    });

    return NextResponse.json(
      { message: "Data sent successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json(
      { message: `Something went wrong: ${error.message}` },
      { status: 500 }
    );
  }
}
