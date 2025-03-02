import { NextRequest, NextResponse } from "next/server";
import _ from "lodash";
import prisma from "@/utils/prisma";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token");

  try {
    const response = await fetch(
      `${process.env.THINGSBOARD_URL}/api/tenant/devices?pageSize=1000&page=0`,
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
        { message: "Error getting devices" },
        { status: response.status }
      );
    }

    const data = await response.json();

    // دریافت همه tenantها از دیتابیس شخصی
    const localTenants = await prisma.tenant.findMany();

    // تبدیل دستگاه‌های ThingsBoard به فرمت دیتابیس ما
    const tbDevices = await Promise.all(
      data.data.map(async (d: any) => {
        const tenant = localTenants.find((t) => t.things_id === d.tenantId?.id);
        const customer = d.customerId?.id
          ? await prisma.customer.findUnique({
              where: { things_id: d.customerId.id },
            })
          : null;

        return {
          name: d.name,
          things_id: d.id.id,
          type: d.type || "Unknown",
          tenantId: tenant?.id || null,
          customerId: customer?.id || null,
          createdAt: new Date(d.createdTime),
        };
      })
    );

    // حذف دستگاه‌هایی که Tenant آن‌ها در دیتابیس ما وجود ندارد
    const validDevices = tbDevices.filter((d: any) => d.tenantId !== null);

    // دریافت دستگاه‌های ذخیره‌شده در دیتابیس شخصی
    const localDevices = await prisma.device.findMany();

    // پیدا کردن دستگاه‌های جدید و دستگاه‌هایی که حذف شده‌اند
    const newDevices = _.differenceBy(
      validDevices,
      localDevices,
      (d: any) => `${d.name}-${d.tenantId}`
    );
    const deletedDevices = _.differenceBy(
      localDevices,
      validDevices,
      (d: any) => `${d.name}-${d.tenantId}`
    );

    // اضافه کردن دستگاه‌های جدید
    if (newDevices.length > 0) {
      await prisma.device.createMany({
        data: newDevices.map((device: any) => ({
          name: device.name,
          things_id: device.things_id,
          type: device.type,
          tenantId: device.tenantId!,
          customerId: device.customerId,
          createdAt: device.createdAt,
        })),
        skipDuplicates: true,
      });
    }

    // حذف دستگاه‌هایی که دیگر در ThingsBoard وجود ندارند
    if (deletedDevices.length > 0) {
      await prisma.device.deleteMany({
        where: {
          name: { in: deletedDevices.map((d) => d.name) },
          tenantId: { in: deletedDevices.map((d) => d.tenantId) },
        },
      });
    }

    // لاگ موفقیت‌آمیز بودن سینک
    await prisma.syncLog.create({
      data: {
        entity: "device",
        status: "success",
      },
    });

    return NextResponse.json(
      { message: "Devices successfully synced" },
      { status: 200 }
    );
  } catch (error: any) {
    // لاگ خطا
    await prisma.syncLog.create({
      data: {
        entity: "device",
        status: "error",
      },
    });

    return NextResponse.json(
      { message: `Something went wrong: ${error.message}` },
      { status: 500 }
    );
  }
}
