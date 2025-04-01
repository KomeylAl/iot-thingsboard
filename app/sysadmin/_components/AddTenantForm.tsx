"use client";

import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import ReactSelect from "react-select";
import { useTenantProfiles } from "@/hooks/useProfiles";

const schema = yup.object({
  title: yup.string().required("عنوان الزامی است"),
  country: yup.string().optional(),
  state: yup.string().optional(),
  city: yup.string().optional(),
  address: yup.string().optional(),
  address2: yup.string().optional(),
  zip: yup.string().optional(),
  phone: yup.string().required("تلفن الزامی است"),
  region: yup.string().optional(),
  profile: yup.string().optional(),
  additionalInfo: yup.object({
    description: yup.string().optional(),
  }),
  tenantProfileId: yup.object({
    id: yup.string().optional(),
    entityType: yup.string().optional(),
  }),
  email: yup.string().email("ایمیل معتبر نیست").required("ایمیل الزامی است"),
});

interface AddTenantProps {
  onTenantAdded: () => void;
}

const AddTenantForm = ({ onTenantAdded }: AddTenantProps) => {

  const { data, isLoading} = useTenantProfiles(100, 0);

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

  const { mutate: addTenant, isPending } = useMutation({
    mutationFn: async (tenantData) => {
      const res = await axios.post("/api/sysadmin/tenants", tenantData);
      return res.data;
    },
    onSuccess: () => {
      reset();
      console.log();
      toast.success("سازمان جدید با موفقیت اضافه شد");
      onTenantAdded();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onSubmit = (data: any) => {
    if (!data.title || !data.email || !data.phone) {
      toast.error("لطفا همه فیلد های اجباری را پر کنید");
      return;
    }
    const formattedData = {
      ...data,
      tenantprofileId: data.tenantProfileId.value ? data.tenantProfileId.value : profilesOptions[0].value
    }
    console.log(formattedData);
    addTenant(formattedData);
  };

  return (
    <div className="flex flex-col items-start gap-8">
      <h1 className="font-bold text-xl">افزودن سازمان</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 w-72 md:w-96"
      >
        <input
          {...register("title")}
          className="bg-gray-100 p-3 w-full rounded-lg border border-gray-200"
          placeholder="عنوان*"
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}

        {!isLoading && (
          <Controller
            name="tenantProfileId"
            control={control}
            render={({ field }) => (
              <ReactSelect
                {...field}
                className=""
                placeholder="پروفایل سازمان"
                options={profilesOptions}
                getOptionLabel={(option) => option.label}
                getOptionValue={(option) => option.value}
                defaultValue={
                  profilesOptions.length > 0 ? profilesOptions[0].value : null
                }
              />
            )}
          />
        )}

        <input
          {...register("country")}
          className="bg-gray-100 p-3 w-full rounded-lg border border-gray-200"
          placeholder="کشور"
        />

        <div className="w-full flex items-center gap-3">
          <input
            {...register("city")}
            className="bg-gray-100 p-3 w-full rounded-lg border border-gray-200"
            placeholder="شهر"
          />
          <input
            {...register("state")}
            className="bg-gray-100 p-3 w-full rounded-lg border border-gray-200"
            placeholder="استان"
          />
          <input
            {...register("zip")}
            className="bg-gray-100 p-3 w-full rounded-lg border border-gray-200"
            placeholder="کد پستی"
          />
        </div>

        <input
          {...register("address")}
          className="bg-gray-100 p-3 w-full rounded-lg border border-gray-200"
          placeholder="نشانی"
        />

        <input
          {...register("address2")}
          className="bg-gray-100 p-3 w-full rounded-lg border border-gray-200"
          placeholder="نشانی 2"
        />

        <input
          {...register("phone")}
          className="bg-gray-100 p-3 w-full rounded-lg border border-gray-200"
          placeholder="تلفن*"
        />
        {errors.phone && (
          <p className="text-red-500 text-sm">{errors.phone.message}</p>
        )}

        <input
          {...register("email")}
          className="bg-gray-100 p-3 w-full rounded-lg border border-gray-200"
          placeholder="ایمیل*"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}

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
          {isPending || isSubmitting ? "⏳ در حال افزودن..." : "افزودن سازمان"}
        </button>
      </form>
    </div>
  );
};

export default AddTenantForm;
