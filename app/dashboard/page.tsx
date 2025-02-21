"use client";

import Popup from "@/components/Popup";
import { useState } from "react";
import { BiPlus } from "react-icons/bi";
import AddDevice from "./_components/AddDevice";
import Image from "next/image";
import { useDevices } from "@/hooks/useDevices";
import { PuffLoader } from "react-spinners";
import { useAssets } from "@/hooks/useAssets";

export default function Home() {
  const {
    data: devicesData,
    isLoading: devicesLoading,
    error: devicesError,
    refetch: refetchDevices
  } = useDevices();

  const {
    data: assetsData,
    isLoading: assetsLoading,
    error: assetsError,
    refetch: refetchAssets
  } = useAssets();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleMpdal = () => setIsModalOpen(!isModalOpen);

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-4 p-6 lg:p-20 w-full h-screen">
      <div className="w-full h-full lg:w-[65%] flex flex-col gap-6">
        <div className="w-full flex items-center justify-between">
          <h1 className="text-xl lg:text-3xl font-bold">داشبورد سازمان</h1>
          <div className="flex items-center gap-2">
            <div className="py-2 px-6 rounded-md bg-white text-blue-600">
              افزودن دستگاه
            </div>
            <button
              onClick={toggleMpdal}
              className="bg-white py-2 px-2 rounded-md text-blue-600 hover:bg-blue-600 hover:text-white transition-colors duration-300"
            >
              <BiPlus size={24} />
            </button>
          </div>
        </div>
        <div className="w-full h-full flex flex-col items-center justify-between gap-5">
          <div className="w-full h-[50%] flex flex-col lg:flex-row items-center justify-between gap-5">
            <div className="flex flex-col w-full lg:w-[50%] h-96 lg:h-72 items-center gap-5 justify-between">
              <div className="w-full relative overflow-hidden h-[50%] bg-white rounded-lg flex items-center justify-between p-4">
                <div className="absolute top-1 lg:top-6 left-5 w-20 h-20 bg-sky-500 rounded-full filter blur-2xl" />

                {devicesError && <p>خطا در دریافت اطلاعات دستگاه ها</p>}

                {devicesLoading && (
                  <div className="w-full h-full flex items-center justify-center">
                    <PuffLoader color="#3b82f6" size={45} />
                  </div>
                )}

                {devicesData && (
                  <div className="">
                    <p className="text-lg">تعداد دستگاه های شما</p>
                    <p className="text-lg">{devicesData.totalElements}</p>
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
              <div className="w-full relative overflow-hidden h-[50%] bg-white rounded-lg flex items-center justify-between p-4">
                <div className="absolute top-1 lg:top-6 left-5 w-20 h-20 bg-amber-500 rounded-full filter blur-2xl" />
                {assetsError && <p>خطا در دریافت اطلاعات داراریی ها</p>}

                {assetsLoading && (
                  <div className="w-full h-full flex items-center justify-center">
                    <PuffLoader color="#3b82f6" size={45} />
                  </div>
                )}

                {assetsData && (
                  <div className="">
                    <p className="text-lg">تعداد دارایی های شما</p>
                    <p className="text-lg">{assetsData.totalElements}</p>
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
            <div className="w-full lg:w-[50%] h-72 bg-white rounded-lg">
              
            </div>
          </div>
          <div className="w-full h-[50%] bg-white rounded-lg"></div>
        </div>
      </div>
      <div className="w-[35%] h-full bg-white rounded-lg"></div>
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
