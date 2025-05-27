"use client";

import Header from "@/components/Header";
import Table from "@/components/Table";
import {
  useSyncLogs,
  useSyncTenantProfiles,
  useSyncTenants,
} from "@/hooks/useSync";
import { convertISOToJalali } from "@/utils/convert";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaArrowLeft } from "react-icons/fa";
import { ClipLoader, PuffLoader } from "react-spinners";

const Settings = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const {
    data: syncTenantsData,
    isLoading: syncTenantsLoading,
    error: syncTenantsError,
    refetch: syncTenantsRefetch,
  } = useSyncTenants();

  const {
    data: syncTenantProfilesData,
    isLoading: syncTenantProfilesLoading,
    error: syncTenantProfilesError,
    refetch: syncTenantProfilesRefetch,
  } = useSyncTenantProfiles();

  const {
    data: syncLogsData,
    isLoading: syncLogsLoading,
    error: syncLogsError,
    refetch: syncLogsRefetch,
  } = useSyncLogs(page, pageSize);

  const columns = [
    { header: "موجودیت", accessor: "entity" },
    { header: "وضعیت", accessor: "status" },
    {
      header: "زمان ایجاد",
      accessor: (item: any) => convertISOToJalali(item.timestamp),
    },
  ];

  return (
    <div className="w-full h-screen">
      <Header isShowSearch={false} searchFn={() => {}} />

      <div className="w-full h-fullp-6 lg:p-12 space-y-6">
        <h1 className="text-xl lg:text-2xl font-bold">تنظیمات</h1>
        <div className="w-full">
          <h2>همگام سازی</h2>
          <div className="w-full h-full flex gap-3 mt-4">
            <div className="w-full p-3 bg-white dark:bg-gray-700 rounded-md flex items-center justify-between">
              <p>همگام سازی اطلاعات سازمان ها</p>
              <button
                onClick={() => {
                  syncTenantsRefetch();
                  syncLogsRefetch();
                }}
                className="flex items-center justify-center"
              >
                {syncTenantsLoading ? (
                  <ClipLoader color="#2775f2" size={20} />
                ) : (
                  <FaArrowLeft className="text-blue-500" />
                )}
              </button>
            </div>
            <div className="w-full p-3 bg-white dark:bg-gray-700 rounded-md flex items-center justify-between">
              <p>همگام سازی اطلاعات پروفایل ها</p>
              <button
                onClick={() => {
                  syncTenantProfilesRefetch();
                  syncLogsRefetch();
                }}
                className="flex items-center justify-center"
              >
                {syncTenantProfilesLoading ? (
                  <ClipLoader color="#2775f2" size={20} />
                ) : (
                  <FaArrowLeft className="text-blue-500" />
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="w-full">
          <h2>آخرین همگام سازی ها</h2>
          <div className="w-full h-full rounded-md mt-4 overflow-auto">
            {syncLogsLoading && (
              <div className="w-full h-full flex items-center justify-center">
                <PuffLoader color="#3b82f6" />
              </div>
            )}
            {syncLogsError && <p>خطا در دریافت اطلاعات لاگ ها</p>}
            {syncLogsData && (
              <Table
                columns={columns}
                data={syncLogsData.data}
                pageSize={pageSize}
                totalItems={syncLogsData.pagination.total}
                currentPage={page}
                onPageChange={(newPage) => setPage(newPage)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
