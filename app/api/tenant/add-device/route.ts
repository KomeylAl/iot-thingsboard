import { getUserInfo } from "@/actions/get-user-info";
import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const {
      token,
      name,
      label,
      type,
      additionalInfo: { location, description },
    } = await req.json();

    const userInfo = await getUserInfo(token);

    const tenant = await prisma.tenant.findUnique({
      where: { things_id: userInfo.tenantId.id },
    });

    if (!tenant) {
      return NextResponse.json(
        { message: "No Tenant Found." },
        { status: 404 }
      );
    }


    const sendData = JSON.stringify({
      name,
      label,
      type,
      additionalInfo: { location, description },
    });

    const response = await fetch(`${process.env.THINGSBOARD_URL}/api/device`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token?.value}`,
      },
      body: sendData,
    });

    if (!response.ok) {
      return NextResponse.json(
        { message: "Error adding device" },
        { status: response.status }
      );
    }

    const data = await response.json();

    const device = await prisma.device.findUnique({
      where: { things_id: data.id.id },
    });

    if (!device) {
      await prisma.device.create({
        data: {
          things_id: data.id.id,
          name,
          type,
          tenantId: tenant!.id,
        },
      });
    }

    const tokenResponse = await fetch(
      `${process.env.THINGSBOARD_URL}/api/device/${data.id.id}/credentials`,
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