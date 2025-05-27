"use client";

import React, { useState } from "react";
import { BiArrowToRight, BiMenu } from "react-icons/bi";
import Image from "next/image";
import { useUser } from "@/context/UserContext";
import TenantNavBar from "./TenantNavBar";
import AdminNavBar from "./AdminNavBar";

const SideBar = () => {
  const { user } = useUser();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="">
      <div className="fixed top-7 right-7 z-0 p-2 bg-white dark:bg-gray-900 rounded-md flex items-center">
        <button onClick={toggleMenu} className="text-center p-0">
          <BiMenu size={30} />
        </button>
      </div>
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
        {user &&
          (user.authority === "TENANT_ADMIN" ? (
            <TenantNavBar />
          ) : user.authority === "SYS_ADMIN" ? (
            <AdminNavBar />
          ) : (
            <div></div>
          ))}
      </div>
      <div
        className={`fixed inset-0 overflow-y-auto z-10 lg:hidden h-screen w-56 bg-white dark:bg-gray-900 flex flex-col items-center justify-center gap-10 transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="fixed top-10 right-10 z-10">
          <button onClick={toggleMenu}>
            <BiArrowToRight size={30} />
          </button>
        </div>
        <div className="flex flex-col items-center justify-center">
          <Image
            src="/images/lotos.png"
            alt="lotos"
            width={100}
            height={100}
            className="w-12"
          />
        </div>
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
  );
};

export default SideBar;
