import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useCustomers(
  pageSize: number = 1,
  page: number = 0,
  textSearch: string = ""
) {
  return useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      const res = await fetch(
        `/api/customers?pageSize=${pageSize}&page=${page}&textSearch=${textSearch}`
      );
      if (!res.ok) {
        throw new Error("مشکلی در دریافت اطلاعات پیش آمده!");
      }
      return res.json();
    },
  });
}

export function useCustomer(customerId: string) {
  return useQuery({
    queryKey: ["customer"],
    queryFn: async () => {
      const res = await fetch(`/api/customers/${customerId}`);
      if (!res.ok) {
        throw new Error("مشکلی در دریافت اطلاعات پیش آمده!");
      }
      return res.json();
    },
  });
}

export function useLocalCustomers() {
  return useQuery({
    queryKey: ["localCustomers"],
    queryFn: async () => {
      const res = await fetch("/api/customers/local");
      if (!res.ok) {
        throw new Error("مشکلی در دریافت اطلاعات پیش آمده!");
      }
      return res.json();
    },
  });
}

export function useUpdateCustomer(onCustomerUpdated: () => void) {
  return useMutation({
    mutationFn: async (customerData: any) => {
      const res = await fetch("/api/customers", {
        method: "POST",
        body: JSON.stringify(customerData),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error("مشکلی در ویرایش مشتری پیش آمده!");
      }
    },
    onError(error) {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("مشتری با موفقیت ویرایش شد");
      onCustomerUpdated();
    },
  });
}

export function useDeleteCustomer(
  customerId: string,
  onDeletedCustomer: () => void
) {
  return useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/customers/${customerId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("مشکلی در حذف مشتری پیش آمده!");
      }
    },
    onError(error) {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("مشتری با موفقت حذف شد");
      onDeletedCustomer();
    },
  });
}

export function useCustomerAlarms(
  customerId: string,
  pageSize: number = 1,
  page: number = 0
) {
  return useQuery({
    queryKey: ["customerAlarms"],
    queryFn: async () => {
      const res = await fetch(
        `/api/customers/${customerId}/alarms?pageSize=${pageSize}&page=${page}`
      );
      if (!res.ok) {
        const data = await res.json();
        throw new Error("مشکلی در دریافت اطلاعات پیش آمده!");
      }
      return res.json();
    },
  });
}

export function useCustomerAudits(
  customerId: string,
  pageSize: number = 1,
  page: number = 0
) {
  return useQuery({
    queryKey: ["customerAudits"],
    queryFn: async () => {
      const res = await fetch(
        `/api/customers/${customerId}/audits?pageSize=${pageSize}&page=${page}`
      );
      if (!res.ok) {
        const data = await res.json();
        throw new Error("مشکلی در دریافت اطلاعات پیش آمده!");
      }
      return res.json();
    },
  });
}

export function useCustomerEvents(
  customerId: string,
  tenantId: string,
  pageSize: number = 1,
  page: number = 0
) {
  return useQuery({
    queryKey: ["customerEvents"],
    queryFn: async () => {
      const res = await fetch(
        `/api/customers/${customerId}/events?tenantId=${tenantId}&pageSize=${pageSize}&page=${page}`
      );
      if (!res.ok) {
        const data = await res.json();
        throw new Error("مشکلی در دریافت اطلاعات پیش آمده!");
      }
      return res.json();
    },
  });
}

export function useCustomerUsers(
  customerId: string,
  pageSize: number = 1,
  page: number = 0
) {
  return useQuery({
    queryKey: ["customerUsers"],
    queryFn: async () => {
      const res = await fetch(
        `/api/customers/${customerId}/users?pageSize=${pageSize}&page=${page}`
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

export function useAddCustomerUser(
  customerId: string,
  onUserAdded: () => void
) {
  return useMutation({
    mutationKey: ["addUser"],
    mutationFn: async function (userData) {
      const res = await fetch(`/api/customers/${customerId}/users`, {
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
      onUserAdded();
    },
  });
}
