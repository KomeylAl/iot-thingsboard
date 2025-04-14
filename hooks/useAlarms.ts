import { useQuery } from "@tanstack/react-query";

export function useAlarms(pageSize: any = 1, page: any = 0, textSearch: string = "") {
  return useQuery({
    queryKey: ["alarms"],
    queryFn: async () => {
      const res = await fetch(`/api/alarms?pageSize=${pageSize}&page=${page}&textSearch=${textSearch}`);
      if (!res.ok) {
        throw new Error("مشکلی در دریافت اطلاعات پیش آمده!");
      }
      return res.json();
    },
  });
}