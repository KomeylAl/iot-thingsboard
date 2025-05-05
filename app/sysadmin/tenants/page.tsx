"use client";

import Table from "@/app/dashboard/_components/Teble";
import Popup from "@/components/Popup";
import { useTenants } from "@/hooks/useTenants";
import React, { useCallback, useState } from "react";
import { BiPlus } from "react-icons/bi";
import AddTenantForm from "../_components/AddTenantForm";
import { PuffLoader } from "react-spinners";
import Header from "@/components/Header";
import { debounce } from "lodash";

const columns = [
  { header: "نام", accessor: "name" },
  { header: "ایمیل", accessor: "email" },
  { header: "تلفن", accessor: "phone" },
  { header: "زمان ایجاد", accessor: "createdTime" },
];

const Tenants = () => {
  const [searchText, setSearchText] = useState("");
  const { data, isLoading, error, refetch } = useTenants(1000, 0, searchText);

  console.log(data);

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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleMpdal = () => setIsModalOpen(!isModalOpen);

  return (
    <div className="p-6 lg:p-20 w-full h-screen flex flex-col items-center justify-between gap-6">
      <div className="w-full h-[15%] flex flex-col items-start justify-between">
        <Header title="سازمان ها" isShowSearch searchFn={onSearchChange} />
        <div className="flex items-center justify-end w-full">
          <button
            onClick={toggleMpdal}
            className="py-2 px-4 bg-blue-500 text-white rounded-lg flex items-center"
          >
            <BiPlus size={24} /> افزودن سازمان جدید
          </button>
        </div>
      </div>
      <div className="w-full h-[85%]">
        {error && (
          <div className="w-full h-full flex items-center justify-center">
            <p style={{ color: "red" }}>خطا در دریافت اطلاعات سازمان ها</p>
          </div>
        )}

        {isLoading && (
          <div className="w-full h-full flex items-center justify-center">
            <PuffLoader color="#3b82f6" />
          </div>
        )}

        {data && (
          <Table
            columns={columns}
            data={data.data}
            RPP={10}
            getRowLink={(row: any) => `/sysadmin/tenants/${row.id.id}`}
          />
        )}
      </div>
      <Popup isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AddTenantForm
          onTenantAdded={() => {
            setIsModalOpen(false);
            refetch();
          }}
        />
      </Popup>
    </div>
  );
};

export default Tenants;
