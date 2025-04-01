import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useSyncDevices() {
  return useQuery({
    queryKey: ["syncDevices"],
    queryFn: async () => {
      const res = await fetch("/api/syncronization/devices");
      if (!res.ok) {
        const data = await res.json();
        console.log(data);
        throw new Error("خطا در همگام سازی اطلاعات دستگاه ها");
      }
      toast.success("عملیات موفقت آمیز بود");
      return res.json();
    },
    enabled: false,
  });
}

export function useSyncCustomers(tenantId: string) {
  return useQuery({
    queryKey: ["syncCustomers"],
    queryFn: async () => {
      const res = await fetch(
        `/api/syncronization/customers?tenantId=${tenantId}`
      );
      if (!res.ok) {
        const data = await res.json();
        console.log(data);
        throw new Error("خطا در همگام سازی اطلاعات مشتریان");
      }
      toast.success("عملیات موفقت آمیز بود");
      return res.json();
    },
    enabled: false,
  });
}

export function useSyncAssets(tenantId: string) {
  return useQuery({
    queryKey: ["syncAssets"],
    queryFn: async () => {
      const res = await fetch(
        `/api/syncronization/assets?tenantId=${tenantId}`
      );
      if (!res.ok) {
        const data = await res.json();
        console.log(data);
        throw new Error("خطا در همگام سازی اطلاعات دارایی ها");
      }
      toast.success("عملیات موفقت آمیز بود");
      return res.json();
    },
    enabled: false,
  });
}

export function useSyncTenants() {
  return useQuery({
    queryKey: ["syncTenants"],
    queryFn: async () => {
      const res = await fetch("/api/syncronization/tenants");
      if (!res.ok) {
        const data = await res.json();
        console.log(data);
        throw new Error("خطا در همگام سازی اطلاعات سازمان ها");
      }
      toast.success("عملیات موفقت آمیز بود");
      return res.json();
    },
    enabled: false,
  });
}

export function useSyncTenantProfiles() {
  return useQuery({
    queryKey: ["syncTenantProfiles"],
    queryFn: async () => {
      const res = await fetch("/api/syncronization/profiles/tenants");
      if (!res.ok) {
        const data = await res.json();
        console.log(data);
        throw new Error("خطا در همگام سازی اطلاعات پروفایل ها");
      }
      toast.success("عملیات موفقت آمیز بود");
      return res.json();
    },
    enabled: false,
  });
}

export function useSyncLogs() {
  return useQuery({
    queryKey: ["syncLogs"],
    queryFn: async () => {
      const res = await fetch("/api/syncronization/logs");
      if (!res.ok) {
        const data = await res.json();
        console.log(data);
        throw new Error("خطا در دریافت اطلاعات لاگ ها");
      }
      return res.json();
    },
  });
}