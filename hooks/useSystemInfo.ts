import { useQuery } from "@tanstack/react-query";

export function useSystemInfo() {
   return useQuery({
     queryKey: ["systemInfo"],
     queryFn: async () => {
       const res = await fetch("/api/sysadmin/systemInfo");
       if (!res.ok) {
         throw new Error("خطا در دریافت اطلاعات سیستم");
       }
 
       return res.json();
     },
     refetchInterval: 5000
   });
 }