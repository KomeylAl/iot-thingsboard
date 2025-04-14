"use client";

import Popup from "@/components/Popup";
import SearchBar from "@/components/SearchBar";
import React, { useCallback, useState } from "react";
import { BiPlus } from "react-icons/bi";
import AddDevice from "../_components/AddDevice";
import Table from "@/app/dashboard/_components/Teble";
import { useLocalDevices, useSearchDevices } from "@/hooks/useDevices";
import { PuffLoader } from "react-spinners";
import debounce from "lodash/debounce";
import Header from "@/components/Header";

const Devices = () => {
  const [searchText, setSearchText] = useState("");

  const { data, isLoading, error, refetch } = useLocalDevices();
  const {
    data: searchData,
    isLoading: searchLoading,
    error: searchError,
    refetch: search,
  } = useSearchDevices(0, 10, searchText);

  const debouncedSearch = useCallback(
    debounce((text) => {
      search();
    }, 300),
    [search]
  );

  const onSearchChange = (e: any) => {
    setSearchText(e.target.value);
    debouncedSearch(e.target.value);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleMpdal = () => setIsModalOpen(!isModalOpen);

  const columns = [
    { header: "نام", accessor: "name" },
    { header: "پروفایل", accessor: "type" },
    { header: "برچسب", accessor: "label" },
    { header: "زمان ایجاد", accessor: "createdTime" },
  ];

  return (
    <div className="p-6 lg:p-20 w-full h-screen flex flex-col items-center justify-between gap-6">
      <div className="w-full h-[15%] flex flex-col items-start justify-between">
        <Header title="دستگاه ها" isShowSearch searchFn={onSearchChange}/>
        <div className="flex items-center justify-end w-full">
          <button
            onClick={toggleMpdal}
            className="py-2 px-4 bg-blue-500 text-white rounded-lg flex items-center"
          >
            <BiPlus size={24} /> افزودن دستگاه جدید
          </button>
        </div>
      </div>

      {error && <p>خطا در دریافت اطلاعات دستگاه ها</p>}

      {isLoading && (
        <div className="w-full h-full flex items-center justify-center">
          <PuffLoader color="#3b82f6" />
        </div>
      )}

      {!data && !isLoading && <p>دستگاهی برای نمایش وجود ندارد!</p>}

      {searchData && (
        <div className="w-full h-[85%]">
          <Table
            columns={columns}
            data={searchData.data}
            RPP={10}
            getRowLink={(row: any) => `/dashboard/devices/${row.id.id}`}
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
