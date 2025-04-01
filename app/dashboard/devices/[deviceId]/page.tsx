"use client";

import { Tab, Tabs } from "@/components/Tabs";
import { useDeleteDevice, useDevice, useTestDevice } from "@/hooks/useDevices";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { BiPencil } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { PuffLoader } from "react-spinners";
import Popup from "@/components/Popup";
import DeviceAlarms from "../../_components/DeviceAlarms";
import DeviceTelemetry from "../../_components/DeviceTelemetry";
import DeviceAudits from "../../_components/DeviceAudits";
import DeviceEvents from "../../_components/DeviceEvents";
import EditDeviceForm from "../../_components/EditDeviceForm";
import DeleteModal from "@/components/DeleteModal";

interface Params {
  deviceId: string;
}

interface PageProps {
  params: React.Usable<Params>;
}

const DevicePage = ({ params }: PageProps) => {
  const router = useRouter();

  const { deviceId } = React.use<Params>(params);
  const { data, isLoading, error, refetch } = useDevice(deviceId);
  const { data: serverData } = useDevice(deviceId);
  const {
    data: testData,
    isLoading: testLoading,
    error: testError,
    refetch: testRefetch,
  } = useTestDevice(deviceId);
  const { mutate: deleteDevice, isPending: isDeleting } = useDeleteDevice(
    deviceId,
    () => {
      router.back();
    }
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const toggleMpdal = () => setIsModalOpen(!isModalOpen);

  return (
    <div className="p-6 lg:p-20 w-full h-screen flex flex-col items-center justify-between gap-6">
      <div className="w-full h-[15%] flex flex-col items-start justify-between">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-xl lg:text-3xl font-bold">
            دستگاه {data && data.name}
          </h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => testRefetch()}
              className="py-2 px-4 border border-blue-500 text-blue-500 rounded-lg flex items-center"
            >
              {testLoading ? "در حال ارسال..." : "تست ارسال داده"}
            </button>
            <button
              onClick={toggleMpdal}
              className="py-2 px-4 bg-blue-500 text-white rounded-lg flex items-center"
            >
              <BiPencil size={24} />
              ویرایش اطلاعات دستگاه
            </button>
            <button
              disabled={isDeleting}
              onClick={() => setIsDeleteModalOpen(true)}
              className={`py-2 px-4 bg-rose-500 text-white rounded-lg flex items-center ${
                isDeleting && "bg-rose-300"
              }`}
            >
              <MdDelete size={24} />
              {isDeleting ? "در حال حذف" : "حذف دستگاه"}
            </button>
          </div>
        </div>
      </div>
      <div className="w-full h-[85%]">
        {isLoading && (
          <div className="w-full h-full flex items-center justify-center">
            <PuffLoader color="#3b82f6" />
          </div>
        )}

        {error && (
          <div className="w-full h-full flex items-center justify-center">
            <p style={{ color: "red" }}>{error.message}</p>
          </div>
        )}

        {data && (
          <Tabs>
            <Tab label="هشدار ها" defaultTab>
              <DeviceAlarms deviceId={deviceId} />
            </Tab>
            <Tab label="آخرین سنجش">
              <DeviceTelemetry deviceId={deviceId} />
            </Tab>
            <Tab label="داده های ثبت شده از بازبینی">
              <DeviceAudits deviceId={deviceId} />
            </Tab>
            <Tab label="رویداد ها">
              <DeviceEvents deviceId={deviceId} />
            </Tab>
          </Tabs>
        )}
      </div>
      <Popup isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <EditDeviceForm
          deviceData={serverData}
          onDeviceUpdated={() => {
            setIsModalOpen(false);
            refetch();
          }}
        />
      </Popup>
      <Popup isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
          <DeleteModal 
            deleteFunc={deleteDevice}
            isDeleting={isDeleting}
            onCancel={() => setIsDeleteModalOpen(false)}
          />
      </Popup>
    </div>
  );
};

export default DevicePage;
