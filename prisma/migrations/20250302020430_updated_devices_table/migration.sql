/*
  Warnings:

  - A unique constraint covering the columns `[things_id]` on the table `Device` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `things_id` to the `Device` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Device" ADD COLUMN     "things_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Device_things_id_key" ON "Device"("things_id");
