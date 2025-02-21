import { useQuery } from "@tanstack/react-query";

export function useCustomers() {
   return useQuery({
     queryKey: ["customers"],
     queryFn: async () => {
       const res = await fetch("/api/customers");
       if (!res.ok) {
         throw new Error("مشکلی در دریافت اطلاعات پیش آمده!");
       }
       return res.json();
     },
   });
 }
 
 export function useLocalCustomers() {
   return useQuery({
     queryKey: ["localCustomers"],
     queryFn: async () => {
       const res = await fetch("/api/customers/local");
       if (!res.ok) {
         throw new Error("مشکلی در دریافت اطلاعات پیش آمده!");
       }
       return res.json();
     },
   });
 }