/*
  Warnings:

  - A unique constraint covering the columns `[things_id]` on the table `Asset` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `things_id` to the `Asset` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Asset" ADD COLUMN     "things_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Asset_things_id_key" ON "Asset"("things_id");
