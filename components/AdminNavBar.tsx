"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { MdSpaceDashboard } from "react-icons/md";
import { RiBuilding2Fill } from "react-icons/ri";
import { AiFillProfile } from "react-icons/ai";
import { IoNotifications } from "react-icons/io5";
import { IoSettings } from "react-icons/io5";

const links = [
  {
    title: "داشبورد",
    href: "/sysadmin",
    icon: <MdSpaceDashboard size={20} />,
  },
  {
    title: "سازمان ها",
    href: "/sysadmin/tenants",
    icon: <RiBuilding2Fill size={20} />,
  },
  {
    title: "پروفایل ها",
    href: "/sysadmin/profiles",
    icon: <AiFillProfile size={20} />,
  },
  {
    title: "اعلانات",
    href: "/sysadmin/notifications",
    icon: <IoNotifications size={20} />,
  },
  {
    title: "تنظیمات",
    href: "/sysadmin/settings",
    icon: <IoSettings size={20} />,
  },
];

const AdminNavBar = () => {
  const pathName = usePathname();

  return (
    <div className="w-full flex flex-col gap-2 items-start pr-4">
      {links.map((link: any) => (
        <div
          key={link.href}
          className={`w-full text-right p-3 font-bold ${
            pathName === link.href
              ? "border-l-2 border-blue-500 text-blue-500"
              : ""
          }`}
        >
          <Link className="flex items-center gap-3" href={link.href}>
            {link.icon} {link.title}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default AdminNavBar;
