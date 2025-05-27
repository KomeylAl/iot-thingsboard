import { useLocalAssets } from "@/hooks/useAssets";
import { useCustomers, useLocalCustomers } from "@/hooks/useCustomers";
import { useLocalDevices } from "@/hooks/useDevices";
import { useAllUsers } from "@/hooks/useUser";
import React from "react";
import { PuffLoader } from "react-spinners";

const EntitiesSection = () => {
  const {
    data: devicesData,
    isLoading: devicesLoading,
    error: devicesError,
  } = useLocalDevices();

  const {
    data: assetsData,
    isLoading: assetsLoading,
    error: assetsError,
  } = useLocalAssets();

  const {
    data: usersData,
    isLoading: usersLoading,
    error: usersError,
  } = useAllUsers();

  const {
    data: customersData,
    isLoading: customersLoading,
    error: customersError,
  } = useLocalCustomers();

  return (
    <>
      {/* بخش راست */}
      <div className="flex-1 flex flex-col lg:flex-row gap-5">
        <div className="flex-1 flex flex-col gap-5">
          <div className="flex-1 rounded-lg bg-white dark:bg-gray-700 flex items-center justify-center">
            {devicesError && <p>خطا در دریافت اطلاعات دستگاه ها</p>}

            {devicesLoading && (
              <div className="w-full h-full flex items-center justify-center">
                <PuffLoader color="#3b82f6" size={45} />
              </div>
            )}

            {devicesData && (
              <div className="text-center">
                <p>دستگاه ها</p>
                <p>{devicesData.meta.totalCount}</p>
              </div>
            )}
          </div>
          <div className="flex-1 rounded-lg bg-white dark:bg-gray-700 flex items-center justify-center">
            {usersError && <p>خطا در دریافت اطلاعات کاربران</p>}

            {usersLoading && (
              <div className="w-full h-full flex items-center justify-center">
                <PuffLoader color="#3b82f6" size={45} />
              </div>
            )}

            {usersData && (
              <div className="text-center">
                <p>کاربران</p>
                <p>{usersData.meta.totalCount}</p>
              </div>
            )}
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-5">
          <div className="flex-1 rounded-lg bg-white dark:bg-gray-700 flex items-center justify-center">
            {assetsError && <p>خطا در دریافت اطلاعات دارایی ها</p>}

            {assetsLoading && (
              <div className="w-full h-full flex items-center justify-center">
                <PuffLoader color="#3b82f6" size={45} />
              </div>
            )}

            {assetsData && (
              <div className="text-center">
                <p>دارایی ها</p>
                <p>{assetsData.meta.totalCount}</p>
              </div>
            )}
          </div>
          <div className="flex-1 rounded-lg bg-white dark:bg-gray-700 flex items-center justify-center">
            {customersError && <p>خطا در دریافت اطلاعات مشتریان</p>}

            {customersLoading && (
              <div className="w-full h-full flex items-center justify-center">
                <PuffLoader color="#3b82f6" size={45} />
              </div>
            )}

            {customersData && (
              <div className="text-center">
                <p>مشتریان</p>
                <p>{customersData.meta.totalCount}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EntitiesSection;
