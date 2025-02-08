import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
   const token = req.cookies.get("token");
   const params = req.nextUrl.searchParams;
   const profileId = params.get("profileId");
   try {
      const response = await fetch(`${process.env.THINGSBOARD_URL}/api/tenantProfile/${profileId}`, {
         method: "GET",
         headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token?.value}`
         }
      });

      if (!response.ok) {
         return NextResponse.json(
            { message: "Error getting tenant profile" },
            { status: response.status }
         );
      }

      const data = await response.json();

      return NextResponse.json(
         {data},
         { status: 200 }
      );
   } catch (error) {
      return NextResponse.json(
         { message: "Something went wrong" },
         { status: 500 }
      );
   }
}