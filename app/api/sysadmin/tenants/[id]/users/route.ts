import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = req.cookies.get("token");
  const { id } = await params;
  const searchParams = req.nextUrl.searchParams;
  const pageSize = searchParams.get("pageSize") || 1;
  const page = searchParams.get("page") || 0;

  try {
    const response = await fetch(
      `${process.env.THINGSBOARD_URL}/api/tenant/${id}/users?pageSize=${pageSize}&page=${page}`,
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
        { message: "Error getting tenant" },
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

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = req.cookies.get("token");
  const { id } = await params;

  const { setId, phone, email, firstName, lastName } = await req.json();
  const userId = setId && setId;

  try {
    const response = await fetch(
      `${process.env.THINGSBOARD_URL}/api/user`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token?.value}`,
        },
        body: JSON.stringify({
          
          tenantId: { id, entityType: "TENANT" },
          phone,
          email,
          firstName,
          lastName,
          authority: "TENANT_ADMIN",
        }),
      }
    );

    const data = await response.json();
    if (!response.ok) {
      return NextResponse.json(
        { message: data },
        { status: response.status }
      );
    }


    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
