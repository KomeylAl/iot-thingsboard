import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useTenantProfiles(
  pageSize: number = 1,
  page: number = 0,
  textSearch: string = ""
) {
  return useQuery({
    queryKey: ["tenantProfiles", page, pageSize],
    queryFn: async () => {
      const res = await fetch(
        `/api/sysadmin/tenants/profiles?pageSize=${pageSize}&page=${page}&textSearch=${textSearch}`
      );
      if (!res.ok) {
        throw new Error("مشکلی در دریافت اطلاعات پیش آمده!");
      }
      return res.json();
    },
  });
}

export function useDeviceProfiles(
  page: number = 0,
  pageSize: number = 1,
  textSearch: string = ""
) {
  return useQuery({
    queryKey: ["deviceProfiles", page, pageSize],
    queryFn: async () => {
      const res = await fetch(
        `/api/tenant/devices/profiles?pageSize=${pageSize}&page=${page}&textSearch=${textSearch}`
      );
      if (!res.ok) {
        throw new Error("مشکلی در دریافت اطلاعات پیش آمده!");
      }
      return res.json();
    },
  });
}

export function useAssetProfiles(
  page: number = 0,
  pageSize: number = 1,
  textSearch: string = ""
) {
  return useQuery({
    queryKey: ["assetProfiles", page, pageSize],
    queryFn: async () => {
      const res = await fetch(
        `/api/tenant/assets/profiles?pageSize=${pageSize}&page=${page}&textSearch=${textSearch}`
      );
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
        throw new Error("مشکلی در افزودن پروفایل پیش آمده!");
      }
    },
    onError(error) {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("پروفایل با موفقیت افزوده حذف شد");
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
        throw new Error("مشکلی در ویرایش پروفایل پیش آمده!");
      }
    },
    onError(error) {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("پروفایل با موفقیت ویرایش شد");
      onProfileStored();
    },
  });
}

export function useDeleteProfile(
  profileId: string,
  onDeletedProfile: () => void
) {
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
    },
    onSuccess: () => {
      toast.success("پروفایل با موفقت حذف شد");
      onDeletedProfile();
    },
  });
}

export function useStoreDevicesProfile(onProfileStored: () => void) {
  return useMutation({
    mutationFn: async (profileData: any) => {
      const res = await fetch("/api/tenant/devices/profiles", {
        method: "POST",
        body: JSON.stringify(profileData),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error("مشکلی در افزودن پروفایل پیش آمده!");
      }
    },
    onError(error) {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("پروفایل با موفقست افزوده حذف شد");
      onProfileStored();
    },
  });
}

export function useUpdateDevicesProfile(onProfileStored: () => void) {
  return useMutation({
    mutationFn: async (profileData: any) => {
      const res = await fetch("/api/tenant/devices/profiles", {
        method: "POST",
        body: JSON.stringify(profileData),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error("مشکلی در ویرایش پروفایل پیش آمده!");
      }
    },
    onError(error) {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("پروفایل با موفقیت ویرایش حذف شد");
      onProfileStored();
    },
  });
}

export function useDeleteDevicesProfile(onDeletedProfile: () => void) {
  return useMutation({
    mutationFn: async (profileId: string) => {
      const res = await fetch(`/api/tenant/devices/profiles/${profileId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("مشکلی در حذف پروفایل پیش آمده!");
      }
    },
    onError(error) {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("پروفایل با موفقت حذف شد");
      onDeletedProfile();
    },
  });
}

export function useStoreAssetsProfile(onProfileStored: () => void) {
  return useMutation({
    mutationFn: async (profileData: any) => {
      const res = await fetch("/api/tenant/assets/profiles", {
        method: "POST",
        body: JSON.stringify(profileData),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error("مشکلی در افزودن پروفایل پیش آمده!");
      }
    },
    onError(error) {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("پروفایل با موفقست افزوده حذف شد");
      onProfileStored();
    },
  });
}

export function useUpdateAssetsProfile(onProfileStored: () => void) {
  return useMutation({
    mutationFn: async (profileData: any) => {
      const res = await fetch("/api/tenant/assets/profiles", {
        method: "POST",
        body: JSON.stringify(profileData),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error("مشکلی در ویرایش پروفایل پیش آمده!");
      }
    },
    onError(error) {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("پروفایل با موفقیت ویرایش حذف شد");
      onProfileStored();
    },
  });
}

export function useDeleteAssetsProfile(onDeletedProfile: () => void) {
  return useMutation({
    mutationFn: async (profileId: string) => {
      const res = await fetch(`/api/tenant/assets/profiles/${profileId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("مشکلی در حذف پروفایل پیش آمده!");
      }
    },
    onError(error) {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("پروفایل با موفقت حذف شد");
      onDeletedProfile();
    },
  });
}
