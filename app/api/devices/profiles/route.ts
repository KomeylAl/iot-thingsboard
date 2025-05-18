import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token");
  const params = req.nextUrl.searchParams;
  const pageSize = params.get("pageSize") || 1;
  const page = params.get("page") || 0;
  const textSearch = params.get("textSearch") || "";
  try {
    const response = await fetch(
      `${process.env.THINGSBOARD_URL}/api/deviceProfiles?pageSize=${pageSize}&page=${page}&textSearch=${textSearch}&sortProperty=createdTime&sortOrder=DESC`,
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
        { message: "Error getting device profiles" },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error getting device profiles" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get("token");

  if (!token || !token.value) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const data = await req.json();

  try {
    const {
      set_id,
      name,
      description,
      defaultQueueName,
      defaultRuleChainId,
      type,
    } = data;

    const id = set_id && { id: set_id, entityType: "DEVICE_PROFILE" };

    const reqData = JSON.stringify({
      id,
      name,
      description,
      defaultQueueName,
      type: "DEFAULT",
      transportType: "DEFAULT",
      defaultRuleChainId: {
        id: defaultRuleChainId,
        entityType: "RULE_CHAIN",
      },
      profileData: {
        configuration: {
          type: "DEFAULT",
        },
        transportConfiguration: {
          type: "DEFAULT",
          coapDeviceTypeConfiguration: {
            coapDeviceType: "DEFAULT",
          },
        },
      },
    });

    const response = await fetch(
      `${process.env.THINGSBOARD_URL}/api/deviceProfile`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token?.value}`,
        },
        body: reqData,
      }
    );

    if (!response.ok) {
      const data = await response.json();
      console.log(data);
      return NextResponse.json(
        { message: "Error adding profile" },
        { status: response.status }
      );
    }

    return NextResponse.json(
      { message: "Profile Added Successful" },
      { status: 201 }
    );
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json(
      { message: `Error adding profile: ${error.message}` },
      { status: 500 }
    );
  }
}
