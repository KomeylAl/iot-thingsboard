"use client";

import React, { useState } from "react";
import { CiBellOn } from "react-icons/ci";
import SearchBar from "./SearchBar";
import Popup from "./Popup";
import { useUnreadNotifsCount } from "@/hooks/useNotifs";
import UnreadNotifsList from "./UnreadNotifsList";
import NotifIcon from "./NotifIcon";

interface HeaderProps {
  title: string;
  isShowSearch: boolean;
  searchFn: (e: any) => void;
}

const Header = ({ title, isShowSearch, searchFn }: HeaderProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data } = useUnreadNotifsCount();

  return (
    <div className="w-full flex items-center justify-between">
      <div className="w-full flex items-center gap-4">
        <h1 className="text-xl lg:text-3xl font-bold">{title}</h1>
        {isShowSearch && <SearchBar onChange={searchFn}/>}
      </div>
      <NotifIcon />
    </div>
  );
};

export default Header;
