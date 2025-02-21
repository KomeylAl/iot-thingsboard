import { useQuery } from "@tanstack/react-query";

export function useRequests() {
  return useQuery({
    queryKey: ["requests"],
    queryFn: async () => {
      const res = await fetch("/api/sysadmin/requests");
      return res.json();
    },
    initialData: [],
  });
}