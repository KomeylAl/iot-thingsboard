"use client";

import React, { useEffect, useState } from "react";
import Table from "./Teble";
import { PuffLoader } from "react-spinners";
import { useDeviceEvents } from "@/hooks/useDevices";
import { useUser } from "@/hooks/useUser";

interface DeviceEventsProps {
  deviceId: string;
}

const DeviceEvents = ({ deviceId }: DeviceEventsProps) => {
  const { data: userData } = useUser();
  const [tenantId, setTenantId] = useState("");

  useEffect(() => {
    if (userData) {
      setTenantId(userData.data.tenantId.id);
    }
  }, []);

  const { data, isLoading, error, refetch } = useDeviceEvents(
    deviceId,
    tenantId,
    10,
    0
  );

  const columns = [
    { header: "سرور", accessor: "entityName" },
    { header: "روش", accessor: "actionType" },
    { header: "خطا", accessor: "actionStatus" },
    { header: "زمان رویداد", accessor: "createdTime" },
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

export default DeviceEvents;
