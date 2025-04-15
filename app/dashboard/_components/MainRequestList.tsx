import dynamic from "next/dynamic";
import React from "react";

const Select = dynamic(() => import("react-select"), { ssr: false });

interface MainRequestsChartProps {
  selectOptions: any;
  selectFn: (value: any) => void;
  deviceId: string;
}

const MainRequestList = ({
  selectOptions,
  selectFn,
  deviceId,
}: MainRequestsChartProps) => {
  return (
    <div className="space-y-3">
      <p className="text-lg">آخرین درخواست های دستگاه</p>
      <div className="w-full flex items-center gap-4">
      <Select
        placeholder="انتخاب دستگاه"
        className="w-full"
        options={selectOptions}
        onChange={(option: any) => {
          selectFn(option.value);
        }}
      />
      <Select
        placeholder="انتخاب کلید"
        className="w-full"
      />
      </div>
      <div className="w-full h-full flex items-center justify-center">
        {!deviceId ? <p className="text-sm">لطفا یک دستگاه انتخاب کنید.</p> : <div></div>}
      </div>
    </div>
  );
};

export default MainRequestList;
