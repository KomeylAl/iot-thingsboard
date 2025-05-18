import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = req.cookies.get("token");
  const { id } = await params;
  const searchParams = req.nextUrl.searchParams;
  const tenantId = searchParams.get("tenantId");
  const pageSize = searchParams.get("pageSize") || 1;
  const page = searchParams.get("page") || 0;

  try {
    const response = await fetch(
      `${process.env.THINGSBOARD_URL}/api/customer/${id}/users?pageSize=${pageSize}&page=${page}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token?.value}`,
        },
      }
    );
    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json(
      { message: `Something went wrong: ${error.message}` },
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

  const { setId, phone, email, firstName, lastName, password } =
    await req.json();
  const userId = setId && setId;

  try {
    const response = await fetch(
      `${process.env.THINGSBOARD_URL}/api/user?sendActivationMail=false`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token?.value}`,
        },
        body: JSON.stringify({
          customerId: { id, entityType: "CUSTOMER" },
          phone,
          email,
          firstName,
          lastName,
          authority: "CUSTOMER_USER",
        }),
      }
    );

    if (!response.ok) {
      const data = await response.json();
      console.log(data);
      return NextResponse.json({ message: data }, { status: response.status });
    }

    const data = await response.json();

    const activeResponse = await fetch(
      `${process.env.THINGSBOARD_URL}/api/user/${data.id.id}/activationLink`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token?.value}`,
        },
      }
    );

    if (!activeResponse.ok) {
      const data = await activeResponse.json();
      return NextResponse.json(
        { message: data },
        { status: activeResponse.status }
      );
    }

    const activeLinkData = await activeResponse.text();
    const activationToken = activeLinkData.split("=")[1];

    const activateResponse = await fetch(
      `${process.env.THINGSBOARD_URL}/api/noauth/activate`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token?.value}`,
        },
        body: JSON.stringify({
          activateToken: activationToken,
          password,
        }),
      }
    );

    if (!activateResponse.ok) {
      const data = await activateResponse.json();
      return NextResponse.json(
        { message: data },
        { status: activateResponse.status }
      );
    }

    return NextResponse.json(
      { message: "User added successfuly" },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
