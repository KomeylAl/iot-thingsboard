"use client";

import DeleteModal from "@/components/DeleteModal";
import Popup from "@/components/Popup";
import { Tab, Tabs } from "@/components/Tabs";
import {
  useCustomer,
  useCustomerAlarms,
  useCustomerAudits,
  useCustomerEvents,
  useCustomerUsers,
  useDeleteCustomer,
} from "@/hooks/useCustomers";
import { useModal } from "@/hooks/useModal";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BiPencil } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { PuffLoader } from "react-spinners";
import EditCustomerForm from "../../_components/EditCustomerForm";
import { useUser } from "@/hooks/useUser";
import EntityTable from "@/components/ui/EntityTable";
import {
  alarmColumns,
  auditColumns,
  eventColumns,
  userColumns,
} from "@/utils/columns";
import AddUserForm from "@/app/sysadmin/_components/AddUserForm";
import AddCustomerUserForm from "../../_components/AddCustomerUserForm";

interface Params {
  customerId: string;
}

interface PageProps {
  params: React.Usable<Params>;
}

const Customer = ({ params }: PageProps) => {
  const { customerId } = React.use<Params>(params);
  const router = useRouter();

  const { data: userData } = useUser();
  const [tenantId, setTenantId] = useState("");

  useEffect(() => {
    if (userData) {
      setTenantId(userData.data.tenantId.id);
    }
  }, [userData]);

  const { data, isLoading, error, refetch } = useCustomer(customerId);

  const {
    data: usersData,
    isLoading: usersLoading,
    error: usersError,
    refetch: usersRefetch,
  } = useCustomerUsers(customerId, 10, 0);

  const {
    data: alarmsData,
    isLoading: alarmsLoading,
    error: alarmsError,
  } = useCustomerAlarms(customerId, 10, 0);

  const {
    data: auditsData,
    isLoading: auditsLoading,
    error: auditsError,
  } = useCustomerAudits(customerId, 10, 0);

  const {
    data: eventsData,
    isLoading: eventsLoading,
    error: eventsError,
  } = useCustomerEvents(customerId, tenantId, 10, 0);

  const { mutate: deleteCustomer, isPending: isDeleting } = useDeleteCustomer(
    customerId,
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
  const {
    isOpen: userOpen,
    openModal: openUser,
    closeModal: closeUser,
  } = useModal();

  return (
    <div className="p-6 lg:p-20 w-full h-screen flex flex-col items-center justify-between gap-6">
      <div className="w-full h-[15%] flex flex-col items-start justify-between">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-xl lg:text-3xl font-bold">
            {data && data.data.name}
          </h1>
          <div className="flex items-center gap-4">
            <button
              onClick={openEdit}
              className="py-2 px-4 bg-blue-500 text-white rounded-lg flex items-center"
            >
              <BiPencil size={24} />
              ویرایش اطلاعات مشتری
            </button>
            <button
              disabled={isDeleting}
              onClick={openDelete}
              className={`py-2 px-4 bg-rose-500 text-white rounded-lg flex items-center ${
                isDeleting && "bg-rose-300"
              }`}
            >
              <MdDelete size={24} />
              {isDeleting ? "در حال حذف" : "حذف مشتری"}
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
            <Tab label="کاربران" defaultTab>
              <div className="w-full space-y-4">
                <div className="w-full">
                  <button
                    onClick={openUser}
                    className="px-4 py-2 bg-blue-500 rounded-lg text-white mb-3"
                  >
                    افزودن کاربر
                  </button>
                </div>
                <EntityTable
                  columns={userColumns}
                  data={usersData}
                  error={usersError}
                  isLoading={usersLoading}
                  onPageChange={() => {}}
                />
              </div>
            </Tab>
            <Tab label="هشدار ها">
              <EntityTable
                columns={alarmColumns}
                data={alarmsData}
                error={alarmsError}
                isLoading={alarmsLoading}
                onPageChange={() => {}}
              />
            </Tab>
            <Tab label="داده های ثبت شده از بازبینی">
              <EntityTable
                columns={auditColumns}
                data={auditsData}
                error={auditsError}
                isLoading={auditsLoading}
                onPageChange={() => {}}
              />
            </Tab>
            <Tab label="رویداد ها">
              <EntityTable
                columns={eventColumns}
                data={eventsData}
                error={eventsError}
                isLoading={eventsLoading}
                onPageChange={() => {}}
              />
            </Tab>
          </Tabs>
        )}
      </div>
      <Popup isOpen={editOpen} onClose={closeEdit}>
        {data && (
          <EditCustomerForm
            customerData={data.data}
            onCustomerUpdated={() => {
              closeEdit();
              refetch();
            }}
          />
        )}
      </Popup>
      <Popup isOpen={deleteOpen} onClose={closeDelete}>
        <DeleteModal
          deleteFunc={deleteCustomer}
          isDeleting={isDeleting}
          onCancel={closeDelete}
        />
      </Popup>

      <Popup isOpen={userOpen} onClose={closeUser}>
        <AddCustomerUserForm
          customerId={customerId}
          onUserAdded={() => {
            closeUser();
            usersRefetch();
          }}
        />
      </Popup>
    </div>
  );
};

export default Customer;
