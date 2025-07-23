"use client";

import Image from "next/image";
import { useUser } from "@/context/UserContext";
import TenantNavBar from "./TenantNavBar";
import AdminNavBar from "./AdminNavBar";

const SideBar = () => {
  const { user } = useUser();
  return (
    <div className="">
      <div className="w-56 h-screen overflow-y-auto no-scrollbar bg-white dark:bg-gray-900 border-l border-gray-300 dark:border-gray-700 hidden lg:flex flex-col items-center gap-6 fixed py-10">
        <div className="w-full flex items-center justify-start pr-7">
          <Image
            src="/images/lotos.png"
            alt="lotos"
            width={100}
            height={100}
            className="w-16"
          />
        </div>
        <div>
          {user &&
            (user.authority === "TENANT_ADMIN" ? (
              <TenantNavBar />
            ) : user.authority === "SYS_ADMIN" ? (
              <AdminNavBar />
            ) : (
              <div></div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
