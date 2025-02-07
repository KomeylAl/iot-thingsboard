import React from "react";
import '@/app/globals.css';
import { cookies } from "next/headers";
import { getUserInfo } from "@/actions/get-user-info";
import { Toaster } from "react-hot-toast";
import SideBar from "./_components/SideBar";

interface AdminLayoutProps {
   children: React.ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {

  const cookie = await cookies();
  const token = cookie.get("token");
  const user = await getUserInfo(token?.value);

   return (
      <html lang="fa">
         <body className="bg-gray-100">
            <Toaster />
            <SideBar userInfo={user} />
            <div className="lg:pr-56 pt-20 lg:pt-0">{children}</div>
         </body>
      </html>
   );
}