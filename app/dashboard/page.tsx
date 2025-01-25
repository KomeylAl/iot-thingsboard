"use client";

import Popup from "@/components/Popup";
import { useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import AddDevice from "./_components/AddDevice";
import Image from "next/image";
import deviceVector from "/images/device_vector.png";
import axios from "axios";
import toast from "react-hot-toast";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleMpdal = () => setIsModalOpen(!isModalOpen);
  const [isGettingDevices, setIsGettingDevices] = useState(false);
  const [devices, setDevices] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    totalPages: 0,
    totalElements: 0,
    hasNext: false,
  });

  const fetchDevices = async () => {
    setIsGettingDevices(true);
    await axios
      .get("/api/devices", {
        params: {
          pageSize: 10,
          page: 0,
        },
      })
      .then(function (response) {
        const data = response.data;
        setDevices(data.data); // لیست دستگاه‌ها
        setPageInfo({
          // ذخیره اطلاعات صفحه‌بندی
          totalPages: data.totalPages,
          totalElements: data.totalElements,
          hasNext: data.hasNext,
        });
        console.log(devices);
      })
      .catch(function (error) {
        if (error.status === 500) {
          toast.error("خطا در برقراری ارتباط");
        }
        console.log(error);
      })
      .finally(() => setIsGettingDevices(false));
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between p-6 lg:p-20 w-full h-screen">
      <div className="w-full h-full lg:w-[65%] flex flex-col gap-6">
        <div className="w-full flex items-center justify-between">
          <h1 className="text-xl lg:text-3xl font-bold">داشبورد</h1>
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
        <div className="w-full h-[100%] flex flex-col items-center justify-between">
          <div className="w-full h-[50%] flex flex-col lg:flex-row items-center justify-between gap-5">
            <div className="flex flex-col w-full lg:w-[50%] h-96 lg:h-72 items-center gap-5 justify-between">
              <div className="w-full relative overflow-hidden h-[50%] bg-white rounded-lg flex items-center justify-between p-4">
                <div className="absolute top-1 lg:top-6 left-5 w-20 h-20 bg-sky-500 rounded-full filter blur-2xl" />
                <div className="">
                  <p className="text-lg">تعداد دستگاه های شما</p>
                  <p className="text-lg">{pageInfo.totalElements}</p>
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
                  <p className="text-lg">تعداد دارایی های شما</p>
                  <p className="text-lg">0</p>
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
            <div className="w-full lg:w-[50%] h-72 bg-white rounded-lg">
              {/* {devices.map((device: any, index: number) => (
                  <div key={index}>hi</div>
                ))} */}
            </div>
          </div>
          <div className="w-full mt-5 lg:mt-0 h-[50%] bg-white rounded-lg"></div>
        </div>
      </div>
      <Popup isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AddDevice onDeviceAdded={() => setIsModalOpen(false)} />
      </Popup>
    </div>
  );
}
