"use client";

import Popup from "@/components/Popup";
import SearchBar from "@/components/SearchBar";
import React, { useState } from "react";
import { BiPlus } from "react-icons/bi";
import AddDevice from "../_components/AddDevice";
import Table from '@/app/dashboard/_components/Teble';
import { useLocalDevices } from "@/hooks/useDevices";
import { PuffLoader } from "react-spinners";

const Devices = () => {

  const { data, isLoading, error, refetch } = useLocalDevices();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleMpdal = () => setIsModalOpen(!isModalOpen);

  const columns = [
    { header: "نام", accessor: "name" },
    { header: "پروفایل", accessor: "type" },
    { header: "برچسب", accessor: "label" },
    { header: "وضعیت", accessor: "status" },
  ];

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
      
      {error && (
        <p>خطا در دریافت اطلاعات دستگاه ها</p>
      )}

      {isLoading && (
        <div className="w-full h-full flex items-center justify-center">
        <PuffLoader color="#3b82f6" />
      </div>
      )}

      {(!data && !isLoading) && (
        <p>دستگاهی برای نمایش وجود ندارد!</p>
      )}

      {data && (
        <div className="w-full h-[85%]">
        <Table 
          columns={columns}
          data={data}
          RPP={10}
          getRowLink={(row: any) => `/devices/${row.id.id}`}
        />
      </div>
      )}

      <Popup isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AddDevice
          onDeviceAdded={() => {
            setIsModalOpen(false);
            refetch();
          }}
        />
      </Popup>
    </div>
  );
};

export default Devices;
