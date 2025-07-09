"use client";

import Popup from "@/components/Popup";
import React, { useCallback, useState } from "react";
import { BiPlus } from "react-icons/bi";
import AddProfileForm from "../_components/AddProfileForm";
import EditProfileForm from "../_components/EditProfileForm";
import DeleteModal from "@/components/DeleteModal";
import { useDeleteProfile, useTenantProfiles } from "@/hooks/useProfiles";
import { PuffLoader } from "react-spinners";
import { debounce } from "lodash";
import Header from "@/components/Header";
import Table from "@/components/Table";
import { useModal } from "@/hooks/useModal";
import { convertISOToJalali } from "@/utils/convert";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

const Profiles = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [searchText, setSearchText] = useState("");

  const [id, setId] = useState("");
  const [profile, setProfile] = useState<any>({});
  const { data, isLoading, error, refetch } = useTenantProfiles(
    pageSize,
    page,
    searchText
  );

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
    { header: "نام", accessor: "name", type: "string" },
    { header: "توضیحات", accessor: "description", type: "string" },
    {
      header: "زمان ایجاد",
      accessor: (item: any) => convertISOToJalali(item.createdTime),
      type: "string",
    },
  ];

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

  const { mutate: deleteProfile, isPending } = useDeleteProfile(id, () => {
    closeDelete();
    refetch();
  });

  return (
    <div className="w-full h-screen">
      <Header isShowSearch searchFn={onSearchChange} />

      <div className="w-full h-fullp-6 lg:p-12 space-y-6">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-xl lg:text-2xl font-bold">پروفایل ها</h1>
          <button
            onClick={openModal}
            className="py-2 px-4 bg-blue-500 text-white rounded-lg flex items-center"
          >
            <BiPlus size={24} /> افزودن پروفایل جدید
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
            pageSize={pageSize}
            totalItems={data.totalElements}
            currentPage={page + 1}
            onPageChange={(newPage) => setPage(newPage - 1)}
            showActions
            onDelete={(item: any) => {
              setId(item.id);
              openDelete();
            }}
            onEdit={(item: any) => {
              setProfile(item);
              openEdit();
            }}
          />
        )}
      </div>
      <Dialog open={isOpen} onOpenChange={closeModal}>
        <DialogContent className="overflow-y-auto max-h-[80%] max-w-[400px] rounded-md">
          <DialogTitle className="text-lg font-bold mb-2 mt-6">
            افزودن پروفایل سازمان
          </DialogTitle>
          <AddProfileForm
            onProfileAdded={() => {
              closeModal();
              refetch();
            }}
          />
        </DialogContent>
      </Dialog>
      <Dialog open={editOpen} onOpenChange={closeEdit}>
        <DialogContent className="overflow-y-auto max-h-[80%] max-w-[400px] rounded-md">
          <DialogTitle className="text-lg font-bold mb-2 mt-6">
            ویرایش پروفایل سازمان
          </DialogTitle>
          <EditProfileForm
            profileData={profile}
            onProfileEdited={() => {
              closeEdit();
              refetch();
            }}
          />
        </DialogContent>
      </Dialog>
      <Popup isOpen={deleteOpen} onClose={closeDelete}>
        <DeleteModal
          onCancel={closeDelete}
          deleteFunc={() => deleteProfile()}
          isDeleting={isPending}
        />
      </Popup>
    </div>
  );
};

export default Profiles;
