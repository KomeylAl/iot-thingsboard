-- DropForeignKey
ALTER TABLE "Tenant" DROP CONSTRAINT "Tenant_planId_fkey";

-- AddForeignKey
ALTER TABLE "Tenant" ADD CONSTRAINT "Tenant_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE SET NULL ON UPDATE CASCADE;
