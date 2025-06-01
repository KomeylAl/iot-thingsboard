"use client";

import Input from "./ui/custom/Input";
import { CgMenuRightAlt } from "react-icons/cg";
import UserDropdown from "./UserDropDown";
import NotificationDropdown from "./NotificationDropDown";
import { ThemeToggleButton } from "./ThemeToggleButton";

interface HeaderProps {
  title?: string;
  isShowSearch: boolean;
  searchFn: (e: any) => void;
  className?: string;
}

const Header = ({ isShowSearch, searchFn, className }: HeaderProps) => {
  return (
    <div className={`${className} w-full h-20 p-6 border-b border-gray-300 flex items-center justify-between bg-white dark:bg-gray-900 dark:border-gray-700`}>
      <div className="w-full flex items-center gap-3">
        <div className="flex items-center justify-center p-2 border rounded-sm">
          <CgMenuRightAlt
            // onClick={() => (isOpen ? setIsOpen(false) : setIsOpen(true))}
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
    </div>
  );
};

export default Header;
