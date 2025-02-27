"use client";

import { useAddUser } from "@/hooks/useUser";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object({
  firstName: yup.string().required("نام الزامی است"),
  lastName: yup.string().required("نام خانوادگی الزامی است"),
  phone: yup.string().optional(),
  email: yup.string().required().email("ایمیل معتبر نیست").optional(),
});

interface AddUserProps {
  onUserAdded: () => void;
  tenantId: string;
}

const AddUserForm = ({ onUserAdded, tenantId }: AddUserProps) => {
  const { mutate: addUser, isPending } = useAddUser(tenantId);

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
        <input
          {...register("firstName")}
          className="bg-gray-100 p-3 w-full rounded-lg border border-gray-200"
          placeholder="نام*"
        />
        {errors.firstName && (
          <p className="text-red-500 text-sm">{errors.firstName.message}</p>
        )}

        <input
          {...register("lastName")}
          className="bg-gray-100 p-3 w-full rounded-lg border border-gray-200"
          placeholder="نام خانوداگی*"
        />
        {errors.lastName && (
          <p className="text-red-500 text-sm">{errors.lastName.message}</p>
        )}

        <input
          {...register("email")}
          className="bg-gray-100 p-3 w-full rounded-lg border border-gray-200"
          placeholder="ایمیل*"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}

        <input
          {...register("phone")}
          className="bg-gray-100 p-3 w-full rounded-lg border border-gray-200"
          placeholder="تلفن"
        />

        <button
          type="submit"
          disabled={isPending || isSubmitting}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          {isPending || isSubmitting ? "⏳ در حال افزودن..." : "افزودن کاربر"}
        </button>
      </form>
    </div>
  );
};

export default AddUserForm;
