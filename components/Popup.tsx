import React from "react";
import { CgClose } from "react-icons/cg";

interface PopupProps {
  isOpen: boolean;
  children: React.ReactNode;
  onClose: () => void;
}

const Popup = ({ isOpen, children, onClose }: PopupProps) => {
  return (
    <div
      className={`w-full h-screen fixed top-0 right-0 flex items-center justify-center bg-black bg-opacity-90 ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      } transition-all duration-500 ease-in-out overflow-y-auto py-6 z-[500]`}
    >
      <CgClose
        size={25}
        className="text-white top-10 right-10 fixed cursor-pointer z-[510]"
        onClick={onClose}
      />
      <div
        className={`max-h-screen p-8 bg-white dark:bg-gray-700 no-scrollbar rounded-lg transform ${
          isOpen ? "scale-100" : "scale-95"
        } transition-all duration-300 ease-in-out overflow-y-scroll`}
      >
        {children}
      </div>
    </div>
  );
};

export default Popup;
