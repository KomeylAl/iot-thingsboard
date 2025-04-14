"use client";

import SearchBar from "@/components/SearchBar";
import React, { useCallback, useState } from "react";
import Table from "@/app/dashboard/_components/Teble";
import { PuffLoader } from "react-spinners";
import { useAlarms } from "@/hooks/useAlarms";
import { debounce } from "lodash";
import Header from "@/components/Header";

const Alarms = () => {
  const [searchText, setSearchText] = useState("");
  const { data, isLoading, error, refetch } = useAlarms(10, 0, searchText);

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
    { header: "زمان ایجاد", accessor: "status" },
  ];

  return (
    <div className="p-6 lg:p-20 w-full h-screen flex flex-col items-center justify-between gap-6">
      <div className="w-full h-[15%] flex flex-col items-start justify-between">
        <Header title="هشدار ها" isShowSearch searchFn={onSearchChange}/>
      </div>

      {error && <p>خطا در دریافت اطلاعات هشدار ها</p>}

      {isLoading && (
        <div className="w-full h-full flex items-center justify-center">
          <PuffLoader color="#3b82f6" />
        </div>
      )}

      {!data && !isLoading && <p>هشداری برای نمایش وجود ندارد!</p>}

      {data && (
        <div className="w-full h-[85%]">
          <Table
            columns={columns}
            data={data.data}
            RPP={10}
            getRowLink={(row: any) => `/dashboard/alarms/${row.id.id}`}
          />
        </div>
      )}
    </div>
  );
};

export default Alarms;
