import { useQuery } from "@tanstack/react-query";

export function useTenants() {
  return useQuery({
    queryKey: ["tenants"],
    queryFn: async () => {
      const res = await fetch("/api/sysadmin/tenants");
      if (!res.ok) {
        throw new Error("مشکلی در دریافت اطلاعات پیش آمده!");
      }
      return res.json();
    },
  });
}

export function useTenant(id: string) {
  return useQuery({
    queryKey: ["tenant"],
    queryFn: async () => {
      const res = await fetch(`/api/sysadmin/tenants/${id}`);
      if (!res.ok) {
        throw new Error("مشکلی در دریافت اطلاعات پیش آمده!");
      }
      return res.json();
    },
  });
}
