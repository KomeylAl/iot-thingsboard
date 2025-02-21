/*
  Warnings:

  - A unique constraint covering the columns `[things_id]` on the table `Tenant` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[things_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "SyncLog" (
    "id" SERIAL NOT NULL,
    "entity" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL,

    CONSTRAINT "SyncLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tenant_things_id_key" ON "Tenant"("things_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_things_id_key" ON "User"("things_id");
