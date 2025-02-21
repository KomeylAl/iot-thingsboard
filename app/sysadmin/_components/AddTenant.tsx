"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

interface AddTenantProps {
  onTenantAdded: () => void;
}

const schema = yup.object({
  title: yup.string().required("عنوان الزامی است"),
  email: yup.string().email("ایمیل معتبر وارد کنید"),
});

const getPlans = async () => {
  const res = await axios.get("/api/sysadmin/plans");
  if (res.status !== 200) {
    toast.error(`خطا در دریافت اطلاعات ${res.status}`);
  }
  return res;
};

const AddTenant = ({ onTenantAdded }: AddTenantProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["plans"],
    queryFn: getPlans,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // const { mutate: addNewTenant, isPending } = useMutation({
  //   mutationFn: async (newUser) => {
  //     const res = await fetch("/api/users", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(newUser),
  //     });
  //     if (!res.ok) throw new Error("خطا در افزودن کاربر!");
  //     return res.json();
  //   },
  //   onSuccess: () => {
  //     reset();
  //     toast.success("✅ کاربر با موفقیت اضافه شد!");
  //   },
  // });

  const [formData, setFormData] = useState({
    title: "",
    country: "",
    state: "",
    city: "",
    address: "",
    address2: "",
    zip: "",
    phone: "",
    email: "",
    region: "",
    profile: "",
    additionalInfo: {
      description: "",
    },
    plan: null,
  });

  const addTenant = async (data: any) =>
    await axios.post("/api/sysadmin/tenants", data);

  const { mutate: addTenantMutation, isPending: isAdding } = useMutation({
    mutationFn: addTenant,
    mutationKey: ["addTenant"],
    onSuccess: () => {
      toast.success("سازمان با موفقیت افزوده شد");
      onTenantAdded();
    },
    onError: () => {
      toast.error("خطا در افزودن سازمان");
      console.log("ERR_ADD_TENANT", error);
    },
  });

  return (
    <div className="flex flex-col items-start gap-8">
      <h1 className="font-bold text-xl">افزودن سازمان</h1>
      <div className="flex flex-col gap-3 w-72 md:w-96">
        <form action="">
        <div className="mb-3">
        <label className="block font-medium">نام</label>
        <input {...register("title")} className="w-full px-3 py-2 border rounded-lg" />
        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
      </div>

      <div className="mb-3">
        <label className="block font-medium">ایمیل</label>
        <input {...register("email")} className="w-full px-3 py-2 border rounded-lg" />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>
        {/* <input
          type="text"
          value={formData.title}
          onChange={(e: any) =>
            setFormData((prev: any) => ({ ...prev, title: e.target.value }))
          }
          placeholder="عنوان سازان*"
          className="bg-gray-100 p-3 w-full rounded-lg border border-gray-200"
          required
        />
        <input
          type="text"
          value={formData.profile}
          onChange={(e: any) =>
            setFormData((prev: any) => ({ ...prev, profile: e.target.value }))
          }
          placeholder="پروفایل سازمان"
          className="bg-gray-100 p-3 w-full rounded-lg border border-gray-200"
        />
        <input
          type="text"
          value={formData.country}
          onChange={(e: any) =>
            setFormData((prev: any) => ({ ...prev, country: e.target.value }))
          }
          placeholder="کشور"
          className="bg-gray-100 p-3 w-full rounded-lg border border-gray-200"
        />
        <div className="w-full flex items-center gap-3">
          <input
            type="text"
            value={formData.city}
            onChange={(e: any) =>
              setFormData((prev: any) => ({
                ...prev,
                city: e.target.value,
              }))
            }
            placeholder="شهر"
            className="bg-gray-100 p-3 w-full rounded-lg border border-gray-200"
          />
          <input
            type="text"
            value={formData.state}
            onChange={(e: any) =>
              setFormData((prev: any) => ({
                ...prev,
                state: e.target.value,
              }))
            }
            placeholder="استان"
            className="bg-gray-100 p-3 w-full rounded-lg border border-gray-200"
          />
          <input
            type="text"
            value={formData.zip}
            onChange={(e: any) =>
              setFormData((prev: any) => ({
                ...prev,
                zip: e.target.value,
              }))
            }
            placeholder="کد پستی"
            className="bg-gray-100 p-3 w-full rounded-lg border border-gray-200"
          />
        </div>
        <input
          type="text"
          value={formData.address}
          onChange={(e: any) =>
            setFormData((prev: any) => ({
              ...prev,
              address: e.target.value,
            }))
          }
          placeholder="نشانی"
          className="bg-gray-100 p-3 w-full rounded-lg border border-gray-200"
        />
        <input
          type="text"
          value={formData.address2}
          onChange={(e: any) =>
            setFormData((prev: any) => ({
              ...prev,
              address2: e.target.value,
            }))
          }
          placeholder="نشانی 2"
          className="bg-gray-100 p-3 w-full rounded-lg border border-gray-200"
        />
        <input
          type="text"
          value={formData.phone}
          onChange={(e: any) =>
            setFormData((prev: any) => ({
              ...prev,
              phone: e.target.value,
            }))
          }
          placeholder="تلفن"
          className="bg-gray-100 p-3 w-full rounded-lg border border-gray-200"
        />
        <input
          type="email"
          value={formData.email}
          onChange={(e: any) =>
            setFormData((prev: any) => ({
              ...prev,
              email: e.target.value,
            }))
          }
          placeholder="ایمیل"
          className="bg-gray-100 p-3 w-full rounded-lg border border-gray-200"
        />
        <textarea
          value={formData.additionalInfo.description}
          onChange={(e: any) =>
            setFormData((prev: any) => ({
              ...prev,
              additionalInfo: {
                ...prev.additionalInfo,
                description: e.target.value,
              },
            }))
          }
          placeholder="توضیحات"
          className="bg-gray-100 p-3 w-full rounded-lg border border-gray-200"
        /> */}
        <button
          type="submit"
          // onClick={() => addTenantMutation()}
          className="bg-sky-600 p-3 rounded-lg mt-4 text-white"
        >
          {isLoading ? "در حال ارسال..." : "افزودن سازمان"}
        </button>
        </form>
      </div>
    </div>
  );
};

export default AddTenant;
