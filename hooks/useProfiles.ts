import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useTenantProfiles(pageSize: number = 1, page: number = 0) {
  return useQuery({
    queryKey: ["tenantProfiles"],
    queryFn: async () => {
      const res = await fetch(`/api/sysadmin/tenants/profiles?pageSize=${pageSize}&page=${page}`);
      if (!res.ok) {
        throw new Error("مشکلی در دریافت اطلاعات پیش آمده!");
      }
      return res.json();
    },
  });
}

export function useDeviceProfiles(pageSize: number = 1, page: number = 0) {
  return useQuery({
    queryKey: ["deviceProfiles"],
    queryFn: async () => {
      const res = await fetch(`/api/devices/profiles?pageSize=${pageSize}&page=${page}`);
      if (!res.ok) {
        throw new Error("مشکلی در دریافت اطلاعات پیش آمده!");
      }
      return res.json();
    },
  });
}

export function useAssetProfiles(pageSize: number = 1, page: number = 0) {
  return useQuery({
    queryKey: ["assetProfiles"],
    queryFn: async () => {
      const res = await fetch(`/api/assets/profiles?pageSize=${pageSize}&page=${page}`);
      if (!res.ok) {
        throw new Error("مشکلی در دریافت اطلاعات پیش آمده!");
      }
      return res.json();
    },
  });
}

export function useStoreProfile(onProfileStored: () => void) {
  return useMutation({
    mutationFn: async (profileData: any) => {
      const res = await fetch("/api/sysadmin/tenants/profiles", {
        method: "POST",
        body: JSON.stringify(profileData),
      });
      if (!res.ok) {
        const data = await res.json();
        console.log(data)
        throw new Error("مشکلی در ویرایش پروفایل پیش آمده!");
      }
    },
    onError(error) {
      toast.error(error.message);
      console.log(error);
    },
    onSuccess: () => {
      toast.success("پروفایل با ویرایش حذف شد");
      onProfileStored();
    },
  });
}

export function useUpdateProfile(onProfileStored: () => void) {
  return useMutation({
    mutationFn: async (profileData: any) => {
      const res = await fetch("/api/sysadmin/tenants/profiles", {
        method: "POST",
        body: JSON.stringify(profileData),
      });
      if (!res.ok) {
        const data = await res.json();
        console.log(data)
        throw new Error("مشکلی در ویرایش پروفایل پیش آمده!");
      }
    },
    onError(error) {
      toast.error(error.message);
      console.log(error);
    },
    onSuccess: () => {
      toast.success("پروفایل با ویرایش حذف شد");
      onProfileStored();
    },
  });
}

export function useDeleteProfile(profileId: string, onDeletedProfile: () => void) {
  return useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/sysadmin/tenants/profiles/${profileId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("مشکلی در حذف پروفایل پیش آمده!");
      }
    },
    onError(error) {
      toast.error(error.message);
      console.log(error);
    },
    onSuccess: () => {
      toast.success("پروفایل با موفقت حذف شد");
      onDeletedProfile();
    },
  });
}