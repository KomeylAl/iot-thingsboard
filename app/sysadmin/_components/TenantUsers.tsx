"use client";

import Table from "@/app/dashboard/_components/Teble";
import Popup from "@/components/Popup";
import { Tab } from "@/components/Tabs";
import { useLocalTenantsUsers } from "@/hooks/useUser";
import React, { useState } from "react";
import { BiPlus } from "react-icons/bi";
import { PuffLoader } from "react-spinners";
import AddUserForm from "./AddUserForm";
import { useModal } from "@/hooks/useModal";

interface TenantUsersProps {
  tenantId: string;
}

const TenantUsers = ({ tenantId }: TenantUsersProps) => {
  const { data, isLoading, error, refetch } = useLocalTenantsUsers(tenantId);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const {
    isOpen: isAddAdminOpen,
    openModal: openAddAdmin,
    closeModal: closeAddAdmin,
  } = useModal();

  const columns = [
    { header: "نام", accessor: "firstName" },
    { header: "نام خانوادگی", accessor: "lastName" },
    { header: "ایمیل", accessor: "email" },
    { header: "تلفن", accessor: "phone" },
    { header: "ویرایش", type: "editButton", accessor: "edit" },
    { header: "حذف", type: "deleteButton", accessor: "delete" },
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
          <div className="w-full h-full bg-white rounded-md p-6">
            <div className="w-full">
              <button
                onClick={openAddAdmin}
                className="px-4 py-2 bg-blue-500 rounded-lg text-white mb-3"
              >
                افزودن کاربر
              </button>
            </div>
            <Table
              columns={columns}
              data={data.data}
              RPP={10}
              getRowLink={(row: any) => ""}
              clickableRows={false}
            />
          </div>
        </div>
      )}

      <Popup isOpen={isAddAdminOpen} onClose={closeAddAdmin}>
        <AddUserForm
          tenantId={tenantId}
          onUserAdded={() => {
            closeAddAdmin();
            refetch();
          }}
        />
      </Popup>
    </div>
  );
};

export default TenantUsers;
