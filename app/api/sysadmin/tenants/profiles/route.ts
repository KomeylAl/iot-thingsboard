import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token");
  const params = req.nextUrl.searchParams;
  const pageSize = params.get("pageSize") || 1;
  const page = params.get("page") || 0;
  try {
    const response = await fetch(
      `${process.env.THINGSBOARD_URL}/api/tenantProfiles?pageSize=${pageSize}&page=${page}`,
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
        { message: "Error getting tenant profiles" },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: `Something went wrong: ${error.message}` },
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
      type,
      maxDevices,
      maxAssets,
      maxCustomers,
      maxUsers,
      maxDashboards,
      maxRuleChains,
      maxEmails,
      smsEnabled,
      maxSms,
      limit1,
      interval1,
      limit2,
      interval2,
    } = data;

    const id = set_id && {id: set_id,
      entityType: "TENANT_PROFILE",}

    const reqData = JSON.stringify({
      id,
      name,
      description,
      profileData: {
        configuration: {
          type,
          maxDevices,
          maxAssets,
          maxCustomers,
          maxUsers,
          maxDashboards,
          maxRuleChains,
          maxEmails,
          smsEnabled,
          maxSms,
          transportTenantMsgRateLimit: `${limit1}:${interval1},${limit2}:${interval2}`
        },
      },
    });

    const response = await fetch(`${process.env.THINGSBOARD_URL}/api/tenantProfile`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token?.value}`,
      },
      body: reqData
    });

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
