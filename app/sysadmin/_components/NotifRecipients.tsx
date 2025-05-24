import Table from "@/components/Table";
import { useNotifRecipients } from "@/hooks/useNotifs";
import { convertISOToJalali } from "@/utils/convert";
import React, { useState } from "react";
import { PuffLoader } from "react-spinners";

const NotifRecipients = () => {
  const [page, setPage] = useState(0);
  const [pageSize] = useState(10);

  const columns = [
    { header: "نام", accessor: "name" },
    {
      header: "زمان ایجاد",
      accessor: (item: any) => convertISOToJalali(item.createdTime),
    },
  ];

  const { data, isLoading, error } = useNotifRecipients(
    pageSize,
    page
  );

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

export default NotifRecipients;
