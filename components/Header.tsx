"use client";

import React, { useState } from "react";
import { CiBellOn } from "react-icons/ci";
import SearchBar from "./SearchBar";
import Popup from "./Popup";
import { useUnreadNotifsCount } from "@/hooks/useNotifs";
import UnreadNotifsList from "./UnreadNotifsList";

interface HeaderProps {
  title: string;
  isShowSearch: boolean;
}

const Header = ({ title, isShowSearch }: HeaderProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data } = useUnreadNotifsCount();

  if (data) {
    console.log("notifs" + data)
  }

  return (
    <div className="w-full flex items-center justify-between">
      <div className="w-full flex items-center gap-4">
        <h1 className="text-xl lg:text-3xl font-bold">{title}</h1>
        {isShowSearch && <SearchBar />}
      </div>
      <div
        className="w-fit h-fit relative cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        {data !== 0 && (
            <div className="w-1 h-1 p-1 rounded-full bg-rose-500 text-white absolute top-0 right-0 text-[10px]" />
        )}
        <CiBellOn size={35} />
      </div>
      <Popup isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <UnreadNotifsList />
      </Popup>
    </div>
  );
};

export default Header;
