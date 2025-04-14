import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await fetch("/api/auth/user");
      return res.json();
    },
  });
}

export function useLocalTenantsUsers(tenantId: string) {
  return useQuery({
    queryKey: ["localUsers"],
    queryFn: async () => {
      const res = await fetch(`/api/sysadmin/tenants/${tenantId}/users/local`);
      return res.json();
    },
  });
}

export function useAllUsers() {
  return useQuery({
    queryKey: ["localUsers"],
    queryFn: async () => {
      const res = await fetch("/api/users/local");
      return res.json();
    },
  });
}

export function useSyncTenantUsers(tenantId: string) {
  return useQuery({
    queryKey: ["syncTenantUsers"],
    queryFn: async () => {
      const res = await fetch(`/api/syncronization/tenants/${tenantId}/users`);
      if (!res.ok) {
        const data = await res.json();
        throw new Error("خطا در همگام سازی کاربران")
      }
      toast.success("عملیات موفقیت آمیز بود")
      return res.json();
    },
    enabled: false
  });
}

export function useAddUser(tenantId: string) {
  return useMutation({
    mutationKey: ['addUser'],
    mutationFn: async function(userData) {
      const res = await fetch(`/api/sysadmin/tenants/${tenantId}/users`, {
        method: "POST",
        body: JSON.stringify(userData),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error("مشکلی در افزودن پیش آمده!");
      }
    },
    onError(error) {
      toast.error(error.message);
    },
    onSuccess: (response) => {
      toast.success("کاربر با موفقیت افزوده شد");
    },
  });
}
