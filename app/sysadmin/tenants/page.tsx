"use client";

import Table from "@/components/Table";
import Popup from "@/components/Popup";
import { useTenants } from "@/hooks/useTenants";
import React, { useCallback, useState } from "react";
import { BiPlus } from "react-icons/bi";
import AddTenantForm from "../_components/AddTenantForm";
import { PuffLoader } from "react-spinners";
import Header from "@/components/Header";
import { debounce } from "lodash";
import Link from "next/link";
import EntityTable from "@/components/ui/EntityTable";

const columns = [
  {
    header: "نام",
    accessor: (item: any) => (
      <Link
        href={`/sysadmin/tenants/${item.id.id}`}
        className="hover:text-blue-500"
      >
        {item.name}
      </Link>
    ),
  },
  { header: "ایمیل", accessor: "email" },
  { header: "تلفن", accessor: "phone" },
  { header: "زمان ایجاد", accessor: "createdTime" },
];

const Tenants = () => {
  const [page, setPage] = useState(0); // API page از 0 شروع میشه
  const [pageSize, setPageSize] = useState(10);
  const [searchText, setSearchText] = useState("");
  const { data, isLoading, error, refetch } = useTenants(
    pageSize,
    page,
    searchText
  );

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
    <div className="p-6 lg:p-20 w-full h-screen flex flex-col items-center gap-6">
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
      <div className="w-full h-full">
        <EntityTable
          columns={columns}
          data={data}
          error={error}
          isLoading={isLoading}
          page={page}
          pageSize={pageSize}
          onPageChange={(newPage) => setPage(newPage - 1)}
        />
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
