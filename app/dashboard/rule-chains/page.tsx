"use client";

import Popup from "@/components/Popup";
import SearchBar from "@/components/SearchBar";
import { useDeleteRuleChain, useRuleChains } from "@/hooks/useRuleChains";
import React, { useState } from "react";
import { BiPlus } from "react-icons/bi";
import { PuffLoader } from "react-spinners";
import Table from "../_components/Teble";
import AddRuleChainForm from "../_components/AddRuleChainForm";
import DeleteModal from "@/components/DeleteModal";
import EditRuleChainForm from "../_components/EditRuleChainForm";

const RuleChains = () => {
  const { data, isLoading, error, refetch } = useRuleChains(10, 0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleMpdal = () => setIsModalOpen(!isModalOpen);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [id, setId] = useState("");
  const [ruleChain, setRuleChain] = useState<any>({});

  const { mutate: deleteRuleChain, isPending } = useDeleteRuleChain(id, () => {
    setIsDeleteModalOpen(false);
    refetch();
  });

  const columns = [
    { header: "نام", accessor: "name" },
    { header: "نوع", accessor: "type" },
    { header: "تاریخ ایجاد", accessor: "createdTime" },
    { header: "ویرایش", accessor: "", type: "editButton" },
    { header: "حذف", accessor: "", type: "deleteButton" },
  ];

  return (
    <div className="p-6 lg:p-20 w-full h-screen flex flex-col items-center justify-between gap-6">
      <div className="w-full h-[15%] flex flex-col items-start justify-between">
        <SearchBar />
        <div className="flex items-center justify-between w-full">
          <h1 className="text-xl lg:text-3xl font-bold">زنجیره قواعد</h1>
          <button
            onClick={toggleMpdal}
            className="py-2 px-4 bg-blue-500 text-white rounded-lg flex items-center"
          >
            <BiPlus size={24} /> افزودن زنجیره جدید
          </button>
        </div>
      </div>

      {error && <p>خطا در دریافت اطلاعات زنجیره ها</p>}

      {isLoading && (
        <div className="w-full h-full flex items-center justify-center">
          <PuffLoader color="#3b82f6" />
        </div>
      )}

      {!data && !isLoading && <p>زنجیره ای برای نمایش وجود ندارد!</p>}

      {data && (
        <div className="w-full h-[85%]">
          <Table
            columns={columns}
            data={data.data}
            RPP={10}
            clickableRows={false}
            getRowLink={() => ""}
            onDeleteClicked={(row: any) => {
              setId(row.id.id);
              setIsDeleteModalOpen(true);
            }}
            onEditClicked={(row: any) => {
              setRuleChain(row);
              setIsEditModalOpen(true);
            }}
          />
        </div>
      )}

      <Popup isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AddRuleChainForm
          onRuleChainAdded={() => {
            setIsModalOpen(false);
            refetch();
          }}
        />
      </Popup>

      <Popup isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <EditRuleChainForm
          ruleChainData={ruleChain}
          onRuleChainUpdated={() => {
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
          deleteFunc={() => deleteRuleChain()}
          isDeleting={isPending}
        />
      </Popup>
    </div>
  );
};

export default RuleChains;
