"use client";

import { useUnreadNotifsCount } from "@/hooks/useNotifs";
import React, { useState } from "react";
import { CiBellOn } from "react-icons/ci";
import Popup from "./Popup";
import UnreadNotifsList from "./UnreadNotifsList";

const NotifIcon = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data } = useUnreadNotifsCount();
  return (
    <div>
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

export default NotifIcon;
