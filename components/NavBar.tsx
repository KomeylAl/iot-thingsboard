"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const links = [
  {
    id: "dashboard",
    title: "داشبورد",
    href: "/dashboard",
  },
  {
    id: "entities",
    title: "موجودیت ها",
    subItems: [
      {
        id: "devices",
        title: "دستگاه ها",
        href: "/dashboard/devices",
      },
      {
        id: "assets",
        title: "دارایی ها",
        href: "/dashboard/assets",
      },
    ],
  },
  {
    id: "profiles",
    title: "پروفایل ها",
    subItems: [
      {
        id: "devices-profiles",
        title: "پروفایل دستگاه ها",
        href: "/dashboard/profiles/devices",
      },
      {
        id: "assets-profiles",
        title: "پروفایل دارایی ها",
        href: "/dashboard/profiles/assets",
      },
    ],
  },
  {
    id: "customers",
    title: "مشتریان",
    href: "/dashboard/customers",
  },
  {
    id: "dashboards",
    title: "داشبورد ها",
    href: "/dashboard/dashboards",
  },
  {
    id: "alarms",
    title: "هشدار ها",
    href: "/dashboard/alarms",
  },
  {
    id: "rule-chains",
    title: "زنجیره قواعد",
    href: "/dashboard/rule-chains",
  },
  {
    id: "settings",
    title: "تنظیمات",
    href: "/dashboard/settings",
  },
];

const NavBar = () => {
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
            <Link href={item.href}>{item.title}</Link>
          ) : (
            <p className="cursor-pointer">{item.title}</p>
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
                    <Link href={subItem.href}>{subItem.title}</Link>
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

export default NavBar;
