import { useQuery } from "@tanstack/react-query";

export function useAlarms() {
  return useQuery({
    queryKey: ["alarms"],
    queryFn: async () => {
      const res = await fetch("/api/alarms");
      if (!res.ok) {
        throw new Error("مشکلی در دریافت اطلاعات پیش آمده!");
      }
      return res.json();
    },
  });
}