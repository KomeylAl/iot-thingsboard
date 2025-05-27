"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

import { MdSpaceDashboard } from "react-icons/md";
import { FaBoxOpen } from "react-icons/fa";
import { RiDeviceFill } from "react-icons/ri";
import { RiBuilding3Fill } from "react-icons/ri";
import { AiFillProfile } from "react-icons/ai";
import { IoNotifications } from "react-icons/io5";
import { RiAlarmFill } from "react-icons/ri";
import { GiChaingun } from "react-icons/gi";
import { IoSettings } from "react-icons/io5";
import { MdPeopleAlt } from "react-icons/md";

const links = [
  {
    id: "dashboard",
    title: "داشبورد",
    href: "/dashboard",
    icon: <MdSpaceDashboard size={20}/>
  },
  {
    id: "entities",
    title: "موجودیت ها",
    icon: <FaBoxOpen size={20}/>,
    subItems: [
      {
        id: "devices",
        title: "دستگاه ها",
        href: "/dashboard/devices",
        icon: <RiDeviceFill size={20}/>,
      },
      {
        id: "assets",
        title: "دارایی ها",
        href: "/dashboard/assets",
        icon: <RiBuilding3Fill size={20}/>,
      },
    ],
  },
  {
    id: "profiles",
    title: "پروفایل ها",
    icon: <AiFillProfile size={20}/>,
    subItems: [
      {
        id: "devices-profiles",
        title: "پروفایل دستگاه ها",
        href: "/dashboard/profiles/devices",
        icon: <RiDeviceFill size={20}/>,
      },
      {
        id: "assets-profiles",
        title: "پروفایل دارایی ها",
        href: "/dashboard/profiles/assets",
        icon: <RiBuilding3Fill size={20}/>,
      },
    ],
  },
  {
    id: "customers",
    title: "مشتریان",
    href: "/dashboard/customers",
    icon: <MdPeopleAlt size={20}/>,
  },
  {
    id: "notifications",
    title: "اعلانات",
    href: "/dashboard/notifications",
    icon: <IoNotifications size={20}/>,
  },
  {
    id: "alarms",
    title: "هشدار ها",
    href: "/dashboard/alarms",
    icon: <RiAlarmFill size={20}/>,
  },
  {
    id: "rule-chains",
    title: "زنجیره قواعد",
    href: "/dashboard/rule-chains",
    icon: <GiChaingun size={20}/>,
  },
  {
    id: "settings",
    title: "تنظیمات",
    href: "/dashboard/settings",
    icon: <IoSettings size={20}/>,
  },
];

const TenantNavBar = () => {
  const pathName = usePathname();
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});

  const toggleMenu = (menuId: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menuId]: !prev[menuId],
    }));
  };

  return (
    <div className="w-full flex flex-col gap-2 items-start pr-4">
      {links.map((item: any) => (
        <div
          key={item.id}
          onClick={() => item.subItems && toggleMenu(item.id)}
          className={`w-full text-start p-3 font-bold ${
            item.href && pathName === item.href
              ? "border-l-2 border-blue-500 text-blue-500"
              : ""
          }`}
        >
          {item.href ? (
            <Link className="flex items-center gap-3" href={item.href}>{item.icon} {item.title}</Link>
          ) : (
            <p className="cursor-pointer flex items-center gap-3">{item.icon} {item.title}</p>
          )}
          {item.subItems && (
            <ul
              className={`overflow-hidden transition-all flex flex-col items-start duration-300 ${
                openMenus[item.id]
                  ? "max-h-40 opacity-100 p-3"
                  : "max-h-0 opacity-0"
              }`}
            >
              {item.subItems.map((subItem: any) => (
                <div
                  className={`w-full p-3 ${
                    pathName === subItem.href
                      ? "border-l-2 border-blue-500 text-blue-500"
                      : ""
                  }`}
                  key={subItem.id}
                >
                  <li className="text-sm font-semibold pr-2">
                    <Link className="flex items-center gap-3" href={subItem.href}>{subItem.icon} {subItem.title}</Link>
                  </li>
                </div>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default TenantNavBar;
