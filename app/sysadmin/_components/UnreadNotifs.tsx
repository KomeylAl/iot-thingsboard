"use client";

import Table from "@/components/Table";
import { useMarkNotif, useUnreadNotifs } from "@/hooks/useNotifs";
import { convertISOToJalali } from "@/utils/convert";
import React, { useState } from "react";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { PuffLoader } from "react-spinners";

const UnreadNotifs = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const { data, isLoading, error, refetch } = useUnreadNotifs(pageSize, page);
  const { mutate: markNotif, isPending } = useMarkNotif();

  const columns = [
    { header: "وضعیت", accessor: "status" },
    { header: "متن", accessor: "text" },
    {
      header: "زمان ایجاد",
      accessor: (item: any) => convertISOToJalali(item.createdTime),
    },
    {
      header: "خوانده شده",
      accessor: (item: any) => {
        return isPending ? (
          <PuffLoader color="#3b82f6" size={20} />
        ) : (
          <IoIosCheckmarkCircleOutline
            className="cursor-pointer text-blue-500"
            size={20}
            onClick={() => {
              markNotif(item.id.id);
              refetch();
            }}
          />
        );
      },
    },
  ];

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
          pageSize={pageSize}
          totalItems={data.totalElements}
          currentPage={page + 1}
          onPageChange={(newPage) => setPage(newPage - 1)}
        />
      )}
    </div>
  );
};

export default UnreadNotifs;
