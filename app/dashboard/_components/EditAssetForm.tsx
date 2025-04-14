"use client";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ReactSelect from "react-select";
import { useAssetProfiles } from "@/hooks/useProfiles";
import { useEffect } from "react";
import { useUpdateAsset } from "@/hooks/useAssets";

const schema = yup.object({
  name: yup.string().required("نام الزامی است"),
  type: yup.string().optional(),
  label: yup.string().optional(),
  additionalInfo: yup.object({
    description: yup.string().optional(),
  }),
  assetProfileId: yup.object({
    id: yup.string().optional(),
    entityType: yup.string().optional(),
  }),
});

interface EditAssetProps {
  assetData: any;
  onAssetUpdated: () => void;
}

const EditAssetForm = ({ assetData, onAssetUpdated }: EditAssetProps) => {
  const { data, isLoading } = useAssetProfiles(100, 0);
  const { mutate: updateDevice, isPending } = useUpdateAsset(() => {
    onAssetUpdated();
  });

  const profilesOptions =
    data?.data.map((profile: any) => ({
      value: profile.id.id,
      label: profile.name,
    })) || [];

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {},
  });

  useEffect(() => {
    if (assetData) {
      reset(assetData);
    }
  }, [assetData, reset]);

  const onSubmit = (data: any) => {
    const formattedData = {
      ...data,
      assetprofileId: data.assetProfileId.value ? data.assetProfileId.value : assetData.assetProfileId.id,
      set_id: assetData.id.id
    };
    updateDevice(formattedData);
  };

  return (
    <div className="flex flex-col items-start gap-8">
      <h1 className="font-bold text-xl">ویرایش دارایی</h1>
      <form
        onSubmit={(e) => {
          handleSubmit(onSubmit)(e);
        }}
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

        {!isLoading && (
          <Controller
            name="assetProfileId"
            control={control}
            render={({ field }) => (
              <ReactSelect
                {...field}
                placeholder="پروفایل دارایی"
                options={profilesOptions}
                value={
                  profilesOptions.find(
                    (option: any) => option.value === field.value?.id
                  )
                }
                defaultValue={  
                  profilesOptions.find(
                    (option: any) => option.value === field.value?.id
                  ) || null
                }
              />
            )}
          />
        )}

        <input
          {...register("type")}
          className="bg-gray-100 p-3 w-full rounded-lg border border-gray-200"
          placeholder="نوع"
        />
        <input
          {...register("label")}
          className="bg-gray-100 p-3 w-full rounded-lg border border-gray-200"
          placeholder="برچسب"
        />

        <textarea
          {...register("additionalInfo.description")}
          className="bg-gray-100 p-3 w-full rounded-lg border border-gray-200"
          placeholder="توضیحات"
        />

        <button
          type="submit"
          disabled={isPending || isSubmitting}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          {isPending || isSubmitting ? "⏳ در حال ویرایش..." : "ویرایش دارایی"}
        </button>
      </form>
    </div>
  );
};

export default EditAssetForm;
