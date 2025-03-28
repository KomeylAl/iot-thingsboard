"use client";

import Table from "@/app/dashboard/_components/Teble";
import { useUnreadNotifs } from "@/hooks/useNotifs";
import React from "react";
import { PuffLoader } from "react-spinners";

const UnreadNotifs = () => {
  const columns = [
    { header: "وضعیت", accessor: "status" },
    { header: "متن", accessor: "text" },
    { header: "زمان ایجاد", accessor: "createdTime" },
  ];

  const { data, isLoading, error, refetch } = useUnreadNotifs(10, 0);

  return (
    <div className="w-full h-full">
      {error && (
        <div className="w-full h-full flex items-center justify-center">
          <p style={{ color: "red" }}>خطا در دریافت اطلاعات</p>
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
          getRowLink={(row: any) => ``}
          clickableRows={false}
        />
      )}
    </div>
  );
};

export default UnreadNotifs;
