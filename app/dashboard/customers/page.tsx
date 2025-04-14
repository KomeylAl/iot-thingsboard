"use client";

import Popup from "@/components/Popup";
import SearchBar from "@/components/SearchBar";
import React, { useCallback, useState } from "react";
import { BiPlus } from "react-icons/bi";
import Table from "@/app/dashboard/_components/Teble";
import { PuffLoader } from "react-spinners";
import { useCustomers, useDeleteCustomer } from "@/hooks/useCustomers";
import AddCustomerForm from "../_components/AddCustomerForm";
import DeleteModal from "@/components/DeleteModal";
import EditCustomerForm from "../_components/EditCustomerForm";
import { debounce } from "lodash";
import Header from "@/components/Header";

const Customers = () => {
  const [searchText, setSearchText] = useState("");
  const { data, isLoading, error, refetch } = useCustomers(10, 0, searchText);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleMpdal = () => setIsModalOpen(!isModalOpen);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [id, setId] = useState("");
  const [customer, setCustomer] = useState<any>({});

  const { mutate: deleteCustomer, isPending } = useDeleteCustomer(id, () => {
    setIsDeleteModalOpen(false);
    refetch();
  });

  const debouncedSearch = useCallback(
    debounce((text) => {
      refetch();
    }, 300),
    [refetch]
  );

  const onSearchChange = (e: any) => {
    setSearchText(e.target.value);
    debouncedSearch(e.target.value);
  };

  const columns = [
    { header: "نام", accessor: "name" },
    { header: "ایمیل", accessor: "email" },
    { header: "زمان ایجاد", accessor: "createdTime" },
    { header: "ویرایش", accessor: "", type: "editButton" },
    { header: "حذف", accessor: "", type: "deleteButton" },
  ];

  return (
    <div className="p-6 lg:p-20 w-full h-screen flex flex-col items-center justify-between gap-6">
      <div className="w-full h-[15%] flex flex-col items-start justify-between">
        <Header title="مشتریان" isShowSearch searchFn={onSearchChange}/>
        <div className="flex items-center justify-end w-full">
          <button
            onClick={toggleMpdal}
            className="py-2 px-4 bg-blue-500 text-white rounded-lg flex items-center"
          >
            <BiPlus size={24} /> افزودن مشتری جدید
          </button>
        </div>
      </div>

      {error && (
        <div className="w-full h-full flex items-center justify-center">
          <p>خطا در دریافت اطلاعات مشتری ها</p>
        </div>
      )}

      {isLoading && (
        <div className="w-full h-full flex items-center justify-center">
          <PuffLoader color="#3b82f6" />
        </div>
      )}

      {!data && !isLoading && !error && (
        <div className="w-full h-full flex items-center justify-center">
          <p>مشتری ای برای نمایش وجود ندارد!</p>
        </div>
      )}

      {data && (
        <div className="w-full h-[85%]">
          <Table
            columns={columns}
            data={data.data}
            RPP={10}
            clickableRows={false}
            getRowLink={(row: any) => ``}
            onDeleteClicked={(row: any) => {
              setId(row.id.id);
              setIsDeleteModalOpen(true);
            }}
            onEditClicked={(row: any) => {
              setCustomer(row);
              setIsEditModalOpen(true);
            }}
          />
        </div>
      )}

      <Popup isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AddCustomerForm
          onCustomerAdded={() => {
            setIsModalOpen(false);
            refetch();
          }}
        />
      </Popup>
      <Popup isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <EditCustomerForm
          customerData={customer}
          onCustomerUpdated={() => {
            setIsEditModalOpen(false);
            refetch();
          }}
        />
      </Popup>
      <Popup
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      >
        <DeleteModal
          onCancel={() => setIsDeleteModalOpen(false)}
          deleteFunc={() => deleteCustomer()}
          isDeleting={isPending}
        />
      </Popup>
    </div>
  );
};

export default Customers;
