"use client";

import React from "react";
import Table from "./Teble";
import SearchBar from "@/components/SearchBar";
import { PuffLoader } from "react-spinners";
import { useDeviceAlarms } from "@/hooks/useDevices";
import TelemetryDevices from "@/utils/telemetryWebSooket";

interface DeviceTelemetryProps {
  deviceId: string;
}

const DeviceTelemetry = ({ deviceId }: DeviceTelemetryProps) => {
//   const telemetryData: any = useTelemetryWebSocket(deviceId);
//   console.log(telemetryData)

  const columns = [
    { header: "نام", accessor: "name" },
    { header: "نوع", accessor: "type" },
    { header: "شدت", accessor: "label" },
    { header: "وضعیت", accessor: "status" },
    { header: "زمان ایجاد", accessor: "status" },
  ];

  return (
    <div>
      {/* <h3>آخرین مقدار دما: {telemetryData? || "در حال دریافت..."}°C</h3> */}
      <TelemetryDevices deviceId={deviceId} />

      {/* {!telemetryData?.data && (
        <div className="w-full h-full flex items-center justify-center">
          <PuffLoader color="#3b82f6" />
        </div>
      )}

      {telemetryData?.data && (
        <div className="w-full h-[85%]">
          <Table
            columns={columns}
            data={telemetryData?.data}
            RPP={10}
            getRowLink={(row: any) => `/dashboard/alarms/${row.id.id}`}
          />
        </div>
      )} */}
    </div>
  );
};

export default DeviceTelemetry;
