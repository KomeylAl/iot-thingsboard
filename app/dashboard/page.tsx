"use client";

import Popup from "@/components/Popup";
import { useState } from "react";
import { BiPlus } from "react-icons/bi";
import AddDevice from "./_components/forms/StoreDeviceForm";
import Image from "next/image";
import { useDevices } from "@/hooks/useDevices";
import { PuffLoader } from "react-spinners";
import { useAssets } from "@/hooks/useAssets";
import { IoIosWarning } from "react-icons/io";
import MainRequestsChart from "./_components/MainRequestsChart";
import MainRequestList from "./_components/MainRequestList";
import Header from "@/components/Header";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useModal } from "@/hooks/useModal";
import { useAlarms } from "@/hooks/useAlarms";

export default function Home() {
  const {
    data: devicesData,
    isLoading: devicesLoading,
    error: devicesError,
    refetch: refetchDevices,
  } = useDevices(0, 100);

  const {
    data: assetsData,
    isLoading: assetsLoading,
    error: assetsError,
  } = useAssets(0, 1);

  const {
    data: alarmsData,
    isLoading: alarmsLoading,
    error: alarmsError,
  } = useAlarms();

  const {
    data: majorAlarmsData,
    isLoading: majorAlarmsLoading,
    error: majorAlarmsError,
  } = useAlarms(1, 0, "", "MAJOR");

  const options =
    devicesData?.data.map((device: any) => ({
      value: device.id.id,
      label: device.name,
    })) || [];

  const [deviceId, setDeviceId] = useState("");

  const { isOpen, openModal, closeModal } = useModal();

  return (
    <div className="w-full min-h-screen flex flex-col overflow-y-auto">
      {/* هدر */}
      <Header isShowSearch={false} searchFn={() => {}} />

      {/* بخش اصلی داشبورد */}
      <div className="w-full h-full flex-1 p-6 lg:p-12 space-y-6">
        {/* عنوان و دکمه‌ها */}
        <div className="flex items-center justify-between w-full">
          <h1 className="text-xl lg:text-2xl font-bold">داشبورد سازمان</h1>
          <div className="flex items-center gap-2">
            <div className="py-2 px-6 rounded-md bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-300 shadow-md">
              افزودن دستگاه
            </div>
            <button
              onClick={openModal}
              className="bg-white dark:bg-gray-700 py-2 px-2 rounded-md text-blue-600 dark:text-blue-300 hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-md"
            >
              <BiPlus size={24} />
            </button>
          </div>
        </div>

        {/* محتوای داشبورد */}
        <div className="w-full h-full flex-1 flex gap-6">
          <div className="w-full h-full flex flex-col space-y-6">
            <div className="w-full flex flex-col lg:flex-row gap-6">
              {/* اطلاعات دستگاه و دارایی */}
              <div className="flex flex-col w-full lg:w-[50%] gap-6">
                {/* کارت تعداد دستگاه‌ها */}
                <div className="relative h-full bg-white dark:bg-gray-700 rounded-lg p-4 shadow-md flex items-center justify-between overflow-hidden">
                  <div className="absolute top-3 left-5 w-16 h-16 bg-sky-500 rounded-full blur-2xl opacity-90" />
                  {devicesError && <p>خطا در دریافت اطلاعات دستگاه ها</p>}
                  {devicesLoading ? (
                    <div className="w-full flex items-center justify-center">
                      <PuffLoader color="#3b82f6" size={45} />
                    </div>
                  ) : (
                    <div>
                      <p className="text-lg">تعداد دستگاه‌های شما</p>
                      <p className="text-lg font-bold">
                        {devicesData?.totalElements}
                      </p>
                    </div>
                  )}
                  <Image
                    src="/images/device_vector.png"
                    alt="devices"
                    width={100}
                    height={100}
                    className="w-20 h-20 object-cover"
                  />
                </div>

                {/* کارت تعداد دارایی‌ها */}
                <div className="relative h-full bg-white dark:bg-gray-700 rounded-lg p-4 shadow-md flex items-center justify-between overflow-hidden">
                  <div className="absolute top-3 left-5 w-16 h-16 bg-amber-500 rounded-full blur-2xl opacity-90" />
                  {assetsError && <p>خطا در دریافت اطلاعات دارایی‌ها</p>}
                  {assetsLoading ? (
                    <div className="w-full flex items-center justify-center">
                      <PuffLoader color="#3b82f6" size={45} />
                    </div>
                  ) : (
                    <div>
                      <p className="text-lg">تعداد دارایی‌های شما</p>
                      <p className="text-lg font-bold">
                        {assetsData?.totalElements}
                      </p>
                    </div>
                  )}
                  <Image
                    src="/images/assets_vector.png"
                    alt="assets"
                    width={100}
                    height={100}
                    className="w-20 h-20 object-cover"
                  />
                </div>
              </div>

              {/* نمودار یا اطلاعات اضافه */}
              <div className="w-full lg:w-[50%] min-h-[18rem] bg-white dark:bg-gray-700 rounded-lg shadow-md p-4 flex flex-col gap-4">
                {/* اینجا می‌توان نمودار یا محتوای دیگری اضافه کرد */}
                <p className="text-lg">هشدار ها</p>
                <div className="w-full flex-1 flex flex-col items-center gap-3">
                  <div className="w-full flex-1 p-8 bg-amber-400/20 rounded-md hover:shadow-md">
                    {majorAlarmsError && <p>خطا در دریافت اطلاعات هشدار ها</p>}
                    {majorAlarmsLoading ? (
                      <div className="w-full flex items-center justify-center">
                        <PuffLoader color="#3b82f6" size={45} />
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <p className="flex items-center gap-2 text-xl">
                          بحرانی <IoIosWarning />
                        </p>
                        <p className="text-lg font-bold">
                          {majorAlarmsData?.totalElements ?? 0}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="w-full flex-1 p-8 bg-sky-400/20 rounded-md hover:shadow-md">
                  {alarmsError && <p>خطا در دریافت اطلاعات هشدار ها</p>}
                    {alarmsLoading ? (
                      <div className="w-full flex items-center justify-center">
                        <PuffLoader color="#3b82f6" size={45} />
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <p className="flex items-center gap-2 text-xl">
                          مجموع <IoIosWarning />
                        </p>
                        <p className="text-lg font-bold">
                          {alarmsData?.totalElements ?? 0}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* بخش گسترده‌تر */}
            <div className="w-full h-full bg-white dark:bg-gray-700 rounded-lg shadow-md p-4 flex flex-col gap-5 pb-20">
              <MainRequestsChart
                deviceId={deviceId}
                selectFn={(value: any) => {
                  setDeviceId(value);
                }}
                selectOptions={options}
              />
            </div>
          </div>

          {/* پنل کناری */}
          <div className="w-full lg:w-[35%] min-h-[20rem] bg-white dark:bg-gray-700 rounded-lg shadow-md p-4">
            <MainRequestList
              deviceId={deviceId}
              selectFn={(value: any) => setDeviceId(value)}
              selectOptions={options}
            />
          </div>
        </div>
      </div>

      {/* مودال افزودن دستگاه */}
      <Dialog open={isOpen} onOpenChange={closeModal}>
        <DialogContent className="max-w-96 overflow-y-auto">
          <DialogTitle className="text-lg font-bold mb-2 mt-6">
            افزودن دستگاه
          </DialogTitle>
          <div className="mt-2">
            <AddDevice
              onDeviceAdded={() => {
                closeModal();
                refetchDevices();
              }}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
