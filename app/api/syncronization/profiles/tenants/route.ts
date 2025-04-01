import { NextRequest, NextResponse } from "next/server";
import _ from "lodash";
import prisma from "@/utils/prisma";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token");
  try {
    const response = await fetch(
      `${process.env.THINGSBOARD_URL}/api/tenantProfiles?pageSize=1000&page=0`,
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
        { message: "Error getting profiles" },
        { status: response.status }
      );
    }

    const data = await response.json();
    const tbProfiles = data.data.map((t: any) => ({
      things_id: t.id.id,
      name: t.name,
      type: "TENANT",
      config: t.profileData,
      createdAt: new Date(t.createdTime),
    }));
    
    const localProfiles = await prisma.profile.findMany();
    
    const newProfiles = _.differenceBy(tbProfiles, localProfiles, "things_id");
    const deletedProfiles = _.differenceBy(localProfiles, tbProfiles, "things_id");
    
    const newProfile = newProfiles.map((profile: any) => {
      return {
        things_id: profile.things_id,
        name: profile.name,
        config: profile.config,
        type: profile.type,
        createdAt: profile.createdAt,
      };
    });

    await prisma.profile.createMany({
      data: newProfile,
      skipDuplicates: true,
    });

    await prisma.profile.deleteMany({
      where: {
        things_id: { in: deletedProfiles.map((t) => t.things_id) },
      },
    });

    await prisma.syncLog.create({
      data: {
        entity: "profile",
        status: "success",
      },
    });

    return NextResponse.json(
      { message: "Profile syccessfully got" },
      { status: 200 }
    );
  } catch (error: any) {
    await prisma.syncLog.create({
      data: {
        entity: "profile",
        status: "error",
      },
    });

    return NextResponse.json(
      { message: `Something went wrong ${error.message}` },
      { status: 500 }
    );
  }
}
