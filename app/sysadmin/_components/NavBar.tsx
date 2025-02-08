"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const links = [
  {
    title: "داشبورد",
    href: "/sysadmin",
  },
  {
    title: "سازمان ها",
    href: "/sysadmin/tenants",
  },
  {
    title: "پروفایل ها",
    href: "/sysadmin/profiles",
  },
  {
    title: "پلن ها",
    href: "/sysadmin/plans",
  },
  {
    title: "تنظیمات",
    href: "/sysadmin/settings",
  },
];

const NavBar = () => {
  const pathName = usePathname();

  return (
    <div className="w-full flex flex-col gap-2 items-center">
      {links.map((link: any) => (
        <div
          key={link.href}
          className={`w-full text-center p-3 font-bold ${
            pathName === link.href
              ? "border-l-2 border-blue-500 text-blue-500"
              : ""
          }`}
        >
          <Link href={link.href}>{link.title}</Link>
        </div>
      ))}
    </div>
  );
};

export default NavBar;
