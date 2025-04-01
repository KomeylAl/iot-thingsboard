import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useRequests() {
  return useQuery({
    queryKey: ["requests"],
    queryFn: async () => {
      const res = await fetch("/api/requests");
      if (!res.ok) {
        toast.error("خطایی در دریافت اطلاعات درخواست ها پیش آمده");
      }
      return res.json();
    },
  });
}
