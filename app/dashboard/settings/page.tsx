"use client";

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
  const {
    data: syncDevicesData,
    isLoading: syncDevicesIsLoading,
    error: syncDevicesError,
    refetch: syncDevicesRefetch,
  } = useSyncDevices();

  const {
    data: syncCustomersData,
    isLoading: syncCustomersIsLoading,
    error: syncCustomersError,
    refetch: syncCustomersRefetch,
  } = useSyncCustomers(userData && userData.data.tenantId.id);

  const {
    data: syncAssetsData,
    isLoading: syncAssetsIsLoading,
    error: syncAssetsError,
    refetch: syncAssetsRefetch,
  } = useSyncAssets(userData && userData.data.tenantId.id);

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
            <div className="w-full p-3 bg-white rounded-md flex items-center justify-between">
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
            <div className="w-full p-3 bg-white rounded-md flex items-center justify-between">
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
