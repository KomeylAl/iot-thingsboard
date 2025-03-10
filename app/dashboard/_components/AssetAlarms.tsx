"use client";

import React from "react";
import Table from "./Teble";
import SearchBar from "@/components/SearchBar";
import { PuffLoader } from "react-spinners";
import { useAssetAlarms } from "@/hooks/useAssets";

interface AssetAlarmsProps {
  assetId: string;
}

const AssetAlarms = ({ assetId }: AssetAlarmsProps) => {
  const { data, isLoading, error, refetch } = useAssetAlarms(assetId, 10, 0);

  const columns = [
    { header: "نام", accessor: "name" },
    { header: "نوع", accessor: "type" },
    { header: "شدت", accessor: "label" },
    { header: "وضعیت", accessor: "status" },
    { header: "زمان ایجاد", accessor: "status" },
  ];

  return (
    <div>
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
            clickableRows={false}
            getRowLink={(row: any) => `/dashboard/alarms/${row.id.id}`}
          />
        </div>
      )}
    </div>
  );
};

export default AssetAlarms;
