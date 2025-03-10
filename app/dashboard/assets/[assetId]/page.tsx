"use client";

import { Tab, Tabs } from "@/components/Tabs";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { BiPencil } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { PuffLoader } from "react-spinners";
import Popup from "@/components/Popup";
import { useAsset, useDeleteAsset } from "@/hooks/useAssets";
import AssetAudits from "../../_components/AssetAudits";
import AssetAlarms from "../../_components/AssetAlarms";
import AssetEvents from "../../_components/AssetEvents";
import EditAssetForm from "../../_components/EditAssetForm";

interface Params {
  assetId: string;
}

interface PageProps {
  params: React.Usable<Params>;
}

const AssetPage = ({ params }: PageProps) => {
  const router = useRouter();

  const { assetId } = React.use<Params>(params);
  const { data, isLoading, error, refetch } = useAsset(assetId);

  const { mutate: deleteDevice, isPending: isDeleting } = useDeleteAsset(
    assetId,
    () => {
      router.back();
    }
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleMpdal = () => setIsModalOpen(!isModalOpen);

  return (
    <div className="p-6 lg:p-20 w-full h-screen flex flex-col items-center justify-between gap-6">
      <div className="w-full h-[15%] flex flex-col items-start justify-between">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-xl lg:text-3xl font-bold">{data && data.name}</h1>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleMpdal}
              className="py-2 px-4 bg-blue-500 text-white rounded-lg flex items-center"
            >
              <BiPencil size={24} />
              ویرایش اطلاعات دارایی
            </button>
            <button
              disabled={isDeleting}
              onClick={() => deleteDevice()}
              className={`py-2 px-4 bg-rose-500 text-white rounded-lg flex items-center ${
                isDeleting && "bg-rose-300"
              }`}
            >
              <MdDelete size={24} />
              {isDeleting ? "در حال حذف" : "حذف دارایی"}
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
          <Tabs>
            <Tab label="هشدار ها" defaultTab>
              <AssetAlarms assetId={assetId} />
            </Tab>
            <Tab label="داده های ثبت شده از بازبینی">
              <AssetAudits assetId={assetId} />
            </Tab>
            <Tab label="رویداد ها">
              <AssetEvents assetId={assetId} />
            </Tab>
          </Tabs>
        )}
      </div>
      <Popup isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <EditAssetForm
          assetData={data}
          onAssetUpdated={() => {
            setIsModalOpen(false);
            refetch();
          }}
        />
      </Popup>
    </div>
  );
};

export default AssetPage;
