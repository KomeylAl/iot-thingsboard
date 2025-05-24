import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token");
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "10");
  const skip = (page - 1) * pageSize;

  try {
    const [data, total] = await Promise.all([
      prisma.syncLog.findMany({
        orderBy: { timestamp: "desc" },
        skip,
        take: pageSize,
      }),
      prisma.syncLog.count(),
    ]);

    return NextResponse.json(
      {
        data,
        pagination: {
          total,
          page,
          pageSize,
          totalPages: Math.ceil(total / pageSize),
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error.message)
    return NextResponse.json(
      { message: "Something went wrong", error: error.message },
      { status: 500 }
    );
  }
}
