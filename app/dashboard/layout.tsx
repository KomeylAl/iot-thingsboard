import type { Metadata } from "next";
import "@/app/globals.css";
import SideBar from "@/components/SideBar";
import { Toaster } from "react-hot-toast";
import DashboardProviders from "./providers";
import { UserProvider } from "@/context/UserContext";
import { ThemeProvider } from "@/context/ThemeContext";

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
      <body className="bg-gray-100 dark:bg-gray-900 h-screen">
        <Toaster />
        <DashboardProviders>
          <UserProvider>
            <SideBar />
            <div className="lg:pr-56 pt-20 lg:pt-0">
              <ThemeProvider>{children}</ThemeProvider>
            </div>
          </UserProvider>
        </DashboardProviders>
      </body>
    </html>
  );
}
