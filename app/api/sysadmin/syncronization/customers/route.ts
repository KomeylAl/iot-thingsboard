import { NextRequest, NextResponse } from "next/server";
import _ from "lodash";
import prisma from "@/utils/prisma";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token");
  const params = req.nextUrl.searchParams;
  const tenantId = params.get("tenantId") || "";
  try {
    const response = await fetch(
      `${process.env.THINGSBOARD_URL}/api/customers?pageSize=1000&page=0`,
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
    const tbCustomers = data.data.map((t: any) => ({
      things_id: t.id.id,
      name: t.name,
      email: t.email || `no-email-${t.id.id}@example.com`,
      createdAt: new Date(t.createdTime),
    }));

    const localCustomers = await prisma.customer.findMany();

    const newCustomers = _.differenceBy(tbCustomers, localCustomers, "things_id");
    const deletedCustomers = _.differenceBy(localCustomers, tbCustomers, "things_id");

    const tenant = await prisma.tenant.findUnique({
      where: { things_id: tenantId }
    });

    const newCustomer = newCustomers.map((customer: any) => {
      return {
        things_id: customer.things_id,
        name: customer.name,
        email: customer.email,
        createdAt: customer.createdAt,
        tenantId: tenant!.id
      };
    });

    await prisma.customer.createMany({
      data: newCustomer,
      skipDuplicates: true,
    });

    await prisma.customer.deleteMany({
      where: {
        things_id: { in: deletedCustomers.map((t) => t.things_id) },
      },
    });

    await prisma.syncLog.create({
      data: {
        entity: "customers",
        status: "success",
      },
    });

    return NextResponse.json(
      { message: "Customers syccessfully got" },
      { status: 200 }
    );
  } catch (error: any) {
    await prisma.syncLog.create({
      data: {
        entity: "customers",
        status: "error",
      },
    });

    return NextResponse.json(
      { message: `Something went wrong ${error.message}` },
      { status: 500 }
    );
  }
}
