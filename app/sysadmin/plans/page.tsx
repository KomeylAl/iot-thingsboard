"use client";

import Popup from "@/components/Popup";
import React, { useState } from "react";
import { BiPlus } from "react-icons/bi";
import AddPlan from "../_components/AddPlan";
import { PuffLoader } from "react-spinners";
import Image from "next/image";
import { MdDelete } from "react-icons/md";
import DeletePlan from "../_components/DeletePlan";
import { usePlans } from "@/hooks/usePlans";

const Plans = () => {

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
          <h1 className="text-xl lg:text-3xl font-bold">پلن ها</h1>
          <button
            onClick={toggleMpdal}
            className="py-2 px-4 bg-blue-500 text-white rounded-lg flex items-center"
          >
            <BiPlus size={24} /> افزودن پلن جدید
          </button>
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

        <div className="w-full h-full">
          {data && (
            <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-4">
              {data.map((plan: any, index: any) => (
                <div
                  key={plan.id}
                  className="w-full relative overflow-hidden bg-white rounded-lg flex items-center justify-between p-4"
                >
                  <div
                    className={`absolute top-1 lg:top-6 left-5 w-20 h-20 ${
                      index % 2 === 0 ? "bg-sky-500" : "bg-amber-500"
                    } rounded-full filter blur-2xl`}
                  />
                  <div className="">
                    <p className="text-lg">پلن {plan.name}</p>
                    <div className="flex items-center gap-3 mt-3">
                      <button
                        onClick={() => {
                          setPlanId(plan.id);
                          toggleDeleteMpdal();
                        }}
                      >
                        <MdDelete className="text-rose-500" size={20} />
                      </button>
                    </div>
                  </div>
                  <Image
                    src="/images/device_vector.png"
                    alt="devices"
                    width={100}
                    height={100}
                    className="w-24 h-24 object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
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

export default Plans;
