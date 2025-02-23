import { useQuery } from "@tanstack/react-query";

export function useTenantProfiles(pageSize: number = 1, page: number = 0) {
  return useQuery({
    queryKey: ["tenantProfiles"],
    queryFn: async () => {
      const res = await fetch(`/api/sysadmin/tenants/profiles?pageSize=${pageSize}&page=${page}`);
      if (!res.ok) {
        throw new Error("مشکلی در دریافت اطلاعات پیش آمده!");
      }
      return res.json();
    },
  });
}