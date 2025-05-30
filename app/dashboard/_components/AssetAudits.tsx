"use client";

import React from "react";
import Table from "./Teble";
import { PuffLoader } from "react-spinners";
import { useAssetAudits } from "@/hooks/useAssets";

interface AssetAuditsProps {
  assetId: string;
}

const AssetAudits = ({ assetId }: AssetAuditsProps) => {
  const { data, isLoading, error, refetch } = useAssetAudits(assetId, 10, 0);

  const columns = [
    { header: "نام", accessor: "entityName" },
    { header: "نوع", accessor: "actionType" },
    { header: "وضعیت", accessor: "actionStatus" },
    { header: "زمان ایجاد", accessor: "createdTime" },
  ];

  return (
    <div>
      {error && <p>خطا در دریافت اطلاعات</p>}

      {isLoading && (
        <div className="w-full h-full flex items-center justify-center">
          <PuffLoader color="#3b82f6" />
        </div>
      )}

      {!data && !isLoading && <p>داده ای برای نمایش وجود ندارد!</p>}

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

export default AssetAudits;
