import { NextRequest, NextResponse } from "next/server";
import _ from "lodash";
import prisma from "@/utils/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = req.cookies.get("token");
  const { id } = await params;
  try {
    const response = await fetch(
      `${process.env.THINGSBOARD_URL}/api/tenant/${id}/users?pageSize=1000&page=0`,
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
        { message: "Error getting tenant users" },
        { status: response.status }
      );
    }

    const data = await response.json();
    const localTenants = await prisma.tenant.findMany();

    const tbTenantUsers = await Promise.all(
      data.data.map(async (d: any) => {
        const tenant = localTenants.find((t) => t.things_id === d.tenantId?.id);
        return {
          things_id: d.id.id,
          tenantId: tenant?.id,
          firstName: d.firstName,
          lastName: d.lastName,
          email: d.email || `no-email-${d.id.id}@example.com`,
          phone: d.phone || `no-phone-${d.id.id}`,
          role: d.authority,
          createdAt: new Date(d.createdTime),
        };
      })
    );

    const validDevices = tbTenantUsers.filter((d: any) => d.tenantId !== null);

    const localTenantUsers = await prisma.user.findMany();

    const newUsers = _.differenceBy(
      validDevices,
      localTenantUsers,
      "things_id"
    );
    const deletedUsers = _.differenceBy(
      localTenantUsers,
      validDevices,
      "things_id"
    );

    const newUser = newUsers.map((user: any) => {
      return {
        things_id: user.things_id,
        tenantId: user.tenantId,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        role: user.role,
        createdAt: user.createdAt,
      };
    });

    if (newUser.length > 0) {
      await prisma.user.createMany({
        data: newUser,
        skipDuplicates: true,
      });
    }

    if (deletedUsers.length > 0) {
      await prisma.tenant.deleteMany({
        where: {
          things_id: { in: deletedUsers.map((t) => t.things_id) },
        },
      });
    }

    await prisma.syncLog.create({
      data: {
        entity: "user",
        status: "success",
      },
    });

    return NextResponse.json(
      { message: "Users syccessfully got" },
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
