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
import { useModal } from "@/hooks/useModal";

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
  const [page, setPage] = useState(0);
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

  const { isOpen, openModal, closeModal } = useModal();

  return (
    <div className="w-full h-screen">
      <Header isShowSearch searchFn={onSearchChange} />

      <div className="w-full h-full p-6 lg:p-12 space-y-6">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-xl lg:text-2xl font-bold">سازمان ها</h1>
          <button
            onClick={openModal}
            className="py-2 px-4 bg-blue-500 text-white rounded-lg flex items-center"
          >
            <BiPlus size={24} /> افزودن سازمان جدید
          </button>
        </div>

        {error && <p>خطا در دریافت اطلاعات </p>}

        {isLoading && (
          <div className="w-full h-full flex items-center justify-center">
            <PuffLoader color="#3b82f6" />
          </div>
        )}

        {data && (
          <Table
            columns={columns}
            data={data.data}
            pageSize={pageSize}
            totalItems={data.totalElements}
            currentPage={page + 1}
            onPageChange={(newPage) => setPage(newPage - 1)}
          />
        )}
      </div>
      <Popup isOpen={isOpen} onClose={closeModal}>
        <AddTenantForm
          onTenantAdded={() => {
            closeModal();
            refetch();
          }}
        />
      </Popup>
    </div>
  );
};

export default Tenants;
