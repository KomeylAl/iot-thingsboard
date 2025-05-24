"use client";

import Popup from "@/components/Popup";
import { useDeleteRuleChain, useRuleChains } from "@/hooks/useRuleChains";
import React, { useCallback, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { PuffLoader } from "react-spinners";
import AddRuleChainForm from "../_components/AddRuleChainForm";
import DeleteModal from "@/components/DeleteModal";
import EditRuleChainForm from "../_components/EditRuleChainForm";
import { debounce } from "lodash";
import Header from "@/components/Header";
import { useModal } from "@/hooks/useModal";
import { convertISOToJalali } from "@/utils/convert";
import Table from "@/components/Table";

const RuleChains = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [searchText, setSearchText] = useState("");

  const { data, isLoading, error, refetch } = useRuleChains(
    page,
    pageSize,
    searchText
  );
  const [id, setId] = useState("");
  const [ruleChain, setRuleChain] = useState<any>({});

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

  const { mutate: deleteRuleChain, isPending } = useDeleteRuleChain(() => {
    closeDelete();
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
    { header: "نوع", accessor: "type" },
    {
      header: "زمان ایجاد",
      accessor: (item: any) => convertISOToJalali(item.createdTime),
    },
  ];

  return (
    <div className="w-full h-screen">
      <Header isShowSearch searchFn={onSearchChange} />

      <div className="w-full h-fullp-6 lg:p-12 space-y-6">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-xl lg:text-2xl font-bold">زنجیره های قواعد</h1>
          <button
            onClick={openModal}
            className="py-2 px-4 bg-blue-500 text-white rounded-lg flex items-center"
          >
            <BiPlus size={24} /> افزودن زنجیره جدید
          </button>
        </div>

        {error && <p>خطا در دریافت اطلاعات </p>}

        {isLoading && (
          <div className="w-full h-full flex items-center justify-center">
            <PuffLoader color="#3b82f6" />
          </div>
        )}

        {data && (
          <Table
            columns={columns}
            data={data.data}
            pageSize={page}
            totalItems={data.totalElements}
            currentPage={page + 1}
            onPageChange={(newPage) => setPage(newPage - 1)}
            showActions
            onEdit={(item: any) => {
              setRuleChain(item);
              openEdit();
            }}
            onDelete={(item: any) => {
              setId(item.id.id);
              openDelete();
            }}
          />
        )}
      </div>

      <Popup isOpen={isOpen} onClose={openModal}>
        <AddRuleChainForm
          onRuleChainAdded={() => {
            closeModal();
            refetch();
          }}
        />
      </Popup>

      <Popup isOpen={deleteOpen} onClose={closeDelete}>
        <DeleteModal
          deleteFunc={() => deleteRuleChain(id)}
          isDeleting={isPending}
          onCancel={closeDelete}
        />
      </Popup>

      <Popup isOpen={editOpen} onClose={closeEdit}>
        <EditRuleChainForm
          ruleChainData={ruleChain}
          onRuleChainUpdated={() => {
            closeEdit();
            refetch();
          }}
        />
      </Popup>
    </div>
  );
};

export default RuleChains;
