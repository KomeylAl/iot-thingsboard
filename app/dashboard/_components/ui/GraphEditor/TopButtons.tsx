import { useModal } from "@/hooks/useModal";
import React from "react";
import { GoPlus } from "react-icons/go";
import { IoCheckmarkOutline, IoHelpSharp } from "react-icons/io5";
import { PuffLoader } from "react-spinners";

const TopButtons = () => {

   const { isOpen: infoOpen, openModal: openInfo, closeModal: closeInfo } = useModal();
   const { isOpen: addOpen, openModal: openAdd, closeModal: closeAdd } = useModal();

  return (
    <div className="w-full flex items-center gap-4 h-20 absolute pr-6">
      <button
        onClick={openInfo}
        className="w-12 h-12 rounded-full flex items-center justify-center z-10 top-2 left-2 bg-blue-500 text-white"
      >
        <IoHelpSharp size={20} />
      </button>

      <button
        onClick={openAdd}
        className="w-12 h-12 rounded-full flex items-center justify-center z-10 top-2 left-2 bg-rose-500 text-white"
      >
        <GoPlus size={20} />
      </button>

      <button
        onClick={handleEditClick}
        disabled={isPending}
        className={`w-12 h-12 rounded-full flex items-center justify-center z-10 top-2 left-2 text-white ${
          isPending ? "cursor-not-allowed bg-amber-300" : "bg-amber-500"
        }`}
      >
        {isPending ? (
          <PuffLoader color="#ffffff" size={30} />
        ) : (
          <IoCheckmarkOutline size={20} />
        )}
      </button>
    </div>
  );
};

export default TopButtons;
