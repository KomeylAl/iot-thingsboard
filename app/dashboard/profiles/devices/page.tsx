"use client";

import React, { useCallback, useState } from "react";
import Table from "../../_components/Teble";
import SearchBar from "@/components/SearchBar";
import { BiPlus } from "react-icons/bi";
import { useDeviceProfiles } from "@/hooks/useProfiles";
import { PuffLoader } from "react-spinners";
import Popup from "@/components/Popup";
import AddDeviceProfileForm from "../../_components/AddDeviceProfileForm";
import { debounce } from "lodash";
import Header from "@/components/Header";

const DeviceProfiles = () => {
  const [searchText, setSearchText] = useState("");
  const { data, isLoading, error, refetch } = useDeviceProfiles(
    10,
    0,
    searchText
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleMpdal = () => setIsModalOpen(!isModalOpen);

  const debouncedSearch = useCallback(
    debounce((text) => {
      refetch();
    }, 300),
    [refetch]
  );

  const onSearchChange = (e: any) => {
    setSearchText(e.target.value);
    debouncedSearch(e.target.value);
  };

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
        <Header title="پروفایل دستگاه ها" isShowSearch searchFn={onSearchChange}/>
        <div className="flex items-center justify-end w-full">
          <button
            onClick={() => {}}
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
        <AddDeviceProfileForm />
      </Popup>
    </div>
  );
};

export default DeviceProfiles;
