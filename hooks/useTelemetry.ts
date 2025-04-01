import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useKeys(deviceId: string) {
  return useQuery({
    queryKey: ["keys"],
    enabled: false,
    queryFn: async () => {
      const res = await fetch(`/api/telemetry/keys?id=${deviceId}`);
      return res.json();
    },
  });
}

export function useDeleteTenant(deviceId: string) {
  return useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/telemetry?id=${deviceId}`, {
        method: "GET",
      });
      if (!res.ok) {
        throw new Error("مشکلی در دریافت اطلاعات پیش آمده!");
      }
      const data = await res.json();
      return data;
    },
    onError(error) {
      toast.error(error.message);
    },
  });
}
