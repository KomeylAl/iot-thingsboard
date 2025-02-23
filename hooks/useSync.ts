import { useQuery } from "@tanstack/react-query";

export function useSyncDevices() {
  return useQuery({
    queryKey: ["syncDevices"],
    queryFn: async () => {
      const res = await fetch("/api/sysadmin/syncronization/devices");
      if (!res.ok) {
         const data = await res.json();
         console.log(data);
         throw new Error("خطا در همگام سازی اطلاعات دستگاه ها");
      }
      return res.json();
    },
    enabled: false
  });
}

export function useSyncCustomers(tenantId: string) {
   return useQuery({
     queryKey: ["syncCustomers"],
     queryFn: async () => {
       const res = await fetch(`/api/sysadmin/syncronization/customers?tenantId=${tenantId}`);
       if (!res.ok) {
          const data = await res.json();
          console.log(data);
          throw new Error("خطا در همگام سازی اطلاعات دستگاه ها");
       }
       return res.json();
     },
     enabled: false
   });
 }