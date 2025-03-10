"use client";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ReactSelect from "react-select";
import { useAssetProfiles, useTenantProfiles } from "@/hooks/useProfiles";
import { useAddAsset } from "@/hooks/useAssets";

const schema = yup.object({
  name: yup.string().required("نام الزامی است"),
  type: yup.string().optional(),
  label: yup.string().optional(),
  additionalInfo: yup.object({
    description: yup.string().optional(),
  }),
  assetProfileId: yup.object({
    id: yup.string().optional(),
    entityType: yup.string().optional().default("ASSET_PROFILE"),
  }),
});

interface AddAssetProps {
  onAssetAdded: () => void;
}

const AddAssetForm = ({ onAssetAdded }: AddAssetProps) => {

  const { data, isLoading, error} = useAssetProfiles(100, 0);
  const { mutate: addAsset, isPending } = useAddAsset(() => {
   onAssetAdded();
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
  });

  const onSubmit = (data: any) => {
    const formattedData = {
      ...data,
      assetprofileId: data.assetProfileId.value ? data.assetProfileId.value : profilesOptions[0].value
    }
    addAsset(formattedData);
  };

  return (
    <div className="flex flex-col items-start gap-8">
      <h1 className="font-bold text-xl">افزودن دارایی</h1>
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
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}

        {!isLoading && (
          <Controller
            name="assetProfileId"
            control={control}
            render={({ field }) => (
              <ReactSelect
                {...field}
                className=""
                placeholder="پروفایل دارایی"
                options={profilesOptions}
                getOptionLabel={(option) => option.label}
                getOptionValue={(option) => option.value}
                value={
                  profilesOptions.find(
                    (option: any) => option.value === field.value
                  ) || null
                }
                defaultValue={
                  profilesOptions.length > 0 ? profilesOptions[0] : null
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
          {isPending || isSubmitting ? "⏳ در حال افزودن..." : "افزودن دارایی"}
        </button>
      </form>
    </div>
  );
};

export default AddAssetForm;
