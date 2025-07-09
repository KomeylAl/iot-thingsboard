"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGetTelemtryInfo, useKeys } from "@/hooks/useTelemetry";
import { EntityType } from "@/lib/types";
import { convertISOToJalali } from "@/utils/convert";
import React, { useEffect, useMemo, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface MainRequestsChartProps {
  selectOptions: EntityType[];
  selectFn: (value: string) => void;
  deviceId: string;
}

const MainRequestsChart = ({
  selectOptions,
  selectFn,
  deviceId,
}: MainRequestsChartProps) => {
  const { data: keysData, isLoading: isLoadingKeys, refetch: refetchKeys } = useKeys(deviceId);
  const [selectedKey, setSelectedKey] = useState<string>("");
  const [keyOptions, setKeyOptions] = useState<EntityType[]>([]);

  const { data: telemetryData, isLoading: loadingTelemetry, refetch: fetchTelemetry } = useGetTelemtryInfo(deviceId, selectedKey);

  useEffect(() => {
    setSelectedKey("");
    if (deviceId) {
      refetchKeys();
    }
  }, [deviceId]);

  useEffect(() => {
    if (keysData && Array.isArray(keysData)) {
      setKeyOptions(
        keysData.map((item) => ({
          label: item,
          value: item,
        }))
      );
    } else {
      setKeyOptions([]);
    }
  }, [keysData]);

  useEffect(() => {
    if (deviceId && selectedKey) {
      fetchTelemetry();
    }
  }, [selectedKey, deviceId]);

  const chartData = useMemo(() => {
    if (!telemetryData || !telemetryData[selectedKey]) return [];
    return telemetryData[selectedKey].map((point: any) => ({
      time: convertISOToJalali(point.ts),
      value: point.value
    }));
  }, [telemetryData, selectedKey]);

  return (
    <div className="space-y-3">
      <p className="text-lg">نمودار Telemetry دستگاه</p>

      <div className="flex items-center gap-3">
        <Select
          onValueChange={(value: string) => {
            selectFn(value);
          }}
          value={deviceId || ""}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="انتخاب دستگاه" />
          </SelectTrigger>
          <SelectContent>
            {selectOptions.map((entity) => (
              <SelectItem
                key={entity.value}
                value={entity.value}
                className="text-right"
              >
                {entity.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          onValueChange={(value: string) => {
            setSelectedKey(value);
          }}
          value={selectedKey || ""}
          disabled={!deviceId || isLoadingKeys}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={isLoadingKeys ? "در حال دریافت کلیدها..." : "انتخاب کلید"} />
          </SelectTrigger>
          <SelectContent>
            {keyOptions.map((item) => (
              <SelectItem
                key={item.value}
                value={item.value}
                className="text-right"
              >
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="w-full h-full flex items-center justify-center">
        {!deviceId || !selectedKey ? (
          <p>لطفا یک دستگاه و یک کلید انتخاب کنید.</p>
        ) : loadingTelemetry ? (
          <p>در حال دریافت اطلاعات...</p>
        ) : (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis domain={['auto', 'auto']} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#3582fc"
                name={selectedKey}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default MainRequestsChart;
