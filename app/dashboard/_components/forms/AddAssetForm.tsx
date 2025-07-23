"use client";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ReactSelect from "react-select";
import { useAssetProfiles } from "@/hooks/useProfiles";
import { useAddAsset } from "@/hooks/useAssets";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

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
  const { data, isLoading, error } = useAssetProfiles(0, 100);
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
      assetprofileId: data.assetProfileId.value
        ? data.assetProfileId.value
        : profilesOptions[0].value,
    };
    addAsset(formattedData);
  };

  return (
    <div className="flex flex-col items-start gap-8">
      <h1 className="font-bold text-xl">افزودن دارایی</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 w-72 md:w-96"
      >
        <Input
          {...register("name")}
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
                defaultValue={
                  profilesOptions.length > 0 ? profilesOptions[0] : null
                }
              />
            )}
          />
        )}

        <Input
          {...register("type")}
          placeholder="نوع"
        />

        <Input
          {...register("label")}
          placeholder="برچسب"
        />

        <Textarea
          {...register("additionalInfo.description")}
          placeholder="توضیحات"
        />

        <Button
          type="submit"
          disabled={isPending || isSubmitting}
        >
          {isPending || isSubmitting ? "⏳ در حال افزودن..." : "افزودن دارایی"}
        </Button>
      </form>
    </div>
  );
};

export default AddAssetForm;
