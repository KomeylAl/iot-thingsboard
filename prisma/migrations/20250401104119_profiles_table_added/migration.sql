-- CreateEnum
CREATE TYPE "ProfileType" AS ENUM ('DEVICE', 'ASSET', 'TENANT');

-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "things_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "config" JSONB NOT NULL,
    "type" "ProfileType" NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_things_id_key" ON "Profile"("things_id");
