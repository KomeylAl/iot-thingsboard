"use client";

import Popup from "@/components/Popup";
import React, { useState } from "react";
import { Tab, Tabs } from "@/components/Tabs";
import UnreadNotifs from "../_components/UnreadNotifs";
import AllNotifs from "../_components/AllNotis";
import NotifRecipients from "../_components/NotifRecipients";

const Notifications = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleMpdal = () => setIsModalOpen(!isModalOpen);

  return (
    <div className="p-6 lg:p-20 w-full h-screen flex flex-col items-center justify-between gap-6">
      <div className="w-full h-[15%] flex flex-col items-start justify-between">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-xl lg:text-3xl font-bold">اعلانات</h1>
        </div>
      </div>
      <div className="w-full h-[85%]">
        <Tabs>
          <Tab label="خوانده نشده" defaultTab>
            <UnreadNotifs />
          </Tab>
          <Tab label="همه">
            <AllNotifs />
          </Tab>
          <Tab label="گیرندگان">
            <NotifRecipients />
          </Tab>
        </Tabs>
      </div>
      <Popup isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div></div>
      </Popup>
    </div>
  );
};

export default Notifications;
