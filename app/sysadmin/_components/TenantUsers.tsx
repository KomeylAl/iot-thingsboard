"use client";

import Table from "@/app/dashboard/_components/Teble";
import Popup from "@/components/Popup";
import { Tab } from "@/components/Tabs";
import { useLocalTenantsUsers } from "@/hooks/useUser";
import React, { useState } from "react";
import { BiPlus } from "react-icons/bi";
import { PuffLoader } from "react-spinners";
import AddUserForm from "./AddUserForm";

interface TenantUsersProps {
  tenantId: string;
}

const TenantUsers = ({ tenantId }: TenantUsersProps) => {
  const { data, isLoading, error, refetch } = useLocalTenantsUsers();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

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
            <button className="mb-4 bg-blue-500 rounded-lg py-2 px-4 text-white flex items-center gap-2" onClick={toggleModal}>
              <BiPlus size={20} className="text-white" />
              افزودن کاربر
            </button>
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
      <Popup isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
         <AddUserForm tenantId={tenantId} onUserAdded={() => {
            setIsModalOpen(false);
            refetch();
         }} />
      </Popup>
    </div>
  );
};

export default TenantUsers;
