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
