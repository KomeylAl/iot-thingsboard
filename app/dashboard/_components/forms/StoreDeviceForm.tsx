"use client";

import { useDeviceProfiles } from "@/hooks/useProfiles";
import { useUser } from "@/hooks/useUser";
import React, { useEffect, useState } from "react";
import ReactSelect from "react-select";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { deviceSchema } from "@/validations";
import { useStoreDevice } from "@/hooks/useDevices";
import { EntityType } from "@/lib/types";
import axios from "axios";
import toast from "react-hot-toast";
import { Combobox } from "@/components/ui/custom/Combobox";

interface StoreDeviceFormProps {
  onSuccess: () => void;
}

const StoreDeviceForm = ({ onSuccess }: StoreDeviceFormProps) => {
  const { data: userData, isLoading } = useUser();
  const { mutate: storeDevice, isPending } = useStoreDevice(() => {
    onSuccess();
  });

  const [profiles, setProfiles] = useState<EntityType[]>([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get(`/api/tenant/devices/profiles`);
        const entities = response.data.data.map((item: any) => ({
          label: item.name,
          value: item.id.id,
        }));
        setProfiles(entities);
      } catch (err: any) {
        toast.error(err.message);
      }
    };

    fetchProfiles();
  }, []);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(deviceSchema),
  });

  const onSubmit = (data: any) => {
    const formattedData = {
      ...data,
      tenantid: userData.data.tenantId.id,
      deviceprofileId: data.deviceProfileId.value
        ? data.deviceProfileId.value
        : profiles[0].value,
    };
    storeDevice(formattedData);
  };

  if (isLoading) return <p>Loading...</p>;
  console.log(profiles);

  return (
    <div className="flex flex-col items-start gap-8">
      <h1 className="font-bold text-xl">افزودن دستگاه</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 w-72 md:w-96"
      >
        <Input {...register("name")} placeholder="نام*" />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}

        <div className="">
          <Controller
            name="deviceProfileId"
            control={control}
            render={({ field }) => (
              <Combobox
                data={profiles}
                placeholder="انتخاب پروفایل"
                searchPlaceholder="جستجو..."
                value={field.value?.id ?? ""}
                onChange={field.onChange}
              />
            )}
          />
          {errors.deviceProfileId && (
            <p className="text-sm text-red-500 mt-1">
              {errors.deviceProfileId.message}
            </p>
          )}
        </div>

        <Input {...register("type")} placeholder="نوع" />

        <Input {...register("label")} placeholder="برچسب" />

        <Input {...register("additionalInfo.location")} placeholder="مکان" />

        <Textarea
          {...register("additionalInfo.description")}
          placeholder="توضیحات"
        />

        <Button type="submit" disabled={isPending || isSubmitting}>
          {isPending || isSubmitting ? "در حال افزودن..." : "افزودن دستگاه"}
        </Button>
      </form>
    </div>
  );
};

export default StoreDeviceForm;
