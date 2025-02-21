"use client";

import SearchBar from "@/components/SearchBar";
import React, { useState } from "react";
import Table from '@/app/dashboard/_components/Teble';
import { PuffLoader } from "react-spinners";
import { useLocaldashboards } from "@/hooks/useDashboards";

const Dashboards = () => {

  const { data, isLoading, error, refetch } = useLocaldashboards();

  const columns = [
    { header: "نام", accessor: "name" },
    { header: "پروفایل", accessor: "type" },
    { header: "برچسب", accessor: "label" },
    { header: "وضعیت", accessor: "status" },
  ];

  return (
    <div className="p-6 lg:p-20 w-full h-screen flex flex-col items-center justify-between gap-6">
      <div className="w-full h-[15%] flex flex-col items-start justify-between">
        <SearchBar />
        <div className="flex items-center justify-between w-full">
          <h1 className="text-xl lg:text-3xl font-bold">داشبورد ها</h1>
        </div>
      </div>
      
      {error && (
        <p>خطا در دریافت اطلاعات داشبورد ها</p>
      )}

      {isLoading && (
        <div className="w-full h-full flex items-center justify-center">
        <PuffLoader color="#3b82f6" />
      </div>
      )}

      {(!data && !isLoading) && (
        <p>داشبوردی برای نمایش وجود ندارد!</p>
      )}

      {data && (
        <div className="w-full h-[85%]">
        <Table 
          columns={columns}
          data={data}
          RPP={10}
          getRowLink={(row: any) => `/devices/${row.id.id}`}
        />
      </div>
      )}
    </div>
  );
};

export default Dashboards;
