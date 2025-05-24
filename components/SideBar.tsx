"use client";

import React, { useState } from "react";
import { IoExit } from "react-icons/io5";
import NavBar from "./NavBar";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { BiArrowToRight, BiMenu } from "react-icons/bi";
import Image from "next/image";
import { useUser } from "@/context/UserContext";

const SideBar = () => {
  const { user } = useUser();

  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogOut = async () => {
    
  };

  const userName = () => {
    let name: string = "";
    if (!user) {
      name = "name";
    } else {
      if (user.firstName && !user.lastName) name = user.firstName;
      if (user.lastName && !user.firstName) name = user.lastName;
      if (!user.firstName && !user.lastName) name = user.name;
      if (user.firstName && user.lastName)
        name = `${user.firstName} ${user.lastName}`;
    }
    return name;
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="">
      <div className="fixed top-7 right-7 z-0 p-2 bg-white rounded-md flex items-center">
        <button onClick={toggleMenu} className="text-center p-0">
          <BiMenu size={30} />
        </button>
      </div>
      <div className="w-56 h-screen overflow-y-auto no-scrollbar bg-white border-l border-gray-300 hidden lg:flex flex-col items-center gap-6 fixed py-10">
        <div className="w-full flex items-center justify-start pr-7">
          <Image
            src="/images/lotos.png"
            alt="lotos"
            width={100}
            height={100}
            className="w-16"
          />
        </div>
        <NavBar />
      </div>
      <div
        className={`fixed inset-0 overflow-y-auto z-10 lg:hidden h-screen w-56 bg-white flex flex-col items-center justify-center gap-10 transform ${
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
        </div>
        <NavBar />
      </div>
    </div>
  );
};

export default SideBar;
