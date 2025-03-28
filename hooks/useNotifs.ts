import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

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

export function useUnreadNotifs(pageSize: number = 1, page: number = 0) {
  return useQuery({
    queryKey: ["unreadNotifs"],
    queryFn: async () => {
      const res = await fetch(
        `/api/notifications/unread?pageSize=${pageSize}&page=${page}`
      );
      if (!res.ok) {
        throw new Error("مشکلی در دریافت اطلاعات پیش آمده!");
      }
      return res.json();
    },
  });
}

export function useNotifRecipients(pageSize: number = 1, page: number = 0) {
  return useQuery({
    queryKey: ["notifRecipients"],
    queryFn: async () => {
      const res = await fetch(
        `/api/notifications/recipients?pageSize=${pageSize}&page=${page}`
      );
      if (!res.ok) {
        throw new Error("مشکلی در دریافت اطلاعات پیش آمده!");
      }
      return res.json();
    },
  });
}

export function useMarkAllNotifs() {
  return useQuery({
    queryKey: ["markAllNotifs"],
    queryFn: async () => {
      const res = await fetch("/api/notifications/mark");
      if (!res.ok) {
        throw new Error("مشکلی در ارسال اطلاعات پیش آمده!");
      }
      return res.json();
    },
    enabled: false
  });
}

export function useMarkNotif() {
  return useMutation({
    mutationFn: async (notifId: string) => {
      const res = await fetch(`/api/notifications/mark-single?id=${notifId}`, {
        method: "GET",
      });
      if (!res.ok) {
        throw new Error("مشکلی در ارسال اطلاعات پیش آمده!");
      }
    },
    onError(error) {
      toast.error(error.message);
      console.log(error);
    },
  });
}