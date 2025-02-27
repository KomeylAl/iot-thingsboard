import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const token = req.cookies.get("token");

  if (!token || !token.value) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const data = await req.json();

  try {
    const {
      id,
      name,
      country,
      state,
      city,
      address,
      address2,
      zip,
      phone,
      email,
      region,
      profile,
      additionalInfo: { description },
      tenantProfileId,
    } = data;

    const response = await fetch(`${process.env.THINGSBOARD_URL}/api/tenant`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token?.value}`,
      },
      body: JSON.stringify({
        id: { id, entityType: "TENANT" },
        title: name,
        country,
        state,
        city,
        address,
        address2,
        zip,
        phone,
        email,
        region,
        profile,
        additionalInfo: { description },
        tenantProfileId,
      }),
    });

    const resBody = JSON.stringify({
      id: { id, entityType: "TENANT" },
      title: name,
      country,
      state,
      city,
      address,
      address2,
      zip,
      phone,
      email,
      region,
      profile,
      additionalInfo: { description },
      tenantProfileId,
    })

    console.log(resBody)

    if (!response.ok) {
      return NextResponse.json(
        { message: "Error adding tenant" },
        { status: response.status }
      );
    }

    const newTenant = await response.json();

    const tenant = await prisma.tenant.findUnique({
      where: { things_id: id }
    });

    if (!tenant) {
      await prisma.tenant.create({
        data: {
          email: email || `no-email-${newTenant.id.id}@example.com`,
          name,
          phone: newTenant.phone,
          things_id: newTenant.id.id,
          planId: 1,
        },
      });
    } else {
      await prisma.tenant.update({
        where: { things_id: id },
        data: {
          email: email || `no-email-${newTenant.id.id}@example.com`,
          name,
          phone: newTenant.phone,
          things_id: newTenant.id.id,
          planId: 1,
        }
      })
    }

    return NextResponse.json(
      { message: "Tenant Added Successful" },
      { status: 201 }
    );
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json(
      { message: `Error adding tenant: ${error.message}` },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  const token = req.cookies.get("token");
  const params = req.nextUrl.searchParams;
  const pageSize = params.get("pageSize") || 1;
  const page = params.get("page") || 0;
  try {
    const newLocalTenants = await prisma.tenant.findMany({
      orderBy: { createdAt: "desc" },
      include: { plan: true },
    });
    const data = {
      data: newLocalTenants,
      totalPages: 0,
      totalElements: newLocalTenants.length,
      hasNext: false,
    };

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error getting tenants" },
      { status: 500 }
    );
  }
}
