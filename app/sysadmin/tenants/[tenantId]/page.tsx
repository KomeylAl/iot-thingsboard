"use client";

import SearchBar from "@/components/SearchBar";
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
  const [tenant, setTenant] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTenantData = async () => {
    try {
      setLoading(true);
      setError(null);

      const tenantResponse = await axios.get(
        `/api/sysadmin/tenants/${tenantId}`
      );
      const tenantData = tenantResponse.data;
      setTenant(tenantData);

      if (tenantData?.tenantProfileId?.id) {
        const profileResponse = await axios.get(
          `/api/sysadmin/tenants/profiles?profileId=${tenantData.tenantProfileId.id}`
        );
        setProfile(profileResponse.data);
      }
    } catch (error) {
      console.error(error);
      setError("خطا در دریافت اطلاعات سازمان");
      toast.error("خطا در دریافت اطلاعات سازمان");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTenantData();
  }, [tenantId]);

  return (
    <div className="p-6 lg:p-20 w-full h-screen flex flex-col items-center justify-between gap-6">
      <div className="w-full h-[15%] flex flex-col items-start justify-between">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-xl lg:text-3xl font-bold">سازمان {tenant && tenant.name}</h1>
          <div className="flex items-center gap-4">
          <button
            onClick={() => {}}
            className="py-2 px-4 bg-blue-500 text-white rounded-lg flex items-center"
          >
            <BiPencil size={24} />ویرایش اطلاعات سازمان
          </button>
          <button
            onClick={() => {}}
            className="py-2 px-4 bg-rose-500 text-white rounded-lg flex items-center"
          >
            <MdDelete size={24} />حذف سازمان
          </button>
          </div>
        </div>
      </div>
      <div className="w-full h-[85%]">
        {loading && (
          <div className="w-full h-full flex items-center justify-center">
            <PuffLoader color="#3b82f6" />
          </div>
        )}
        {error && (
          <div className="w-full h-full flex items-center justify-center">
            <p style={{ color: "red" }}>{error}</p>
          </div>
        )}

        <div className="w-full h-full">

        </div>
      </div>
    </div>
  );
};

export default Tenant;
