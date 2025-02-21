"use client";

import { convertISOToJalali } from "@/utils/convert";
import { useQueries } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { FaArrowLeft } from "react-icons/fa";
import { ClipLoader, PuffLoader } from "react-spinners";

const synsTenants = async () => {
  const res = await axios.get("/api/sysadmin/syncronization/tenants");
  if (res.status === 200) {
    toast.success("عملیات موفقت آمیز بود");
  } else {
    toast.error(`خطا در همگام سازی اطلاعات ${res.status}`);
    console.log(res.data);
  }
  return res;
};

const getSyncLog = async () => {
  const res = await axios.get("/api/sysadmin/syncronization/logs");
  if (res.status !== 200) {
    toast.error(`خطا در دریافت اطلاعات ${res.status}`);
  }
  return res;
};

const Settings = () => {
  const results = useQueries({
    queries: [
      { queryKey: ["tenants"], queryFn: synsTenants, enabled: false },
      { queryKey: ["logs"], queryFn: getSyncLog, enabled: true },
    ],
  });

  const [tenants, logs] = results;

  return (
    <div className="p-6 lg:p-20 w-full h-screen flex flex-col items-center justify-between gap-6">
      <div className="w-full h-[15%] flex flex-col items-start justify-between">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-xl lg:text-3xl font-bold">تنظیمات</h1>
        </div>
      </div>
      <div className="w-full h-[85%]">
        <div className="w-full h-[50%]">
          <h2>همگام سازی</h2>
          <div className="w-full md:w-[50%] h-full flex flex-col gap-3 mt-4">
            <div className="w-full p-3 bg-white rounded-md flex items-center justify-between">
              <p>همگام سازی اطلاعات سازمان ها</p>
              <button
                onClick={() => {
                  tenants.refetch();
                  logs.refetch();
                }}
                className="flex items-center justify-center"
              >
                {tenants.isLoading ? (
                  <ClipLoader color="#2775f2" size={20} />
                ) : (
                  <FaArrowLeft className="text-blue-500" />
                )}
              </button>
            </div>
            <div className="w-full p-3 bg-white rounded-md flex items-center justify-between">
              <p>همگام سازی اطلاعات پروفایل ها</p>
              <button>
                <FaArrowLeft className="text-blue-500" />
              </button>
            </div>
            <div className="w-full p-3 bg-white rounded-md flex items-center justify-between">
              <p>همگام سازی اطلاعات کاربران</p>
              <button>
                <FaArrowLeft className="text-blue-500" />
              </button>
            </div>
            <div className="w-full p-3 bg-white rounded-md flex items-center justify-between">
              <p>همگام سازی اطلاعات دستگاه ها و دارایی ها</p>
              <button>
                <FaArrowLeft className="text-blue-500" />
              </button>
            </div>
          </div>
        </div>
        <div className="w-full h-[50%]">
          <h2>آخرین همگام سازی ها</h2>
          <div className="w-full md:w-[50%] h-full rounded-md mt-4 overflow-auto">
            {logs.isLoading && (
              <div className="w-full h-full flex items-center justify-center">
                <PuffLoader color="#3b82f6" />
              </div>
            )}
            {logs.data?.data.map((log: any, index: any) => (
              <div
                key={log.id}
                className="w-full bg-white rounded-md p-4 flex items-center justify-between mt-2"
              >
                <p className="text-blue-500">{index + 1}</p>
                <p className="">{log.entity}</p>
                <p className="">{log.status}</p>
                <p className="">{convertISOToJalali(log.timestamp)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
