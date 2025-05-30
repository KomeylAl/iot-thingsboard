"use client";

import React from "react";
import Table from "@/app/dashboard/_components/Teble";
import { PuffLoader } from "react-spinners";
import { useDashboards } from "@/hooks/useDashboards";

const Dashboards = () => {
  const { data, isLoading, error, refetch } = useDashboards(10, 0);

  const columns = [
    { header: "نام", accessor: "name" },
    { header: "ورژن", accessor: "version" },
    { header: "زمان ایجاد", accessor: "createdTime" },
  ];

  return (
    <div className="p-6 lg:p-20 w-full h-screen flex flex-col items-center justify-between gap-6">
      <div className="w-full h-[15%] flex flex-col items-start justify-between">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-xl lg:text-3xl font-bold">داشبورد ها</h1>
        </div>
      </div>

      {error && <p>خطا در دریافت اطلاعات داشبورد ها</p>}

      {isLoading && (
        <div className="w-full h-full flex items-center justify-center">
          <PuffLoader color="#3b82f6" />
        </div>
      )}

      {!data && !isLoading && <p>داشبوردی برای نمایش وجود ندارد!</p>}

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
    </div>
  );
};

export default Dashboards;
