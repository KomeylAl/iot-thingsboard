"use client";

import { useEffect, useState } from "react";
import { transformTelemetryData } from "./convert";
import toast from "react-hot-toast";
import { PuffLoader } from "react-spinners";
import Table from "@/components/Table";

const getTokenFromApi = async () => {
  const res = await fetch("/api/token");
  const data = await res.json();
  return data.value;
};

const TelemetryDevices = ({ deviceId }: { deviceId: string }) => {
  const columns = [
    { header: "نام", accessor: "name" },
    { header: "نوع", accessor: "type" },
    { header: "شدت", accessor: "label" },
    { header: "وضعیت", accessor: "status" },
    { header: "زمان ایجاد", accessor: "createdAtTime" },
  ];

  const [data, setData] = useState<any>([]);

  useEffect(() => {
    getTokenFromApi().then((token) => {
      console.log(token);
      if (!token || !deviceId) return;

      const ws = new WebSocket(
        `ws://93.127.180.145:8080/api/ws/plugins/telemetry?token=${token}`
      );

      ws.onopen = () => {
        console.log("WebSocket Connected");
        ws.send(
          JSON.stringify({
            tsSubCmds: [
              {
                entityType: "DEVICE",
                entityId: deviceId,
                scope: "LATEST_TELEMETRY",
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
          console.log(newData);

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
  }, [deviceId]);

  return (
    <div>
      {!data && (
        <div className="w-full h-full flex items-center justify-center">
          <PuffLoader color="#3b82f6" />
        </div>
      )}

      {data && <Table columns={columns} data={data} />}
    </div>
  );
};

export default TelemetryDevices;
