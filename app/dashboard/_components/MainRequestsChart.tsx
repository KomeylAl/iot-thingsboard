"use client";

import { useKeys } from "@/hooks/useTelemetry";
import dynamic from "next/dynamic";
import React from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const Select = dynamic(() => import("react-select"), { ssr: false });

interface MainRequestsChartProps {
  selectOptions: any;
  selectFn: (value: any) => void;
  deviceId: string;
}

const MainRequestsChart = ({
  selectOptions,
  selectFn,
  deviceId,
}: MainRequestsChartProps) => {
  const { data, isLoading, error, refetch } = useKeys(deviceId);

  return (
    <div className="space-y-3">
      <p className="text-lg">نمودار درخواست های دستگاه</p>
      <div className="flex items-center gap-3">
      <Select
        placeholder="انتخاب دستگاه"
        className="w-full"
        options={selectOptions}
        onChange={(option: any) => {
          selectFn(option.value);
          refetch();
        }}
      />
      <Select
        placeholder="انتخاب کلید"
        className="w-full dark:bg-gray-800"
        classNamePrefix='bg-gray-900'
      />
      </div>
      <div className="w-full h-full flex items-center justify-center">
        {!deviceId ? (
          <p>لطفا یک دستگاه انتخاب کنید.</p>
        ) : (
          <ResponsiveContainer width="100%" height="70%">
            <LineChart>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis domain={[0, 100]} unit="%" />
              <Tooltip />
              {/* <Legend /> */}
              <Line
                type="monotone"
                dataKey="cpu"
                stroke="#3582fc"
                name="CPU Usage"
              />
              <Line
                type="monotone"
                dataKey="ram"
                stroke="#7435fc"
                name="RAM Usage"
              />
              <Line
                type="monotone"
                dataKey="disk"
                stroke="#fc6a35"
                name="Disk Usage"
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default MainRequestsChart;
