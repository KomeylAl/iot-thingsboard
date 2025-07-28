"use client";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ReactSelect from "react-select";
import { useTenantProfiles } from "@/hooks/useProfiles";
import { useEffect } from "react";
import { useUpdateTenant } from "@/hooks/useTenants";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { tenantSchema } from "@/validations";

interface EditTenantProps {
  tenantData: any;
  onTenantUpdated: () => void;
}

const EditTenantForm = ({ tenantData, onTenantUpdated }: EditTenantProps) => {
  const { data, isLoading } = useTenantProfiles(100, 0);
  const { mutate: updateTenant, isPending } = useUpdateTenant(() => {
    onTenantUpdated();
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
    resolver: yupResolver(tenantSchema),
    defaultValues: {},
  });

  useEffect(() => {
    if (tenantData) {
      reset(tenantData);
    }
  }, [tenantData, reset]);

  const onSubmit = (data: any) => {
    const formattedData = {
      ...data,
      tenantprofileId: data.tenantProfileId.value
        ? data.tenantProfileId.value
        : tenantData.tenantProfileId.id,
      set_id: tenantData.id.id,
    };
    updateTenant(formattedData);
  };

  return (
    <div className="flex flex-col items-start gap-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 w-full"
      >
        <Input
          {...register("title")}
          className="bg-gray-100 p-3 w-full rounded-lg border border-gray-200"
          placeholder="عنوان*"
        />
        {errors.title && (
          <p className="text-red-500 text-sm">
            {errors.title.message as string}
          </p>
        )}

        {!isLoading && (
          <Controller
            name="tenantProfileId"
            control={control}
            render={({ field }) => (
              <ReactSelect
                {...field}
                placeholder="پروفایل سازمان"
                options={profilesOptions}
                value={profilesOptions.find(
                  (option: any) => option.value === field.value?.id
                )}
                defaultValue={
                  profilesOptions.find(
                    (option: any) => option.value === field.value?.id
                  ) || null
                }
              />
            )}
          />
        )}

        <Input
          {...register("country")}
          className="bg-gray-100 p-3 w-full rounded-lg border border-gray-200"
          placeholder="کشور"
        />
        <div className="w-full flex items-center gap-3">
          <Input
            {...register("city")}
            className="bg-gray-100 p-3 w-full rounded-lg border border-gray-200"
            placeholder="شهر"
          />
          <Input
            {...register("state")}
            className="bg-gray-100 p-3 w-full rounded-lg border border-gray-200"
            placeholder="استان"
          />
          <Input
            {...register("zip")}
            className="bg-gray-100 p-3 w-full rounded-lg border border-gray-200"
            placeholder="کد پستی"
          />
        </div>

        <Input
          {...register("address")}
          className="bg-gray-100 p-3 w-full rounded-lg border border-gray-200"
          placeholder="نشانی"
        />
        <Input
          {...register("address2")}
          className="bg-gray-100 p-3 w-full rounded-lg border border-gray-200"
          placeholder="نشانی ۲"
        />
        <Input
          {...register("phone")}
          className="bg-gray-100 p-3 w-full rounded-lg border border-gray-200"
          placeholder="تلفن"
        />
        {errors.phone && (
          <p className="text-red-500 text-sm">
            {errors.phone.message as string}
          </p>
        )}
        <Input
          {...register("email")}
          className="bg-gray-100 p-3 w-full rounded-lg border border-gray-200"
          placeholder="ایمیل"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">
            {errors.email.message as string}
          </p>
        )}
        {errors.email && (
          <p className="text-red-500 text-sm">
            {errors.email.message as string}
          </p>
        )}

        <textarea
          {...register("additionalInfo.description")}
          className="bg-gray-100 p-3 w-full rounded-lg border border-gray-200"
          placeholder="توضیحات"
        />

        <Button
          type="submit"
          disabled={isPending || isSubmitting}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          {isPending || isSubmitting ? "در حال ویرایش..." : "ویرایش سازمان"}
        </Button>
      </form>
    </div>
  );
};

export default EditTenantForm;
