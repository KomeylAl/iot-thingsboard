import { useQuery } from "@tanstack/react-query";

export function useNotifs(pageSize: number = 1, page: number = 0) {
  return useQuery({
    queryKey: ["notifs"],
    queryFn: async () => {
      const res = await fetch(
        `/api/notifications?pageSize=${pageSize}&page=${page}`
      );
      if (!res.ok) {
        throw new Error("مشکلی در دریافت اطلاعات پیش آمده!");
      }
      return res.json();
    },
  });
}

export function useUnreadNotifsCount() {
  return useQuery({
    queryKey: ["notifsCount"],
    queryFn: async () => {
      const res = await fetch("/api/notifications/count");
      if (!res.ok) {
        throw new Error("مشکلی در دریافت اطلاعات پیش آمده!");
      }
      return res.json();
    },
  });
}
