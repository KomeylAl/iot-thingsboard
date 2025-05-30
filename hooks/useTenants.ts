import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useTenants(
  pageSize: number = 1,
  page: number = 0,
  textSearch: string = ""
) {
  return useQuery({
    queryKey: ["tenants", page, pageSize],
    queryFn: async () => {
      const res = await fetch(
        `/api/sysadmin/tenants?page=${page}&pageSize=${pageSize}&textSearch=${textSearch}`
      );
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
        throw new Error("مشکلی در ویرایش سازمان پیش آمده!");
      }
    },
    onError(error) {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("سازمان با ویرایش حذف شد");
      onTenantUpdated();
    },
  });
}

export function useTenantUsers(
  tenantId: string,
  pageSize: number = 1,
  page: number = 0
) {
  return useQuery({
    queryKey: ["tenantUsers"],
    queryFn: async () => {
      const res = await fetch(
        `/api/sysadmin/tenants/${tenantId}/users?pageSize=${pageSize}&page=${page}`
      );
      if (!res.ok) {
        const data = await res.json();
        throw new Error("مشکلی در دریافت اطلاعات پیش آمده!");
      }
      const data = await res.json();
      return data;
    },
  });
}

export function useTenantAlarms(
  tenantId: string,
  pageSize: number = 1,
  page: number = 0
) {
  return useQuery({
    queryKey: ["tenantAlarms"],
    queryFn: async () => {
      const res = await fetch(
        `/api/sysadmin/tenants/${tenantId}/alarms?pageSize=${pageSize}&page=${page}`
      );
      if (!res.ok) {
        const data = await res.json();
        throw new Error("مشکلی در دریافت اطلاعات پیش آمده!");
      }
      return res.json();
    },
  });
}

export function useTenantAudits(
  tenantId: string,
  pageSize: number = 1,
  page: number = 0
) {
  return useQuery({
    queryKey: ["tenantAudits"],
    queryFn: async () => {
      const res = await fetch(
        `/api/sysadmin/tenants/${tenantId}/audits?pageSize=${pageSize}&page=${page}`
      );
      if (!res.ok) {
        const data = await res.json();
        throw new Error("مشکلی در دریافت اطلاعات پیش آمده!");
      }
      return res.json();
    },
  });
}
