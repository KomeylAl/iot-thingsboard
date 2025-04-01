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
      <p className="text-lg">نمودار درخواست های دستگاه</p>
      <Select
        placeholder="انتخاب دستگاه"
        options={selectOptions}
        onChange={(option: any) => {
          selectFn(option.value);
        }}
      />
      <div className="w-full h-full flex items-center justify-center">
        {!deviceId ? <p className="text-sm">لطفا یک دستگاه انتخاب کنید.</p> : <div></div>}
      </div>
    </div>
  );
};

export default MainRequestList;
