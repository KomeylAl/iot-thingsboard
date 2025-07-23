"use client";

import { Tab, Tabs } from "@/components/Tabs";
import {
  useDeleteDevice,
  useDevice,
  useDeviceAlarms,
  useDeviceToken,
  useTestDevice,
} from "@/hooks/useDevices";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { BiPencil } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { PuffLoader } from "react-spinners";
import Popup from "@/components/Popup";
import DeviceTelemetry from "../../_components/DeviceTelemetry";
import DeviceAudits from "../../_components/DeviceAudits";
import DeviceEvents from "../../_components/DeviceEvents";
import EditDeviceForm from "../../_components/forms/EditDeviceForm";
import DeleteModal from "@/components/DeleteModal";
import { alarmColumns } from "@/utils/columns";
import EntityTable from "@/components/ui/EntityTable";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/useModal";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import CopyField from "@/components/ui/custom/CopyField";
import { useUser } from "@/context/UserContext";

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

  const {
    data: alarmsData,
    isLoading: alarmsLoading,
    error: alarmsError,
  } = useDeviceAlarms(deviceId, 10, 0);

  const { data: serverData } = useDevice(deviceId);
  const { user } = useUser();
  const { isLoading: testLoading, refetch: testRefetch } = useTestDevice(
    deviceId,
    user?.tenantId.id
  );
  const {
    data: token,
    isLoading: tokenLoading,
    error: tokenError,
  } = useDeviceToken(deviceId);
  const { mutate: deleteDevice, isPending: isDeleting } = useDeleteDevice(
    deviceId,
    () => {
      router.back();
    }
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const toggleMpdal = () => setIsModalOpen(!isModalOpen);

  const { isOpen, openModal, closeModal } = useModal();

  return (
    <div className="p-6 lg:p-20 w-full h-screen flex flex-col items-center justify-between gap-6">
      <div className="w-full h-[15%] flex flex-col items-start justify-between">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-xl lg:text-3xl font-bold">
            دستگاه {data && data.name}
          </h1>
          <div className="flex items-center gap-4">
            <Button onClick={openModal}>دریافت Token</Button>
            <Button
              variant="outline"
              onClick={() => testRefetch()}
              className="py-2 px-4 border border-blue-500 text-blue-500 rounded-lg flex items-center"
            >
              {testLoading ? "در حال ارسال..." : "تست ارسال داده"}
            </Button>
            <Button
              onClick={toggleMpdal}
              className="py-2 px-4 bg-blue-500 text-white rounded-lg flex items-center"
            >
              <BiPencil size={24} />
              ویرایش اطلاعات دستگاه
            </Button>
            <Button
              disabled={isDeleting}
              onClick={() => setIsDeleteModalOpen(true)}
              className={`py-2 px-4 bg-rose-500 text-white rounded-lg flex items-center ${
                isDeleting && "bg-rose-300"
              }`}
            >
              <MdDelete size={24} />
              {isDeleting ? "در حال حذف" : "حذف دستگاه"}
            </Button>
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
              <EntityTable
                columns={alarmColumns}
                data={alarmsData}
                error={alarmsError}
                isLoading={alarmsLoading}
                onPageChange={() => {}}
              />
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
      <Popup
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      >
        <DeleteModal
          deleteFunc={deleteDevice}
          isDeleting={isDeleting}
          onCancel={() => setIsDeleteModalOpen(false)}
        />
      </Popup>
      <Dialog open={isOpen} onOpenChange={closeModal}>
        <DialogContent className="max-h-[80vh] overflow-y-auto">
          <DialogTitle className="text-lg font-bold mb-2 mt-6">
            توکن دستگاه
          </DialogTitle>
          {tokenLoading && (
            <div className="w-full h-full flex items-center justify-center">
              <PuffLoader color="#3b82f6" />
            </div>
          )}
          {tokenError && (
            <div className="w-full h-full flex items-center justify-center">
              <p style={{ color: "red" }}>{tokenError.message}</p>
            </div>
          )}
          {token && <CopyField value={token} />}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DevicePage;
