import type { Metadata } from "next";
import "@/app/globals.css";
import SideBar from "@/components/SideBar";
import { cookies } from "next/headers";
import { getUserInfo } from "@/actions/get-user-info";

export const metadata: Metadata = {
  title: "داشبورد IOT",
  description: "",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const cookie = await cookies();
  const token = cookie.get("token");
  const user = await getUserInfo(token?.value);

  return (
    <html lang="fa">
      <body className="bg-gray-100">
        <SideBar userInfo={user} />
        <div className="lg:pr-56 pt-20 lg:pt-0">{children}</div>
      </body>
    </html>
  );
}
