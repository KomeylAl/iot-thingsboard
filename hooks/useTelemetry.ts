import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useKeys(deviceId: string) {
  return useQuery({
    queryKey: ["keys"],
    enabled: false,
    queryFn: async () => {
      const res = await fetch(`/api/tenant/telemetry/keys?id=${deviceId}`);
      if (!res.ok) toast.error("خطا! دوباره تلاش کنید.");
      return res.json();
    },
  });
}

export function useGetTelemtryInfo(deviceId: string, key: string) {
  return useQuery({
    queryKey: ["telemetry"],
    enabled: false,
    queryFn: async () => {
      const res = await fetch(`/api/tenant/telemetry?id=${deviceId}&key=${key}`, {
        method: "GET",
      });
      if (!res.ok) {
        throw new Error("مشکلی در دریافت اطلاعات پیش آمده!");
      }
      const data = await res.json();
      return data;
    },
  });
}
