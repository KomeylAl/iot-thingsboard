/*
  Warnings:

  - You are about to drop the column `planId` on the `Tenant` table. All the data in the column will be lost.
  - You are about to drop the `Dashboard` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Plan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Test` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TestRequests` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CustomerDashboards` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Dashboard" DROP CONSTRAINT "Dashboard_tenantId_fkey";

-- DropForeignKey
ALTER TABLE "Tenant" DROP CONSTRAINT "Tenant_planId_fkey";

-- DropForeignKey
ALTER TABLE "_CustomerDashboards" DROP CONSTRAINT "_CustomerDashboards_A_fkey";

-- DropForeignKey
ALTER TABLE "_CustomerDashboards" DROP CONSTRAINT "_CustomerDashboards_B_fkey";

-- AlterTable
ALTER TABLE "Tenant" DROP COLUMN "planId";

-- DropTable
DROP TABLE "Dashboard";

-- DropTable
DROP TABLE "Plan";

-- DropTable
DROP TABLE "Test";

-- DropTable
DROP TABLE "TestRequests";

-- DropTable
DROP TABLE "_CustomerDashboards";
