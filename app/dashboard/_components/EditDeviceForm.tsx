"use client";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ReactSelect from "react-select";
import { useDeviceProfiles } from "@/hooks/useProfiles";
import { useEffect } from "react";
import { useUpdateDevice } from "@/hooks/useDevices";

const schema = yup.object({
  name: yup.string().required("نام الزامی است"),
  type: yup.string().optional(),
  label: yup.string().optional(),
  additionalInfo: yup.object({
    description: yup.string().optional(),
    location: yup.string().optional(),
  }),
  deviceProfileId: yup.object({
    id: yup.string().optional(),
    entityType: yup.string().optional(),
  }),
});

interface EditDeviceProps {
  deviceData: any;
  onDeviceUpdated: () => void;
}

const EditDeviceForm = ({ deviceData, onDeviceUpdated }: EditDeviceProps) => {
  const { data, isLoading } = useDeviceProfiles(100, 0);
  const { mutate: updateDevice, isPending } = useUpdateDevice(() => {
    onDeviceUpdated();
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
    if (deviceData) {
      reset(deviceData); // مقداردهی مجدد فرم بعد از دریافت داده‌ها
    }
  }, [deviceData, reset]);

  const onSubmit = (data: any) => {
    console.log(data.deviceProfileId)
    const formattedData = {
      ...data,
      deviceprofileId: data.deviceProfileId.value ? data.deviceProfileId.value : deviceData.deviceProfileId.id,
      tenantid: data.tenantId.id,
      set_id: deviceData.id.id
    };
    console.log(formattedData);
    updateDevice(formattedData);
  };

  return (
    <div className="flex flex-col items-start gap-8">
      <h1 className="font-bold text-xl">ویرایش دستگاه</h1>
      <form
        onSubmit={(e) => {
          console.log("Form is being submitted..."); // تست شماره 1
          handleSubmit(onSubmit)(e);
        }}
        className="flex flex-col gap-3 w-72 md:w-96"
      >
        <input
          {...register("name")}
          className="bg-gray-100 p-3 w-full rounded-lg border border-gray-200"
          placeholder="عنوان*"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">
            {errors.name.message as string}
          </p>
        )}

        {!isLoading && (
          <Controller
            name="deviceProfileId"
            control={control}
            render={({ field }) => (
              <ReactSelect
                {...field}
                placeholder="پروفایل دستگاه"
                options={profilesOptions}
                getOptionLabel={(option) => option.label}
                getOptionValue={(option) => option.value}
                value={
                  profilesOptions.find(
                    (option: any) => option.value === field.value
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
          {isPending || isSubmitting ? "⏳ در حال ویرایش..." : "ویرایش دستگاه"}
        </button>
      </form>
    </div>
  );
};

export default EditDeviceForm;
