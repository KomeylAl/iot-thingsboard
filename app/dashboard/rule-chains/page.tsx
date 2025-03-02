"use client";

import Popup from "@/components/Popup";
import SearchBar from "@/components/SearchBar";
import { useRuleChains } from "@/hooks/useRuleChains";
import React, { useState } from "react";
import { BiPlus } from "react-icons/bi";
import { PuffLoader } from "react-spinners";
import Table from "../_components/Teble";

const RuleChains = () => {
  const { data, isLoading, error, refetch } = useRuleChains(10, 0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleMpdal = () => setIsModalOpen(!isModalOpen);

  if (data) {
    console.log(data);
  }

  const columns = [
    { header: "نام", accessor: "name" },
    { header: "نوع", accessor: "type" },
    { header: "توضیحات", accessor: "" },
    { header: "تاریخ ایجاد", accessor: "createdTime" },
  ];

  return (
    <div className="p-6 lg:p-20 w-full h-screen flex flex-col items-center justify-between gap-6">
      <div className="w-full h-[15%] flex flex-col items-start justify-between">
        <SearchBar />
        <div className="flex items-center justify-between w-full">
          <h1 className="text-xl lg:text-3xl font-bold">زنجیره قواعد</h1>
          <button
            onClick={toggleMpdal}
            className="py-2 px-4 bg-blue-500 text-white rounded-lg flex items-center"
          >
            <BiPlus size={24} /> افزودن زنجیره جدید
          </button>
        </div>
      </div>

      {error && <p>خطا در دریافت اطلاعات زنجیره ها</p>}

      {isLoading && (
        <div className="w-full h-full flex items-center justify-center">
          <PuffLoader color="#3b82f6" />
        </div>
      )}

      {!data && !isLoading && <p>زنجیره ای برای نمایش وجود ندارد!</p>}

      {data && (
        <div className="w-full h-[85%]">
          <Table
            columns={columns}
            data={data.data}
            RPP={10}
            getRowLink={(row: any) => `/devices/${row.id.id}`}
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

export default RuleChains;
