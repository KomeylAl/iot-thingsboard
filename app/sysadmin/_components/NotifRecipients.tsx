import Table from "@/app/dashboard/_components/Teble";
import { useNotifRecipients } from "@/hooks/useNotifs";
import React from "react";
import { PuffLoader } from "react-spinners";

const NotifRecipients = () => {
  const columns = [
    { header: "نام", accessor: "name" },
    { header: "زمان ایجاد", accessor: "createdTime" },
  ];

  const { data, isLoading, error, refetch } = useNotifRecipients(10, 0);

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

export default NotifRecipients;
