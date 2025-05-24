"use client";

import { Tab, Tabs } from "@/components/Tabs";
import UnreadNotifs from "@/app/sysadmin/_components/UnreadNotifs";
import AllNotifs from "@/app/sysadmin/_components/AllNotis";
import NotifRecipients from "@/app/sysadmin/_components/NotifRecipients";
import Header from "@/components/Header";

const Notifications = () => {
  return (
    <div className="w-full h-screen">
      <Header isShowSearch={false} searchFn={() => {}} />

      <div className="w-full h-fullp-6 lg:p-12 space-y-6">
        <h1 className="text-xl lg:text-2xl font-bold">اعلانات</h1>
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
    </div>
  );
};

export default Notifications;
