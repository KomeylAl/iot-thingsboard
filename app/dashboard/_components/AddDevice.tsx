"use client";

import { useDeviceProfiles } from "@/hooks/useProfiles";
import { useUser } from "@/hooks/useUser";
import * as yup from "yup";
import React from "react";
import ReactSelect from "react-select";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAddDevice } from "@/hooks/useDevices";

const schema = yup.object({
  name: yup.string().required("نام الزامی است"),
  type: yup.string().optional(),
  label: yup.string().optional(),
  tenantId: yup.string(),
  additionalInfo: yup.object({
    description: yup.string().optional(),
    location: yup.string().optional(),
  }),
  deviceProfileId: yup.object({
    id: yup.string().optional(),
    entityType: yup.string().optional().default("DEVICE_PROFILE"),
  }),
});

interface AddDeviceProps {
  onDeviceAdded: () => void;
}

const AddDevice = ({ onDeviceAdded }: AddDeviceProps) => {
  const { data: userData, isLoading } = useUser();
  const { data: profilesData } = useDeviceProfiles(0, 100);
  const { mutate: addDevice, isPending } = useAddDevice(() => {
    onDeviceAdded();
  });

  const profilesOptions =
    profilesData?.data.map((profile: any) => ({
      value: profile.id.id,
      label: profile.name,
    })) || [];

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    const formattedData = {
      ...data,
      tenantid: userData.data.tenantId.id,
      deviceprofileId: data.deviceProfileId.value
        ? data.deviceProfileId.value
        : profilesOptions[0].value,
    };
    addDevice(formattedData);
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="flex flex-col items-start gap-8">
      <h1 className="font-bold text-xl">افزودن دستگاه</h1>
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
            name="deviceProfileId"
            control={control}
            render={({ field }) => (
              <ReactSelect
                {...field}
                className=""
                placeholder="پروفایل دستگاه"
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

        <input
          {...register("additionalInfo.location")}
          className="bg-gray-100 p-3 w-full rounded-lg border border-gray-200"
          placeholder="مکان"
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
          {isPending || isSubmitting ? "⏳ در حال افزودن..." : "افزودن دستگاه"}
        </button>
      </form>
    </div>
  );
};

export default AddDevice;