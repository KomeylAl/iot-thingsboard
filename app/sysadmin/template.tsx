"use client";

import { animatePageIn } from "@/utils/animation";
import Image from "next/image";
import { useEffect } from "react";

import logo from "@/public/images/lotos.png";

export default function Template({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    animatePageIn();
  }, []);
  return (
    <div className="">
      {/* <div
        id="banner-1"
        className="min-h-screen bg-indigo-400 z-30 fixed top-0 left-0 w-1/4"
      /> */}
      <div
        id="banner-2"
        className="min-h-screen bg-neutral-800 bg-opacity-95 z-30 fixed top-0 left-0 w-1/3"
      />
      <div
        id="banner-3"
        className="min-h-screen bg-neutral-900 bg-opacity-95 z-30 fixed top-0 left-1/3 w-1/3 flex items-center justify-center p-12"
      >
        <Image src={logo} alt="Logo" />
      </div>
      <div
        id="banner-4"
        className="min-h-screen bg-neutral-950 bg-opacity-95 z-30 fixed top-0 left-2/3 w-1/3"
      />
      {children}
    </div>
  );
}
