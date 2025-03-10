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

  const columns = [
    { header: "نام", accessor: "name" },
    { header: "نوع", accessor: "type" },
    { header: "شدت", accessor: "label" },
    { header: "وضعیت", accessor: "status" },
    { header: "زمان ایجاد", accessor: "status" },
  ];

  return (
    <div>
      <TelemetryDevices deviceId={deviceId} />
    </div>
  );
};

export default DeviceTelemetry;
