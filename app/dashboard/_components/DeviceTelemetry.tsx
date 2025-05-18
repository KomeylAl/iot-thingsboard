"use client";

import React from "react";
import TelemetryDevices from "@/utils/telemetryWebSooket";

interface DeviceTelemetryProps {
  deviceId: string;
}

const DeviceTelemetry = ({ deviceId }: DeviceTelemetryProps) => {
  return (
    <div>
      <TelemetryDevices deviceId={deviceId} />
    </div>
  );
};

export default DeviceTelemetry;
