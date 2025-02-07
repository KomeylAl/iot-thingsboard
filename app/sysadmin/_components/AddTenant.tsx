"use client";

import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface AddTenantProps {
  onTenantAdded: () => void;
}

const AddTenant = ({ onTenantAdded }: AddTenantProps) => {
  const [isLoading, setIsLoading] = useState(false);
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
  });

  const handleSubmit = async () => {
    if (!formData.title) {
      toast.error("یک عنوان برای سازمان انتخاب کنید");
    } else {
      setIsLoading(true);
      await axios
        .post("/api/sysadmin/tenants", formData)
        .then(function (response) {
          if (response.status === 201) {
            toast.success("سازمان با موفقیت افزوده شد");
            onTenantAdded();
          }
        })
        .catch(function (error) {
          toast.error("خطا در افزودن سازمان");
          console.log("ERR_ADD_TENANT", error);
        })
        .finally(() => setIsLoading(false));
    }
  };

  return (
    <div className="flex flex-col items-start gap-8">
      <h1 className="font-bold text-xl">افزودن سازمان</h1>
      <div className="flex flex-col gap-3 w-72 md:w-96">
        <input
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
        />
        <button
          onClick={handleSubmit}
          className="bg-sky-600 p-3 rounded-lg mt-4 text-white"
        >
          {isLoading ? "در حال ارسال..." : "افزودن سازمان"}
        </button>
      </div>
    </div>
  );
};

export default AddTenant;
