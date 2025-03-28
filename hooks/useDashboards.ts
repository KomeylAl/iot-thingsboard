import { useQuery } from "@tanstack/react-query";

export function useDashboards(pageSize: number = 1, page: number = 0) {
  return useQuery({
    queryKey: ["dashboards"],
    queryFn: async () => {
      const res = await fetch(`/api/dashboards?pageSize=${pageSize}&page=${page}`);
      if (!res.ok) {
        throw new Error("مشکلی در دریافت اطلاعات پیش آمده!");
      }
      return res.json();
    },
  });
}

export function useLocaldashboards() {
  return useQuery({
    queryKey: ["localDashboards"],
    queryFn: async () => {
      const res = await fetch("/api/dashboards/local");
      if (!res.ok) {
        throw new Error("مشکلی در دریافت اطلاعات پیش آمده!");
      }
      return res.json();
    },
  });
}