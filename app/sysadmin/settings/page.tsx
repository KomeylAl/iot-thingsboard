import React from 'react'
import { FaArrowLeft } from 'react-icons/fa'

const Settings = () => {
  return (
    <div className="p-6 lg:p-20 w-full h-screen flex flex-col items-center justify-between gap-6">
      <div className="w-full h-[15%] flex flex-col items-start justify-between">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-xl lg:text-3xl font-bold">تنظیمات</h1>
        </div>
      </div>
      <div className='w-full h-[85%]'>
        <h2>همگام سازی</h2>
        <div className='w-[50%] h-full flex flex-col gap-3 mt-4'>
          <div className='w-full p-3 bg-white rounded-md flex items-center justify-between'>
            <p>همگام سازی اطلاعات سازمان ها</p>
            <button><FaArrowLeft className='text-blue-500'/></button>
          </div>
          <div className='w-full p-3 bg-white rounded-md flex items-center justify-between'>
            <p>همگام سازی اطلاعات پروفایل ها</p>
            <button><FaArrowLeft className='text-blue-500'/></button>
          </div>
          <div className='w-full p-3 bg-white rounded-md flex items-center justify-between'>
            <p>همگام سازی اطلاعات کاربران</p>
            <button><FaArrowLeft className='text-blue-500'/></button>
          </div>
          <div className='w-full p-3 bg-white rounded-md flex items-center justify-between'>
            <p>همگام سازی اطلاعات دستگاه ها و دارایی ها</p>
            <button><FaArrowLeft className='text-blue-500'/></button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings