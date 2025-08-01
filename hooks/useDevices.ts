import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useDevices(
  page: number = 0,
  pageSize: number = 1,
  textSearch: string = ""
) {
  return useQuery({
    queryKey: ["devices", page, pageSize],
    queryFn: async () => {
      const res = await fetch(
        `/api/tenant/devices?page=${page}&pageSize=${pageSize}&textSearch=${textSearch}`
      );
      if (!res.ok) {
        throw new Error("مشکلی در دریافت اطلاعات پیش آمده!");
      }
      return res.json();
    },
  });
}

export function useSearchDevices(
  page: number = 0,
  pageSize: number = 1,
  textSearch: string = ""
) {
  return useQuery({
    queryKey: ["serachDevices"],
    queryFn: async () => {
      const res = await fetch(
        `/api/tenant/devices/search?page=${page}&pageSize=${pageSize}&textSearch=${textSearch}`
      );
      if (!res.ok) {
        throw new Error("مشکلی در دریافت اطلاعات پیش آمده!");
      }
      return res.json();
    },
  });
}

export function useLocalDevices() {
  return useQuery({
    queryKey: ["localDevices"],
    queryFn: async () => {
      const res = await fetch("/api/tenant/devices/local");
      if (!res.ok) {
        throw new Error("مشکلی در دریافت اطلاعات پیش آمده!");
      }
      return res.json();
    },
  });
}

export function useDevice(deviceId: string) {
  return useQuery({
    queryKey: ["device"],
    queryFn: async () => {
      const res = await fetch(`/api/tenant/devices/${deviceId}`);
      if (!res.ok) {
        throw new Error("مشکلی در دریافت اطلاعات پیش آمده!");
      }
      return res.json();
    },
  });
}

export function useTestDevice(deviceId: string, tenantId: string) {
  return useQuery({
    queryKey: ["testDevice"],
    queryFn: async () => {
      const res = await fetch(
        `/api/tenant/devices/${deviceId}/test-telemtry?tenantId=${tenantId}`
      );
      if (!res.ok) {
        throw new Error("مشکلی در ارسال اطلاعات پیش آمده!");
      }
      toast.success("داده با موفقیت ارسال شد");
      return res.json();
    },
    enabled: false,
  });
}

export function useDeviceAlarms(
  deviceId: string,
  pageSize: number = 1,
  page: number = 0
) {
  return useQuery({
    queryKey: ["deviceAlarms"],
    queryFn: async () => {
      const res = await fetch(
        `/api/tenant/devices/${deviceId}/alarms?pageSize=${pageSize}&page=${page}`
      );
      if (!res.ok) {
        const data = await res.json();
        throw new Error("مشکلی در دریافت اطلاعات پیش آمده!");
      }
      return res.json();
    },
  });
}

export function useDeviceAudits(
  deviceId: string,
  pageSize: number = 1,
  page: number = 0
) {
  return useQuery({
    queryKey: ["deviceAudits"],
    queryFn: async () => {
      const res = await fetch(
        `/api/tenant/devices/${deviceId}/audits?pageSize=${pageSize}&page=${page}`
      );
      if (!res.ok) {
        const data = await res.json();
        throw new Error("مشکلی در دریافت اطلاعات پیش آمده!");
      }
      return res.json();
    },
  });
}

export function useDeviceEvents(
  deviceId: string,
  tenantId: string,
  pageSize: number = 1,
  page: number = 0
) {
  return useQuery({
    queryKey: ["deviceEvents"],
    queryFn: async () => {
      const res = await fetch(
        `/api/tenant/devices/${deviceId}/events?tenantId=${tenantId}&pageSize=${pageSize}&page=${page}`
      );
      if (!res.ok) {
        const data = await res.json();
        throw new Error("مشکلی در دریافت اطلاعات پیش آمده!");
      }
      return res.json();
    },
  });
}

export function useStoreDevice(onDeviceAdded: () => void) {
  return useMutation({
    mutationFn: async (assetData: any) => {
      const res = await fetch("/api/tenant/devices", {
        method: "POST",
        body: JSON.stringify(assetData),
      });
      if (!res.ok) {
        throw new Error(`خطا در افزودن دستگاه! کد خطا: ${res.status}`);
      }
    },
    onError(error) {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("دستگاه با موفقت افزوده شد");
      onDeviceAdded();
    },
  });
}

export function useDeviceToken(deviceId: string) {
  return useQuery({
    queryKey: ["deviceToken"],
    queryFn: async () => {
      const res = await fetch(`/api/tenant/devices/${deviceId}/token`);
      if (!res.ok) {
        throw new Error("مشکلی در دریافت اطلاعات پیش آمده!");
      }
      return res.json();
    },
  });
}

export function useDeleteDevice(deviceId: string, onDeviceDeleted: () => void) {
  return useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/tenant/devices/${deviceId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("مشکلی در حذف دستگاه پیش آمده!");
      }
    },
    onError(error) {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("دستگاه با موفقت حذف شد");
      onDeviceDeleted();
    },
  });
}

export function useUpdateDevice(onDeviceUpdated: () => void) {
  return useMutation({
    mutationFn: async (tenantData: any) => {
      const res = await fetch("/api/tenant/devices/", {
        method: "POST",
        body: JSON.stringify(tenantData),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error("مشکلی در ویرایش دستگاه پیش آمده!");
      }
    },
    onError(error) {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("دستگاه با موفقیت ویرایش حذف شد");
      onDeviceUpdated();
    },
  });
}

export function useTenantDevices(
  tenantId: string,
  pageSize: number,
  page: number
) {
  return useQuery({
    queryKey: ["tenantDevices"],
    queryFn: async () => {
      const res = await fetch(
        `/api/sysadmin/tenants/devices?pageSize=${pageSize}&page=${page}`
      );
      if (!res.ok) {
        throw new Error("مشکلی در دریافت اطلاعات پیش آمده!");
      }
      return res.json();
    },
  });
}

export function useLocalTenantDevices() {
  return useQuery({
    queryKey: ["ocalTenantDevices"],
    queryFn: async () => {
      const res = await fetch("/api/tenant/devices");
      if (!res.ok) {
        throw new Error("مشکلی در دریافت اطلاعات پیش آمده!");
      }
      return res.json();
    },
  });
}
