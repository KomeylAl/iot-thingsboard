-- DropForeignKey
ALTER TABLE "Device" DROP CONSTRAINT "Device_customerId_fkey";

-- AlterTable
ALTER TABLE "Device" ALTER COLUMN "customerId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
