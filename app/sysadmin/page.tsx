"use client";

import Popup from "@/components/Popup";
import Image from "next/image";
import React, { useState } from "react";
import { BiPlus } from "react-icons/bi";
import AddTenantForm from "./_components/AddTenantForm";
import LastRequests from "./_components/LastRequests";
import { PuffLoader } from "react-spinners";
import { useTenants } from "@/hooks/useTenants";
import SystemInfo from "./_components/SystemInfo";
import { useTenantProfiles } from "@/hooks/useProfiles";
import EntitiesSection from "./_components/EntitiesSection";
import AddProfileForm from "./_components/AddProfileForm";
import Header from "@/components/Header";

const AdminDashboard = () => {
  const {
    data: tenantsData,
    isLoading: tenantsIsLoading,
    error: tenantsError,
    refetch: tenantsRefetch,
  } = useTenants();
  const {
    data: profilesData,
    isLoading: profilesLoading,
    error: profilesError,
    refetch: profilesRefetch,
  } = useTenantProfiles(1, 0);

  const [isAddTenantOpen, setIsAddTenantOpen] = useState(false);
  const [isAddProfileOpen, setIsAddProfileOpen] = useState(false);

  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* هدر */}
      <Header isShowSearch={false} searchFn={() => {}} />

      {/* محتوای اصلی */}
      <div className="p-6 lg:p-12 space-y-6">
      <h1 className="text-xl lg:text-2xl font-bold">داشبورد مدیریت</h1>
      <div className="flex-1 flex flex-col lg:flex-row gap-6 mt-6 overflow-hidden">
        {/* بخش اصلی چپ */}
        <div className="w-full lg:w-[65%] flex flex-col gap-5">
          {/* بخش بالا */}
          <div className="flex-1 flex flex-col lg:flex-row gap-5 overflow-hidden">
            <div className="flex flex-col w-full lg:w-[50%] gap-5">
              <div className="w-full flex-1 bg-white rounded-lg p-4 flex items-center justify-between relative overflow-hidden">
                <div className="absolute top-1 lg:top-6 left-5 w-20 h-20 bg-sky-500 rounded-full filter blur-2xl" />

                {tenantsError && <p>خطا در دریافت اطلاعات سازمان ها</p>}

                {tenantsIsLoading && (
                  <div className="w-full h-full flex items-center justify-center">
                    <PuffLoader color="#3b82f6" size={45} />
                  </div>
                )}

                {tenantsData && (
                  <div>
                    <p className="text-lg">تعداد سازمان ها</p>
                    <div className="flex items-center gap-4 mt-3">
                      <p className="text-lg">{tenantsData.totalElements}</p>
                      <button onClick={() => setIsAddTenantOpen(true)}>
                        <BiPlus size={25} className="text-blue-500" />
                      </button>
                    </div>
                  </div>
                )}
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
                {profilesError && <p>خطا در دریافت اطلاعات پروفایل ها</p>}

                {profilesLoading && (
                  <div className="w-full h-full flex items-center justify-center">
                    <PuffLoader color="#3b82f6" size={45} />
                  </div>
                )}

                {profilesData && (
                  <div>
                    <p className="text-lg">تعداد پروفایل سازمان ها</p>
                    <div className="flex items-center gap-4 mt-3">
                      <p className="text-lg">{profilesData.totalElements}</p>
                      <button onClick={() => setIsAddProfileOpen(true)}>
                        <BiPlus size={25} className="text-blue-500" />
                      </button>
                    </div>
                  </div>
                )}
                <Image
                  src="/images/assets_vector.png"
                  alt="assets"
                  width={100}
                  height={100}
                  className="w-24 h-24 object-cover"
                />
              </div>
            </div>
            <EntitiesSection />
          </div>

          <SystemInfo />
        </div>

        {/* سایدبار */}
        <div className="w-full lg:w-[35%] p-8 overflow-auto">
          <LastRequests />
        </div>
      </div>
      </div>

      {/* مودال */}
      <Popup isOpen={isAddTenantOpen} onClose={() => setIsAddTenantOpen(false)}>
        <AddTenantForm
          onTenantAdded={() => {
            setIsAddTenantOpen(false);
            tenantsRefetch();
          }}
        />
      </Popup>

      <Popup
        isOpen={isAddProfileOpen}
        onClose={() => setIsAddProfileOpen(false)}
      >
        <AddProfileForm
          onProfileAdded={() => {
            setIsAddProfileOpen(false);
            profilesRefetch();
          }}
        />
      </Popup>
    </div>
  );
};

export default AdminDashboard;
