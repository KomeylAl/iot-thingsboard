import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "";
  const cleanIp = ip.replace(/^::ffff:/, "");

  try {
    const { phone } = await req.json();

    if (!phone || !cleanIp) {
      return NextResponse.json({ message: "Bad Request." }, { status: 422 });
    }

    const test = await prisma.test.findUnique({
      where: { phone },
    });

    if (!test) {
      await prisma.test.create({
        data: { ip: cleanIp, phone },
      });
    } else {
      await prisma.test.update({
        where: { phone },
        data: { ip: cleanIp },
      });
    }

    await prisma.testRequests.create({
      data: { ip: cleanIp, phone },
    });

    return NextResponse.json({ message: "OK" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: `Something went wrong: ${error.message}` },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const data = await prisma.test.findMany();

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json(
      { message: `Somethings went wrong: ${error.message}` },
      { status: 500 }
    );
  }
}
