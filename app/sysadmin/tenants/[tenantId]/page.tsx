"use client";

import Popup from "@/components/Popup";
import {
  useDeleteTenant,
  useLocalTenant,
  useTenant,
} from "@/hooks/useTenants";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { BiPencil } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import EditTenantForm from "../../_components/EditTenantForm";
import { Tab, Tabs } from "@/components/Tabs";
import DeleteModal from "@/components/DeleteModal";
import EntityTable from "@/components/ui/EntityTable";
import { useModal } from "@/hooks/useModal";
import { useSyncTenantUsers } from "@/hooks/useUser";
import TenantUsers from "../../_components/TenantUsers";
import Table from "@/components/Table";

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
  const { data: serverData } = useTenant(tenantId);

  const { isLoading: syncUsersLoading, refetch: syncUsersRefetch } =
    useSyncTenantUsers(tenantId);

  const { mutate: deleteTenant, isPending: isDeleting } = useDeleteTenant(
    tenantId,
    () => {
      router.back();
    }
  );

  const {
    isOpen: editOpen,
    openModal: openEdit,
    closeModal: closeEdit,
  } = useModal();
  const {
    isOpen: deleteOpen,
    openModal: openDelete,
    closeModal: closeDelete,
  } = useModal();

  const columns = [
    { header: "نام", accessor: "name" },
    { header: "پروفایل", accessor: "type" },
    // { header: "مشتری", accessor: (item: any) => item.customer.name },
    { header: "وضعیت", accessor: "status" },
  ];

  console.log(data);

  return (
    <div className="p-6 lg:p-20 w-full h-screen flex flex-col items-center justify-between gap-6">
      <div className="w-full h-[15%] flex flex-col items-start justify-between">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-xl lg:text-3xl font-bold">
            سازمان {data && data.name}
          </h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => syncUsersRefetch()}
              className="py-2 px-4 border border-blue-500 text-blue-500 rounded-lg flex items-center"
            >
              {syncUsersLoading ? "در حال ارسال..." : "همگام سازی کاربران"}
            </button>
            <button
              onClick={openEdit}
              className="py-2 px-4 bg-blue-500 text-white rounded-lg flex items-center"
            >
              <BiPencil size={24} />
              ویرایش اطلاعات سازمان
            </button>
            <button
              disabled={isDeleting}
              onClick={openDelete}
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
            {data && (
              <Table
                columns={columns}
                data={data.devices}
                onPageChange={() => {}}
              />
            )}
          </Tab>
          <Tab label="کاربران">
            <TenantUsers tenantId={tenantId} />
          </Tab>
        </Tabs>
      </div>
      <Popup isOpen={editOpen} onClose={closeEdit}>
        <EditTenantForm
          onTenantUpdated={() => {
            closeEdit();
            refetch();
          }}
          tenantData={serverData}
        />
      </Popup>
      <Popup isOpen={deleteOpen} onClose={closeDelete}>
        <DeleteModal
          deleteFunc={deleteTenant}
          isDeleting={isDeleting}
          onCancel={closeDelete}
        />
      </Popup>
    </div>
  );
};

export default Tenant;
