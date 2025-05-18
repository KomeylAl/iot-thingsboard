"use client";

import React, { useState } from "react";
import { IoExit } from "react-icons/io5";
import NavBar from "./NavBar";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { BiArrowToRight, BiMenu } from "react-icons/bi";
import { useUser } from "@/hooks/useUser";
import Image from "next/image";

const SideBar = () => {
  const { data } = useUser();

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
    <div className="">
      <div className="fixed top-7 right-7 z-0 p-2 bg-white rounded-md flex items-center">
        <button onClick={toggleMenu} className="text-center p-0">
          <BiMenu size={30} />
        </button>
      </div>
      <div className="w-56 h-screen overflow-y-auto no-scrollbar rounded-bl-3xl rounded-tl-3xl bg-white hidden lg:flex flex-col items-center justify-between gap-6 shadow-lg fixed py-10">
        <div>
          <Image src="/images/lotos.png" alt="lotos" width={100} height={100} />
          <div className="flex items-center gap-2 mt-5">
            {!data?.data.firstName
              ? "name"
              : data.data.firstName + " " + data.data.lastName}
          </div>
        </div>
        <NavBar />
        <button
          onClick={handleLogOut}
          className="text-rose-500 flex items-center gap-2"
        >
          <IoExit size={20} /> خروج
        </button>
      </div>
      <div
        className={`fixed inset-0 overflow-y-auto z-10 lg:hidden h-screen w-56 bg-white flex flex-col items-center justify-center gap-10 shadow-lg transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="fixed top-10 right-10 z-10">
          <button onClick={toggleMenu}>
            <BiArrowToRight size={30} />
          </button>
        </div>
        <div className="flex flex-col items-center justify-center">
          <Image
            src="/images/lotos.png"
            alt="lotos"
            width={100}
            height={100}
            className="w-12"
          />
          <div className="flex items-center gap-2 mt-5">
            {!data?.data.firstName
              ? "name"
              : data.data.firstName + " " + data.data.lastName}
          </div>
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
