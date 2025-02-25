"use client";

import Popup from "@/components/Popup";
import { useTenantDevices } from "@/hooks/useDevices";
import { useDeleteTenant, useLocalTenant } from "@/hooks/useTenants";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { BiPencil } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { PuffLoader } from "react-spinners";
import EditTenantForm from "../../_components/EditTenantForm";
import { Tab, Tabs } from "@/components/Tabs";
import Table from "@/app/dashboard/_components/Teble";

interface Params {
  tenantId: string;
}

interface PageProps {
  params: React.Usable<Params>;
}

const Tenant = ({ params }: PageProps) => {
  const router = useRouter();

  const { tenantId } = React.use<Params>(params);
  const { data, isLoading, error, refetch } = useLocalTenant(tenantId);
  const { mutate: deleteTenant, isPending: isDeleting } = useDeleteTenant(
    tenantId,
    () => {
      router.back();
    }
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleMpdal = () => setIsModalOpen(!isModalOpen);

  const columns = [
    { header: "نام", accessor: "name" },
    { header: "پروفایل", accessor: "type" },
    { header: "مشتری", accessor: "customer.name" },
    { header: "وضعیت", accessor: "status" },
  ];

  return (
    <div className="p-6 lg:p-20 w-full h-screen flex flex-col items-center justify-between gap-6">
      <div className="w-full h-[15%] flex flex-col items-start justify-between">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-xl lg:text-3xl font-bold">
            سازمان {data && data.name}
          </h1>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleMpdal}
              className="py-2 px-4 bg-blue-500 text-white rounded-lg flex items-center"
            >
              <BiPencil size={24} />
              ویرایش اطلاعات سازمان
            </button>
            <button
              disabled={isDeleting}
              onClick={() => deleteTenant()}
              className={`py-2 px-4 bg-rose-500 text-white rounded-lg flex items-center ${
                isDeleting && "bg-rose-300"
              }`}
            >
              <MdDelete size={24} />
              {isDeleting ? "در حال حذف" : "حذف سازمان"}
            </button>
          </div>
        </div>
      </div>
      <div className="w-full h-[85%]">
        <Tabs>
          <Tab label="دستگاه ها" defaultTab>
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
              <div className="w-full h-full flex-1 items-center">
                <div className="w-full h-full bg-white rounded-md p-6">
                  <Table 
                    columns={columns}
                    data={data.devices}
                    RPP={10}
                    getRowLink={(row: any) => `/tenants/${tenantId}/devices/${row.things_id}`}
                  />
                </div>
              </div>
            )}
          </Tab>
          <Tab label="مدیران">
            <div></div>
          </Tab>
          <Tab label="هشدار ها">
            <div></div>
          </Tab>
          <Tab label="آخرین سنجش ها">
            <div></div>
          </Tab>
        </Tabs>
      </div>
      <Popup isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <EditTenantForm
          onTenantUpdated={() => {
            setIsModalOpen(false);
            refetch();
          }}
          tenantData={data}
        />
      </Popup>
    </div>
  );
};

export default Tenant;
