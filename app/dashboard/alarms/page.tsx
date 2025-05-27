"use client";

import React, { useCallback, useState } from "react";
import { PuffLoader } from "react-spinners";
import { useAlarms } from "@/hooks/useAlarms";
import { debounce } from "lodash";
import Header from "@/components/Header";
import { convertISOToJalali } from "@/utils/convert";
import Table from "@/components/Table";

const Alarms = () => {
  const [page, setPage] = useState(0);
  const [pageSize] = useState(10);
  const [searchText, setSearchText] = useState("");
  const { data, isLoading, error, refetch } = useAlarms(
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

  const columns = [
    { header: "نام", accessor: "name" },
    { header: "نوع", accessor: "type" },
    { header: "شدت", accessor: "label" },
    { header: "وضعیت", accessor: "status" },
    {
      header: "زمان ایجاد",
      accessor: (item: any) => convertISOToJalali(item.createdTime),
    },
  ];

  return (
    <div className="w-full h-screen">
      <Header isShowSearch searchFn={onSearchChange} />

      <div className="w-full h-fullp-6 lg:p-12 space-y-6">
        <h1 className="text-xl lg:text-2xl font-bold">هشدار ها</h1>

        {error && <p>خطا در دریافت اطلاعات هشدار ها</p>}

        {isLoading && (
          <div className="w-full h-full flex items-center justify-center">
            <PuffLoader color="#3b82f6" />
          </div>
        )}

        {!data && !isLoading && <p>هشداری برای نمایش وجود ندارد!</p>}

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
    </div>
  );
};

export default Alarms;
