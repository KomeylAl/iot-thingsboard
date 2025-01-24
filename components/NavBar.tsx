"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const links = [
  {
    title: "داشبورد",
    href: "/",
  },
  {
    title: "دستگاه ها",
    href: "/devices",
  },
  {
    title: "دارایی ها",
    href: "/assets",
  },
  {
    title: "مشتریان",
    href: "/customers",
  },
  {
    title: "مدیران",
    href: "/admins",
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
