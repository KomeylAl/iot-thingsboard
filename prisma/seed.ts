import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const plans = [
    { name: "Free", maxRequestsPerHour: 100, maxDevices: 3 },
    { name: "Gold", maxRequestsPerHour: 1000, maxDevices: 10 },
  ];

  for (const plan of plans) {
    const existingPlan = await prisma.plan.findFirst({
      where: { name: plan.name },
    });

    if (!existingPlan) {
      await prisma.plan.create({
        data: plan,
      });
      console.log(`✅ پلن '${plan.name}' اضافه شد.`);
    } else {
      console.log(`ℹ️ پلن '${plan.name}' قبلاً وجود دارد.`);
    }
  }
}

main()
  .catch((e) => {
    console.error("❌ خطا در اجرای Seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
