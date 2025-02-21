import { NextRequest, NextResponse } from "next/server";
import _ from "lodash";
import prisma from "@/utils/prisma";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token");
  try {
    const response = await fetch(
      `${process.env.THINGSBOARD_URL}/api/devices?pageSize=1000&page=0`,
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
    const tbTenants = data.data.map((t: any) => ({
      things_id: t.id.id,
      name: t.name,
      email: t.email || `no-email-${t.id.id}@example.com`,
      createdAt: new Date(t.createdTime),
      planId: 1,
    }));

    const localTenants = await prisma.tenant.findMany();

    const newTenants = _.differenceBy(tbTenants, localTenants, "things_id");
    const deletedTenants = _.differenceBy(localTenants, tbTenants, "things_id");

    const newTenant = newTenants.map((tenant: any) => {
      return {
        things_id: tenant.things_id,
        name: tenant.name,
        email: tenant.email,
        createdAt: tenant.createdAt,
        planId: tenant.planId,
      };
    });

    await prisma.tenant.createMany({
      data: newTenant,
      skipDuplicates: true,
    });

    await prisma.tenant.deleteMany({
      where: {
        things_id: { in: deletedTenants.map((t) => t.things_id) },
      },
    });

    await prisma.syncLog.create({
      data: {
        entity: "tenant",
        status: "success",
      },
    });

    return NextResponse.json(
      { message: "Tenant syccessfully got" },
      { status: 200 }
    );
  } catch (error: any) {
    await prisma.syncLog.create({
      data: {
        entity: "tenant",
        status: "error",
      },
    });

    return NextResponse.json(
      { message: `Something went wrong ${error.message}` },
      { status: 500 }
    );
  }
}
