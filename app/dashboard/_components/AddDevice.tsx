"use client";

import { useUser } from "@/hooks/useUser";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface AddDeviceProps {
  onDeviceAdded: () => void;
}

const AddDevice = ({ onDeviceAdded }: AddDeviceProps) => {
  const { data, isLoading } = useUser();
  if (data) {
    console.log(data.data.tenantId.id);
  }

  const [isdLoading, setIsdLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    label: "",
    tenantId: "",
    additionalInfo: {
      location: "",
      description: "",
    },
  });

  useEffect(() => {
    if (data) {
      setFormData((prev) => ({
        ...prev,
        tenantId: data.data.tenantId.id,
      }));
    }
  }, [data]);

  const handleSubmit = async () => {
    if (!formData.name) {
      toast.error("یک نام برای دستگاه انتخاب کنید");
    } else {
      setIsdLoading(true);
      await axios
        .post("/api/devices", formData)
        .then(function (response) {
          if (response.status === 201) {
            toast.success("دستگاه با موفقیت افزوده شد");
            onDeviceAdded();
          }
        })
        .catch(function (error) {
          toast.error("خطا در افزودن دستگاه");
          console.log("ERR_ADD_DEVICE", error);
        })
        .finally(() => setIsdLoading(false));
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="flex flex-col items-start gap-8">
      <h1 className="font-bold text-xl">افزودن دستگاه</h1>
      <div className="flex flex-col gap-3 w-72 md:w-96">
        <input
          type="text"
          value={formData.name}
          onChange={(e: any) =>
            setFormData((prev: any) => ({ ...prev, name: e.target.value }))
          }
          placeholder="نام دستگاه*"
          className="bg-gray-100 p-3 w-full rounded-lg border border-gray-200"
          required
        />
        <input
          type="text"
          value={formData.label}
          onChange={(e: any) =>
            setFormData((prev: any) => ({ ...prev, label: e.target.value }))
          }
          placeholder="برچسب دستگاه"
          className="bg-gray-100 p-3 w-full rounded-lg border border-gray-200"
        />
        <input
          type="text"
          value={formData.type}
          onChange={(e: any) =>
            setFormData((prev: any) => ({ ...prev, type: e.target.value }))
          }
          placeholder="پروفایل دستگاه"
          className="bg-gray-100 p-3 w-full rounded-lg border border-gray-200"
        />
        <input
          type="text"
          value={formData.additionalInfo.location}
          onChange={(e: any) =>
            setFormData((prev: any) => ({
              ...prev,
              additionalInfo: {
                ...prev.additionalInfo,
                location: e.target.value,
              },
            }))
          }
          placeholder="مکان"
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
          {isdLoading ? "در حال ارسال..." : "افزودن دستگاه"}
        </button>
      </div>
    </div>
  );
};

export default AddDevice;
