"use client";

import SearchBar from "@/components/SearchBar";
import { useTenantDevices } from "@/hooks/useDevices";
import { useTenant } from "@/hooks/useTenants";
import axios from "axios";
import React, { useEffect, useState } from "react";
import * as react from "react";
import toast from "react-hot-toast";
import { BiPencil } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { PuffLoader, PulseLoader } from "react-spinners";

interface Params {
  tenantId: string;
}

interface PageProps {
  params: react.Usable<Params>;
}

const Tenant = ({ params }: PageProps) => {
  const { tenantId } = react.use<Params>(params);
  const { data, isLoading, error, refetch } = useTenant(tenantId);
  const {
    data: devicesData,
    isLoading: isDevicesLoading,
    error: devicesError,
    refetch: devicesRefetch,
  } = useTenantDevices(tenantId, 10, 0);

  return (
    <div className="p-6 lg:p-20 w-full h-screen flex flex-col items-center justify-between gap-6">
      <div className="w-full h-[15%] flex flex-col items-start justify-between">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-xl lg:text-3xl font-bold">
            سازمان {data && data.name}
          </h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => {}}
              className="py-2 px-4 bg-blue-500 text-white rounded-lg flex items-center"
            >
              <BiPencil size={24} />
              ویرایش اطلاعات سازمان
            </button>
            <button
              onClick={() => {}}
              className="py-2 px-4 bg-rose-500 text-white rounded-lg flex items-center"
            >
              <MdDelete size={24} />
              حذف سازمان
            </button>
          </div>
        </div>
      </div>
      <div className="w-full h-[85%]">
        {isLoading && (
          <div className="w-full h-full flex items-center justify-center">
            <PuffLoader color="#3b82f6" />
          </div>
        )}
        {error && (
          <div className="w-full h-full flex items-center justify-center">
            <p style={{ color: "red" }}>{error.message}</p>
          </div>
        )}

        {data && (
          <div className="w-full h-full flex-1 items-center">
            <div className="w-full h-full bg-white rounded-md p-6">
              {devicesData.data.map((devices: any) => (
                <div>{devices.name}</div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tenant;
