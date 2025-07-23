"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAddCustomerUser } from "@/hooks/useCustomers";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object({
  firstName: yup.string().required("نام الزامی است"),
  lastName: yup.string().required("نام خانوادگی الزامی است"),
  phone: yup.string().optional(),
  password: yup.string().required(),
  email: yup.string().required().email("ایمیل معتبر نیست").optional(),
});

interface AddUserProps {
  onUserAdded: () => void;
  customerId: string;
}

const AddCustomerUserForm = ({ onUserAdded, customerId }: AddUserProps) => {
  const { mutate: addUser, isPending } = useAddCustomerUser(
    customerId,
    onUserAdded
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    addUser(data);
  };

  return (
    <div className="flex flex-col items-start gap-8">
      <h1 className="font-bold text-xl">افزودن کاربر</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 w-72 md:w-96"
      >
        <Input {...register("firstName")} placeholder="نام*" />
        {errors.firstName && (
          <p className="text-red-500 text-sm">{errors.firstName.message}</p>
        )}

        <Input {...register("lastName")} placeholder="نام خانوداگی*" />
        {errors.lastName && (
          <p className="text-red-500 text-sm">{errors.lastName.message}</p>
        )}

        <Input {...register("email")} placeholder="ایمیل*" />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}

        <Input {...register("phone")} placeholder="تلفن" />

        <Input
          {...register("password")}
          type="password"
          placeholder="رمز عبور*"
        />

        <Button type="submit" disabled={isPending || isSubmitting}>
          {isPending || isSubmitting ? "⏳ در حال افزودن..." : "افزودن کاربر"}
        </Button>
      </form>
    </div>
  );
};

export default AddCustomerUserForm;
