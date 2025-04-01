import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const token = req.cookies.get("token");
  const params = req.nextUrl.searchParams;
  const id = params.get("id") || "";

  if (!token || !token.value) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
   const response = await fetch(
     `${process.env.THINGSBOARD_URL}/api/plugins/telemetry`,
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
       { message: "Error getting rule chains" },
       { status: response.status }
     );
   }

   const data = await response.json();

   return NextResponse.json(data, { status: 200 });
 } catch (error: any) {
   return NextResponse.json(
     { message: `Error geting rule chains: ${error.message}` },
     { status: 500 }
   );
 }
}
