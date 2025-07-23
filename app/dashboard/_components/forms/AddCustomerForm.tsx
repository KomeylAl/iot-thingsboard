"use client";

import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

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
  additionalInfo: yup.object({
    description: yup.string().optional(),
  }),
  email: yup.string().email("ایمیل معتبر نیست").optional(),
});

interface AddCustomerProps {
  onCustomerAdded: () => void;
}

const AddCustomerForm = ({ onCustomerAdded }: AddCustomerProps) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { mutate: addCustomer, isPending } = useMutation({
    mutationFn: async (CustomerData) => {
      const res = await axios.post("/api/customers", CustomerData);
      return res.data;
    },
    onSuccess: () => {
      reset();
      toast.success("مشتری جدید با موفقیت اضافه شد");
      onCustomerAdded();
    },
    onError: (error) => {},
  });

  const onSubmit = (data: any) => {
    addCustomer(data);
  };

  return (
    <div className="flex flex-col items-start gap-8">
      <h1 className="font-bold text-xl">افزودن مشتری</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 w-72 md:w-96"
      >
        <Input {...register("title")} placeholder="عنوان*" />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}

        <Input {...register("country")} placeholder="کشور" />

        <div className="w-full flex items-center gap-3">
          <Input {...register("city")} placeholder="شهر" />
          <Input {...register("state")} placeholder="استان" />
          <Input {...register("zip")} placeholder="کد پستی" />
        </div>

        <Input {...register("address")} placeholder="نشانی" />

        <Input {...register("address2")} placeholder="نشانی 2" />

        <Input {...register("phone")} placeholder="تلفن" />

        <Input {...register("email")} placeholder="ایمیل" />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}

        <Textarea
          {...register("additionalInfo.description")}
          placeholder="توضیحات"
        />

        <Button type="submit" disabled={isPending || isSubmitting}>
          {isPending || isSubmitting ? "⏳ در حال افزودن..." : "افزودن مشتری"}
        </Button>
      </form>
    </div>
  );
};

export default AddCustomerForm;
