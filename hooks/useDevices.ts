import { useQuery } from "@tanstack/react-query";

export function useDevices() {
  return useQuery({
    queryKey: ["devices"],
    queryFn: async () => {
      const res = await fetch("/api/devices");
      if (!res.ok) {
        throw new Error("مشکلی در دریافت اطلاعات پیش آمده!");
      }
      return res.json();
    },
  });
}

export function useLocalDevices() {
  return useQuery({
    queryKey: ["localDevices"],
    queryFn: async () => {
      const res = await fetch("/api/devices/local");
      if (!res.ok) {
        throw new Error("مشکلی در دریافت اطلاعات پیش آمده!");
      }
      return res.json();
    },
  });
}

export function useTenantDevices(tenantId: string, pageSize: number, page: number) {
  return useQuery({
    queryKey: ["tenantDevices"],
    queryFn: async () => {
      const res = await fetch(`/api/sysadmin/tenants/${tenantId}/devices?pageSize=${pageSize}&page=${page}`);
      if (!res.ok) {
        throw new Error("مشکلی در دریافت اطلاعات پیش آمده!");
      }
      return res.json();
    },
  });
}