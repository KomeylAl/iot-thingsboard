import React from "react";
import "@/app/globals.css";
import { Toaster } from "react-hot-toast";
import SideBar from "./_components/SideBar";
import Providers from "./providers";
import { Metadata } from "next";
import { UserProvider } from "@/context/UserContext";
import { ThemeProvider } from "@/context/ThemeContext";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "داشبورد IOT",
  description: "",
};

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <html lang="fa">
      <body className="bg-gray-100">
        <Toaster />
        <Providers>
          <UserProvider>
            <SideBar />
            <div className="lg:pr-56 pt-20 lg:pt-0">
              <ThemeProvider>{children}</ThemeProvider>
            </div>
          </UserProvider>
        </Providers>
      </body>
    </html>
  );
}
