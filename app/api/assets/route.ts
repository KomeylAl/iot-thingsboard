import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const token = req.cookies.get("token");
  try {
    const {
      set_id,
      name,
      label,
      type,
      additionalInfo: { description },
      assetProfileId
    } = await req.json();

    const id = set_id && {id: set_id,
      entityType: "ASSET",};

    const sendData = JSON.stringify({
      id,
      name,
      label,
      type,
      additionalInfo: { description },
      assetProfileId: { entityType: "ASSET_PROFILE", id: assetProfileId }
    });

    const response = await fetch(`${process.env.THINGSBOARD_URL}/api/asset`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token?.value}`,
      },
      body: sendData
    });

    if (!response.ok) {
      const data = await response.json();
      console.log(data);
      return NextResponse.json(
         { message: "Error adding asset" },
         { status: response.status }
       );
    }

    return NextResponse.json(
      { message: "Asset Added Successful" },
      { status: 201 }
    );
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json(
      { message: "Error adding asset" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token");
  const params = req.nextUrl.searchParams;
  const pageSize = params.get("pageSize") || 1;
  const page = params.get("page") || 0;

  try {
    const response = await fetch(`${process.env.THINGSBOARD_URL}/api/tenant/assets?pageSize=${pageSize}&page=${page}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token?.value}`,
      }
    });

    if (!response.ok) {
      return NextResponse.json(
         { message: "Error getting assets" },
         { status: response.status }
       );
    }
    
    const data = await response.json();
    console.log(data);

    return NextResponse.json(
      data,
      { status: 200 }
    );
  } catch(error) {
    return NextResponse.json(
      { message: `Error geting assets - ${error}` },
      { status: 500 }
    );
  }
}
