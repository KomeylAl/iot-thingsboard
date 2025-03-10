"use client";

import Popup from "@/components/Popup";
import SearchBar from "@/components/SearchBar";
import React, { useState } from "react";
import { BiPlus } from "react-icons/bi";
import AddDevice from "../_components/AddDevice";
import Table from "@/app/dashboard/_components/Teble";
import { PuffLoader } from "react-spinners";
import { useAssets, useLocalAssets } from "@/hooks/useAssets";
import AddAssetForm from "../_components/AddAssetForm";

const Assets = () => {
  const { data, isLoading, error, refetch } = useAssets(10, 0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleMpdal = () => setIsModalOpen(!isModalOpen);

  const columns = [
    { header: "نام", accessor: "name" },
    { header: "پروفایل", accessor: "type" },
    { header: "برچسب", accessor: "label" },
    { header: "وضعیت", accessor: "status" },
    { header: "زمان ایجاد", accessor: "createdTime" },
  ];

  return (
    <div className="p-6 lg:p-20 w-full h-screen flex flex-col items-center justify-between gap-6">
      <div className="w-full h-[15%] flex flex-col items-start justify-between">
        <SearchBar />
        <div className="flex items-center justify-between w-full">
          <h1 className="text-xl lg:text-3xl font-bold">دارایی ها</h1>
          <button
            onClick={toggleMpdal}
            className="py-2 px-4 bg-blue-500 text-white rounded-lg flex items-center"
          >
            <BiPlus size={24} /> افزودن دارایی جدید
          </button>
        </div>
      </div>

      {error && (
        <div className="w-full h-full flex items-center justify-center">
          <p>خطا در دریافت اطلاعات دارایی ها</p>
        </div>
      )}

      {isLoading && (
        <div className="w-full h-full flex items-center justify-center">
          <PuffLoader color="#3b82f6" />
        </div>
      )}

      {!data && !isLoading && !error && (
        <div className="w-full h-full flex items-center justify-center">
          <p>دارایی ای برای نمایش وجود ندارد!</p>
        </div>
      )}

      {data && (
        <div className="w-full h-[85%]">
          <Table
            columns={columns}
            data={data.data}
            RPP={10}
            getRowLink={(row: any) => `/dashboard/assets/${row.id.id}`}
          />
        </div>
      )}

      <Popup isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AddAssetForm 
          onAssetAdded={() => {
            setIsModalOpen(false);
            refetch();
          }}
        />
      </Popup>
    </div>
  );
};

export default Assets;
