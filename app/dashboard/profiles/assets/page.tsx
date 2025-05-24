"use client";

import Popup from "@/components/Popup";
import React, { useCallback, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { useAssetProfiles, useDeleteAssetsProfile } from "@/hooks/useProfiles";
import { PuffLoader } from "react-spinners";
import EditAssetProfileForm from "../../_components/EditAssetProfileForm";
import DeleteModal from "@/components/DeleteModal";
import AddAssetProfileForm from "../../_components/AddAssetProfileForm";
import { debounce } from "lodash";
import Header from "@/components/Header";
import { convertISOToJalali } from "@/utils/convert";
import { useModal } from "@/hooks/useModal";
import Table from "@/components/Table";

const AssetProfiles = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [searchText, setSearchText] = useState("");

  const { data, isLoading, error, refetch } = useAssetProfiles(
    page,
    pageSize,
    searchText
  );

  const [profileId, setProfileId] = useState<string>("");
  const [profile, setProfile] = useState<any>({});

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
    { header: "توضیحات", accessor: "description" },
    {
      header: "زمان ایجاد",
      accessor: (item: any) => convertISOToJalali(item.createdTime),
    },
  ];

  const { mutate: deleteProfile, isPending: isDeleting } =
    useDeleteAssetsProfile(() => {
      closeDelete();
      refetch();
    });

  return (
    <div className="w-full h-screen">
      <Header isShowSearch searchFn={onSearchChange} />

      <div className="w-full h-fullp-6 lg:p-12 space-y-6">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-xl lg:text-2xl font-bold">پروفایل دارایی ها</h1>
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
            pageSize={page}
            totalItems={data.totalElements}
            currentPage={page + 1}
            onPageChange={(newPage) => setPage(newPage - 1)}
            showActions
            onEdit={(item: any) => {
              setProfile(item);
              openEdit();
            }}
            onDelete={(item: any) => {
              setProfileId(item.id.id);
              openDelete();
            }}
          />
        )}
      </div>

      <Popup isOpen={isOpen} onClose={openModal}>
        <AddAssetProfileForm
          onProfileAdded={() => {
            closeModal();
            refetch();
          }}
        />
      </Popup>

      <Popup isOpen={deleteOpen} onClose={closeDelete}>
        <DeleteModal
          deleteFunc={() => deleteProfile(profileId)}
          isDeleting={isDeleting}
          onCancel={closeDelete}
        />
      </Popup>

      <Popup isOpen={editOpen} onClose={closeEdit}>
        <EditAssetProfileForm
          profileData={profile}
          onProfileEdited={() => {
            closeEdit();
            refetch();
          }}
        />
      </Popup>
    </div>
  );
};

export default AssetProfiles;
