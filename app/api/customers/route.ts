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
      set_id,
      title,
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
    } = data;

    const id = set_id && { id: set_id, entityType: "CUSTOMER" };

    const sendData = JSON.stringify({
      id,
      title,
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
    });

    const response = await fetch(
      `${process.env.THINGSBOARD_URL}/api/customer`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token?.value}`,
        },
        body: sendData,
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { message: "Error adding customer" },
        { status: response.status }
      );
    }

    const newCustomer = await response.json();

    const customer = await prisma.customer.findUnique({
      where: { things_id: newCustomer.id.id },
    });

    const tenant = await prisma.tenant.findUnique({
      where: { things_id: newCustomer.tenantId.id },
    });

    if (!customer) {
      await prisma.customer.create({
        data: {
          email: email || `no-email-${newCustomer.id.id}@example.com`,
          name: title,
          tenantId: tenant!.id,
          things_id: newCustomer.id.id,
        },
      });
    } else {
      await prisma.customer.update({
        where: { things_id: set_id },
        data: {
          email: email || `no-email-${newCustomer.id.id}@example.com`,
          name: title,
          tenantId: tenant!.id,
          things_id: newCustomer.id.id,
        },
      });
    }

    return NextResponse.json(
      { message: "Customer Added Successful" },
      { status: 201 }
    );
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json(
      { message: `Error adding Customer: ${error.message}` },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token");
  const params = req.nextUrl.searchParams;
  const pageSize = params.get("pageSize") || 1;
  const page = params.get("page") || 0;
  const textSearch = params.get("textSearch") || "";

  try {
    const response = await fetch(
      `${process.env.THINGSBOARD_URL}/api/customers?pageSize=${pageSize}&page=${page}&textSearch=${textSearch}`,
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
        { message: "Error getting tenant customers" },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
