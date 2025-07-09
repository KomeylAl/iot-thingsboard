import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetTelemtryInfo, useKeys } from "@/hooks/useTelemetry";
import { EntityType } from "@/lib/types";
import { convertISOToJalali } from "@/utils/convert";
import dynamic from "next/dynamic";
import React, { useEffect, useMemo, useState } from "react";

interface MainRequestsChartProps {
  selectOptions: any;
  selectFn: (value: any) => void;
  deviceId: string;
}

const MainRequestList = ({
  selectOptions,
  selectFn,
  deviceId,
}: MainRequestsChartProps) => {
  const {
    data: keysData,
    isLoading: isLoadingKeys,
    refetch: refetchKeys,
  } = useKeys(deviceId);
  const [selectedKey, setSelectedKey] = useState<string>("");
  const [keyOptions, setKeyOptions] = useState<EntityType[]>([]);

  const {
    data: telemetryData,
    isLoading: loadingTelemetry,
    refetch: fetchTelemetry,
  } = useGetTelemtryInfo(deviceId, selectedKey);

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

  const listData = useMemo(() => {
    if (!telemetryData || !telemetryData[selectedKey]) return [];
    return telemetryData[selectedKey].map((point: any) => ({
      time: convertISOToJalali(point.ts),
      value: point.value,
    }));
  }, [telemetryData, selectedKey]);

  console.log(listData);

  return (
    <div className="space-y-3">
      <p className="text-lg">لیست Telemetry دستگاه</p>

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
            {selectOptions.map((entity: EntityType) => (
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
            <SelectValue
              placeholder={
                isLoadingKeys ? "در حال دریافت کلیدها..." : "انتخاب کلید"
              }
            />
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
          <div className="w-full space-y-2">
            {listData.map((item: any, index: any) => (
              <div
                key={index}
                className="w-full bg-white border border-gray-100 rounded-md p-2"
              >
                <p>زمان: {item.time}</p>
                <p>مقدار: {item.value}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MainRequestList;
