import { NextRequest, NextResponse } from "next/server";

const getApiPathFromEntity = (entity: string) => {
  switch (entity.toUpperCase()) {
    case "DEVICE":
      return "/api/tenant/devices";
    case "DASHBOARD":
      return "/api/tenant/dashboards";
    case "ASSET":
      return "/api/tenant/assets";
    case "CUSTOMER":
      return "/api/customers";
    case "ENTITY_VIEW":
      return "/api/tenant/entityViews";
    case "USER":
      return "/api/users";
    case "EDGE":
      return "/api/edges";
    case "RULE_CHAIN":
      return "/api/ruleChains";
    // سایر entityها...
    default:
      throw new Error("Invalid entity type");
  }
};

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token");
  const params = req.nextUrl.searchParams;
  const pageSize = params.get("pageSize") || 1;
  const page = params.get("page") || 0;
  const entity = params.get("entity") || "DEVICES";

  let apiPath: string;
  try {
    apiPath = getApiPathFromEntity(entity);
    console.log(apiPath);
  } catch (e) {
    return NextResponse.json({ message: "Invalid entity" }, { status: 400 });
  }

  try {
    const response = await fetch(
      `${process.env.THINGSBOARD_URL}${apiPath}?pageSize=${pageSize}&page=${page}&sortProperty=createdTime&sortOrder=DESC`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token?.value}`,
        },
      }
    );

    if (!response.ok) {
      const data = await response.json();
      console.log(data);
      return NextResponse.json(
        { message: "Error getting devices" },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: `Error geting devices: ${error.message}` },
      { status: 500 }
    );
  }
}
