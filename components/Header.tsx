"use client";

import Input from "./ui/custom/Input";
import { CgMenuRightAlt } from "react-icons/cg";
import UserDropdown from "./UserDropDown";
import NotificationDropdown from "./NotificationDropDown";
import { ThemeToggleButton } from "./ThemeToggleButton";
import { useUser } from "@/context/UserContext";
import { useState } from "react";
import Image from "next/image";
import TenantNavBar from "./TenantNavBar";
import AdminNavBar from "./AdminNavBar";
import { BiArrowToRight } from "react-icons/bi";

interface HeaderProps {
  title?: string;
  isShowSearch: boolean;
  searchFn: (e: any) => void;
  className?: string;
}

const Header = ({ isShowSearch, searchFn, className }: HeaderProps) => {
  const { user } = useUser();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  return (
    <div
      className={`${className} w-full h-20 p-6 border-b border-gray-300 flex items-center justify-between bg-white dark:bg-gray-900 dark:border-gray-700`}
    >
      <div className="w-full flex items-center gap-3">
        <div className="flex items-center justify-center p-2 border rounded-sm">
          <CgMenuRightAlt
            onClick={toggleMenu}
            size={25}
            className="text-gray-500 dark:text-white"
          />
        </div>
        <Input
          type="text"
          disabled={!isShowSearch}
          placeholder="جستجو"
          className="max-w-96 focus:ring-transparent"
          onChange={searchFn}
        />
      </div>
      <div className="flex items-center gap-3">
        <ThemeToggleButton />
        <NotificationDropdown />
        <UserDropdown />
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

export default Header;
