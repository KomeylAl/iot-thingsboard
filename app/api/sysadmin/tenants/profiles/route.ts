import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token");
  const params = req.nextUrl.searchParams;
  const pageSize = params.get("pageSize") || 1;
  const page = params.get("page") || 0;
  const textSearch = params.get("textSearch") || "";

  try {
    // 1. گرفتن پروفایل ها از ThingsBoard
    const response = await fetch(
      `${process.env.THINGSBOARD_URL}/api/tenantProfiles?pageSize=${pageSize}&page=${page}&textSearch=${textSearch}&sortProperty=createdTime&sortOrder=DESC`,
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
    const tbProfiles = data.data;

    // 2. گرفتن پروفایل های local
    const localProfiles = await prisma.profile.findMany({
      where: { type: "TENANT" },
    });

    // 3. Map برای سریع پیدا کردن
    const localProfilesMap = new Map(
      localProfiles.map((p) => [p.things_id, p])
    );

    // 4. Merge
    const mergedProfiles = tbProfiles.map((profile: any) => {
      const local = localProfilesMap.get(profile.id.id);

      return {
        id: profile.id.id,
        createdTime: profile.createdTime,
        name: profile.name,
        description: profile.description,
        isolatedTbRuleEngine: profile.isolatedTbRuleEngine,
        default: profile.default,
        profileData: {
          ...profile.profileData,
          ...(typeof local?.config === "object" &&
          local?.config !== null &&
          "unitPrices" in local.config
            ? { unitPrices: (local.config as any).unitPrices }
            : {}),
        },
      };
    });

    const finalData = {
      data: mergedProfiles,
      totalElements: data.totalElements,
      totalPages: data.totalPages,
    };

    return NextResponse.json(finalData, { status: 200 });
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
      unitPrices,
    } = data;

    const id = set_id && { id: set_id, entityType: "TENANT_PROFILE" };

    const profileData = {
      unitPrices,
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
        transportTenantMsgRateLimit: `${limit1}:${interval1},${limit2}:${interval2}`,
        maxDataPointsPerRollingArg: 1,
      },
    };

    const reqData = JSON.stringify({
      id,
      name,
      description,
      profileData,
    });

    const response = await fetch(
      `${process.env.THINGSBOARD_URL}/api/tenantProfile`,
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
        { message: `Error adding profile: ${data}` },
        { status: response.status }
      );
    }

    const resData = await response.json();

    const profile = await prisma.profile.findUnique({
      where: { things_id: resData.id.id },
    });

    if (!profile) {
      await prisma.profile.create({
        data: {
          things_id: resData.id.id,
          name,
          type: "TENANT",
          config: profileData,
        },
      });
    } else {
      await prisma.profile.update({
        where: { things_id: set_id },
        data: {
          things_id: resData.id.id,
          name,
          type: "TENANT",
          config: profileData,
        },
      });
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
