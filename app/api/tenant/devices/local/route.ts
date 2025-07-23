import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token");
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);

    const skip = (page - 1) * pageSize;

    const [devices, totalCount] = await Promise.all([
      prisma.device.findMany({
        skip,
        take: pageSize,
        orderBy: { createdAt: "desc"},
        include: { customer: true }
      }),
      prisma.device.count(),
    ]);

    return NextResponse.json({
      data: devices,
      meta: {
        totalCount,
        totalPages: Math.ceil(totalCount / pageSize),
        currentPage: page,
        pageSize,
      },
    });
  } catch (error: any) {
    console.log(error.message)
    return NextResponse.json(
      { message: `Something went wrong: ${error.message}` },
      { status: 500 }
    );
  }
}
