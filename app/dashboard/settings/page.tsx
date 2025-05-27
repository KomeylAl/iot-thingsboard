"use client";

import Header from "@/components/Header";
import {
  useSyncAssets,
  useSyncCustomers,
  useSyncDevices,
} from "@/hooks/useSync";
import { useUser } from "@/hooks/useUser";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { ClipLoader } from "react-spinners";

const DashboardSettings = () => {
  const { data: userData } = useUser();
  const { isLoading: syncDevicesIsLoading, refetch: syncDevicesRefetch } =
    useSyncDevices();

  const { isLoading: syncCustomersIsLoading, refetch: syncCustomersRefetch } =
    useSyncCustomers(userData && userData.data.tenantId.id);

  const { isLoading: syncAssetsIsLoading, refetch: syncAssetsRefetch } =
    useSyncAssets(userData && userData.data.tenantId.id);

  return (
    <div className="w-full h-screen">
      <Header isShowSearch={false} searchFn={() => {}} />

      <div className="w-full h-fullp-6 lg:p-12 space-y-6">
        <h1 className="text-xl lg:text-2xl font-bold">تنظیمات</h1>
        <div className="w-full">
          <h2>همگام سازی</h2>
          <div className="w-full md:w-[50%] h-full flex flex-col gap-3 mt-4">
            <div className="w-full p-3 bg-white dark:bg-gray-700 rounded-md flex items-center justify-between">
              <p>همگام سازی اطلاعات مشتریان</p>
              <button
                onClick={() => {
                  syncCustomersRefetch();
                }}
                className="flex items-center justify-center"
              >
                {syncCustomersIsLoading ? (
                  <ClipLoader color="#2775f2" size={20} />
                ) : (
                  <FaArrowLeft className="text-blue-500" />
                )}
              </button>
            </div>
            <div className="w-full p-3 bg-white dark:bg-gray-700 rounded-md flex items-center justify-between">
              <p>همگام سازی اطلاعات دستگاه ها</p>
              <button
                onClick={() => {
                  syncDevicesRefetch();
                }}
                className="flex items-center justify-center"
              >
                {syncDevicesIsLoading ? (
                  <ClipLoader color="#2775f2" size={20} />
                ) : (
                  <FaArrowLeft className="text-blue-500" />
                )}
              </button>
            </div>
            <div className="w-full p-3 bg-white dark:bg-gray-700 rounded-md flex items-center justify-between">
              <p>همگام سازی اطلاعات دارایی ها</p>
              <button
                onClick={() => {
                  syncAssetsRefetch();
                }}
                className="flex items-center justify-center"
              >
                {syncAssetsIsLoading ? (
                  <ClipLoader color="#2775f2" size={20} />
                ) : (
                  <FaArrowLeft className="text-blue-500" />
                )}
              </button>
            </div>
            {/* <div className="w-full p-3 bg-white rounded-md flex items-center justify-between">
              <p>همگام سازی اطلاعات داشبورد ها</p>
              <button>
                <FaArrowLeft className="text-blue-500" />
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSettings;
