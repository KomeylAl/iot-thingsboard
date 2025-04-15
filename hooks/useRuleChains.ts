import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useRuleChains(
  pageSize: any = 1,
  page: any = 0,
  textSearch: string = ""
) {
  return useQuery({
    queryKey: ["ruleChains"],
    queryFn: async () => {
      const res = await fetch(
        `/api/rule-chains?pageSize=${pageSize}&page=${page}&textSearch=${textSearch}`
      );
      if (!res.ok) {
        throw new Error("مشکلی در دریافت اطلاعات پیش آمده!");
      }
      return res.json();
    },
  });
}

export function useEdgeRuleChains(pageSize: any = 1, page: any = 0) {
  return useQuery({
    queryKey: ["edgeRuleChains"],
    queryFn: async () => {
      const res = await fetch(
        `/api/rule-chains?pageSize=${pageSize}&page=${page}`
      );
      if (!res.ok) {
        throw new Error("مشکلی در دریافت اطلاعات پیش آمده!");
      }
      return res.json();
    },
  });
}

export function useUpdateRuleChain(onRuleChainUpdated: () => void) {
  return useMutation({
    mutationFn: async (ruleChainData: any) => {
      const res = await fetch("/api/rule-chains", {
        method: "POST",
        body: JSON.stringify(ruleChainData),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error("مشکلی در ویرایش زنجیره پیش آمده!");
      }
    },
    onError(error) {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("زنجیره با موفقیت ویرایش شد");
      onRuleChainUpdated();
    },
  });
}

export function useDeleteRuleChain(
  ruleChainId: string,
  onDeletedRuleChain: () => void
) {
  return useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/rule-chains/${ruleChainId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("مشکلی در حذف زنجیره پیش آمده!");
      }
    },
    onError(error) {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("زنجیره با موفقت حذف شد");
      onDeletedRuleChain();
    },
  });
}

export function useRuleChainMetadata(ruleChainId: string) {
  return useQuery({
    queryKey: ["ruleChainMetadata"],
    queryFn: async () => {
      const res = await fetch(`/api/rule-chains/${ruleChainId}/metadata`);
      if (!res.ok) {
        throw new Error("مشکلی در دریافت اطلاعات پیش آمده!");
      }
      return res.json();
    },
  });
}
