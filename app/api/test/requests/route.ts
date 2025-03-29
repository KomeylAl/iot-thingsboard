import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
   try {
     const data = await prisma.testRequests.findMany();
 
     return NextResponse.json(data, { status: 200 });
   } catch (error: any) {
     console.log(error.message);
     return NextResponse.json(
       { message: `Somethings went wrong: ${error.message}` },
       { status: 500 }
     );
   }
 }