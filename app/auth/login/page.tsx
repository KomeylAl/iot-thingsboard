"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await axios
      .post("/api/auth/login", formData)
      .then(function (response) {
        if (response.status === 200) {
          router.replace("/dashboard");
          toast.success("با موفقیت وارد شدید. لطفا کمی صبر کنید");
        }
      })
      .catch(function (error) {
        if (error.status === 401) {
          toast.error("نام کاربری یا رمز عبور اشتباه است");
        } else if (error.status === 403) {
          toast.error("شما به این بخش دسترسی ندارید");
        } else {
          toast.error("خطا در برقراری ارتباط با سرور");
        }

        console.log("LOGIN_ERROR", error);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="w-full h-full flex p-8 md:p-16">
      <div className="w-[50%] h-full hidden lg:block"></div>
      <div className="w-full lg:w-[50%] h-full flex flex-col items-start justify-center md:px-10 gap-16">
        <div className="w-full">
          <h2 className="text-2xl md:text-[40px] font-bold">
            داشبورد خدمات هوشمند اینترنت اشیاء
          </h2>
          {/* <p className="mt-4">
            قدرت گرفته با <span className="text-sky-600">Thingsboard</span>
          </p> */}
        </div>
        <div className="w-full">
          <form onSubmit={handleSubmit} className="flex flex-col w-full">
            <input
              type="email"
              required
              value={formData.username}
              onChange={(e: any) =>
                setFormData((prev: any) => ({
                  ...prev,
                  username: e.target.value,
                }))
              }
              placeholder="نام کاربری (ایمیل)"
              className="w-full md:w-96 py-4 px-4 rounded-md border border-gray-300"
            />
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e: any) =>
                setFormData((prev: any) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
              placeholder="رمز عبور"
              className="w-full md:w-96 py-4 px-4 rounded-md border border-gray-300 mt-3"
            />
            <button
              type="submit"
              className={`flex items-center justify-center text-white text-xl hover:bg-sky-700 transition-all duration-300 bg-sky-500 py-2 px-4 rounded-md mt-8 ${isLoading ? "w-fit" : "w-48"}`}
            >
              {isLoading ? <ClipLoader color="#ffffff" size={30}/> : "ورود"}
            </button>
          </form>
        </div>
        <div className="w-full flex flex-col">
          <Link
            href="/"
            className="hover:text-sky-700 transition-all duration-300"
          >
            رمز عبور خود را فراموش کرده اید؟
          </Link>
          <Link href="/" className="text-sky-600 mt-4">
            ارتباط با پشتیبانی
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
