"use client";

import { useSystemInfo } from "@/hooks/useSystemInfo";
import { formatBytes } from "@/utils/convert";
import React, { useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const SystemInfo = () => {
  const { data } = useSystemInfo();

  const [systemInfo, setSystemInfo]: any = useState({
    cpuUsage: 0,
    cpuCount: 0,
    memoryUsage: 0,
    totalMemory: 0,
    discUsage: 0,
    totalDiscSpace: 0,
    serviceType: "MONOLITH",
  });
  const [chartData, setChartData] = useState<
    { time: string; cpu: number; ram: number; disk: number }[]
  >([]);

  useEffect(() => {
    if (data) {
      setSystemInfo({
        cpuUsage: data.systemData[0].cpuUsage,
        cpuCount: data.systemData[0].cpuCount,
        memoryUsage: data.systemData[0].memoryUsage,
        totalMemory: data.systemData[0].totalMemory,
        discUsage: data.systemData[0].discUsage,
        totalDiscSpace: data.systemData[0].totalDiscSpace,
        serviceType: data.systemData[0].serviceType,
      });
      setChartData((prevData) => [
        ...prevData.slice(-20),
        {
          time: new Date().toLocaleTimeString(),
          cpu: data.systemData[0].cpuUsage,
          ram: data.systemData[0].memoryUsage,
          disk: data.systemData[0].discUsage,
        },
      ]);
    }
  }, [data]);
  return (
    <>
      {/* بخش پایین */}
      <div className="w-full flex-1 bg-white dark:bg-gray-700 rounded-lg p-8 flex flex-col gap-3 overflow-auto">
        {systemInfo.cpuUsage !== 0 && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="border border-gray-200 rounded-lg flex flex-col items-start gap-2 p-2">
              <p>مصرف CPU</p>
              <p>
                {systemInfo.cpuUsage}% | {systemInfo.cpuCount} هسته
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg flex flex-col items-start gap-2 p-2">
              <p>مصرف RAM</p>
              <p>
                {systemInfo.memoryUsage}% |{" "}
                {formatBytes(systemInfo.totalMemory, 2)} GB
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg flex flex-col items-start gap-2 p-2">
              <p>مصرف DISC</p>
              <p>
                {systemInfo.discUsage}% |{" "}
                {formatBytes(systemInfo.totalDiscSpace, 2)} GB
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg flex flex-col items-start gap-2 p-2">
              <p>نوع سرویس</p>
              <p>{systemInfo.serviceType}</p>
            </div>
          </div>
        )}

        <ResponsiveContainer width="100%" height="70%">
          <LineChart data={chartData}>
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
      </div>
    </>
  );
};

export default SystemInfo;
