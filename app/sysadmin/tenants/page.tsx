"use client";

import Table from "@/app/dashboard/_components/Teble";
import Popup from "@/components/Popup";
import SearchBar from "@/components/SearchBar";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiPlus } from "react-icons/bi";

const columns = [
  { header: "نام", accessor: "name" },
  { header: "ایمیل", accessor: "email" },
  { header: "تلفن", accessor: "phone" },
  { header: "شهر", accessor: "state" },
];

const Tenants = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleMpdal = () => setIsModalOpen(!isModalOpen);
  const [isLoading, setIsLoading] = useState(false);
  const [tenants, setTenants] = useState([]);
  const [tenantsPageInfo, setTenantsPageInfo] = useState({
    totalPages: 0,
    totalElements: 0,
    hasNext: false,
  });

  const fetchTenants = async () => {
    setIsLoading(true);
    await axios
      .get("/api/sysadmin/tenants", {
        params: {
          pageSize: 10,
          page: 0,
        },
      })
      .then(function (response) {
        const data = response.data;
        setTenants(data.data);
        console.log(data);
        setTenantsPageInfo({
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
    fetchTenants();
  }, []);

  return (
    <div className="p-6 lg:p-20 w-full h-screen flex flex-col items-center justify-between gap-6">
      <div className="w-full h-[15%] flex flex-col items-start justify-between">
        <SearchBar />
        <div className="flex items-center justify-between w-full">
          <h1 className="text-xl lg:text-3xl font-bold">سازمان ها</h1>
          <button
            onClick={toggleMpdal}
            className="py-2 px-4 bg-blue-500 text-white rounded-lg flex items-center"
          >
            <BiPlus size={24} /> افزودن سازمان جدید
          </button>
        </div>
      </div>
      <div className="w-full h-[85%]">
        <Table columns={columns} data={tenants} RPP={10} getRowLink={(row: any) => `/sysadmin/tenants/${row.id.id}`} />
      </div>
      <Popup isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {/* <AddDevice
       onDeviceAdded={() => {
         setIsModalOpen(false);
         fetchDevices();
       }}
     /> */}
        <div></div>
      </Popup>
    </div>
  );
};

export default Tenants;
