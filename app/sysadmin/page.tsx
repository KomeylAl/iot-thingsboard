"use client";

import Popup from "@/components/Popup";
import { formatBytes } from "@/utils/convert";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiPlus } from "react-icons/bi";
import AddTenant from "./_components/AddTenant";
import AddTenantForm from "./_components/AddTenantForm";
import LastRequests from "./_components/LastRequests";
import { PuffLoader } from "react-spinners";

const AdminDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGettingSysInfo, setIsGettingSysInfo] = useState(false);
  const [isGettingTenants, setIsGettingTenants] = useState(false);
  const [tenants, setTenants] = useState([]);
  const [tenantsPageInfo, setTenantsPageInfo] = useState({
    totalPages: 0,
    totalElements: 0,
    hasNext: false,
  });

  const [systemInfo, setSystemInfo]: any = useState({
    cpuUsage: 0,
    cpuCount: 0,
    memoryUsage: 0,
    totalMemory: 0,
    discUsage: 0,
    totalDiscSpace: 0,
    serviceType: "MONOLITH",
  });

  const getStstemInfo = async () => {
    setIsGettingSysInfo(true);
    await axios
      .get("/api/sysadmin/systemInfo")
      .then(function (response) {
        setSystemInfo({
          cpuUsage: response.data.systemData[0].cpuUsage,
          cpuCount: response.data.systemData[0].cpuCount,
          memoryUsage: response.data.systemData[0].memoryUsage,
          totalMemory: response.data.systemData[0].totalMemory,
          discUsage: response.data.systemData[0].discUsage,
          totalDiscSpace: response.data.systemData[0].totalDiscSpace,
          serviceType: response.data.systemData[0].serviceType,
        });
      })
      .catch(function (error) {
        toast.error("خطا در دریافت اطلاعات سیستم");
      })
      .finally(() => setIsGettingSysInfo(false));
  };

  const getTenants = async () => {
    setIsGettingTenants(true);
    await axios
      .get("/api/sysadmin/tenants")
      .then(function (response) {
        console.log(response.data);
        const data = response.data;
        setTenants(response.data.data);
        setTenantsPageInfo({
          hasNext: data.hasNext,
          totalElements: data.totalElements,
          totalPages: data.totalPages,
        });
      })
      .catch(function (error) {
        toast.error("خطا در دریافت اطلاعات سازمان ها");
      })
      .finally(() => setIsGettingTenants(false));
  };

  useEffect(() => {
    getStstemInfo();
    getTenants();
  }, []);

  return (
    <div className="p-6 lg:p-20 w-full min-h-screen flex flex-col">
      {/* هدر */}
      <h1 className="text-xl lg:text-3xl font-bold">داشبورد مدیریت</h1>

      {/* محتوای اصلی */}
      <div className="flex-1 flex flex-col lg:flex-row gap-6 mt-6 overflow-hidden">
        {/* بخش اصلی چپ */}
        <div className="w-full lg:w-[65%] flex flex-col gap-5">
          {/* بخش بالا */}
          <div className="flex-1 flex flex-col lg:flex-row gap-5 overflow-hidden">
            <div className="flex flex-col w-full lg:w-[50%] gap-5">
              <div className="w-full flex-1 bg-white rounded-lg p-4 flex items-center justify-between relative overflow-hidden">
                <div className="absolute top-1 lg:top-6 left-5 w-20 h-20 bg-sky-500 rounded-full filter blur-2xl" />
                <div>
                  <p className="text-lg">تعداد سازمان ها</p>
                  <div className="flex items-center gap-4 mt-3">
                    <p className="text-lg">{tenantsPageInfo.totalElements}</p>
                    <button onClick={() => setIsModalOpen(true)}>
                      <BiPlus size={25} className="text-blue-500" />
                    </button>
                  </div>
                </div>
                <Image
                  src="/images/device_vector.png"
                  alt="devices"
                  width={100}
                  height={100}
                  className="w-24 h-24 object-cover"
                />
              </div>
              <div className="w-full flex-1 bg-white rounded-lg p-4 flex items-center justify-between relative overflow-hidden">
                <div className="absolute top-1 lg:top-6 left-5 w-20 h-20 bg-amber-500 rounded-full filter blur-2xl" />
                <div>
                  <p className="text-lg">تعداد پروفایل سازمان ها</p>
                </div>
                <Image
                  src="/images/assets_vector.png"
                  alt="assets"
                  width={100}
                  height={100}
                  className="w-24 h-24 object-cover"
                />
              </div>
            </div>

            {/* بخش راست */}
            <div className="flex-1 flex flex-col lg:flex-row gap-5">
              <div className="flex-1 flex flex-col gap-5">
                <div className="flex-1 rounded-lg bg-white flex items-center justify-center">
                  دستگاه ها
                </div>
                <div className="flex-1 rounded-lg bg-white flex items-center justify-center">
                  کاربران
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-5">
                <div className="flex-1 rounded-lg bg-white flex items-center justify-center">
                  دارایی ها
                </div>
                <div className="flex-1 rounded-lg bg-white flex items-center justify-center">
                  مشتریان
                </div>
              </div>
            </div>
          </div>

          {/* بخش پایین */}
          <div className="w-full flex-1 bg-white rounded-lg p-8 flex flex-col gap-3 overflow-auto">
            {isGettingSysInfo && (
              <div className="w-full h-full flex items-center justify-center">
                <PuffLoader color="#3b82f6" />
              </div>
            )}
            {systemInfo.cpuUsage !== 0 && (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="border border-gray-200 rounded-lg flex flex-col items-start gap-2 p-2">
                  <p>مصرف CPU</p>
                  <p>
                    {systemInfo.cpuUsage}% | {systemInfo.cpuCount} هسته
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg flex flex-col items-start gap-2 p-2">
                  <p>مصرف RAM</p>
                  <p>
                    {systemInfo.memoryUsage}% |{" "}
                    {formatBytes(systemInfo.totalMemory, 2)} GB
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg flex flex-col items-start gap-2 p-2">
                  <p>مصرف DISC</p>
                  <p>
                    {systemInfo.discUsage}% |{" "}
                    {formatBytes(systemInfo.totalDiscSpace, 2)} GB
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg flex flex-col items-start gap-2 p-2">
                  <p>نوع سرویس</p>
                  <p>{systemInfo.serviceType}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* سایدبار */}
        <div className="w-full lg:w-[35%] p-8 overflow-auto">
          <LastRequests />
        </div>
      </div>

      {/* مودال */}
      <Popup isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AddTenantForm
          onTenantAdded={() => {
            setIsModalOpen(false);
            getTenants();
          }}
        />
      </Popup>
    </div>
  );
};

export default AdminDashboard;
