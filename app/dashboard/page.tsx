"use client";

import Popup from "@/components/Popup";
import { useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import AddDevice from "./_components/AddDevice";
import Image from "next/image";
import { useDevices } from "@/hooks/useDevices";
import { PuffLoader } from "react-spinners";
import { useAssets } from "@/hooks/useAssets";
import { IoIosWarning } from "react-icons/io";
import ReactSelect from "react-select";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import MainRequestsChart from "./_components/MainRequestsChart";
import MainRequestList from "./_components/MainRequestList";
import NotifIcon from "@/components/NotifIcon";

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
  } = useAssets();

  const options =
    devicesData?.data.map((device: any) => ({
      value: device.id.id,
      label: device.name,
    })) || [];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deviceId, setDeviceId] = useState("");

  const toggleMpdal = () => setIsModalOpen(!isModalOpen);

  return (
    <div className="flex flex-col lg:flex-row items-stretch justify-between gap-4 p-6 lg:p-20 w-full min-h-screen">
      {/* بخش اصلی داشبورد */}
      <div className="w-full lg:w-[65%] flex flex-col gap-6">
        {/* عنوان و دکمه‌ها */}
        <div className="w-full flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-xl lg:text-3xl font-bold">داشبورد سازمان</h1>
          <div className="flex items-center gap-2">
            <div className="py-2 px-6 rounded-md bg-white text-blue-600 shadow-md">
              افزودن دستگاه
            </div>
            <button
              onClick={toggleMpdal}
              className="bg-white py-2 px-2 rounded-md text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-md"
            >
              <BiPlus size={24} />
            </button>
            <NotifIcon />
          </div>
        </div>

        {/* محتوای داشبورد */}
        <div className="w-full h-full flex flex-col gap-6">
          <div className="w-full flex flex-col lg:flex-row gap-6">
            {/* اطلاعات دستگاه و دارایی */}
            <div className="flex flex-col w-full lg:w-[50%] gap-6">
              {/* کارت تعداد دستگاه‌ها */}
              <div className="relative h-full bg-white rounded-lg p-4 shadow-md flex items-center justify-between overflow-hidden">
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
              <div className="relative h-full bg-white rounded-lg p-4 shadow-md flex items-center justify-between overflow-hidden">
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
            <div className="w-full lg:w-[50%] min-h-[18rem] bg-white rounded-lg shadow-md p-4 flex flex-col gap-4">
              {/* اینجا می‌توان نمودار یا محتوای دیگری اضافه کرد */}
              <p className="text-lg">هشدار ها</p>
              <div className="w-full flex-1 flex flex-col items-center gap-3">
                <div className="w-full flex-1 p-8 bg-amber-400/20 rounded-md flex items-center justify-between hover:shadow-md">
                  <p className="flex items-center gap-2 text-xl">
                    بحرانی <IoIosWarning />
                  </p>
                  <p className="text-lg font-bold">0</p>
                </div>
                <div className="w-full flex-1 p-8 bg-sky-400/20 rounded-md flex items-center justify-between hover:shadow-md">
                  <p className="flex items-center gap-2 text-xl">مجموع</p>
                  <p className="text-lg font-bold">0</p>
                </div>
              </div>
            </div>
          </div>

          {/* بخش گسترده‌تر */}
          <div className="w-full h-full bg-white rounded-lg shadow-md p-4 flex flex-col gap-5">
            <MainRequestsChart
              deviceId={deviceId}
              selectFn={(value: any) => {
                setDeviceId(value);
              }}
              selectOptions={options}
            />
          </div>
        </div>
      </div>

      {/* پنل کناری */}
      <div className="w-full lg:w-[35%] min-h-[20rem] bg-white rounded-lg shadow-md p-4">
        <MainRequestList
          deviceId={deviceId}
          selectFn={(value: any) => setDeviceId(value)}
          selectOptions={options}
        />
      </div>

      {/* مودال افزودن دستگاه */}
      <Popup isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AddDevice
          onDeviceAdded={() => {
            setIsModalOpen(false);
            refetchDevices();
          }}
        />
      </Popup>
    </div>
  );
}
