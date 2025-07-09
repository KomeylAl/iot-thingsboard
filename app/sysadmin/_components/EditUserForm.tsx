"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAddUser } from "@/hooks/useUser";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object({
  firstName: yup.string().required("نام الزامی است"),
  lastName: yup.string().required("نام خانوادگی الزامی است"),
  phone: yup.string().optional(),
  password: yup.string().required(),
  email: yup.string().required().email("ایمیل معتبر نیست").optional(),
});

interface EditUserProps {
  onUserEdited: () => void;
  tenantId: string;
  userData: any;
}

const EditUserForm = ({ onUserEdited, tenantId, userData }: EditUserProps) => {
  const { mutate: addUser, isPending } = useAddUser(tenantId, onUserEdited);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
   if (userData) {
     reset(userData);
   }
 }, [userData, reset])

  const onSubmit = (data: any) => {
    addUser(data);
  };

  return (
    <div className="flex flex-col items-start gap-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 w-full"
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

        <Button
          type="submit"
          disabled={isPending || isSubmitting}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          {isPending || isSubmitting ? "⏳ در حال افزودن..." : "افزودن کاربر"}
        </Button>
      </form>
    </div>
  );
};

export default EditUserForm;
