"use client";

import Popup from "@/components/Popup";
import React, { useState } from "react";
import { BiPlus } from "react-icons/bi";
import AddPlan from "../_components/AddPlan";
import { PuffLoader } from "react-spinners";
import Image from "next/image";
import { MdDelete, MdSend } from "react-icons/md";
import DeletePlan from "../_components/DeletePlan";
import { usePlans } from "@/hooks/usePlans";
import { Tab, Tabs } from "@/components/Tabs";

const Notifications = () => {

  const { data, isLoading, error, refetch} = usePlans();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleMpdal = () => setIsModalOpen(!isModalOpen);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const toggleDeleteMpdal = () => setIsDeleteModalOpen(!isDeleteModalOpen);

  const [planId, setPlanId] = useState(0);

  return (
    <div className="p-6 lg:p-20 w-full h-screen flex flex-col items-center justify-between gap-6">
      <div className="w-full h-[15%] flex flex-col items-start justify-between">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-xl lg:text-3xl font-bold">اعلانات</h1>
          <button
            onClick={toggleMpdal}
            className="py-2 px-4 bg-blue-500 text-white rounded-lg flex items-center gap-3"
          >
            ارسال اعلان<MdSend className="rotate-180" size={24} />
          </button>
        </div>
      </div>
      <div className="w-full h-[85%]">
        <Tabs>
          <Tab label="ورودی" defaultTab>
            <div></div>
          </Tab>
          <Tab label="ارسال شده">
            <div></div>
          </Tab>
          <Tab label="'گیرندگان'">
            <div></div>
          </Tab>
        </Tabs>
      </div>
      <Popup isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AddPlan
          onPlanAdded={() => {
            setIsModalOpen(false);
            refetch();
          }}
        />
      </Popup>
      <Popup
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      >
        <DeletePlan
          id={planId}
          onCanceled={() => setIsDeleteModalOpen(false)}
          onPlanDeleted={() => {
            setIsDeleteModalOpen(false);
            refetch();
          }}
        />
      </Popup>
    </div>
  );
};

export default Notifications;
