import React from "react";
import "@/app/globals.css";
import { Toaster } from "react-hot-toast";
import SideBar from "./_components/SideBar";
import Providers from "./providers";
import { useUser } from "@/hooks/useUser";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <html lang="fa">
      <body className="bg-gray-100">
        <Toaster />
        <Providers>
          <SideBar />
          <div className="lg:pr-56 pt-20 lg:pt-0">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
