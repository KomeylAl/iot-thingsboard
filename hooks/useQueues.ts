import { useQuery } from "@tanstack/react-query";

export function useQueues(
  pageSize: any = 1,
  page: any = 0,
  textSearch: string = ""
) {
  return useQuery({
    queryKey: ["queues"],
    queryFn: async () => {
      const res = await fetch(
        `/api/queues?pageSize=${pageSize}&page=${page}&textSearch=${textSearch}`
      );
      if (!res.ok) {
        throw new Error("مشکلی در دریافت اطلاعات پیش آمده!");
      }
      return res.json();
    },
  });
}
