"use client";

import {
  useStoreAssetsProfile,
  useUpdateAssetsProfile,
} from "@/hooks/useProfiles";
import { useRuleChains } from "@/hooks/useRuleChains";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object({
  name: yup.string().required("نام الزامی است"),
  description: yup.string().optional(),
});

interface AddAssetProfileProps {
  onProfileEdited: () => void;
}

const AddAssetProfileForm = ({ onProfileEdited }: AddAssetProfileProps) => {
  const { mutate: addProfile, isPending } = useStoreAssetsProfile(() => {
    onProfileEdited();
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    addProfile(data);
  };

  console.log(errors);

  return (
    <div className="flex flex-col items-start gap-8">
      <h1 className="font-bold text-xl">افزودن پروفایل</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 w-72 md:w-96"
      >
        <input
          {...register("name")}
          className="bg-gray-100 p-3 w-full rounded-lg border border-gray-200"
          placeholder="نام*"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">
            {errors.name.message as string}
          </p>
        )}

        <textarea
          {...register("description")}
          className="bg-gray-100 p-3 w-full rounded-lg border border-gray-200"
          placeholder="توضیحات"
        />

        <button
          type="submit"
          disabled={isPending || isSubmitting}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          {isPending || isSubmitting ? "⏳ در حال ویرایش..." : "ویرایش پروفایل"}
        </button>
      </form>
    </div>
  );
};

export default AddAssetProfileForm;
