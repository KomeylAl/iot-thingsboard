"use client";

import Popup from "@/components/Popup";
import React, { useCallback, useState } from "react";
import Table from "../../_components/Teble";
import SearchBar from "@/components/SearchBar";
import { BiPlus } from "react-icons/bi";
import { useAssetProfiles, useDeleteAssetsProfile } from "@/hooks/useProfiles";
import { PuffLoader } from "react-spinners";
import EditAssetProfileForm from "../../_components/EditAssetProfileForm";
import DeleteModal from "@/components/DeleteModal";
import AddAssetProfileForm from "../../_components/AddAssetProfileForm";
import { debounce } from "lodash";
import Header from "@/components/Header";

const AssetProfiles = () => {
  const [searchText, setSearchText] = useState("");
  const { data, isLoading, error, refetch } = useAssetProfiles(10, 0, searchText);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [id, setId] = useState("");
  const [profile, setProfile] = useState<any>({});
  const toggleMpdal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const { mutate: deleteProfile, isPending } = useDeleteAssetsProfile(
    id,
    () => {
      setIsDeleteModalOpen(false);
      refetch();
    }
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
    { header: "نام", accessor: "name" },
    { header: "توضیحات", accessor: "description" },
    { header: "زمان ایجاد", accessor: "createdTime" },
    { header: "ویرایش", accessor: "editButton", type: "editButton" },
    { header: "حذف", accessor: "deleteButton", type: "deleteButton" },
  ];

  return (
    <div className="p-6 lg:p-20 w-full h-screen flex flex-col items-center justify-between gap-6">
      <div className="w-full h-[15%] flex flex-col items-start justify-between">
        <Header title="پروفایل دارایی ها" isShowSearch searchFn={onSearchChange}/>
        <div className="flex items-center justify-end w-full">
          <button
            onClick={toggleMpdal}
            className="py-2 px-4 bg-blue-500 text-white rounded-lg flex items-center"
          >
            <BiPlus size={24} /> افزودن پروفایل جدید
          </button>
        </div>
      </div>
      <div className="w-full h-[85%]">
        {error && (
          <div className="w-full h-full flex items-center justify-center">
            <p style={{ color: "red" }}>خطا در دریافت اطلاعات پروفایل ها</p>
          </div>
        )}

        {isLoading && (
          <div className="w-full h-full flex items-center justify-center">
            <PuffLoader color="#3b82f6" />
          </div>
        )}

        {data && (
          <Table
            columns={columns}
            data={data.data}
            RPP={10}
            clickableRows={false}
            getRowLink={(row: any) => `/sysadmin/profiles/${row.id.id}`}
            onDeleteClicked={(row: any) => {
              setId(row.id.id);
              setIsDeleteModalOpen(true);
            }}
            onEditClicked={(row: any) => {
              setProfile(row);
              setIsEditModalOpen(true);
            }}
          />
        )}
      </div>
      <Popup isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AddAssetProfileForm
          onProfileEdited={() => {
            setIsModalOpen(false);
            refetch();
          }}
        />
      </Popup>
      <Popup isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <EditAssetProfileForm
          profileData={profile}
          onProfileEdited={() => setIsEditModalOpen(false)}
        />
      </Popup>
      <Popup
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      >
        <DeleteModal
          onCancel={() => setIsDeleteModalOpen(false)}
          deleteFunc={() => deleteProfile()}
          isDeleting={isPending}
        />
      </Popup>
    </div>
  );
};

export default AssetProfiles;
