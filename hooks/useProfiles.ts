import { useQuery } from "@tanstack/react-query";

export function useTenantProfiles() {
  return useQuery({
    queryKey: ["tenantProfiles"],
    queryFn: async () => {
      const res = await fetch("/api/sysadmin/tenants/profiles?pageSize=100&page=0");
      if (!res.ok) {
        throw new Error("مشکلی در دریافت اطلاعات پیش آمده!");
      }
      return res.json();
    },
  });
}