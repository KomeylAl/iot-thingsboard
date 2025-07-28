"use client";

import Popup from "@/components/Popup";
import React, { useState } from "react";
import { PuffLoader } from "react-spinners";
import AddUserForm from "./AddUserForm";
import { useModal } from "@/hooks/useModal";
import { useTenantUsers } from "@/hooks/useTenants";
import Table from "@/components/Table";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface TenantUsersProps {
  tenantId: string;
}

const TenantUsers = ({ tenantId }: TenantUsersProps) => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const [id, setId] = useState("");
  const [admin, setAdmin] = useState<any>({});
  const { data, isLoading, error, refetch } = useTenantUsers(
    tenantId,
    pageSize,
    page
  );

  const { isOpen, openModal, closeModal } = useModal();
  const {
    isOpen: deleteOpen,
    openModal: openDelete,
    closeModal: closeDelete,
  } = useModal();
  const {
    isOpen: editOpen,
    openModal: openEdit,
    closeModal: closeEdit,
  } = useModal();

  const columns = [
    { header: "نام", accessor: "firstName" },
    { header: "نام خانوادگی", accessor: "lastName" },
    { header: "ایمیل", accessor: "email" },
    { header: "تلفن", accessor: "phone" },
  ];

  return (
    <div>
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
          <div className="w-full h-full">
            <div className="w-full">
              <Button
                onClick={openModal}
                className="px-4 py-2 bg-blue-500 rounded-lg text-white mb-3"
              >
                افزودن کاربر
              </Button>
            </div>
            <Table
              columns={columns}
              data={data.data}
              pageSize={pageSize}
              totalItems={data.totalElements}
              currentPage={page + 1}
              onPageChange={(newPage) => setPage(newPage - 1)}
            />
          </div>
        </div>
      )}

      <Dialog open={isOpen} onOpenChange={closeModal}>
        <DialogContent className="overflow-y-auto max-h-[80%] max-w-[400px] rounded-md">
          <DialogTitle className="text-lg font-bold mb-2 mt-6">
            افزودن کاربر
          </DialogTitle>
          <AddUserForm
            tenantId={tenantId}
            onUserAdded={() => {
              closeModal();
              refetch();
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TenantUsers;
