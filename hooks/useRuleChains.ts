import { useQuery } from "@tanstack/react-query";

export function useRuleChains(pageSize: any = 1, page: any = 0) {
   return useQuery({
     queryKey: ["ruleChains"],
     queryFn: async () => {
       const res = await fetch(`/api/rule-chains?pageSize=${pageSize}&page=${page}`);
       if (!res.ok) {
         throw new Error("مشکلی در دریافت اطلاعات پیش آمده!");
       }
       return res.json();
     },
   });
 }