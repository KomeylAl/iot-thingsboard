import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
   const token = req.cookies.get("token");
   const { id } = await params;
   if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
  
    try {
      const data = await prisma.tenant.findUnique({
        where: {
         things_id: id
        }
      });
  
      return NextResponse.json(data, { status: 200 });
    } catch (error: any) {
      return NextResponse.json(
        { message: "Something went wrong", error: error.message },
        { status: 500 }
      );
    }
}