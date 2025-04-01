import { NextRequest, NextResponse } from "next/server";
import _ from "lodash";
import prisma from "@/utils/prisma";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token");
  const params = req.nextUrl.searchParams;
  const tenantId = params.get("tenantId") || "";
  try {
    const response = await fetch(
      `${process.env.THINGSBOARD_URL}/api/tenant/assets?pageSize=1000&page=0`,
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
        { message: "Error getting assets" },
        { status: response.status }
      );
    }

    const data = await response.json();
    const tbAssets = data.data.map((t: any) => ({
      things_id: t.id.id,
      name: t.name,
      type: t.type || `no-type-${t.id.id}`,
      createdAt: new Date(t.createdTime),
    }));

    const localAssets = await prisma.asset.findMany();

    const newAssets = _.differenceBy(tbAssets, localAssets, "things_id");
    const deletedAssets = _.differenceBy(localAssets, tbAssets, "things_id");

    const tenant = await prisma.tenant.findUnique({
      where: { things_id: tenantId }
    });

    const newCustomer = newAssets.map((asset: any) => {
      return {
        things_id: asset.things_id,
        name: asset.name,
        type: asset.type,
        createdAt: asset.createdAt,
        tenantId: tenant!.id
      };
    });

    await prisma.asset.createMany({
      data: newCustomer,
      skipDuplicates: true,
    });

    await prisma.asset.deleteMany({
      where: {
        things_id: { in: deletedAssets.map((t) => t.things_id) },
      },
    });

    await prisma.syncLog.create({
      data: {
        entity: "assets",
        status: "success",
      },
    });

    return NextResponse.json(
      { message: "Assets syccessfully got" },
      { status: 200 }
    );
  } catch (error: any) {
    await prisma.syncLog.create({
      data: {
        entity: "assets",
        status: "error",
      },
    });

    return NextResponse.json(
      { message: `Something went wrong ${error.message}` },
      { status: 500 }
    );
  }
}
