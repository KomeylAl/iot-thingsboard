import type { Metadata } from "next";
import "@/app/globals.css";
import SideBar from "@/components/SideBar";
import { Toaster } from "react-hot-toast";
import DashboardProviders from "./providers";

export const metadata: Metadata = {
  title: "داشبورد IOT",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa">
      <body className="bg-gray-100 h-screen">
        <Toaster />
        <DashboardProviders>
          <SideBar />
          <div className="lg:pr-56 pt-20 lg:pt-0">{children}</div>
        </DashboardProviders>
      </body>
    </html>
  );
}
