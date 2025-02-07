/*
  Warnings:

  - Added the required column `things_id` to the `Tenant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `things_id` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tenant" ADD COLUMN     "things_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "things_id" TEXT NOT NULL;
