import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useAssets(
  pageSize: number = 1,
  page: number = 0,
  textSearch: string = ""
) {
  return useQuery({
    queryKey: ["assets"],
    queryFn: async () => {
      const res = await fetch(
        `/api/assets?pageSize=${pageSize}&page=${page}&textSearch=${textSearch}`
      );
      if (!res.ok) {
        throw new Error("مشکلی در دریافت اطلاعات پیش آمده!");
      }
      return res.json();
    },
  });
}

export function useAsset(assetId: string) {
  return useQuery({
    queryKey: ["asset"],
    queryFn: async () => {
      const res = await fetch(`/api/assets/${assetId}`);
      if (!res.ok) {
        throw new Error("مشکلی در دریافت اطلاعات پیش آمده!");
      }
      return res.json();
    },
  });
}

export function useAssetAlarms(
  deviceId: string,
  pageSize: number = 1,
  page: number = 0
) {
  return useQuery({
    queryKey: ["assetAlarms"],
    queryFn: async () => {
      const res = await fetch(
        `/api/assets/${deviceId}/alarms?pageSize=${pageSize}&page=${page}`
      );
      if (!res.ok) {
        const data = await res.json();
        throw new Error("مشکلی در دریافت اطلاعات پیش آمده!");
      }
      return res.json();
    },
  });
}

export function useAssetAudits(
  deviceId: string,
  pageSize: number = 1,
  page: number = 0
) {
  return useQuery({
    queryKey: ["assetAudits"],
    queryFn: async () => {
      const res = await fetch(
        `/api/assets/${deviceId}/audits?pageSize=${pageSize}&page=${page}`
      );
      if (!res.ok) {
        const data = await res.json();
        throw new Error("مشکلی در دریافت اطلاعات پیش آمده!");
      }
      return res.json();
    },
  });
}

export function useAssetEvents(
  deviceId: string,
  tenantId: string,
  pageSize: number = 1,
  page: number = 0
) {
  return useQuery({
    queryKey: ["assetEvents"],
    queryFn: async () => {
      const res = await fetch(
        `/api/assets/${deviceId}/events?tenantId=${tenantId}&pageSize=${pageSize}&page=${page}`
      );
      if (!res.ok) {
        const data = await res.json();
        throw new Error("مشکلی در دریافت اطلاعات پیش آمده!");
      }
      return res.json();
    },
  });
}

export function useDeleteAsset(assetId: string, onAssetDeleted: () => void) {
  return useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/assets/${assetId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("مشکلی در حذف دارایی پیش آمده!");
      }
    },
    onError(error) {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("دارایی با موفقت حذف شد");
      onAssetDeleted();
    },
  });
}

export function useUpdateAsset(onAssetUpdated: () => void) {
  return useMutation({
    mutationFn: async (assetData: any) => {
      const res = await fetch("/api/assets/", {
        method: "POST",
        body: JSON.stringify(assetData),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error("مشکلی در ویرایش دارایی پیش آمده!");
      }
    },
    onError(error) {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("دارایی با موفقیت ویرایش حذف شد");
      onAssetUpdated();
    },
  });
}

export function useLocalAssets() {
  return useQuery({
    queryKey: ["localAssets"],
    queryFn: async () => {
      const res = await fetch("/api/assets/local");
      if (!res.ok) {
        throw new Error("مشکلی در دریافت اطلاعات پیش آمده!");
      }
      return res.json();
    },
  });
}

export function useAddAsset(onAssetAdded: () => void) {
  return useMutation({
    mutationFn: async (assetData: any) => {
      const res = await fetch("/api/assets", {
        method: "POST",
        body: JSON.stringify(assetData),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error("مشکلی در افزودن دارایی پیش آمده!");
      }
    },
    onError(error) {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("دارایی با موفقت افزوده شد");
      onAssetAdded();
    },
  });
}
