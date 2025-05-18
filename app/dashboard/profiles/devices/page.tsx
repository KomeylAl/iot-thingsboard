"use client";

import React, { useCallback, useState } from "react";
import Table from "@/components/Table";
import SearchBar from "@/components/SearchBar";
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
  const [searchText, setSearchText] = useState("");
  const { data, isLoading, error, refetch } = useDeviceProfiles(
    10,
    0,
    searchText
  );

  const [deviceId, setDeviceId] = useState<string>("");
  const [profile, setProfile] = useState<any>({});

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleMpdal = () => setIsModalOpen(!isModalOpen);

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
    { header: "زمان ایجاد", accessor: (item: any) => convertISOToJalali(item.createdTime) },
  ];

  console.log(data);

  const { mutate: deleteDevice, isPending: isDeleting } =
    useDeleteDevicesProfile(() => {
      closeDelete();
      refetch();
    });

  return (
    <div className="p-6 lg:p-20 w-full h-screen flex flex-col items-center gap-6">
      <div className="w-full h-[15%] flex flex-col items-start justify-between">
        <Header
          title="پروفایل دستگاه ها"
          isShowSearch
          searchFn={onSearchChange}
        />
        <div className="flex items-center justify-end w-full">
          <button
            onClick={toggleMpdal}
            className="py-2 px-4 bg-blue-500 text-white rounded-lg flex items-center"
          >
            <BiPlus size={24} /> افزودن پروفایل جدید
          </button>
        </div>
      </div>

      {error && <p>خطا در دریافت اطلاعات پروفایل ها</p>}

      {isLoading && (
        <div className="w-full h-full flex items-center justify-center">
          <PuffLoader color="#3b82f6" />
        </div>
      )}

      {/* {!data && !isLoading && <p>پروفایلی برای نمایش وجود ندارد!</p>} */}

      {data && (
        // <div className="w-full h-[85%]">
        //   <Table
        //     columns={columns}
        //     data={data.data}
        //     RPP={10}
        //     clickableRows={false}
        //     getRowLink={(row: any) => ``}
        //     onDeleteClicked={(row: any) => {
        //       setDeviceId(row.id.id);
        //       openDelete();
        //     }}
        //     onEditClicked={(row: any) => {
        //       setProfile(row);
        //       openEdit();
        //     }}
        //   />
        // </div>
        <Table 
          columns={columns}
          data={data.data}
          showActions
          onDelete={(item: any) => {
            setDeviceId(item.id.id);
            openDelete();
          }}
        />
      )}

      <Popup isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AddDeviceProfileForm
          onProfileAdded={() => {
            setIsModalOpen(false);
            refetch();
          }}
        />
      </Popup>

      <Popup isOpen={deleteOpen} onClose={closeDelete}>
        <DeleteModal
          deleteFunc={() => deleteDevice(deviceId)}
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
