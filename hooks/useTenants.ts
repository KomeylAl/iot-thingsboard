import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

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

export function useLocalTenant(id: string) {
  return useQuery({
    queryKey: ["localTenant"],
    queryFn: async () => {
      const res = await fetch(`/api/sysadmin/tenants/${id}/local`);
      if (!res.ok) {
        throw new Error("مشکلی در دریافت اطلاعات پیش آمده!");
      }
      return res.json();
    },
  });
}

export function useDeleteTenant(tenantId: string, onDeletedTenant: () => void) {
  return useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/sysadmin/tenants/${tenantId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("مشکلی در حذف سازمان پیش آمده!");
      }
    },
    onError(error) {
      toast.error(error.message);
      console.log(error);
    },
    onSuccess: () => {
      toast.success("سازمان با موفقت حذف شد");
      onDeletedTenant();
    },
  });
}

export function useUpdateTenant(onTenantUpdated: () => void) {
  return useMutation({
    mutationFn: async (tenantData: any) => {
      const res = await fetch("/api/sysadmin/tenants/", {
        method: "POST",
        body: JSON.stringify(tenantData),
      });
      if (!res.ok) {
        const data = await res.json();
        console.log(data)
        throw new Error("مشکلی در ویرایش سازمان پیش آمده!");
      }
    },
    onError(error) {
      toast.error(error.message);
      console.log(error);
    },
    onSuccess: () => {
      toast.success("سازمان با ویرایش حذف شد");
      onTenantUpdated();
    },
  });
}
