"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";

interface DeletePlanProps {
  id: number;
  onCanceled: () => void;
  onPlanDeleted: () => void;
}

const DeletePlan = ({ id, onCanceled, onPlanDeleted }: DeletePlanProps) => {
  const deletePlan = async () => {
    const res = await axios.delete(`/api/sysadmin/plans/${id}/destroy`);
    if (res.status !== 200) {
      toast.error(`خطا در حذف پلن ${res.status}`);
    }
    onPlanDeleted();
    return res;
  };

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["plan"],
    queryFn: deletePlan,
    enabled: false,
  });

  return (
    <div className="w-96">
      <p>برای حذف این مورد اطمینان دارید؟</p>
      <div className="flex items-center gap-3 mt-4">
        <button
          onClick={onCanceled}
          className="px-4 py-2 bg-blue-500 rounded-md text-white"
        >
          لغو
        </button>
        <button
          onClick={() => refetch()}
          className={`px-4 py-2 ${
            isLoading ? "bg-rose-300" : "bg-rose-500"
          } rounded-md text-white flex items-center justify-center`}
        >
          {isLoading ? <ClipLoader color="#ffffff" size={20} /> : "حذف"}
        </button>
      </div>
    </div>
  );
};

export default DeletePlan;
