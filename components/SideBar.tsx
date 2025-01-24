"use client";

import React, { useState } from "react";
import { IoExit } from "react-icons/io5";
import NavBar from "./NavBar";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { BiArrowBack, BiArrowFromLeft, BiArrowToRight, BiMenu, BiRightArrow } from "react-icons/bi";

interface SideBarProps {
  userInfo: any;
}

const SideBar = ({ userInfo }: SideBarProps) => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogOut = async () => {
    await axios
      .post("/api/auth/logout")
      .then(function (response) {
        router.push("/auth/login");
      })
      .catch(function (error) {
        toast.error("مشکلی پیش آمد");
      });
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div>
      <div className="fixed top-10 right-10 -z-10">
        <button onClick={toggleMenu}>
          <BiMenu size={30} />
        </button>
      </div>
      <div className="w-56 h-screen rounded-bl-3xl rounded-tl-3xl bg-white hidden lg:flex flex-col items-center justify-between shadow-lg fixed py-10">
        <div className="flex items-center gap-2">
          {userInfo.firstName} {userInfo.lastName}
        </div>
        <NavBar />
        <button
          onClick={handleLogOut}
          className="text-rose-500 flex items-center gap-2"
        >
          <IoExit size={20} /> خروج
        </button>
      </div>
      <div className={`fixed top-0 right-0 lg:hidden h-screen w-56 bg-white flex flex-col items-center justify-center gap-10 shadow-lg transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out`}>
      <div className="fixed top-10 right-10 z-10">
        <button onClick={toggleMenu}>
          <BiArrowToRight size={30} />
        </button>
      </div>
        <div className="flex items-center gap-2">
          {userInfo.firstName} {userInfo.lastName}
        </div>
        <NavBar />
        <button
          onClick={handleLogOut}
          className="text-rose-500 flex items-center gap-2"
        >
          <IoExit size={20} /> خروج
        </button>
      </div>
    </div>
  );
};

export default SideBar;
