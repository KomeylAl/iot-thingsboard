"use client";

import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface AddPlanProps {
  onPlanAdded: () => void;
}

const AddPlan = ({ onPlanAdded }: AddPlanProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    maxDevices: 0,
    maxRequestPerHour: 0,
  });

  const handleSubmit = async () => {
    if (!formData.name || !formData.maxDevices || !formData.maxRequestPerHour) {
      toast.error("لطفا همه فیلد هارا پر کنید");
    } else {
      setIsLoading(true);
      await axios
        .post("/api/sysadmin/plans/store", formData)
        .then(function (response) {
          if (response.status === 201) {
            toast.success("پلن با موفقیت افزوده شد");
            onPlanAdded();
          }
        })
        .catch(function (error) {
          toast.error("خطا در افزودن پلن");
          console.log("ERR_ADD_TENANT", error);
        })
        .finally(() => setIsLoading(false));
    }
  };

  return (
    <div className="flex flex-col items-start gap-8">
      <h1 className="font-bold text-xl">افزودن پلن</h1>
      <div className="flex flex-col gap-3 w-72 md:w-96">
        <input
          type="text"
          value={formData.name}
          onChange={(e: any) =>
            setFormData((prev: any) => ({ ...prev, name: e.target.value }))
          }
          placeholder="عنوان پلن*"
          className="bg-gray-100 p-3 w-full rounded-lg border border-gray-200"
          required
        />
        <input
          type="number"
          onChange={(e: any) =>
            setFormData((prev: any) => ({
              ...prev,
              maxDevices: e.target.value,
            }))
          }
          placeholder="حداکثر دستگاه"
          className="bg-gray-100 p-3 w-full rounded-lg border border-gray-200"
        />
        <input
          type="number"
          onChange={(e: any) =>
            setFormData((prev: any) => ({
              ...prev,
              maxRequestPerHour: e.target.value,
            }))
          }
          placeholder="حداکثر درخواست در ساعت"
          className="bg-gray-100 p-3 w-full rounded-lg border border-gray-200"
        />
        <button
          onClick={handleSubmit}
          className="bg-sky-600 p-3 rounded-lg mt-4 text-white"
        >
          {isLoading ? "در حال ارسال..." : "افزودن پلن"}
        </button>
      </div>
    </div>
  );
};

export default AddPlan;
