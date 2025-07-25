"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateAssetsProfile } from "@/hooks/useProfiles";
import { useRuleChains } from "@/hooks/useRuleChains";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object({
  name: yup.string().required("نام الزامی است"),
  description: yup.string().optional(),
});

interface EditAssetProfileProps {
  profileData: any;
  onProfileEdited: () => void;
}

const EditAssetProfileForm = ({
  profileData,
  onProfileEdited,
}: EditAssetProfileProps) => {
  const { mutate: updateProfile, isPending } = useUpdateAssetsProfile(() => {
    onProfileEdited();
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {},
  });

  useEffect(() => {
    if (profileData) {
      reset(profileData);
    }
  }, [profileData, reset]);

  const onSubmit = (data: any) => {
    const formattedData = {
      ...data,
      set_id: profileData.id.id,
    };
    updateProfile(formattedData);
  };

  return (
    <div className="flex flex-col items-start gap-8">
      <h1 className="font-bold text-xl">ویرایش پروفایل</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 w-72 md:w-96"
      >
        <Input
          {...register("name")}
          className="bg-gray-100 p-3 w-full rounded-lg border border-gray-200"
          placeholder="نام*"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">
            {errors.name.message as string}
          </p>
        )}

        <Textarea
          {...register("description")}
          className="bg-gray-100 p-3 w-full rounded-lg border border-gray-200"
          placeholder="توضیحات"
        />

        <Button
          type="submit"
          disabled={isPending || isSubmitting}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          {isPending || isSubmitting ? "⏳ در حال ویرایش..." : "ویرایش پروفایل"}
        </Button>
      </form>
    </div>
  );
};

export default EditAssetProfileForm;
