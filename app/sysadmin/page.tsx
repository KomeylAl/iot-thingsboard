"use client";

import Popup from "@/components/Popup";
import { formatBytes } from "@/utils/convert";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiPlus } from "react-icons/bi";
import AddTenant from "./_components/AddTenant";

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
    await axios.get('/api/sysadmin/tenants')
      .then(function (response) {
        console.log(response.data)
        const data = response.data;
        setTenants(response.data.data)
        setTenantsPageInfo({
          hasNext: data.hasNext,
          totalElements: data.totalElements,
          totalPages: data.totalPages
        })
      })
      .catch(function (error) {
        toast.error("خطا در دریافت اطلاعات سازمان ها");
      })
      .finally(() => setIsGettingTenants(false))
  }

  useEffect(() => {
    getStstemInfo();
    getTenants();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-4 p-6 lg:p-20 w-full h-screen">
      <div className="w-full h-full lg:w-[65%] flex flex-col gap-6">
        <div className="w-full flex items-center justify-between">
          <h1 className="text-xl lg:text-3xl font-bold">داشبورد مدیریت</h1>
        </div>
        <div className="w-full h-full flex flex-col items-center justify-between gap-5">
          <div className="w-full h-[50%] flex flex-col lg:flex-row items-center justify-between gap-5">
            <div className="flex flex-col w-full lg:w-[50%] h-96 lg:h-72 items-center gap-5 justify-between">
              <div className="w-full relative overflow-hidden h-[50%] bg-white rounded-lg flex items-center justify-between p-4">
                <div className="absolute top-1 lg:top-6 left-5 w-20 h-20 bg-sky-500 rounded-full filter blur-2xl" />
                <div className="">
                  <p className="text-lg">تعداد سازمان ها</p>
                  <div className="flex items-center gap-4 mt-3">
                    <p className="text-lg">{tenantsPageInfo.totalElements}</p>
                    <button
                      onClick={() => setIsModalOpen(true)}
                    >
                      <BiPlus size={25} className="text-blue-500"/>
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
              <div className="w-full relative overflow-hidden h-[50%] bg-white rounded-lg flex items-center justify-between p-4">
                <div className="absolute top-1 lg:top-6 left-5 w-20 h-20 bg-amber-500 rounded-full filter blur-2xl" />
                <div className="">
                  <p className="text-lg">تعداد پروفایل سازمان ها</p>
                  <p className="text-lg"></p>
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
            <div className="w-full lg:w-[50%] h-72 flex items-center justify-between gap-5">
              <div className="w-[50%] h-full flex flex-col items-center justify-between gap-5">
                <div className="w-full h-[50%] rounded-lg bg-white flex flex-col items-center justify-center gap-3">
                  دستگاه ها
                </div>
                <div className="w-full h-[50%] rounded-lg bg-white flex flex-col items-center justify-center gap-3">
                  کاربران
                </div>
              </div>
              <div className="w-[50%] h-full flex flex-col items-center justify-between gap-5">
                <div className="w-full h-[50%] rounded-lg bg-white flex flex-col items-center justify-center gap-3">
                  دارایی ها
                </div>
                <div className="w-full h-[50%] rounded-lg bg-white flex flex-col items-center justify-center gap-3">
                  مشتریان
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-[50%] bg-white rounded-lg p-8 flex flex-col items-center justify-between gap-3">
            <div className="w-full h-[40%] grid grid-cols-2 lg:grid-cols-4 items-center gap-3">
              <div className="h-full border border-gray-200 rounded-lg flex flex-col items-start justify-center gap-2 p-2">
                <p>مصرف CPU</p>
                <p className="">
                  {systemInfo.cpuUsage}% | {systemInfo.cpuCount} هسته
                </p>
              </div>
              <div className="h-full border border-gray-200 rounded-lg flex flex-col items-start justify-center gap-2 p-2">
                <p>مصرف RAM</p>
                <p className="">
                  {systemInfo.memoryUsage}% |{" "}
                  {formatBytes(systemInfo.totalMemory, 2)} گیاگابایت
                </p>
              </div>
              <div className="h-full border border-gray-200 rounded-lg flex flex-col items-start justify-center gap-2 p-2">
                <p>مصرف DISC</p>
                <p className="">
                  {systemInfo.discUsage}% |{" "}
                  {formatBytes(systemInfo.totalDiscSpace, 2)} گیگابایت
                </p>
              </div>
              <div className="h-full border border-gray-200 rounded-lg flex flex-col items-start justify-center gap-2 p-2">
                <p>نوع سرویس</p>
                <p className="">{systemInfo.serviceType}</p>
              </div>
            </div>
            <div className="h-[60%] w-full"></div>
          </div>
        </div>
      </div>
      <Popup
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <AddTenant 
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
