import { getUserInfo } from "@/actions/get-user-info";
import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { token, name, label } = await req.json();

    const userInfo = await getUserInfo(token);

    if (!userInfo) {
      return NextResponse.json(
        { message: "Token has expired." },
        { status: 401 }
      );
    }

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

    const device = await prisma.device.findUnique({
      where: { things_id: data.id.id },
    });

    if (!device) {
      await prisma.device.create({
        data: {
          things_id: data.id.id,
          name,
          type: data.type,
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
