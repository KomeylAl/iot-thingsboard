import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const token = req.cookies.get("token");
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { name, maxRequestPerHour, maxDevices } = body;

    // بررسی ورودی‌ها
    const maxDevicesInt = Number(maxDevices);
    const maxRequestsInt = Number(maxRequestPerHour);

    // بررسی مقدارهای دریافتی
    if (
      !name ||
      typeof name !== "string" ||
      isNaN(maxDevicesInt) ||
      isNaN(maxRequestsInt)
    ) {
      return NextResponse.json(
        { message: "Invalid input data" },
        { status: 400 }
      );
    }

    // بررسی عدم وجود پلن تکراری
    const existingPlan = await prisma.plan.findUnique({ where: { name } });
    if (existingPlan) {
      return NextResponse.json(
        { message: "Plan already exists" },
        { status: 409 }
      );
    }

    // ایجاد پلن جدید
    await prisma.plan.create({
      data: {
        name,
        maxDevices: maxDevicesInt,
        maxRequestsPerHour: maxRequestsInt,
      },
    });

    return NextResponse.json(
      { message: "Plan Successfully added" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Something went wrong", error: error.message },
      { status: 500 }
    );
  }
}
