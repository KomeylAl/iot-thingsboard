/*
  Warnings:

  - You are about to drop the column `name` on the `Test` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Test" DROP COLUMN "name";

-- CreateTable
CREATE TABLE "TestRequests" (
    "id" SERIAL NOT NULL,
    "phone" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TestRequests_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TestRequests_phone_key" ON "TestRequests"("phone");
