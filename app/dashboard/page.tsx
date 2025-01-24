import { BiPlus } from "react-icons/bi";

export default function Home() {
  return (
    <div
     className="flex items-center justify-between p-6 lg:p-20 w-full">
      <div className="w-full lg:w-[60%] flex flex-col gap-6">
        <div className="w-full flex items-center justify-between">
          <h1 className="text-xl lg:text-3xl font-bold">داشبورد</h1>
          <div className="flex items-center gap-2">
            <div className="py-2 px-6 rounded-md bg-white text-blue-600">افزودن دستگاه</div>
            <button className="bg-white py-2 px-2 rounded-md text-blue-600 hover:bg-blue-600 hover:text-white transition-colors duration-300"><BiPlus size={25}/></button>
          </div>
        </div>
      </div>
    </div>
  );
}
