import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const token = req.cookies.get("token");

  if (!token || !token.value) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const data = await req.json();

  try {
    const {
      set_id,
      name,
      debugMode,
      additionalInfo: { description },
    } = data;

    const id = set_id && { id: set_id, entityType: "RULE_CHAIN" };

    const sendData = JSON.stringify({
      id,
      name,
      debugMode,
      additionalInfo: { description },
    });

    const response = await fetch(
      `${process.env.THINGSBOARD_URL}/api/ruleChain`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token?.value}`,
        },
        body: sendData,
      }
    );

    if (!response.ok) {
      const data = await response.json();
      return NextResponse.json(
        { message: `Error adding rule chain: ${data}` },
        { status: response.status }
      );
    }

    return NextResponse.json(
      { message: "Rule Chain Added Successful" },
      { status: 201 }
    );
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json(
      { message: `Error adding rule chain: ${error.message}` },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token");
  const params = req.nextUrl.searchParams;
  const pageSize = params.get("pageSize") || 1;
  const page = params.get("page") || 0;
  const textSearch = params.get("textSearch") || "";

  try {
    const response = await fetch(
      `${process.env.THINGSBOARD_URL}/api/ruleChains?pageSize=${pageSize}&page=${page}&textSearch=${textSearch}&sortProperty=createdTime&sortOrder=DESC`,
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
