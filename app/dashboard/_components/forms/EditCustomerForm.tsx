"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect } from "react";
import { useUpdateCustomer } from "@/hooks/useCustomers";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

const schema = yup.object({
  title: yup.string().required("عنوان الزامی است"),
  country: yup.string().optional(),
  state: yup.string().optional(),
  city: yup.string().optional(),
  address: yup.string().optional(),
  address2: yup.string().optional(),
  zip: yup.string().optional(),
  phone: yup.string().optional(),
  region: yup.string().optional(),
  profile: yup.string().optional(),
  additionalInfo: yup
    .object({
      description: yup.string().optional(),
    })
    .optional(),
  email: yup.string().email("ایمیل معتبر نیست").optional(),
});

interface EditCustomerProps {
  customerData: any;
  onCustomerUpdated: () => void;
}

const EditCustomerForm = ({
  customerData,
  onCustomerUpdated,
}: EditCustomerProps) => {
  const { mutate: updateCustomer, isPending } = useUpdateCustomer(() => {
    onCustomerUpdated();
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
    if (customerData) {
      reset(customerData);
    }
  }, [customerData, reset]);

  const onSubmit = (data: any) => {
    const formattedData = {
      ...data,
      set_id: customerData.id.id,
    };
    updateCustomer(formattedData);
  };

  return (
    <div className="flex flex-col items-start gap-8">
      <h1 className="font-bold text-xl">ویرایش مشتری</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 w-72 md:w-96"
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

        <Textarea
          {...register("additionalInfo.description")}
          className="bg-gray-100 p-3 w-full rounded-lg border border-gray-200"
          placeholder="توضیحات"
        />

        <Button
          type="submit"
          disabled={isPending || isSubmitting}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          {isPending || isSubmitting ? "⏳ در حال ویرایش..." : "ویرایش مشتری"}
        </Button>
      </form>
    </div>
  );
};

export default EditCustomerForm;
