"use client";

import React from "react";
import { useRequests } from "@/hooks/useRequest";
import { PuffLoader } from "react-spinners";

const LastRequests = () => {
  const { data, isLoading, error } = useRequests();
  console.log(data);

  return (
    <div className="w-full h-full space-y-3">
      <h2 className="font-bold">آخرین درخواست ها</h2>
      {error && <p>خطا در دریافت اطلاعات درخواست ها</p>}

      {isLoading && (
        <div className="w-full h-full flex items-center justify-center">
          <PuffLoader color="#3b82f6" size={45} />
        </div>
      )}

      {data.length === 0 && (
        <p className="mt-4 text-sm">درخواستی برای نمایش وجود ندارد.</p>
      )}

      {data && (
        <div className="space-y-3">
          {data.map((item: any, index: any) => (
            <div key={index} className="w-full bg-white dark:bg-gray-700 rounded-md p-3 flex items-center justify-between">
              <p className="text-blue-500">{index + 1}</p>
              <p>{item.tenant.name}</p>
              <p>{item.device.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LastRequests;
