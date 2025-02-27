'use client';

import Table from "@/app/dashboard/_components/Teble";
import Popup from "@/components/Popup";
import SearchBar from "@/components/SearchBar";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiPlus } from "react-icons/bi";
import AddProfileForm from "../_components/AddProfileForm";

const columns = [
  { header: "نام", accessor: "name", type: "string" },
  { header: "توضیحات", accessor: "description", type: "string" },
  { header: "زمان ایجاد", accessor: "createdTime", type: "string" },
  { header: "ویرایش", accessor: "", type: "editButton" },
  { header: "حذف", accessor: "", type: "deleteButton" },
];

const Profiles = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleMpdal = () => setIsModalOpen(!isModalOpen);
  const [isLoading, setIsLoading] = useState(false);
  const [profiles, setProfiles] = useState([]);
  const [profilesPageInfo, setProfilesPageInfo] = useState({
    totalPages: 0,
    totalElements: 0,
    hasNext: false,
  });

  const fetchProfiles = async () => {
    setIsLoading(true);
    await axios
      .get("/api/sysadmin/tenants/profiles", {
        params: {
          pageSize: 10,
          page: 0,
        },
      })
      .then(function (response) {
        const data = response.data;
        setProfiles(data.data);
        console.log(data);
        setProfilesPageInfo({
          totalPages: data.totalPages,
          totalElements: data.totalElements,
          hasNext: data.hasNext,
        });
      })
      .catch(function (error) {
        if (error.status === 500) {
          toast.error("خطا در برقراری ارتباط");
        }
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  return (
    <div className="p-6 lg:p-20 w-full h-screen flex flex-col items-center justify-between gap-6">
      <div className="w-full h-[15%] flex flex-col items-start justify-between">
        <SearchBar />
        <div className="flex items-center justify-between w-full">
          <h1 className="text-xl lg:text-3xl font-bold">پروفایل سازمان ها</h1>
          <button
            onClick={toggleMpdal}
            className="py-2 px-4 bg-blue-500 text-white rounded-lg flex items-center"
          >
            <BiPlus size={24} /> افزودن پروفایل جدید
          </button>
        </div>
      </div>
      <div className="w-full h-[85%]">
        <Table
          columns={columns}
          data={profiles}
          RPP={10}
          clickableRows={false}
          getRowLink={(row: any) => `/sysadmin/profiles/${row.id.id}`}
        />
      </div>
      <Popup isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AddProfileForm
          onProfileAdded={() => {
            setIsModalOpen(false);
            fetchProfiles();
          }}
        />
        <div></div>
      </Popup>
    </div>
  );
};

export default Profiles;
