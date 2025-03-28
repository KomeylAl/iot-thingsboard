import prisma from "@/utils/prisma";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";
import requestIp from "request-ip";

export async function POST(req: NextRequest) {
  try {
    const { name, phone, ip } = await req.json();

    if (!name || !phone || !ip) {
      return NextResponse.json({ message: "Bad Request." }, { status: 422 });
    }

    const test = await prisma.test.findUnique({
      where: { phone },
    });

    if (!test) {
      await prisma.test.create({
        data: { ip, name, phone },
      });
    } else {
      await prisma.test.update({
        where: { phone },
        data: { ip },
      });
    }

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
