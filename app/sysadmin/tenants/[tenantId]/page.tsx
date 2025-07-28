"use client";

import Popup from "@/components/Popup";
import { useDeleteTenant, useLocalTenant, useTenant } from "@/hooks/useTenants";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { BiPencil } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import EditTenantForm from "../../_components/EditTenantForm";
import { Tab, Tabs } from "@/components/Tabs";
import DeleteModal from "@/components/DeleteModal";
import { useModal } from "@/hooks/useModal";
import { useSyncTenantUsers } from "@/hooks/useUser";
import TenantUsers from "../../_components/TenantUsers";
import Table from "@/components/Table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

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
            <Button
              onClick={() => syncUsersRefetch()}
              className="py-2 px-4 border border-blue-500 text-blue-500 rounded-lg flex items-center bg-white"
            >
              {syncUsersLoading ? "در حال ارسال..." : "همگام سازی کاربران"}
            </Button>
            <Button
              onClick={openEdit}
              className="py-2 px-4 bg-blue-500 text-white rounded-lg flex items-center"
            >
              <BiPencil size={24} />
              ویرایش اطلاعات سازمان
            </Button>
            <Button
              disabled={isDeleting}
              onClick={openDelete}
              className={`py-2 px-4 bg-rose-500 text-white rounded-lg flex items-center ${
                isDeleting && "bg-rose-300"
              }`}
            >
              <MdDelete size={24} />
              {isDeleting ? "در حال حذف" : "حذف سازمان"}
            </Button>
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
      <Dialog open={editOpen} onOpenChange={closeEdit}>
        <DialogContent className="overflow-y-auto max-h-[80%] max-w-[400px] rounded-md">
          <DialogTitle className="text-lg font-bold mb-2 mt-6">
            ویرایش اطلاعات سازمان
          </DialogTitle>
          <EditTenantForm
            onTenantUpdated={() => {
              closeEdit();
              refetch();
            }}
            tenantData={serverData}
          />
        </DialogContent>
      </Dialog>
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
