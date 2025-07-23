"use client";

import Popup from "@/components/Popup";
import React, { useCallback, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { PuffLoader } from "react-spinners";
import { useAssets, useLocalAssets } from "@/hooks/useAssets";
import AddAssetForm from "../_components/forms/AddAssetForm";
import { debounce } from "lodash";
import Header from "@/components/Header";
import { useModal } from "@/hooks/useModal";
import Table from "@/components/Table";
import Link from "next/link";
import { convertISOToJalali } from "@/utils/convert";

const Assets = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [searchText, setSearchText] = useState("");

  const { data, isLoading, error, refetch } = useAssets(
    page,
    pageSize,
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

  const columns = [
    {
      header: "نام",
      accessor: (item: any) => (
        <Link
          href={`/dashboard/assets/${item.id.id}`}
          className="hover:text-blue-500"
        >
          {item.name}
        </Link>
      ),
    },
    { header: "پروفایل", accessor: "type" },
    { header: "برچسب", accessor: "label" },
    {
      header: "زمان ایجاد",
      accessor: (item: any) => convertISOToJalali(item.createdTime),
    },
  ];

  return (
    <div className="w-full h-screen">
      <Header isShowSearch searchFn={onSearchChange} />

      <div className="w-full h-fullp-6 lg:p-12 space-y-6">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-xl lg:text-2xl font-bold">دارایی ها</h1>
          <button
            onClick={openModal}
            className="py-2 px-4 bg-blue-500 text-white rounded-lg flex items-center"
          >
            <BiPlus size={24} /> افزودن دارایی جدید
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
        <AddAssetForm
          onAssetAdded={() => {
            closeModal();
            refetch();
          }}
        />
      </Popup>
    </div>
  );
};

export default Assets;
