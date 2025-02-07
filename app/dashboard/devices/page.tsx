"use client";

import Popup from "@/components/Popup";
import SearchBar from "@/components/SearchBar";
import React, { useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import AddDevice from "../_components/AddDevice";
import axios from "axios";
import toast from "react-hot-toast";
import Table from '@/app/dashboard/_components/Teble'

const Devices = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleMpdal = () => setIsModalOpen(!isModalOpen);
  const [isLoading, setIsLoading] = useState(false);
  const [devices, setDevices] = useState([]);
  const [devicesPageInfo, setDevicesPageInfo] = useState({
    totalPages: 0,
    totalElements: 0,
    hasNext: false,
  });
  const columns = [
    { header: "نام", accessor: "name" },
    { header: "پروفایل", accessor: "type" },
    { header: "برچسب", accessor: "label" },
    { header: "وضعیت", accessor: "status" },
  ];

  const fetchDevices = async () => {
    setIsLoading(true);
    await axios
      .get("/api/devices", {
        params: {
          pageSize: 10,
          page: 0,
        },
      })
      .then(function (response) {
        const data = response.data;
        setDevices(data.data);
        console.log(data)
        setDevicesPageInfo({
          totalPages: data.totalPages,
          totalElements: data.totalElements,
          hasNext: data.hasNext,
        });
      })
      .catch(function (error) {
        if (error.status === 500) {
          toast.error("خطا در برقراری ارتباط");
        }
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    fetchDevices();
  }, [])

  return (
    <div className="p-6 lg:p-20 w-full h-screen flex flex-col items-center justify-between gap-6">
      <div className="w-full h-[15%] flex flex-col items-start justify-between">
        <SearchBar />
        <div className="flex items-center justify-between w-full">
          <h1 className="text-xl lg:text-3xl font-bold">دستگاه ها</h1>
          <button
            onClick={toggleMpdal}
            className="py-2 px-4 bg-blue-500 text-white rounded-lg flex items-center"
          >
            <BiPlus size={24} /> افزودن دستگاه جدید
          </button>
        </div>
      </div>
      <div className="w-full h-[85%]">
        <Table 
          columns={columns}
          data={devices}
          RPP={10}
          getRowLink={(row: any) => `/devices/${row.id.id}`}
        />
      </div>
      <Popup isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AddDevice
          onDeviceAdded={() => {
            setIsModalOpen(false);
            fetchDevices();
          }}
        />
      </Popup>
    </div>
  );
};

export default Devices;
