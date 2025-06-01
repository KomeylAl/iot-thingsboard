"use client";

import React, { useCallback, useState } from "react";
import Table from "@/components/Table";
import { BiPlus } from "react-icons/bi";
import {
  useDeleteDevicesProfile,
  useDeviceProfiles,
} from "@/hooks/useProfiles";
import { PuffLoader } from "react-spinners";
import Popup from "@/components/Popup";
import AddDeviceProfileForm from "../../_components/AddDeviceProfileForm";
import { debounce } from "lodash";
import Header from "@/components/Header";
import { useModal } from "@/hooks/useModal";
import DeleteModal from "@/components/DeleteModal";
import EditDeviceProfileForm from "../../_components/EditDeviceProfileForm";
import { convertISOToJalali } from "@/utils/convert";

const DeviceProfiles = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [searchText, setSearchText] = useState("");

  const { data, isLoading, error, refetch } = useDeviceProfiles(
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
    useDeleteDevicesProfile(() => {
      closeDelete();
      refetch();
    });

  return (
    <div className="w-full h-screen">
      <Header isShowSearch searchFn={onSearchChange} />

      <div className="w-full h-fullp-6 lg:p-12 space-y-6">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-xl lg:text-2xl font-bold">پروفایل دستگاه ها</h1>
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

      <Popup isOpen={isOpen} onClose={closeModal}>
        <AddDeviceProfileForm
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
        <EditDeviceProfileForm
          profileData={profile}
          onProfileEditted={() => {
            closeEdit();
            refetch();
          }}
        />
      </Popup>
    </div>
  );
};

export default DeviceProfiles;
