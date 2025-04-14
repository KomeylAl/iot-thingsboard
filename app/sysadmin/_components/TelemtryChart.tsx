"use client";

import { useEffect, useState } from "react";
import Table from "@/app/dashboard/_components/Teble";
import toast from "react-hot-toast";
import { PuffLoader } from "react-spinners";
import { transformTelemetryData } from "@/utils/convert";

const getTokenFromApi = async () => {
  const res = await fetch("/api/token");
  const data = await res.json();
  return data.value;
};

const TelemetryChart = () => {
  const columns = [
    { header: "نام", accessor: "name" },
    { header: "نوع", accessor: "type" },
    { header: "شدت", accessor: "label" },
    { header: "وضعیت", accessor: "status" },
    { header: "زمان ایجاد", accessor: "createdAtTime" }, // فیلد زمان
  ];

  const [data, setData] = useState<any>([]);

  useEffect(() => {
    getTokenFromApi().then((token) => {
      if (!token) return;

      const ws = new WebSocket(
        `ws://93.127.180.145:8080/api/ws/plugins/telemetry?token=${token}`
      );

      ws.onopen = () => {
        console.log("WebSocket Connected");
        ws.send(
          JSON.stringify({
            tsSubCmds: [
              {
                entityType: "ALL",
                entityId: "",
               //  scope: "ANY",
                scope: "ANY",
                cmdId: 1,
              },
            ],
            historyCmds: [],
            attrSubCmds: [],
          })
        );
      };

      ws.onmessage = (event) => {
        const receivedData = JSON.parse(event.data);
        console.log("Received telemetry:", receivedData);

        setData((prevData: any) => {
          const newData = transformTelemetryData(receivedData.data);

          // ترکیب داده‌های قبلی و جدید، بدون حذف ردیف‌های قدیمی
          const mergedData = [...prevData];

          newData.forEach((newItem) => {
            const index = mergedData.findIndex(
              (item) => item.name === newItem.name
            );
            if (index !== -1) {
              // اگر مقدار قبلاً وجود دارد، مقدار جدید را جایگزین آن کنیم
              mergedData[index] = newItem;
            } else {
              // در غیر این صورت، مقدار جدید را اضافه کنیم
              mergedData.push(newItem);
            }
          });

          return mergedData;
        });
      };

      ws.onerror = (error) => {
        console.error("WebSocket Error:", error);
        toast.error("خطا در برقراری ارتباط");
      };
      ws.onclose = () => console.log("WebSocket Disconnected");

      return () => ws.close();
    });
  }, []);

  return (
    <div>
      {!data && (
        <div className="w-full h-full flex items-center justify-center">
          <PuffLoader color="#3b82f6" />
        </div>
      )}

      {data && (
        <Table
          columns={columns}
          data={data}
          RPP={10}
          getRowLink={(row: any) => `/dashboard/alarms/${row.id?.id}`}
        />
      )}
    </div>
  );
};

export default TelemetryChart;
