'use client';

import Popup from "@/components/Popup";
import React, { useState } from "react";
import Table from "../../_components/Teble";
import SearchBar from "@/components/SearchBar";
import { BiPlus } from "react-icons/bi";
import { useAssetProfiles } from "@/hooks/useProfiles";
import { PuffLoader } from "react-spinners";

const AssetProfiles = () => {
  const { data, isLoading, error, refetch } = useAssetProfiles(10, 0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleMpdal = () => setIsModalOpen(!isModalOpen);

  if (data) {
    console.log(data);
  }

  const columns = [
    { header: "نام", accessor: "name" },
    { header: "توضیحات", accessor: "description" },
    { header: "زمان ایجاد", accessor: "createdTime" },
    { header: "ویرایش", accessor: "editButton", type: "editButton" },
    { header: "حذف", accessor: "deleteButton", type: "deleteButton" },
  ];

  return (
    <div className="p-6 lg:p-20 w-full h-screen flex flex-col items-center justify-between gap-6">
      <div className="w-full h-[15%] flex flex-col items-start justify-between">
        <SearchBar />
        <div className="flex items-center justify-between w-full">
          <h1 className="text-xl lg:text-3xl font-bold">پروفایل دستگاه ها</h1>
          <button
            onClick={toggleMpdal}
            className="py-2 px-4 bg-blue-500 text-white rounded-lg flex items-center"
          >
            <BiPlus size={24} /> افزودن پروفایل جدید
          </button>
        </div>
      </div>

      {error && <p>خطا در دریافت اطلاعات پروفایل ها</p>}

      {isLoading && (
        <div className="w-full h-full flex items-center justify-center">
          <PuffLoader color="#3b82f6" />
        </div>
      )}

      {!data && !isLoading && <p>پروفایلی برای نمایش وجود ندارد!</p>}

      {data && (
        <div className="w-full h-[85%]">
          <Table
            columns={columns}
            data={data.data}
            RPP={10}
            clickableRows={false}
            getRowLink={(row: any) => ``}
          />
        </div>
      )}

      <Popup isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {/* <AddDevice
       onDeviceAdded={() => {
         setIsModalOpen(false);
         refetch();
       }}
     /> */}
        <div></div>
      </Popup>
    </div>
  );
};

export default AssetProfiles;
